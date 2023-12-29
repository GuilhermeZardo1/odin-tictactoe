const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = message;
    }
    return { renderMessage };
})();



const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    const render = () => {
        let boardHtml = "";
        gameboard.forEach((element, index) => {
            boardHtml += `<div class="square" id=square-${index}">${element}</div>`;
        });
        document.querySelector("#gameboard").innerHTML = boardHtml;
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick);
        })
        
    };
 
    const update = (index, mark) => {
        gameboard[index] = mark;
        render();
    };
    const getGameBoard = () => {
        return gameboard;
    }
    return {gameboard, render, update, getGameBoard};
})();

const createPlayer = (name, mark) => {
    return { name, mark };
};

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        
        gameOver = false;
        currentPlayerIndex = 0;
        Gameboard.render();
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", handleClick);
        })
        
    }
        console.log("Game started");
        const handleClick = (e) => {
            if (gameOver){
                return;}
            let index = parseInt(e.target.id.split("-")[1]);
            if(Gameboard.getGameBoard()[index] !== "")
                return;
            Gameboard.update(index, players[currentPlayerIndex].mark);
            currentPlayerIndex = 1 - currentPlayerIndex;
            if(checkForWin(Gameboard.getGameBoard(), players[currentPlayerIndex].mark)){
              
                gameOver = true;
                displayController.renderMessage(players[currentPlayerIndex].name + " wins!");
                return;
            }else if(checkForTie(Gameboard.getGameBoard())){
                displayController.renderMessage("It's a tie!");
                gameOver = true;
                return
            }
            
            
    };

    const restart = () => {
        for(let i = 0; i < 9; i++){
            Gameboard.update(i, "");
        }
        Gameboard.render();
        gameOver = false;
        document.querySelector("#message").innerHTML = "";
    }

    return{ start, handleClick, restart };
})();


const StartButton = document.querySelector('#start-button')
StartButton.addEventListener('click', () => {
    Game.start();
    console.log("Start button clicked");
    })

const restartButton = document.querySelector('#restart-button')
restartButton.addEventListener('click', () => {
    Game.restart();
    console.log("Restart button clicked");
    })

    function checkForWin(board){
        const winningCombinations = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [3, 4, 5],
            [6, 7, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6]   
        ]

        for(let i = 0; i < winningCombinations.length; i++){
            const [a, b, c] = winningCombinations[i];
            if(board[a] && board[a] === board[b] && board[a] === board[c]){
                return true;
            }
        }
        return false;
    }

    function checkForTie(board){
        return board.every((element) => element !== "");
    }

