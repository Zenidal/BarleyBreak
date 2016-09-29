import React from "react";
import Row from "./row";

export default class Field extends React.Component {
    render() {
        let rows = this.props.matrix.map(function (value, index) {
            return (
                <Row row={value} rowNumber={index} key={"rowComponent" + index}
                     handleMove={this.props.handleMove}/>
            );
        }.bind(this));

        return (
            <table className={this.props.isComplete ? "gameField completeGame" : "gameField"}>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
}