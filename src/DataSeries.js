import React, { Component } from 'react';
import * as d3 from 'd3';
import Line from './Line';

class DataSeries extends Component {
    static defaultProps = {
        data: [],
        colors: d3.scaleOrdinal(d3.schemeCategory10)
    }

    render() {
        let { data, xScale, yScale } = this.props;

        let line = d3.line()
            .x((d) => {return xScale(d.x);})
            .y((d) => {return yScale(d.y);})
            .curve(d3.curveCardinal);

        return (
            <Line
                path={line(data.points)}
            />
        )
    }
}

export default DataSeries;