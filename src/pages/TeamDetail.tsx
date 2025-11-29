import Navigation from "@/components/Navigation";
import PlayerCard from "@/components/PlayerCard";
import MatchCard from "@/components/MatchCard";
import { useParams, Navigate } from "react-router-dom";
import { getTeamBySlug, players, matches } from "@/data/mockData";
import { Trophy, Users, Target } from "lucide-react";

const TeamDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const team = slug ? getTeamBySlug(slug) : undefined;

  if (!team) {
    return <Navigate to="/teams" replace />;
  }

  const teamPlayers = players.filter(p => p.teams.includes(team.id));
  const teamMatches = matches.filter(m => m.team1 === team.id || m.team2 === team.id);
  const totalGoals = teamPlayers.reduce((sum, p) => sum + p.goals, 0);
  const totalAssists = teamPlayers.reduce((sum, p) => sum + p.assists, 0);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          {/* Team Header */}
          <div className="mb-12 text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-6xl font-bold">{team.name.charAt(0)}</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 text-gradient">{team.name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{team.class}</p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  <span className="text-3xl font-bold text-gradient">{team.points}</span>
                </div>
                <p className="text-sm text-muted-foreground">Points</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="w-6 h-6 text-primary" />
                  <span className="text-3xl font-bold text-primary">{totalGoals}</span>
                </div>
                <p className="text-sm text-muted-foreground">Total Goals</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-secondary" />
                  <span className="text-3xl font-bold text-secondary">{totalAssists}</span>
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
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </section>

          {/* Matches Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Team Matches</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
