
function refresh(levelName,refreshTime){
    $(".curtainController").prop("checked",true)
    setTimeout(() => {
        $.getJSON(`levels/${levelName}.json`, function (lvl) {
            level = lvl;
            $( "#tela" ).load( "./tela");
            $( "#comandos" ).load( "./comandos");
            $( "#opcoes" ).load( "./opcoes");
            $(".curtainController").prop("checked",false)
        });    
    }, refreshTime);

}
refresh("level01",150);
