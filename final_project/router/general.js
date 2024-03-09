const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let usersWithSameName = users.filter((user)=>{
        return user.username === username
    });
    if(usersWithSameName.length > 0){
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!doesExist(username)) {
            users.push({"username":username,"password":password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    return res.status(404).json({message: "Unable to register user."});
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //Write your code here
    return new Promise((resolve, reject) => {
        if (!resolve) {
            res.status(400).json({message: "Oops! There's an error somewhere! "})
            reject()
        } else {
            res.status(200).json(JSON.stringify(books))
            resolve()
        }
    })

  //return res.status(300).json({message: "Yet to be implemented"});
  //return res.send(JSON.stringify({books}, null))
});

// Get book details based on ISBN

public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn;
    let booksArray = Object.values(books);
    let filteredBooks = booksArray.filter(book => book.isbn === isbn);
  //const jsons = books.JSON.stringify({filtered_books})
   res.send(filteredBooks);  return res.status(300).json({message: "Yet to be implemented"});
  //return res.status(300).json({message: "Yet to be implemented"});  return res.status(300).json({message: "Yet to be implemented"});
    return new Promise((resolve, reject) => {
        if (!isbn) {
            res.status(400).json({message: "Oops! There's an error somewhere! "})
            reject()
        } else {
            res.status(200).json(filteredBooks)
            resolve()
        }
    })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
    const authors = req.params.author;
    let booksArray = Object.values(books);
    let filteredBooks = booksArray.filter(book => book.author === authors);
    //res.send(filteredBooks);  return res.status(300).json({message: "Yet to be implemented"});
    return new Promise((resolve, reject) => {
        if (!authors) {
            res.status(400).json({message: "Oops! There's an error somewhere! "})
            reject()
        } else {
            res.status(200).json(filteredBooks)
            resolve()
        }
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const titles = req.params.title;
  let booksArray = Object.values(books);
  let filteredBooks = booksArray.filter(book => book.title === titles);
  //res.send(filteredBooks);  return res.status(300).json({message: "Yet to be implemented"});
    return new Promise((resolve, reject) => {
        if (!titles) {
            res.status(400).json({message: "Oops! There's an error somewhere! "})
            reject()
        } else {
            res.status(200).json(filteredBooks)
            resolve()
        }
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let booksArray = Object.values(books);
  let filteredBooks = booksArray.filter(book => book.isbn === isbn);
  //console.log('filteredBooks', filteredBooks);
  let reviews = []
  filteredBooks.map((item) => {
    if(item.reviews){
      reviews.push(item)
    }
  })
  res.send(reviews);  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
