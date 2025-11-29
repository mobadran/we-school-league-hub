import Navigation from "@/components/Navigation";
import { useParams, Navigate, Link } from "react-router-dom";
import { getMatchBySlug, getTeamById } from "@/data/mockData";
import { Calendar, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

const MatchDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const match = slug ? getMatchBySlug(slug) : undefined;

  if (!match) {
    return <Navigate to="/matches" replace />;
  }

  const team1 = getTeamById(match.team1);
  const team2 = getTeamById(match.team2);

  if (!team1 || !team2) {
    return <Navigate to="/matches" replace />;
  }

  const isCompleted = match.status === 'completed';

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Match Header */}
          <Card className="p-8 mb-12 bg-card/50 backdrop-blur">
            <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground">
              <Calendar className="w-5 h-5" />
              <span className="text-lg">{new Date(match.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>

            <div className="flex items-center justify-between gap-8">
              {/* Team 1 */}
              <Link to={`/team/${team1.slug}`} className="flex-1 text-center group">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:shadow-glow transition-all">
                  <span className="text-4xl font-bold text-primary">{team1.name.charAt(0)}</span>
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{team1.name}</h2>
                <p className="text-sm text-muted-foreground">{team1.class}</p>
              </Link>

              {/* Score */}
              <div className="text-center min-w-[150px]">
                {isCompleted ? (
                  <>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <span className="text-6xl font-bold text-primary">{match.scoreTeam1}</span>
                      <span className="text-3xl text-muted-foreground">-</span>
                      <span className="text-6xl font-bold text-secondary">{match.scoreTeam2}</span>
                    </div>
                    {match.wentToPenalties && (
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Trophy className="w-4 h-4 text-secondary" />
                        <span className="text-muted-foreground">
                          Penalties: {match.penaltyTeam1} - {match.penaltyTeam2}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <span className="text-4xl font-bold text-muted-foreground">VS</span>
                    <p className="text-sm text-muted-foreground mt-2">Match not played yet</p>
                  </div>
                )}
              </div>

              {/* Team 2 */}
              <Link to={`/team/${team2.slug}`} className="flex-1 text-center group">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center group-hover:shadow-glow transition-all">
                  <span className="text-4xl font-bold text-secondary">{team2.name.charAt(0)}</span>
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-secondary transition-colors">{team2.name}</h2>
                <p className="text-sm text-muted-foreground">{team2.class}</p>
              </Link>
            </div>
          </Card>

          {/* Match Info */}
          <Card className="p-8 bg-card/50 backdrop-blur">
            <h2 className="text-2xl font-bold mb-6">Match Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-muted-foreground">Status</span>
                <span className={`font-semibold ${isCompleted ? 'text-secondary' : 'text-primary'}`}>
                  {isCompleted ? 'Completed' : 'Upcoming'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-muted-foreground">Date</span>
                <span className="font-semibold">{new Date(match.date).toLocaleDateString()}</span>
              </div>
              {isCompleted && (
                <>
                  <div className="flex justify-between items-center pb-4 border-b border-border/50">
                    <span className="text-muted-foreground">Final Score</span>
                    <span className="font-semibold text-xl">
                      {match.scoreTeam1} - {match.scoreTeam2}
                    </span>
                  </div>
                  {match.wentToPenalties && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Penalty Shootout</span>
                      <span className="font-semibold">
                        {match.penaltyTeam1} - {match.penaltyTeam2}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
