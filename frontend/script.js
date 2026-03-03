const API_BASE = '/api';   // same domain → /api → goes to Worker via route

const list = document.getElementById('todo-list');
const input = document.getElementById('task-input');

async function loadTodos() {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error('Failed to load');
    const todos = await res.json();
    renderTodos(todos);
  } catch (err) {
    console.error(err);
    list.innerHTML = '<p class="empty">Cannot connect to API</p>';
  }
}

function renderTodos(todos) {
  list.innerHTML = '';
  if (todos.length === 0) {
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

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function addTask() {
  const text = input.value.trim();
  if (!text) return;

  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('Failed to add');
    input.value = '';
    loadTodos();
  } catch (err) {
    alert('Error adding task');
  }
}

async function deleteTask(id) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete');
    loadTodos();
  } catch (err) {
    alert('Error deleting task');
  }
}

// Enter key support
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

// Initial load
loadTodos();