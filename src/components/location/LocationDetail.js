import React, { useState, useEffect } from 'react';
import LocationManager from '../../modules/LocationManager';
import { firstLetterCase } from '../../modules/helpers';
import EmployeeCard from '../employee/EmployeeCard';
import EmployeeManager from '../../modules/EmployeeManager';

const LocationDetail = props => {
    const [location, setLocation] = useState({});
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleLocationDelete = () => {
        if (employees.length === 0) {
            if (window.confirm("Are you sure you want to close this location?")) {
                setIsLoading(true);
                LocationManager.delete(props.locationId).then(() =>
                    props.history.push("/locations")
                );
            }
        } else {
            window.alert("Please reassign all employees working at this location before closing the location.")
        }
        
    };

    const handleEmployeeDelete = (employeeId) => {
        EmployeeManager.delete(employeeId).then(() =>
            props.history.push("/employees")
        );
}

    useEffect(() => {
        LocationManager.getWithEmployees(props.match.params.locationId)
            .then(location => {
                setLocation({
                    name: location.name,
                    phoneNumber: location.phoneNumber,
                    address: location.address,
                    hours: location.hours
                });
                setEmployees(location.employees);
                setIsLoading(false);
            });
    }, [props.match.params.locationId]);

    if (location.name === undefined) {
        return (
            <div className="notFound">
                <h2>The location you are searching for does not exist</h2>
            </div>
        )
    } else {
        return (
            <>
                <button type="button"
                    className="back"
                    onClick={() => { props.history.push("/locations") }}>
                    Go Back
                </button>
                <div className="card">
                    <div className="card-content">
                        <picture>
                            <img src={require("./nashville-skyline.jpg")} alt="Nashville Skyline" />
                        </picture>
                        <h3>Location: <span style={{ color: 'darkslategrey' }}>{firstLetterCase(location.name)}</span></h3>
                        <p>Phone Number: {location.phoneNumber}</p>
                        <p>Address: {location.address}</p>
                        <p>Hours: {location.hours}</p>
                        {props.hasUser
                            ? <button type="button"
                                onClick={() => props.history.push(`/locations/${props.locationId}/edit`)}>
                                Edit
                                </button>
                            : null}
                        {props.hasUser
                            ? <button type="button" disabled={isLoading} onClick={handleLocationDelete}>
                                Close
                                </button>
                            : null}

                    </div>
                </div>
                {props.hasUser
                    ? < h1 className="expandedDetails">Current Employees:</h1>
                    : null}
                {props.hasUser
                    ? <div className="card">
                        {employees.map(employee =>
                            <EmployeeCard
                                key={employee.id}
                                employee={employee}
                                deleteEmployee={handleEmployeeDelete}
                                {...props}
                            />
                        )}
                    </div>
                    : null}
            </>
        );
    }
}

export default LocationDetail;