import React, { useState, useEffect } from "react"
import OwnerManager from "../../modules/OwnerManager"

const OwnerEditForm = props => {
  const [owner, setOwner] = useState({ name: "", phoneNumber: "", email: "", petName: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...owner };
    stateToChange[evt.target.id] = evt.target.value;
    setOwner(stateToChange);
  };

  const updateExistingOwner = evt => {
    evt.preventDefault()
    if (owner.name === "" || owner.phoneNumber === "" || owner.email === "" || owner.petName === "") {
      window.alert("Please fill out all fields");
    } else {
      setIsLoading(true);

      const editedOwner = {
        id: props.match.params.ownerId,
        name: owner.name,
        phoneNumber: owner.phoneNumber,
        email: owner.email,
        petName: owner.petName
      };

      OwnerManager.update(editedOwner)
        .then(() => props.history.push(`/owners/${owner.id}`))
    }
  }

  useEffect(() => {
    OwnerManager.get(props.match.params.ownerId)
      .then(owner => {
        setOwner(owner);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <button type="button"
        className="back"
        onClick={() => { props.history.push(`/owners/${owner.id}`) }}>
        Go Back
      </button>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={owner.name}
            />
            <label htmlFor="name">Owner name</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="phoneNumber"
              value={owner.phoneNumber}
            />
            <label htmlFor="phoneNumber">Phone Number</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="email"
              value={owner.email}
            />
            <label htmlFor="email">Email</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="petName"
              value={owner.petName}
            />
            <label htmlFor="petName">Pet's Name</label>

          </div>
          <div className="alignRight">
            <button
              type="button" disabled={isLoading}
              onClick={updateExistingOwner}
              className="btn btn-primary"
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default OwnerEditForm