// Manejador de las preguntas y barra de progreso (versión 2)
document.addEventListener('DOMContentLoaded', () => {
    const progressBar2 = document.querySelector('.progress-bar-fill-2');
    const questions2 = document.querySelectorAll('.question-container-2');
    const finalMessage2 = document.querySelector('.final-message-2');
    const timerElement2 = document.getElementById('timer2');
    const goBackContainer2 = document.getElementById('goBackContainer2');
    let timerInterval2 = null;
    
    let currentQuestion2 = 1;
    const totalQuestions2 = questions2.length;

    // Función para actualizar la visibilidad del botón "Go Back"
    function updateGoBackVisibility2() {
        if (currentQuestion2 > 1 && !finalMessage2.classList.contains('active')) {
            goBackContainer2.classList.remove('hidden');
        } else {
            goBackContainer2.classList.add('hidden');
        }
    }

    // Manejador de clicks en los botones
    document.querySelectorAll('.question-btn-2').forEach(button => {
        button.addEventListener('click', () => {
            // Actualizar la barra de progreso
            const progress2 = (currentQuestion2 / totalQuestions2) * 100;
            progressBar2.style.width = `${progress2}%`;

            // Ocultar pregunta actual
            const currentQuestionElement2 = document.querySelector(`[data-question2="${currentQuestion2}"]`);
            currentQuestionElement2.classList.remove('active');

            if (currentQuestion2 < totalQuestions2) {
                // Mostrar siguiente pregunta
                currentQuestion2++;
                const nextQuestionElement2 = document.querySelector(`[data-question2="${currentQuestion2}"]`);
                nextQuestionElement2.classList.add('active');
                updateGoBackVisibility2();
            } else {
                goBackContainer2.classList.add('hidden');
                
                const reviewMessage2 = document.querySelector('.review-message-2');
                reviewMessage2.classList.remove('hidden');
                
                setTimeout(() => {
                    reviewMessage2.classList.add('hidden');
                    
                    finalMessage2.classList.add('active');
                    startTimer2();
                }, 2000);
            }
        });
    });

    // Función para el temporizador
    function startTimer2() {
        let timeLeft2 = 180; // 3 minutos en segundos
        
        if (timerInterval2) {
            clearInterval(timerInterval2);
        }

        function updateTimer2() {
            const minutes2 = Math.floor(timeLeft2 / 60);
            const seconds2 = timeLeft2 % 60;
            timerElement2.textContent = `${String(minutes2).padStart(2, '0')}:${String(seconds2).padStart(2, '0')}`;

            if (timeLeft2 === 0) {
                resetQuestions2();
                clearInterval(timerInterval2);
            } else {
                timeLeft2--;
            }
        }

        updateTimer2();
        timerInterval2 = setInterval(updateTimer2, 1000);
    }

    // Función para reiniciar las preguntas
    function resetQuestions2() {
        currentQuestion2 = 1;
        progressBar2.style.width = '0%';
        finalMessage2.classList.remove('active');
        
        if (timerInterval2) {
            clearInterval(timerInterval2);
        }
        
        questions2.forEach((question, index) => {
            if (index === 0) {
                question.classList.add('active');
            } else {
                question.classList.remove('active');
            }
        });
    }

    // Manejador de eventos para el botón "Go Back"
    document.querySelector('.go-back-btn-2').addEventListener('click', () => {
        if (currentQuestion2 > 1) {
            const currentQuestionElement2 = document.querySelector(`[data-question2="${currentQuestion2}"]`);
            currentQuestionElement2.classList.remove('active');
            
            currentQuestion2--;
            const previousQuestionElement2 = document.querySelector(`[data-question2="${currentQuestion2}"]`);
            previousQuestionElement2.classList.add('active');
            
            const progress2 = ((currentQuestion2 - 1) / totalQuestions2) * 100;
            progressBar2.style.width = `${progress2}%`;
            
            updateGoBackVisibility2();
        }
    });
});
