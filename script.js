const DOM = (()=>{
    const player1 = ()=>(document.querySelector('#player1>input').value)?document.querySelector('#player1>input').value:'Player x';
    const player2 = ()=>(document.querySelector('#player2>input').value)?document.querySelector('#player2>input').value:'Player o';
    const announcement = ()=>document.querySelector('#announcement');
    const NewGameBtn = document.querySelector('#btn-new-game');
    const againstAIBtn = document.querySelector('#btn-against-ai');
    const againstPlayerBtn = document.querySelector('#btn-against-player');
    return {player1,player2,announcement,NewGameBtn,againstAIBtn,againstPlayerBtn};
})();
const gameBoard = (()=>{
    let gameBoard = [];
    //to change area later
    for(let i=0;i<9;i++){
        gameBoard.push('');
    };
    let sign = 'x';
    const getGameBoard = ()=>gameBoard;
    const getSign = ()=>sign;
    //construct  gameboard to render
    const oppositeSign = ()=>{sign = (sign=='x')?'o':'x';};
    const constructBoard = ()=>{
        //add event click to cells
        function renderValue(){
            if (!displayController.getGameIsOver()&&this.textContent==''){
                this.textContent = sign;
                gameBoard[this.getAttribute('index-for-array')] = sign;
                displayController.checkGame();
                oppositeSign();
            }
        }
        //creating game board cells
        let gameBoardContainer = document.querySelector('#game-board-container');
        for (let i=0;i<9;i++){
            let cell = document.createElement('div');
            cell.classList.add('game-board-cell');
            cell.setAttribute('index-for-array',i);
            cell.addEventListener('click', renderValue);
            gameBoardContainer.appendChild(cell);
        }
    };
    const init = ()=>{
        gameBoard = [];
        //to change area later
        for(let i=0;i<9;i++){
            gameBoard.push('');
        };
        sign = 'x';
        constructBoard();
        DOM.announcement().textContent = `${DOM.player1()}'s turn`;
    }
    return {init, getSign, getGameBoard, oppositeSign};
})();
gameBoard.init();

//an object to control flow of the game
const displayController = (()=>{
    let gameIsOver = false;
    let computerMove = false;
    let computerTurn = false;
    const getGameIsOver = ()=>gameIsOver;
    //random choices of computer
    const computerMoveAction = ()=>{
        let arr = gameBoard.getGameBoard();
        let newArr = [];
        for(let i=0;i<9;i++){
            if(arr[i]==""){
                newArr.push(i);
            }
        }
        let randomIndex = newArr[Math.floor(Math.random()*newArr.length)];
        let cell = document.querySelector(`[index-for-array="${randomIndex}"]`);
        cell.click();
    }
    //function that checks if win
    const checkGame = ()=>{
        let winner = gameBoard.getSign();
        const boardArr = gameBoard.getGameBoard();
        //checking all possible combinations
        (function(){
            if ((boardArr[0]!="")&&(boardArr[0]==boardArr[4])&&(boardArr[0]==boardArr[8])){
                gameIsOver = true;
                return;
            }
            else if ((boardArr[2]!="")&&(boardArr[2]==boardArr[4])&&(boardArr[2]==boardArr[6])){
                gameIsOver = true;
                return;
            }
            else{
                for(let i=0;i<=6;i++){
                    if (boardArr[i]!=""){
                        if (i%3==0){
                            if((boardArr[i]==boardArr[i+1])&&(boardArr[i]==boardArr[i+2])){
                                gameIsOver = true
                                return;
                            }
                        }
                        if (i==0||i==1||i==2){
                            if((boardArr[i]==boardArr[i+3])&&(boardArr[i]==boardArr[i+6])){
                                gameIsOver = true
                                return;
                            }
                        }
                        
                    }
                }
            }
            if (boardArr.every(v => v!='')){
                gameIsOver = true;
                winner = '';
            }
        })();
        if (gameIsOver){
            if (!winner){
                DOM.announcement().textContent = `Game is over. Draw`;
            }
            else {
                DOM.announcement().textContent = `${(winner=='x')?DOM.player1():DOM.player2()} has won`;
            }
        }
        else{
            if(computerMove){
                if(computerTurn){
                    computerTurn = false;
                    gameBoard.oppositeSign();
                    computerMoveAction();
                    gameBoard.oppositeSign();
                }
                else{
                    computerTurn = true;
                    DOM.announcement().textContent = `${DOM.player1()}'s turn`;
                }
            }
            else{
                DOM.announcement().textContent = `${(winner=='x')?DOM.player2():DOM.player1()}'s turn`;
            }
        }
    }
    const startNewGame = ()=>{
        gameIsOver = false;
        let gameBoardContainer = document.querySelector('#game-board-container');
        while(gameBoardContainer.firstChild){
            gameBoardContainer.removeChild(gameBoardContainer.firstChild);
        }
        gameBoard.init();
    }
    //add functions to buttons
    DOM.NewGameBtn.addEventListener('click',startNewGame);
    DOM.againstAIBtn.addEventListener('click',function(){
        startNewGame();
        computerMove = true;
        computerTurn = true;
        this.style.display = "none";
        DOM.againstPlayerBtn.removeAttribute('style');
        document.querySelector('#player2>input').value = 'computer';
        document.querySelector('#player2>input').setAttribute('disabled','');
    });
    DOM.againstPlayerBtn.addEventListener('click',function(){
        startNewGame();
        computerMove = false;
        this.style.display = "none";
        DOM.againstAIBtn.removeAttribute('style');
        document.querySelector('#player2>input').removeAttribute('disabled');
        document.querySelector('#player2>input').value = '';
    });
    return {getGameIsOver,checkGame,}
})();