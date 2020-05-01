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
        


var textoarea=document.getElementById("codigoRaiz");
var botonGenerar=document.getElementById("generar");

//destino de valores_segundo_segmento
var compania=document.getElementById("compa");
var numero_Vuelo=document.getElementById("Nvuelo");
var fecha_salida=document.getElementById("fechaS");
var ciudad_salida=document.getElementById("CiudaSa");
var ciudad_llegada=document.getElementById("ciudadlle");
var numero_Asiento=document.getElementById("Nasiento");
var hora_salida=document.getElementById("Hsalida");
var hora_llegada=document.getElementById("Hllegada");
var localizador=document.getElementById("Localizador");
var contenido_ruta=document.getElementById("contenido-ruta");
//detino de valores_segundo_segmento

var Importe_bruto=document.getElementById("ImporteB");
var tax=document.getElementById("Tax");
var indicar_pasajero=document.getElementById("IndicarPasajero");


//detino de valores_segundo_segmento
function generar(){
    // REINICIAMOS LOS CAMPOS CADA VEZ QUE GENERE UNO NUEVO 
    var nodobe=document.getElementById("Segmentosadd");
    nodobe.innerText="";
    var segmento_vuelo=document.getElementById("SegmentoV");
    segmento_vuelo.value="";
    var sobrecomision=document.getElementById("SobreComision");
    sobrecomision.value="";
// REINICIAMOS LOS CAMPOS CADA VEZ QUE GENERE UNO NUEVO 
    var valor_textoArea=textoarea.value;
    var numeros_vuelo=valor_textoArea.match(/(?<=Vuelo\s{0,}VY)\d{1,}|(?<=VY)\d{1,}/g);
    var numeros_de_billetes=valor_textoArea.match(/(?<=Ticket\sVueling\s\d{3})\d{1,}(?=\d)/g);
    var horas_vuelos=valor_textoArea.match(/(?<=\w{1,}\s{0,}\(.*\)\:\s{0,}(\w{1,}\s{0,}(\d{1,}|\w)\s{0,}|))\d{2}\:\d{2}|(?<=\w{1,}\s{0,}(\(\w{1,}\)\s{0,}\(.*\)\:\s{0,}))\d{1,}\:\d{2}|\n\d{2}\:\d{2}((?=h)|(?=))/g);
    var ciudades=valor_textoArea.match(/(?<=\w{1,}\s(\(\w{1,}\)\s\()).*\w{1,}?(?=\)\:)|(?<=\w{1,}\s\()\w{3,4}(?=\)\:)|\n{1}[A-Z]{3}\n/g);
    var fechas=valor_textoArea.match(/(?<=(Miércoles|Jueves|Viernes|Lunes|Martes|Sábado|Domingo)(\,|\s{0,})\s).*/g);
    console.log(numeros_vuelo);
    //EN ESTE CAMPO SE PONDRA EL TEXTO PARA COPIAR
    var texto_areaCopiar=document.getElementById("focus-copiar");
    texto_areaCopiar.value="";
    

    //EN ESTE CAMPO SE PONDRA EL TEXTO PARA COPIAR

    // ES SOLO IDA O IDA Y VUELTA ?
    var tabala_vuelta=document.getElementById("vuelta");
    var HayVuelta=/Vuelta|BasicVuelo\s{0,}2/.test(valor_textoArea);
    console.log(HayVuelta)
        if(HayVuelta===true){
            tabala_vuelta.setAttribute("style","display:inline-table");
        }else{
            tabala_vuelta.setAttribute("style","display:none");
        }
    // ES SOLO IDA O IDA Y VUELTA ?

 
    
    
                        ciudad_salida.innerText=ciudades[0];
                        

  
                                numero_Vuelo.innerText=numeros_vuelo[0];
                                valor_textoArea=valor_textoArea.replace(/(?<=Vuelo\s{0,}VY)\d{1,}/," ");  
                                //console.log(numero_Vuelo_V);
   
                                fecha_salida.innerText=fechas[0];
                                
                             
                                var localizador_v=buscar_Match(/(?<=\w{1,}\s{0,}\d{1,}(\:|)(\s{0,}|)\w{1,}\ó\w{1,}\s{0,}\w{1,}\s{0,}\w{1,}\:\s{0,})\w{1,}|(?<=Código de reserva).*/,valor_textoArea);
                                localizador.innerText=localizador_v;

 
    
    
                                ciudad_llegada.innerText=ciudades[1];
                                

   //console.log(ciudad_llegada_VS);
                                hora_salida.innerText=horas_vuelos[0];
                               
                              
                                
                                
                                    hora_llegada.innerText=horas_vuelos[1];
                                   
                                
                                    
                                    
    
    var Importe_bruto_v=buscar_Match(/((?<=Precio total:\s)|((?<=Total:\s)))\d{1,}\,\d{1,}/,valor_textoArea);
                                        Importe_bruto_v=Importe_bruto_v.replace(",",".");
                                        var im=parseFloat(Importe_bruto_v);
                                       
                                        var Importe_bruto_final=im/numeros_de_billetes.length;
                                        var Importe_bruto_final_f=Importe_bruto_final.toFixed(2);
                                        Importe_bruto.innerText=Importe_bruto_final_f;
    var tax_v=buscar_Match(/(?<=Tasas\s)\d{1,}\,\d{1,}|(?<=Tasas)\d{1,}\,\d{1,}/,valor_textoArea);
                                            tax_v=tax_v.replace(",",".");
                                            var imTasas=parseFloat(tax_v);
                                      
                                        var tax_v_final=imTasas/numeros_de_billetes.length;
                                            tax.innerText=tax_v_final.toFixed(2);
    numero_Asiento.innerText=numeros_de_billetes.length;
       
//TODO CREAMOS FORMATOS VALIDOS PARA CREAR LA LINEAS QUE SE COMPIRARAN 
                                //?FECHAS ASOCIATIVAS--INICIO
                                var array_fechas=[];
                                array_fechas["ENERO"]="JAN";
                                array_fechas["FEBRERO"]="FEB";
                                array_fechas["MARZO"]="MAR";
                                array_fechas["ABRIL"]="APR";
                                array_fechas["MAYO"]="MAY";
                                array_fechas["JUNIO"]="JUN";
                                array_fechas["JULIO"]="JUL";
                                array_fechas["AGOSTO"]="AUG";
                                array_fechas["SEPTIEMBRE"]="SEP";
                                array_fechas["OCTUBRE"]="OCT";
                                array_fechas["NOVIEMBRE"]="NOV";
                                array_fechas["DICIEMBRE"]="DEC";
                               
                                var fecha_Mes=/(?<=(\d\d|\d)\s)\w{1,}/.exec(fechas[0]);
                                var fecha_numero=/(?<=\w{0,}\,\s{0,})\d{1,}|(?<=)\d{1,}/.exec(fechas[0]);
                                if(fecha_numero[0].length<=1){
                                  fecha_numero[0]="0"+fecha_numero[0];
                                }
                                
                                var dec=fecha_Mes[0].toUpperCase();
                                //?FECHAS ASOCIATIVAS --FIN  

                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--INICIO

                                ciudades[0]=ciudades[0].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudades[0]=ciudades[0].replace(/\n{0,}$/,"");
                                ciudades[1]=ciudades[1].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudades[1]=ciudades[1].replace(/\n{0,}$/,"");
                                console.log(ciudades[1]);
                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--FIN

                                //?FORMATO DE HORA (QUITAR  ":" )--INICIO
                                horas_vuelos[0]=horas_vuelos[0].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[0]=horas_vuelos[0].replace(/\n{0,}$/,"");
                                horas_vuelos[1]=horas_vuelos[1].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[1]=horas_vuelos[1].replace(/\n{0,}$/,"");
                                horas_vuelos[0]=horas_vuelos[0].replace(/\:/,"");
                                horas_vuelos[1]=horas_vuelos[1].replace(/\:/,"");
                                //?FORMATO DE HORA (QUITAR  ":" )--FIN
                                    
                                    
                                
   var LineaIda="SSVY"+numeros_vuelo[0]+"Y"+fecha_numero[0]+array_fechas[dec]+ciudades[0]+ciudades[1]+"GK"+ numero_Asiento.innerText+"/"+horas_vuelos[0]+horas_vuelos[1]+"/"+localizador_v;
   console.log(LineaIda);

//TODO CREAMOS FORMATOS VALIDOS PARA CREAR LA LINEAS QUE SE COMPIRARAN 
   
   if(HayVuelta===true){

    
    

//------------------------------------------------------------VUEELTA-------------------------------------------------------------------
//------------------------------------------------------------VUEELTA-------------------------------------------------------------------
//------------------------------------------------------------VUEELTA-------------------------------------------------------------------
var compania_vuelta=document.getElementById("compa_vuelta");
var numero_Vuelo_vuelta=document.getElementById("Nvuelo_vuelta");
var fecha_salida_vuelta=document.getElementById("fechaS_vuelta");
var ciudad_salida_vuelta=document.getElementById("CiudaSa_vuelta");
var ciudad_llegada_vuelta=document.getElementById("ciudadlle_vuelta");
var numero_Asiento_vuelta=document.getElementById("Nasiento_vuelta");
var hora_salida_vuelta=document.getElementById("Hsalida_vuelta");
var hora_llegada_vuelta=document.getElementById("Hllegada_vuelta");
var localizador_vuelta=document.getElementById("Localizador_vuelta");


// asignacion de datos 


                                        numero_Vuelo_vuelta.innerText=numeros_vuelo[1];



                                        fecha_salida_vuelta.innerText=fechas[1];
                                      
                                


                                        ciudad_salida_vuelta.innerText=ciudades[2];
                                       

                                        ciudad_llegada_vuelta.innerText=ciudades[3];
                                        

                                        hora_salida_vuelta.innerText=horas_vuelos[2];
                                        
                           
                                       


                                            hora_llegada_vuelta.innerText=horas_vuelos[3];
                                           


                                            localizador_vuelta.innerText=localizador_v;

                                          numero_Asiento_vuelta.innerText=numeros_de_billetes.length;

//TODO CREAMOS FORMATOS VALIDOS PARA CREAR LA LINEAS QUE SE COMPIRARAN----------------------------VUELTA---------------------------------
                                //?FECHAS ASOCIATIVAS--INICIO
                                var array_fechas_Vuelta=[];
                                array_fechas_Vuelta["ENERO"]="JAN";
                                array_fechas_Vuelta["FEBRERO"]="FEB";
                                array_fechas_Vuelta["MARZO"]="MAR";
                                array_fechas_Vuelta["ABRIL"]="APR";
                                array_fechas_Vuelta["MAYO"]="MAY";
                                array_fechas_Vuelta["JUNIO"]="JUN";
                                array_fechas_Vuelta["JULIO"]="JUL";
                                array_fechas_Vuelta["AGOSTO"]="AUG";
                                array_fechas_Vuelta["SEPTIEMBRE"]="SEP";
                                array_fechas_Vuelta["OCTUBRE"]="OCT";
                                array_fechas_Vuelta["NOVIEMBRE"]="NOV";
                                array_fechas_Vuelta["DICIEMBRE"]="DEC";
                               
                                 fecha_Mes=/(?<=(\d\d|\d)\s)\w{1,}/.exec(fechas[1]);
                                 
                                 fecha_numero=/(?<=\w{0,}\,\s{0,})\d{1,}|(?<=)\d{1,}/.exec(fechas[1]);
                                if(fecha_numero[0].length<=1){
                                   
                                  fecha_numero[0]="0"+fecha_numero[0];
                                }
                                
                                var dec=fecha_Mes[0].toUpperCase();
                                //?FECHAS ASOCIATIVAS --FIN  

                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--INICIO

                                ciudades[2]=ciudades[2].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudades[2]=ciudades[2].replace(/\n{0,}$/,"");
                                ciudades[3]=ciudades[3].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudades[3]=ciudades[3].replace(/\n{0,}$/,"");
                                console.log(ciudades[1]);
                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--FIN

                                //?FORMATO DE HORA (QUITAR  ":" )--INICIO
                                horas_vuelos[2]=horas_vuelos[2].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[2]=horas_vuelos[2].replace(/\n{0,}$/,"");
                                horas_vuelos[3]=horas_vuelos[3].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[3]=horas_vuelos[3].replace(/\n{0,}$/,"");
                                horas_vuelos[2]=horas_vuelos[2].replace(/\:/,"");
                                horas_vuelos[3]=horas_vuelos[3].replace(/\:/,"");
                                //?FORMATO DE HORA (QUITAR  ":" )--FIN
                                    
                                    
                                
   var LineaVuelta="SSVY"+numeros_vuelo[1]+"Y"+fecha_numero[0]+array_fechas_Vuelta[dec]+ciudades[2]+ciudades[3]+"GK"+ numero_Asiento.innerText+"/"+horas_vuelos[2]+horas_vuelos[3]+"/"+localizador_v;
   console.log(LineaVuelta);

//TODO CREAMOS FORMATOS VALIDOS PARA CREAR LA LINEAS QUE SE COMPIRARAN----------------------------VUELTA---------------------------------
   

//var LineaVuelta="SSVY"+numero_Vuelo_vuelta_V+"Y"+fecha_corta_sin_vuelta+ciudad_salida_vuelta_V+ciudad_llegada_vuelta_V+"GK"+ numero_Asiento_vuelta.innerText+"/"+"/"+localizador_v;

var lineas_Copiar=LineaIda + '\n' + LineaVuelta;
//texto_areaCopiar.value=lineas_Copiar;

}else{
texto_areaCopiar.value=LineaIda;
}

var botonCopiars=document.getElementById("BtnIdaVuelta");
var focus_copiar=document.getElementById("focus-copiar");
function copiar_lineas(){
    focus_copiar.innerText="";
    botonCopiars.setAttribute("class","animacionC");
    if(HayVuelta===true){
        texto_areaCopiar.value=lineas_Copiar;
    }else{
        texto_areaCopiar.value=LineaIda;
    }

focus_copiar.select();
document.execCommand("copy");
function remuveClass(){
    botonCopiars.setAttribute("class","generar");
}
setTimeout(remuveClass,1500);

}

botonCopiars.addEventListener("click",copiar_lineas);



//---------------------------------------------------------------------------------------copiado del segundo segmento --------------------------------------------------------------------//



var textoAreaAUX=document.getElementById("copiadodos");

var inicionumero=-1;
for(var i=1; i<=numeros_de_billetes.length;i++){
    inicionumero++
    
    //creamos el id de los input
    var idinput="numerobillete"+i;
    //creamos el id de los input
    //creamos los nodos
    
    var etiquetaTR=document.createElement("tr");
    var etiquetaTDT=document.createElement("td");
    var tituloBillete=document.createTextNode("Nº de Billete "+i);
    etiquetaTDT.appendChild(tituloBillete);
    etiquetaTR.appendChild(etiquetaTDT);
    var etiquetaTDI=document.createElement("td");
    etiquetaTR.appendChild(etiquetaTDI);
    var etiquetaIN=document.createElement("input");  
    etiquetaIN.setAttribute("id",idinput);
    etiquetaIN.setAttribute("class","SegmentoV");
    etiquetaTDI.appendChild(etiquetaIN);
    //creamos los nodos
    
    //asignamos el valor
    etiquetaIN.value=numeros_de_billetes[inicionumero];
    //asignamos el valor
 
 
    
    



    
    nodobe.appendChild(etiquetaTR);

}

console.log(textoAreaAUX.value);
                                
 //añadiendo el segmento a los nuemeros de billetes 



function obtenervalor(){
    if(segmento_vuelo.value!=""){
        segmento_vuelo.setAttribute("style","");
   
    var valorSegmentoV=segmento_vuelo.value;
    var cp1=-1;
    var cp0=0;
 for(var cp=1; cp<=nodobe.childNodes.length;cp++){
     console.log(nodobe.childNodes.length);
   //para id
    cp0++
   //para id

   //para arry
    cp1++
   //para arry
        var idname="numerobillete"+cp0;
        var inputId=document.getElementById(idname);
        var inputV=inputId.value;
       
   //var inputT=document.createTextNode();
if(nodobe.childNodes.length>1){
    inputId.value="";
   inputId.value=numeros_de_billetes[cp1]+"/s"+valorSegmentoV+"/p";
}else{
    inputId.value=numeros_de_billetes[cp1]+"/s"+valorSegmentoV;
}
    
}     

       

 }
}


segmento_vuelo.addEventListener("focusout",obtenervalor);
 
//añadiendo el segmento a los nuemeros de billetes                                    

//segmento_vuelo
//Importe_bruto
//tax=document
//numero_Billete
//indicar_pasajero
//sobrecomision


var copiarSegmentodos=document.getElementById("segmentodos");


    
"RM*ACC"
"RM*ACEMPN-"
"RM*ACEMPA-030"
"RM*ACESAL-"
"RM*ACEMPT-"
//var rmacetkt="RM*ACETKT-"+numero_Billete_v+laS+segmento_vuelo_V+"/p"+'\n'+"RM*ACETKT-"+numero_Billete_v+laS+segmento_vuelo_V;
"RM*ACETKT-"

    

function copiarSegmentodoss(){
    var verifi=document.getElementById("numerobillete1");
var verifiN=verifi.value.length;

if(segmento_vuelo.value!=""){
    segmento_vuelo.setAttribute("style","");
    textoAreaAUX.innerText="";
    
    copiarSegmentodos.setAttribute("class","animacionC");
    
    var campoCopiar=document.getElementById("focus-copiar");
   
    var laN='\n';
   var rmacc="RM*ACC"+localizador_v+"/s"+segmento_vuelo.value;
   var rmacempn="RM*ACEMPN-"+localizador_v+"/s"+segmento_vuelo.value;
   var rmacempa="RM*ACEMPA-030/s"+segmento_vuelo.value;
   var rmacesal="RM*ACESAL-"+Importe_bruto_final_f+"/s"+segmento_vuelo.value;
   var rmacempt="RM*ACEMPT-"+tax_v+"/s"+segmento_vuelo.value;
   var plds=rmacc+laN+rmacempn+laN+rmacempa+laN+rmacesal+laN+rmacempt+laN;
   var primerasLineasSegmento=document.createTextNode(plds);
   textoAreaAUX.appendChild(primerasLineasSegmento);

    var cp1=-1;
    var cp0=0;
 for(var cp=1; cp<=nodobe.childNodes.length;cp++){
   //para id 
    cp0++
    //para id 

    //para arry
    cp1++
   //para arry
        var idname="numerobillete"+cp0;
        var inputId=document.getElementById(idname);
        var inputV=inputId.value;
        
      var ttt=document.createTextNode("RM*ACETKT-"+inputV+'\n');
      textoAreaAUX.appendChild(ttt);
       

 }
 
 var rmacecom="RM*ACECOM-00.00"+"/s"+segmento_vuelo.value;
 var pscscom="RM*PSCSCOM-"+sobrecomision.value+"/s"+segmento_vuelo.value;

    var rmacelctb="RM*ACELCTB-ETN/s"+segmento_vuelo.value;
    var rmacesup=  "RM*ACESUP-030/s"+segmento_vuelo.value;
   
  
   
   
 if(sobrecomision.value!=""){
    slds=pscscom+laN+rmacecom+laN+rmacelctb+laN+rmacesup;
 }else{
    slds=rmacelctb+laN+rmacesup;
 }
 

 var segundasLineasSegmento=creartexto(slds);
 textoAreaAUX.appendChild(segundasLineasSegmento);


 textoAreaAUX.select();
document.execCommand("copy");
function remuveClassA(){
   copiarSegmentodos.setAttribute("class","generar");
}
setTimeout(remuveClassA,1500);
}else{
    segmento_vuelo.setAttribute("style","border:solid red;");
}

  
}

copiarSegmentodos.addEventListener("click",copiarSegmentodoss);

textoarea.value="";

}
 

botonGenerar.addEventListener("click",generar);

