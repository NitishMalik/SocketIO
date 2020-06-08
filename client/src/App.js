import React from "react";
import "./App.css";
import socketIOClient from "socket.io-client";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      response: null,
      endpoint: "http://127.0.0.1:4001",
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", (data) => this.setState({ response: data }));
  }
  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response ? (
          <div>
            <p> Name of town : {response.name} </p>
            <p> Temperature of town : {response.temp} </p>
            <p> Temperature of town feels like : {response.feelsLike} </p>
          </div>
        ) : (
          <p> Loading ...</p>
        )}
      </div>
    );
  }
}

export default App;
