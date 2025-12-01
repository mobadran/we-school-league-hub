import { client } from "@/lib/sanity";

export interface Team {
  _id: string;
  name?: string;
  slug: string;
  class: string;
  image?: string;
  points?: number;
  group: number;
}

const teamProjection = `{
  _id,
  name,
  "slug": slug.current,
  class,
  "image": image.asset->url,
  points,
  group,
}`;

export const getTeams = async (): Promise<Team[]> => {
  const query = `*[_type == "team"] ${teamProjection} | order(points desc)`;
  return client.fetch<Team[]>(query);
};

export const getTeamBySlug = async (slug: string): Promise<Team | null> => {
  const query = `*[_type == "team" && slug.current == $slug][0] ${teamProjection}`;
  return client.fetch<Team | null>(query, { slug });
};

export const getTeamById = async (id: string): Promise<Team | null> => {
  const query = `*[_type == "team" && _id == $id][0] ${teamProjection}`;
  return client.fetch<Team | null>(query, { id });
};

export const getBestTeam = async (): Promise<Team | null> => {
  const query = `*[_type == "team"] ${teamProjection} | order(points desc)[0]`;
  return client.fetch<Team | null>(query);
};
