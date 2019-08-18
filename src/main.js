import React from "react";
import axios from "axios";
import Search from "./components/search";
import Cards from "./components/cards";
import Paginate from "./components/paginate";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      deals: [],
      query: "",
      location: "",
      radius: "",
      online: false,
      errMsg: "",
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.searchDeals = this.searchDeals.bind(this);
    this.onChangeTwo = this.onChangeTwo.bind(this);
    //this.paginate = this.paginate.bind(this);
  }

  async onChange(e) {
    await this.setState({ [e.target.name]: e.target.value });
  }

  async onChangeTwo(e) {
    await this.setState({
      //Clears location and radius fields if
      [e.target.name]: e.target.value, //user selects yes for online only
      location: "",
      radius: "",
      currentPage: ""
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        if (position) {
          //Show local dicounts if the
          axios //user allows geolocation
            .get(
              `https://api.discountapi.com/v2/deals/?&location=${
                position.coords.latitude
              },${position.coords.longitude}&radius=20&page=${4}&api_key=${
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
      },
      error => {
        if (error) {
          //Show online discounts if
          axios //user declines geolocation
            .get(
              `https://api.discountapi.com/v2/deals/?api_key=${
                process.env.REACT_APP_SECRET
              }`
            )
            .then(
              res => {
                const deals = res.data;
                this.setState({ deals });
              },
              error => {
                console.log(error);
              }
            );
        }
      }
    );
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

  //paginate() {

  //}

  render() {
    return (
      <div>
        <Search
          data={this.state}
          handler={this.onChange}
          handlerTwo={this.onChangeTwo}
          submit={this.searchDeals}
        />
        <div
          className="container text-center"
          hidden={this.state.errMsg === "No results found" ? true : false}
        >
          {this.state.deals.length === 0 ? "Loading..." : ""}
        </div>
        <Cards errMsg={this.state.errMsg} deals={this.state.deals} />
        <Paginate paginate={this.paginate} />
      </div>
    );
  }
}
