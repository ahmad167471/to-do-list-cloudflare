const API_BASE = 'https://todo-api.ahmad167471.workers.dev/api';

const list = document.getElementById('todo-list');
const input = document.getElementById('task-input');

// Load all todos from Worker
async function loadTodos() {
  try {
    const res = await fetch(API_BASE, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error(`Failed to load: ${res.statusText}`);
    const todos = await res.json();
    renderTodos(todos);
  } catch (err) {
    console.error(err);
    list.innerHTML = '<p class="empty">Cannot connect to API</p>';
  }
}

// Render todos in the list
function renderTodos(todos) {
  list.innerHTML = '';
  if (!todos || todos.length === 0) {
    list.innerHTML = '<p class="empty">No tasks yet. Add one!</p>';
    return;
  }

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${escapeHtml(todo.text)}</span>
      <button class="delete-btn" onclick="deleteTask('${todo.id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

// Escape HTML to prevent XSS
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Add a new task
async function addTask() {
  const text = input.value.trim();
  if (!text) return;

  try {
    // Make sure we send a proper JSON object
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })  // <-- must be an object
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to add task: ${errText}`);
    }

    input.value = '';
    loadTodos(); // refresh list
  } catch (err) {
    console.error(err);
    alert('Error adding task. Check console for details.');
  }
}

// Delete a task
async function deleteTask(id) {
  if (!id) return;
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Failed to delete task: ${res.statusText}`);
    loadTodos(); // refresh list
  } catch (err) {
    console.error(err);
    alert('Error deleting task. Check console for details.');
  }
}

// Support Enter key to add task
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

// Load todos on page load
loadTodos();