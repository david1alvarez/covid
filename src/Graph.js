import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries } from 'react-vis';
import * as d3 from 'd3';
import './Graph.css';

/*
    TODO:
    pass in the data as part of the props, and only render the graph when there is actual data
    this avoids the necessity of having a million "If the data exists, do x" lines of code
*/

class Graph extends Component {
    constructor() {
        super();
        this.state = {data: []};

        this.GetWorldStatistics = this.GetWorldStatistics.bind(this);
    }

    componentDidMount() {
        this.GetWorldStatistics();
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
                this.setState({ data: json});
                this.render()
            })
    }

    // convert yyyymmdd integer to Date object
    getDate(numberDate) {
        if (!numberDate) {
            return null;
        }
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
            return {x: -1 * this.getDaysSince(this.getDate(datum.date)), y: datum.positive}})
        return data
    }

    getMonthRange(startDate, endDate) {
        return endDate.getMonth() - startDate.getMonth()
            + (12 * (endDate.getFullYear() - startDate.getFullYear()))
    }

    render() {
        let minDate = this.getDate(d3.min(this.state.data, function(datum) {return datum.date})) 
        let maxDate = this.getDate(d3.max(this.state.data, function(datum) {return datum.date})) 
        let yRaw = d3.scaleLinear()
                    .domain(0, d3.max(this.state.data, function(datum) {return datum.positive} ))
                    .range([300,0]);

        let x = d3.scaleTime()
                .domain([minDate, maxDate])
                .range([0, 300]);
        let xAxis = d3.axisBottom(x)
                    .ticks( 1 + this.getMonthRange(minDate, maxDate))

        let svg = d3.select('.Graph').append('svg').attr('width', 300).attr('height',300)
        svg.append('g').attr('class', 'x axis').call(xAxis);

        let valueLine = d3.line()
                            .x(function(datum) {return x(this.getDate(datum?.date))})
                            .y(function(datum) {return yRaw(datum?.positive)})

        svg.append('path')
            .attr('class', 'line')
            .attr('d', valueLine(this.state.data))

        let cumulativeData = this.cumulativeData(this.state.data);
        let firstDerivativeData = this.cumulativeData(this.derive(this.state.data, 1));
        let secondDerivativeData = this.cumulativeData(this.derive(this.state.data, 2));

        return (
            <div className="Graph">
                <div>cumulative global cases</div>
                <XYPlot height={300} width={300}>
                    <LineSeries data={cumulativeData} />
                </XYPlot>
                <div>calculated change in global cases/day</div>
                <XYPlot height={300} width={300}>
                    <LineSeries data={firstDerivativeData} />
                </XYPlot>
                <div>acceleration of global cases/day</div>
                <XYPlot height={300} width={300}>
                    <LineSeries data={secondDerivativeData} />
                </XYPlot>
            </div>
        );
    }
}

export default Graph;