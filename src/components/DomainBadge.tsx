interface DomainBadgeProps {
  domain: string;
}

const domainColors: Record<string, string> = {
  "Computer Science": "bg-blue-100 text-blue-700 border-blue-200",
  "Data Science": "bg-purple-100 text-purple-700 border-purple-200",
  "AI/ML": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Web Development": "bg-green-100 text-green-700 border-green-200",
  "Mobile Development": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "DevOps": "bg-orange-100 text-orange-700 border-orange-200",
  "Cybersecurity": "bg-red-100 text-red-700 border-red-200",
  "Cloud Computing": "bg-sky-100 text-sky-700 border-sky-200",
  "default": "bg-gray-100 text-gray-700 border-gray-200",
};

export function DomainBadge({ domain }: DomainBadgeProps) {
  const colorClass = domainColors[domain] || domainColors.default;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}
    >
      {domain}
    </span>
  );
}
