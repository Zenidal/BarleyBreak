import React from 'react';

export default class Cell extends React.Component {
    render() {
        return (
            <td className={'gameCell'} onClick={this.props.handleMove}>
                <span className={this.props.cellValue === 16 ? ' invisible' : ''}>{this.props.cellValue}</span>
            </td>
        );
    }
}