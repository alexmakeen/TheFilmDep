
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
  const { user, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }


    return (
        <div>
          <NavWrapper>
            <img src={user.picture} alt="profilepic" />
            <StyledLink to="/profile" ><h1>{user.nickname}</h1></StyledLink>
            <StyledLink  to="/currentlyOwned"><h1>Currently Owned</h1></StyledLink >
            <StyledLink  to="/Wishlist"><h1>Wishlist</h1></StyledLink >
            <StyledLink to="/photos"><h1>Photos</h1></StyledLink >
            </NavWrapper>
        </div>
    )
}

const NavWrapper = styled.div `
padding: 0 100px;


img {
    border-radius: 100%;
    width: 50px;
    height: auto;
}

h1 {
  text-align: left;
    font-family: Arial, Helvetica, sans-serif; 
    font-size: 20px;
    padding: 10px 0;
}

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


export default Sidebar