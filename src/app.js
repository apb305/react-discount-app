import React from "react";
import Main from "./main";
import Header from "./components/header"

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}
