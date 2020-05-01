function creartexto(inpuText){
    var TextoAcolocar=document.createTextNode(inpuText);
    return TextoAcolocar;
    }

function buscar_Match(expresionregular,textoareaw){
    var  buscando_Match=expresionregular.test(textoareaw);
    var  buscando_Match_Plano=expresionregular.exec(textoareaw);

        if(buscando_Match===true ){


                return buscando_Match_Plano[0];

            }
            }

function formatoFecha(inputFecha){
  var arrayFechas_Letras=[];
    arrayFechas_Letras["01"]="JAN";
    arrayFechas_Letras["02"]="FEB";
    arrayFechas_Letras["03"]="MAR";
    arrayFechas_Letras["04"]="APR";
    arrayFechas_Letras["05"]="MAY";
    arrayFechas_Letras["06"]="JUN";
    arrayFechas_Letras["07"]="JUL";
    arrayFechas_Letras["08"]="AUG";
    arrayFechas_Letras["09"]="SEP";
    arrayFechas_Letras["10"]="OCT";
    arrayFechas_Letras["11"]="NOV";
    arrayFechas_Letras["12"]="DEC";
    var parte1=buscar_Match(/\d{2}(?=\/\d{2}\/)/,inputFecha);
    var parte2=/(?<=\d{2}\/)\d{2}(?=\/\d{4})/.exec(inputFecha);
    var    parte2Text=parte2[0].toUpperCase();
    var parte3=buscar_Match(/(?<=\/\d{2}\/)\d{4}/,inputFecha);
    var fecha_final=parte1+arrayFechas_Letras[parte2Text];
    return fecha_final;

}

var textoarea=document.getElementById("codigoRaiz");
var botonGenerar=document.getElementById("generar");
var input_aut=document.getElementById("input-aut");

var boton_copiar=document.getElementById("boton-copiar");
var contenedor_p=document.getElementById("contenedor");


function Generar(){
  boton_copiar.setAttribute("style","opacity:1;");
    var valor_Textoarea=textoarea.value;
    //limpieza de campos
    textoarea.value="";
    contenedor_p.innerText="";
    input_aut.innerText="";
    //limpieza de campos
   
    var numero_veces=valor_Textoarea.match(/(?<=Billete\/Ticket:\S{0,}\s{0,})\d{0,}|(?<=Nº\s{0,}Billete:\s{0,})\w{1,}(?=\s|\n)/g);
    var numero_veces_ran=numero_veces.length;
    var contadorCero=0;
    var contadorCero_tk=0;
    var conta_destino=1;
    for(var i=1; i<=numero_veces.length; i++){
      
      //creando los elementos en el DOM--inicio
      var etiquetaP=document.createElement("p");
      etiquetaP.setAttribute("onclick","copiar(this)");
     
      contenedor_p.appendChild(etiquetaP);
      var fechas=valor_Textoarea.match(/\d{2}\/\w{3}\.\/\d{4}|\d{2}\/\d{2}\/\d{4}\n/g);
      var fecsal=formatoFecha(fechas[contadorCero]);
      var CODLC=buscar_Match(/(?<=TREN:\D{0,}\s{0,})\w{1,}|(?<=Localizador:\s{0,})\w{1,}(?=\s)/,valor_Textoarea);
      

      var ciudad_Origen=valor_Textoarea.match(/(?<=Origen:\s{0,}\s{0}).*/g);
      var ciudad_Destino=valor_Textoarea.match(/(?<=Destino:\s{0,}\s{0}).*/g);
      var horas=valor_Textoarea.match(/\d{2}\:\d{2}(?=\n)/g);
      var numeros_de_tren=valor_Textoarea.match(/(?<=TARIFA\s.*\-\s)\d{1,}/g);
      var transporte=valor_Textoarea.match(/(?<=Destino:\s{0,}\s{0}.*\n)\w{1,}(?=\s\w{1,}\n)/g);  
      var coches=valor_Textoarea.match(/(?<=Coche:\s{0,})\d{1,}/g);
      var texto_oches=/\d{2}/.exec(coches[contadorCero_tk]);
      if(texto_oches===null){
        coches[contadorCero_tk]="000"+coches[contadorCero_tk];
      }else{
        coches[contadorCero_tk]="00"+coches[contadorCero_tk];
      }
      var plaza=valor_Textoarea.match(/(?<=Plaza:\s{0,})\d{1,}\w{1,}/g);
      var texto_plaza=/\d{2}/.exec(plaza[contadorCero_tk]);
      var total_totales=valor_Textoarea.match(/(?<=TOTAL\s{0,})(\d{1,}\,\d{0,}|\d{1,}\.\d{1,}\,\d{0,})/g);
      if(texto_plaza===null){
        plaza[contadorCero_tk]="0"+plaza[contadorCero_tk];
      }
      var clases=valor_Textoarea.match(/(?<=Destino:\s{0,}\s{0}.*\n\w{1,}\s)\w{1,}/g);
      var tar=valor_Textoarea.match(/(?<=TARIFA\s).*(?=\s\-)/g);
      
      var primersegmento="RU1AHK1XZJ "+fecsal +"*RENFE-LC:"+CODLC+" TK:"+numero_veces[contadorCero_tk]+ ", ORIG:"+ciudad_Origen[contadorCero_tk]+" "+horas[contadorCero]+", DEST:"+ciudad_Destino[contadorCero_tk]+" "+horas[conta_destino]+", TREN:"+numeros_de_tren[contadorCero_tk]+" "+transporte[contadorCero_tk]+" COCHE:"+coches[contadorCero_tk]+" PLZ:"+plaza[contadorCero_tk]+" C:"+clases[contadorCero_tk]+" TAR:"+tar[contadorCero_tk];
     
    // lineas secundarias
    //determinacion
       var forma_de_pago=/\d{1,}\*{1,}\d{1,}/.test(valor_Textoarea);
        var fp="";
        if(forma_de_pago===true){
          fp="CREDITCARD";
        }else{
          fp="CASH";
        }
       var lineastk="RM***RENFE LC:"+CODLC+",TK:"+numero_veces[contadorCero_tk]+",IMP:"+total_totales[contadorCero_tk]+",TASA:"+"0.00"+",GESTION:"+"0.00"+" FP:"+fp;

        if(numero_veces_ran >4){
          var etiqueta_Input=document.createElement("input");
          var etiqueta_div=document.createElement("div");
          etiqueta_div.setAttribute("style","display:flex;");
          var input_check=document.createElement("input");
          input_check.setAttribute("type", "checkbox");
          
          var idin="input"+i;
          var selectt="selectt"+i;
          input_check.setAttribute("data-id", idin);
          input_check.setAttribute("id", selectt);
          input_check.setAttribute("class", "tgl tgl-flip");
          input_check.setAttribute("onclick","seleccion(this)");
          //label--inicio
          var etiqietalabel=document.createElement("label");
          etiqietalabel.setAttribute("class","tgl-btn");
          etiqietalabel.setAttribute("data-tg-off","+");
          etiqietalabel.setAttribute("data-tg-on","-");
          etiqietalabel.setAttribute("for",selectt);
          //label--fin
          etiqueta_Input.setAttribute("id",idin);
          etiqueta_Input.value=lineastk;
          input_aut.appendChild(etiqueta_div);
          etiqueta_div.appendChild(etiqueta_Input);
          etiqueta_div.appendChild(input_check);
          etiqueta_div.appendChild(etiqietalabel);
        }else{
          var etiqueta_Input=document.createElement("input");
          
          
          var idin="input"+i;
         
  
          etiqueta_Input.setAttribute("id",idin);
          etiqueta_Input.value=lineastk;
          input_aut.appendChild(etiqueta_Input);
       
        }
      conta_destino=conta_destino+2;
      etiquetaP.innerText=primersegmento;
      contadorCero_tk++
      contadorCero=contadorCero+2;
       }
       if(numero_veces_ran >4){

        var ultima_1="RM *ACC"+CODLC;
        var ultima_2="RM*ACERNF-"+CODLC;
        var ultima_3="RM*PNR HAS PASSED ROBOTICS";
        var array=[ultima_1,ultima_2,ultima_3];
        for(var tres=0;tres<=2;tres++){
         var etiqueta_InputIN=document.createElement("input");
         var etiqueta_div_dos=document.createElement("div");
         var check_dos=document.createElement("input");
         check_dos.setAttribute("type", "checkbox");
         etiqueta_div_dos.setAttribute("style","display:flex");
         var idinIN="inputD"+tres;
         var idinINLA="labelD"+tres;
         check_dos.setAttribute("data-id", idinIN);
         check_dos.setAttribute("onclick","seleccion(this)");
           //-------------
           check_dos.setAttribute("id", idinINLA);
          check_dos.setAttribute("class", "tgl tgl-flip");
          check_dos.setAttribute("onclick","seleccion(this)");
          //label--inicio
          var etiqietalabel_dos=document.createElement("label");
          etiqietalabel_dos.setAttribute("class","tgl-btn");
          etiqietalabel_dos.setAttribute("data-tg-off","+");
          etiqietalabel_dos.setAttribute("data-tg-on","-");
          etiqietalabel_dos.setAttribute("for",idinINLA);
          //label--fin
           //------------ 



         etiqueta_InputIN.setAttribute("id",idinIN);
         etiqueta_InputIN.value=array[tres];
        etiqueta_div_dos.appendChild(etiqueta_InputIN);
        etiqueta_div_dos.appendChild(check_dos);
        input_aut.appendChild(etiqueta_div_dos);
        etiqueta_div_dos.appendChild(etiqietalabel_dos);
      }

       }else{
       var ultima_1="RM *ACC"+CODLC;
       var ultima_2="RM*ACERNF-"+CODLC;
       var ultima_3="RM*PNR HAS PASSED ROBOTICS";
       var array=[ultima_1,ultima_2,ultima_3];
       for(var tres=0;tres<=2;tres++){
        var etiqueta_InputIN=document.createElement("input");
        var idinIN="input"+tres;

        etiqueta_InputIN.setAttribute("id",idinIN);
        etiqueta_InputIN.value=array[tres];
        input_aut.appendChild(etiqueta_InputIN);
     }
    }

    

}

var campoCopiar=document.getElementById("campoCopiar");
var campoCopiar2=document.getElementById("campoCopiar2");

function copiado(){
  var numero_vecesC=document.getElementById("contenedor").getElementsByTagName("p").length;
  
  if(numero_vecesC <= 4){

  boton_copiar.setAttribute("class","");
  
campoCopiar.innerText="";
var contenedor_copia=document.getElementById("input-aut");
var hijos_input=contenedor_copia.getElementsByTagName("input").length;
  hijos_input=hijos_input-1;

for(var t=0; t<=hijos_input;t++){
  console.log(t);
  var hijos=document.getElementById("input-aut").getElementsByTagName("input").item(t).value;
  var tyu=hijos+"\n";
  tyu=creartexto(tyu);
  campoCopiar.appendChild(tyu);
}
campoCopiar.select();
document.execCommand("copy");
//campoCopiar.innerText="";

boton_copiar.setAttribute("class","animacionC");
  }else{
    campoCopiar.select();
document.execCommand("copy");
//campoCopiar.innerText="";
//campoCopiar.value="";
boton_copiar.setAttribute("class","animacionC");
  }

}
boton_copiar.addEventListener("click",copiado);

function copiar(element){
    element.setAttribute("class","");

    var textoElemento=creartexto(element.innerText);
    //campoCopiar.appendChild(textoElemento);
      campoCopiar2.value=element.innerText;
    campoCopiar2.select();
document.execCommand("copy");
campoCopiar2.innerText="";
element.setAttribute("class","animacionC");
setTimeout(()=>element.setAttribute("class",""),1000);
}



  

  
 
  


function seleccion(check){
  var id=check.dataset.id;
  var valor_input=document.getElementById(id).value;
  var numero=/(\d{6,}|ACC|ACERNF|PNR)/.exec(valor_input);
  numero=numero[0];
  var texro=campoCopiar.value;
  var reg=new RegExp(numero);
 
  var newString;
  var status=reg.test(texro);
 if(status===true){
  var regR=new RegExp(".*"+numero+".*\\n");
  var newString = texro.replace(regR, "");
  console.log(newString+"eli");
  campoCopiar.value=newString
  campoCopiar.innerHTML=newString
  
 }else{   
  console.log(campoCopiar.innerHTML+"input");
  valor_input=creartexto(valor_input+"\n");
  campoCopiar.appendChild(valor_input);
  campoCopiar.value=campoCopiar.innerHTML;
 }


}






