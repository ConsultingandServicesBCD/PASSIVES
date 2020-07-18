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
var bton_copiar=document.getElementById("bton_copiar")
var array_hecho=[];//este array lo usaremos para guardar los rm listos para copiar, una vez se hayan tratado los formatos y demas
function Generar(){
  var valor_Textoarea=textoarea.value;
//Limpiar campos
  input_aut.innerHTML=""
  array_hecho=[]
  //PRIMER RM 
      var rm_pscpet_valor=buscar_Match(/C\d{10,}(?=\n)/,valor_Textoarea)
      var rm_pscpet_result="RM*PSCPETVIAJE-"+rm_pscpet_valor
        array_hecho.push(rm_pscpet_result)
  //SEGUNDO RM      
        var rm_acc_valor=buscar_Match(/(?<=C\d{5})\d{8}/,rm_pscpet_result) 
        var rm_acc_result="RM*ACC"+rm_acc_valor
        array_hecho.push(rm_acc_result)
   // TERCER RM 
       var rmy_tops_valor=buscar_Match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})/,valor_Textoarea) 
       var validador=buscar_Match(/\n[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})/,valor_Textoarea)
       //Los distintos correos 
       var rmy_tops_valora=valor_Textoarea.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})/g)
      if(validador!=undefined){
        if(rmy_tops_valora[1]!=undefined){
          if(rmy_tops_valora[0]!=rmy_tops_valora[1]){
            var rmy_tops_result =rmy_tops_valor.replace("@",".AT.")
            array_hecho.push("RMY/BKSP-"+rmy_tops_result)
            array_hecho.push("APE-"+rmy_tops_valor)
           }
        }
        
      }

       
    
   
   

      // CUARTO RM
   var rm_solicitud_valor=buscar_Match(/(?<=\W)\d{10}(?=\n)/,valor_Textoarea)
   var rm_solicitud_result="RM*ACECRM/SOLICITUD-"+rm_solicitud_valor;
   var rm_CC_result="RM*ACC"+rm_solicitud_valor;
      if(rm_solicitud_valor!=undefined){
        if(rm_solicitud_valor.length>0){
          array_hecho.push(rm_solicitud_result)
          array_hecho.push(rm_CC_result)
        }
      }
     
   // QUINTO RM
   var rm_proyecto_valor=buscar_Match(/(?<=PROYECTO\s)\S{0,}/,valor_Textoarea);   
   console.log(rm_proyecto_valor)
   var rm_proyecto_result="RM*ACECRM/PROYECTO-"+rm_proyecto_valor;
   if(rm_proyecto_valor!=undefined){
    if(rm_proyecto_valor.length>0){
      array_hecho.push(rm_proyecto_result)
    }
   }
  
   

  array_hecho.forEach(element=> {
    var et_p=document.createElement("p")
    et_p.innerText=element
    input_aut.appendChild(et_p)
  })
  
  //quitamos los valores null 

  

  bton_copiar.setAttribute("class","button_copiar")
  bton_copiar.setAttribute("onclick","copiar(this)")
  //Limpiar campos
  textoarea.value=""      
  //Limpiar campos
} 

//var campoCopiar=document.getElementById("campoCopiar");
var campoCopiar2=document.getElementById("campoCopiar2");

function copiar(element){
array_hecho.forEach(element =>{
  var texto=creartexto(element+"\n")
  campoCopiar2.appendChild(texto)})

    campoCopiar2.select();
document.execCommand("copy");
campoCopiar2.innerText="";
element.setAttribute("class","animacionC");
setTimeout(()=>element.setAttribute("class","button_copiar"),1000);
}



  

  
 
  







