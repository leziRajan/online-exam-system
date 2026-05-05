
function registerUser() {
    let name = document.getElementById("regName")?.value.trim();
    let email = document.getElementById("regEmail")?.value.trim();
    let pass = document.getElementById("regPass")?.value.trim();

    if (name && email && pass) {
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPass", pass);
        
        alert("Registration Successful! Now Login.");
        window.location.href = "login.html";
    } else {
        alert("Please fill all details");
    }
}

function loginUser() {
    let name = document.getElementById("name")?.value.trim();
    let password = document.getElementById("password")?.value.trim();

    let savedName = localStorage.getItem("userName");
    let savedPass = localStorage.getItem("userPass");

    if (name === savedName && password === savedPass && savedName) {
        localStorage.setItem("isLogin", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Login");
    }
}

function togglePassword(id, icon) {
    let input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
        icon.innerText = "🙈";
    } else {
        input.type = "password";
        icon.innerText = "👁️";
    }
}

function logoutUser() {
    localStorage.removeItem("isLogin");
    alert("Logged out successfully!");
    window.location.href = "login.html";
}

let htmlQuestions = [
    {q:"HTML stands for?", options:["Home Text Markup","Hyper Text Markup Language","High Tool Machine"], answer:1},
    {q:"HTML paragraph tag is?", options:["&lt;h1&gt;","&lt;p&gt;","&lt;img&gt;"], answer:1},
    {q:"HTML image tag is?", options:["&lt;pic&gt;","&lt;image&gt;","&lt;img&gt;"], answer:2},
    {q:"Largest heading tag?", options:["&lt;head&gt;","&lt;h6&gt;","&lt;h1&gt;"], answer:2},
    {q:"Link tag in HTML?", options:["&lt;href&gt;","&lt;a&gt;","&lt;link&gt;"], answer:1},
    {q:"Line break tag?", options:["&lt;lb&gt;","&lt;break&gt;","&lt;br&gt;"], answer:2},
    {q:"HTML file extension?", options:[".css",".html",".js"], answer:1},
    {q:"Ordered list tag?", options:["&lt;ul&gt;","&lt;li&gt;","&lt;ol&gt;"], answer:2},
    {q:"Table row tag?", options:["&lt;td&gt;","&lt;tr&gt;","&lt;th&gt;"], answer:1},
    {q:"Form input tag?", options:["&lt;textbox&gt;","&lt;type&gt;","&lt;input&gt;"], answer:2}
];

let cssQuestions = [
    {q:"CSS stands for?", options:["Creative Style Sheets","Cascading Style Sheets","Color Style"], answer:1},
    {q:"CSS is used for?", options:["Logic","Styling","Database"], answer:1},
    {q:"CSS file extension?", options:[".js",".css",".html"], answer:1},
    {q:"Text color property?", options:["font-color","text-style","color"], answer:2},
    {q:"Background color?", options:["bgcolor","background-color","back-color"], answer:1},
    {q:"Make text bold?", options:["text-bold","font-weight","weight"], answer:1},
    {q:"Center align text?", options:["center","text-align","align"], answer:1},
    {q:"Margin is?", options:["Inner space","Outer space","Border"], answer:1},
    {q:"Padding is?", options:["Outer space","Border","Inner space"], answer:2},
    {q:"Responsive design uses?", options:["PHP","Media Query","SQL"], answer:1}
];

let jsQuestions = [
    {q:"JavaScript is used for?", options:["Styling","Logic & Interaction","Database"], answer:1},
    {q:"JS file extension?", options:[".java",".js",".css"], answer:1},
    {q:"Popup alert function?", options:["show()","alert()","msg()"], answer:1},
    {q:"Print to console?", options:["echo()","print()","console.log()"], answer:2},
    {q:"Variable declaration?", options:["style","let","tag"], answer:1},
    {q:"Condition statement?", options:["html","if","for"], answer:1},
    {q:"Loop example?", options:["img","for","css"], answer:1},
    {q:"Get element by ID?", options:["fetchId()","getElementById()","query()"], answer:1},
    {q:"Browser storage?", options:["Photoshop","localStorage","MySQL"], answer:1},
    {q:"Single line comment?", options:["##","//","&lt;!--"], answer:1}
];


let current = 0;
let userAnswers = [];
let questions = [];

function loadQuestion() {
    if (!document.getElementById("questionText")) return;

    document.getElementById("qNo").innerText = `Question ${current + 1} / ${questions.length}`;
    document.getElementById("questionText").innerText = questions[current].q;

    let html = "";
    questions[current].options.forEach((opt, index) => {
        html += `
            <label>
                <input type="radio" name="option" value="${index}">
                ${opt}
            </label><br><br>
        `;
    });
    document.getElementById("optionsBox").innerHTML = html;
}

function nextQuestion() {
    let selected = document.querySelector('input[name="option"]:checked');
    if (selected) userAnswers[current] = Number(selected.value);

    if (current < questions.length - 1) {
        current++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (current > 0) {
        current--;
        loadQuestion();
    }
}

function submitExam() {
    let selected = document.querySelector('input[name="option"]:checked');
    if (selected) userAnswers[current] = Number(selected.value);

    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] == questions[i].answer) score++;
    }

    // Save data for result page
    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem("subject", new URLSearchParams(window.location.search).get("subject") || "html");

    window.location.href = "result.html";
}


window.onload = function () {
// Auto redirect if already logged in
    if (localStorage.getItem("isLogin") === "true") {
    if (window.location.pathname.includes("login.html") || 
        window.location.pathname.includes("register.html") || 
        window.location.pathname.includes("index.html")) {
        window.location.href = "dashboard.html";
    }
}
    // Result Page
    if (document.getElementById("scoreText")) {
        let marks = localStorage.getItem("score") || 0;
        let total = localStorage.getItem("total") || 0;
        document.getElementById("scoreText").innerText = `Your Score: ${marks} / ${total}`;
        document.getElementById("statusText").innerText = marks >= total/2 ? "Status: Pass" : "Status: Fail";
    }


if (document.getElementById("reviewContainer")) {
    let marks = parseInt(localStorage.getItem("score")) || 0;
    let total = parseInt(localStorage.getItem("total")) || 10;
    let userAns = JSON.parse(localStorage.getItem("userAnswers") || "[]");
    let qList = JSON.parse(localStorage.getItem("questions") || "[]");

    document.getElementById("scoreText").innerText = 
        `Your Score: ${marks} / ${total} (${Math.round(marks/total*100)}%)`;

    let html = "";

    qList.forEach((q, i) => {
        let userIndex = userAns[i];
        let userChoice = (userIndex !== undefined && userIndex !== null) 
                        ? q.options[userIndex] 
                        : "Not Attempted";

        let correctAns = q.options[q.answer];

        let isCorrect = (userIndex == q.answer);

        html += `
            <div class="question-review ${isCorrect ? 'correct' : 'wrong'}">
                <p><strong>Q${i+1}:</strong> ${q.q}</p>
                <p><strong>Your Answer:</strong> 
                    <span style="color: ${isCorrect ? '#4caf50' : '#f44336'}; font-weight:500;">
                        ${userChoice}
                    </span>
                </p>
                <p><strong>Correct Answer:</strong> 
                    <span style="color:#4caf50; font-weight:500;">
                        ${correctAns}
                    </span>
                </p>
            </div>
        `;
    });

    document.getElementById("reviewContainer").innerHTML = html;
}
    // Exam Page
    if (document.getElementById("questionText")) {
        let params = new URLSearchParams(window.location.search);
        let subject = params.get("subject");

        if (subject === "html") questions = htmlQuestions;
        else if (subject === "css") questions = cssQuestions;
        else questions = jsQuestions;

        current = 0;
        userAnswers = [];
        loadQuestion();

        let time = 60;
        setInterval(() => {
            time--;
            if (document.getElementById("timer")) {
                document.getElementById("timer").innerText = time;
            }
            if (time <= 0) submitExam();
        }, 1000);
    }
};
function restartExam() {
    localStorage.removeItem("score");
    localStorage.removeItem("userAnswers");
    localStorage.removeItem("questions");
    window.location.href = "dashboard.html";
}