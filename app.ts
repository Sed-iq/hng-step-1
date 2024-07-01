import express, { Request, Response } from "express"
import dotenv from "dotenv"
import get_location from "./get_location"
dotenv.config()
const app = express()

app.get("/api/hello", async (req: Request, res: Response) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.ip;
        const geo = await get_location(ip)
        const { visitor_name } = req.query
        res.json({
            client_ip: ip,
            location: geo.location.city,
            geeting: `Hello, ${visitor_name}!, the temperature is ${geo.current.temp_c} degrees in ${geo.location.name}`
        })
    } catch (error) {

        res.status(500).json({ message: "There seems to be an error" })
    }
})
app.listen(process.env.PORT, () => console.log("Server running"))