import Navigation from "@/components/Navigation";
import PlayerCard from "@/components/PlayerCard";
import MatchCard from "@/components/MatchCard";
import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTeamBySlug, Team } from "@/repos/teams.repo";
import { getPlayersByTeamId, Player } from "@/repos/players.repo";
import { getMatchesByTeamId, Match } from "@/repos/matches.repo";
import { Trophy, Users, Target } from "lucide-react";

const TeamDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [team, setTeam] = useState<Team | null>(null);
  const [teamPlayers, setTeamPlayers] = useState<Player[]>([]);
  const [teamMatches, setTeamMatches] = useState<Match[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const t = await getTeamBySlug(slug);
      setTeam(t);
      if (t?._id) {
        const [ps, ms] = await Promise.all([
          getPlayersByTeamId(t._id),
          getMatchesByTeamId(t._id),
        ]);
        setTeamPlayers(ps);
        setTeamMatches(ms);
      }
      setLoaded(true);
    })();
  }, [slug]);

  if (loaded && !team) {
    return <Navigate to="/teams" replace />;
  }

  if (!team) return null;

  const totalGoals = teamPlayers.reduce((sum, p) => sum + (p.goals ?? 0), 0);
  const totalAssists = teamPlayers.reduce(
    (sum, p) => sum + (p.assists ?? 0),
    0
  );

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          {/* Team Header */}
          <div className="mb-12 text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-6xl font-bold">{team.class}</span>
            </div>
            {/* <h1 className="text-5xl font-bold mb-4 text-gradient">
              {team.class}
            </h1> */}

            {/* Stats */}
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  <span className="text-3xl font-bold text-gradient">
                    {team.points || 0}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Points</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="w-6 h-6 text-primary" />
                  <span className="text-3xl font-bold text-primary">
                    {totalGoals}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Total Goals</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-secondary" />
                  <span className="text-3xl font-bold text-secondary">
                    {totalAssists}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Total Assists</p>
              </div>
            </div>
          </div>

          {/* Players Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Team Players</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {teamPlayers.map((player) => (
                <PlayerCard key={player._id} player={player} />
              ))}
            </div>
          </section>

          {/* Matches Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Team Matches</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMatches.map((match) => (
                <MatchCard key={match._id} match={match} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
