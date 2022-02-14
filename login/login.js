const form = document.querySelector(".form"),
    email = document.querySelector(".email"),
    password = document.querySelector(".password"),
    button = document.querySelector(".button");

function loginUser() {
    fetch(`https://api-nodejs-todolist.herokuapp.com/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }) 
    }).then(data => {
        if (data.ok) {
          location.pathname = "Rafo/js/Lessons__RaFo/toDo/toDo.html"; // .... another link
          return data.json();
        };
        return Promise.reject();
    }).then(data => {
        localStorage.setItem("token", data.token);
    })
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    loginUser();
});