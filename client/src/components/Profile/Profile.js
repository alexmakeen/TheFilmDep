
import styled from "styled-components"
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Sidebar from "./Sidebar";
import Photos from "./Photos";
import DashboardBanner from "../../assets/DashboardBanner.jpg"

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    
    const [userData, setUserData] = useState("");

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
    }, [])
 

    if (isLoading) {
        return <div>Loading ...</div>;
      }




    return (
      <>
      {!userData ? (
        <h1>Loading...</h1>
    ) : (
        isAuthenticated && (
          <>
          <BannerDiv>
        <StyledBanner src={DashboardBanner} />
        </BannerDiv>
            <Wrapper>
              <div>
              <Sidebar/>
              </div>
              <div>
                <h1>You currently own these rolls:</h1>
                <div className="CObox">
                <Link to="/currentlyOwned">
                  <div className="COdiv">
              {
                userData.map(item => {
                  console.log(item.name)
                  return (
                    <div  key={Math.floor(Math.random() * 14000000000)}>
                    <img className="COimg" src={item.staticImageUrl} alt="Coimg" />
                    </div>
                  )
                })
              }
              </div>
              </Link>
              </div>
              </div>
            </Wrapper>
            
            <PhotoComponentWrapper>
            <Link to="/photos">
            <Photos />
            </Link>
            </PhotoComponentWrapper>
            
            </>))}
    </>)
}

const BannerDiv = styled.div `
    width: 100%;
    height: 60%;
`
const StyledBanner = styled.img `

    width: 100%;
    height: 100%;
    object-fit: cover;
    

`

const Wrapper = styled.div `
display: flex;
margin-top: 20px;

img {
  border-radius: 100%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  width: 100px;
  height: 100px;

}

.COimg {
  margin: 10px;

}

.COdiv {
display: flex;
}


`

const PhotoComponentWrapper = styled.div `
margin-left: 350px;
margin-top: -100px;
display: flex;
    flex-wrap: wrap;
a{
  text-decoration: none;
  color: black;
}

img {
  
  border-radius: 100%;
  width: 100px;
  height: 100px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

button {
  display: none;
}

h1 {
  text-align: left;
  margin-left: 50px;
}

.preview, .upload, .profile {
  display: none;
}

`

export default Profile
