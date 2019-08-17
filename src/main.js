import React from "react";
import axios from "axios";
import Cards from "./components/cards";
import Search from "./components/search";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      deals: [],
      query: "",
      location: "",
      radius: "",
      online: false,
      errMsg: ""
    };
    this.onChange = this.onChange.bind(this);
    this.searchDeals = this.searchDeals.bind(this);
  }

  async onChange(e) {
    await this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      if (position) {  //Show local dicounts if the user allows geolocation
        axios
          .get(
            `https://api.discountapi.com/v2/deals/?&location=${
              position.coords.latitude
            },${position.coords.longitude}&radius=20&api_key=${
              process.env.REACT_APP_SECRET
            }`
          )
          .then(
            res => {
              const deals = res.data.deals;
              this.setState({ deals });
            },
            error => {
              console.log(error);
            }
          );
      } 
    }, error => {
      if (error) {  //Show online discounts if user declines geolocation
        axios
          .get(
            `https://api.discountapi.com/v2/deals/?api_key=${
              process.env.REACT_APP_SECRET
            }`
          )
          .then(
            res => {
              const deals = res.data.deals;
              this.setState({ deals });
            },
            error => {
              console.log(error);
            }
          );
      }
      console.log(error)
    });
  }

  searchDeals(e) {
    e.preventDefault();
    const { location, radius, query, online } = this.state;
    axios
      .get(
        `https://api.discountapi.com/v2/deals/?query=${query}&location=${location}&radius=${radius}&online=${online}&api_key=${
          process.env.REACT_APP_SECRET
        }`
      )
      .then(res => {
        const deals = res.data.deals;
        console.log(res.data);
        deals.length === 0
          ? this.setState({
              errMsg: "No results found",
              deals: []
            })
          : this.setState({
              deals: deals,
              errMsg: ""
            });
      });
  }

  render() {
    return (
      <div>
        <Search
          data={this.state}
          handler={this.onChange}
          submit={this.searchDeals}
        />
        <Cards errMsg={this.state.errMsg} deals={this.state.deals} />
      </div>
    );
  }
}
