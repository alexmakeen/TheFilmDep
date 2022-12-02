import styled from "styled-components"

import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { MdInvertColors} from "react-icons/md"
import { RiCameraLensFill } from "react-icons/ri"
import { FaCheck, FaStar } from "react-icons/fa"
import Sidebar from "./Sidebar";

const CurrentlyOwned = () => {
const { user, isAuthenticated, isLoading } = useAuth0();
const [userData, setUserData] = useState("");

useEffect(() => {
    fetch("/currentlyOwned").then((res) => {
        res.json().then((data) => {
            const getUser = (data.data).filter(match => {
                return match.username === user.nickname
            })
            setUserData(getUser)
            console.log(getUser)
        })
    })
}, [])


// const blackWhite = color === false
// const thirtyFive = thirtyfive === true
// const twentyRoll = twenty === true



    return (
        <>
        {!userData ? (
            <h1>Loading...</h1>
        ) : (
            <>
            <Title>Currently Owned</Title>
            
            <FlexDiv>
            <MenuDiv>
            <Sidebar />
            </MenuDiv>
            {
                userData.map(item => {
                    return (
            
            <Wrapper>
            <div className="imgFlex">
            <div>
            <img src={item.staticImageUrl} />
            </div>
            <div className="nameDiv">
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
            <p className="description">{item.description}</p>
            <h5>Key Features:</h5>
            {
            // console.log(item.keyFeatures)
                (item.keyFeatures).map((item)=> {
                    return <p>{item.feature}</p>
                })
            } 
            <h4>Field Notes:</h4>
            {
                (item.tags).map(tag => {
                    return <p>{tag}</p>
                })
            }

            {/* 
            <form>
            <input type="text" name="fieldNotes" />
            <button type="submit">add note</button> 
            </form> */}
            </Wrapper>
                    )
                })
            }
            </FlexDiv>
            </>
        )
        }
    </>
    )}

    const Title = styled.h1 `
    font-size: 40px;
    margin-top: 100px;
    
    `

    const FlexDiv = styled.div`
    display: flex;
    align-items: right;
    flex-wrap: wrap;
    `

    const MenuDiv = styled.div`
    width: 350px;

    `

    const Wrapper = styled.div `
    margin: 20px;
    width: 600px;
    height: 600px;
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
    
    `


export default CurrentlyOwned