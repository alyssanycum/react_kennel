import React from "react";
import { firstLetterCase } from '../../modules/helpers';
import { Link } from "react-router-dom";

const EmployeeCard = (props) => {
  return (
    <div className="card">
      <div className="card-content">
        <picture>
          <img src={require("./profile-icon.png")} alt="Employee" />
        </picture>
        <h3>
          Name: <span className="card-employeename">{firstLetterCase(props.employee.name)}</span>
        </h3>
        <p>Job Title: {firstLetterCase(props.employee.jobTitle)}</p>
        <Link to={`/employees/${props.employee.id}`}>
          <button>Details</button>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeCard;