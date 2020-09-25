import React from "react"
import ReactDOM from "react-dom"
import './index.css'

class Square extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: null
        };
    }

    render() {
        return (
            <button 
            className="square" 
            onClick={() => this.setState({value: 'X'})}
            >
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquareFunction(num) {
        return <Square />;
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