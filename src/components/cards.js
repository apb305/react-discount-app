import React from "react";

export default function Cards(props) {
  return (
    <div>
      <div className="container mb-5 mt-2">
        <div className="row">
          {props.deals.map((deal, id) => (
            <div className="col-sm-4 col-md-4 col-lg-4" key={id}>
              <div className="card mt-3 ml-3 rounded-1 shadow mx-auto text-center">
                <a href={deal.deal.url} target="noopener noreferrer">
                  <img
                    className="card-img-top"
                    src={deal.deal.image_url}
                    alt={"Deal"}
                    style={{ maxHeight: "200px", minHeight: "200px" }}
                  />
                </a>
                <div className="card-body">
                  <h5 className="card-title text-truncate">
                    {deal.deal.title}
                  </h5>
                  <p className="card-text text-truncate small">
                    {deal.deal.merchant.name}
                  </p>
                  <p className="card-text small">${deal.deal.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center">{props.errMsg}</p>
    </div>
  );
}
