import { get } from "./http";

export interface DailyCaseEntry {
  result_date: string;
  count: number;
  delta: number;
  formattedDate: string;
  test_result: string;
}

const sortByDate = (cases: DailyCaseEntry[]): DailyCaseEntry[] => {
  return cases.sort((a, b) => {
    const aDate = new Date(a.result_date);
    const bDate = new Date(b.result_date);

    return aDate < bDate ? -1 : aDate > bDate ? 1 : 0;
  });
};

const parseCases = (cases: DailyCaseEntry[]): DailyCaseEntry[] =>
  cases.map((day, index, dayArray) => {
    const date = new Date(day.result_date);

    return {
      ...day,
      formattedDate: `${date.getMonth() + 1}/${date.getDate()}`,
      delta: index !== 0 ? day.count - dayArray[index - 1].count : 0,
    };
  });

export const getDailyCases = async (): Promise<DailyCaseEntry[]> => {
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
