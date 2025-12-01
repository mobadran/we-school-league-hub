import Navigation from "@/components/Navigation";
import PlayerCard from "@/components/PlayerCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getPlayers, Player } from "@/repos/players.repo";

const Players = () => {
  const [classFilter, setClassFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"goals" | "assists">("goals");
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getPlayers();
      setPlayers(data);
    })();
  }, []);

  const classes = ["all", ...Array.from(new Set(players.map((p) => p.class)))];

  const filteredPlayers = players
    .filter((player) => classFilter === "all" || player.class === classFilter)
    .sort((a, b) => (b[sortBy] ?? 0) - (a[sortBy] ?? 0));

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-gradient">All Players</h1>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                Filter by Class
              </h3>
              <div className="flex gap-4 flex-wrap">
                {classes.map((cls) => (
                  <Button
                    key={cls}
                    variant={classFilter === cls ? "default" : "outline"}
                    onClick={() => setClassFilter(cls)}
                  >
                    {cls === "all" ? "All Classes" : cls}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                Sort by
              </h3>
              <div className="flex gap-4">
                <Button
                  variant={sortBy === "goals" ? "default" : "outline"}
                  onClick={() => setSortBy("goals")}
                >
                  Goals
                </Button>
                <Button
                  variant={sortBy === "assists" ? "default" : "outline"}
                  onClick={() => setSortBy("assists")}
                >
                  Assists
                </Button>
              </div>
            </div>
          </div>

          {/* Players Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player._id} player={player} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Players;
