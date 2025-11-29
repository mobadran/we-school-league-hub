import { Team } from "@/data/mockData";
import { Card } from "./ui/card";
import { Trophy } from "lucide-react";
import { Link } from "react-router-dom";

interface TeamCardProps {
  team: Team;
  rank?: number;
}

const TeamCard = ({ team, rank }: TeamCardProps) => {
  return (
    <Link to={`/team/${team.slug}`}>
      <Card className="p-6 hover:shadow-glow transition-all duration-300 cursor-pointer border-border/50 bg-card/50 backdrop-blur">
        <div className="flex items-center gap-4">
          {rank && (
            <div className="text-4xl font-bold text-primary/30">
              #{rank}
            </div>
          )}
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">{team.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{team.name}</h3>
            <p className="text-sm text-muted-foreground">{team.class}</p>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-secondary" />
            <span className="text-2xl font-bold text-gradient">{team.points}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default TeamCard;
