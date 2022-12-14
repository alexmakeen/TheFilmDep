import styled from "styled-components"
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
const Wishlist = () => {
    const { user } = useAuth0();
    const [userData, setUserData] = useState("");

    // fetching wishlist from mongoDB - making sure that only the pictures uploaded by a specific user are shown
    useEffect(() => {
        fetch("/wishlist").then((res) => {
            res.json().then((data) => {
                const getUser = (data.data).filter(match => {
                    return match.username === user.nickname
                })
                setUserData(getUser)
            })
        })
    }, [])


    return (
        <>
        {!userData ? (
            <h1>Loading...</h1>
        ) : (
            <>
            <Title>Wishlist</Title>
            
            <FlexDiv>
            {
                userData.map(item => {
                    return (
            
            <Wrapper key={Math.floor(Math.random() * 14000000000)}>
            <div className="imgFlex">
            <div>
            <img src={item.staticImageUrl} alt="rollimg" />
            </div>
            <div className="nameDiv">
            <h4>{item.name}</h4>
            <p className="brand">by {item.brand}</p>
            </div>
            </div>
            <p className="description">{item.description}</p>
            <h5>Key Features:</h5>
            {
                (item.keyFeatures).map((item)=> {
                    return <p key={Math.floor(Math.random() * 14000000000)}>{item.feature}</p>
                })
            } 
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
   justify-content: center;
    flex-wrap: wrap;
    `

    const Wrapper = styled.div `
    margin: 20px;
    width: 600px;
    height: 500px;
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

    .fieldNotes {
        margin: 10px 0 0 0; 
    }
    
    `



export default Wishlist