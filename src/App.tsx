import React from 'react';
import './App.css';

interface GlobalData {
  cases: number;
  deaths: number;
  recovered: number;
}

interface GlobalState {
  data: GlobalData
}

class App extends React.Component {
  state: GlobalState = {data: {
    cases: 0,
    deaths: 0,
    recovered: 0
  }}


  GetWorldStatistics() {
    fetch('https://coronavirus-19-api.herokuapp.com/all', {method: 'GET'})
      .then((response) =>{
        return response.json();
      })
      .then((json: GlobalData) => {
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
          <div>Global COVID 19 stats:</div>
          <div>cases: {this.state.data.cases}</div>
          <div>deaths: {this.state.data.deaths}</div>
          <div>recovered: {this.state.data.recovered}</div>
        </header>
      </div>
    );
  }
}

export default App;