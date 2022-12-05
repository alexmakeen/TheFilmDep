import styled from "styled-components"
import { useState, useEffect } from "react";

import Feed from "./Feed"



const HomeFeed = ({userData}) => {

const [getComments, setGetComments] = useState("");

useEffect(() => {
    fetch("/comments").then((res) => {
        res.json().then((data) => {
            console.log(data.data)
                setGetComments(data.data)
        })
    })
}, [])



    return (
        <>
        
        {!getComments ? (
            <h1>Loading</h1>
        ) : (
        <>
 
            <Feed userData={userData} getComments={getComments} />
        </>)
    }
    </>)
}



export default HomeFeed