import "./ICForm.css";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ICForm = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    targetJobRole: "frontendDeveloper",
    otherJobRole: "",
    experienceLevel: "fresher",
    html: false,
    css: false,
    javaScript: false,
    typeScript: false,
    react: false,
    nodeJS: false,
    python: false,
    java: false,
    sql: false,
    mongoDB: false,
    none: false,
    difficultyLevel: "medium",
    interviewDuration: "30",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    setInputs((values) => ({ ...values, [name]: val }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const hasSelectedSkills =
      inputs.html ||
      inputs.css ||
      inputs.java ||
      inputs.javaScript ||
      inputs.python ||
      inputs.typeScript ||
      inputs.mongoDB ||
      inputs.react ||
      inputs.sql ||
      inputs.nodeJS ||
      inputs.none;
    if (!hasSelectedSkills) {
      alert("Please select atleast one skill ..");
      return;
    }

    const {
      html,
      css,
      javaScript,
      typeScript,
      react,
      nodeJS,
      python,
      java,
      sql,
      mongoDB,
      none,
      ...rest
    } = inputs;
    const skillsMap = {
      html,
      css,
      javaScript,
      typeScript,
      react,
      nodeJS,
      python,
      java,
      sql,
      mongoDB,
      none,
    };
    const selectedSkills = Object.keys(skillsMap).filter(
      (key) => skillsMap[key],
    );

    const existingInterview =
      JSON.parse(localStorage.getItem("currentInterview")) || {};

    const jobRole = inputs.targetJobRole === "other" ? inputs.otherJobRole : inputs.targetJobRole;

    const updateInterview = {
      ...existingInterview,
      ...rest, // targetJobRole, otherJobRole, experienceLevel, difficultyLevel, interviewDuration
      jobRole,
      skills: selectedSkills, // e.g. ["html", "react", "sql"]
    };

    // const updateInterview = {
    //   ...existingInterview,
    //   ...inputs,
    // };

    localStorage.setItem("currentInterview", JSON.stringify(updateInterview));

    navigate("/mockinterview");
  };

  return (
    <div className="ICFBox">
      <form>
        <h5 className="TJRHeading">Target Job Role</h5>
        <select
          name="targetJobRole"
          id="tjr"
          value={inputs.targetJobRole}
          onChange={handleChange}
          className="TJRSelect"
        >
          <option value="frontendDeveloper">Frontend Developer</option>
          <option value="reactDeveloper">React Developer</option>
          <option value="backendDeveloper">Backend Developer</option>
          <option value="fullStackDeveloper">Full Stack Developer</option>
          <option value="softwareEngineer">Software Engineer</option>
          <option value="javaScriptDeveloper">JavaScript Developer</option>
          <option value="mobileAppDeveloper">Mobile App Developer</option>
          <option value="devOpsEngineer">DevOps Engineer</option>
          <option value="dataAnalyst">Data Analyst</option>
          <option value="dataScientist">Data Scientist</option>
          <option value="UI/UXDesigner">UI/UX Designer</option>
          <option value="other">Others</option>
        </select>

        <input
          type="text"
          required
          placeholder="Specify Job Role"
          name="otherJobRole"
          autoComplete="false"
          value={inputs.otherJobRole}
          onChange={handleChange}
          className={`othersJobRole ${inputs.targetJobRole === "other" ? "others" : ""}`}
        />

        <h5 className="ELHeading">Experience Level</h5>
        <select
          name="experienceLevel"
          id="el"
          value={inputs.experienceLevel}
          onChange={handleChange}
          className="ELSelect"
        >
          <option value="fresher">Fresher</option>
          <option value="entryLevel">Entry Level</option>
          <option value="junior">Junior</option>
          <option value="midLevel">Mid Level</option>
          <option value="senior">Senior</option>
        </select>

        <h4 className="TSHeading">Technology / Skills</h4>

        <div className="skillsDiv">
          <label htmlFor="skillHTML" className="Label">
            HTML
            <input
              type="checkbox"
              name="html"
              id="skillHTML"
              checked={inputs.html}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="skillCSS" className="Label">
            CSS
            <input
              type="checkbox"
              name="css"
              id="skillCSS"
              checked={inputs.css}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="skillJavaScript" className="Label">
            JavaScript
            <input
              type="checkbox"
              name="javaScript"
              id="skillJavaScript"
              checked={inputs.javaScript}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="skillTypeScript" className="Label">
            TypeScript
            <input
              type="checkbox"
              name="typeScript"
              id="skillTypeScript"
              checked={inputs.typeScript}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="skillReact" className="Label">
            React
            <input
              type="checkbox"
              name="react"
              id="skillReact"
              checked={inputs.react}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="skillNodeJS" className="Label">
            Node.JS
            <input
              type="checkbox"
              name="nodeJS"
              id="skillNodeJS"
              checked={inputs.nodeJS}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="skillpython" className="Label">
            Python
            <input
              type="checkbox"
              name="python"
              id="skillpython"
              checked={inputs.python}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="skillJava" className="Label">
            Java
            <input
              type="checkbox"
              name="java"
              id="skillJava"
              checked={inputs.java}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="skillsql" className="Label">
            SQL
            <input
              type="checkbox"
              name="sql"
              id="skillsql"
              checked={inputs.sql}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="skillMongoDB" className="Label">
            MongoDB
            <input
              type="checkbox"
              name="mongoDB"
              id="skillMongoDB"
              checked={inputs.mongoDB}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="skillNone" className="Label">
            None
            <input
              type="checkbox"
              name="none"
              id="skillnone"
              checked={inputs.none}
              onChange={handleChange}
            />
          </label>
        </div>

        <h5 className="DLHeading">Difficulty Level</h5>
        <select
          name="difficultyLevel"
          id="dl"
          value={inputs.difficultyLevel}
          onChange={handleChange}
          className="DLSelect"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <h5 className="IDHeading">Interview Duration</h5>
        <select
          name="interviewDuration"
          id="ID"
          value={inputs.interviewDuration}
          onChange={handleChange}
          className="IDSelect"
        >
          <option value="15">15 Minutes</option>
          <option value="30">30 Minutes</option>
          <option value="45">45 Minutes</option>
          <option value="60">60 Minutes</option>
        </select>

        {/* <Link to="/mockinterview">
          <button className="startInterview">Start Interview</button>
        </Link> */}

        <button className="startInterview" onClick={(e) => submitHandler(e)}>
          Start Interview
        </button>
      </form>
    </div>
  );
};

export default ICForm;
