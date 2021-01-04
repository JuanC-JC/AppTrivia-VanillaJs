let contenedor = document.getElementById("main-container");
let main = document.getElementById("main-section");
let categories = document.getElementById("categories");
let button = document.getElementById("start");
let nickname = document.getElementById("nickname");
let question = document.getElementById("question");

let buttonGeografia = document.getElementById("button-geografia");
let buttonMatematicas = document.getElementById("button-matematicas");

let categorieChoose = null;

var questions = null;

let indexQuestion = 0;

let puntaje = 0;

let interval;

let respuestas = [];

button.addEventListener("click",changeToCategories);
buttonGeografia.addEventListener("click",selectionCategorie);
buttonMatematicas.addEventListener("click",selectionCategorie);


function changeToCategories(){
    let errorContainer = document.getElementById("error")

    if(validationNick()){
        errorContainer.innerHTML = "";
        //hace visible el div de seleccion de categorias
        main.classList.add("nonVisible");
        categories.classList.remove("nonVisible");
    }
    else{
        //inyecta un parrafo indicado que existe un error
        errorContainer.innerHTML = "<p>Error: Ingrese un nombre valido</p>";
    }

}

function validationNick(){
    if (nickname.value!==""){
        return true
    }
    else{
        return false
    }
}


let geografiaHtml = `<h2 class="question__title"> geografia </h2>`;


let geografiaPreguntas = [
    {
        pregunta:"como se llama este moridero",
        respuestas:["Colombia","Venequela","Unitedstates"],
        respuesta:0
    },
    {
        pregunta:"cuantas piedras tiene el rio ariari",
        respuestas:["io khe ze","next question","las que debe tener"],
        respuesta:2
    },
    {
        pregunta:"cuantas piedras tiene el rio ariari",
        respuestas:["io khe ze","next question","las que debe tener","test"],
        respuesta:2
    },
    {
        pregunta:"cuantas piedras tiene el rio ariari",
        respuestas:["io khe ze","next question","las que debe tener"],
        respuesta:2
    }
    
]

let matematicasPreguntas = [
    {
        pregunta:"cuanto es 1 + 1",
        respuestas:["2","11","3"],
        respuesta:0
    },
    {
        pregunta:"cuantas piedras tiene el rio ariari",
        respuestas:["io khe ze","next question","las que debe tener"],
        respuesta:2
    }
]


function selectionCategorie(event){
    
    //tengo la misma funcion en dos botones, a si que debo determinar cual boton fue el presionado
    let buttonSelect = event.path[0].id

    indexQuestion = 0;
    puntaje = 0;
    //escondo las categorias y dejo solo el div que contendra las preguntas
    categories.classList.add("nonVisible")
    question.classList.remove("nonVisible")


    if(buttonSelect =="button-geografia"){

        categorieChoose = "geografia";
        questions = geografiaPreguntas;
    }
    else if(buttonSelect =="button-matematicas"){
        categorieChoose = "matematicas";
        questions = matematicasPreguntas;
    }

    insertQuestion();
}

function insertQuestion(){

    let time = 20;

    //en que indice de la lista de preguntas vamos
    if(indexQuestion<questions.length){

        //inyecta el html de la pregunta
        question.innerHTML = `<div id="timer" class="question__timer">${time}</div>`+
                            geografiaHtml + 
                            `<p class="question__counter">${indexQuestion+1}/${questions.length}</p>` +
                             generateQuestion();

        //le agrego un evento a todas las posibles respuestas
        let options = document.getElementsByClassName("answer");
        
        //son htmlcolecctions a si que no puedo recorrerlo con for(var in )
        for(let z=0;z<options.length;z++){
            options[z].addEventListener("click",isCorrect)
        }

        cronometro(time, document.getElementById("timer"))
    }

    else{   
        question.innerHTML = `<p class="puntaje"> que puntaje de mierda -> ${puntaje} vales monda ${nickname.value}\
                                <p class="button button-center" id="restart">play again!</p>`;
        
        document.getElementById("restart").addEventListener("click",function(){
            question.classList.add("nonVisible");
            categories.classList.remove("nonVisible");
        })
    }




}

function generateQuestion(){    

    var pregunta = questions[indexQuestion];

    let componente = `<p class="question__pregunta">¿${pregunta.pregunta}?</p>`;

    for(let x=0;x<pregunta.respuestas.length;x++){
        componente += `<p class="answer">${pregunta.respuestas[x]}</p>`
    }

    return componente
}


function isCorrect(event){

    //cuando se le da click a una respuesta ya no necesita mas tiempo por eso lo resetea
    clearInterval(interval);
    console.log("cerrado ");

    let select = event.path[0]

    let selectMemory = {pregunta:questions[indexQuestion].pregunta,nombre:select.innerText, correcta:false}

    let respuesta = questions[indexQuestion].respuestas[questions[indexQuestion].respuesta];

    let options = document.getElementsByClassName("answer");

    indexQuestion += 1;

    //respuesta sea correcta
    if (respuesta == select.innerText){
        select.classList.add("true");  


        puntaje += 100;
        selectMemory.correcta = true;
    } 
    else{
        //si no fue correcta

        //indica que la que selecciono no es la correcta
        select.classList.add("false");

        //indica cual debio ser la correcta
        for(let z=0;z<options.length;z++){  

            if(respuesta == options[z].innerHTML){
                options[z].classList.add("true");
            }
        }
    }




    //añade el boton de siguiente
    question.innerHTML += `<p class="next-question button">siguiente</p>`

    document.getElementsByClassName("next-question")[0].addEventListener("click",function(){insertQuestion(questions);})


}


function cronometro(time, component){

    interval = setInterval(function (){
        if(time==0){
            clearInterval(interval);
            indexQuestion += 1;
            insertQuestion();
        }
        else{
            time -=1;
            component.innerText = `${time}`;

        }

    }, 1000
    )
}