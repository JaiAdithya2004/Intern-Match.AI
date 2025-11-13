import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { StudentSelector } from "@/components/StudentSelector";
import { StatsCard } from "@/components/StatsCard";
import { RecommendationCard } from "@/components/RecommendationCard";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, TrendingUp, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Recommendation } from "@/lib/api";
import { ScoreIndicator } from "@/components/ScoreIndicator";
import { DomainBadge } from "@/components/DomainBadge";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Users as UsersIcon } from "lucide-react";

const Index = () => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [topK, setTopK] = useState(10);
  const [sortBy, setSortBy] = useState<"score" | "rank" | "stipend">("score");
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);

  const { data: studentsData } = useQuery({
    queryKey: ["students"],
    queryFn: api.getStudents,
  });

  const { data: internshipsData } = useQuery({
    queryKey: ["internships"],
    queryFn: api.getInternships,
  });

  const { data: recommendationsData, isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ["recommendations", selectedStudent, topK],
    queryFn: () => api.getRecommendations(selectedStudent, topK),
    enabled: !!selectedStudent,
  });

  const sortedRecommendations = recommendationsData?.recommendations
    ? [...recommendationsData.recommendations].sort((a, b) => {
        if (sortBy === "score") return b.score - a.score;
        if (sortBy === "rank") return a.rank - b.rank;
        if (sortBy === "stipend") return b.stipend - a.stipend;
        return 0;
      })
    : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                InternMatch AI
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Internship Match
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Powered by hybrid AI that combines content-based filtering, collaborative filtering, and machine learning to match you with the best opportunities.
          </p>
          <div className="flex justify-center">
            <StudentSelector value={selectedStudent} onValueChange={setSelectedStudent} />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Students"
            value={studentsData?.count || 0}
            icon={Users}
            description="Registered in the system"
          />
          <StatsCard
            title="Available Internships"
            value={internshipsData?.count || 0}
            icon={Briefcase}
            description="Active opportunities"
          />
          <StatsCard
            title="Your Matches"
            value={selectedStudent ? recommendationsData?.recommendations.length || 0 : "-"}
            icon={TrendingUp}
            description={selectedStudent ? "Personalized for you" : "Select a student"}
          />
        </div>

        {/* Recommendations Section */}
        {selectedStudent && (
          <div className="space-y-6">
            {/* Controls */}
            <div className="bg-card rounded-lg p-6 shadow-card">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <Label htmlFor="topK" className="text-sm font-medium mb-2 block">
                    Number of Recommendations: {topK}
                  </Label>
                  <Slider
                    id="topK"
                    value={[topK]}
                    onValueChange={([value]) => setTopK(value)}
                    min={5}
                    max={20}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div className="w-full md:w-48">
                  <Label htmlFor="sort" className="text-sm font-medium mb-2 block">
                    Sort By
                  </Label>
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger id="sort" className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="score">Match Score</SelectItem>
                      <SelectItem value="rank">Rank</SelectItem>
                      <SelectItem value="stipend">Stipend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Recommendations Grid */}
            {isLoadingRecommendations ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Loading recommendations...</p>
              </div>
            ) : sortedRecommendations.length > 0 ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Top {sortedRecommendations.length} Recommendations for {selectedStudent}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedRecommendations.map((rec) => (
                    <RecommendationCard
                      key={rec.internship_id}
                      recommendation={rec}
                      onClick={() => setSelectedRecommendation(rec)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg shadow-card">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No recommendations found</p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!selectedStudent && (
          <div className="text-center py-16 bg-card rounded-lg shadow-card">
            <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Select a Student to Get Started</h3>
            <p className="text-muted-foreground">
              Choose a student from the dropdown above to view personalized internship recommendations
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedRecommendation} onOpenChange={() => setSelectedRecommendation(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedRecommendation?.title || `Internship ${selectedRecommendation?.internship_id}`}
            </DialogTitle>
          </DialogHeader>
          {selectedRecommendation && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-semibold text-primary">
                  Rank #{selectedRecommendation.rank}
                </Badge>
                <DomainBadge domain={selectedRecommendation.domain} />
                {selectedRecommendation.remote === 1 && (
                  <Badge variant="secondary">Remote</Badge>
                )}
              </div>

              <ScoreIndicator score={selectedRecommendation.score} size="lg" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-foreground">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Stipend</p>
                    <p className="font-semibold">₹{selectedRecommendation.stipend.toLocaleString()}/month</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{selectedRecommendation.state} {selectedRecommendation.remote === 1 && "(Remote)"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <UsersIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Available Spots</p>
                    <p className="font-semibold">{selectedRecommendation.capacity}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedRecommendation.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Required Skills</h4>
                  <p className="text-sm text-muted-foreground">{selectedRecommendation.required_skills}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Age Requirements</h4>
                  <p className="text-sm text-muted-foreground">{selectedRecommendation.min_age} - {selectedRecommendation.max_age} years</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" size="lg">
                  Save Recommendation
                </Button>
                <Button variant="outline" className="flex-1" size="lg">
                  View Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
