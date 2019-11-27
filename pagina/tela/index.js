
function index(board) {
    $("#play").off("click");
    $("#play").on("click", function () { $("#play").off("click"); play(); });
    $("#reset").off("click");
    $("#reset").on("click", function () { $("#reset").off("click"); reset(); });
    const myBoard = new Mapa(board)
    $("#container").html(myBoard.drawMap());
    personagens = Personagem.createPersonagens(board, $("#container"));
    itens = Item.createItem(board, $("#container"));

}
function play() {
    const commandos = createCommands($("#draggable"));
    $("#reset").off("click");
    personagens.forEach(personagem => {
        personagem.executeCommandos(commandos);
    });

    checkForVictoryOrLose = setInterval(() => {
        if (personagens.every(personagem => personagem.clear)) {
            clearInterval(checkForVictoryOrLose)
            victory();
        }
        else if (personagens.every(personagem => !personagem.hasCommand)) {
            clearInterval(checkForVictoryOrLose)
            lose();
        }
    }, 200);
}

function victory() {
    console.log("victory")
    levelAtual++;
    if(levelSequence[levelAtual])
        return refresh(levelSequence[levelAtual].level, 2000,1);
    else
    {
        levelAtual = 0;
        return refresh(levelSequence[levelAtual].level, 2000,3);
    }
        
}

function lose() {
    console.log("lose");
    return refresh(levelSequence[levelAtual].level, 2000,2);
}

function reset() {
    return refresh(levelSequence[levelAtual].level, 2000,0);
}


index(level.map);

