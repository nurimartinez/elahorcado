//Carga de app

$(window).load(function () {
    $(".cargando").fadeOut("slow");
});

//Información del HTML

let nombre=document.querySelector("#nombre")
let botonJugarInicio=document.querySelector(".modal-inicio-jugar")
let botonJugarOpciones=document.querySelector(".modal-opciones-jugar")
let botonVolverJugar=document.querySelector(".modal-fin-rejugar")
let botonCerrar=document.querySelector(".marcador-salir")
let puntuaciones=document.querySelector(".marcador-listado")
let botonInicio=document.querySelector(".cabecera-menu-inicio")
let botonPuntuaciones=document.querySelector(".cabecera-menu-puntuacion")
let temporizador=document.querySelector(".juego-temporizador")
let tematica=document.querySelector(".juego-tematica")
let ahorcado=document.querySelector(".juego-ahorcado")
let palabra=document.querySelector(".juego-palabra")
let teclado=document.querySelector(".juego-teclado")
let nombreJugador=document.querySelector(".juego-datos-nombre")
let partidas=document.querySelector(".juego-datos-partidas")

//Variables

let seleccion=0
let fallos=0
let aciertos=0
let partidasGanadas=0

let jugador={
  nombre: "",
  puntuacion: 0,
  fecha: new Date()
}

//Array de temáticas

let palabras=[
  {palabra:"ELEFANTE",tema:"Animales"},
  {palabra:"CANGURO",tema:"Animales"},
  {palabra:"TIGRE",tema:"Animales"},
  {palabra:"RINOCERONTE",tema:"Animales"},
  {palabra:"ORNITORRINCO",tema:"Animales"},
  {palabra:"KIWI",tema:"Animales"},
  {palabra:"PANDA",tema:"Animales"},
  {palabra:"ARDILLA",tema:"Animales"},
  {palabra:"ESGRIMA",tema:"Deportes"},
  {palabra:"KARATE",tema:"Deportes"},
  {palabra:"CICLISMO",tema:"Deportes"},
  {palabra:"WATERPOLO",tema:"Deportes"},
  {palabra:"CURLING",tema:"Deportes"},
  {palabra:"HIPICA",tema:"Deportes"},
  {palabra:"ATLETISMO",tema:"Deportes"},
  {palabra:"BADMINTON",tema:"Deportes"},
  {palabra:"TAILANDIA",tema:"Países"},
  {palabra:"GUATEMALA",tema:"Países"},
  {palabra:"MONGOLIA",tema:"Países"},
  {palabra:"ESPAÑA",tema:"Países"},
  {palabra:"AUSTRALIA",tema:"Países"},
  {palabra:"ITALIA",tema:"Países"},
  {palabra:"FINLANDIA",tema:"Países"},
  {palabra:"FRANCIA",tema:"Países"}
]

//Modal Inicio

botonJugarInicio.onclick=IniciarPartida
botonJugarInicio.onmouseover = () => botonJugarInicio.src = "./img/jugar2.png"
botonJugarInicio.onmouseout = () => botonJugarInicio.src = "./img/jugar.png"

//Pantalla Principal

function IniciarPartida(){
  recogerDatos()
  fallos=0
  aciertos=0
  jugador.nombre=nombre.value
  ahorcado.setAttribute("src","./img/ahorcado0.png")
  teclado.classList.remove("invisible")
  partidas.textContent=`Partidas ganadas: ${partidasGanadas}`
  if(nombre.value=="")
    document.querySelector(".modal-inicio-formulario-alerta").classList.remove("oculto")
  else{
    document.querySelector(".modal-inicio").classList.add("oculto")
    nombreJugador.textContent=nombre.value
    jugador.nombre=nombre.value
    borrar()
    crearAbecedario()
    seleccion=Math.round(Math.random()*(palabras.length-1))
    tematica.innerHTML=palabras[seleccion].tema
    let palabraElegida=palabras[seleccion].palabra
    let palabraElegidaArray=Array.from(palabraElegida)
    let letrasPalabraContenedor=document.createElement("div")
    let letraPalabra=document.createElement("p")
    letrasPalabraContenedor.classList.add("borde-inferior")
    letraPalabra.classList.add("oculto")
    palabraElegidaArray.forEach(l=>{
      let p=letraPalabra.cloneNode()
      p.innerHTML=l
      let letra=letrasPalabraContenedor.cloneNode()
      letra.insertAdjacentElement("beforeend",p)
      palabra.insertAdjacentElement("beforeend",letra)
    })
    console.log(palabraElegida)
  }
}

function borrar(){
  while(teclado.firstChild)
    teclado.firstChild.remove()
  while(palabra.firstChild)
    palabra.firstChild.remove()
}


function crearAbecedario(){
  let abecedario=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  let letras=document.createElement("div")
  let imgs=document.createElement("img") 
  imgs.classList.add("pulsada")
  letras.classList.add("letra")
  abecedario.forEach(l => {
      let letra=letras.cloneNode()
      letra.innerHTML=l
      letra.onclick=()=>{
        if(letra.firstElementChild==null){
          if(palabras[seleccion].palabra.indexOf(letra.textContent)==-1){
            imgs.setAttribute("src","./img/letraMal.png")
            fallos++
            ahorcado.setAttribute("src","./img/ahorcado"+fallos+".png")
          }
          else{
            imgs.setAttribute("src","./img/letraBien.png")
            let comparacionLetra = Array.from(document.querySelectorAll(".juego-palabra div p"))
            comparacionLetra.forEach(l=>{
              if(l.textContent==letra.textContent){
                l.classList.remove("oculto")
                aciertos++
              }
            })           
          }
          comprobarJugada()  
          let img=imgs.cloneNode()
          letra.insertAdjacentElement("afterbegin",img)
        }
      }
      teclado.appendChild(letra)
  })
}

function comprobarJugada(){
  if(fallos>=6){
    Array.from(palabra.querySelectorAll("p")).forEach(l=>{
      l.classList.remove("oculto")
    })
    teclado.classList.add("invisible")
    guardarDatos()
    setTimeout(() => {
      document.querySelector(".modal-fin").classList.remove("oculto")
      partidasGanadas=0
    }, 1500)
  }
  if(aciertos==palabras[seleccion].palabra.length){
    teclado.classList.add("invisible")
    partidasGanadas++
    ahorcado.setAttribute("src","./img/ahorcado.gif")
    setTimeout(() => {
      IniciarPartida()
    }, 2000)
  }
}

//Botones cabecera

botonInicio.onclick=()=>{
  guardarDatos()
  document.querySelector(".modal-inicio-formulario-alerta").classList.add("oculto")
  document.querySelector(".modal-inicio").classList.remove("oculto")
  document.querySelector(".modal-fin").classList.add("oculto")
  nombre.value=""
  partidasGanadas=0
}

botonInicio.onmouseover = () => botonInicio.src = "./img/inicio2.png"
botonInicio.onmouseout = () => botonInicio.src = "./img/inicio.png"

botonPuntuaciones.onclick=()=>{
  document.querySelector(".modal-puntuacion").classList.remove("oculto")
  for(let i=0;i<5;i++){
    let div=document.createElement("div")
    div.classList.add("marcador-listado-fila")
    let p1=document.createElement("p")
    p1.textContent=jugadores[i].nombre
    let p2=document.createElement("p")
    p2.textContent=jugadores[i].puntuacion
    div.insertAdjacentElement("beforeend",p1)
    div.insertAdjacentElement("beforeend",p2)
    puntuaciones.insertAdjacentElement("beforeend",div)
  }
}

botonPuntuaciones.onmouseover = () => botonPuntuaciones.src = "./img/puntuacion2.png"
botonPuntuaciones.onmouseout = () => botonPuntuaciones.src = "./img/puntuacion.png"

//Modal Puntuaciones

botonCerrar.onclick=()=>{
  document.querySelector(".modal-puntuacion").classList.add("oculto")
  puntuaciones.textContent=""
}

botonCerrar.onmouseover = () => botonCerrar.src = "./img/salir2.png"
botonCerrar.onmouseout = () => botonCerrar.src = "./img/salir.png"

function recogerDatos(){
  let puntuaciones=localStorage.getItem("puntuaciones")
  if(puntuaciones==undefined)
    jugadores=[]
  else
    jugadores=JSON.parse(puntuaciones)
}

function guardarDatos(){
  jugador.puntuacion=partidasGanadas
  jugadores.unshift(jugador)
  let jugadoresOrden=jugadores.sort((a,b)=>b.puntuacion-a.puntuacion)
  localStorage.setItem("puntuaciones",JSON.stringify(jugadoresOrden))
}

//Modal Perder

botonVolverJugar.onclick=()=>{
  IniciarPartida()
  document.querySelector(".modal-fin").classList.add("oculto")
  
}

botonVolverJugar.onmouseover = () => botonVolverJugar.src = "./img/rejugar2.png"
botonVolverJugar.onmouseout = () => botonVolverJugar.src = "./img/rejugar.png"

//Canción

var audio = document.getElementById("musica");
audio.volume = 0.1;