const form = document.getElementById('noteForm');
const notesDiv = document.getElementById('notes');

async function fetchNotes() {
  const res = await fetch('/api/notes');
  const notes = await res.json();
  notesDiv.innerHTML = notes.map(note => `
    <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${note.title}</h5>
          <p class="card-text">${note.content}</p>
        </div>
      </div>
    </div>
  `).join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  form.reset();
  fetchNotes();
});

// Initial load
fetchNotes();