import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

async function setupSupabase() {
  try {
    console.log("Setting up Supabase for vector search...")

    // Enable pgvector extension
    const { error: extensionError } = await supabaseClient.rpc("enable_pgvector_extension")
    if (extensionError) {
      throw new Error(`Error enabling pgvector extension: ${extensionError.message}`)
    }
    console.log("Enabled pgvector extension")

    // Create documents table with vector column
    const { error: tableError } = await supabaseClient.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id BIGSERIAL PRIMARY KEY,
        content TEXT,
        metadata JSONB,
        embedding VECTOR(1536)
      );
    `)
    if (tableError) {
      throw new Error(`Error creating documents table: ${tableError.message}`)
    }
    console.log("Created documents table")

    // Create function for similarity search
    const { error: functionError } = await supabaseClient.query(`
      CREATE OR REPLACE FUNCTION match_documents(
        query_embedding VECTOR(1536),
        match_count INT DEFAULT 10,
        filter JSONB DEFAULT '{}'
      ) RETURNS TABLE (
        id BIGINT,
        content TEXT,
        metadata JSONB,
        similarity FLOAT
      )
      LANGUAGE plpgsql
      AS $$
      BEGIN
        RETURN QUERY
        SELECT
          documents.id,
          documents.content,
          documents.metadata,
          1 - (documents.embedding <=> query_embedding) AS similarity
        FROM documents
        WHERE CASE
          WHEN filter::TEXT = '{}'::TEXT THEN TRUE
          ELSE metadata @> filter
        END
        ORDER BY documents.embedding <=> query_embedding
        LIMIT match_count;
      END;
      $$;
    `)
    if (functionError) {
      throw new Error(`Error creating match_documents function: ${functionError.message}`)
    }
    console.log("Created match_documents function")

    // Create index for faster similarity search
    const { error: indexError } = await supabaseClient.query(`
      CREATE INDEX IF NOT EXISTS documents_embedding_idx ON documents
      USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100);
    `)
    if (indexError) {
      throw new Error(`Error creating index: ${indexError.message}`)
    }
    console.log("Created vector index")

    console.log("Supabase setup completed successfully!")
  } catch (error) {
    console.error("Error setting up Supabase:", error)
  }
}

// Run the setup
setupSupabase()
