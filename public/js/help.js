function displayAnswer(question) {
    let answer = "";
    switch (question) {
        case 'greeting-hello':
            answer = "Hello! How can I help you today?";
            break;
        case 'greeting-how-are-you':
            answer = "I'm just a bot, but I'm doing well! How can I assist you?";
            break;

        case 'website-about':
            answer = "This website provides an educational platform for learning programming and computer science. We offer various courses for beginners and advanced learners.";
            break;
        case 'website-courses':
            answer = "We offer courses on various programming languages, including Python, JavaScript, Java, C++, and more. You can check our courses section for detailed information.";
            break;
        case 'website-enroll':
            answer = "You can enroll in a course by visiting the 'Courses' section and clicking on the 'Enroll' button next to the course you are interested in.";
            break;
        case 'website-features':
            answer = "This platform offers features like video tutorials, quizzes, interactive coding exercises, and certificates of completion. We aim to provide a comprehensive learning experience.";
            break;
        case 'website-contact':
            answer = "You can contact our support team by emailing us at support@educationplatform.com. We are happy to assist you!";
            break;
        case 'greeting-goodbye':
            answer = "Goodbye! Feel free to return anytime if you have more questions.";
            break;    
    }

    let answerContent = document.getElementById('answer-content');
    answerContent.innerText = answer;
}
function submitQuestion() {
    const userQuestion = document.getElementById('user-question').value;
    if (userQuestion.trim() !== "") {
        let answerContent = document.getElementById('answer-content');
        answerContent.innerText = `You asked: "${userQuestion}". Please wait while we process your query.`;
    } else {
        alert("Please enter a question before submitting.");
    }
}