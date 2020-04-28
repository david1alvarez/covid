import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {data: []}

    // this.GetWorldStatistics = this.GetWorldStatistics.bind(this);
  }


  GetWorldStatistics() {
    fetch('https://coronavirus-19-api.herokuapp.com/all', {method: 'GET'})
      .then((response) =>{
        return response.json();
      })
      .then(json => {
        this.setState({ data: json});
      })
  }

  componentDidMount() {
    this.GetWorldStatistics();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>Global COVID19 stats:</div>
          <div>cases: {this.state.data.cases}</div>
          <div>deaths: {this.state.data.deaths}</div>
          <div>recovered: {this.state.data.recovered}</div>
        </header>
      </div>
    );
  }
}

export default App;