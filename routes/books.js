const express = require('express');
const router = express.Router();
const {v4: uuid} = require('uuid');

let books = [
    {
    id: uuid(),
    author: "Patrick Rothfuss",
    title: "The Name Of The Wind"
    }
]

/* Get books */
router.get('/', (req, res) => {
    return res
        .status(200)
        .json(books);
});

/* Get book by id*/
router.get('/:id', (req, res) => {
    const bookId = req.params.id;
    const book = books.find(book => book.id === bookId);
    if (book) {
        return  res
            .status(200)
            .json(book);
    }
    return  res
        .status(400)
        .send("Book not found by id");
    }
)

/* Add book */
router.post('/', (req, res) =>{

    if (req.body.title !== undefined) {
        const book = {
            id: req.body.id || uuid(),
            author: req.body.author || "Default author",
            title: req.body.title || "Default title",
        }

        books.push(book);
        return res
            .status(201)
            .json(book);
    }
    return res
        .status(400)
        .send("Title not passed");
})

/* Update book by id */
router.put('/:id', (req, res) =>{
    const bookId = req.params.id;

    const book = books.find(book => book.id === bookId);

    if (book){
        books.forEach(book => {
            if (book.id === bookId){
                book.title = req.body.title;
                book.author = req.body.author;
            }
        });

        return  res
            .status(200)
            .json(book);
    }
    return res
        .status(400)
        .send("No such identifier found");
})

/* Delete book by id */
router.delete('/:id', (req, res) =>{
    const bookId = req.params.id;
    const book = books.find(book => book.id === bookId);

    if (book) {
        books = books.filter(book => book.id !== bookId)
        return res.status(204).send();
    }

    return res.status(400).send();
})

module.exports = router;