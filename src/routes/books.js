import express from 'express'
import { Book } from "../models/model_book"
const booksRouter = express.Router()
import multer from 'multer'
//const upload = multer({ dest: 'public/uploads/' })

//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')  //multer looks at the root of the project
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ '-'+ file.originalname)
    }
  })
   
  const upload = multer({ storage: storage }).single("image")

  booksRouter.get('/', (req, res) =>{
    Book.find({}, (err, books)=>{
        if(err)console.log(err)
        res.render('allBooks', { books})
      })   
    })

booksRouter.get('/add_book', (req, res) =>{
    //res.json('bookrouter works')
    res.render('addbook')
})

booksRouter.post('/add_book', upload, (req, res) =>{
    const data = req.body
    data['image']= req.file.filename // the bracket notation to recuperate the key pf the object
    const newBook = new Book(data)
    //  const newBook = new Book(req.body)
    newBook.save((err, book) => {
        if(err) res.send(err)
        console.log(`book added ${book}`)
    }) 
})

booksRouter.get(/:id, (req,res) =>{
    Book.findById({_id:req.params.id}, (err,book)=>{
        if(err) res.send(err)
        res.json(book)
        //res.render('detailBook', {book})
    } )
})

export { booksRouter }