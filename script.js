'use strict'
//creating modules for something we need in one 
const gameboard = (()=>{
    let gameBoard = [];
    for (let i=0;i<9;i++){
        gameBoard.push('');
    }
    let toggle = 'x';
    const computerMove = ()=>{
        let arr = gameboard.gameBoard;
        let newArr = [];
        for(let i=0;i<9;i++){
            if(arr[i]==""){
                newArr.push(i);
            }
        }
        let randomIndex = newArr[Math.floor(Math.random()*newArr.length)];
        let cell = document.querySelector(`[index-for-array="${randomIndex}"]`);
        cell.textContent = 'o';
        arr[randomIndex]='o';
        gameboard.toggle = 'x';
        displayController.endOfGame();
    }
    const constructBoard = ()=>{
        //add event click to cells
        
        function renderValue(){
            if (displayController.indicatorEndGame&&this.textContent==''){
                this.textContent = gameboard.toggle;
                gameboard.gameBoard[this.getAttribute('index-for-array')] = gameboard.toggle;
                gameboard.toggle = (gameboard.toggle=='x')?'o':'x';
                displayController.endOfGame();
                computerMove();
                //displayController.endOfGame();
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
    constructBoard();

    return{
        gameBoard,
        toggle,
    }
})();
const displayController = (()=>{
    let indicatorEndGame = 1;
    const startNewGame = ()=>{
        displayController.indicatorEndGame = 1;
        gameboard.gameBoard = []
        for (let i=0;i<9;i++){
            gameboard.gameBoard.push('');
        };
        let cells = document.querySelector('#game-board-container').childNodes;
        cells.forEach(cell=>cell.textContent='');
        gameboard.toggle = 'x';
        
    }
    const btnNewGame = document.querySelector('#btn-new-game');
    btnNewGame.addEventListener('click',startNewGame);
    const endOfGame=()=>{
        let arr = gameboard.gameBoard;
        console.log(arr);
        if ((arr[0]!="")&&(arr[0]==arr[4])&&(arr[0]==arr[8])){
            console.log('here');
            alert(`Player ${arr[0]} is a winner`);
            displayController.indicatorEndGame = 0;
            return;
        }
        else if ((arr[2]!="")&&(arr[2]==arr[4])&&(arr[2]==arr[6])){
            alert(`Player ${arr[2]} is a winner`);
            displayController.indicatorEndGame = 0;
            return;
        }
        else{
            for(let i=0;i<=6;i++){
                if (arr[i]!=""){
                    if (i%3==0){
                        if((arr[i]==arr[i+1])&&(arr[i]==arr[i+2])){
                            alert(`Player ${arr[i]} is a winner`);
                            displayController.indicatorEndGame = 0;
                            return;
                        }
                    }
                    if (i==0||i==1||i==2){
                        if((arr[i]==arr[i+3])&&(arr[i]==arr[i+6])){
                            alert(`Player ${arr[i]} is a winner`);
                            displayController.indicatorEndGame = 0;
                            return;
                        }
                    }
                    
                }
            }
        }
        if (arr.every(el=>(el!=""))){
            alert ('drawn game!');
            displayController.indicatorEndGame = 0;
            return;
        }

    }

    return{
        endOfGame,
        indicatorEndGame,
    }
})();
//creating factor function for multiple objects
const Player = (name)=>{

    return {
        name,
    }
}




