import { client } from "@/lib/sanity";

export interface TeamRef {
  _id: string;
  name: string;
  slug: string;
  class: string;
  image?: string;
  points?: number;
}

export interface Player {
  _id: string;
  name: string;
  slug: string;
  class: string;
  image?: string;
  teams: TeamRef[];
  goals: number;
  assists: number;
}

const teamRefProjection = `{
  _id,
  name,
  "slug": slug.current,
  class,
  "image": image.asset->url,
  points
}`;

const playerProjection = `{
  _id,
  name,
  "slug": slug.current,
  class,
  "image": image.asset->url,
  teams[]-> ${teamRefProjection},
  goals,
  assists,
}`;

export const getPlayers = async (): Promise<Player[]> => {
  const query = `*[_type == "player"] ${playerProjection}`;
  return client.fetch<Player[]>(query);
};

export const getTopScorers = async (limit: number = 5): Promise<Player[]> => {
  const query = `*[_type == "player"] ${playerProjection} | order(goals desc)[0...$limit]`;
  return client.fetch<Player[]>(query, { limit });
};

export const getTopAssists = async (limit: number = 5): Promise<Player[]> => {
  const query = `*[_type == "player"] ${playerProjection} | order(assists desc)[0...$limit]`;
  return client.fetch<Player[]>(query, { limit });
};

export const getPlayerBySlug = async (slug: string): Promise<Player | null> => {
  const query = `*[_type == "player" && slug.current == $slug][0] ${playerProjection}`;
  return client.fetch<Player | null>(query, { slug });
};

export const getPlayersByTeamId = async (teamId: string): Promise<Player[]> => {
  const query = `*[_type == "player" && $teamId in teams[]._ref] ${playerProjection}`;
  return client.fetch<Player[]>(query, { teamId });
};
