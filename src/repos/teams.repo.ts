import { client } from "@/lib/sanity";
import { Match } from "./matches.repo";

export interface Team {
  _id: string;
  name?: string;
  slug: string;
  class: string;
  image?: string;
  points?: number;
  group: number;
  wins?: number;
  draws?: number;
  losses?: number;
  goalsFor?: number;
  goalsAgainst?: number;
}

const points = `
"wins": count(*[
  _type == "match" &&
  defined(scoreTeam1) && defined(scoreTeam2) &&     // ignore unplayed matches
  (
    (team1._ref == ^._id && scoreTeam1 > scoreTeam2) ||
    (team2._ref == ^._id && scoreTeam2 > scoreTeam1)
  )
]),

"draws": count(*[
  _type == "match" &&
  defined(scoreTeam1) && defined(scoreTeam2) &&
  scoreTeam1 == scoreTeam2 &&
  (team1._ref == ^._id || team2._ref == ^._id)
]),

"losses": count(*[
  _type == "match" &&
  defined(scoreTeam1) && defined(scoreTeam2) &&
  (
    (team1._ref == ^._id && scoreTeam1 < scoreTeam2) ||
    (team2._ref == ^._id && scoreTeam2 < scoreTeam1)
  )
]),

"points": (
  3 * count(*[
    _type == "match" &&
    defined(scoreTeam1) && defined(scoreTeam2) &&
    (
      (team1._ref == ^._id && scoreTeam1 > scoreTeam2) ||
      (team2._ref == ^._id && scoreTeam2 > scoreTeam1)
    )
  ])
  +
  count(*[
    _type == "match" &&
    defined(scoreTeam1) && defined(scoreTeam2) &&
    scoreTeam1 == scoreTeam2 &&
    (team1._ref == ^._id || team2._ref == ^._id)
  ])
)
`;

const teamProjection = `{
  _id,
  name,
  "slug": slug.current,
  class,
  "image": image.asset->url,
  group,
  ${points}
}`;

export const getTeams = async (): Promise<Team[]> => {
  // 1. Fetch all teams
  const teamQuery = `*[_type == "team"] ${teamProjection}`;
  const teams = await client.fetch<Team[]>(teamQuery);

  // 2. Fetch all matches with proper aliases
  const matchQuery = `*[_type == "match"]{
    scoreTeam1,
    scoreTeam2,
    "team1Id": team1._ref,
    "team2Id": team2._ref
  }`;
  const matches = await client.fetch(matchQuery);

  // 3. Calculate goalsFor and goalsAgainst for each team
  const teamsWithGoals = teams.map((team) => {
    let goalsFor = 0;
    let goalsAgainst = 0;

    matches.forEach((match) => {
      if (match.team1Id === team._id) {
        goalsFor += match.scoreTeam1 ?? 0;
        goalsAgainst += match.scoreTeam2 ?? 0;
      } else if (match.team2Id === team._id) {
        goalsFor += match.scoreTeam2 ?? 0;
        goalsAgainst += match.scoreTeam1 ?? 0;
      }
    });

    return { ...team, goalsFor, goalsAgainst };
  });

  // 4. Sort teams (based on points, wins, draws)
  const sortedTeams = teamsWithGoals.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.draws - a.draws;
  });

  return sortedTeams;
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
