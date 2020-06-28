import React, { useState, useEffect } from "react";
import { getCasesByAge, CaseAgeRow } from "../services/caseByAge";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a83295"];

const CasesByAge = () => {
  const [ageData, setAgeData] = useState<CaseAgeRow[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const ages = await getCasesByAge();
      setAgeData(ages);
    };
    fetchData();
  }, []);

  return (
    <div className="pcc-cases-by-age">
      <h2>Cases by age</h2>
      <PieChart width={400} height={225}>
        <Pie
          data={ageData}
          dataKey="count"
          nameKey="age"
          label
          labelLine={false}
        >
          {ageData?.map((entry, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default CasesByAge;
