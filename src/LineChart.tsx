import React, { Component } from 'react';
import DataSeries from './DataSeries';
import * as d3Axis from 'd3-axis';
import * as d3Time from 'd3-time';
import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import { CovidData } from './Graph';

interface Props {
    data: CovidData;
    width: number;
    height: number;
}

class LineChart extends Component <Props> {
    static defaultProps = {
        width: 600,
        height: 300
    }

    componentDidMount() {
        let { width, height, data } = this.props;

        let xScale = d3Scale.scaleTime()
                        .domain([data.minDate, data.maxDate])
                        .range([0, width])
    
        let xAxis = d3Axis.axisBottom(xScale)
        xAxis.ticks(d3Time.timeMonth.every(1));
        d3Selection.select(`[title="${data.title}"]`).append("g").attr("transform", `translate(40,${height})`).call(xAxis)

        let yScale = d3Scale.scaleLinear()
                        .domain([data.yMin, data.yMax])
                        .range([height, 30])
        
        let yAxis = d3Axis.axisLeft(yScale)
        yAxis.ticks(5);
        d3Selection.select(`[data-title="${data.title}"]`).append("g").attr("transform", `translate(40,0)`).call(yAxis)
        d3Selection.select(`[date-title="${data.title}"]`).attr("viewBox", "0 0 630 330")
    }


    render() {
        let { width, height, data } = this.props;

        let xScale = d3Scale.scaleTime()
                        .domain([data.minDate, data.maxDate])
                        .range([40, width])
        xScale.ticks(5);

        let yScale = d3Scale.scaleLinear()
                        .domain([data.yMin, data.yMax])
                        .range([height, 30])
        return (
            <svg width={"80vw"} height={"50vw"} data-title={data.title}>
                <g>
                    <text
                        x={(width+30)/2}
                        y={15}
                        textAnchor="middle"
                        fontSize="16px"
                        fill="white"
                    >{data.title}</text>
                    <DataSeries 
                        xScale={xScale}
                        yScale={yScale}
                        data={data}
                    />
                </g>
            </svg>
        )
    }
}

export default LineChart;