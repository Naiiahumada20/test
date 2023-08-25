//seleccionamos los recursos necesarios
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// Si hacemos clic en el botón empezar
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //mostrar la caja info
}

// Si se pulsa el botón salir
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // esconder la caja info
}

// Si se hace clic en el botón continuar
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //esconder la caja info
    quiz_box.classList.add("activeQuiz"); //mostrar la caja de preguntas
    showQuetions(0); //llamar a la función showQestions para mostrar las preguntas
    queCounter(1); // pasamos el parámetro 1 a la función queCounter
    startTimer(15); //Llamamos a la función startTimer
    startTimerLine(0); //Llamamos a la función startTimerLine
}

// Establecermos valores
let timeValue =  15; 
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// Si pulsamos el botón Repetir cuestionario
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //Mostrar la caja de preguntas
    result_box.classList.remove("activeResult"); //esconder la caja de resultado
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //llamando a la función showQestions
    queCounter(que_numb); //pasando el valor que_numb a queCounter
    clearInterval(counter); //limpiar contador
    clearInterval(counterLine); //limpiar counterLine
    startTimer(timeValue); // llamar al a función startTimer
    startTimerLine(widthValue); //llamar a la función startTimerLine
    timeText.textContent = "Time Left"; //cambie el texto de timeText a Time Left
    next_btn.classList.remove("show"); //esconder el botón siguiente
}

// si se hace clic en el botón Salir
quit_quiz.onclick = ()=>{
    window.location.reload(); //recargar la ventana actual
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// si se hace clic en el botón Next
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //si el número de preguntas es menor que la longitud total de la pregunta
        que_count++; //incrementar el valor que_count
        que_numb++; //ncrementar el valor que_numb
        showQuetions(que_count); //llamando a la función showQestions
        queCounter(que_numb); //pasando el valor que_numb a queCounter
        clearInterval(counter); //limpiar contador
        clearInterval(counterLine); //limpiar counterLine
        startTimer(timeValue); //llamando a la función startTimer
        startTimerLine(widthValue); //llamando a la función startTimerLine
        timeText.textContent = "Tiempo restante"; //cambiar el texto de tiempo a tiempo restante
        next_btn.classList.remove("show"); //ocultar el botón siguiente
    }else{
        clearInterval(counter); //limpiar contador
        clearInterval(counterLine); //limpiar counterLine
        showResult(); //llamando a la función showResult
    }
}

// obtener preguntas y opciones del array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creando una nueva etiqueta span y div para la pregunta y la opción y pasando el valor usando el índice de array
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //agregando una nueva etiqueta de intervalo dentro de que_tag
    option_list.innerHTML = option_tag; //agregando una nueva etiqueta div dentro de option_tag
    
    const option = option_list.querySelectorAll(".option");

    // establecer el atributo onclick para todas las opciones disponibles
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creando las nuevas etiquetas div que para los iconos
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';


//Si la usuario hace clic en la opción
function optionSelected(answer){
    clearInterval(counter); //limpiar contador
    clearInterval(counterLine); //limpiar counterLine
    let userAns = answer.textContent; //obtener la opción seleccionada por el usuario
    let correcAns = questions[que_count].answer; //obtener la respuesta correcta de la matriz
    const allOptions = option_list.children.length; //obtener todos los artículos de opción
    
    if(userAns == correcAns){ //si la opción seleccionada por el usuario es igual a la respuesta correcta de la matriz
        userScore += 1; //mejora el valor de la puntuación con 1
        answer.classList.add("correct"); //agregando color verde para corregir la opción seleccionada
        answer.insertAdjacentHTML("beforeend", tickIconTag); //agregando un ícono de marca para corregir la opción seleccionada
        console.log("Respuestas correctas");
        console.log("Tus respuestas correctas = " + userScore);
    }else{
        answer.classList.add("incorrect"); //agregando color rojo para corregir la opción seleccionada
        answer.insertAdjacentHTML("beforeend", crossIconTag); //agregando un icono de cruz para corregir la opción seleccionada
        console.log("Respuesta incorrecta");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //si hay una opción que coincide con una respuesta de matriz
                option_list.children[i].setAttribute("class", "option correct"); //agregando color verde a la opción coincidente
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //agregando el icono de marca a la opción coincidente
                console.log("Autoselección de la respuesta correcta.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //una vez que el usuario selecciona una opción, deshabilita todas las opciones
    }
    next_btn.classList.add("show"); //mostrar el siguiente botón si el usuario seleccionó alguna opción
}

function showResult(){
    info_box.classList.remove("activeInfo"); //esconder la caja de info
    quiz_box.classList.remove("activeQuiz"); //esconder la caja de pregunta
    result_box.classList.add("activeResult"); //mostrar la caja del resultado
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 4){ //Si el usuario acertó más de 3 respuestas
        //crear una nueva etiqueta de intervalo y pasar el número de puntuación del usuario y el número total de preguntas
        let scoreTag = '<span>Felicidades! 🎉, has acertado <p>'+ userScore +'</p> preguntas de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //agregando una nueva etiqueta de intervalo dentro de score_Text
    }
    else if(userScore > 1){ // Si el usuario acertó más de 1
        let scoreTag = '<span>Muy bien 😎, has acertado <p>'+ userScore +'</p> preguntas de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // si el usuario acertó menos de 1
        let scoreTag = '<span>Lo siento 😐, solo has acertado <p>'+ userScore +'</p> pregunta de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //Cambiamos el valor de timeCount con el valor de tiempo
        time--; //decrementamos el valor de tiempo
        if(time < 9){ //Si time es menor que 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //Añadimos 0 antes del valor tiempo
        }
        if(time < 0){ //Si tiempo es menor que 0
            clearInterval(counter); //limpiamos el contador
            timeText.textContent = "TIEMPO!!"; //Cambiamos el texto de timpo
            const allOptions = option_list.children.length; //obtenemos todos los items de opciones
            let correcAns = questions[que_count].answer; //Obtenemos la respuesta correcta del array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //Si hay una opción que coincide con una respuesta del array
                    option_list.children[i].setAttribute("class", "option correct"); //añadimos el color color verde a la opción seleccionada
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //añadir el icono del tick a la selección
                    console.log("Se acabó el tiempo: Autoselección de la respuesta correcta.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //Cuando el usuario selecciona una opción, deshabilitamos las demás
            }
            next_btn.classList.add("show"); //Mostrar el botón siguiente, si el usuario seleccionó alguna opción
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //actualizar el valor de timpo en 1
        time_line.style.width = time + "px"; //incrementar el width de time_line con los px del valor de tiempo
        if(time > 549){ //Si el valor de time es mayor que 549
            clearInterval(counterLine); //limpiar counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ questions.length +'</p> preguntas</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}