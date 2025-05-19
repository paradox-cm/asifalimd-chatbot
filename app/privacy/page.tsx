import FadeInSection from "@/components/fade-in-section"

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-4xl py-12 px-4">
      <FadeInSection>
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-slate-500 mb-8">Last updated: April 2025</p>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-slate-700 mb-4">
              This website (https://asifalimd.com) is the official personal site of Dr. Asif Ali, MD, and is designed to
              provide information about his clinical practice, research, advisory work, and public engagements.
            </p>
            <p className="text-slate-700">
              We are committed to protecting your privacy and ensuring that any information you provide is handled with
              care, integrity, and security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p className="text-slate-700 mb-4">
              This site is primarily informational. We do not collect personal health data, financial information, or
              login credentials. However, we may collect the following minimal information:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Contact form submissions (Name, Email, Organization, Inquiry Purpose)</li>
              <li>Basic analytics (via privacy-compliant tools such as Vercel or Google Analytics)</li>
              <li>Email signup information (if a newsletter form is present)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Information</h2>
            <p className="text-slate-700 mb-4">Information collected through this site may be used to:</p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Respond to speaking, media, research, or consulting inquiries</li>
              <li>Improve the user experience and site functionality</li>
              <li>Monitor general site traffic and performance</li>
              <li>Share occasional professional updates (only if you've opted in)</li>
            </ul>
            <p className="text-slate-700 mt-4">
              We do not sell, rent, or share your personal information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Cookies & Analytics</h2>
            <p className="text-slate-700 mb-4">
              This website may use cookies for basic analytics or functionality (e.g., responsive layout, session
              memory). These are anonymized and never tied to personal health information.
            </p>
            <p className="text-slate-700">You can control cookie settings through your browser preferences.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
            <p className="text-slate-700">
              We may use external services (e.g., embedded YouTube videos, analytics, form processors) that have their
              own privacy policies. While we only work with reputable providers, we encourage you to review their
              practices independently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
            <p className="text-slate-700">
              Information submitted through forms may be retained for communication and record-keeping purposes. You may
              request deletion of your data at any time by contacting us at the email below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
            <p className="text-slate-700">
              This site is not intended for children under 13. We do not knowingly collect personal information from
              minors. If you believe a child has submitted data, please contact us for immediate removal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
            <p className="text-slate-700 mb-4">
              Depending on your location, you may have legal rights under GDPR, CCPA, or other privacy frameworks,
              including:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Requesting access to your data</li>
              <li>Requesting correction or deletion</li>
              <li>Withdrawing consent</li>
            </ul>
            <p className="text-slate-700 mt-4">To exercise these rights, please contact us directly.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p className="text-slate-700 mb-4">
              If you have any questions about this Privacy Policy or how your data is handled, you may reach us at:
            </p>
            <div className="pl-6 text-slate-700">
              <p className="flex items-center">
                <span className="mr-2">📧</span> Email:{" "}
                <a href="mailto:hello@asifalimd.com" className="ml-2 text-slate-900 hover:underline">
                  hello@asifalimd.com
                </a>
              </p>
              <p className="flex items-center mt-2">
                <span className="mr-2">📍</span> Houston, Texas
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Updates to This Policy</h2>
            <p className="text-slate-700">
              We may update this Privacy Policy from time to time to reflect site changes or compliance updates. The
              "Last updated" date at the top will always indicate the most recent version.
            </p>
          </section>
        </div>
      </FadeInSection>
    </main>
  )
}
