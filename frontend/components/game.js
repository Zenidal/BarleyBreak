import React from 'react';
import Field from './field';
import User from '../models/user';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.user = new User();
        this.state = {
            turnsNumber: 0,
            isComplete: false,
            matrix: []
        };
    }

    componentDidMount() {
        this.generateNewField(true);
    }

    generateNewField(isRandom) {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        if (isRandom) {
            numbers.shuffle();
        }
        numbers.push(16);
        let fieldMatrix = [];
        for (let i = 0; i < 4; i++) {
            fieldMatrix[i] = [];
            for (let j = 0; j < 4; j++) {
                fieldMatrix[i][j] = numbers[i * 4 + j];
            }
        }
        this.updateMatrix(fieldMatrix);
        this.user.statistics.startGame();
    }

    move(rowNumber, cellNumber) {
        let oldValue = this.state.matrix[rowNumber][cellNumber];
        let successTurn = false;
        let oldMatrix = this.state.matrix;
        if (this.state.matrix[rowNumber - 1] && this.state.matrix[rowNumber - 1][cellNumber] && this.state.matrix[rowNumber - 1][cellNumber] == 16) {
            oldMatrix[rowNumber - 1][cellNumber] = oldValue;
            successTurn = true;
        }

        if (this.state.matrix[rowNumber][cellNumber + 1] && this.state.matrix[rowNumber][cellNumber + 1] == 16) {
            oldMatrix[rowNumber][cellNumber + 1] = oldValue;
            successTurn = true;
        }

        if (this.state.matrix[rowNumber + 1] && this.state.matrix[rowNumber + 1][cellNumber] && this.state.matrix[rowNumber + 1][cellNumber] == 16) {
            oldMatrix[rowNumber + 1][cellNumber] = oldValue;
            successTurn = true;
        }

        if (this.state.matrix[rowNumber][cellNumber - 1] && this.state.matrix[rowNumber][cellNumber - 1] == 16) {
            oldMatrix[rowNumber][cellNumber - 1] = oldValue;
            successTurn = true;
        }

        if (successTurn) {
            oldMatrix[rowNumber][cellNumber] = 16;
            this.updateMatrix(oldMatrix);
            this.setState({turnsNumber: ++this.state.turnsNumber});
        }
    }

    checkComplete() {
        for (let i = 0; i < this.state.matrix.length; i++) {
            for (let j = 0; j < this.state.matrix[i].length; j++) {
                if (this.state.matrix[i][j] != (i * 4) + j + 1) {
                    this.setState({isComplete: false});
                    return;
                }
            }
        }

        this.setState({isComplete: true});
        this.user.statistics.winGame();
    }

    handleMove(e) {
        let clickedNumber = e.target.textContent || e.target.innerText;
        let cellNumber, rowNumber;
        for (let i = 0; i < this.state.matrix.length; i++) {
            for (let j = 0; j < this.state.matrix[i].length; j++) {
                if (clickedNumber == this.state.matrix[i][j]) {
                    rowNumber = i;
                    cellNumber = j;
                }
            }
        }
        this.move(rowNumber, cellNumber);
    }

    updateMatrix(newMatrix) {
        this.setState({matrix: newMatrix}, function () {
            this.checkComplete();
        });
    }

    createGame() {
        if (!this.state.isComplete) {
            this.user.statistics.loseGame();
        }
        this.generateNewField(true);
        this.setState({turnsNumber: 0});
    }

    render() {
        return (
            <div className="gameContainer">
                <h1>{this.user.userName}</h1>
                <h2>
                    <img className="statistics" src="vendor/img/started.ico"/>{this.user.statistics.totalStarted}
                    <img className="statistics" src="vendor/img/losed.png"/>{this.user.statistics.totalLosed}
                    <img className="statistics" src="vendor/img/won.png"/>{this.user.statistics.totalWins}
                </h2>
                <h1>barley-break</h1>
                <Field matrix={this.state.matrix} handleMove={this.handleMove.bind(this)}
                       isComplete={this.state.isComplete}/>
                <div className="newGame">
                    <button type="button" onClick={this.createGame.bind(this)}>New Game</button>
                </div>
                <h1>number of turns: {this.state.turnsNumber}</h1>
            </div>
        );
    }
}