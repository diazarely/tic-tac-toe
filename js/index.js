const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
// const buttonPlayerX = document.getElementById('buttonPlayerX')
// const playerXtext = document.getElementById('playerX')
// const buttonPlayerO = document.getElementById('buttonPlayerO')
// const playerOtext = document.getElementById('playerO')
let circleTurn 

startGame()

// buttonPlayerX.addEventListener('click', () =>{
//     winningMessageTextElement.innerText = playerXtext.value;
// })

// buttonPlayerO.addEventListener('click', () =>{
//     winningMessageTextElement.innerText = playerOtext.value;
// })


// The function called start game will start with X turn and include the hover event function called BoardHoverClass
//function includes the cell function including handleclick
function startGame(){
    circleTurn = false
    // this click event listiner works only once
    //for each cell add click event listiner to work only once
    cellElements.forEach(cell =>{
        cell.addEventListener('click', handleClick,{ once: true})
    })
    
    setBoardHoverClass()    
}

function handleClick(e){
    const cell = e.target
    //If it is curcles turn return circle class if it is not circles turn return x class
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
    setBoardHoverClass()
}
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw'
    }
     else{
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"}Wins!`

     }
     winningMessageElement.classList.add('show')
}

function isDraw(){
    // array destructuring
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })
}



// sets the place mark withing the cell and dependent on the current turn
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}


function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination =>{
     return combination.every(index=>{
         return cellElements[index].classList.contains(currentClass)
        })
 })
}