import styled from "styled-components"
import { useState } from "react";
import ItemsDetails from "./ItemsDetails";
import { FaWindowClose } from "react-icons/fa"
import { MdInvertColors } from "react-icons/md"
import { RiCameraLensFill } from "react-icons/ri"
import { useAuth0 } from "@auth0/auth0-react";

const Items = ({brand, color, twenty, thirtyfive, iso, name, imageSrc}) => {
    const { isAuthenticated } = useAuth0();
    const urlName = (name).replace(/\s+/g, '')
    // console.log(urlName)
    const [modal, setModal] = useState(false)

    //toggle for modal popup
    const toggleModal = () => {
        setModal(!modal)
    }


    const blackWhite = color === false
    const thirtyFive = thirtyfive === true
    const twentyRoll = twenty === true

    return (
        <>
        <ItemDiv>
        <ItemImg src={imageSrc} alt="filmRoll" />
        <p className="name">{name}</p>
        <p className="brand">{brand}</p>
        <div className="details">
        <div className="format">
            <p>format:</p>
            {thirtyFive && (
                    <>
                    <p>35mm</p>                    
                    </>
                )}
            {twentyRoll && (
                    <>
                    <p>120mm</p>                    
                    </>
                )}
            </div>
            <div className="icons">
            <p><RiCameraLensFill /> iso {iso}</p>
            {!blackWhite && (
                    <>
                    <p><MdInvertColors className="colorOption" />color</p>                    
                    </>
                )}
            {blackWhite && (
                    <>
                    <p><MdInvertColors />black</p>                    
                    </>
                )}
            </div>

        </div>
        {isAuthenticated && (<ModalDiv>
                <button
                onClick={toggleModal}
                className="modalButton"
                >View Details</button>
                {modal &&(
                    <div className="modal">
                    <div 
                    onClick={toggleModal}
                    className="overlay"></div>
                    <div className="modal-content">
                    <ItemsDetails name={urlName} color={color} thirtyfive={thirtyfive} twenty={twenty}  />
                    <button 
                    className="close-modal"
                    onClick={toggleModal}
                    ><FaWindowClose /></button>
                    </div>
                    </div>
                )}
                </ModalDiv>)
        }
        </ItemDiv>
        </>
    )
}


const ItemDiv = styled.div`
  height: 400px;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3px;
  border-radius: 1%;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;  
  text-decoration: none;
  color: black;

  p {
    font-family: Arial, Helvetica, sans-serif;
    padding: 2px;
    padding-right: 10px;
  }

  .name {
    font-size: 20px;
    font-weight: bold;
  }

  .brand {
    font-style: italic;
  }

  .colorOption {
    color: #cb65f4;
  }

  .details {
    display: flex;
    margin-top: 10px;
    justify-content: flex-end;
    font-size: 15px;
  }

`;

const ItemImg = styled.img`
  height: 175px;
  width: 175px;
  margin-bottom: 10px;
`;

const ModalDiv = styled.div `

button {
    background: none;
	color: inherit;
	border: none;
	padding: 0;
	cursor: pointer;
	outline: inherit;
}

.modalButton {
    padding: 12px 20px;
    display: block;
    margin: 10px;
    font-size: 15px;
    border-radius: 4%;
    background-color: #DC6601;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    color: white;
}



.modal, .overlay {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
}

.overlay {
    background: rgba(49,49,49,0.8);
}
.modal-content {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1.4;
    background: #f1f1f1;
    padding: 14px 28px;
    border-radius: 3px;
    max-width: 600px;
    min-width: 300px;
}

.close-modal {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 7px;
}

`

export default Items