import { useAuth0 } from "@auth0/auth0-react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { FaSearch, FaUserCircle } from "react-icons/fa"
import TFDLogo from "../assets/TFDLogo.png"
import SearchBar from "./SearchBar"


const Header = () => {
  const {loginWithRedirect, logout, isAuthenticated} = useAuth0()
  
   

    return (
        <Wrapper>
        <StyledLink to="/"><Logo src={TFDLogo} alt="TFDLogo" /></StyledLink>
        <SearchBar />
        <RightHeaderItems>
        <StyledLink to="/searchAll"><FaSearch /></StyledLink>
        {!isAuthenticated && (
        <StyledLink onClick={() => loginWithRedirect()}><FaUserCircle /></StyledLink>
        )}
        {isAuthenticated && ( 
        <StyledLink to="/profile"><FaUserCircle /></StyledLink>
        )} 
        {!isAuthenticated && (
        <Button onClick={() => loginWithRedirect()}>
        Log In
        </Button>
        )}
        {isAuthenticated && ( 
        <Button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
        </Button>
        )} 
        </RightHeaderItems>
        </Wrapper>
    )
}




const Wrapper = styled.div `
display: flex;
justify-content: space-between;
padding: 15px;
background-color: #F8F0E3;
width: 100%;
position: fixed;

`

const RightHeaderItems = styled.div `


`


const Logo = styled.img `
  width: 180px;
  height: auto;
  padding: 5px;
`


const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-size: 25px;
  padding-right: 30px;

  :hover {
    cursor: pointer;
    transition: 0.2s;
    color: orange;
  }

  &.active {
    color: orange;
  }



`;


const Button = styled.button `
  background-color: black;
  border: none;
  border-radius: 25px;
  padding: 10px 15px;
  color: white;
  font-size: 18px;

  :hover {
    background-color: orange;
    transition: 0.2s;
    cursor: pointer;
  }

  &.active {
    background-color: orange;
  }
  
`

export default Header