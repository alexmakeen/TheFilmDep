import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemsDetails = ({name}) => {

    const [item, setItem] = useState()
    // const { name } = useParams();

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
                ...item,
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
    
    

    return (
        <>
        {!item ? (
            <h1>Loading...</h1>
        ) : (
            <Wrapper>
            <img src={item.staticImageUrl} />
            <h4>{item.name}</h4>
            <p>by {item.brand}</p>
            <p>ISO {item.iso}</p>
            <p>{item.description}</p>
            <h5>Key Features:</h5>
            {
            // console.log(item.keyFeatures)
                (item.keyFeatures).map((item)=> {
                    return <p>{item.feature}</p>
                })
            } 
            <button onClick={postToCO}>+</button>
            </Wrapper>
        )
        }   
        </>
    )
}

const Wrapper = styled.div `
img {
    width: 100px;
    height: auto;
}

`

export default ItemsDetails