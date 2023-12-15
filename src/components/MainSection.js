import React from "react";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Empower Your Insights with Employee Reports</h1>
        <p
          style={{
            fontFamily: "poppins",
            marginLeft: "-6rem",
            marginTop: "25px",
          }}
        >
          Employee Reporting Made Simple
        </p>
      </div>

      <div className="pdf-link">
        <p>
          <i className="fa-solid fa-circle-check"></i> Get a PDF generated file
          of the employee report
        </p>
      </div>

      <div className="hero-image">
        <img src="SM.PNG" alt="Hero" />
      </div>
    </section>
  );
}

export default HeroSection;
