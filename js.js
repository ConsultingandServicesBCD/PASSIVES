
var arrayHOTEL=[
    expedia={
                titulo:'Expedia',
                url:'herramientas/hotel/expedia/index.html'
            }

]
var arrayTREN=[
    renfe={
            titulo:'renfe',
            url:'herramientas/tren/renfe/index.html'
    },
    sbb={
        titulo:'sbb',
        url:'herramientas/tren/sbb/index.html'
}
]
    var arrayAEREO=[
        Ryanair={
            titulo:'Ryanair',
            url:'herramientas/aereo/Ryanair/index.html'
    },
        vueling={
        titulo:'vueling',
        url:'herramientas/aereo/vueling/index.html'
        },
        g200={
                    titulo:'G200',
                    url:'herramientas/aereo/g200/index.html'
                }
    ]

    var arrayPLANNER=[
        Indra={
            titulo:'Indra',
            url:'herramientas/planner/indra/index.html'
    }
]

function packHerramientas(){
    
}

function creartexto(inpuText){
    var TextoAcolocar=document.createTextNode(inpuText);
    return TextoAcolocar;
    }

function box(index) {
    console.log(index.titulo)
    var etiquetaDIV=document.createElement("div");
    var etiquetaA=document.createElement("a");
    //var urlText=creartexto(segmento.ulr);
    etiquetaA.setAttribute("href",index.url);
  
    var titulo=creartexto(index.titulo);
    etiquetaA.appendChild(etiquetaDIV);
    etiquetaDIV.appendChild(titulo);
    gemas.appendChild(etiquetaA);
}

var gemas=document.getElementById("gemas");
var hotel=document.getElementById("hotel");
var tren=document.getElementById("tren");
var aereo=document.getElementById("aereo");
var objet_img=document.getElementById("objet_img");
function disparar(sujeto) {
    gemas.innerHTML="";
    var tipo=sujeto.innerText
    if(tipo==="HOTEL"){
      arrayHOTEL.forEach((index)=>{box(index)})  
    }
    if(tipo==="TREN"){
        arrayTREN.forEach((index)=>{box(index)})  
      }
      if(tipo==="AEREO"){
        arrayAEREO.forEach((index)=>{box(index)})  
      }
      if(tipo==="PLANNER"){
        arrayPLANNER.forEach((index)=>{box(index)})  
      }
    
}



function objeto_img(params) {
    objet_img.setAttribute("style","animation-name: bola1;animation-duration: 5s;animation-iteration-count: infinite;animation-timing-function: cubic-bezier(0.28, 0.25, 1, 1.07);");
}

hotel.addEventListener("mouseover", objeto_img);
