import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import * as d3 from 'd3';
import './Graph.css';
import LineChart from './LineChart';

class Graph extends Component {
    constructor() {
        super();
        this.state = {data: [], covidData: {}};

        this.GetWorldStatistics = this.GetWorldStatistics.bind(this);
    }

    componentDidMount() {
        this.GetWorldStatistics()
    }

    GetWorldStatistics() {
        fetch('https://covidtracking.com/api/v1/us/daily.json', {method: 'GET', headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }} )
        .then((response) =>{
            return response.json();
        })
        .then(json => {
            this.setState({ data: json, covidData: [
                {
                    points: this.cumulativeData(json),
                    yMin: d3.min(json, function(datum) {return datum.death}),
                    yMax: d3.max(json, function(datum) {return datum.death}),
                    minDate: this.getDate(d3.min(json, function(datum) {return datum.date})),
                    maxDate: this.getDate(d3.max(json, function(datum) {return datum.date}))
                },
                {
                    points: this.cumulativeData(this.derive(json, 1)),
                    yMin: d3.min(json, function(datum) {return datum.death}),
                    yMax: d3.max(json, function(datum) {return datum.death}),
                    minDate: this.getDate(d3.min(json, function(datum) {return datum.date})),
                    maxDate: this.getDate(d3.max(json, function(datum) {return datum.date}))
                }
            ]})
            this.render()
        })
    }

    // convert yyyymmdd integer to Date object
    getDate(numberDate) {
        const year = Math.floor(numberDate / 10000);
        const month = Math.floor((numberDate) / 100) - 1 - (year * 100);
        const day = numberDate - (year * 10000) - ((month + 1)* 100);
        const date = new Date(year, month, day);
        return date;
    }

    // get derivations of the discreet data
    derive(data, derivationNumber) {
        if (derivationNumber < 0) {
            return;
        }

        if (derivationNumber === 0) {
            return data;
        }

        for (let i = 0; i < data.length - 1; i++) {
            data[i].death = data[i].death - data[i+1].death ;
        }

        data.pop();
        return this.derive(data, --derivationNumber);
    }

    // get graphable array
    cumulativeData(data) {
        data = data.map(datum => {
            return { x: this.getDate(datum.date), y: datum.death? datum.death : 0}})
        return data
    }

    isDataLoaded() {
        let pointsExists = !!this.state?.covidData[0];
        let pointsHasData = false;
        if (pointsExists) {
            pointsHasData = !!this.state.covidData[0].points && this.state.covidData[0].points.length > 0;
        }
        return pointsHasData;
    }

    render() {
        return (
            <div className="Graph">
                { this.isDataLoaded() ? (
                    <div>
                        <LineChart 
                            data={this.state.covidData[0]}
                            width={600}
                            height={300}
                        /> 
                        <LineChart 
                            data={this.state.covidData[1]}
                            width={600}
                            height={300}
                        />
                    </div>)
                    : ( <div>loading...</div>)}
            </div>
        );
    }
}

export default Graph;