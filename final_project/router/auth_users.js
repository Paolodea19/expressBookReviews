const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  let usersWithSameName = users.filter((user)=>{
    return user.username === username
  });
  if(usersWithSameName.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  console.log(users);
  let validUsers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validUsers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(404).json({message: "Error logging in"});
  }
  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
    }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  let booksArray = Object.values(books);
  let filteredBooks = booksArray.filter(book => book.isbn === isbn);

  const username = req.body.username;
  const review = req.body.review;
  const findUser = filteredBooks.find((item) => item.user === username)
  if(findUser){
    findUser.review = {user: username, review: review }
  }else{
    findUser.review.push({user: username, review: review })
  }
  return res.status(200).send("Update of the book with " + "isbn " + isbn + "has been done by user1");
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let booksArray = Object.values(books);
  let filteredBooks = booksArray.filter(book => book.isbn === isbn);

  const username = req.body.username;
  const findUser = filteredBooks.find((item) => item.user !== username)
  return res.status(200).send(`Delete with exist user1 `);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
