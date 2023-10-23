import React from "react";

const Square = ({ position, value, highlight, onSquareClick }) => {
    function checkWinningPosition(position, highlight) {
        return highlight.indexOf(position) > -1
    }
    return (
        <> {
            highlight && checkWinningPosition(position, highlight[1]) ?
                <button className="square fw-bold fs-4 btn btn-light text-danger
                                text-wrap bg-transparent 
                                border border-dark"
                    onClick={onSquareClick}>
                    {value}
                </button>
                :
                <button className="square fw-bold fs-4 btn btn-light
                                text-wrap bg-transparent 
                                border border-dark"
                    onClick={onSquareClick}>
                    {value}
                </button>
        }</>
    )
}
export default Square;