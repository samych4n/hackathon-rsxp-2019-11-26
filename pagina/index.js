// gameStatus:
// 0: Sem mensagem
// 1: Você ganhou o round
// 2: Você perdeu o round
// 3: Você terminou o jogo
function refresh(levelName, refreshTime, gameStatus) {
  theGGamestatus = gameStatus || 0;
  console.log("theGGamestatus: ", theGGamestatus);
  timer = 3000;
  switch (theGGamestatus) {
    case 0: 
      $("#lbl_round_status").html("");
      timer = 0;
    break;
    case 1: 
    $(".curtain-text").css('background-color', '#006600');
    $("#lbl_round_status").html("Parabéns, astronauta!<br>Você decolou!!!");
    timer = 3000;
    break;
    case 2: 
    $(".curtain-text").css('background-color', '#660000');
    $("#lbl_round_status").html("Oops! Tente novamente.");
    timer = 500;
    break;
    case 3: 
    $(".curtain-text").css('background-color', '#006600');
    $("#lbl_round_status").html("Parabéns, astronauta!<br>Você está pronto para seguir<br>para o próximo nível!!!<br><a href='https://rocketseat.com.br/' target='_blank'>GO GO GO</a>");
    timer = 3000;
    break;
  }
  setTimeout(() => {
    $(".curtainController").prop("checked", true);
    $(".curtain-text").fadeIn(3000);
    setTimeout(() => {
      $.getJSON(`levels/${levelName}.json`, function(lvl) {
        level = lvl;
        $("#codigo").load("./codigo");
        $("#comandos").load("./comandos");
        $("#opcoes").load("./opcoes");
        $("#tela").load("./tela");
        if (theGGamestatus != 3) {
          $(".curtain-text").hide();
          $(".curtain-text").css('background-color', 'transparent');
          $("#lbl_round_status").html("");
          $("#lbl_fase_titulo").html(level.name);
          $(".curtainController").prop("checked", false);
        }
      });
    }, refreshTime);
  }, timer);

}

$.getJSON(`levels/levelSequence.json`, function(lvlsequence) {
  levelSequence = lvlsequence;
  levelAtual = 0;
  refresh(levelSequence[levelAtual].level, 150, 0);
});
