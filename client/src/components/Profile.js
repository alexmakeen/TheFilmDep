
import styled from "styled-components"
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";


const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    console.log(isAuthenticated)

    const [images, setImages] = useState([])
    const [imagesToRemove, setImagesToRemove] = useState(null)

      const handleRemoveImg = (imgObj) => {

      }

      const handleOpenWidget = (e) => {
        let myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dh7lbf1fi', 
            uploadPreset: 'zenxv9ka'}, (error, result) => { 
              if (!error && result && result.event === "success") { 
                setImages((prev) => [...prev, {url: result.info.url, public_id: result.info.public_id}])
                console.log("done! ehre is the image info: ", result.info)
                }
            }
          )
          myWidget.open();
        }
        
        

    if (isLoading) {
        return <div>Loading ...</div>;
      }

 

    return (
        isAuthenticated && (
            <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <UploadButton id="upload-widget" className="cloudinary-button" 
                onClick={() => handleOpenWidget()}
                >Upload</UploadButton>
                <div className="images-preview-container">
                    {images.map((image) => {
                        return (
                            <ImageContainer src={image.url} />
                        )
                    })}
                </div>
            </div>
    )
    )
}

const UploadButton = styled.button `
margin: 50px;

`

const ImageContainer = styled.img `
width: 100px;
height: 100px;

`

export default Profile
