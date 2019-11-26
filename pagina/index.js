
function refresh(levelName){

    $.getJSON(`levels/${levelName}.json`, function (lvl) {
        level = lvl;
        $( "#tela" ).load( "./tela");
        $( "#comandos" ).load( "./comandos");
        $( "#opcoes" ).load( "./opcoes");
    });
}
refresh("level01");
