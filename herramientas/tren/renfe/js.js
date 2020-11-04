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

function boxs_RM(rm_0,rm_1,rm_2,rm_3,id,ulti){ //esta funcion creara los packs de rm que se pondrán copiar 
  var box_rm=document.createElement("div")
  box_rm.setAttribute("class","box_rm")
  var box_rm_inputs=document.createElement("div")
  box_rm_inputs.setAttribute("class","box_rm_inputs")
  box_rm_inputs.setAttribute("id","copiar"+id)
  var input_txt_0=document.createElement("input")
  input_txt_0.value=rm_0
  var input_txt_1=document.createElement("input")
  input_txt_1.value=rm_1
  
  var input_txt_2=document.createElement("input")
  input_txt_2.value=rm_2
  var input_txt_3=document.createElement("input")
  input_txt_3.value=rm_3
  if(rm_0!=undefined){box_rm_inputs.appendChild(input_txt_0)}
  if(rm_1!=undefined){box_rm_inputs.appendChild(input_txt_1)}
  if(rm_2!=undefined){box_rm_inputs.appendChild(input_txt_2)}
  if(rm_3!=undefined){box_rm_inputs.appendChild(input_txt_3)}
  //box_rm_inputs.appendChild(input_txt_1)
  //box_rm_inputs.appendChild(input_txt_2)
  //box_rm_inputs.appendChild(input_txt_3)
  var box_copiar=document.createElement("div")
 box_copiar.setAttribute("class","box_copiar")
 var input_copia=document.createElement("input")
  input_copia.setAttribute("value","COPIAR")
  input_copia.setAttribute("type","button")
  input_copia.setAttribute("class","button_copiar")
  if(ulti===true){
    input_copia.setAttribute("onclick","copiar_Button(this,true)")
  }else{
    input_copia.setAttribute("onclick","copiar_Button(this)")
    
  }
  
  input_copia.setAttribute("data-columns","copiar"+id)

box_copiar.appendChild(input_copia)

box_rm.appendChild(box_rm_inputs)
box_rm.appendChild(box_copiar)

input_aut.appendChild(box_rm);
}

function copiar_Button(element,ulti){
 
  if(!ulti){
    var numero_pasajero=prompt("INSERTE EL NUMERO DE PASAJERO")
    var numero_segmento=prompt("INSERTE EL NUMERO DE SEGMENTO")
    if(numero_pasajero===""||numero_segmento===""){
      alert("Es necesario un valor")
      return
    }
  }

var id=element.dataset.columns
var box_focus=document.getElementById(id)
var numero_de_inputs=box_focus.getElementsByTagName('input').length
var campo_parCopiar=document.createElement('textarea')
document.body.appendChild(campo_parCopiar)
for (let index = 0; index < numero_de_inputs; index++) {
  if(ulti){
    var valor_inputs=box_focus.getElementsByTagName('input').item(index).value
  }else{
    var valor_inputs=box_focus.getElementsByTagName('input').item(index).value+"/P"+numero_pasajero+"/S"+numero_segmento
  }
  
 var text_input=creartexto(valor_inputs+"\n")
 campo_parCopiar.appendChild(text_input)
}
campo_parCopiar.select();
document.execCommand("copy");
campo_parCopiar.remove()
element.setAttribute("class","animacionC_rm");
element.setAttribute("value","COPIADO");
setTimeout(()=>{element.setAttribute("class","button_copiar");element.setAttribute("value","COPIAR")},1500);
}

var textoarea=document.getElementById("codigoRaiz");
var botonGenerar=document.getElementById("generar");
var input_aut=document.getElementById("input-aut");

var boton_copiar=document.getElementById("boton-copiar");
var contenedor_p=document.getElementById("contenedor");


function Generar(){
  
    var valor_Textoarea=textoarea.value;
    //limpieza de campos
    textoarea.value="";
    contenedor_p.innerText="";
    input_aut.innerText="";
    //limpieza de campos
   
    var numero_veces=valor_Textoarea.match(/(?<=Billete\/Ticket:\S{0,}\s{0,})\d{0,}|(?<=Nº\s{0,}Billete:\s{0,})\w{1,}(?=\s|\n)/g);
    
    var rm_billete_tarifa=valor_Textoarea.match(/(?<=TARIFA.*\-\s)\d{0,6}\s\d{0,}\-.*\n.*/g);
    //limpiamos el array de RM
    var rm_lista_tarifa=rm_billete_tarifa.map((x)=>{
      var nuevo_valor=x.replace("€","")
      nuevo_valor="RM*RENFE-"+nuevo_valor
      return nuevo_valor
    })
    
    
    //var numero_veces_ran=numero_veces.length;

    // solucuion temporal ya que no sabemos si el formato seguira estos patrones en un futuro ////////////////////////--INICIO
    var haycoches=/(?<=Coche:\s{0,})\d{1,}/.test(valor_Textoarea)
    if(!haycoches||haycoches){
      
      for(let C=1; C<=numero_veces.length; C++){
        valor_Textoarea=valor_Textoarea+"\n Coche: 0 Plaza: 0D"
      }
  
    }
     // solucuion temporal ya que no sabemos si el formato seguira estos patrones en un futuro //////////////////////////--FIN
    var array_lista_RM=[]
    var array_lista_RM_largo=[]

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
      var transporte=valor_Textoarea.match(/(?<=Destino:.*\n)\w{1,}(?=\s\w{1,}.*\n)/g);  
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
      etiquetaP.innerText=primersegmento;
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
       
      
       
          var etiqueta_Input=document.createElement("input");
          
          
          var idin="input"+i;
         
  
          etiqueta_Input.setAttribute("id",idin);
          etiqueta_Input.value=lineastk
          array_lista_RM.push(lineastk)
          console.log(array_lista_RM)
          array_lista_RM_largo.push(rm_lista_tarifa[contadorCero_tk])
          console.log(array_lista_RM_largo)
         if(array_lista_RM.length===2){
            boxs_RM(array_lista_RM[0],array_lista_RM[1],array_lista_RM_largo[0],array_lista_RM_largo[1],contadorCero_tk)
            
            array_lista_RM=[]
            array_lista_RM_largo=[]
          }
         
        
      conta_destino=conta_destino+2;
     
      contadorCero_tk++
      contadorCero=contadorCero+2;
       }
   if(array_lista_RM.length===1){
     
    boxs_RM(array_lista_RM[0],array_lista_RM[1],array_lista_RM_largo[0],array_lista_RM_largo[1],contadorCero_tk,true)
    
    // input_aut.appendChild(etiqueta_Input);
    }

       
       var ultima_1="RM *ACC"+CODLC;
       var ultima_2="RM*ACERNF-"+CODLC;
       var ultima_3="RM*PNR HAS PASSED ROBOTICS";
       var TC=/((?<=T\.C\.\:\s{0,})\S.*)|(?<=TARIFA.*)Metálico/.exec(valor_Textoarea)
       if(TC[0]==="Metálico"){
        TC[0]="CASH"
       }
       var ultima_4="RM*RENFE FP:"+TC[0]
      
       var array=[ultima_1,ultima_2,ultima_3,ultima_4];
       
boxs_RM(ultima_1,ultima_2,ultima_3,ultima_4,"ulti",true)

    //   for(var n=0;n<=array.length-1;n++){
    //    var etiqueta_InputIN=document.createElement("input");
    //    var idinIN="input"+n;
//
    //    etiqueta_InputIN.setAttribute("id",idinIN);
    //    etiqueta_InputIN.value=array[n];
    // 
    //    input_aut.appendChild(etiqueta_InputIN);
    //}
//
    

}

//var campoCopiar=document.getElementById("campoCopiar");
var campoCopiar2=document.getElementById("campoCopiar2");

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



  

  
 
  







