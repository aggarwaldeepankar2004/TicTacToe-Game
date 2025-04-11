let boxes = document.querySelectorAll(".inner");
let tttOuter = document.querySelector("#outer");
let msg = document.querySelector("#message");
let newGameBtn = document.querySelector("#newGame");
let reset = document.querySelector("#reset-btn");

let winner = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

let turnX = true; // Initial Symbol
let count = 0;
let drawVal = 0;

boxes.forEach((inner) => {
    inner.addEventListener("click", () => {
        if (turnX == true) {
            turnX = false;
            inner.setAttribute("class", "inner cross");
            inner.innerText = "X";
        } else {
            turnX = true;
            inner.setAttribute("class", "inner circle");
            inner.innerText = "O";
        }
        inner.disabled = true;
        count++;
        checkWinner();
        draw();
    });
});

// Reset Button

reset.addEventListener("click", () => {
    turnX = true;
    for (let box of boxes) {
        box.innerText = "";
        box.disabled = false;
    }
    count = 0;
    msg.setAttribute("class", "hide winningMsg");
    newGameBtn.setAttribute("class", "hide newGame");
    tttOuter.setAttribute("class", "visible");
});

// New Game Button

newGameBtn.addEventListener("click", () => {
    turnX = true;
    for (let box of boxes) {
        box.innerText = "";
        box.disabled = false;
    }
    count = 0;
    msg.setAttribute("class", "hide winningMsg");
    newGameBtn.setAttribute("class", "hide newGame");
    tttOuter.setAttribute("class", "visible");
    turnX = true;
});


// Function Definitions

const draw = () => {
    if (count == 9 && drawVal >= 1) {
        console.log("This Game is a Tie!");
        dispTie();
    }
};

const dispWinner = (pos1) => {
    setTimeout(() => {
        msg.innerText = `HOORAYYY....  \n PLAYER ${pos1} \n WON THIS MATCH`;
        msg.setAttribute("class", "visible winningMsg");
        newGameBtn.setAttribute("class", "visible newGame");
        tttOuter.setAttribute("class", "hide");
    }, 1000);
};

const dispTie = () => {
    setTimeout(() => {                            // Delay the message for 1 sec to analyze the result
        msg.innerText = "THIS MATCH IS A \n TIE!";
        msg.setAttribute("class", "visible winningMsg");
        newGameBtn.setAttribute("class", "visible newGame");
        tttOuter.setAttribute("class", "hide");
    }, 1000);
};

const checkWinner = () => {
    for (patterns of winner) {
        let pos1 = boxes[patterns[0]].innerText;
        let pos2 = boxes[patterns[1]].innerText;
        let pos3 = boxes[patterns[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos2 == pos3) {
                console.log("winner is", pos1);
                drawVal = 0;
                dispWinner(pos1);
                break;
            } else {
                drawVal = 1;
            }
        }
    }
};

