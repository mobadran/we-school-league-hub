import Navigation from "@/components/Navigation";
import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlayerBySlug, Player } from "@/repos/players.repo";
import {
  Target,
  Users,
  Trophy,
  LucidePersonStanding,
  LucideUser,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const PlayerDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      if (slug) {
        const p = await getPlayerBySlug(slug);
        setPlayer(p);
      }
      setLoaded(true);
    })();
  }, [slug]);

  if (loaded && !player) {
    return <Navigate to="/players" replace />;
  }

  if (!player) return null;

  const team = player.teams?.[0];

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Player Header */}
          <div className="mb-12 text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              {/* <span className="text-5xl font-bold">
                {player.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span> */}
              <LucideUser className="w-16 h-16" />
            </div>
            <h1 className="text-5xl font-bold mb-4 text-gradient">
              {player.name}
            </h1>
            {team && (
              <Link
                to={`/team/${team.slug}`}
                className="text-lg text-primary hover:underline"
              >
                {team.class}
              </Link>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-8 text-center border-primary/50 bg-card/50 backdrop-blur">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-5xl font-bold text-primary mb-2">
                {player.goals || 0}
              </div>
              <p className="text-lg text-muted-foreground">Goals Scored</p>
            </Card>

            <Card className="p-8 text-center border-secondary/50 bg-card/50 backdrop-blur">
              <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
              <div className="text-5xl font-bold text-secondary mb-2">
                {player.assists || 0}
              </div>
              <p className="text-lg text-muted-foreground">Assists</p>
            </Card>
          </div>

          {/* Additional Info */}
          <Card className="p-8 bg-card/50 backdrop-blur">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-secondary" />
              Player Information
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-muted-foreground">Full Name</span>
                <span className="font-semibold">{player.name}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-muted-foreground">Team</span>
                {team && (
                  <Link
                    to={`/team/${team.slug}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    {team.class}
                  </Link>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  Total Contributions
                </span>
                <span className="font-semibold text-gradient text-xl">
                  {(player.goals || 0) + (player.assists || 0)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
