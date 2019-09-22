import React from 'react'

export default function Header() {
    return (
        <div className="container text-center mt-3">
            <h2>Deals</h2>
            <p>This is a Discount app written in React JS. It uses the API from Discountsapi.com for the data. See code for this project
            <a
              href="https://github.com/apb305/react-discount-app"
              target="noopener noreferrer"
            >
              {" "}
              here
            </a></p>
            <p className="small">Created By: Anthony Bernard</p>
        </div>
    )
}
