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
    // Default quotes
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
const categoryFilter = document.getElementById("categoryFilter");

// -----------------------
// Quote Functions
// -----------------------

// Show a random quote (respects current filter)
function showRandomQuote() {
  const selectedCategory = categoryFilter.value;
  const pool = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category.toLowerCase() === selectedCategory.toLowerCase());

  if (pool.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes found for this category.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  const randomQuote = pool[randomIndex];

  quoteDisplay.innerHTML = `
    <blockquote>
      <p>"${randomQuote.text}"</p>
      <footer>- ${randomQuote.category}</footer>
    </blockquote>
  `;

  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// Add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText && newCategory) {
    quotes.push({ text: newText, category: newCategory });
    saveQuotes();

    // Update category filter if new category
    populateCategories();

    // Display the newly added quote
    quoteDisplay.innerHTML = `
      <blockquote>
        <p>"${newText}"</p>
        <footer>- ${newCategory}</footer>
      </blockquote>
    `;

    sessionStorage.setItem("lastQuote", JSON.stringify({ text: newText, category: newCategory }));

    // Clear input fields
    textInput.value = "";
    categoryInput.value = "";
  }
}

// -----------------------
// Category Filtering
// -----------------------

// ✅ Populate categories dynamically in dropdown
function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))].sort();
  
  // Save current selection
  const current = categoryFilter.value;

  // Clear dropdown except "All"
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category if exists
  const savedCategory = localStorage.getItem("lastSelectedCategory") || current;
  categoryFilter.value = savedCategory;
}

// ✅ Filter quotes based on selected category
function filterQuotes() {
  const selected = categoryFilter.value;
  localStorage.setItem("lastSelectedCategory", selected);
  showRandomQuote();
}

// -----------------------
// JSON Export / Import
// -----------------------
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

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// -----------------------
// Initialization
// -----------------------
function init() {
  loadQuotes();
  populateCategories();

  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);
  exportBtn.addEventListener("click", exportToJsonFile);
  importFile.addEventListener("change", importFromJsonFile);
  categoryFilter.addEventListener("change", filterQuotes);

  // Restore last viewed quote if available
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

init();
