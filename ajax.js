function ajaxCaja(ulr,callback){
var caja=new XMLHttpRequest();
caja.open("GET",ulr,true);
var objeto=JSON.parse(caja.responseText);
callback(objeto);

caja.send(null);

}