import styled from "styled-components"
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Feed = ({userData, getComments, setGetComments}) => {

    const { user, isAuthenticated } = useAuth0();
    const [comments, setComments] = useState([""])
    const [postId, setPostId] = useState("")
    const [toggle, setToggle] = useState(true)
    
    const handleClick = (e) => {
        // console.log(e.target)
        // console.log(e.target.id)
        setPostId(e.target.id)
    }   
    
    // post method to comments collection
    const postToComments = (e) => {
        e.preventDefault()
        
        fetch('/comments', {
            method: "POST",
            body: JSON.stringify({
                // ...item, user: user,
                id: postId,
                comments: comments, 
                usernameComment: user.nickname,
                 
                 
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            
            window.alert("Added To Comments!");
            setComments("")
            setGetComments("")
    
          } else {
            window.alert("Unable To Add to Comments");
          }
        })
        .catch((error) => {
          window.alert("Error, please try again.");
        });
    };

    const userComments = userData.map(item => ({...item, ...getComments.find(obj => obj.id === item.id)}))
    // console.log(userComments)    

    const handleClickToggle = () => {
        setToggle(!toggle)
     }

    return (
        <>
       <Wrapper>
        <Heading>Here's what others are shooting with at the moment:</Heading>
        </Wrapper>
        <FlexDiv>
            {/* {
                console.log(getComments)
            } */}
            {
                userComments.map(item => {
                    return (
            
            <MapWrapper >
            <div className="imgFlex">
            <div>
            <img src={item.staticImageUrl} />
            </div>
            <div className="nameDiv">
            <p className="addedByUser">Added to Currently Owned by {item.username}</p>
            <h4>{item.name}</h4>
            
            <p className="brand">by {item.brand}</p>
            </div>
            </div>
            
            <h5>Field Notes:</h5>
            {
                (item.tags).map(tag => {
                    return <p>{tag}</p>
                })
            }
            {
                isAuthenticated && (
            <button className="openCommentsBtn">comments:</button>
                )
            }
            
            {/* {!toggle ?( */}
                <FormContainer>
                <form>
                    <input id={item.id} type="text" name="fieldNotes" autocomplete="off" onClick={(e) => handleClick(e)} onChange={(e) => setComments(e.target.value)} />
                    <button onClick={postToComments} type="submit">add comment</button> 
                    </form> 
                       <p className="commentAuthor">{item.usernameComment}</p>
                       <p className="commentPosted">{item.comments}</p> 
                       </FormContainer>
            {/* )
            : null  */}
            {/* } */}
        
         
            
            </MapWrapper>
                    )
                })
            }
            </FlexDiv>
        </>
    )
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

    .comments {
        font-size: 1000px;
        color: red;
        margin: 1000px;
    }

    .openCommentsBtn{
    padding: 10px 10px;
    display: block;
    margin: 15px 0;
    font-size: 15px;
    border-radius: 4%;
    background-color: #DC6601;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    color: white;
	border: none;
	cursor: pointer;
    }

    .addedByUser {
        color: #47a664;
        font-weight: bold;
        font-style: italic;
    }
    `

    const FormContainer = styled.div `
    
    input {
        width: 500px;
        height: 25px;
    }
    
    button {
    padding: 5px 5px;
    display: block;
    margin: 15px 0;
    font-size: 10px;
    border-radius: 4%;
    background-color: #DC6601;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    color: white;
	border: none;
	cursor: pointer; 
    }

    .commentAuthor{
        color: purple;
        font-style: italic;
        text-decoration: underline;
        font-weight: bold;
    }

    .commentPosted {
        padding: 3px 0;
        font-style: italic;
        color: purple;
    }
    `

export default Feed