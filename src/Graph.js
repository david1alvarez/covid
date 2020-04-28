import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import * as d3 from 'd3';
import './Graph.css';
import LineChart from './LineChart';

class Graph extends Component {
    constructor() {
        super();
        this.state = {data: [], graphData: {}};

        this.GetWorldStatistics = this.GetWorldStatistics.bind(this);
    }

    componentDidMount() {
        this.GetWorldStatistics()

        this.setState({graphData: {
            points: [
                // cumulativedata needs to return the dates, not the numbers
                this.cumulativeData(this.state.data),
                this.cumulativeData(this.derive(this.state.data, 1))
            ],
            xValues: this.state.data.map(datum => {return this.getDate(datum.date)}),
            minDate: this.getDate(d3.min(this.state.data, function(datum) {return datum.date})),
            maxDate: this.getDate(d3.max(this.state.data, function(datum) {return datum.date})),
            yMin: d3.min(this.state.data, function(datum) {return datum.positive}),
            yMax: d3.max(this.state.data, function(datum) {return datum.positive})
        }})
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
            // this.setState({ data: json});
            this.setState({ data: json, graphData: {
                points: [
                    this.cumulativeData(json)//,
                    // this.cumulativeData(this.derive(json, 1))
                ],
                xValues: json.map(datum => {return this.getDate(datum.date)}),
                minDate: this.getDate(d3.min(json, function(datum) {return datum.date})),
                maxDate: this.getDate(d3.max(json, function(datum) {return datum.date})),
                yMin: d3.min(json, function(datum) {return datum.positive}),
                yMax: d3.max(json, function(datum) {return datum.positive})
            }})
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

    // return the number of days since a given date
    getDaysSince(date) {
        const now = new Date();
        let diffTime = Math.abs(now - date);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
            data[i].positive = data[i].positive - data[i+1].positive ;
        }

        data.pop();
        derivationNumber--;
        return this.derive(data, derivationNumber);
    }

    // get graphable array
    cumulativeData(data) {
        data = data.map(datum => {
            return { x: this.getDate(datum.date), y: datum.positive}})
        return data
    }

    getMonthRange(startDate, endDate) {
        return endDate.getMonth() - startDate.getMonth()
            + (12 * (endDate.getFullYear() - startDate.getFullYear()))
    }

    isDataLoaded() {
        let pointsExists = !!this.state?.graphData?.points;
        let pointsHasData = false;
        if (pointsExists) {
            pointsHasData = this.state?.graphData?.points[0].length > 0;
        }
        return pointsHasData;
    }

    render() {
        return (
            <div className="Graph">
                { this.isDataLoaded() ? (
                    <LineChart 
                        data={this.state.graphData}
                        width={600}
                        height={300}
                    />) 
                    : ( <div>loading...</div>)}
            </div>
        );
    }
}

export default Graph;