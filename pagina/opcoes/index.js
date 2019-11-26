var create_element = true;
var n_event = 1;

$.map(buttons, function (button, id) {
  $("#opcoes").append(`
    <div class="wrap ${id}-section">
      <div id="${id}-event-0 copy" rel="${id}" class="btn ${button.class}"> ${button.text}</div>
    </div>
  `);

  $('.btn').draggable({
    cursor: "move",
    containment: "document",
    drag: function(){

      if(create_element){
        create_element = false;
        var rel = $(this).attr('rel');
      }
    }
  });
});

$( "#comandos").droppable({
  drop: function( event, ui ) {

    const id_obj = ui.draggable[0].attributes.rel.value;
    
    var obj = $.map(buttons, function (button, id) {
      if(id == id_obj){
        return button;
      }
    });

    obj = obj[0];

    var element =`<div class="wrap ${id_obj}-section-script">
        <div id="${id_obj}-event-0 copy" rel="${id_obj}" class="btn ${obj.class}"> ${obj.text}</div>
    </div>`;

    add_element_script(this.id, element);
    reset_buttons();
    create_element = true;
    n_event ++;
  }
});

function add_element(target, element){
  $("."+target+"-section").append(element);
}

function add_element_script(target, element){
  $("#"+target).append(element);
}

function reset_buttons(){
  $("#opcoes").html('<div class="title-column">Functions</div>');

  $.map(buttons, function (button, id) {
    $("#opcoes").append(`
      <div class="wrap ${id}-section">
        <div id="${id}-event-0 copy" rel="${id}" class="btn ${button.class}"> ${button.text}</div>
      </div>
    `);
  
    $('.btn').draggable({
      cursor: "move",
      containment: "document",
      drag: function(){
  
        if(create_element){
          create_element = false;
          var rel = $(this).attr('rel');
        }
      }
    });
  });
}


