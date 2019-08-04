import React from "react";

export default function Search(props) {
  const {query, location, radius, online} = props.data
  return (
    <div>
      <form onSubmit={props.submit}>
        <div className="input-group container mt-3">
          <input
            className="form-control mr-1 col-4 rounded-0"
            name="query"
            value={query}
            onChange={props.handler}
            placeholder="Term"
            required
          />
          <input
            className="form-control"
            name="location"
            value={location}
            onChange={props.handler}
            placeholder="Location"
            disabled={online === "true" ? true : false}
            required
          />
          <div className="input-group-prepend">
            <button type="submit" className="btn btn-secondary">
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
        <div className="container mt-2">
          <input
            className="form-control col-4 rounded-0"
            type="number"
            name="radius"
            value={radius}
            onChange={props.handler}
            placeholder="Radius"
            disabled={online === "true" ? true : false}
            required
          />
          <div className="mt-2">
          <span>Online only: </span>
          <label className="mr-1">
            Yes
          </label>
          <input
          className="mr-1"
            name="online"
            value={true}
            type="radio"
            onChange={props.handler}
            />
          <label className="mr-1">
            No
          </label>
          <input
            value={false}
            name="online"
            type="radio"
            onChange={props.handler}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
