import React, { Component } from 'react';
import * as d3 from 'd3';
import Line from './Line';

class DataSeries extends Component {
    // constructor() {
    //     super()
    // }

    static defaultProps = {
        data: [],
        colors: d3.scaleOrdinal(d3.schemeCategory10)
    }

    render() {
        let { data, colors, xScale, yScale } = this.props;

        let line = d3.line()
            .x((d) => {return xScale(d.x);})
            .y((d) => {
                // returns undefined
                console.log('yScale(d.y) is: ', yScale(d.y))
                return yScale(d.y);})
            .curve(d3.curveCardinal);

        let lines = data.points.map((series, id) => {
            return (
                <Line
                    path={line(series)}
                    stroke={colors(id)}
                    key={id}
                />)
        })

        return (
            <g>{lines}</g>
        )
    }
}

export default DataSeries;