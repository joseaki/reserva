try {
  $( ".btn" ).remove();    
} catch (error) {
  console.log("No existe div ");
}

$( ".login-form" ).append( '<button type="button" class="btn btn-success" onclick="auto();">Reserva Automatica</button>' );

function auto(){
var codigo = $('#codigo').val();
var pass = $('#pass').val();
var captcha = $('#cap').val();

//Validando campos
if(codigo=='' || codigo.length<6){	document.getElementById("codigo").focus();return;}
if(pass=='' || pass.length<5){ document.getElementById("pass").focus(); return;}
if(captcha==''){ document.getElementById("cap").focus(); return;}

//reservar(codigo,pass,captcha);
var intervalId = window.setInterval(function(){
  reservar(codigo,pass,captcha);
  try {
    if($('.si').length){
      console.log("ya es verde")
      window.clearInterval(intervalId);
    }else{
      console.log("no reservado")
    }
  } catch (error) {
      console.log("Error... ");
  }

  
}, 25);

}


function reservar(codigo,pass,captcha){
    $.ajax({
    type: 'POST',
    url: 'registro.php',
    data: {'codigo':codigo,'pass':pass,'cap':captcha},
    dataType: 'json',
    complete : function(){
        console.log(this.url);
    },
    success: function(data) {
      console.log(data);
      try {
        $( ".si" ).remove();    
      } catch (error) {
          console.log("No existe div ");
      }
      if(data['respuesta']=='si'){
        $(".login-sec").append('<div class="si" style="background-color:#96e881">Cupo Nro: <label id="cupo">'+data['cupo']+'</label><br>'+
                                'Codigo: <label id="codigo"'+data['alumno']+'</label><br>'+
                                'Nombre: <label id="nombre"'+data['nombre']+'</label><br>'+
                                'Fecha y Hora: <label id="fecha"'+data['fecha']+'</label></div>');
        try {
            $( ".no" ).remove();    
        } catch (error) {
            console.log("No existe div ");
        }

      }
      if(data['respuesta']=='no'){
        try {
          $( ".no" ).remove();    
      } catch (error) {
          console.log("No existe div ");
      }
        $(".login-sec").append('<div class="no" style="background-color:#ff7c77">Error <label id="error">'+data['mensaje']+'</label><br>');
      }
    },error: function (jqXHR, exception) {
      console.log(jqXHR);
      console.log(exception);
    },
    async:true
  });
}