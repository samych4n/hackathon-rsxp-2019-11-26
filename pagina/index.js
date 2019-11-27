function refresh(levelName, refreshTime) {
  $(".curtainController").prop("checked", true);
  setTimeout(() => {
    $.getJSON(`levels/${levelName}.json`, function(lvl) {
      level = lvl;
      $("#comandos").load("./comandos");
      $("#opcoes").load("./opcoes");
      $("#tela").load("./tela");
      $(".curtainController").prop("checked", false);
      $("#codigo").load("./codigo");
    });
  }, refreshTime);
}
refresh("level01", 150);
