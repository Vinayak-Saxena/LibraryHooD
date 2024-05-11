# LibraryHooD

Welcome to our library book management website! Easily keep track of your borrowed books, due dates, and reservations all in one place. Our user-friendly interface ensures seamless navigation, allowing you to browse our extensive collection, reserve books, and renew books with just a few clicks. Simplify your library experience today with our intuitive book management platform.


# Installation

 This project is built using MERN Stack.It uses several libraries including: 
- [Express](https://expressjs.com/) - a fast, minimalist web framework for Node.js
- [Express-validator](https://github.com/express-validator/express-validator) - a set of express.js middleware functions to validate request data
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) - a library to help hash passwords
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - a library to generate JWT tokens
- [Mongoose](https://mongoosejs.com/) - a MongoDB object modeling tool
- [Material-ui/core] - implements Google's Material Design principles. 
   

 Clone the Repository:
  ```
    git clone https://github.com/Vinayak-Saxena/LibraryHooD.git
  ```

Install Dependancies
  ```
   cd libraryhood-frontend
   npm Install
   cd ..
   cd libraryhood-backend
   npm Install
  ```

## Environemnt Variables 
  This project require following env variable:
- `PORT`: available Port number
- `DB_URI`: the MongoDB connection string
- `JWT_SECRETE`: the secret used to sign JWT token

Create a `.env` file in the root directory of the project to set these variables.


## Running the Project Locally
Start the server
    For Fronted Directory
   ```  
   npm run dev
   ```
   For Backend Directory
   ```
    npm run dev
   ```
  By default server will run on port 4000.

  <br/>

# Routing Guide
<br/>

##  For User Record


| Functionality       | Route (HTTP Method)  | Description                                       | Request Body                             | Response                                                              |
|---------------------|----------------------|---------------------------------------------------|------------------------------------------|-----------------------------------------------------------------------|
| Sign Up User        | /users/signup (POST) | Creates a new user in the database               | { name: string, email: string, password: string } | Newly created User object with token or error message (if creation fails) |
| Login User          | /users/login (POST)  | Authenticates a user and returns a token         | { email: string, password: string }     | User object with token or error message (if login fails)              |
| Get All Users       | /users (GET)         | Retrieves all users from the database            |                                       | Array of User objects or error message (if retrieval fails)           |
| Get User by ID      | /users/:id (GET)     | Retrieves a user based on their ID               |                                      | User object (if found) or error message (if not found)                |
| Delete User by ID   | /users/:id (DELETE)  | Deletes a user from the database based on their ID |                                       | Deleted User object (if found) or error message (if not found)        |
<br/>


##  For Students Records


| Functionality                 | Route (HTTP Method)      | Description                                             | Request Body                         | Response                                                  |
|-------------------------------|--------------------------|---------------------------------------------------------|--------------------------------------|-----------------------------------------------------------|
| Get All Students              | /students (GET)          | Retrieves all students from the database               |                     | Array of Student objects                                  |
| Get Student by Roll Number    | /students/:roll_no (GET) | Retrieves a student based on their roll number          |                                   | Student object (if found) or error message (if not found) |
| Add Student                   | /students (POST)         | Creates a new student in the database                  | { name: string, roll_no: string }   | Newly created Student object or error message             |
| Remove Student by Roll Number | /students/:roll_no (DELETE) | Deletes a student from the database based on their roll number |                               | Deleted Student object (if found) or error message (if not found) |
<br/>


##  For Issue/Return Record


| Functionality                            | Route (HTTP Method)          | Description                                                    | Request Body                                                                | Response                                                                                                          |
|------------------------------------------|------------------------------|----------------------------------------------------------------|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| Get All Issue/Return Records             | /records (GET)               | Retrieves all Issue/Return records from the database           |                                                                         | Array of IssueReturn objects (populated with student and book data)                                              |
| Get Issue/Return Record by Student ID    | /records/:student_id (GET)  | Retrieves Issue/Return records for a specific student          |                                                                          | Array of IssueReturn objects (populated with student and book data) or error message (if not found)              |
| Create a New Issue/Return Record         | /records (POST)              | Creates a new Issue/Return record in the database             | { student_id: string, book_id: string, issued_date: string, returned_date: string } | Newly created IssueReturn object or error message (if creation fails)                                             |
| Update Issue/Return Record by Book ID    | /records/:book_id (PUT/PATCH) | Updates an existing Issue/Return record based on the book ID | { Any updatable properties of IssueReturn model }                          | Updated IssueReturn object or error message (if not found or update fails)                                       |

<br/>


##  For Books Records

| Functionality                     | Route (HTTP Method)          | Description                                                     | Request Body                                                         | Response                                                                        |
|-----------------------------------|------------------------------|-----------------------------------------------------------------|----------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Get All Books                     | /books (GET)                 | Retrieves all books from the database                            |                                                                   | Array of Book objects                                                          |
| Get Book by Title (case-insensitive search) | /books/:title (GET) | Retrieves a book based on its title (partial match)          |                                                                   | Book object (if found) or error message (if not found)                         |
| Create a New Book                 | /books (POST)                | Creates a new book in the database                               | { title: string, author: string, genre: string, available: boolean, image: string } | Newly created Book object or error message (if creation fails)                  |
| Delete Book by ID                 | /books/:id (DELETE)          | Deletes a book from the database based on its ID                 |                                                                   | Deleted Book object (if found) or error message (if not found)                  |
| Update Book Availability          | /books/:title (PUT/PATCH)    | Updates the availability of a book based on its title            | { updateType: "increment", "decrement" }                                       | Increment or Dcrement the record based on request                                                                     |



<br/>

##  For Donate Book Record

| Functionality                     | Route (HTTP Method)    | Description                                                 | Request Body                                                     | Response                                                               |
|-----------------------------------|------------------------|-------------------------------------------------------------|------------------------------------------------------------------|------------------------------------------------------------------------|
| Get All Donated Books             | /dbooks (GET)          | Retrieves all donated books from the database               |                                                               | Array of DonatedBook objects                                            |
| Get Donated Book by ID            | /dbooks/:id (GET)      | Retrieves a donated book based on its ID                    |                                                               | DonatedBook object (if found) or error message (if not found)          |
| Create a New Donated Book         | /dbooks (POST)         | Creates a new donated book in the database                  | { title: string, author: string, genre: string, image: string } | Newly created DonatedBook object or error message (if creation fails)   |
| Delete Donated Book by ID         | /dbooks/:id (DELETE)   | Deletes a donated book from the database based on its ID    |                                                               | Deleted DonatedBook object (if found) or error message (if not found)   |


## For Detailed Documentation : 
https://docs.google.com/document/d/1Hhnq98aw6pmrkWrc6BwElCOJ3s8r6owlYHL2RCScXE8/edit?usp=sharing

  
