import React from "react";

const Footer = () => {
  return (
    <footer className="pcc-footer">
      <div className="pcc-footer__content">
        <p>
          Powered by{" "}
          <a href="https://www.opendataphilly.org/dataset/covid-cases">
            OpenDataPhilly
          </a>
        </p>
        <p>
          <a href="https://github.com/dbreslin424/phillycovidcurve">
            Source Code
          </a>
          &nbsp;| Github
        </p>
      </div>
    </footer>
  );
};

export default Footer;
