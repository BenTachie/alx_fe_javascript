// -----------------------
// Server Sync Simulation
// -----------------------

// Mock API endpoint (can use JSONPlaceholder or a local mock)
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // example endpoint

// Fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    if (!response.ok) throw new Error("Network response was not ok");

    const serverData = await response.json();

    // Transform server data to match local quote structure if needed
    const serverQuotes = serverData.map(item => ({
      text: item.title || item.body || "Untitled Quote",
      category: item.category || "General"
    }));

    return serverQuotes;
  } catch (error) {
    console.error("Error fetching quotes from server:", error);
    return [];
  }
}

// Post local quotes to the server (simulation)
async function postQuotesToServer(quotesToPost) {
  try {
    await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quotesToPost)
    });
  } catch (error) {
    console.error("Error posting quotes to server:", error);
  }
}

// -----------------------
// Sync Logic & Conflict Resolution
// -----------------------
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();

  // Simple conflict resolution: server data takes precedence
  const combinedQuotes = [...serverQuotes];

  // Add local quotes that do not exist on the server
  quotes.forEach(localQuote => {
    if (!serverQuotes.some(sq => sq.text === localQuote.text && sq.category === localQuote.category)) {
      combinedQuotes.push(localQuote);
    }
  });

  // Update local state and storage
  quotes = combinedQuotes;
  saveQuotes();
  populateCategories();

  // Notify the user
  alert("Quotes synced with server successfully!");
}

// -----------------------
// Periodic Sync
// -----------------------
function startPeriodicSync(intervalMs = 60000) {
  setInterval(syncQuotes, intervalMs); // sync every interval (default 60s)
}

init();
startPeriodicSync(60000); // Sync every 60 seconds
