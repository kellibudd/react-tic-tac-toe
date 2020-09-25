import React from "react"
import ReactDOM from "react-dom"
import './index.css'

function Square(props) {
    return (
        <button 
        className="square" 
        onClick={props.onClick}
        /* Square calls handleClick(i) when clicked - the onClick event handler on the button
        calls on the onClick prop passed down by the Board (parent) component
        which ultimately calls the handleClick method */
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    
    renderSquare(i) {
        /* this is a custom method that is rendering the square component - could be named anything */
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                /* the Board component receives squares and onClick props from the Game component - see line 132 */
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
    );
  }
}

class Game extends React.Component {
    constructor() {
        super()
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        /* This ensures that if we “go back in time” and then make a new move from that point,
        we throw away all the “future” history that would now become incorrect */
        const current = history[history.length - 1]
        const updatedSquares = current.squares.slice()
        /* slice() method returns a copy of the selected elements in an array, as a new array object.
        we can modify a copy of the squares array instead of modifying the existing array - so we aren't directly modifying state*/
        if (calculateWinner(updatedSquares) || checkIfGameOver(updatedSquares) || updatedSquares[i]) {
            return;
            /* ignores a click if a square is already filled or if someone has won the game */
        }
        
        updatedSquares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                /* concatenate new history entries onto history - the concat method doesn’t mutate the original array */
                squares: updatedSquares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
        /* 
        Data Change without Mutation - changing the value of the clicked element in the array copy from null to 'X',
        then replacing the data attached to state with a new copy which has the desired changes.
        Avoiding direct data mutation lets us keep previous versions of the game’s history intact, and reuse them later.
        Immutable data can easily determine if changes have been made, which helps to determine when a component
        requires re-rendering. */
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        /* with current - using the most recent history entry to determine and display the game’s status */
        const winner = calculateWinner(current.squares);
        const tie = checkIfGameOver(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (tie) {
            status = tie
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

function checkIfGameOver(squares) {
    const board = squares.filter(square => square === null);
    console.log(board)
    if (board.length !== 0) {
        console.log('still not over')
        return null;
    } else {
        console.log('its over')
        return 'Game ended in a tie!'
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);