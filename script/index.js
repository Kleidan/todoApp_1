
const tasksContainer = document.getElementById('tasks');
const taskTemplate = document.getElementById('taskTemplate');
const addBtn = document.getElementById('add');

let tasks = getTasks();

// Get items from local storage, if there are no items saved, get an empty array
function getTasks() {
  const storageValue = localStorage.getItem('todo') || '[]';

  // convert JSON to javaScript array
  return JSON.parse(storageValue);
}
console.log(tasks);

// save items to local storage
function setTasks(tasks) {
  const tasksJson = JSON.stringify(tasks);

  localStorage.setItem('todo', tasksJson);
}

// add new task item to the list
function addTask() {
  tasks.unshift({
    content: '',
    completed: false
  });

  // push the item into the storage
  setTasks(tasks);

  // refresh and render the list for the user
  renderTasks();
}

// save data from input fields
function updateTask(task, key, value) { // (todoitem, what  key to update, new value)
  task[key] = value;
  setTasks(tasks);
  renderTasks();
}

// render tasks to the user
function renderTasks() {
  // sort tasks by done and by alphabet
  tasks.sort((a, b) => {
    if (a.completed) {
      return 1;
    } else if (b.completed) {
      return -1;
    }

    return a.content < b.content ? -1 : 1;
  });

  // clear list
  tasksContainer.innerHTML = '';

  for (const task of tasks) {
    // copy the div inside the HTML template to create a task
    const taskElement = taskTemplate.content.cloneNode(true);

    // get the elements from the template
    const taskContent = taskElement.querySelector('.item-content');
    const doneTask = taskElement.querySelector('.item-done');

    // save changes to storage
    taskContent.addEventListener('change', () => {
      updateTask(task, "content", taskContent.value);
    });

    doneTask.addEventListener('click', () => {
      updateTask(task, "completed", doneTask.checked);
    });

    taskContent.value = task.content;
    doneTask.checked = task.completed;

    tasksContainer.appendChild(taskElement);
  }
}

// Add button event listener to create a new task item
addBtn.addEventListener('click', () => {
  addTask();
});

renderTasks();