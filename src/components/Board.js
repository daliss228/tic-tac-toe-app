import React from 'react';
import { Square } from './Squere';

export const Board = ({cells, squares, onClick}) => {

    const renderSquare = (i) =>  {
        return (
            <Square
                key={i}
                paint={cells?.includes(i)}
                value={squares[i]} 
                onClick={() => {onClick(i)}}
            />
        );
    }

    const tictactoe = () => {
        let table = [];
        
        table.push(
            <div key={'a'} >
                <div className="coordinates"></div>
                <div className="coordinates">0</div>
                <div className="coordinates">1</div>
                <div className="coordinates">2</div>
            </div>
        );

        for (let i = 0; i < 3; i++) {
            let cells = [];
            cells.push(<div key={'b'} className="coordinates">{i}</div>);
            for (let j = 0; j < 3; j++) {
                cells.push(renderSquare(i * 3 + j));
            }
            table.push(<div key={i} className="board-row">{cells}</div>);
        }
        return table;
    }

    return (
        <div>
            {tictactoe()}
        </div>
    );

}