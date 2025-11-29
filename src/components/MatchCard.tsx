import { Match, getTeamById } from "@/data/mockData";
import { Card } from "./ui/card";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface MatchCardProps {
  match: Match;
}

const MatchCard = ({ match }: MatchCardProps) => {
  const team1 = getTeamById(match.team1);
  const team2 = getTeamById(match.team2);

  if (!team1 || !team2) return null;

  const isCompleted = match.status === 'completed';

  return (
    <Link to={`/match/${match.slug}`}>
      <Card className="p-6 hover:shadow-glow transition-all duration-300 cursor-pointer border-border/50 bg-card/50 backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          {/* Team 1 */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">{team1.name.charAt(0)}</span>
            </div>
            <h3 className="font-bold text-sm">{team1.name}</h3>
          </div>

          {/* Score or VS */}
          <div className="flex flex-col items-center gap-2 min-w-[80px]">
            {isCompleted ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary">{match.scoreTeam1}</span>
                  <span className="text-xl text-muted-foreground">-</span>
                  <span className="text-3xl font-bold text-secondary">{match.scoreTeam2}</span>
                </div>
                {match.wentToPenalties && (
                  <span className="text-xs text-muted-foreground">
                    ({match.penaltyTeam1} - {match.penaltyTeam2} Pens)
                  </span>
                )}
              </>
            ) : (
              <span className="text-2xl font-bold text-muted-foreground">VS</span>
            )}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{new Date(match.date).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Team 2 */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-secondary/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-secondary">{team2.name.charAt(0)}</span>
            </div>
            <h3 className="font-bold text-sm">{team2.name}</h3>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default MatchCard;
