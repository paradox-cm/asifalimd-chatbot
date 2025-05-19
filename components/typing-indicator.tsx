export default function TypingIndicator() {
  return (
    <div className="p-2 flex items-center space-x-1" aria-label="Assistant is typing" role="status">
      <div className="w-2 h-2 rounded-full bg-clinical-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
      <div className="w-2 h-2 rounded-full bg-clinical-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
      <div className="w-2 h-2 rounded-full bg-clinical-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
    </div>
  )
}
