import Axios from "axios"
import { response } from "express"

export default (ip: any) => {
    return new Promise<any>((resolve, reject) => {
        Axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.IP_KEY}&q=${ip}`,)
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                reject(err)
            })
    })
}