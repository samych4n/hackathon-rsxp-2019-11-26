var commands = [
  {
    command: "turn"
  },
  {
    loop: {
      iterations: 4,
      commands: [
        {
          command: "turn"
        },
        {
          command: "turn"
        },
        {
          loop: {
            iterations: 4,
            commands: [
              {
                command: "step"
              }
            ]
          }
        }
      ]
    }
  }
];

function enCode(commands) {
  const code = document.querySelector("code");
  let texto = retCode(commands);

  $("#codetext").html(texto);

  Prism.highlightAll();
}

function retCode(commands, space = 0) {
  let text = "";
  commands.map(item => {
    if (item.command) {
      switch (item.command) {
        case "step":
          text +=
            retSpace(space) +
            `//Movimenta o Astronauta. &#10;${retSpace(
              space
            )}step() &#10;&#10;`;
          break;
        case "turn":
          text +=
            retSpace(space) +
            `//Gira o Astronauta. &#10;${retSpace(space)}turn() &#10;&#10;`;
          break;
        default:
          break;
      }
    }

    if (item.loop) {
      let loop =
        retSpace(space) +
        `//Laço de Repetição. &#10;${retSpace(space)}loop(0 to ${
          item.loop.iterations
        }){ &#10;&#10;`;
      loop += retCode(item.loop.commands, space + 4);
      loop += retSpace(space) + "} &#10;";
      text += loop;
    }
  });
  return text;
}

function retSpace(number = 0) {
  let space = " ";
  return space.repeat(number);
}

enCode(commands);
