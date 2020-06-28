import { get } from "./http";

export interface DailyCaseRow {
  result_date: string;
  count: number;
  delta: number;
  formattedDate: string;
  test_result: string;
  [field: string]: any;
}

interface DailyCaseResponse {
  rows: DailyCaseRow[];
}

const sortByDate = (cases: DailyCaseRow[]): DailyCaseRow[] => {
  return cases.sort((a, b) => {
    const aDate = new Date(a.result_date);
    const bDate = new Date(b.result_date);

    return aDate < bDate ? -1 : aDate > bDate ? 1 : 0;
  });
};

const parseCases = (cases: DailyCaseRow[]): DailyCaseRow[] =>
  cases.map((day, index, dayArray) => {
    const date = new Date(day.result_date);

    return {
      ...day,
      formattedDate: `${date.getMonth() + 1}/${date.getDate()}`,
      delta: index !== 0 ? day.count - dayArray[index - 1].count : 0,
    };
  });

export const getDailyCases = async (): Promise<DailyCaseRow[]> => {
  let response;
  try {
    response = await get(
      "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20covid_cases_by_date%20WHERE%20test_result%20=%20%27positive%27"
    );
  } catch {
    return [];
  }

  const sorted = sortByDate(response.rows);

  return parseCases(sorted);
};
