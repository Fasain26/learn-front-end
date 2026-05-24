// ============================================
// STATE
// The single source of truth for our app.
// All UI is derived from this array.
// ============================================

// Load from localStorage on startup — if nothing saved yet, start with empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Track which filter is active: "all" | "active" | "completed"
let currentFilter = "all";


// ============================================
// SELECTORS
// Grab all DOM elements we need once at the top
// ============================================

const todoInput   = document.querySelector("#todo-input");
const addBtn      = document.querySelector("#add-btn");
const todoList    = document.querySelector("#todo-list");
const counter     = document.querySelector("#counter");
const emptyState  = document.querySelector("#empty-state");
const filterBtns  = document.querySelectorAll(".filter-btn");


// ============================================
// SAVE TO LOCALSTORAGE
// Call this every time todos changes
// ============================================

const saveTodos = () => {
  // JSON.stringify converts the array to a string so localStorage can store it
  localStorage.setItem("todos", JSON.stringify(todos));
};


// ============================================
// RENDER
// The core function — wipes the list and rebuilds
// it from scratch based on current state.
// This is the same pattern React uses internally.
// ============================================

const render = () => {

  // 1. Filter the todos based on currentFilter
  const filtered = todos.filter(todo => {
    if (currentFilter === "active")    return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true; // "all" — show everything
  });

  // 2. Clear the current list
  todoList.innerHTML = "";

  // 3. Render each todo
  filtered.forEach(todo => {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    // If completed, add the completed class for strikethrough style
    if (todo.completed) {
      li.classList.add("completed");
    }

    // data-id stores the todo's unique id so event delegation can find it
    li.dataset.id = todo.id;

    li.innerHTML = `
      <button class="complete-btn" data-id="${todo.id}" aria-label="Toggle complete"></button>
      <span class="todo-text">${todo.text}</span>
      <button class="delete-btn" data-id="${todo.id}" aria-label="Delete todo">×</button>
    `;

    todoList.appendChild(li);
  });

  // 4. Update the counter — count todos that are NOT completed
  const remaining = todos.filter(t => !t.completed).length;
  counter.textContent = `${remaining} task${remaining !== 1 ? "s" : ""} left`;

  // 5. Show/hide the empty state message
  if (filtered.length === 0) {
    emptyState.classList.add("visible");
  } else {
    emptyState.classList.remove("visible");
  }
};


// ============================================
// ADD TODO
// ============================================

const addTodo = () => {
  const text = todoInput.value.trim(); // trim() removes leading/trailing spaces

  // Don't add empty todos
  if (!text) return;

  // Create a new todo object
  const newTodo = {
    id: Date.now(),      // unique id using timestamp — good enough for local apps
    text,                // shorthand for text: text
    completed: false,
  };

  // Add to state
  todos.push(newTodo);

  // Persist and re-render
  saveTodos();
  render();

  // Clear the input and focus it for the next entry
  todoInput.value = "";
  todoInput.focus();
};


// ============================================
// TOGGLE COMPLETE
// ============================================

const toggleTodo = (id) => {
  // Find the todo and flip its completed value
  todos = todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }  // spread + override completed
      : todo                                      // leave others untouched
  );

  saveTodos();
  render();
};


// ============================================
// DELETE TODO
// ============================================

const deleteTodo = (id) => {
  // Filter out the todo with this id
  todos = todos.filter(todo => todo.id !== id);

  saveTodos();
  render();
};


// ============================================
// EVENT LISTENERS
// ============================================

// Add button click
addBtn.addEventListener("click", addTodo);

// Press Enter in the input
todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTodo();
});

// EVENT DELEGATION — one listener on the list handles ALL clicks
// This works for dynamically created items too
todoList.addEventListener("click", (event) => {
  const { target } = event;

  // Get the id — dataset returns strings, so convert to number with Number()
  const id = Number(target.dataset.id);

  if (target.classList.contains("complete-btn")) {
    toggleTodo(id);
  }

  if (target.classList.contains("delete-btn")) {
    deleteTodo(id);
  }
});

// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Update active filter
    currentFilter = btn.dataset.filter;

    // Update active class — remove from all, add to clicked
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Re-render with new filter
    render();
  });
});


// ============================================
// INITIAL RENDER
// Run once when the page loads
// ============================================

render();