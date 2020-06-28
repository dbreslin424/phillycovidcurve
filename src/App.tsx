import React from "react";
import "./styles/App.scss";
import DailyCases from "./charts/DailyCases";
import CasesByAge from "./charts/CasesByAge";
import Header from "./views/Header";
import Footer from "./views/Footer";

function App() {
  return (
    <div className="App pcc-grid">
      <Header />
      <article className="pcc-main-container">
        <DailyCases />
        <CasesByAge />
      </article>
      <Footer />
    </div>
  );
}

export default App;
