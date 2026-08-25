const myLibrary = [
    {
        id: crypto.randomUUID(),
        title: "Confessions",
        author: "Saint Augustine",
        pages: 305,
        have_read: false
    },
    {
        id: crypto.randomUUID(),
        title: "Shorter Summa",
        author: "Saint Thomas Aquinas",
        pages: 366,
        have_read: false
    }
];

function Book(id, title, author, pages, have_read) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = id
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.have_read = have_read;
    this.info = function() {
        const have_read_string = this.have_read ? "read" : "not read yet" 
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${have_read_string}`)
    }
}

function addBookToLibrary(title, author, pages, have_read) {
    const id = crypto.randomUUID()
    const book = new Book(id, title, author, pages, have_read);
    myLibrary.push(book)
}

// function removeBookFromLibrary(id) {
//     const updatedLibrary = myLibrary.filter(book => "Confessions" !== book.title)
//     return updatedLibrary
// }


const form = document.getElementById("book-form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const bookTitle = document.getElementById("book").value;
    const bookAuthor = document.getElementById("author").value;
    const bookStatus = document.getElementById("option").value;

    console.log(bookTitle);
    console.log(bookAuthor);
    console.log(bookStatus);
});






// console.log("Number of books in my library:")
// console.log(myLibrary.length)

// console.log("----------------------------------")

// console.log("Displaying library")
// for (const book of myLibrary) {
//     console.log(book)
// }

// console.log("----------------------------------")

// console.log("Adding book to library")

// addBookToLibrary("Mere Christianity", "C.S Lewis", 300, true)

// console.log("Displaying library")

// for (const book of myLibrary) {
//     console.log(book)
// }

// console.log("----------------------------------")

// console.log("Removing book from library");

// const updatedLibrary = removeBookFromLibrary();

// console.log("Displaying library")

// for (const book of updatedLibrary) {
//     console.log(book)
// }
