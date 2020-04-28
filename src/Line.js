import React, { Component } from 'react'

class Line extends Component {
    static defaultProps = {
        stroke: 'white',
        fill: 'none',
        strokeWidth: 3
    }

    render() {
        let {path, stroke, fill, strokeWidth } = this.props;
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

export default Line;