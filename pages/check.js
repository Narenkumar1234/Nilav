import axios from 'axios';
import { useState } from 'react';


export default function Check(){
    const [data,setData]=useState({})
    
    axios.get("http://localhost:5000/api/data").then(response=>{
        console.log(response.data);
        setData(response.data);
        console.log(data)
    })


    
    return (
        <div> {data.message} </div>

    )
}