const cellElements = document.querySelectorAll('[data-cell]');
//seleciona toda as celulas com tal atributo
const board = document.querySelector('[data-board]');
//seleciona apenas o board em questão
const winningMessageText = document.querySelector('[data-winnig-message-text]')
//seleciona apenas o texto da mensagem pós fim de jogo
const winningMessage = document.querySelector('[data-winnig-message]')
//seleciona apenas a div de fim de partida
const RematchButton = document.querySelector('[data-rematch-button]')
//seleciona apenas o botão de rematch


const startGame = () => {
    for (const cell of cellElements) {
        cell.classList.remove('o');
        cell.classList.remove('x');
        cell.removeEventListener("click", handleClick)
        cell.addEventListener('click', handleClick, { once : true });
    }

    circleTurn = false;

    board.classList.add('x');
    winningMessage.classList.remove("show-winning-message")
}

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageText.innerText = "That's a draw!"
    } else {
        winningMessageText.innerText = circleTurn ? "Circle is the winner!!!" : "X is the winner!!!"
    }

    winningMessage.classList.add("show-winning-message")
}

const checkDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o'); 
    })
}

const handleRestartClick = () => {}

const winningComb = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]

const checkWinner = (currentPlayer) => {
    return winningComb.some(comb => {
        //verifica se alguma combinação do winningComb está preenchida
        return comb.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
            //verifica cada combinação de vitória para saber se está preenchida pelo current mesmo player (x ou o)
        });
    });
};


let circleTurn = false;

const placeMark = (cell, classAdded) => {
    cell.classList.add(classAdded)
}

const swapTurn = () => {
    circleTurn = !circleTurn;

    board.classList.remove('o');
    board.classList.remove('x');
    if (circleTurn) {
        board.classList.add('o');
    } else {
        board.classList.add('x')
    }
}

const handleClick = (e) => {
    //marcar com x ou o
    const cell = e.target;
    const classAdded = circleTurn ? "o" : "x";

    placeMark(cell, classAdded);

    //checa se houver vitória
    const isWin = checkWinner(classAdded);
    //verifica se houve empate
    const isDraw = checkDraw();
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true)
    } else {
        //muda o símbolo que vai por após a jogada
        swapTurn();
    }

    
}

for (const cell of cellElements) {
    cell.addEventListener("click", handleClick, { once: true });
}
//vai ler e adicionar em cada célula esse event listener
//once: true vai fazer só poder escolher uma vez

RematchButton.addEventListener('click', startGame)
