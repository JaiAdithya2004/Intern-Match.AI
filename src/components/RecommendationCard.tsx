import { Card } from "@/components/ui/card";
import { ScoreIndicator } from "./ScoreIndicator";
import { DomainBadge } from "./DomainBadge";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Users, Bookmark } from "lucide-react";
import { Recommendation } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface RecommendationCardProps {
  recommendation: Recommendation;
  onClick: () => void;
}

export function RecommendationCard({ recommendation, onClick }: RecommendationCardProps) {
  return (
    <Card
      className="p-6 cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="font-semibold text-primary">
                #{recommendation.rank}
              </Badge>
              {recommendation.remote === 1 && (
                <Badge variant="secondary" className="text-xs">
                  Remote
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-2">
              {recommendation.title}
            </h3>
            <DomainBadge domain={recommendation.domain} />
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
              {recommendation.description}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>

        {/* Score */}
        <ScoreIndicator score={recommendation.score} size="md" />

        {/* Details */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>₹{recommendation.stipend.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{recommendation.state}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recommendation.capacity} spots</span>
          </div>
        </div>
        
        {/* Required Skills */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs font-medium text-foreground mb-1">Required Skills:</p>
          <p className="text-xs text-muted-foreground">{recommendation.required_skills}</p>
        </div>
      </div>
    </Card>
  );
}
