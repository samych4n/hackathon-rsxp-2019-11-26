// gameStatus:
// 0: Sem mensagem
// 1: Você ganhou o round
// 2: Você perdeu o round
// 3: Você terminou o jogo
function refresh(levelName, refreshTime, gameStatus) {
  theGGamestatus = gameStatus || 0;
  console.log("theGGamestatus: ", theGGamestatus);
  switch (theGGamestatus) {
    case 0: 
      $("#lbl_round_status").html("");
    break;
    case 1: 
    $("#lbl_round_status").html("Parabéns, astronauta!<br>Você decolou!!!");
    break;
    case 2: 
    $("#lbl_round_status").html("Oops! Tente novamente.");
    break;
    case 3: 
    $("#lbl_round_status").html("Parabéns, astronauta!<br>Você está pronto para seguir<br>para o próximo nível!!!");
    break;
  }
  timer = theGGamestatus == 0 ? 0 : 3000;
  setTimeout(() => {
    $(".curtainController").prop("checked", true);
    $(".curtain-text").fadeIn();
    setTimeout(() => {
      $.getJSON(`levels/${levelName}.json`, function(lvl) {
        level = lvl;
        $("#comandos").load("./comandos");
        $("#opcoes").load("./opcoes");
        $("#tela").load("./tela");
        $(".curtain-text").hide();
        $("#lbl_round_status").html("");
        $(".curtainController").prop("checked", false);
        $("#codigo").load("./codigo");
      });
    }, refreshTime);
  }, timer);
}
refresh("level01", 150, 0);
