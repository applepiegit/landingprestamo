// Manejador de las preguntas y barra de progreso
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.querySelector('.progress-bar-fill');
    const questions = document.querySelectorAll('.question-container');
    const finalMessage = document.querySelector('.final-message');
    const timerElement = document.getElementById('timer');
    const goBackContainer = document.getElementById('goBackContainer');
    let timerInterval = null;
    
    let currentQuestion = 1;
    const totalQuestions = questions.length;

    // Función para actualizar la visibilidad del botón "Go Back"
    function updateGoBackVisibility() {
        // Solo mostrar el botón si:
        // 1. No estamos en la primera pregunta
        // 2. No hemos llegado al mensaje final
        if (currentQuestion > 1 && !finalMessage.classList.contains('active')) {
            goBackContainer.classList.remove('hidden');
        } else {
            goBackContainer.classList.add('hidden');
        }
    }

    // Manejador de clicks en los botones
    document.querySelectorAll('.question-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Actualizar la barra de progreso
            const progress = (currentQuestion / totalQuestions) * 100;
            progressBar.style.width = `${progress}%`;

            // Ocultar pregunta actual
            const currentQuestionElement = document.querySelector(`[data-question="${currentQuestion}"]`);
            currentQuestionElement.classList.remove('active');

            // Verificar si hay más preguntas
            if (currentQuestion < totalQuestions) {
                // Mostrar siguiente pregunta
                currentQuestion++;
                const nextQuestionElement = document.querySelector(`[data-question="${currentQuestion}"]`);
                nextQuestionElement.classList.add('active');
                updateGoBackVisibility();
            } else {
                // Ocultar el botón Go Back
                goBackContainer.classList.add('hidden');
                
                // Mostrar el mensaje de revisión
                const reviewMessage = document.querySelector('.review-message');
                reviewMessage.classList.remove('hidden');
                
                // Después de 2 segundos, mostrar el mensaje final
                setTimeout(() => {
                    // Ocultar el mensaje de revisión
                    reviewMessage.classList.add('hidden');
                    
                    // Mostrar mensaje final
                    finalMessage.classList.add('active');
                    startTimer();
                }, 2000);
            }
        });
    });

    // Función para el temporizador
    function startTimer() {
        let timeLeft = 180; // 3 minutos en segundos
        
        // Limpiar el temporizador anterior si existe
        if (timerInterval) {
            clearInterval(timerInterval);
        }

        function updateTimer() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (timeLeft === 0) {
                // Reiniciar todo el proceso
                resetQuestions();
                clearInterval(timerInterval);
            } else {
                timeLeft--;
            }
        }

        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }

    // Función para reiniciar las preguntas
    function resetQuestions() {
        currentQuestion = 1;
        progressBar.style.width = '0%';
        finalMessage.classList.remove('active');
        
        // Limpiar el temporizador si existe
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        // Ocultar todas las preguntas excepto la primera
        questions.forEach((question, index) => {
            if (index === 0) {
                question.classList.add('active');
            } else {
                question.classList.remove('active');
            }
        });
    }

    // Manejador de eventos para el botón "Go Back"
    document.querySelector('.go-back-btn').addEventListener('click', () => {
        if (currentQuestion > 1) {
            // Ocultar pregunta actual
            const currentQuestionElement = document.querySelector(`[data-question="${currentQuestion}"]`);
            currentQuestionElement.classList.remove('active');
            
            // Mostrar pregunta anterior
            currentQuestion--;
            const previousQuestionElement = document.querySelector(`[data-question="${currentQuestion}"]`);
            previousQuestionElement.classList.add('active');
            
            // Actualizar la barra de progreso
            const progress = ((currentQuestion - 1) / totalQuestions) * 100;
            progressBar.style.width = `${progress}%`;
            
            // Actualizar visibilidad del botón Go Back
            updateGoBackVisibility();
        }
    });
});
