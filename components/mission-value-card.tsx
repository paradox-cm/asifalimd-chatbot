interface MissionValueCardProps {
  emoji: string
  title: string
}

export default function MissionValueCard({ emoji, title }: MissionValueCardProps) {
  return (
    <div className="border-2 border-border p-4 sm:p-5 md:p-6 rounded-lg bg-card hover:border-clinical-400 hover:shadow-md transition-all duration-300 h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <div className="text-2xl">{emoji}</div>
      </div>
    </div>
  )
}
