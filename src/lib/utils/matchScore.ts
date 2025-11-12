export function getMatchScoreCategory(score: number): {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
} {
  if (score >= 80) {
    return {
      label: "Excellent Match",
      color: "match-excellent",
      bgColor: "bg-match-excellent/10",
      textColor: "text-match-excellent",
    };
  } else if (score >= 60) {
    return {
      label: "Good Match",
      color: "match-good",
      bgColor: "bg-match-good/10",
      textColor: "text-match-good",
    };
  } else if (score >= 40) {
    return {
      label: "Fair Match",
      color: "match-fair",
      bgColor: "bg-match-fair/10",
      textColor: "text-match-fair",
    };
  } else {
    return {
      label: "Low Match",
      color: "match-low",
      bgColor: "bg-match-low/10",
      textColor: "text-match-low",
    };
  }
}

export function formatScore(score: number): string {
  return `${Math.round(score)}%`;
}
