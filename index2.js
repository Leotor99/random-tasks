document.getElementById('errormodal').hidden=true
document.getElementById('sorteo').hidden=true
document.getElementById('contenido-tareas').hidden=true
document.getElementById('contenido-premio').hidden=true

document.getElementById('btn-tareas').addEventListener('click',function(e){
    document.getElementById('sorteo').hidden=true
    e.preventDefault()
    unaBuenaLimpiada()
    document.getElementById('contenido-tareas').hidden=false
    document.getElementById('contenido-premio').hidden=true

},false)

document.getElementById('btn-premio').addEventListener('click',function(e){
    document.getElementById('sorteo').hidden=true
    e.preventDefault()
    unaBuenaLimpiada()
    document.getElementById('contenido-premio').hidden=false
    document.getElementById('contenido-tareas').hidden=true

},false)

document.getElementById('g_tareas').addEventListener('click',function(e){
e.preventDefault()


var participantes = document.getElementById('participantes')
var temas = document.getElementById('temas')

if(participantes==''){
    participantes=[]
}else{
    participantes=participantes.value.toString().split('\n')
}

if(temas==''){
    temas =[] 
}else{
   temas = temas.value.toString().split('\n')
}



var arreglo_participantes = []
var arreglo_temas = []
var errores = []

if(participantes.length>=0 && participantes.length<=1){
    errores.push('Deben haber al menos 2 participantes')
}

if(temas.length>=0 && temas.length<=1){
    errores.push('Deben haber al menos 2 temas')
}

if(participantes.length!=temas.length){
    errores.push('El numero de participantes debe ser igual al numero de temas')

}

if(errores.length==0){
    for (let index = 0; index < participantes.length; index++) {
        arreglo_participantes.push({'participante':participantes[index],'cambiado':false}) 
    }
    
    for (let index = 0; index < temas.length; index++) {
        arreglo_temas.push({'tema':temas[index],'cambiado':false}) 
    }
    arreglo_participantes= cambiarPos(arreglo_participantes)
    arreglo_temas= cambiarPos(arreglo_temas)
    
    var resultado = document.getElementById('resultado')
    var contenido ='' 
    for (let index = 0; index < arreglo_participantes.length; index++) {
        contenido+=`<tr class="text-center" style="font-weight:bold;"><td><label>${index+1})</label><label>${arreglo_participantes[index].participante}</label></td><td ><label><i class="glyphicon glyphicon-arrow-right" style="color:#0069d9;"></i></label></td><td><label>${arreglo_temas[index].tema}</label></td></tr>`
        
    }
    
    document.getElementById('titulo_resultado').innerHTML=''
    document.getElementById('titulo_resultado').innerHTML+=`<h2>SORTEO</h2>`
    
    resultado.innerHTML=''
    resultado.innerHTML+=contenido
    document.getElementById('sorteo').hidden=false
}else{
    var cont_errores = document.getElementById('contenido-errores')
    var contenido = '<ul>'
    console.log(errores)
    for (let index = 0; index < errores.length; index++) {
        contenido +=`<li>${errores[index]}</li>`
        
    }
    contenido += '</ul>'

    cont_errores.innerHTML=contenido

    document.getElementById('errormodal').click();


}


},false);

document.getElementById('g_premios').addEventListener('click',function(e){
 
e.preventDefault()
var participantes = document.getElementById('participantes2').value
var premios = document.getElementById('premios').value
if(participantes==''){
    participantes=[]
}else{
    participantes=participantes.toString().split('\n')
}
if(premios==''){
    premios=[]
}else{
    premios=premios.toString().split('\n')
}

var arreglo_participantes = []
var arreglo_premios = []
var errores = []
if(participantes.length>=0 && participantes.length<=1){
    errores.push('Deben haber al menos 2 participantes')
}

if(premios.length==0){
    errores.push('Deben haber al menos 1 premio')
}

if(premios.length>=participantes.length){
    errores.push('La cantidad de premios deben ser menores que los participantes')
}


if(errores.length==0){
    var diferencia = participantes.length-premios.length

    for (let index = 0; index < participantes.length; index++) {
        arreglo_participantes.push({'participante':participantes[index],'cambiado':false}) 
    }
    
    for (let index = 0; index < premios.length; index++) {
        arreglo_premios.push({'premio':premios[index],'cambiado':false}) 
    }
    for (let index = 0; index < diferencia; index++) {
        arreglo_premios.push({'premio':'No hay nada crack!','cambiado':false}) 
        
    }
    arreglo_participantes= cambiarPos(arreglo_participantes)
    arreglo_premios= cambiarPos(arreglo_premios)
    
    var resultado = document.getElementById('resultado')
    var contenido =''
    for (let index = 0; index < arreglo_participantes.length; index++) {
        contenido+=`<tr class="text-center" style="font-weight:bold;"><td><label>${index+1})</label><label>${arreglo_participantes[index].participante}</label></td><td ><label><i class="glyphicon glyphicon-arrow-right" style="color:#0069d9;"></i></label></td><td><label>${arreglo_premios[index].premio?arreglo_premios[index].premio:'No hay nada pa ti'}</label></td></tr>`
        
    }
    
    document.getElementById('titulo_resultado').innerHTML=''
    document.getElementById('titulo_resultado').innerHTML+=`<h2>SORTEO</h2>`
    
    resultado.innerHTML=''
    resultado.innerHTML+=contenido
    document.getElementById('sorteo').hidden=false
}else{
    var cont_errores = document.getElementById('contenido-errores')
    var contenido = '<ul>'
    console.log(errores)
    for (let index = 0; index < errores.length; index++) {
        contenido +=`<li>${errores[index]}</li>`
        
    }
    contenido += '</ul>'

    cont_errores.innerHTML=contenido

    document.getElementById('errormodal').click();
}

},false)

function cambiarPos(personas){
    array_cambiado =[]
    var indice =0
    var numero;
    var generado;
    while(indice<personas.length){
        
        generado=false
        while(!generado){
            numero =generaNumeroAleatorio(0,personas.length-1)
            if(!personas[numero].cambiado){
                personas[numero].cambiado=true
                array_cambiado.push(personas[numero])
                generado = true;
            }

        }
        indice++

    }
    return array_cambiado
}

function generaNumeroAleatorio( minimo,  maximo) {

    var num = Math.round(Math.floor(Math.random() * (minimo - (maximo + 1)) + (maximo + 1)));
    return num;
}

function unaBuenaLimpiada(){
    document.getElementById('participantes').value=''
    document.getElementById('temas').value=''
    document.getElementById('participantes2').value=''
    document.getElementById('premios').value=''
}