// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor - add , delete 
function UI() { }

//add book to list
// this function is added to the UI prototype
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
}
//Show alert
UI.prototype.showAlert = function (message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    //get parent 
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}

UI.prototype.deleteBook= function(target) {
    if (target.className == 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//clear field
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}    


// Events
document.getElementById('book-form').addEventListener('submit',
    function (e) {
        // Get form values
        const title = document.getElementById('title').value,
              author = document.getElementById('author').value,
              isbn = document.getElementById('isbn').value;
        
        const book = new Book(title, author, isbn);
        const ui = new UI();
        //console.log(ui);
        
        //validation
        if (title === ''|| author === '' || isbn === ''){
            //Error Alert 
            ui.showAlert('Please fill in all fields','error');
        } else {
            ui.addBookToList(book);
            ui.showAlert('Book Added!','success');

            //clear fields once we added a book 
            ui.clearFields();
        }
        e.preventDefault();
    });
    
    // Event for deleting a book
document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Removed', 'success');
    e.preventDefault();
    })
        

