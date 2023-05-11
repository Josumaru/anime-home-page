import { useState,useEffect } from "react";
import "./DateTime.css"

const DateTime = () => {
    const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday", "Friday","Saturday"]
    const [dashboardTime, setDashboardTime] = useState("")
    const [dashboardDate,setDashboardDate] = useState()

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date()
            setDashboardTime(date.toLocaleTimeString())
            setDashboardDate(`${day[date.getDay()]} \n ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`)
        },1000)
        return () => clearInterval(interval)
    },[])
    return (
        <div className="date-time">
            <p className="time">{ dashboardTime }</p>
            <p className="date">{ dashboardDate }</p>
        </div>
    )
}
export default DateTime;