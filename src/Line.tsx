import React, { Component } from 'react'

interface Props {
    path: string | null;
    stroke: string;
    fill: string;
    strokeWidth: number;
}

class Line extends Component <Props>{
    static defaultProps = {
        stroke: 'white',
        fill: 'none',
        strokeWidth: 3
    }

    render() {
        let {path, stroke, fill, strokeWidth } = this.props;
        if (path) {
            return (
                <path
                    d={path}
                    stroke={stroke}
                    fill={fill}
                    strokeWidth={strokeWidth}
                />
            )
        }
    }
}

export default Line;