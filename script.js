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
    tr.append(td_title);
    tr.append(td_author);
    tr.append(td_status);
    tr.append(td_delete);
    thead.append(tr);
    
    // Row for each book
    for (const book of myLibrary) {
        const tr = document.createElement("tr");
        const td_title = document.createElement("td");
        td_title.textContent = book.title;
        const td_author = document.createElement("td");
        td_author.textContent = book.author;
        const td_status = document.createElement("td");
        td_status.textContent = book.status;
        const td_delete = document.createElement("td");
        const del_button = document.createElement("button");
        del_button.textContent = "Delete";
        del_button.id = book.id;
        del_button.classList.add("delete-button")
        del_button.addEventListener("click", function() {
            removeBookFromLibrary(book.id)
            renderTable()
        })
        td_delete.append(del_button);
        tr.append(td_title);
        tr.append(td_author);
        tr.append(td_status);
        tr.append(td_delete);
        tbody.append(tr);
    }

    tableContainer.append(table);
    container.append(tableContainer);
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
