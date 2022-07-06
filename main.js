const allPicks = [...document.querySelectorAll(".game button")];
const scoreSpan = document.querySelector(".score strong");

const gameState = {
    score: 0,
    playerPick: null,
    aiPick: null
}

const whoIsStronger = {
    paper: "rock",
    scissors: "paper",
    rock: "scissors"
}


const init = () => {
    scoreSpan.textContent = gameState.score
    
    allPicks.forEach((pick)=>{
        pick.addEventListener("click", (e)=>{
            playerChoise(e);
            aiChoise();

            changeGamePanel();

        })
})
}


const playerChoise = (e) => {
    gameState.playerPick = e.currentTarget.dataset.key;
}

const changeGamePanel = () =>{
    document.querySelector(".game").classList.add("slide__to__left");
    document.querySelector(".fight").classList.add("slide__from__bottom");

    showChoise("player");
    showChoise("ai");
    setTimeout(showResult,1000);

}
const showResult = () =>{

    const result = whoWin().toUpperCase();
    scoreSpan.textContent = gameState.score;
    document.querySelector(".result-span").textContent = `YOU ${result}`;
    document.querySelector(".result").classList.add("result__animation");
}

const whoWin = () =>{
    if(gameState.playerPick === gameState.aiPick){
        return "draw";
    }else if(whoIsStronger[gameState.playerPick].includes(gameState.aiPick)){
        gameState.score++;
        return "win";
    }else{
        gameState.score--;
        return "lose";
    }
}

const showChoise = (name) => {
    const pick = name === "player" ? gameState.playerPick : gameState.aiPick;
    const buttonDivCointainer = document.createElement("div");
    buttonDivCointainer.classList.add("button", `button__${pick}`);

    const buttonImageContainer = document.createElement("div");
    buttonImageContainer.classList.add("button_image_container");

    const imageElement = document.createElement("img");
    imageElement.src = `./images/icon-${pick}.svg`;
    imageElement.alt = `${pick}`;

    buttonImageContainer.appendChild(imageElement);
    buttonDivCointainer.appendChild(buttonImageContainer);
    const playPickDestination = document.querySelector(`.pick-container-${name}`);
    playPickDestination.innerHTML = "";
    playPickDestination.appendChild(buttonDivCointainer);
}


const aiChoise = () => {
    const availablePicks = ["paper", "scissors", "rock"];
    gameState.aiPick = availablePicks[Math.floor(Math.random() * 3)];
}

init();
