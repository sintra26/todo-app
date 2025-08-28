// Load tasks from localStorage or start with empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Get DOM elements
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');

// Display tasks on page load
tasks.forEach((task, index) => renderTask(task, index));

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const task = { text: taskText, completed: false };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTask(task, tasks.length - 1);
  taskInput.value = '';
}

function renderTask(task, index) {
  const li = document.createElement('li');
  li.textContent = task.text;
  if (task.completed) li.classList.add('completed');

  // Toggle complete on click
  li.addEventListener('click', () => {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    li.classList.toggle('completed');
  });

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent toggling completed
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskList.innerHTML = '';
    tasks.forEach((t, i) => renderTask(t, i));
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}
