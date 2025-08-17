// -----------------------
// Quotes State Management
// -----------------------
let quotes = [];

// -----------------------
// Local Storage Helpers
// -----------------------
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    // Default quotes if none saved
    quotes = [
      { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
      { text: "What we know is a drop; what we don’t is an ocean.", category: "Wisdom" },
      { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Humor" },
      { text: "First, solve the problem. Then, write the code.", category: "Engineering" },
      { text: "Stay hungry, stay foolish.", category: "Inspiration" }
    ];
    saveQuotes();
  }
}

// -----------------------
// DOM Elements
// -----------------------
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");

// -----------------------
// Quote Functions
// -----------------------

// ✅ showRandomQuote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Update DOM using innerHTML
  quoteDisplay.innerHTML = `
    <blockquote>
      <p>"${randomQuote.text}"</p>
      <footer>- ${randomQuote.category}</footer>
    </blockquote>
  `;

  // Save last viewed quote to sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// ✅ addQuote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText && newCategory) {
    quotes.push({ text: newText, category: newCategory });
    saveQuotes(); // Save to localStorage

    // Update DOM with the new quote
    quoteDisplay.innerHTML = `
      <blockquote>
        <p>"${newText}"</p>
        <footer>- ${newCategory}</footer>
      </blockquote>
    `;

    // Save this new quote as last viewed in sessionStorage
    sessionStorage.setItem("lastQuote", JSON.stringify({ text: newText, category: newCategory }));

    // Clear input fields
    textInput.value = "";
    categoryInput.value = "";
  }
}

// -----------------------
// JSON Export / Import
// -----------------------

// ✅ exportToJsonFile
function exportToJsonFile() {
  const jsonData = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// ✅ importFromJsonFile
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// -----------------------
// Initialization
// -----------------------
function init() {
  loadQuotes(); // Load from localStorage

  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);
  exportBtn.addEventListener("click", exportToJsonFile);
  importFile.addEventListener("change", importFromJsonFile);

  // Load last viewed quote if available in sessionStorage
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    const q = JSON.parse(lastQuote);
    quoteDisplay.innerHTML = `
      <blockquote>
        <p>"${q.text}"</p>
        <footer>- ${q.category}</footer>
      </blockquote>
    `;
  } else {
    showRandomQuote();
  }
}

// Run the app
init();
