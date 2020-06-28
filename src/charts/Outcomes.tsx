import React, { useState, useEffect } from "react";
import { getOutcomes, Outcomes } from "../services/casesByOutcome";
//import { Sankey, Tooltip } from "recharts";

const CasesByAge = () => {
  const [outcomeData, setOutcomeData] = useState<Outcomes | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const outcomes = await getOutcomes();
      setOutcomeData(outcomes);
    };
    fetchData();
  }, []);

  return (
    <div className="pcc-cases-by-age">
      <h2>Outcomes</h2>
      {/* {outcomeData && (
        <Sankey
          width={800}
          height={400}
          data={outcomeData}
          node={{ stroke: "#77c878", strokeWidth: 2 }}
          link={{ stroke: "#77c878", strokeWidth: 2 }}
        >
          <Tooltip />
        </Sankey>
      )} */}
    </div>
  );
};

export default CasesByAge;
