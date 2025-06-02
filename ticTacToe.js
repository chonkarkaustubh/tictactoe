let boxes = document.querySelectorAll('.box');
let resetbtn = document.getElementById('resetbtn');

let turnO = false;
let turnX = true;
let gameover = false;

function reset() {
    boxes.forEach((box) => {
        box.innerText = '';
        box.classList.remove('x');
        box.classList.remove('o');
    });
    turnO = false;
    turnX = true;
    gameover = false;
    let message = document.getElementById("message");
    message.style.display = "none";
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            gameover = true;
            return boxes[a].innerText;
        }
    }
    return null;
}
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (box.innerText === '' && !gameover) {
            if (turnX) {
                box.innerText = 'X';
                box.classList.add('x');
                turnX = false;
                turnO = true;
            } else {
                box.innerText = 'O';
                box.classList.add('o');
                turnX = true;
                turnO = false;
            }

            const winner = checkWin();
            if (winner) {
                alert(`${winner} wins!`);
                let message = document.getElementById("message");
                message.style.display = 'block';
                let counter = document.getElementById("counter");
                let setCounter = 5;
                counter.innerText = setCounter;
                let countdown = setInterval(() => {
                    setCounter--;
                    counter.innerText = setCounter;
                    if (setCounter == 0 && gameover) {
                        clearInterval(countdown);
                        message.style.display = "none";
                        reset();
                    }
                }, 1000);

                resetbtn.addEventListener('click', () => {
                    clearInterval(countdown);
                });
            }
        }
    });
});

resetbtn.addEventListener('click', reset);