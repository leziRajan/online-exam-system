// ================== AUTH FUNCTIONS ==================
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

// ================== QUESTIONS ==================
let htmlQuestions = [
    {q:"HTML stands for?", options:["Hyper Text Markup Language","High Tool Machine Language","Home Text Markup"], answer:0},
    {q:"HTML paragraph tag is?", options:["&lt;p&gt;","&lt;h1&gt;","&lt;img&gt;"], answer:1},
    {q:"HTML image tag is?", options:["&lt;img&gt;","&lt;image&gt;","&lt;pic&gt;"], answer:0},
    {q:"HTML heading largest tag?", options:["&lt;h1&gt;","&lt;h6&gt;","&lt;head&gt;"], answer:0},
    {q:"HTML link tag uses?", options:["&lt;a&gt;","&lt;linker&gt;","&lt;href&gt;"], answer:0},
    {q:"Line break tag?", options:["&lt;br&gt;","&lt;break&gt;","&lt;lb&gt;"], answer:0},
    {q:"HTML file extension?", options:[".html",".css",".js"], answer:0},
    {q:"Ordered list tag?", options:["&lt;ol&gt;","&lt;ul&gt;","&lt;li&gt;"], answer:0},
    {q:"Table row tag?", options:["&lt;tr&gt;","&lt;td&gt;","&lt;th&gt;"], answer:0},
    {q:"Form input tag?", options:["&lt;input&gt;","&lt;type&gt;","&lt;textbox&gt;"], answer:0}
];

let cssQuestions = [
    {q:"CSS stands for?", options:["Cascading Style Sheets","Creative Style Sheets","Colorful Style System"], answer:0},
    {q:"CSS used for?", options:["Styling","Database","Hosting"], answer:0},
    {q:"CSS file extension?", options:[".css",".html",".js"], answer:0},
    {q:"Change text color property?", options:["color","font-color","text-style"], answer:0},
    {q:"Background color property?", options:["background-color","bgcolor","back-color"], answer:0},
    {q:"Make text bold?", options:["font-weight","text-bold","weight"], answer:0},
    {q:"Center text property?", options:["text-align","align-text","center"], answer:0},
    {q:"Margin means?", options:["Outer space","Inner space","Text size"], answer:0},
    {q:"Padding means?", options:["Inner space","Outer space","Border"], answer:0},
    {q:"Responsive design uses?", options:["Media Query","SQL","PHP"], answer:0}
];

let jsQuestions = [
    {q:"JavaScript used for?", options:["Logic","Styling","Database"], answer:0},
    {q:"JS file extension?", options:[".js",".css",".java"], answer:0},
    {q:"Popup function?", options:["alert()","show()","msg()"], answer:0},
    {q:"Print in console?", options:["console.log()","print()","echo()"], answer:0},
    {q:"Variable keyword?", options:["let","style","tag"], answer:0},
    {q:"Condition statement?", options:["if","for","html"], answer:0},
    {q:"Loop example?", options:["for","img","css"], answer:0},
    {q:"Get element by id?", options:["getElementById()","queryStyle()","fetchId()"], answer:0},
    {q:"Store data in browser?", options:["localStorage","MySQL","Photoshop"], answer:0},
    {q:"Comment symbol single line?", options:["//","##","&lt;!--"], answer:0}
];

// ================== EXAM SYSTEM ==================
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

    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);
    window.location.href = "result.html";
}

// ================== PAGE LOAD ==================
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