const allQuestions = [
    { question: 'What is the correct syntax for declaring a variable in JavaScript?', options: ['var', 'let', 'const', 'All of the above'], answer: 'All of the above' },
    { question: 'Which function is used to write text to the console in JavaScript?', options: ['console.write()', 'console.log()', 'log.console()', 'write.console()'], answer: 'console.log()' },
    { question: 'What does the "div" tag in HTML represent?', options: ['Division', 'Block', 'Header', 'Section'], answer: 'Division' },
    { question: 'Which CSS property controls text size?', options: ['font-style', 'text-size', 'font-size', 'size'], answer: 'font-size' },
    { question: 'How do you define a function in Python?', options: ['function()', 'define()', 'def', 'func'], answer: 'def' },
    { question: 'Which symbol is used for comments in Python?', options: ['#', '//', '/* */', '*//*'], answer: '#' },
    { question: 'Which of these is a relational database?', options: ['MongoDB', 'MySQL', 'Redis', 'Neo4j'], answer: 'MySQL' },
    { question: 'What is a primary key in SQL?', options: ['Unique identifier', 'Data type', 'Index', 'None of the above'], answer: 'Unique identifier' },
    { question: 'What is a valid way to declare a string in Java?', options: ['String str;', 'str = new String();', 'String str = "Hello";', 'All of the above'], answer: 'All of the above' },
    { question: 'Which programming paradigm does C++ support?', options: ['Procedural', 'Object-Oriented', 'Both', 'None'], answer: 'Both' },
    { question: 'What is React primarily used for?', options: ['Data Science', 'Backend development', 'Frontend development', 'Mobile Apps'], answer: 'Frontend development' },
    { question: 'What does CSS stand for?', options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'], answer: 'Cascading Style Sheets' },
    { question: 'Which language is primarily used for machine learning models?', options: ['Python', 'JavaScript', 'C#', 'Ruby'], answer: 'Python' },
    { question: 'Which is the latest HTML version?', options: ['HTML4', 'HTML5', 'HTMLX', 'HTML+'], answer: 'HTML5' },
    { question: 'What does REST in RESTful API stand for?', options: ['Representational State Transfer', 'Requesting Server Transaction', 'Rapid Endpoint Standard Test', 'None of the above'], answer: 'Representational State Transfer' },
    { question: 'Which method is used to start a thread in Java?', options: ['start()', 'run()', 'execute()', 'init()'], answer: 'start()' },
    { question: 'Which language is used for web scraping with Beautiful Soup?', options: ['Python', 'Java', 'C++', 'JavaScript'], answer: 'Python' },
    { question: 'Which company developed TypeScript?', options: ['Google', 'Microsoft', 'Facebook', 'Amazon'], answer: 'Microsoft' },
    { question: 'Which symbol is used for accessing pointers in C++?', options: ['&', '*', '->', '.'], answer: '*' },
    { question: 'What does the "head" tag in HTML include?', options: ['Body content', 'Meta information', 'Scripts', 'Meta information and scripts'], answer: 'Meta information and scripts' },
    // Add 80 more questions here...
  ];

  let remainingQuestions = [...allQuestions];
  let currentQuestions = [];

  function startQuiz() {
    if (remainingQuestions.length < 10) {
      remainingQuestions = [...allQuestions];
    }

    currentQuestions = remainingQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
    remainingQuestions = remainingQuestions.filter((q) => !currentQuestions.includes(q));

    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('resultPage').classList.add('hidden');
    document.getElementById('quizPage').classList.remove('hidden');

    const quizForm = document.getElementById('quizForm');
    quizForm.innerHTML = '';

    currentQuestions.forEach((question, index) => {
      const questionElement = document.createElement('div');
      questionElement.classList.add('question');
      questionElement.innerHTML = `<h3>${index + 1}. ${question.question}</h3>`;

      const optionsElement = document.createElement('ul');
      optionsElement.classList.add('options');

      question.options.forEach((option) => {
        const optionElement = document.createElement('li');
        optionElement.innerHTML = `
          <label>
            <input type="radio" name="question${index}" value="${option}" />
            ${option}
          </label>
        `;
        optionsElement.appendChild(optionElement);
      });

      questionElement.appendChild(optionsElement);
      quizForm.appendChild(questionElement);
    });

    document.getElementById('submitButton').classList.remove('hidden');
  }

  function submitQuiz() {
    const quizForm = document.getElementById('quizForm');
    const formData = new FormData(quizForm);
    let score = 0;

    currentQuestions.forEach((question, index) => {
      const selectedOption = formData.get(`question${index}`);
      if (selectedOption === question.answer) {
        score++;
      }
    });

    document.getElementById('quizPage').classList.add('hidden');
    document.getElementById('resultPage').classList.remove('hidden');
    document.getElementById('score').innerText = score;

    document.getElementById('submitButton').classList.add('hidden');
  }

  function reattemptQuiz() {
    startQuiz();
  }

  function goToHomePage() {
    document.getElementById('resultPage').classList.add('hidden');
    document.getElementById('homePage').classList.remove('hidden');
  }