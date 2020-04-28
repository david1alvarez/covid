import React, { Component } from 'react';
import DataSeries from './DataSeries';
import * as d3 from 'd3';

class LineChart extends Component {
    static defaultProps = {
        width: 600,
        height: 300
    }

    componentDidMount() {
        let { width, height, data } = this.props;

        let xScale = d3.scaleTime()
                        .domain([data.minDate, data.maxDate])
                        .range([0, width])
    
        let xAxis = d3.axisBottom(xScale)
        xAxis.ticks(d3.timeMonth.every(1));
        d3.select(`[title="${data.title}"]`).append("g").attr("transform", `translate(40,${height})`).call(xAxis)

        let yScale = d3.scaleLinear()
                        .domain([data.yMin, data.yMax])
                        .range([height, 10])
        
        let yAxis = d3.axisLeft(yScale)
        yAxis.ticks(10);
        d3.select(`[title="${data.title}"]`).append("g").attr("transform", `translate(40,0)`).call(yAxis)
    }


    render() {
        let { width, height, data } = this.props;

        let xScale = d3.scaleTime()
                        .domain([data.minDate, data.maxDate])
                        .range([40, width])
        xScale.ticks(5);

        let yScale = d3.scaleLinear()
                        .domain([data.yMin, data.yMax])
                        .range([height, 0])
        return (
            <svg width={width+30} height={height+30} title={data.title}>
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