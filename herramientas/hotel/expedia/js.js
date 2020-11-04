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
            function limpiar(data){
                var signos=["-","*","_"]
                var signos_rango=signos.length;
                var signos_macht=/(\-)/.test(data);
                if(signos_macht){
                    var nuevo_dato=data.replace(/(\-)/g," ");
                    return nuevo_dato;
                }else{
                    return data;
                }
                   
        
               
            }
            function copiar(element) {
                element.setAttribute("class","animacionC");
               var destinocp=document.getElementById("respuestaD");
                var zonaCP=document.createElement("textarea");
                destinocp.appendChild(zonaCP);
                zonaCP.value=element.innerText;
                zonaCP.select();
            document.execCommand("copy");
            zonaCP.remove();
            
            setTimeout(()=>{element.setAttribute("class","respuesta");},1000);
            
            }
          //  /\d{2}\w{3}\-\d{2}\w{3}/
function numeronoches(fechaData,numerodeP,total){

            var array_fechas=[];
            array_fechas["JAN"]="01";
            array_fechas["FEB"]="02";
            array_fechas["MAR"]="03";
            array_fechas["APR"]="04";
            array_fechas["MAY"]="05";
            array_fechas["JUN"]="06";
            array_fechas["JUL"]="07";
            array_fechas["AUG"]="08";
            array_fechas["SEP"]="09";
            array_fechas["OCT"]="10";
            array_fechas["NOV"]="11";
            array_fechas["DEC"]="12";
   
    var fechaYEAR=new	Date().getFullYear();

    var fechasNumeros=fechaData.match(/\d{2}(?=\w{3})/g);
    var fechasLetras=fechaData.match(/(?<=\d{2})\w{3}/g);
  var op1=array_fechas[fechasLetras[0]]+"/"+fechasNumeros[0]+"/"+fechaYEAR;

    //?FECHAS ASOCIATIVAS--INICIO
    
    
    var fecha2 =array_fechas[fechasLetras[0]]+"/"+fechasNumeros[0]+"/"+fechaYEAR;
var fecha1 = array_fechas[fechasLetras[1]]+"/"+fechasNumeros[1]+"/"+fechaYEAR;
var diferencia =  Math.floor(( Date.parse(fecha1) - Date.parse(fecha2) ) / 86400000);
console.log(fecha1,fecha2);

if(diferencia < 0){
diferencia = diferencia*(-1);

}
console.log( "numero de  noches "+ diferencia );
numerodeP=parseInt(numerodeP);
var total_Deverdad=(total/numerodeP)/diferencia;
console.log(total_Deverdad);
return total_Deverdad

}



var textoarea=document.getElementById("codigoRaiz");
var botonGenerar=document.getElementById("generar");
var respuesta=document.getElementById("respuesta");
var respuestaD=document.getElementById("respuestaD");
var detino_id=document.getElementById("ciudad");
var tipoHabitacion_id=document.getElementById("THabitacion");
var copiarSegmento=document.getElementById("copiarSegmento");
var copiarSegmento_dos=document.getElementById("copiarSegmento_dos");
var areacopiar=document.getElementById("copiarArea");
function generar(){
    if(detino_id.value!=""&tipoHabitacion_id.value!=""){
        detino_id.setAttribute("style","    border: #0a0a0a solid 2px;");
    tipoHabitacion_id.setAttribute("style"," border: #0a0a0a solid 2px;");
    
    var valor_textoArea=textoarea.value;
    var inicioL="HU1AHK";
    //TODO PRIMER SEGMENTO-INICIO//
    var detino=document.getElementById("ciudad").value;
    var fecha_en_sal=buscar_Match(/(?<=HU1AHK\d{1,}\w{1,3})\d{1,}\w{1,}\-\d{1,}\w{1,}/,valor_textoArea);
    var observaciones="/SI-EXPEDIA";
    var nombreHotel=buscar_Match(/(?<=HN-).*(?=\/HC)/,valor_textoArea);
    var direccion_one=buscar_Match(/(?<=AD-).*(?=\/PH)/,valor_textoArea);
    
    
    var direccion_two=buscar_Match(/(?<=HC-).*(?=\/AD)/,valor_textoArea);
   
   
    var telefono=buscar_Match(/(?<=PH-).*(?=\/RT)/,valor_textoArea);
    
    console.log(direccion_one,telefono);
    var tipoHabitacion=document.getElementById("THabitacion").value;
    var confirmacion=buscar_Match(/(?<=CF-).*(?=\/RQ)/,valor_textoArea);
    var tarifa=buscar_Match(/(?<=RQ-).*/,valor_textoArea);
   
   
    var rangoFechas=buscar_Match(/\d{2}\w{3}\-\d{2}\w{3}/,valor_textoArea);
    var numeroP=buscar_Match(/(?<=^\w{6})\d{0,}/,valor_textoArea);
    var total_V=buscar_Match(/(?<=\w{3}).*/,tarifa);
    var divisa=buscar_Match(/(?<=RQ-)(\w{2}|\w{3})(?=\d)/,valor_textoArea);
    total_V=parseFloat(total_V);
    var total_total= numeronoches(rangoFechas,numeroP,total_V);
    //console.log(total_total);

    //LIMPIAR - 
    direccion_one=limpiar(direccion_one);
    telefono=limpiar(telefono);
    direccion_two=limpiar(direccion_two);
    nombreHotel=limpiar(nombreHotel);
    confirmacion=limpiar(confirmacion);
    //LIMPIAR -
    var LineaFinal=inicioL+numeroP+detino+fecha_en_sal+"/HN-"+nombreHotel+"/AP-"+direccion_one+""+direccion_two+"/PH-"+telefono+"/HAB-"+tipoHabitacion+"/LC-"+confirmacion+"/TARIFA-"+divisa+total_total.toFixed(2)+observaciones;
   
    respuesta.innerText=LineaFinal;
    respuestaD.setAttribute("class","open");

    function copiarlinea(){
        areacopiar.innerText="";
        var LineaFinal_text=creartexto(LineaFinal);
        areacopiar.appendChild(LineaFinal_text);
        areacopiar.focus();
        areacopiar.select();
        document.execCommand("copy");
        copiarSegmento.setAttribute("class","animacionC");
        function remuveClass(){
            copiarSegmento.removeAttribute("class");
        }
        setTimeout(remuveClass,1500);

    }

    
    //TODO PRIMER SEGMENTO-FIN//

    //*TODO SEGUNDO SEGMENTO-INICIO//
    var segmento_id=document.getElementById("segmento");
    var lineados=document.getElementById("lineaDos");
    lineados.value=confirmacion;
    var lineaTres=document.getElementById("lineaTres");
    var lineaCuatro=document.getElementById("lineaCuatro");
    var lineaCinco=document.getElementById("lineaCinco");
    var lineaSeis=document.getElementById("lineaSeis");
    var lineaSiete=document.getElementById("lineaSiete");
    var Temporal=document.getElementById("Temporal");
    var SobreComision=document.getElementById("SobreComision");

    function asignarSeg(){
        var segmento_id_V=segmento_id.value;
        if(this.value!=""){
            var verificacionSEG=this.value.indexOf("/S")>1;
            if(verificacionSEG!=true){
        this.value= this.value+"/S"+segmento_id_V;
    }
    }
    }

    function localizador(){
        lineados.value=confirmacion+"/S"+segmento_id.value;
    }
    segmento_id.addEventListener("focusout",localizador);

    //lineaTres.addEventListener("focusout",asignarSeg);
    lineaCuatro.addEventListener("focusout",asignarSeg);
    lineaCinco.addEventListener("focusout",asignarSeg);
    lineaSeis.addEventListener("focusout",asignarSeg);
    lineaSiete.addEventListener("focusout",asignarSeg);
    SobreComision.addEventListener("focusout",asignarSeg);

    //calculamos el importe final
  

   

    //calculam os el importe final
    
    var arrayInsertar=[];
    function copiarAreados(){
        var temporal_value=Temporal.value;
  
        areacopiar.innerText="";      
      var f1="RM*PSCCIA-"+lineaTres.value+"/"+ temporal_value+"/S"+segmento_id.value
      var f2="RM*PSCPAGADERO:EXPEDIA"+"/S"+segmento_id.value
      var f3="RM*ACEHVO-"+lineaCuatro.value
      var f4="RM*ACEBOA-"+lineaCinco.value
      var f5="RM*ACEHCO-"+lineaSeis.value 
      var f6="RM*PSCREF-"+lineaSiete.value
      var f7="RM*PSCSCOM-"+SobreComision.value

      var array_campos=[lineaTres.value,segmento_id.value,lineaCuatro.value,lineaCinco.value,lineaSeis.value,lineaSiete.value,SobreComision.value]

      var arrayF=[f1,f2,f3,f4,f5,f6,f7]
    
        for (var index = 0; index <= array_campos.length; index++) {
           if(array_campos[index]!=""){
            arrayInsertar.push(arrayF[index])
           }
            
        }
        
        var texto_juntar=arrayInsertar.join("\n")
        var texto_juntado=creartexto(texto_juntar);
        console.log(texto_juntado)
        areacopiar.appendChild(texto_juntado);
      
        areacopiar.focus();
        areacopiar.select();
        document.execCommand("copy");
        copiarSegmento_dos.setAttribute("class","animacionC");
        function remuveClass(){
            copiarSegmento_dos.removeAttribute("class");
            arrayInsertar=[]
        }
        setTimeout(remuveClass,1500);
    }
    copiarSegmento_dos.addEventListener("click",copiarAreados);

    //*TODO SEGUNDO SEGMENTO-FIN//
}else{
    detino_id.setAttribute("style","    border: red solid  2px;");
    tipoHabitacion_id.setAttribute("style"," border: red solid 2px;");
}
}


botonGenerar.addEventListener("click",generar);


