import { getMatchScoreCategory, formatScore } from "@/lib/utils/matchScore";

interface ScoreIndicatorProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function ScoreIndicator({ score, size = "md", showLabel = true }: ScoreIndicatorProps) {
  const { label, bgColor, textColor } = getMatchScoreCategory(score);
  
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className={`font-semibold ${textColor} ${textSizes[size]}`}>
          {formatScore(score)}
        </span>
        {showLabel && (
          <span className={`${textSizes[size]} font-medium ${textColor}`}>
            {label}
          </span>
        )}
      </div>
      <div className="w-full bg-secondary rounded-full overflow-hidden">
        <div
          className={`${sizeClasses[size]} transition-all duration-500 ease-out rounded-full`}
          style={{
            width: `${score * 100}%`,
            backgroundColor: `hsl(var(--${getMatchScoreCategory(score).color}))`,
          }}
        />
      </div>
    </div>
  );
}
