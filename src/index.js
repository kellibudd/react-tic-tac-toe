import React from "react"
import ReactDOM from "react-dom"
import './index.css'

// class Square extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             value: null
//         };
//     }

//     render() {
//         // TODO: use onClick={this.props.onClick}
//         // TODO: replace this.state.value with this.props.value
//         return (
//             <button 
//             className="square" 
//             onClick={() => this.props.onClick()}
//             /* Square calls this.handleClick(i) when clicked - the onClick event handler on the button
//             calls on the onClick prop passed down by the Board (parent) component
//             which ultimately calls the handleClick method */
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }
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
    constructor(props) {
        super(props)
        this.state = {
            xIsNext: true,
            squares: Array(9).fill(null)
            /* Lifting state -- now state is stored in the Board (parent) component
            instead of the individual Square components. The Square components receive values from the Board component
            and inform the Board component when they’re clicked - they are now considered controlled components */
        };
    }

    handleClick(i) {
        const updatedSquaresArray = this.state.squares.slice()
        /* slice() method returns a copy of the selected elements in an array, as a new array object.
        we can modify a copy of the squares array instead of modifying the existing array - so we aren't directly modifying state*/
        if (calculateWinner(updatedSquaresArray) || checkIfGameOver(updatedSquaresArray) || updatedSquaresArray[i]) {
            return;
            /* ignores a click if a square is already filled or if someone has won the game */
        }
        
        updatedSquaresArray[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            xIsNext: !this.state.xIsNext,
            squares: updatedSquaresArray})
        /* Data Change without Mutation - changing the value of the clicked element in the array copy from null to 'X',
        then replacing the data attached to state with a new copy which has the desired changes.
        Avoiding direct data mutation lets us keep previous versions of the game’s history intact, and reuse them later.
        Immutable data can easily determine if changes have been made, which helps to determine when a component
        requires re-rendering. */
    }
    
    renderSquareFunction(i) {
        
        return (
            <Square 
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        const tie = checkIfGameOver(this.state.squares);
        let status;

        if (winner) {
            status = 'Winner: ' + winner;
        } else if (tie) {
            status = tie
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquareFunction(0)}
                    {this.renderSquareFunction(1)}
                    {this.renderSquareFunction(2)}
                </div>
                <div className="board-row">
                    {this.renderSquareFunction(3)}
                    {this.renderSquareFunction(4)}
                    {this.renderSquareFunction(5)}
                </div>
                <div className="board-row">
                    {this.renderSquareFunction(6)}
                    {this.renderSquareFunction(7)}
                    {this.renderSquareFunction(8)}
                </div>
            </div>
    );
  }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
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