import { Player, getTeamById } from "@/data/mockData";
import { Card } from "./ui/card";
import { Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
interface PlayerCardProps {
  player: Player;
  showGoals?: boolean;
  showAssists?: boolean;
}
const PlayerCard = ({
  player,
  showGoals = true,
  showAssists = true
}: PlayerCardProps) => {
  const team = getTeamById(player.teams[0]);
  return <Link to={`/player/${player.slug}`}>
      <Card className="p-6 hover:shadow-glow transition-all duration-300 cursor-pointer border-border/50 bg-card/50 backdrop-blur my-[24px]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-2xl font-bold">{player.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{player.name}</h3>
            <p className="text-sm text-muted-foreground">{team?.name}</p>
            <p className="text-xs text-muted-foreground">{player.class}</p>
          </div>
          <div className="flex flex-col gap-2">
            {showGoals && <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="font-bold text-primary">{player.goals}</span>
              </div>}
            {showAssists && <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary" />
                <span className="font-bold text-secondary">{player.assists}</span>
              </div>}
          </div>
        </div>
      </Card>
    </Link>;
};
export default PlayerCard;