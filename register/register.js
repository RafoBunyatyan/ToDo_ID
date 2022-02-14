const form = document.querySelector(".form"),
    text = document.querySelector(".text"),
    email = document.querySelector(".email"),
    password = document.querySelector(".password"),
    age = document.querySelector(".age"),
    button = document.querySelector(".button");

function registerUser() {
    fetch(`https://api-nodejs-todolist.herokuapp.com/user/register`, {
        method: "POST",
        headers:  {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
            name: text.value,
            email: email.value,
            password: password.value,
            age: age.value,
        })
    }).then(data => {
        if (data.ok) {
          location.pathname = "Rafo/js/Lessons__RaFo/login/login.html"; // .... another link
          return data.json();
        }
        return Promise.reject();
    }).then(data => {
        console.log(data.token); 
        localStorage.setItem("token", data.token)});
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    registerUser();
});