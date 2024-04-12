const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const bodyParser = require("body-parser")
const { v4: uuidv4 } = require("uuid")
const adminRouter = require("./routes/admin")
const authRouter = require("./routes/admin")
const productRouter = require("./routes/admin")

const app = express()

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`)
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimtype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use(bodyParser.json())
app.use(multer({ storage: fileStorage, fileFilter }).single("image"))
app.use("/images", express.static(path.join(__dirname, "images")))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Constent-Type, Authorization")
})

app.use("/admin", adminRouter)
app.use("/auth", authRouter)
app.use(productRouter)

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message, data })
})

mongoose
  .connect(
    "mongodb+srv://ciort:lmPUCRCcBCJGJXKW@cluster0.4hotosw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(4000)
  })
  .catch((err) => console.log(err))
