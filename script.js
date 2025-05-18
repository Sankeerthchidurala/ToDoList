// Load tasks from localStorage or start empty
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save a new task
function saveData() {
  const input = document.getElementById("task_name");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task name.");
    return;
  }

  tasks.push({ name: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  displayTasks();
}

// Clear all tasks
function clearData() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    localStorage.removeItem("tasks");
    displayTasks();
  }
}

// Delete a specific task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// Toggle task completed status
function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// Display the task list
function displayTasks() {
  const showUsers = document.getElementById("showUsers");
  showUsers.innerHTML = "";

  if (tasks.length === 0) {
    showUsers.innerHTML = "<p>No tasks available.</p>";
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "list-group";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.style.marginRight = "10px";
    checkbox.onchange = () => toggleCompleted(index);

    const span = document.createElement("span");
    span.textContent = task.name;
    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.color = "gray";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn btn-danger btn-xs pull-right";
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });

  showUsers.appendChild(ul);
}

// Initial load
displayTasks();
