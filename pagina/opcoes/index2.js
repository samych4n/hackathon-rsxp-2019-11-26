level.commands.forEach (command => {
    $("#opcoes").append(`
      <div class="wrap">
        <div class="btn ${buttons[command].class}"> ${buttons[command].text}</div>
      </div>
    `);
});
$('.btn').draggable({
    revert: "invalid",
    stack: "#draggable",
    helper: 'clone'
});
$('#draggable').droppable({
    accept: ".btn",
    greedy: true,
    drop: function (event, ui) {
        var droppable = $(this);
        if(ui.helper.is(".dropped")) {
            return false;
        }
        var draggable = ui.draggable;
        ui.helper.addClass(".dropped");
        var clone = draggable.clone();
        clone.appendTo(droppable);
        if(clone.hasClass("loop-btn") || clone.hasClass("loop4-btn")){
            createHandler(clone);
        }
        enCode(createCommands($("#draggable")))
    }
})
function createHandler(clone){
    clone.droppable({
        accept: ".btn",
        greedy: true,
        drop: function (event, ui) {
            var droppable = $(this);
            if(ui.helper.is(".dropped")) {
                return false;
            }
            ui.helper.addClass(".dropped");
            var draggable = ui.draggable;
            var clone = draggable.clone();
            clone.appendTo(droppable);
            if(clone.hasClass("loop-btn") || clone.hasClass("loop4-btn")){
                createHandler(clone);
            }
            enCode(createCommands($("#draggable")))
        }
    })
}

//"#draggable"
function createCommands($elem){
    const command = [];
    $elem.children(".btn").each(function( index ) {
        if($( this ).hasClass("loop-btn")){
            command.push({
                "loop":{
                    "iterations":2,
                    "commands":createCommands($( this ))
                }
            })
        }
        else if($( this ).hasClass("loop4-btn")){
            command.push({
                "loop":{
                    "iterations":4,
                    "commands":createCommands($( this ))
                }
            })
        }
        else if($( this ).hasClass("turn-btn")){
            command.push({"command":"turn"})
        }
        else if($( this ).hasClass("step-btn")){
            command.push({"command":"step"})
        }
    })
    return command;
}