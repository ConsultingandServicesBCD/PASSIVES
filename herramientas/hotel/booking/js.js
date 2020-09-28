var normalize = (function () {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç-è,",
    to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc e ",
    mapping = {};

  for (var i = 0, j = from.length; i < j; i++)
    mapping[from.charAt(i)] = to.charAt(i);

  return function (str) {
    var ret = [];
    for (var i = 0, j = str.length; i < j; i++) {
      var c = str.charAt(i);
      if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
      else ret.push(c);
    }
    return ret.join("");
  };
})();
//var fechas_inicio=texto_Area.match(/(?<=Valid:\n)\d{2}\.\d{2}\.\d{4}|\d{2}\/\d{2}\/\d{4}/g);
function buscar_Match(expresionregular, textoareaw) {
  var buscando_Match = expresionregular.test(textoareaw);
  var buscando_Match_Plano = expresionregular.exec(textoareaw);

  if (buscando_Match === true) {
    return buscando_Match_Plano[0];
  }
}
function formatoFecha(inputFecha) {
  var arrayFechas_Letras = [];
  arrayFechas_Letras["enero"] = "JAN";
  arrayFechas_Letras["febrero"] = "FEB";
  arrayFechas_Letras["marzo"] = "MAR";
  arrayFechas_Letras["abril"] = "APR";
  arrayFechas_Letras["mayo"] = "MAY";
  arrayFechas_Letras["junio"] = "JUN";
  arrayFechas_Letras["julio"] = "JUL";
  arrayFechas_Letras["agosto"] = "AUG";
  arrayFechas_Letras["septiembre"] = "SEP";
  arrayFechas_Letras["octubre"] = "OCT";
  arrayFechas_Letras["noviembre"] = "NOV";
  arrayFechas_Letras["diciembre"] = "DEC";

  return arrayFechas_Letras[inputFecha];
}
function quitarSpacio(input) {
  var texto_sin_espacio = input.replace(" ", "");
  return texto_sin_espacio;
}

function creartexto(inpuText) {
  var TextoAcolocar = document.createTextNode(inpuText);
  return TextoAcolocar;
}
function generar() {
  //todo Fuente de datos A0
  var texto_Area_html = document.getElementById("codigoRaiz");
  var texto_Area = texto_Area_html.value; //todo A0
  // numero de personas
  var numero_personas = buscar_Match(
    /(?<=Reservaste para.*)\d(?=\sadulto)/,
    texto_Area
  );
  // CONVERTIMOS LAS FECHAS AL FORMATO QUE NECESITAMOS

  //fecha entrada
  var fecha_entrada_numero = buscar_Match(
    /(?<=Entrada.*\w{0,}\,\s)\d{0,}/,
    texto_Area
  );
  var fecha_entrada_letra = buscar_Match(
    /(?<=Entrada.*\w{0,}\,\s\d{0,}\sde\s)\w{0,}/,
    texto_Area
  );
  var fecha_nuevoformato_entrada = formatoFecha(fecha_entrada_letra);

  //fecha de salida
  var fecha_salida_numero = buscar_Match(
    /(?<=Salida.*\w{0,}\,\s)\d{0,}/,
    texto_Area
  );
  var fecha_salida_letra = buscar_Match(
    /(?<=Salida.*\w{0,}\,\s\d{0,}\sde\s)\w{0,}/,
    texto_Area
  );
  var fecha_nuevoformato_salida = formatoFecha(fecha_salida_letra);

  // HOTEL

  var hotel = buscar_Match(/(?<=El\s).*(?=\ste espera)/, texto_Area);

  // direccion

  var direccion = buscar_Match(
    /.*(?=\s{0,}-\s{0,}Mostrar itinerario)/,
    texto_Area
  );

  //Poner los campos del usuario al final
  var linea =
    "HU1AHK" +
    numero_personas +
    fecha_entrada_numero +
    fecha_nuevoformato_entrada +
    "-" +
    fecha_salida_numero +
    fecha_nuevoformato_salida +
    "/HN-" +
    hotel +
    "/AP-" +
    direccion;
  console.log(linea);
}

function copiar(element) {
  element.setAttribute("class", "animacionC");
  var destinocp = document.getElementById("contenedor");
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
function copiars(element) {
  element.setAttribute("class", "animacionC");
  var destinocp = document.getElementById("contenedor");
  var zonaCP = document.createElement("textarea");
  destinocp.appendChild(zonaCP);
  var texto = creartexto(element.innerText + "\n");
  var textoDos = creartexto("RM*ACEHCO-00.00");
  zonaCP.appendChild(texto);
  zonaCP.appendChild(textoDos);
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
