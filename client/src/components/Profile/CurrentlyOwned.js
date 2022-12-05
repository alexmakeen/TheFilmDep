import styled from "styled-components"
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaWindowClose } from "react-icons/fa"

const CurrentlyOwned = () => {
const { user } = useAuth0();
const [userData, setUserData] = useState("");
const [postId, setPostId] = useState("")
const [toggle, setToggle] = useState(true)

//fetching data added to currently owned with a get fetch - making sure that only the pictures uploaded by a specific user are shown

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
}, [userData])

//setting the post ID, user can click delete? and a button will pop up to let them delete that specific item

const handleClick = (e) => {
    console.log(e.target.id)
    setPostId(e.target.id)
    
}

console.log(postId)

//delete method for deleting in mongoDB by id

const clearCOItems = (e) => {
    e.preventDefault()
   
    fetch(`/currentlyOwned/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  //setting the toggle state

  const handleClickToggle = () => {
    setToggle(!toggle)
 }

    return (
        <>
        {!userData ? (
            <h1>Loading...</h1>
        ) : (
            <>
            <Title>Currently Owned</Title>
            
            <FlexDiv>
            {
                userData.map((item) => {
                    
                    return (
            
            <Wrapper key={Math.floor(Math.random() * 14000000000)}>
            
            <div className="imgFlex">
                
            <div>
            <img src={item.staticImageUrl} alt="rollimg"/>
            </div>
            <div className="nameDiv">
            <h4>{item.name}</h4>
            <p className="brand">by {item.brand}</p>
            <button id={item.id} onClick={(e) => {handleClick(e); handleClickToggle()}}>Delete Roll?</button>
            {
                !toggle ?( 
                    <button id={item.id} onClick={clearCOItems}><FaWindowClose/></button>
                )
                : null 
            }
  
            </div>
            </div>
            <p className="description">{item.description}</p>
            <h5>Key Features:</h5>
            {
                (item.keyFeatures).map((item)=> {
                    return <p key={Math.floor(Math.random() * 14000000000)}>{item.feature}</p>
                })
            } 
            <h4 className="fieldNotes" >Field Notes:</h4>
            {
                (item.tags).map(tag => {
                    return <p key={Math.floor(Math.random() * 14000000000)}>{tag}</p>
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
    height: 600px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 20px;
    border-radius: 25px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;

    button {
    font-size: 15px;
    border-radius: 4%;
    background-color: white;
    color: #DC6601;
	border: none;
	cursor: pointer; 
    }

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


export default CurrentlyOwned