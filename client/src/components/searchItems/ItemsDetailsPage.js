import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheck, FaStar } from "react-icons/fa"
import { useAuth0 } from "@auth0/auth0-react";
import Tags from "./Tags"

const ItemsDetailsPage = () => {

    const [item, setItem] = useState()
    const { name } = useParams();
    const { user, isAuthenticated } = useAuth0();
    const [tags, setTags] = useState([]);
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        fetch(`/searchAll/items/${name}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setItem(data.data)
        })
        .catch((err) => console.log("Error: ", err));
    }, [])

    const postToCO = (e) => {
        e.preventDefault()

        fetch('/currentlyOwned', {
            method: "POST",
            body: JSON.stringify({
                ...item, username: user.nickname, tags: tags
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            window.alert("Added To Currently Owned!");
          } else {
            window.alert("Unable To Add to Currently Owned");
          }
        })
        .catch((error) => {
          window.alert("Error, please try again.");
        });
    };

    const postToWishlist = (e) => {
        e.preventDefault()

        fetch('/wishlist', {
            method: "POST",
            body: JSON.stringify({
                 ...item, username: user.nickname,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            window.alert("Added To Wishlist!");
          } else {
            window.alert("Unable To Add to Wishlist");
          }
        })
        .catch((error) => {
          window.alert("Error, please try again.");
        });
    };


    const handleClick = () => {
        setToggle(!toggle)
     }

    return (
        <>
        {!item ? (
            <h1>Loading...</h1>
        ) : (
            <Wrapper>
            <div className="imgFlex">
            <div>
            <img src={item.staticImageUrl} alt="rollimage" />
            </div>
            <div className="nameDiv">
            <h4>{item.name}</h4>
            <p className="brand">by {item.brand}</p>
            {
                isAuthenticated && (
                    <>
            <button className="star" onClick={postToWishlist}><FaStar /></button>
            <span className="wishlist">add to wishlist!</span>
            </>
                )
            }
            
            </div>
            </div>
            <p className="description">{item.description}</p>
            <h5>Key Features:</h5>
            {(item.keyFeatures).map((item)=> {
                    return <p key={Math.floor(Math.random() * 14000000000)}>{item.feature}</p>
                })} 

            {
                isAuthenticated && (
                    <>
                    <button className="check" onClick={handleClick}><FaCheck /></button>
                    <span>add to currently owned!</span>
                    
                    { !toggle ? (
                    <div><h4>Add your fieldnotes:</h4>
                    <Tags tags={tags} setTags={setTags}/> 
                    <button className="submitButton" onClick={postToCO} type="submit">submit</button> </div>
                   )
                   :
                   null
                    }
                    
                    </>)
            }


            </Wrapper>
        )
        }   
        </>
    )
}

const Wrapper = styled.div `

font-family: Arial, Helvetica, sans-serif;
margin: 200px 300px;
width: 60%;
padding: 20px;
box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
border-radius: 20px;

img {
    width: 100px;
    height: auto;
    border-radius: 50px;
    border: 3px solid grey;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;}

button {
    border: none;
    background: none;
    cursor: pointer;
}

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
    justify-content: flex-start;
    font-size: 15px;
  }

  p{
    font-size: 12px;
  }

.description {
    margin: 20px 0;
}

span {
    font-size: 15px;
    padding: 5px;
    font-style: italic;
}

.check {
    color: #396431;
    font-size: 30px;
    margin: 20px;
}

.star {
    color: #f5bb17;
    font-size: 20px;
}

.submitButton {
    padding: 12px 20px;
    display: block;
    margin: 10px;
    font-size: 15px;
    border-radius: 4%;
    background-color: #DC6601;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    color: white;
}

`

export default ItemsDetailsPage