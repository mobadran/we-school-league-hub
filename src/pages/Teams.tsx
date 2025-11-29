import Navigation from "@/components/Navigation";
import TeamCard from "@/components/TeamCard";
import { teams } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Teams = () => {
  const [classFilter, setClassFilter] = useState<string>('all');

  const classes = ['all', ...Array.from(new Set(teams.map(t => t.class)))];

  const filteredTeams = teams
    .filter(team => classFilter === 'all' || team.class === classFilter)
    .sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-gradient">All Teams</h1>
          
          {/* Filters */}
          <div className="flex gap-4 mb-8 flex-wrap">
            {classes.map((cls) => (
              <Button
                key={cls}
                variant={classFilter === cls ? 'default' : 'outline'}
                onClick={() => setClassFilter(cls)}
              >
                {cls === 'all' ? 'All Classes' : cls}
              </Button>
            ))}
          </div>

          {/* Teams Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTeams.map((team, index) => (
              <TeamCard key={team.id} team={team} rank={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
