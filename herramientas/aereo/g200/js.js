function creartexto(inpuText) {
  var TextoAcolocar = document.createTextNode(inpuText);
  return TextoAcolocar;
}
function copiar(element) {
  element.setAttribute("class", "animacionC");
  var destinocp = document.getElementById("repuestasUNO");
  var zonaCP = document.createElement("textarea");
  destinocp.appendChild(zonaCP);
  zonaCP.value = element.innerText;
  zonaCP.select();
  document.execCommand("copy");
  zonaCP.remove();
  function reset() {
    element.setAttribute("class", "respuesta");
  }
  setTimeout(() => {
    element.setAttribute("class", "respuesta");
  }, 1000);
}

function buscar_Match(expresionregular, textoareaw) {
  var buscando_Match = expresionregular.test(textoareaw);
  var buscando_Match_Plano = expresionregular.exec(textoareaw);

  if (buscando_Match === true) {
    return buscando_Match_Plano[0];
  }
}

function formatoFecha(inputFecha) {
  var arrayFechas_Letras = [];
  arrayFechas_Letras["01"] = "JAN";
  arrayFechas_Letras["02"] = "FEB";
  arrayFechas_Letras["03"] = "MAR";
  arrayFechas_Letras["04"] = "APR";
  arrayFechas_Letras["05"] = "MAY";
  arrayFechas_Letras["06"] = "JUN";
  arrayFechas_Letras["07"] = "JUL";
  arrayFechas_Letras["08"] = "AUG";
  arrayFechas_Letras["09"] = "SEP";
  arrayFechas_Letras["10"] = "OCT";
  arrayFechas_Letras["11"] = "NOV";
  arrayFechas_Letras["12"] = "DEC";
  var parte1 = buscar_Match(
    /\d{2}(?=\/\d{2}\/)|\d{2}(?=\.\d{2}\.)/,
    inputFecha
  );
  var parte2 = /(?<=\d{2}\/)\d{2}(?=\/\d{4})|(?<=\d{2}\.)\d{2}(?=\.\d{4})/.exec(
    inputFecha
  );
  console.log(inputFecha);
  var parte2Text = parte2[0].toUpperCase();
  var parte3 = buscar_Match(/(?<=\/\d{2}\/)\d{4}/, inputFecha);
  var fecha_final = parte1 + arrayFechas_Letras[parte2Text];
  return fecha_final;
}
var btn_generar = document.getElementById("generar");
var texto_Area = document.getElementById("codigoRaiz");

var nodo_respuesta = document.getElementById("respuesta");
var alertaCoche = document.getElementById("alertaCoche");
var rmacc = document.getElementById("reservaCode0");
var rmaca = document.getElementById("reservaCode1");
var LOCALIZADOR_GlOVAL; //SE UTILIZARA PARA SACAR USAR ESTE LOCALIZADOR FUERA DE LA FUNCION GENERAR
function generar() {
  var texto_Area_V = texto_Area.value;

  var haycoche = /Coches|coches|coche|Coche/.test(texto_Area_V);
  if (haycoche) {
    var classNameAlert = "reserva_coche_on heartBeat";
    alertaCoche.setAttribute("class", classNameAlert);
    alertaCoche.setAttribute("style", "");
  } else {
    alertaCoche.setAttribute("class", "");
    alertaCoche.setAttribute("style", "display:none");
  }
  var numero_vuelo = buscar_Match(/(?<=Nº\s*de\s*vuelo:.)\d{1,}/, texto_Area_V);
  var rango_digitos = numero_vuelo.length;
  if (rango_digitos < 4) {
    var numero_ceros = 4 - rango_digitos;
    numero_ceros = parseInt(numero_ceros);

    var numero_nuevo = numero_vuelo.padStart(numero_ceros + rango_digitos, 0);
  } else {
    var numero_nuevo = numero_vuelo;
  }

  var fecha_salida = buscar_Match(
    /(?<=salida:.)\d{2}\/\d{2}\/\d{4}/,
    texto_Area_V
  );
  var formato_fecha = formatoFecha(fecha_salida);
  var hora_salida = buscar_Match(
    /(?<=salida:.\d{2}\/\d{2}\/\d{4}\s*)\d{2}\:\d{2}/,
    texto_Area_V
  );
  hora_salida = hora_salida.replace(":", "");
  var hora_llegada = buscar_Match(
    /(?<=(Regreso:|llegada:).\d{2}\/\d{2}\/\d{4}\s*)\d{2}\:\d{2}/,
    texto_Area_V
  );
  hora_llegada = hora_llegada.replace(":", "");

  var ciudades = texto_Area_V.match(
    /(?<=Ruta:.)\w{3,}|(?<=Ruta:.\w{3,}.*\)(\s{0,}\-\s{0,}))\w{3,}/g
  ); //no se utiliza por ahora
  var ciudad_salida = buscar_Match(/(?<=Salida:.)\w{0,}/, texto_Area_V);
  var ciudad_llegada = buscar_Match(/(?<=Llegada:.)\w{0,}/, texto_Area_V);
  //esta xpresion regular no es del todo correcta pero nos funciona para saber el numero de pasajeros pero no para capturar el nombre completo de los pasajeros pero ese no es el objetivo ahora mismo.
  var pasajeros = texto_Area_V.match(
    /(?<=(Viajeros:.*\n)|(Viajeros:.*\n(.*\n){1,}))(\w{0,}[A-Z-Ñ](\s{0,}|)){1,6}\n/g
  );
  var numero_pasajeros = pasajeros.length;
  var localizador = buscar_Match(/(?<=Reserva\s{0,})\d{1,}/, texto_Area_V);
  var linea =
    "SS7X" +
    numero_nuevo +
    "Y" +
    formato_fecha +
    ciudad_salida +
    ciudad_llegada +
    "GK" +
    numero_pasajeros +
    "/" +
    hora_salida +
    hora_llegada +
    "/" +
    localizador;
  nodo_respuesta.setAttribute("onclick", "copiar(this)");
  nodo_respuesta.innerText = linea;

  rmacc.innerText = "RM*ACC" + localizador;
  rmaca.innerText = "RM*ACEMPN-" + localizador;
  LOCALIZADOR_GlOVAL = localizador;
}

btn_generar.addEventListener("click", generar);

var segmento_input = document.getElementById("segmento");
var segundSEG_nodo = document.getElementById("segundSEG");
var segundSEG = document.getElementById("segundSEG").getElementsByTagName("p");
var segundSEG_rango = segundSEG.length;
function mostrarInputs() {
  for (var i = 0; i <= segundSEG_rango; i++) {
    var array = [
      "RM*ACC" + LOCALIZADOR_GlOVAL + "/s",
      "RM*ACEMPN-" + LOCALIZADOR_GlOVAL + "/s",
      "RM*ACEMPA-7X/s",
      "RM*ACESAL-0.0/s",
      "RM*ACEMPT-0.0/s",
      "RM*PSCSCOM-0.0/s",
      "RM*ACECOM-00.00/s",
      "RM*ACELCTB-CJM/s",
      "RM*ACESUP-7X/s",
    ];
    var objeto = segundSEG.item(i);
    var valor_objeto = objeto.innerText;
    var nuevo_valor = segmento_input.value;
    objeto.innerText = array[i] + nuevo_valor;
  }
}
segmento_input.addEventListener("keyup", mostrarInputs);

var btn_Copiar = document.getElementById("Copiar");

function copiarSEG() {
  if (segmento_input.value != "") {
    var etiquetaAREA = document.createElement("textarea");
    segundSEG_nodo.appendChild(etiquetaAREA);
    btn_Copiar.setAttribute("class", "btn_CopiarC");
    for (var i = 0; i <= segundSEG_rango - 1; i++) {
      var objeto = segundSEG.item(i);
      var valor_objeto = creartexto(objeto.innerText + "\n");
      console.log(i);
      etiquetaAREA.appendChild(valor_objeto);
    }
    etiquetaAREA.select();
    document.execCommand("copy");
    etiquetaAREA.remove();
    setTimeout(() => {
      btn_Copiar.setAttribute("class", "btn_Copiar");
    }, 1000);
  } else {
    segmento_input.focus();
  }
}
btn_Copiar.addEventListener("click", copiarSEG);


