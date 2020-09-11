import React from 'react';
import { Board } from './components/Board';
import { calculateWinner } from './helpers/calculateWinner';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
            asc: true
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                coordinates: [Math.floor(i % 3), Math.floor(i / 3)]
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        console.log(`${this.state.stepNumber}: ${history.length - 1}`)
        
        const empate = (history.length === 10 && winner === null) === true;

        const moves = history.map((step, move) => {
            const desc = move ? `Ir a la posicion: ${move}. [${step.coordinates[0]}, ${step.coordinates[1]}]` : 'Ir al inicio'
            return (
                <li key={move}>
                    <button style={{fontWeight: (move === this.state.stepNumber) && 'bold'}} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = `Ganador: ${winner.ganador}`;
        } else {
            status = `Siguiente jugador: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        const handleSortAscDesc = () => {
            this.setState({
                asc: !this.state.asc
            });
        }

        return (
            <div className="game">
                <div className="game-board">
                <Board 
                    cells ={winner?.celdas}
                    squares={current.squares}
                    onClick={(i) => {this.handleClick(i)}}
                />
                </div>
                <div className="game-info">
                    <div>{(empate) ? 'Empate' : status}</div>
                    <button className="sorts" onClick={() => handleSortAscDesc()}>{!this.state.asc ? 'Desc' : 'Asc'}</button>
                    <ol>{!this.state.asc ? moves.reverse() : moves}</ol>
                </div>
            </div>
        );
    }
}