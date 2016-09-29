import React from 'react';
import Cell from './cell';

export default class Row extends React.Component {
    render() {
        let cells = this.props.row.map((value, index) => {
            return (<Cell cellValue={value} key={'cell' + index} handleMove={this.props.handleMove}/>);
        });

        return (
            <tr className="gameRow" key={'row' + this.props.rowNumber}>
                {cells}
            </tr>
        );
    }
}