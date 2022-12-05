import styled from "styled-components"
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import PhotoUpload from "./PhotoUpload";
const Photos = () => {
    const { user } = useAuth0();

    const [uploadedPhoto, setUploadedPhoto] = useState()


    useEffect(() => {
        fetch(`/photos`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data)
            const getUser = (data.data).filter(match => {
              return match.username === user.nickname
          })
            setUploadedPhoto(getUser)
        })
        .catch((err) => console.log("Error: ", err));
    }, [])

    return (
        <>
        {!uploadedPhoto ? (
            <h1>Loading...</h1>
        ) : (
        <div>
            <PhotoUpload />
            <h1>Your Fav Film Shots:</h1>
            <MapWrapper>
            {
                uploadedPhoto.map(item => {
                    return (
                      <div key={Math.floor(Math.random() * 14000000000)}>
                        <img src={item.photos} alt="img-upload" />
                      </div>
                    )
                })
            }
            </MapWrapper>
        </div>
        )}
        </>
    )
}

const MapWrapper = styled.div `
display: flex;
flex-wrap: wrap;
justify-content: center;

img {
  width: 300px;
  height: auto;
  padding: 2px;
}
`

export default Photos