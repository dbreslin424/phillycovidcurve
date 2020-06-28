import { get } from "./http";


const AGE_ORDERS: any = {
  "<20": 0,
  "20-34": 1,
  "35-54": 2,
  "55-74": 3,
  "75+": 4,
};

export interface CaseAgeRow {
  age: string;
  count: number;
  [field: string]: any;
}

const sortByAge = (cases: CaseAgeRow[]): CaseAgeRow[] => {
  return cases.sort((a, b) => {
    return AGE_ORDERS[a.age] < AGE_ORDERS[b.age]
    ? -1
    : AGE_ORDERS[a.age] > AGE_ORDERS[b.age]
    ? 1
      : 0;
  });
};

export const getCasesByAge = async (): Promise<CaseAgeRow[]> => {
  let response;
  try {
    response = await get(
      "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20covid_cases_by_age"
    );
  } catch {
    return [];
  }

  const sorted = sortByAge(response.rows);

  return sorted;
};
