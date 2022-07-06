import React, { useState } from "react";
import "../index.css";

const defaultWidth = 25;
const defaultHeight = 25;
const minSize = 5;
const maxSize = 35;
const nSquareToWin = 5;

function Square(props) {
  return (
    <button
      className={props.win ? "square square-highlight" : "square"}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

const SquareRow = (props) => {
  let squareRow = props.row.map((square, idx) => {
    let k = "s" + idx;
    let win = false;
    let winner = props.winner;
    let rowIdx = props.rowIdx;
    if (winner) {
      if (
        winner.direction === "ToRight" &&
        idx >= winner.x &&
        idx <= winner.x + nSquareToWin - 1 &&
        rowIdx === winner.y
      ) {
        win = true;
      }
      if (
        winner.direction === "ToDown" &&
        rowIdx >= winner.y &&
        rowIdx <= winner.y + nSquareToWin - 1 &&
        idx === winner.x
      ) {
        win = true;
      }
      if (
        winner.direction === "ToRightDown" &&
        idx >= winner.x &&
        idx <= winner.x + nSquareToWin - 1 &&
        idx - winner.x === rowIdx - winner.y
      ) {
        win = true;
      }
      if (
        winner.direction === "ToLeftDown" &&
        idx <= winner.x &&
        idx >= winner.x - nSquareToWin + 1 &&
        winner.x - idx === rowIdx - winner.y
      ) {
        win = true;
      }
    }
    return (
      <Square
        win={win}
        value={square}
        onClick={() => props.onClick(props.rowIdx, idx)}
        key={k}
      />
    );
  });
  return <div className="board-row">{squareRow}</div>;
};

const Board = (props) => {
  const renderSquare = (i) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };
  let board;
  board = props.squares.map((row, idx) => {
    let k = "r" + idx;
    return (
      <SquareRow
        winner={props.winner}
        rowIdx={idx}
        row={row}
        onClick={props.onClick}
        key={k}
      />
    );
  });
  return <div>{board}</div>;
};

const CaroGame = (props) => {
  let tmpArr = Array(defaultHeight);
  for (let i = 0; i < defaultHeight; i++) {
    tmpArr[i] = Array(defaultWidth).fill(null);
  }
  const [state, setState] = useState({
    inputWidth: defaultWidth,
    inputHeight: defaultHeight,
    width: defaultWidth,
    height: defaultHeight,
    history: [
      {
        squares: tmpArr,
        location: null,
      },
    ],
    stepNumber: 0,
    xIsNext: true,
    isDescending: true,
  });

  const handleClick = (i, j) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[state.stepNumber];
    const squares = current.squares.slice();
    current.squares.map((row, idx) => {
      squares[idx] = current.squares[idx].slice();
      return true;
    });
    if (calculateWinner(squares) || squares[i][j] || props.timeOut) {
      return;
    }
    squares[i][j] = state.xIsNext ? "X" : "O";
    setState({
      ...state,
      history: history.concat([
        {
          squares: squares,
          location: { x: i, y: j },
        },
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    });
  };

  const handleChangeWidth = (e) => {
    if (e.target.value > maxSize || e.target.value < minSize) {
      alert("max or min size has been reached");
      return;
    }
    const val = Number(e.target.value);
    setState({ ...state, inputWidth: val });
    if (val >= minSize && val <= maxSize) {
      let tmpArr = Array(state.height);
      for (let i = 0; i < state.height; i++) {
        tmpArr[i] = Array(val).fill(null);
      }
      // update inputwidth too
      setState({
        ...state,
        inputWidth: val,
        width: val,
        history: [
          {
            squares: tmpArr,
            location: null,
          },
        ],
        stepNumber: 0,
        xIsNext: true,
      });
      console.log({
        ...state,
        width: val,
        history: [
          {
            squares: tmpArr,
            location: null,
          },
        ],
        stepNumber: 0,
        xIsNext: true,
      });
    }
  };
  const handleChangeHeight = (e) => {
    if (e.target.value > maxSize || e.target.value < minSize) {
      alert("max or min size has been reached");
      return;
    }
    const val = Number(e.target.value);
    setState({ ...state, inputHeight: val });
    if (val >= minSize && val <= maxSize) {
      let tmpArr = Array(val);
      for (let i = 0; i < val; i++) {
        tmpArr[i] = Array(state.width).fill(null);
      }
      setState({
        ...state,
        inputHeight: Number(val),
        height: Number(val),
        history: [
          {
            squares: tmpArr,
            location: null,
          },
        ],
        stepNumber: 0,
        xIsNext: true,
      });
    }
  };
  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    props.setWin(true);
    status =
      "Winner: " +
      (winner.val === "x"
        ? props.users.playeronename
        : props.users.playertwoname) +
      " at: " +
      ("0" + parseInt((1200 - props.times) / 60)).slice(-2) +
      ":" +
      ("0" + ((1200 - props.times) % 60)).slice(-2);
  } else {
    // timeout
    if (props.timeOut) {
      status = "The game ended in a draw";
    } else {
      status =
        "Next player: " +
        (state.xIsNext ? props.users.playeronename : props.users.playertwoname);
    }
  }

  return (
    <div class="content">
      <div className="game-config">
        <span className="fixed-size">Chiều rộng:</span>
        <input
          type="number"
          placeholder="Chiều rộng"
          value={state.inputWidth}
          className="outline-none mt-1"
          onChange={(e) => handleChangeWidth(e)}
        />
        <br />
        <span className="fixed-size">Chiều cao:</span>
        <input
          type="number"
          placeholder="Chiều cao"
          value={state.inputHeight}
          className="outline-none mt-1"
          onChange={handleChangeHeight}
        />
      </div>
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i, j) => handleClick(i, j)}
            winner={winner}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    </div>
  );
};

function calculateWinner(squares) {
  let win;
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[i].length; j++) {
      if (!squares[i][j]) continue;
      if (j <= squares[i].length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i][j + k] !== squares[i][j + k + 1]) {
            win = false;
          }
        }
        if (win)
          return { val: squares[i][j], x: j, y: i, direction: "ToRight" };
      }
      if (i <= squares.length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j] !== squares[i + k + 1][j]) {
            win = false;
          }
        }
        if (win) return { val: squares[i][j], x: j, y: i, direction: "ToDown" };
      }
      if (
        j <= squares[i].length - nSquareToWin &&
        i <= squares.length - nSquareToWin
      ) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]) {
            win = false;
          }
        }
        if (win)
          return { val: squares[i][j], x: j, y: i, direction: "ToRightDown" };
      }
      if (i <= squares.length - nSquareToWin && j >= nSquareToWin - 1) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k++) {
          if (squares[i + k][j - k] !== squares[i + k + 1][j - k - 1]) {
            win = false;
          }
        }
        if (win)
          return { val: squares[i][j], x: j, y: i, direction: "ToLeftDown" };
      }
    }
  }
  return null;
}

export default CaroGame;
