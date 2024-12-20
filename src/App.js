import { useState, useEffect } from "react";

const App = () => {

    const [data, setData] = useState({})
    const [url, setUrl] = useState("")

    const getPositionData = async() => {
        const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544") //https://api.wheretheiss.at/v1/satellites/25544 http://api.open-notify.org/iss-now.json 
        const dataPos = await response.json()
        setData(dataPos)
        setUrl(`https://mapy.cz/fnc/v1/showmap?mapset=outdoor&center=${dataPos["longitude"]},${dataPos["latitude"]}&zoom=10&marker=true`) // https://mapy.cz/zakladni?x=${dataPos["longitude"]}&y=${dataPos["latitude"]}&z=8

    }

    useEffect( () => {
        getPositionData()
    }, [])

    if(data.timestamp) {
        return (
        <div>
            <h1>ISS position</h1>
            <p>Time: {new Date(data.timestamp*1000).toLocaleTimeString()}</p>
            <p>Zeměpisná délka: {data.longitude}</p>
            <p>Zeměpisná šířka: {data.latitude}</p>
            <p><a href={url} target="_blank">Pozice ISS v mapách</a></p>
            
        </div>       
    )
    }
    else {
        return (
            <div>
                <h1>ISS position</h1>
                <p>Načítání dat</p>
            </div>
        )
    }
    
}

export default App