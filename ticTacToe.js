let boxes = document.querySelectorAll('.box');
let resetbtn = document.getElementById('resetbtn');

let turnO = false;
let turnX = true;
let gameover = false;
let clicks = 9;

function reset() {
    boxes.forEach((box) => {
        box.innerText = '';
        box.classList.remove('x');
        box.classList.remove('o');
    });
    turnO = false;
    turnX = true;
    gameover = false;
    let countermessage = document.getElementById("countermessage");
    let winnermessage = document.getElementById("winnermessage");
    countermessage.style.display = "none";
    winnermessage.style.display = "none";
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
            clicks--;
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
                let countermessage = document.getElementById("countermessage");
                let winnermessage = document.getElementById("winnermessage");
                countermessage.style.display = 'block';
                winnermessage.style.display = "block";
                winnermessage.innerHTML = `Winner of the game is <span id="winner"></span>`;
                let counter = document.getElementById("counter");
                let winnerName = document.getElementById("winner");
                winnerName.innerHTML = winner;
                let setCounter = 5;
                counter.innerText = setCounter;
                let countdown = setInterval(() => {
                    setCounter--;
                    counter.innerText = setCounter;
                    if (setCounter == 0 && gameover) {
                        clearInterval(countdown);
                        countermessage.style.display = "none";
                        winnermessage.style.display = "none";
                        reset();
                    }
                }, 1000);

                resetbtn.addEventListener('click', () => {
                    clearInterval(countdown);
                });
                clicks = 9;
            }
            if(clicks == 0){
                let winnermessage = document.getElementById("winnermessage");
                winnermessage.innerHTML = `No one wins the game, it's a draw. Please click on the Reset Game button.`;
                winnermessage.style.display = "block";
                clicks = 9;
            }
        }
    });
});

resetbtn.addEventListener('click', reset);