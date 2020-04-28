import React, { Component } from 'react';
import DataSeries from './DataSeries';
import * as d3 from 'd3';

class LineChart extends Component {
    static defaultProps = {
        width: 600,
        height: 300
    }

    render() {
        let { width, height, data } = this.props;

        let xScale = d3.scaleTime()
                        .domain([data.minDate, data.maxDate])
                        .range([0, width])
        xScale.ticks(d3.timeDay.every(5));

        let yScale = d3.scaleLinear()
                        .domain([data.yMin, data.yMax])
                        .range([height, 10])

        return (
            <svg width={width} height={height}>
                <DataSeries 
                    xScale={xScale}
                    yScale={yScale}
                    data={data}
                    width={width}
                    height={height}
                />
            </svg>
        )
    }
}

export default LineChart;