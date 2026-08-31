const myLibrary = [
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
    this.info = function() {
        console.log(`${this.title} by ${this.author}, ${this.status}`);
    };
}

function addBookToLibrary(title, author, status) {
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, status);
    myLibrary.push(book);
}

// function removeBookFromLibrary(id) {
//     const updatedLibrary = myLibrary.filter(book => "Confessions" !== book.title)
//     return updatedLibrary
// }


function displayLibrary () {
    for (const book of myLibrary) {
        console.log(book);
        console.log("hi");
    }

    const container = document.querySelector(".container");

    const existingTable = document.querySelector(".table-container");
    if (existingTable) {
        existingTable.remove();
    }

    const tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const td_name = document.createElement("td");
    td_name.textContent = "Name";
    const td_author = document.createElement("td");
    td_author.textContent = "Author";
    const td_status = document.createElement("td");
    td_status.textContent = "Status";
    const td_delete = document.createElement("td");
    tr.append(td_name);
    tr.append(td_author);
    tr.append(td_status);
    tr.append(td_delete);
    thead.append(tr);
    table.append(thead);

    const tbody = document.createElement("tbody");
    table.append(tbody);

    for (const book of myLibrary) {
        const tr = document.createElement("tr");
        const td_name = document.createElement("td");
        td_name.textContent = book.title;
        const td_author = document.createElement("td");
        td_author.textContent = book.author;
        const td_status = document.createElement("td");
        td_status.textContent = book.status;
        const td_delete = document.createElement("td");
        const del_button = document.createElement("button");
        del_button.textContent = "Delete";
        td_delete.append(del_button);
        tr.append(td_name);
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

    console.log(bookTitle);
    console.log(bookAuthor);
    console.log(bookStatus);

    console.log("adding a new book");
    addBookToLibrary(bookTitle, bookAuthor, bookStatus);

    displayLibrary();

    form.reset();
});

displayLibrary();
