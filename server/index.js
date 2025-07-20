import dotenv from "dotenv"
import express from 'express'
import morgan from "morgan"

dotenv.config()

const app = express()
const PORT = process.env.PORT

// logging middleware
if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Body parser middleware
app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({extended: true, limit: true}))

// global error handler

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || "Internal Server error",
        ...(process.env.NODE_ENV === "development" && {stack: err.stack })
    })
})


//api routes

app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Page not found"
    })
})

app.listen("PORT", () => {
    console.log(`Server is running on ${PORT} in ${process.env.NODE_ENV} mode `)
})

