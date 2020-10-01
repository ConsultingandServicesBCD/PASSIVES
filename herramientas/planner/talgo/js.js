function creartexto(inpuText) {
  var TextoAcolocar = document.createTextNode(inpuText);
  return TextoAcolocar;
}

function buscar_Match(expresionregular, textoareaw) {
  var buscando_Match = expresionregular.test(textoareaw);
  var buscando_Match_Plano = expresionregular.exec(textoareaw);

  if (buscando_Match === true) {
    return buscando_Match_Plano[0];
  }
}
function no_encontrado(texto, texto2) {
  alert(texto);

  var motivo = prompt(texto2);

  motivo = motivo.toUpperCase();
  return motivo;
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
  var parte1 = buscar_Match(/\d{2}(?=\/\d{2}\/)/, inputFecha);
  var parte2 = /(?<=\d{2}\/)\d{2}(?=\/\d{4})/.exec(inputFecha);
  var parte2Text = parte2[0].toUpperCase();
  var parte3 = buscar_Match(/(?<=\/\d{2}\/)\d{4}/, inputFecha);
  var fecha_final = parte1 + arrayFechas_Letras[parte2Text];
  return fecha_final;
}

function copiar_Button(element, ulti) {
  if (!ulti) {
    var numero_pasajero = prompt("INSERTE EL NUMERO DE PASAJERO");
    var numero_segmento = prompt("INSERTE EL NUMERO DE SEGMENTO");
    if (numero_pasajero === "" || numero_segmento === "") {
      alert("Es necesario un valor");
      return;
    }
  }

  var id = element.dataset.columns;
  var box_focus = document.getElementById(id);
  var numero_de_inputs = box_focus.getElementsByTagName("input").length;
  var campo_parCopiar = document.createElement("textarea");
  document.body.appendChild(campo_parCopiar);
  for (let index = 0; index < numero_de_inputs; index++) {
    if (ulti) {
      var valor_inputs = box_focus.getElementsByTagName("input").item(index)
        .value;
    } else {
      var valor_inputs =
        box_focus.getElementsByTagName("input").item(index).value +
        "/P" +
        numero_pasajero +
        "/S" +
        numero_segmento;
    }

    var text_input = creartexto(valor_inputs + "\n");
    campo_parCopiar.appendChild(text_input);
  }
  campo_parCopiar.select();
  document.execCommand("copy");
  campo_parCopiar.remove();
  element.setAttribute("class", "animacionC_rm");
  element.setAttribute("value", "COPIADO");
  setTimeout(() => {
    element.setAttribute("class", "button_copiar");
    element.setAttribute("value", "COPIAR");
  }, 1500);
}

var textoarea = document.getElementById("codigoRaiz");
var botonGenerar = document.getElementById("generar");
var input_aut = document.getElementById("input-aut");

var boton_copiar = document.getElementById("boton-copiar");
var contenedor_p = document.getElementById("contenedor");
var bton_copiar = document.getElementById("bton_copiar");
var array_hecho = []; //este array lo usaremos para guardar los rm listos para copiar, una vez se hayan tratado los formatos y demas
function Generar() {
  var valor_Textoarea = textoarea.value;
  var verificacion_autorizada = /(?<=C\d{5}\d{8}\n)Autorizada/.test(
    valor_Textoarea
  );

  if (verificacion_autorizada != true) {
    alert("No se admiten solicitudes no autorizadas");
  } else {
    //Limpiar campos
    input_aut.innerHTML = "";
    array_hecho = [];
    //PRIMER RM
    var rm_pscpet_valor = buscar_Match(/C\d{10,}(?=\n)/, valor_Textoarea);
    var rm_pscpet_result = "RM*PSCPETVIAJE-" + rm_pscpet_valor;
    array_hecho.push(rm_pscpet_result);
    //SEGUNDO RM
    var rm_acc_valor = buscar_Match(/(?<=C\d{5})\d{8}/, rm_pscpet_result);
    var rm_acc_result = "RM*ACC" + rm_acc_valor;
    array_hecho.push(rm_acc_result);
    // TERCER RM -primera parte
    var numero_autorizador_valor = buscar_Match(
      /(?<=\D)\d{0,}(?=\s{0,}\-\s{0,}.*\n\C\d{0,})/,
      valor_Textoarea
    );
    if (numero_autorizador_valor === undefined) {
      var texto1 =
        "Numero de peticionario no encontrado,introduzcalo manualmente";
      var texto2 = "Numero de peticionario";
      numero_autorizador_valor = no_encontrado(texto1, texto2);
    }
    var numero_autorizador_result =
      "RM*ACECRM/N EMPLEADO PETICIONARIO-" + numero_autorizador_valor;
    array_hecho.push(numero_autorizador_result);

    // TERCER RM -segunda parte
    var nombre_autorizador_valor = buscar_Match(
      /(?<=\D\d{0,}\s{0,}\-\s{0,}).*(?=\n(\#|\F\.))/,
      valor_Textoarea
    );
    var arranombre = nombre_autorizador_valor.split(" ");
    var contadorN = 0;
    console.log(arranombre[0].length);
    for (let index = 0; index < arranombre.length; index++) {
      const element = arranombre[index].length;
      contadorN = contadorN + element;

      if (contadorN >= 40) {
        alert(
          "El nombre de autorizador:" +
            nombre_autorizador_valor +
            " supera el numero de caracteres permitidos,Por favor introduzca el nombre con menos caracteres"
        );
        var nuevo_valor = prompt(
          "Nombre autorizador: " + nombre_autorizador_valor
        );
        nombre_autorizador_valor = nuevo_valor;
      }
    }
    var nombre_autorizador_result =
      "RM*ACECRM/NOMBRE AUTORIZADOR-" + nombre_autorizador_valor;

    array_hecho.push(nombre_autorizador_result);
    // CUARTO RM
    var rm_centroCoste_valor = valor_Textoarea.match(
      /(?<=\d{0,7}\s\-\s.*\n).*(?=\s\-)/g
    );
    if (rm_centroCoste_valor === undefined) {
      var texto1 = "Centro de coste no encontrado,introduzcalo manualmente";
      var texto2 = "Centro de coste";
      rm_centroCoste_valor = no_encontrado(texto1, texto2);
    }

    var centro_de_coste_result =
      "RM*ACECRM/CENTRO COSTE-" + rm_centroCoste_valor[0];
    array_hecho.push(centro_de_coste_result);
    // QUINTO RM
    var reatrp_valor = buscar_Match(
      /.*\w[A-Za-z](?=\s\-.*\s[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4}))/,
      valor_Textoarea
    );

    if (reatrp_valor === undefined) {
      alert(
        "El motivo de viaje no ha sido encontrado.Por favor introduzca el motivo del viaje manualmente"
      );

      var motivo = prompt("Motivo de viaje");

      motivo = motivo.toUpperCase();
      reatrp_valor = motivo;
    }
    var reatrp_result = "RM*ACECRM/REATRP-" + reatrp_valor;

    array_hecho.push(reatrp_result);
    //sexto RM
    var TQ_rm_valor = buscar_Match(
      /(?<=Porcentaje\s(.*\s))\d{0,}/,
      valor_Textoarea
    );
    var TQ_rm_result = "RM*ACECRM/TQ3CD3-" + TQ_rm_valor;
    array_hecho.push(TQ_rm_result);

    //SEPTIMO RM
    var RM_imputacion_VALOR = buscar_Match(
      /(?<=Objeto de imputación\s\d{0,}\s)\S{0,}(?=\n)/,
      valor_Textoarea
    );
    var RM_imputacion_result =
      "RM*ACECRM/OBJETO IMPUTACION 2-" + RM_imputacion_VALOR;

    if (RM_imputacion_VALOR != undefined) {
      array_hecho.push(RM_imputacion_result);
    }

    array_hecho.forEach((element) => {
      var et_p = document.createElement("p");
      et_p.innerText = element;
      input_aut.appendChild(et_p);
    });

    //quitamos los valores null

    bton_copiar.setAttribute("class", "button_copiar");
    bton_copiar.setAttribute("onclick", "copiar(this)");
    //Limpiar campos
    textoarea.value = "";
    //Limpiar campos
  }
}

//var campoCopiar=document.getElementById("campoCopiar");
var campoCopiar2 = document.getElementById("campoCopiar2");

function copiar(element) {
  array_hecho.forEach((element) => {
    var texto = creartexto(element + "\n");
    campoCopiar2.appendChild(texto);
  });

  campoCopiar2.select();
  document.execCommand("copy");
  campoCopiar2.innerText = "";
  element.setAttribute("class", "animacionC");
  setTimeout(() => element.setAttribute("class", "button_copiar"), 1000);
}
