import Navigation from "@/components/Navigation";
import MatchCard from "@/components/MatchCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getMatches, Match } from "@/repos/matches.repo";

const Matches = () => {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getMatches();
      setMatches(data);
    })();
  }, []);

  const filteredMatches = matches.filter((match) => {
    if (filter === "all") return true;
    return match.status === filter;
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-gradient">All Matches</h1>

          {/* Filters */}
          <div className="flex gap-4 mb-8">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All Matches
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
          </div>

          {/* Matches Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <MatchCard key={match._id} match={match} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;
