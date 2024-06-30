const express = require("express")
const dotenv = require("dotenv").config()
const geoip = require("geoip-lite")
const app = express()

app.get("/api/hello", (req, res) => {
    const { visitor_name } = req.query
    if (!visitor_name) res.status(401).json({ message: "Visitor's name is required" })
    else {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const geo = geoip.lookup(ip);
        res.json({
            client_ip: ip,
            location: geo.city,
            greeting: `Hello, ${visitor_name}!, the temperature is 11 degrees Celcius in New York`
        })
    }
})

app.use((req, res) => {
    res.status(404).json({ message: `${req.url} does not exist` })
})

app.listen(process.env.PORT, console.log("Server is running"))