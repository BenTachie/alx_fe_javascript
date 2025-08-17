# 📝 Dynamic Quote Generator

Welcome to the **Dynamic Quote Generator** project! This web application allows users to generate, add, filter, and manage quotes dynamically with full **local storage**, **JSON import/export**, and **server syncing** capabilities. Perfect for exploring **advanced JavaScript**, **DOM manipulation**, and **data persistence**.  

---

## 🚀 Features

- **🎲 Dynamic Quote Display:**  
  Randomly show quotes from different categories with a single click.  

- **➕ Add New Quotes:**  
  Users can add quotes dynamically with a custom category.  

- **📂 Web Storage:**  
  - Local storage preserves quotes across browser sessions.  
  - Session storage remembers the last viewed quote.  

- **📑 JSON Import/Export:**  
  - Export all quotes to a `.json` file.  
  - Import quotes from a JSON file to restore or merge data.  

- **🔍 Category Filtering:**  
  - Filter quotes by category using a dynamic dropdown.  
  - Last selected filter is remembered across sessions.  

- **☁️ Server Sync & Conflict Resolution:**  
  - Simulate server fetch and post using a mock API.  
  - Conflicts are resolved (server data takes precedence).  
  - UI notifications alert users when data is synced or conflicts resolved.  

---

## 🛠️ Built With

- **HTML5** – Structured layout and semantic markup  
- **CSS3** – Responsive styling and user-friendly UI  
- **JavaScript (ES6+)** – Advanced DOM manipulation, events, and data handling  
- **Web Storage API** – Local and session storage for persistent data  
- **Fetch API** – Simulated server interactions  
- **JSON** – Import and export quote data  

---

## ⚡ Getting Started
```
1. Clone the repository
git clone https://github.com/your-username/alx_fe_javascript.git
cd alx_fe_javascript/dom-manipulation

2. Open the application
Simply open index.html in your browser.

No server required for local functionality.

3. Usage
Click Show New Quote to see a random quote.
Add a new quote using the form below the display area.
Filter quotes using the category dropdown.
Export quotes to JSON or import JSON files to manage your collection.
Quotes automatically sync with a simulated server every 60 seconds, with notifications for updates.
```

## 🧩 File Structure

dom-manipulation/
```
├── index.html       # Main HTML structure
├── script.js        # JavaScript logic for DOM, storage, filtering, server sync
└── README.md        # Project documentation
```

## 💡 Learning Outcomes
By completing this project, you will learn to:

- Manipulate the DOM dynamically with JavaScript
- Persist and retrieve data using localStorage and sessionStorage
- Handle JSON data for import/export functionality
- Implement dynamic content filtering and category management
- Simulate server interactions and resolve data conflicts
- Build robust, interactive, and user-friendly web applications

## 📈 Future Improvements
- Enhance UI with better styling and animations
- Implement a real backend server for full syncing
- Add user authentication for personalised quotes
- Include pagination or infinite scrolling for large quote collections

## 📌 Author
Benedict Tachie – Aspiring Data Scientist & Software Developer

## 🎉 License
This project is MIT licensed – feel free to use and adapt for learning or personal projects.
