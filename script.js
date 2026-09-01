let myLibrary = [
    {
        id: crypto.randomUUID(),
        title: "Confessions",
        author: "Saint Augustine",
        status: "not read"
    },
    {
        id: crypto.randomUUID(),
        title: "Shorter Summa",
        author: "Saint Thomas Aquinas",
        status: "not read"
    }
];

function Book(id, title, author, status) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.status = status;
}

function addBookToLibrary(title, author, status) {
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, status);
    myLibrary.push(book);
}

function removeBookFromLibrary(id) {
    myLibrary = myLibrary.filter(book => book.id !== id)
}

function updateBookStatus(id) {
    for (const book of myLibrary) {
        if (book.id === id) {
            if (book.status === "not read") {
                book.status = "read"
            } else {
                book.status = "not read"
            }
            return
        }
    }
}

function renderTable() {
    const existingTable = document.querySelector(".table-container");
    if (existingTable) {
        existingTable.remove();
    }

    const container = document.querySelector(".container");
    
    const tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.append(thead);
    table.append(tbody);

    // Header row
    const tr = document.createElement("tr");
    const td_title = document.createElement("td");
    td_title.textContent = "Title";
    const td_author = document.createElement("td");
    td_author.textContent = "Author";
    const td_status = document.createElement("td");
    td_status.textContent = "Status";
    const td_delete = document.createElement("td");
    td_delete.textContent = "Delete";
    tr.append(td_title);
    tr.append(td_author);
    tr.append(td_status);
    tr.append(td_delete);
    thead.append(tr);
    
    // Row for each book
    for (const book of myLibrary) {
        // Title
        const tr = document.createElement("tr");
        const td_title = document.createElement("td");
        td_title.textContent = book.title;
        
        // Author
        const td_author = document.createElement("td");
        td_author.textContent = book.author;
        
        // Status
        const td_status = document.createElement("td");
        const status_button = document.createElement("button");
        status_button.textContent = book.status;
        status_button.classList.add("status-button");
        status_button.id = book.id
        td_status.append(status_button);
        
        // Delete
        const td_delete = document.createElement("td");
        const del_button = document.createElement("button");
        del_button.textContent = "Delete";
        del_button.id = book.id;
        del_button.classList.add("delete-button")
        td_delete.append(del_button);
        
        tr.append(td_title);
        tr.append(td_author);
        tr.append(td_status);
        tr.append(td_delete);
        tbody.append(tr);
    }

    tableContainer.append(table);
    container.append(tableContainer);

    // For buttons
    attachDeleteHandlers();     
    attachStatusHandlers();   
}

function attachDeleteHandlers() {
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", () => {
            removeBookFromLibrary(deleteButton.id);
            renderTable();
        });
    });
}

function attachStatusHandlers() {
    const statusButtons = document.querySelectorAll(".status-button");
    statusButtons.forEach((statusButton) => {
        statusButton.addEventListener("click", () => {
            updateBookStatus(statusButton.id)
            renderTable();
        })
    })
}

const form = document.getElementById("book-form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const bookTitle = document.getElementById("book").value.trim();
    const bookAuthor = document.getElementById("author").value.trim();
    const bookStatus = document.getElementById("status").value;

    if (!bookTitle || !bookAuthor) {
        alert("Please enter a book title and/or book author.");
        return;
    }

    addBookToLibrary(bookTitle, bookAuthor, bookStatus);
    renderTable();
    form.reset();
});

renderTable();
