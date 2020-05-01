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
var numero_p_focus_ida=document.getElementById("numero_p_ida");
var numero_p_focus_vuelta=document.getElementById("numero_p_vuelta");
var fpcc=document.getElementById("FPCC")

//detino de valores_segundo_segmento

var Importe_bruto=document.getElementById("ImporteB");
var rmpscref=document.getElementById("PSCRV");
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
    var numeros_vuelo=valor_textoArea.match(/FR\d{1,}(?=\n)/g);
    
    var horas_vuelos=valor_textoArea.match(/(?<=\w{1,}\s{0,}\-\s{0,})\d{2}\:\d{2}\n/g);
    var input_ciudad=valor_textoArea.match(/(?<=Llegada.*\n).*/g)
   
    var ciudad_ida=input_ciudad[0].match(/(?<=\()\w{1,4}[A-Za-z](?=\))/g);
    console.log(ciudad_ida)
    
    var fechas=valor_textoArea.match(/\d{2}\/\d{2}\/\d{4}/g);
    var Numero_pasajeros=valor_textoArea.match(/(Sr|Sra)(?=\s{0}(\.|))/g);
    
    console.log(ciudad_ida);
    //EN ESTE CAMPO SE PONDRA EL TEXTO PARA COPIAR
    var texto_areaCopiar=document.getElementById("focus-copiar");
    texto_areaCopiar.value="";
     

    //EN ESTE CAMPO SE PONDRA EL TEXTO PARA COPIAR

    // ES SOLO IDA O IDA Y VUELTA ?
    var tabala_vuelta=document.getElementById("vuelta");
    var numero_salidas=valor_textoArea.match(/Salida/g);
    var n_veces=numero_salidas.length;
    console.log(numero_salidas.length);
    console.log(Numero_pasajeros.length);
    
        if(n_veces===2){
            tabala_vuelta.setAttribute("style","display:inline-table");
        }else{
            tabala_vuelta.setAttribute("style","display:none");
        }
    // ES SOLO IDA O IDA Y VUELTA ?

 
    
    
                        ciudad_salida.innerText=ciudad_ida[0];
                        

  
                                numero_Vuelo.innerText=numeros_vuelo[0];
                                
                                //console.log(numero_Vuelo_V);
   
                                fecha_salida.innerText=fechas[0];
                                
                             
                                var localizador_v=buscar_Match(/(?<=Número de reserva\:\n).*/,valor_textoArea);
                                localizador.innerText=localizador_v;

 
    
    
                                ciudad_llegada.innerText=ciudad_ida[1];
                                
                                numero_p_focus_ida.innerText=Numero_pasajeros.length;
   //console.log(ciudad_llegada_VS);
                                hora_salida.innerText=horas_vuelos[0];
                               
                              
                                
                                
                                    hora_llegada.innerText=horas_vuelos[1];
                                   
                                
                                    
                                    
    
    var Importe_bruto_v=buscar_Match(/(?<=Recibo\:\n.*\n)\d{1,}\.\d{1,}(?=\s{0,}\w{1,}\n)/,valor_textoArea);
                                        Importe_bruto_v=Importe_bruto_v.replace(",",".");
                                        var im=parseFloat(Importe_bruto_v);
                                       
                                       
                                        Importe_bruto.innerText=im;
    
  
       
//TODO CREAMOS FORMATOS VALIDOS PARA CREAR LA LINEAS QUE SE COMPIRARAN 
                                //?FECHAS ASOCIATIVAS--INICIO
                                var array_fechas=[];
                                array_fechas["01"]="JAN";
                                array_fechas["02"]="FEB";
                                array_fechas["03"]="MAR";
                                array_fechas["04"]="APR";
                                array_fechas["05"]="MAY";
                                array_fechas["06"]="JUN";
                                array_fechas["07"]="JUL";
                                array_fechas["08"]="AUG";
                                array_fechas["09"]="SEP";
                                array_fechas["10"]="OCT";
                                array_fechas["11"]="NOV";
                                array_fechas["12"]="DEC";
                               
                                var fecha_Mes=/(?<=\d{2}\/)\d{2}(?=\/\d{4})/.exec(fechas[0]);
                                var fecha_numero=/\d{2}(?=\/\d{2}\/\d{4})/.exec(fechas[0]);
                                if(fecha_numero[0].length<=1){
                                  fecha_numero[0]="0"+fecha_numero[0];
                                }
                                
                                //var dec=fecha_Mes[0].toUpperCase();
                                //?FECHAS ASOCIATIVAS --FIN  

                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--INICIO

                                ciudad_ida[0]=ciudad_ida[0].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudad_ida[0]=ciudad_ida[0].replace(/\n{0,}$/,"");
                                ciudad_ida[1]=ciudad_ida[1].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudad_ida[1]=ciudad_ida[1].replace(/\n{0,}$/,"");
                             
                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--FIN

                                //?FORMATO DE HORA (QUITAR  ":" )--INICIO
                                horas_vuelos[0]=horas_vuelos[0].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[0]=horas_vuelos[0].replace(/\n{0,}$/,"");
                                horas_vuelos[1]=horas_vuelos[1].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[1]=horas_vuelos[1].replace(/\n{0,}$/,"");
                                horas_vuelos[0]=horas_vuelos[0].replace(/\:/,"");
                                horas_vuelos[1]=horas_vuelos[1].replace(/\:/,"");
                                //?FORMATO DE HORA (QUITAR  ":" )--FIN
                                    
                                    
                                
   var LineaIda="SS"+numeros_vuelo[0]+"Y"+fecha_numero[0]+array_fechas[fecha_Mes[0]]+ciudad_ida[0]+ciudad_ida[1]+"GK"+Numero_pasajeros.length+"/"+horas_vuelos[0]+horas_vuelos[1]+"/"+localizador_v;//GK numero de pasajeros (entre ciudad_ida y  /)
   console.log(LineaIda);
   console.log(numeros_vuelo[0]);

//TODO CREAMOS FORMATOS VALIDOS PARA CREAR LA LINEAS QUE SE COMPIRARAN 
   
   if(n_veces===2){

    
    

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

var ciudad_vuelta=input_ciudad[1].match(/(?<=\()\w{1,4}[A-Za-z](?=\))/g);

// asignacion de datos 


                                        numero_Vuelo_vuelta.innerText=numeros_vuelo[1];



                                        fecha_salida_vuelta.innerText=fechas[1];
                                      
                                


                                        ciudad_salida_vuelta.innerText=ciudad_vuelta[0];
                                       

                                        ciudad_llegada_vuelta.innerText=ciudad_vuelta[1];
                                        
                                        numero_p_focus_vuelta.innerText=Numero_pasajeros.length;

                                        hora_salida_vuelta.innerText=horas_vuelos[2];
                                        
                           
                                       


                                            hora_llegada_vuelta.innerText=horas_vuelos[3];
                                           


                                            localizador_vuelta.innerText=localizador_v;

                                         

//TODO CREAMOS FORMATOS VALIDOS PARA CREAR LA LINEAS QUE SE COMPIRARAN----------------------------VUELTA---------------------------------
                                //?FECHAS ASOCIATIVAS--INICIO
                                var array_fechas_Vuelta=[];
                                array_fechas_Vuelta["01"]="JAN";
                                array_fechas_Vuelta["02"]="FEB";
                                array_fechas_Vuelta["03"]="MAR";
                                array_fechas_Vuelta["04"]="APR";
                                array_fechas_Vuelta["05"]="MAY";
                                array_fechas_Vuelta["06"]="JUN";
                                array_fechas_Vuelta["07"]="JUL";
                                array_fechas_Vuelta["08"]="AUG";
                                array_fechas_Vuelta["09"]="SEP";
                                array_fechas_Vuelta["10"]="OCT";
                                array_fechas_Vuelta["11"]="NOV";
                                array_fechas_Vuelta["12"]="DEC";
                               
                                 fecha_Mes=/(?<=\d{2}\/)\d{2}(?=\/\d{4})/.exec(fechas[1]);
                                 
                                 fecha_numero=/\d{2}(?=\/\d{2}\/\d{4})/.exec(fechas[1]);
                                if(fecha_numero[0].length<=1){
                                   
                                  fecha_numero[0]="0"+fecha_numero[0];
                                }
                                
                                //var dec=fecha_Mes[0].toUpperCase();
                                //?FECHAS ASOCIATIVAS --FIN  

                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--INICIO
                              
                                ciudad_vuelta[0]=ciudad_vuelta[0].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudad_vuelta[0]=ciudad_vuelta[0].replace(/\n{0,}$/,"");
                                ciudad_vuelta[1]=ciudad_vuelta[1].replace(/^\n{0,}|\n{0,}$/,"");
                                ciudad_vuelta[1]=ciudad_vuelta[1].replace(/\n{0,}$/,"");
                                
                                //?TRATANDO LAS CIUDADES (QUITAR ESPACIOS)--FIN

                                //?FORMATO DE HORA (QUITAR  ":" )--INICIO
                                horas_vuelos[2]=horas_vuelos[2].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[2]=horas_vuelos[2].replace(/\n{0,}$/,"");
                                horas_vuelos[3]=horas_vuelos[3].replace(/^\n{0,}|\n{0,}$/,"");
                                horas_vuelos[3]=horas_vuelos[3].replace(/\n{0,}$/,"");
                                horas_vuelos[2]=horas_vuelos[2].replace(/\:/,"");
                                horas_vuelos[3]=horas_vuelos[3].replace(/\:/,"");
                                //?FORMATO DE HORA (QUITAR  ":" )--FIN
                                    
                                    
                                
   var LineaVuelta="SS"+numeros_vuelo[1]+"Y"+fecha_numero[0]+array_fechas_Vuelta[fecha_Mes[0]]+ciudad_vuelta[0]+ciudad_vuelta[1]+"GK"+Numero_pasajeros.length+"/"+horas_vuelos[2]+horas_vuelos[3]+"/"+localizador_v;
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
    if(n_veces===2){
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



//TODO---------------------------------------------------------------------------------------copiado del segundo segmento --------------------------------------------------------------------//



var textoAreaAUX=document.getElementById("copiadodos");

   
 //añadiendo el segmento a los nuemeros de billetes 



                                                                              



 
//añadiendo el segmento a los nuemeros de billetes                                    

//segmento_vuelo
//Importe_bruto
//tax=document
//numero_Billete
//indicar_pasajero
//sobrecomision


var copiarSegmentodos=document.getElementById("segmentodos");


    
//"RM*ACC"
//"RM*ACEMPN-"
//"RM*ACEMPA-FR"
//"RM*ACESAL-"
//"RM*ACEMPT-"
////var rmacetkt="RM*ACETKT-"+numero_Billete_v+laS+segmento_vuelo_V+"/p"+'\n'+"RM*ACETKT-"+numero_Billete_v+laS+segmento_vuelo_V;
//"RM*ACETKT-"
//
    

function copiarSegmentodoss(){
    var array_campos=[]

if(segmento_vuelo.value!=""){
    segmento_vuelo.setAttribute("style","");
    textoAreaAUX.innerText="";
    
    copiarSegmentodos.setAttribute("class","animacionC");

   
   var laN='\n';
   var rmacc="RM*ACC"+localizador_v+"/s"+segmento_vuelo.value;
   var rmacempn="RM*ACEMPN-"+localizador_v+"/s"+segmento_vuelo.value;
   var rmacempa="RM*ACEMPA-FR/s"+segmento_vuelo.value;
   var rmacevo="RM*ACELVO-HO/s"+segmento_vuelo.value;
   var rmacesal="RM*ACESAL-"+im+"/s"+segmento_vuelo.value;
   //var rmacempt="RM*ACEMPT-"+tax_v+"/s"+segmento_vuelo.value;
   var plds=rmacc+laN+rmacempn+laN+rmacempa+laN+rmacesal+laN;
   var primerasLineasSegmento=document.createTextNode(plds);
   textoAreaAUX.appendChild(primerasLineasSegmento);
    
    
var rmacecom="RM*ACECOM-00.00"+"/s"+segmento_vuelo.value;
var pscscom="RM*PSCSCOM-"+sobrecomision.value+"/s"+segmento_vuelo.value;
//var rmacelctb="RM*ACELCTB-BTI/s"+segmento_vuelo.value;
var rmacesup=  "RM*ACESUP-FR/s"+segmento_vuelo.value;
var rmpscref_texto="RM*PSCREF-"+rmpscref.value+"/s"+segmento_vuelo.value;  
var fpcc_texto="FPCC"+fpcc.value; 
var acempt ="RM*ACEMPT-00.00/s"+segmento_vuelo.value;
var acecom = "RM*ACECOM-00.00/s"+segmento_vuelo.value;

if(rmpscref.value===""){
    rmpscref_texto=""
} 

    if(fpcc.value===""){
        fpcc_texto=""
    } 

rmpscref_texto=rmpscref_texto.toUpperCase()
   
   
 if(sobrecomision.value!=""){
    slds=pscscom+laN+rmacecom+laN+rmacesup+laN+rmacevo+laN+rmpscref_texto+laN+fpcc_texto+laN+acempt+laN+acecom;
 }else{
    slds=rmacesup+laN+rmpscref_texto+laN+rmacevo+laN+fpcc_texto+laN+acempt+laN+acecom;
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

