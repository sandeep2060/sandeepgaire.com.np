const notes = [
  {
    title: "HTML Basics",
    subject: "Web Development",
    file: "#"
  },
  {
    title: "CSS Flexbox & Grid",
    subject: "Web Design",
    file: "#"
  },
  {
    title: "JavaScript Fundamentals",
    subject: "Programming",
    file: "#"
  },
  {
    title: "Computer Network Notes",
    subject: "Networking",
    file: "#"
  }
];

const container = document.getElementById("notesContainer");
const searchInput = document.getElementById("search");

function displayNotes(filter = "") {
  container.innerHTML = "";

  notes
    .filter(note =>
      note.title.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach(note => {
      container.innerHTML += `
        <div class="note-card">
          <i class="fas fa-file-pdf"></i>
          <h3>${note.title}</h3>
          <p>${note.subject}</p>
          <a href="${note.file}" target="_blank">
            <i class="fas fa-download"></i> View / Download
          </a>
        </div>
      `;
    });
}

searchInput.addEventListener("input", e => {
  displayNotes(e.target.value);
});

displayNotes();
