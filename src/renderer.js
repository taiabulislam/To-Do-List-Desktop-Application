
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats() {
  const completed = tasks.filter(task => task.done).length;

  document.getElementById("total").textContent = tasks.length;
  document.getElementById("completed").textContent = completed;
  document.getElementById("pending").textContent =
    tasks.length - completed;
}

function renderTasks() {
  taskList.innerHTML = "";

  emptyMessage.style.display =
    tasks.length === 0 ? "block" : "none";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const name = document.createElement("span");
    name.className = "task-name" + (task.done ? " done" : "");
    name.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";

    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter(item => item.id !== task.id);
      saveTasks();
      renderTasks();
    });

    li.append(checkbox, name, deleteButton);
    taskList.appendChild(li);
  });

  updateStats();
}

taskForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") return;

  tasks.push({
    id: Date.now(),
    text: text,
    done: false
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
});

renderTasks();
