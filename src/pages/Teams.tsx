import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTeams, Team } from "@/repos/teams.repo";

export default function Teams() {
  const [classFilter, setClassFilter] = useState<string>("all");
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getTeams();
      setTeams(data);
    })();
  }, []);

  const classes = ["all", ...Array.from(new Set(teams.map((t) => t.class)))];

  const filteredTeams = teams
    .filter((team) => classFilter === "all" || team.class === classFilter)
    .sort((a, b) => (b.points ?? 0) - (a.points ?? 0));

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto px-0">
          <h1 className="text-5xl font-bold mb-8 text-gradient">All Teams</h1>

          {/* Filters */}
          <div className="flex gap-4 mb-8 flex-wrap">
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

          <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex bg-gray-100 font-semibold text-sm">
              <div className="flex-1 px-3 py-2"></div>
              <div className="w-12 px-2 py-2 text-center">Pts</div>
              <div className="w-12 px-2 py-2 text-center">W</div>
              <div className="w-12 px-2 py-2 text-center">L</div>
              <div className="w-12 px-2 py-2 text-center">D</div>
              <div className="w-12 px-2 py-2 text-center">GF</div>
              <div className="w-12 px-2 py-2 text-center">GA</div>
            </div>
            {filteredTeams.map((team) => (
              <Link
                to={`/team/${team.slug}`}
                className="flex hover:bg-gray-50 transition-colors border-t border-gray-300"
                key={team._id}
              >
                <div className="flex-1 px-3 py-2">{team.class}</div>
                <div className="w-12 px-2 py-2 text-center">
                  {team.points ?? 0}
                </div>
                <div className="w-12 px-2 py-2 text-center">
                  {team.wins || 0}
                </div>
                <div className="w-12 px-2 py-2 text-center">
                  {team.losses || 0}
                </div>
                <div className="w-12 px-2 py-2 text-center">
                  {team.draws || 0}
                </div>
                <div className="w-12 px-2 py-2 text-center">
                  {team.goalsFor || 0}
                </div>
                <div className="w-12 px-2 py-2 text-center">
                  {team.goalsAgainst || 0}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// function LeagueTable() {
//   return (

//   );
// }
