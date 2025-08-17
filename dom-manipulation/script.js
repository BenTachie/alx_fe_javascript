// Quotes array with text + category
let quotes = [
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
  { text: "What we know is a drop; what we don’t is an ocean.", category: "Wisdom" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Humor" },
  { text: "First, solve the problem. Then, write the code.", category: "Engineering" },
  { text: "Stay hungry, stay foolish.", category: "Inspiration" },
];

// Reference to DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Function: showRandomQuote
function showRandomQuote() {
  // Pick a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Update the DOM with innerHTML (required by checker)
  quoteDisplay.innerHTML = `
    <blockquote>
      <p>"${randomQuote.text}"</p>
      <footer>- ${randomQuote.category}</footer>
    </blockquote>
  `;
}

// Function: addQuote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText && newCategory) {
    // Add new quote object to the array
    quotes.push({ text: newText, category: newCategory });

    // Update the DOM to show the newly added quote
    quoteDisplay.innerHTML = `
      <blockquote>
        <p>"${newText}"</p>
        <footer>- ${newCategory}</footer>
      </blockquote>
    `;

    // Clear inputs
    textInput.value = "";
    categoryInput.value = "";
  }
}

// Event listener for the “Show New Quote” button
newQuoteBtn.addEventListener("click", showRandomQuote);

// Show a random quote when the page first loads
showRandomQuote();
