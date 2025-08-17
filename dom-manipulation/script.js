// Quotes data
let quotes = [
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
  { text: "What we know is a drop; what we don’t is an ocean.", category: "Wisdom" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Humor" },
  { text: "First, solve the problem. Then, write the code.", category: "Engineering" },
  { text: "Stay hungry, stay foolish.", category: "Inspiration" },
];

// Select DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Function: Display random quote
function displayRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <blockquote>
      <p>“${quote.text}”</p>
      <footer>— ${quote.category}</footer>
    </blockquote>
  `;
}

// Function: Add new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both quote and category.");
    return;
  }

  // Add to quotes array
  quotes.push({ text, category });

  // Update display
  quoteDisplay.innerHTML = `
    <blockquote>
      <p>“${text}”</p>
      <footer>— ${category}</footer>
    </blockquote>
  `;

  // Reset form
  textInput.value = "";
  categoryInput.value = "";
}

// Event listener for "Show New Quote"
newQuoteBtn.addEventListener("click", displayRandomQuote);

// Initial render
displayRandomQuote();
