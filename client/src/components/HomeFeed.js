import styled from "styled-components"
import { useState, useEffect } from "react";

const HomeFeed = () => {

const [userData, setUserData] = useState("");

useEffect(() => {
    fetch("/currentlyOwned").then((res) => {
        res.json().then((data) => {
            setUserData(data.data)
        })
    })
}, [])


    return (
        <>
        {!userData ? (
            <h1>Loading</h1>
        ) : (
        <>
        <Wrapper>
        <Heading>Here's what others are shooting with at the moment:</Heading>
        </Wrapper>
        <FlexDiv>
            {
                userData.map(item => {
                    return (
            
            <MapWrapper>
            <div className="imgFlex">
            <div>
            <img src={item.staticImageUrl} />
            </div>
            <div className="nameDiv">
            <p>Added to Currently Owned by {item.username}</p>
            <h4>{item.name}</h4>
            <p className="brand">by {item.brand}</p>
            </div>
            </div>
            {/* <div className="details">
            <div className="format">
            <p>format:</p>
            {
                thirtyFive && (
                    <>
                    <p>35mm</p>                    
                    </>
                )
            }
            {
                twentyRoll && (
                    <>
                    <p>120mm</p>                    
                    </>
                )
            }
            </div>
            <div className="icons">
            <p><RiCameraLensFill /> iso {item.iso}</p>
            {
                !blackWhite && (
                    <>
                    <p><MdInvertColors className="colorOption" />color</p>                    
                    </>
                )
            }
            {
                blackWhite && (
                    <>
                    <p><MdInvertColors />black</p>                    
                    </>
                )
            }
            </div>
            </div> */}
            {/* <p className="description">{item.description}</p> */}
            <h5>Key Features:</h5>
            {
            // console.log(item.keyFeatures)
                (item.keyFeatures).map((item)=> {
                    return <p>{item.feature}</p>
                })
            } 
            <h4>comments:</h4>
            <form>
            <input type="text" name="fieldNotes" />
            <button type="submit">add comment</button> 
            </form> 

            </MapWrapper>
                    )
                })
            }
            </FlexDiv>

        </>)
    }
    </>)
}

const Wrapper = styled.div `
background-color: #F8F0E3;
`

const Heading = styled.h1 `
padding: 10px;
`

const FlexDiv = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
flex-wrap: wrap;
    `

const MapWrapper = styled.div `
margin: 20px;
width: 700px;
height: 400px;
font-family: Arial, Helvetica, sans-serif;
padding: 20px;
border-radius: 25px;
box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
    img {
        width: 100px;
        height: auto;
        border-radius: 50px;
        border: 3px solid grey;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;}
    
    
    .imgFlex {
        display: flex;
    }
    
    .nameDiv {
        padding: 0 20px;
        font-size: 30px;
    }
    
    .brand {
        font-style: italic;
        padding: 10px 0;
    }
    
    .details {
        display: flex;
        margin: 20px 0;
        justify-content: flex-start;
        font-size: 15px;
      }
    
    .description {
        margin: 20px 0;
    }
    
    button {
        font-size: 30px;
        margin: 20px 120px;
    }
    
    .check {
        color: #396431;
    }
    
    .star {
        color: #f5bb17;
    }
    
    p {
        font-size: 20px;
    }

    `

export default HomeFeed