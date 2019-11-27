var commandos = [
    {
        "command": "turn"
    },
    {
        "loop": {
            "iterations": 4,
            "commands": [
                {
                    "command": "turn"
                },
                {
                    "command": "turn"
                },
                {
                    "loop": {
                        "iterations": 4,
                        "commands": [
                            {
                                "command": "step"
                            },
                        ]
                    }
                }
            ]
        }
    }
]



    function index(board) {
        $("#play").off("click");
        $("#play").on("click",function(){play()});
        const myBoard = new Mapa(board)
        $("#container").html(myBoard.drawMap());
        personagens = Personagem.createPersonagens(board, $("#container"));
        itens = Item.createItem(board, $("#container"));
     
    }
    function play(){
        const commandos = createCommands($("#draggable"));
        personagens.forEach(personagem => {
            personagem.executeCommandos(commandos);
        });

        checkForVictoryOrLose = setInterval(() => {
            if(personagens.every(personagem => personagem.clear)){
                clearInterval(checkForVictoryOrLose)
                victory();
            }
            else if(personagens.every(personagem => !personagem.hasCommand)){
                clearInterval(checkForVictoryOrLose)
                lose();
            }
        }, 200);
    }

    function victory(){
        console.log("victory")
        refresh("level02",1000);
    }

    function lose(){
        console.log("lose");
        refresh("level01",1000);
    }
    

    index(level.map);

    