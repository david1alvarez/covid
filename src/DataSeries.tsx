import React, { Component } from 'react';
import * as d3Scale from 'd3-scale';
import * as d3Scheme from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import Line from './Line';
import { CovidData, Points } from './Graph';

interface Props {
    data: CovidData;
    xScale: d3Scale.ScaleTime<number, number>;
    yScale: d3Scale.ScaleLinear<number, number>;
}

class DataSeries extends Component <Props> {
    static defaultProps = {
        data: [],
        colors: d3Scale.scaleOrdinal(d3Scheme.schemeCategory10)
    }

    render() {
        let { data, xScale, yScale } = this.props;

        let line = d3Shape.line<Points>()
            .x((d) => {return xScale(d.x);})
            .y((d) => {return yScale(d.y);})
            .curve(d3Shape.curveCardinal);

        return (
            <Line
                path={line(data.points)}
            />
        )
    }
}

export default DataSeries;