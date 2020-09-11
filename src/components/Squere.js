import React from 'react';

export const Square = ({paint, value, onClick}) => {
    return (
        <button 
            className="square"
            style={{background: `${paint && '#FF0000'}`}}
            onClick={() => {
                onClick()
            }}
        >
        {value}
        </button>
    );
}