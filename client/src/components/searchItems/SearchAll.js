import { useEffect, useState } from "react";
import searchAllBanner from "../../assets/searchAllBanner.JPG"
import styled from "styled-components"
import Items from "./Items";

const SearchAll = () => {

const [allItems, setAllItems] = useState("");
    
// fetching from API all items
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
        <Title>All Items:</Title>
        <BannerDiv>
        <StyledBanner src={searchAllBanner} />
        </BannerDiv>
        <MapDiv>
            {
                allItems.map(item => {
                    return <Items key={Math.floor(Math.random() * 14000000000)} brand={item.brand} color={item.color} twenty={item.formatOneTwenty} 
                    thirtyfive={item.formatThirtyFive} iso={item.iso} name={item.name} imageSrc={item.staticImageUrl}/>
                })
            }
        </MapDiv>
        </>
    )}
    </>
    )
}

const Title = styled.h1 `
position: absolute;
font-size: 50px;
color: white;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);

`

const BannerDiv = styled.div `
    width: 100%;
    height: 60%;
`

const StyledBanner = styled.img `

    width: 100%;
    height: 100%;
    object-fit: cover;
    

`

const MapDiv = styled.div`

  margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;



export default SearchAll