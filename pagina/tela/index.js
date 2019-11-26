


    function index(board) {
        const myBoard = new Mapa(board)
        $("#container").html(myBoard.drawMap());
        personagens = Personagem.createPersonagens(board, $("#container"));
        itens = Item.createItem(board, $("#container"));
    }

    

    index(level.map);