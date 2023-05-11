import { useEffect, useRef, useState } from "react";
import "./Dashboard.css"
import YoutubePlayer from "../YoutubePlayer/YoutubePlayer";
import DateTime from "../DateTime/DateTime"
import Weather from "../Weather/Weather"
import Profile from "../Profile/Profile"
import { ShowDashboardValue } from "../../Utils/Utils";

const Dashboard = () => {
    const dashboardRef = useRef()
    const [battery, setBattery] = useState("")
    const [memory, setMemory] = useState("")
    const [memoryLevel, setMemoryLevel] = useState("")
    const [useShowDashboard, setShowDashboard] = ShowDashboardValue()
    
    const dashboard = () => {    
        //Storage (Unfinished)
        const storageValue = () => {
            let storage = navigator.storage
            let totalStorage = storage.estimate().then(function (estimate) {
                return estimate.quota;
            })
            let availableStorage = storage.estimate().then(function (estimate) {
                return estimate.quota;
            })
            Promise.all([totalStorage, availableStorage]).then(function (values) {
                let total = (values[0] / 1024 / 1024 / 1024).toFixed(2)
            })
        }
    }
    useEffect(() => {
        const DashboardLevel = setInterval(() => {
            let ramUsed = Math.round(window.performance.memory.usedJSHeapSize/1024/1024*100)/100 
            setMemory(ramUsed + "MB")
            setMemoryLevel(ramUsed + "%")
    
            navigator.getBattery()
            .then(function (battery) {
                setBattery(`${Math.floor(battery.level * 100)}%`)
            })
        }, 3000)
        return () => { clearInterval(DashboardLevel) }
    })
    useEffect(() => { 
        dashboard()
    }, [])
    return (
        <div>
            <p onClick={() => { setShowDashboard(!useShowDashboard) }} className="dashboard-button">Dashboard</p>
            <div style={{ display: useShowDashboard ? "none" : "flex" }} ref={dashboardRef} className="dashboard">
                <div className="dashboard-content">
                    <div className="top-bar">
                        <DateTime />
                        <Weather />
                    </div>
                    <div className="middle-bar">                        
                        <section className="mid-bar-section-1">
                            <section className="mid-bar-sub-section-1">                                
                                <YoutubePlayer />    
                            </section>
                            <section className="mid-bar-sub-section-2">
                            </section>
                        </section>
                        <section className="mid-bar-section-2">
                        </section>    
                    </div>
                    <div className="bottom-bar">
                        <section className="bottom-bar-section-1">
                            <Profile/>
                        </section>
                        <section className="bottom-bar-section-2">
                            <div className="level">
                                <span className="material-symbols-outlined">battery_very_low</span>
                                <div className="battery-width" style={{ width: battery }}></div>
                                <p className="battery-status">{ battery }</p>
                            </div>
                            
                        <div className="level">
                            <span className="material-symbols-outlined">sd_card</span>
                                <div className="storage-width" style={{ width: memoryLevel }}></div>
                                <p className="storage-value">{ memory }</p>
                        </div>
                        <div className="level">
                            <span className="material-symbols-outlined">memory</span>
                            <div className="cpu-width"></div>
                            <p className="cpu-value"></p>
                        </div>
                    </section>
                </div>
                    <span onClick={() => { setShowDashboard(!useShowDashboard) }} id="close" className="material-symbols-outlined">close</span>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;