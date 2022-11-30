import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdInvertColors} from "react-icons/md"
import { RiCameraLensFill } from "react-icons/ri"
import { FaCheck, FaStar } from "react-icons/fa"

const ItemsDetailsPage = ({thirtyfive, twenty, color}) => {

    const [item, setItem] = useState()
    const { name } = useParams();

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
    
    // const blackWhite = color === false
    // const thirtyFive = thirtyfive === true
    // const twentyRoll = twenty === true

    return (
        <>
        {!item ? (
            <h1>Loading...</h1>
        ) : (
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

            <div className="details">
            <div className="format">
            <p>format:</p>
            {/* {
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
            } */}
            </div>
            </div>
            <p className="description">{item.description}</p>
            <h5>Key Features:</h5>
            {
            // console.log(item.keyFeatures)
                (item.keyFeatures).map((item)=> {
                    return <p>{item.feature}</p>
                })
            } 
            <button className="check" onClick={postToCO}><FaCheck /></button>
            <button className="star"><FaStar /></button>
            </Wrapper>
        )
        }   
        </>
    )
}

const Wrapper = styled.div `

font-family: Arial, Helvetica, sans-serif;

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

export default ItemsDetailsPage