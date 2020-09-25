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
        onClick={() => props.onClick}
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
        updatedSquaresArray[i] = 'X';
        this.setState({squares: updatedSquaresArray})
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
        const status = 'Next Player: X';
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

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);