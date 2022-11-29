import { Link } from "react-router-dom";
import styled from "styled-components"
import { useEffect, useState } from "react";
import ItemsDetails from "./ItemsDetails";
import { FaWindowClose } from "react-icons/fa"
const Items = ({key, brand, color, twenty, thirtyfive, iso, name, imageSrc}) => {

    const urlName = (name).replace(/\s+/g, '')
    // console.log(urlName)
    const [modal, setModal] = useState(false)


    const toggleModal = () => {
        setModal(!modal)

    }
    // to={`/searchAll/items/${urlName}`}
    return (
        <ItemDiv  
        // to={`/searchAll/items/${urlName}`}
        >
        <ItemImg src={imageSrc} alt="filmRoll" />
        <p>{name}</p>
        <p>{brand}</p>
        <ModalDiv>
        <button
        onClick={toggleModal}
        className="btn-modal"
        >View Details</button>
        {modal &&(
            <div className="modal">
            <div 
            onClick={toggleModal}
            className="overlay"></div>
            <div className="modal-content">
            <ItemsDetails name={urlName} />
            <button 
            className="close-modal"
            onClick={toggleModal}
            ><FaWindowClose /></button>
            </div>
            </div>
        )}
        
        </ModalDiv>
        </ItemDiv>
    )
}

const ItemDiv = styled(Link)`
  height: 450px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  text-decoration: none;
  color: black;
`;

const ItemImg = styled.img`
  height: 200px;
  width: 200px;
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

.btn-modal {
    padding: 10px 20px;
    display: block;
    margin: 100px auto 0;
    font-size: 18px;
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