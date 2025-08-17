// ------- Data & State -------
const initialQuotes = [
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
  { text: "What we know is a drop; what we don’t is an ocean.", category: "Wisdom" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Humor" },
  { text: "First, solve the problem. Then, write the code.", category: "Engineering" },
  { text: "Stay hungry, stay foolish.", category: "Inspiration" },
];

const state = {
  quotes: [...initialQuotes],
  categories: new Set(initialQuotes.map(q => q.category)),
  currentCategory: "__all__", // "__all__" means no filter
};

// ------- DOM refs -------
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const controlsMount = document.getElementById("controlsMount");
const formMount = document.getElementById("formMount");

// ------- Utilities -------
const byCategory = (category) =>
  category === "__all__"
    ? state.quotes
    : state.quotes.filter(q => q.category.toLowerCase() === category.toLowerCase());

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createEl(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === "dataset") Object.entries(v).forEach(([dk, dv]) => (el.dataset[dk] = dv));
    else if (k in el) el[k] = v;
    else el.setAttribute(k, v);
  });
  children.forEach(child => {
    if (child == null) return;
    if (typeof child === "string") el.appendChild(document.createTextNode(child));
    else el.appendChild(child);
  });
  return el;
}

// ------- UI Builders -------
function buildCategoryFilter() {
  // Label + Select with DocumentFragment for perf
  const frag = document.createDocumentFragment();
  const label = createEl("label", { htmlFor: "categorySelect" }, "Category:");
  const select = createEl("select", { id: "categorySelect", name: "categorySelect" });

  // Options
  const allOpt = createEl("option", { value: "__all__", selected: true }, "All");
  select.appendChild(allOpt);
  [...state.categories].sort().forEach(cat => {
    select.appendChild(createEl("option", { value: cat }, cat));
  });

  select.addEventListener("change", () => {
    state.currentCategory = select.value;
    showRandomQuote(); // refresh display to reflect filter
  });

  frag.appendChild(label);
  frag.appendChild(select);

  // Mount next to the Show button (keeps HTML clean)
  controlsMount.insertBefore(frag, newQuoteBtn.nextSibling);
}

function createAddQuoteForm() {
  // Dynamic, no inline handlers; separation of concerns
  const form = createEl("form", { id: "addQuoteForm", novalidate: true, ariaLabel: "Add new quote" });

  const quoteLabel = createEl("label", { htmlFor: "newQuoteText" }, "Quote text");
  const quoteInput = createEl("input", {
    id: "newQuoteText",
    type: "text",
    placeholder: "Enter a new quote",
    required: true,
    maxLength: 240,
    autocomplete: "off"
  });

  const catLabel = createEl("label", { htmlFor: "newQuoteCategory" }, "Category");
  const catInput = createEl("input", {
    id: "newQuoteCategory",
    type: "text",
    placeholder: "Enter quote category",
    required: true,
    maxLength: 40,
    autocomplete: "off"
  });

  const status = createEl("div", { id: "formStatus", className: "muted", role: "status", "aria-live": "polite" });
  const addBtn = createEl("button", { type: "submit" }, "Add Quote");

  form.append(
    quoteLabel, quoteInput,
    catLabel, catInput,
    addBtn,
    status
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addQuote(quoteInput.value, catInput.value, status);
  });

  formMount.appendChild(form);
}

// ------- Behaviors -------
function renderQuote(quote) {
  // Clear & render semantic quote
  quoteDisplay.replaceChildren();
  if (!quote) {
    quoteDisplay.appendChild(createEl("p", {}, "No quotes found for this category."));
    return;
  }

  const block = createEl("blockquote");
  block.appendChild(createEl("p", {}, `“${quote.text}”`));
  block.appendChild(createEl("footer", { className: "muted" }, `— ${quote.category}`));
  quoteDisplay.appendChild(block);
}

function showRandomQuote() {
  const pool = byCategory(state.currentCategory);
  renderQuote(pool.length ? randomItem(pool) : null);
}

function addQuote(text, category, statusEl) {
  const t = (text || "").trim();
  const c = (category || "").trim();

  if (!t || !c) {
    statusEl.textContent = "Both quote and category are required.";
    statusEl.classList.add("error");
    return;
  }

  // Update data
  state.quotes.push({ text: t, category: c });
  if (!state.categories.has(c)) {
    state.categories.add(c);
    appendCategoryOption(c);
  }

  statusEl.textContent = `Added quote to “${c}”.`;
  statusEl.classList.remove("error");
  
  const form = document.getElementById("addQuoteForm");
  form.reset();

  if (state.currentCategory === "__all__" || state.currentCategory.toLowerCase() === c.toLowerCase()) {
    renderQuote({ text: t, category: c });
  }
}

function appendCategoryOption(cat) {
  const select = document.getElementById("categorySelect");
  const exists = [...select.options].some(o => o.value.toLowerCase() === cat.toLowerCase());
  if (!exists) {
    // Insert keeping alphabetical order after "All"
    const option = createEl("option", { value: cat }, cat);
    const options = [...select.options].slice(1); // skip "All"
    const idx = options.findIndex(o => o.text.toLowerCase() > cat.toLowerCase());
    if (idx === -1) {
      select.appendChild(option);
    } else {
      select.insertBefore(option, select.options[idx + 1]); // +1 accounts for "All"
    }
  }
}


(function init() {
  buildCategoryFilter();
  createAddQuoteForm();
  newQuoteBtn.addEventListener("click", showRandomQuote);
  showRandomQuote(); 
})();
