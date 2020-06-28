import { get } from "./http";

export interface Outcomes {
  nodes: { name: string }[];
  links: {
    source: number;
    target: number;
    value: number;
  }[];
}

interface OutcomeRow {
  count: number;
  covid_outcome: string;
}

interface OutcomeMap {
  [type: string]: number;
}

const generateSankeyMapping = (outcomeRows: OutcomeRow[]): Outcomes => {
  let outcomes: OutcomeMap = {};

  outcomeRows.forEach((outcomeEntry) => {
    outcomes[outcomeEntry.covid_outcome] = outcomeEntry.count;
  });

  const totalPositive = outcomes.positive + outcomes.died;

  return {
    nodes: [
      { name: "total" },
      { name: "negative tests" },
      { name: "positive tests" },
      { name: "positive outcomes" },
      { name: "deaths" },
    ],
    links: [
      {
        source: 0,
        target: 1,
        value: outcomes.negative,
      },
      {
        source: 0,
        target: 2,
        value: totalPositive,
      },
      {
        source: 2,
        target: 3,
        value: outcomes.positive,
      },
      {
        source: 2,
        target: 4,
        value: outcomes.died,
      },
    ],
  };
};

export const getOutcomes = async (): Promise<Outcomes | null> => {
  let response;
  try {
    response = await get(
      "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20covid_cases_by_date%20WHERE%20test_result%20=%20%27positive%27"
    );
  } catch {
    return null;
  }

  return generateSankeyMapping(response.rows);
};
