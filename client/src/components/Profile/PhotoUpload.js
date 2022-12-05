import styled from "styled-components"
import { useAuth0 } from "@auth0/auth0-react";
import { useState} from "react";
import Preview from "../../assets/Preview.png"
import Profile from "../../assets/Profile.png"
import Upload from "../../assets/Upload.png"



const PhotoUpload = () => {
    const { user } = useAuth0();


    const [images, setImages] = useState([])
    const [imageObj, setImageObj] = useState([])
    // const [imagesToRemove, setImagesToRemove] = useState(null)
    // const [uploadedPhoto, setUploadedPhoto] = useState()

    

    // const handleRemoveImg = (imgObj) => {

    // }

    const handleOpenWidget = (e) => {
      let myWidget = window.cloudinary.createUploadWidget({
          cloudName: 'dh7lbf1fi', 
          uploadPreset: 'zenxv9ka'}, (error, result) => { 
            if (!error && result && result.event === "success") { 
              setImages((prev) => [...prev, {url: result.info.url, public_id: result.info.public_id}])
              console.log("done! ehre is the image info: ", result.info)
              setImageObj(result.info)

              }
          }
        )
        myWidget.open();
      }
      console.log(imageObj.url)
      

      const postToPhotos = (e) => {
        e.preventDefault()

        fetch('/photos', {
            method: "POST",
            body: JSON.stringify({
                 photos: imageObj.url, 
                 username: user.nickname,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            window.alert("Added To Photos!");
          } else {
            window.alert("Unable To Add to Photos");
          }
        })
        .catch((error) => {
          window.alert("Error, please try again.");
        });
    };


    return (
        <>
        
        <Wrapper>
            <img src={Upload} alt="uploadbtn" className="upload" />
            <img src={Preview} alt="previewimg" className="preview" />
            <img src={Profile} alt="profilebtn" className="profile" />
            <UploadDiv>
            <UploadButton id="upload-widget" className="cloudinary-button" 
            onClick={() => {handleOpenWidget();}}
            >Upload</UploadButton>
            </UploadDiv>
            <div className="images-preview-container">
            {images.map((image) => {
            return (
            <ImageContainer src={image.url} key={Math.floor(Math.random() * 14000000000)}/>
            )
            })}
            <UploadDiv>
            <SubmitButton  type="submit" onClick={postToPhotos}>submit</SubmitButton >
            </UploadDiv>
                </div>   
        </Wrapper>
        </>
    )
}

const Wrapper = styled.div `
.upload {
    width: 140px;
    height: auto;
    position: absolute;
    top: 12%;
    right: 55%;

}

.preview {
    width: 140px;
    height: auto;
    position: absolute;
    top: 25%;
    right: 30%;
}

.profile {
    width: 140px;
    height: auto;
    position: absolute;
    top: 40%;
    right: 55%;
}

`

const UploadDiv = styled.div `
  display: flex;
  justify-content: center;
`
const UploadButton = styled.button `
margin: 100px;
border: none;


`

const ImageContainer = styled.img `
width: 100px;
height: 100px;
position: absolute;
top: 23%;
    right: 47%;

`

const SubmitButton = styled.button `
    padding: 12px 20px;
    display: block;
    margin: 10px;
    font-size: 15px;
    border-radius: 4%;
    background-color: #DC6601;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    color: white;
    border: none;
    margin: 100px;
`

export default PhotoUpload