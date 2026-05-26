// ============================================
// STATE
// ============================================

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let activeNoteId = null;
let searchQuery = "";


// ============================================
// SELECTORS
// ============================================

const newNoteBtn    = document.querySelector("#new-note-btn");
const searchInput   = document.querySelector("#search-input");
const noteList      = document.querySelector("#note-list");
const notesCount    = document.querySelector("#notes-count");
const emptyEditor   = document.querySelector("#empty-editor");
const noteEditor    = document.querySelector("#note-editor");
const titleInput    = document.querySelector("#title-input");
const bodyInput     = document.querySelector("#body-input");
const noteDate      = document.querySelector("#note-date");
const deleteNoteBtn = document.querySelector("#delete-note-btn");
const layout        = document.querySelector(".layout");


// ============================================
// HELPERS
// ============================================

const saveNotes = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString("en", {
    month: "short",
    day:   "numeric",
    year:  "numeric",
    hour:  "2-digit",
    minute:"2-digit",
  });
};

const getPreview = (text) => {
  if (!text) return "No content";
  return text.replace(/\n/g, " ").slice(0, 60);
};


// ============================================
// RENDER SIDEBAR LIST
// ============================================

const renderList = () => {
  const filtered = notes.filter(note => {
    const q = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(q) ||
      note.body.toLowerCase().includes(q)
    );
  });

  noteList.innerHTML = "";

  filtered.forEach(note => {
    const li = document.createElement("li");
    li.classList.add("note-item");
    li.dataset.id = note.id;

    if (note.id === activeNoteId) {
      li.classList.add("active");
    }

    li.innerHTML = `
      <div class="item-title">${note.title || "Untitled"}</div>
      <div class="item-preview">${getPreview(note.body)}</div>
      <div class="item-date">${formatDate(note.updatedAt)}</div>
    `;

    noteList.appendChild(li);
  });

  const total = notes.length;
  notesCount.textContent = `${total} ${total === 1 ? "note" : "notes"}`;
};


// ============================================
// OPEN A NOTE IN THE EDITOR
// ============================================

const openNote = (id) => {
  activeNoteId = id;

  const note = notes.find(n => n.id === id);
  if (!note) return;

  emptyEditor.style.display  = "none";
  noteEditor.style.display   = "flex";

  titleInput.value = note.title;
  bodyInput.value  = note.body;
  noteDate.textContent = `Edited ${formatDate(note.updatedAt)}`;

  layout.classList.add("note-open");

  renderList();
};


// ============================================
// CREATE A NEW NOTE
// ============================================

const createNote = () => {
  const newNote = {
    id:        Date.now(),
    title:     "",
    body:      "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  notes.unshift(newNote);   // add to the TOP of the array
  saveNotes();
  renderList();
  openNote(newNote.id);

  titleInput.focus();
};


// ============================================
// UPDATE THE ACTIVE NOTE
// Called on every keystroke in title or body
// ============================================

const updateNote = () => {
  if (!activeNoteId) return;

  notes = notes.map(note => {
    if (note.id !== activeNoteId) return note;

    return {
      ...note,
      title:     titleInput.value,
      body:      bodyInput.value,
      updatedAt: new Date().toISOString(),
    };
  });

  saveNotes();
  renderList();

  const updated = notes.find(n => n.id === activeNoteId);
  if (updated) {
    noteDate.textContent = `Edited ${formatDate(updated.updatedAt)}`;
  }
};


// ============================================
// DELETE THE ACTIVE NOTE
// ============================================

const deleteNote = () => {
  if (!activeNoteId) return;

  const confirmed = window.confirm("Delete this note?");
  if (!confirmed) return;

  notes = notes.filter(n => n.id !== activeNoteId);
  activeNoteId = null;

  saveNotes();
  renderList();

  emptyEditor.style.display = "flex";
  noteEditor.style.display  = "none";
  layout.classList.remove("note-open");
};


// ============================================
// EVENT LISTENERS
// ============================================

newNoteBtn.addEventListener("click", createNote);

deleteNoteBtn.addEventListener("click", deleteNote);

titleInput.addEventListener("input", updateNote);
bodyInput.addEventListener("input", updateNote);

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderList();
});

noteList.addEventListener("click", (e) => {
  const item = e.target.closest(".note-item");
  if (!item) return;
  openNote(Number(item.dataset.id));
});


// ============================================
// INIT
// ============================================

renderList();

if (notes.length > 0) {
  openNote(notes[0].id);
}