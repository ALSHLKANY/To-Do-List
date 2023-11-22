const input = document.querySelector(".input"),
  add = document.querySelector(".add"),
  tasksDiv = document.querySelector(".tasks");

// get tasks from localStorage and add them to the page
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
addTasksToPage(tasks);

add.onclick = function () {
  if (input.value !== "") {
    addTask(input.value);
    input.value = "";
  }
};

tasksDiv.addEventListener("click", (e) => {
  // remove task when click on delete
  if (e.target.classList.contains("del")) {
    deleteTask(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }

  // mark task as completed when click on it
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    toggleTaskStatus(e.target.getAttribute("data-id"));
  }
});

// add the new task to tasks array then update pagetasks & local storage
function addTask(inputText) {
  tasks.push({
    id: Date.now(),
    title: inputText,
    completed: false,
  });

  addTasksToPage(tasks);
  updateLocalStorage(tasks);
}

function addTasksToPage(tasks) {
  tasksDiv.innerHTML = "";
  tasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = task.completed ? "task done" : "task";
    div.setAttribute("data-id", task.id);
    div.innerHTML = `
      ${task.title}
      <span class='del'>Delete</span>
    `;

    tasksDiv.appendChild(div);
  });
}

function updateLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => {
    return task.id != taskId;
  });

  updateLocalStorage(tasks);
}

function toggleTaskStatus(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == taskId) {
      tasks[i].completed = !tasks[i].completed; // toggle Task Status
    }
  }

  updateLocalStorage(tasks);
}
