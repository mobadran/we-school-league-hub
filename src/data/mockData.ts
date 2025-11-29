// Mock data matching the Sanity schema structure

export interface Team {
  id: string;
  name: string;
  slug: string;
  class: string;
  image: string;
  points: number;
}

export interface Player {
  id: string;
  name: string;
  slug: string;
  class: string;
  image: string;
  teams: string[];
  goals: number;
  assists: number;
}

export interface Match {
  id: string;
  team1: string;
  team2: string;
  slug: string;
  date: string;
  image: string;
  scoreTeam1?: number;
  scoreTeam2?: number;
  wentToPenalties?: boolean;
  penaltyTeam1?: number;
  penaltyTeam2?: number;
  status: 'upcoming' | 'completed';
}

export const teams: Team[] = [
  {
    id: '1',
    name: 'Blue Dragons',
    slug: 'blue-dragons',
    class: 'Grade 12',
    image: '/placeholder.svg',
    points: 18,
  },
  {
    id: '2',
    name: 'Purple Knights',
    slug: 'purple-knights',
    class: 'Grade 11',
    image: '/placeholder.svg',
    points: 15,
  },
  {
    id: '3',
    name: 'Cyber Eagles',
    slug: 'cyber-eagles',
    class: 'Grade 10',
    image: '/placeholder.svg',
    points: 12,
  },
  {
    id: '4',
    name: 'Tech Titans',
    slug: 'tech-titans',
    class: 'Grade 12',
    image: '/placeholder.svg',
    points: 10,
  },
  {
    id: '5',
    name: 'Code Warriors',
    slug: 'code-warriors',
    class: 'Grade 11',
    image: '/placeholder.svg',
    points: 9,
  },
  {
    id: '6',
    name: 'Digital Lions',
    slug: 'digital-lions',
    class: 'Grade 10',
    image: '/placeholder.svg',
    points: 6,
  },
];

export const players: Player[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    slug: 'ahmed-hassan',
    class: 'Grade 12',
    image: '/placeholder.svg',
    teams: ['1'],
    goals: 12,
    assists: 8,
  },
  {
    id: '2',
    name: 'Omar Khalil',
    slug: 'omar-khalil',
    class: 'Grade 11',
    image: '/placeholder.svg',
    teams: ['2'],
    goals: 10,
    assists: 6,
  },
  {
    id: '3',
    name: 'Youssef Ibrahim',
    slug: 'youssef-ibrahim',
    class: 'Grade 12',
    image: '/placeholder.svg',
    teams: ['1'],
    goals: 8,
    assists: 10,
  },
  {
    id: '4',
    name: 'Mahmoud Ali',
    slug: 'mahmoud-ali',
    class: 'Grade 10',
    image: '/placeholder.svg',
    teams: ['3'],
    goals: 9,
    assists: 5,
  },
  {
    id: '5',
    name: 'Karim Samir',
    slug: 'karim-samir',
    class: 'Grade 11',
    image: '/placeholder.svg',
    teams: ['2'],
    goals: 7,
    assists: 9,
  },
  {
    id: '6',
    name: 'Tarek Mohamed',
    slug: 'tarek-mohamed',
    class: 'Grade 12',
    image: '/placeholder.svg',
    teams: ['4'],
    goals: 6,
    assists: 7,
  },
];

export const matches: Match[] = [
  {
    id: '1',
    team1: '1',
    team2: '2',
    slug: 'blue-dragons-vs-purple-knights',
    date: '2025-12-05',
    image: '/placeholder.svg',
    status: 'upcoming',
  },
  {
    id: '2',
    team1: '3',
    team2: '4',
    slug: 'cyber-eagles-vs-tech-titans',
    date: '2025-12-06',
    image: '/placeholder.svg',
    status: 'upcoming',
  },
  {
    id: '3',
    team1: '1',
    team2: '3',
    slug: 'blue-dragons-vs-cyber-eagles',
    date: '2025-11-28',
    image: '/placeholder.svg',
    scoreTeam1: 3,
    scoreTeam2: 1,
    status: 'completed',
  },
  {
    id: '4',
    team1: '2',
    team2: '4',
    slug: 'purple-knights-vs-tech-titans',
    date: '2025-11-27',
    image: '/placeholder.svg',
    scoreTeam1: 2,
    scoreTeam2: 2,
    wentToPenalties: true,
    penaltyTeam1: 4,
    penaltyTeam2: 3,
    status: 'completed',
  },
  {
    id: '5',
    team1: '5',
    team2: '6',
    slug: 'code-warriors-vs-digital-lions',
    date: '2025-12-08',
    image: '/placeholder.svg',
    status: 'upcoming',
  },
  {
    id: '6',
    team1: '1',
    team2: '4',
    slug: 'blue-dragons-vs-tech-titans',
    date: '2025-11-25',
    image: '/placeholder.svg',
    scoreTeam1: 4,
    scoreTeam2: 0,
    status: 'completed',
  },
];

export const getTeamById = (id: string): Team | undefined => {
  return teams.find(team => team.id === id);
};

export const getTeamBySlug = (slug: string): Team | undefined => {
  return teams.find(team => team.slug === slug);
};

export const getPlayerById = (id: string): Player | undefined => {
  return players.find(player => player.id === id);
};

export const getPlayerBySlug = (slug: string): Player | undefined => {
  return players.find(player => player.slug === slug);
};

export const getMatchById = (id: string): Match | undefined => {
  return matches.find(match => match.id === id);
};

export const getMatchBySlug = (slug: string): Match | undefined => {
  return matches.find(match => match.slug === slug);
};

export const getTopScorers = (limit: number = 5): Player[] => {
  return [...players].sort((a, b) => b.goals - a.goals).slice(0, limit);
};

export const getTopAssists = (limit: number = 5): Player[] => {
  return [...players].sort((a, b) => b.assists - a.assists).slice(0, limit);
};

export const getUpcomingMatches = (limit?: number): Match[] => {
  const upcoming = matches
    .filter(m => m.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return limit ? upcoming.slice(0, limit) : upcoming;
};

export const getNextMatch = (): Match | undefined => {
  return getUpcomingMatches(1)[0];
};

export const getBestTeam = (): Team | undefined => {
  return [...teams].sort((a, b) => b.points - a.points)[0];
};
