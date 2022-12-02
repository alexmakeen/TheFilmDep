import styled from "styled-components"
import SearchBar from "./SearchBar"
import Banner from "../assets/Banner.JPG"
import HomeFeed from "./HomeFeed"
import { useEffect, useState } from "react";
const HomePage = () => {

const [feed, setFeed] = useState("");
    

useEffect(() => {
    fetch("/searchAll").then((res) => {
        res.json().then((data) => {
            
            setFeed(data.data)
        })
    })
}, [])


    return (
        <>
        {/* <StyledBanner> */}
        <BannerDiv>
        <StyledBanner src={Banner} alt="Banner" />
        <Tagline>The Film Dep is a repository of rolls - find your film, shoot your shots, log your notes</Tagline>
        </BannerDiv>
        {/* </StyledBanner> */}

        <HomeFeed />
        </>
    )
}

const BannerDiv = styled.div `
    width: 100%;
    height: 100%;
`

const StyledBanner = styled.img `

    width: 100%;
    height: 100%;
    object-fit: cover;
    

`
const Tagline = styled.p `
    position: absolute;
    width: 50%;
    text-align: center;
    top: 27%;
    left: 26%;
    color: #AF2413;
    font-weight: bold;
    font-size: 35px;
`





export default HomePage

