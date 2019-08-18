import React from "react";

export default function Paginate(props) {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <button className="page-link" tabIndex="-1" aria-disabled="true">
              Previous
            </button>
          </li>
          <li className="page-item">
            <button className="page-link">
              1
            </button>
          </li>
          <li className="page-item">
            <button className="page-link">
              2
            </button>
          </li>
          <li className="page-item">
            <button className="page-link">
              3
            </button>
          </li>
          <li className="page-item">
            <button className="page-link">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
