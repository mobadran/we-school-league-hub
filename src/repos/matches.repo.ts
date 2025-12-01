import { client } from "@/lib/sanity";

export interface TeamRef {
  _id: string;
  slug: string;
  class: string;
  image?: string;
  points?: number;
  group?: number;
}

export interface Match {
  _id: string;
  slug: string;
  date: string;
  image?: string;
  team1: TeamRef;
  team2: TeamRef;
  scoreTeam1?: number;
  scoreTeam2?: number;
  wentToPenalties?: boolean;
  penaltyTeam1?: number;
  penaltyTeam2?: number;
  status: "upcoming" | "completed";
}

const teamRefProjection = `{
  _id,
  name,
  "slug": slug.current,
  class,
  "image": image.asset->url,
  points,
  group,
}`;

const matchProjection = `{
  _id,
  "slug": slug.current,
  date,
  "image": image.asset->url,
  team1-> ${teamRefProjection},
  team2-> ${teamRefProjection},
  scoreTeam1,
  scoreTeam2,
  wentToPenalties,
  penaltyTeam1,
  penaltyTeam2,
  "status": select(date <= now() || (defined(scoreTeam1) && defined(scoreTeam2)) => "completed", "upcoming"),
}`;

export const getMatches = async (): Promise<Match[]> => {
  const query = `*[_type == "match"] ${matchProjection} | order(date desc)`;
  return client.fetch<Match[]>(query);
};

export const getUpcomingMatches = async (limit?: number): Promise<Match[]> => {
  const base = `*[_type == "match" && date >= now()] ${matchProjection} | order(date asc)`;
  const query = limit != null ? `${base}[0...$limit]` : base;
  return client.fetch<Match[]>(query, { limit });
};

export const getNextMatch = async (): Promise<Match | null> => {
  const query = `*[_type == "match" && date > now()] | order(date asc)[0] ${matchProjection}`;
  return client.fetch<Match | null>(query);
};

export const getMatchBySlug = async (slug: string): Promise<Match | null> => {
  const query = `*[_type == "match" && slug.current == $slug][0] ${matchProjection}`;
  return client.fetch<Match | null>(query, { slug });
};

export const getMatchesByTeamId = async (teamId: string): Promise<Match[]> => {
  const query = `*[_type == "match" && (team1._ref == $teamId || team2._ref == $teamId)] ${matchProjection} | order(date desc)`;
  return client.fetch<Match[]>(query, { teamId });
};
