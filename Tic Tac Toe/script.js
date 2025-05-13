let playertrun = true;
let resetBtn = document.querySelector("#restGame");
let boxs = document.querySelectorAll(".box");
const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");
let newGame = document.querySelector("#newGamebtn")
let count = 0;


const resetgame = () => {
    playertrun = true;
    count = 0;
    enableboxs();
    msgContainer.classList.add("hide")
    document.querySelector(".player1").classList.remove("glow");
    document.querySelector(".player2").classList.remove("glow");
}
boxs.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("box was clicked")
        if (playertrun) {
            box.innerText = "O"
            playertrun = false;
            document.querySelector(".player1").classList.add("glow");
            document.querySelector(".player2").classList.remove("glow");
        }
        else {
            box.innerText = "X";
            playertrun = true;
            document.querySelector(".player2").classList.add("glow");
            document.querySelector(".player1").classList.remove("glow");
        }
        box.disabled = true;
        count++;
        let isWinner = checkwinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
// const resetgame = () => {
//     playertrun = true;
//     count = 0;
//     enableboxs();
//     msgContainer.classList.add("hide")
//     document.querySelector(".player1").classList.remove("glow");
//     document.querySelector(".player2").classList.remove("glow");
// };

const disableBoxes = () => {
    for (let box of boxs) {
        box.disabled = true;
    }
};
const enableboxs = () => {
    for (let box of boxs) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Conguralations! Winner is  ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}


const checkwinner = () => {
    for (let pattern of winpatterns) {
        let pos1Val = boxs[pattern[0]].innerText;
        let pos2Val = boxs[pattern[1]].innerText;
        let pos3Val = boxs[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {

                // console.log("winner", pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
};
newGame.addEventListener("click", resetgame);
resetBtn.addEventListener("click", resetgame);


