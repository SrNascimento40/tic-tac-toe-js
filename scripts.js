const cellElements = document.querySelectorAll('[data-cell]');
//seleciona toda as celulas com tal atributo
const board = document.querySelector('[data-board]');
//seleciona apenas o board em questão

let circleTurn = false;

const placeMark = (cell, classAdded) => {
    cell.classList.add(classAdded)
}

const swapTurn = () =>{
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

    //verifica se houve empate

    //muda o símbolo que vai por após a jogada
    swapTurn();
}

for (const cell of cellElements) {
    cell.addEventListener("click", handleClick, {once: true});
}
//vai ler e adicionar em cada célula esse event listener
//once: true vai fazer só poder escolher uma vez
