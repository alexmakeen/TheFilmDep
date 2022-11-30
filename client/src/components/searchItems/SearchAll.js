import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components"
import SearchBar from "../SearchBar";
import Items from "./Items";

const SearchAll = () => {

const [allItems, setAllItems] = useState("");
    

useEffect(() => {
    fetch("/searchAll").then((res) => {
        res.json().then((data) => {
            
            setAllItems(data.data)
        })
    })
}, [])

    return (
        <>
        {!allItems ? (
            <h1>Loading</h1>
        ) : (
        <>
        <h1>All Items:</h1>
        
        <MapDiv>
            {
                allItems.map(item => {
                    return <Items key={item._id} brand={item.brand} color={item.color} twenty={item.formatOneTwenty} 
                    thirtyfive={item.formatThirtyFive} iso={item.iso} name={item.name} imageSrc={item.staticImageUrl}/>
                })
            }
        </MapDiv>
        </>
    )}
    </>
    )
}

const MapDiv = styled.div`

  margin-top: 270px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;


export default SearchAll