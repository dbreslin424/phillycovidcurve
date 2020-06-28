import React, { useState, useEffect } from "react";
import { getDailyCases, DailyCaseEntry } from "../services/casesByDate";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  Legend,
} from "recharts";

const DailyCases: React.FC = () => {
  const [caseData, setCaseData] = useState<DailyCaseEntry[] | undefined>();
  const [showDelta, setShowDelta] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const cases = await getDailyCases();
      setCaseData(cases);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Daily New Cases</h2>
      <LineChart width={800} height={450} data={caseData}>
        <XAxis dataKey="formattedDate" minTickGap={75} />
        <YAxis dataKey="count" yAxisId={0} />
        {showDelta && <YAxis dataKey="delta" yAxisId={1} orientation="right" />}
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Line
          name="new cases"
          type="monotone"
          dataKey="count"
          stroke="#ff7300"
          yAxisId={0}
        />
        {showDelta && (
          <Line
            name="new case rate"
            type="monotone"
            dataKey="delta"
            stroke="#387908"
            yAxisId={1}
          />
        )}
      </LineChart>
      <input
        type="checkbox"
        onChange={() => setShowDelta((delta) => !delta)}
        id="delta-toggle"
      />
      <label htmlFor="delta-toggle">Display new case rate</label>
    </div>
  );
};

export default DailyCases;
