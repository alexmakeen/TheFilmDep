import styled from "styled-components"
import Banner from "../assets/Banner.JPG"
import HomeFeed from "./HomeFeed"
import { useEffect, useState } from "react";
const HomePage = () => {


const [userData, setUserData] = useState("");



useEffect(() => {
    fetch("/currentlyOwned").then((res) => {
        res.json().then((data) => {
            setUserData(data.data)
        })
    })
}, [])

console.log(userData)


    return (
        <>
        {!userData ? (
            <h1>Loading</h1>
        ) : (
        <>
        {/* <StyledBanner> */}
        <BannerDiv>
        <StyledBanner src={Banner} alt="Banner" />
        </BannerDiv>
        {/* </StyledBanner> */}

        <HomeFeed userData={userData} />
        </>
        )}
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

