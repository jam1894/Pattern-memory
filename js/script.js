var level = 0;
var score = 0;
var turno = false;
var tiempo;
var patronArray = [];
var opcionArray = [];
var numClicks = 0;
// Variables texto
var turno_jugador = "tu turno!";
var mensaje = "presta atención al patron!";
var nivel = "<span class='Bien'>sube nivel!</span>";
var game_over = "<span class='fail'>Game Over</span><br>record: ";

function iniciarJuego()
{
    $("#bloques").css("display","block");
    $("#final_juego").css("display","none");
    $("#final_juego").css("display","none");
    alerta(mensaje);
    visualizarPatron();
}
function alerta(m)
{
    $('#notificacion').html(m);
}

function visualizarPatron()
{
    var i = 0;
    var numeroAleatorio;
    var idBloque;
    var color;
    numClicks = 0;
    patronArray = [];
    turno = false;
    level = level + 1;
    $("#level").text(level + "/20")
    $("#score").text(score)

    tiempo = setInterval(function()
    {
        numeroAleatorio = Math.floor((Math.random() * 12) + 1);
        idBloque = "#bloque_" + numeroAleatorio;
        patronArray[i] = idBloque;
        color = $(idBloque).css("border-color");
        $(idBloque).css("background-color", color);

        setTimeout(function()
        {
          $(idBloque).css("background-color", "#FFF");
            i = i + 1;
            if(i == (level + 2))
            {
                clearInterval(tiempo);
                turno = true;

                alerta(turno_jugador);
                return;
            }
        }, 800);
      }, 1000);
};

function compararPatron()
{
    for(var j = 0; j < (level + 2); j++)
    {
        if(opcionArray[j] != patronArray[j])
        {
            gameOver();
            return;
        }
    }
    siguienteNivel();
}

function siguienteNivel()
{
    alerta(nivel);
    score = score + 1.5*level*100


    setTimeout(function()
     {
        alerta(mensaje);
        visualizarPatron();
     }, 1000);
}

$(document).ready(function()
{
    //boton inicio
    $("#start").click(function()
    {
      level = 0;
      // Pantalla juego, donde el juego acaba de terminar.
      if (opcionArray.length != 0)
      {
          $("#final_juego").css("Display", function()
          {
              iniciarJuego();
          });
      } else {
          iniciarJuego();
      }
    });
    // Click a los bloques.
    $(".bloque").mousedown(function()
    {
        if (turno)
        {
            var idBloque = '#' + this.id;
            //var luzColor = $(this).css('border-color');
            $(idBloque).css('background-color', $(idBloque).css('border-color'));
            setTimeout(function() { $(idBloque).css('background-color', '#FFFFFF'); }, 500);

            // Comparar
            if(numClicks == (level + 1))
            {
                opcionArray[numClicks] = idBloque
                compararPatron();
            }else{
                  opcionArray[numClicks] = idBloque
                  numClicks++;
                 }
        }
    });
});

function gameOver()
{
    // Mostrar la pantalla al terminar la partida
    $('#mensaje').html(game_over + score);
    $('#final_juego').css("display","block");

    level = 0;
    score = 0;
    playerTurn = false;
}
