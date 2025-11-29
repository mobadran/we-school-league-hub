import Navigation from "@/components/Navigation";
import MatchCard from "@/components/MatchCard";
import TeamCard from "@/components/TeamCard";
import PlayerCard from "@/components/PlayerCard";
import { getNextMatch, getBestTeam, getUpcomingMatches, getTopScorers, getTopAssists } from "@/data/mockData";
import { Calendar, Trophy, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const nextMatch = getNextMatch();
  const bestTeam = getBestTeam();
  const upcomingMatches = getUpcomingMatches(3);
  const topScorers = getTopScorers(5);
  const topAssists = getTopAssists(5);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 gradient-hero">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            WE School Football League
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The premier IT school football championship featuring the best teams and players
          </p>
        </div>
      </section>

      {/* Next Match Section */}
      {nextMatch && (
        <section className="py-16 px-4 bg-card/30">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Next Match</h2>
              </div>
            </div>
            <div className="max-w-2xl mx-auto">
              <MatchCard match={nextMatch} />
            </div>
          </div>
        </section>
      )}

      {/* Best Team Section */}
      {bestTeam && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-secondary" />
                <h2 className="text-3xl font-bold">Leading Team</h2>
              </div>
              <Link to="/teams">
                <Button variant="outline">View All Teams</Button>
              </Link>
            </div>
            <div className="max-w-2xl mx-auto">
              <TeamCard team={bestTeam} rank={1} />
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Matches Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Upcoming Matches</h2>
            <Link to="/matches">
              <Button variant="outline">View All Matches</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Scorers & Assists Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Top Scorers */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-bold">Top Scorers</h2>
                </div>
              </div>
              <div className="space-y-4">
                {topScorers.map((player) => (
                  <PlayerCard key={player.id} player={player} showAssists={false} />
                ))}
              </div>
            </div>

            {/* Top Assists */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-secondary" />
                  <h2 className="text-3xl font-bold">Top Assists</h2>
                </div>
              </div>
              <div className="space-y-4">
                {topAssists.map((player) => (
                  <PlayerCard key={player.id} player={player} showGoals={false} />
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/players">
              <Button size="lg" className="gradient-primary">View All Players</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 WE School Football League. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
