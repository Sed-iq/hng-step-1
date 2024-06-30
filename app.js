const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const ipinfo = require("ipinfo")
const app = express()

app.get("/api/hello", (req, res) => {
    const { visitor_name } = req.query
    if (!visitor_name) res.status(401).json({ message: "Visitor's name is required" })
    else {
        ipinfo((req.ip, (err, loc) => {
            if (err) {
                res.status(404).json({ message: "Cannot get location" })
            }
            else {
                res.json({
                    client_ip: req.ip,
                    location: loc.city,
                    greeting: `Hello, ${visitor_name}!, the temperature is 11 degrees Celcius in ${loc.city}`
                })
            }
        }))
    }
})

app.use((req, res) => {
    res.status(404).json({ message: `${req.url} does not exist` })
})

app.listen(process.env.PORT, console.log("Server is running"))