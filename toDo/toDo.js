const form = document.querySelector(".form"),
    button = document.querySelector(".button"),
    taskForm = document.querySelector(".taskForm"),
    taskInput = document.querySelector(".taskInput"),
    taskButton = document.querySelector(".taskButton"),
    toList = document.querySelector(".toList");

function logOut() {
    fetch(`https://api-nodejs-todolist.herokuapp.com/user/logout`, {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
           "Authorization":  `Bearer ${localStorage.getItem("token")}`,
        },
    }).then(data => {
        if (data.ok) {
            return data.json();
        }
    }).then(data => {
        (location.pathname = "Rafo/js/Lessons__RaFo/login/login.html"), // .... another link
          localStorage.removeItem("token");
        console.log(data);
    })
};

function addTask() {
    fetch(`https://api-nodejs-todolist.herokuapp.com/task`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }, 
        body: JSON.stringify({ 
            "description": taskInput.value,
        })
    }).then(data => {
        if (data.ok) {
            return data.json();
        }
    }).then(data => {
        getTask(data);
    })
	
};

function putTask(id) {
    fetch(`https://api-nodejs-todolist.herokuapp.com/task/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            completed: true,
        })
    }).then(data => {
        return data.json();
    }).then(data => {
        getTask(data);	
    })
};

function dellTask(id) {
    fetch(`https://api-nodejs-todolist.herokuapp.com/task/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    }).then(data => {
        return data.json();
    }).then(data => {
        getTask(data);
    })
};

function getTask() {
    fetch(`https://api-nodejs-todolist.herokuapp.com/task`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    }).then(data => {
        if (data.ok) {
            return data.json();
        }
    }).then(data => {
        console.log(data);
        toList.innerHTML = data.data.map(e => {
            return `<p class=${e.completed ? "true" : "false"} data-id=${e._id}>${e.description}</p>
           		    <button data-id=${e._id}>Delete</button>
			`}).join("");
    }).catch(error => console.log(error));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  logOut();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

toList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const taskId = e.target.getAttribute("data-id");
        console.log(taskId);
        dellTask(taskId);
    }
    if (e.target.tagName === "P") {
        const putId = e.target.getAttribute("data-id");
        putTask(putId);
		console.log(putId);
    } 
});

getTask();