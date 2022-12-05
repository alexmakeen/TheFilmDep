import styled from "styled-components"
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"

const SearchBar = () => {

    const [value, setValue] = useState("")

    const [allItems, setAllItems] = useState([]);
    

useEffect(() => {
    fetch("/searchAll").then((res) => {
        res.json().then((data) => {
            
            setAllItems(data.data)
        })
    })
}, [])



    const matchedSuggestions = allItems.filter((suggestion) => {
        return (
            suggestion.name.toLowerCase().includes(value.toLowerCase()) && 
            value.length >=2
        )
    })

    const handleSelect = () => {
        setValue("")
    }

    

    return (
        <>
        {!allItems.length === 0 ? (
            <h1>Loading</h1>
        ) : (
    <StyleForm>
          <input
            className="inputSearch"
            type="search"
            placeholder="what roll are you looking for?"
            onChange={(ev) => {
              setValue(ev.target.value);
            }}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                handleSelect(ev.target.value);
              }
            }}
          />
          <i onClick={() => setValue("")}></i>
          <div className="container">
            {matchedSuggestions.length > 0 && (
              <SuggestionsList>
                {matchedSuggestions.map((suggestion) => {
                    const urlName = (suggestion.name).replace(/\s+/g, '')
                  return (
                    <SuggestionLink
                      to={`/searchAll/items/${urlName}`}
                      onClick={() => handleSelect(suggestion)}
                      key={Math.floor(Math.random() * 14000000000)}
                    >
                      <li className="miniDiv">
                        <div>
                        <Image src={suggestion.staticImageUrl} alt="miniImages" />
                        {/* {suggestion.name.slice(
                          0,
                          suggestion.name
                            .toLowerCase()
                            .indexOf(value.toLowerCase()) + value.length
                        )} */}
                        </div>
                        <div>
                        <Prediction>
                          {suggestion.name.slice(
                            suggestion.name
                              .toLowerCase()
                              .indexOf(value.toLowerCase()) 
                            //   + value.length
                          )}
                        </Prediction>
                        </div>
                      </li>
                    </SuggestionLink>
                  );
                })}
              </SuggestionsList>
            )}
          </div>
        </StyleForm>
      )}
    </>
  );
};

export default SearchBar;

const StyleForm = styled.form`
  background-color: white;
  border-radius: 25px;
  position: absolute;
  width: 500px;
  /* z-index: 2; */
  left: 32%;
  top: 20%;
  

  :hover .inputSearch {
    width: 500px;
    background: white;
    border-radius: 25px;
  }

  .inputSearch {
    width: 500px;
    background: none;
    border: 4px solid black;
    border-radius: 50px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 20px;
    color: black;
  }
  .inputSearch::placeholder {
    color: black;
    font-size: 18px;
  }

  .inputSearch:focus {
    border-radius: 25px;
    background-color: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

const SuggestionsList = styled.ul`
  /* z-index: 2; */
  .miniDiv {
    display: flex;
    width: 100%;
    height: auto;
    align-items: center;
    background-color: white;
    box-shadow: 5px 10px 20px #888888;
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .miniDiv-first-child {
    background-color: #c996cc;
  }

  .miniDiv:hover {
    background-color: #faf9f6;
    border: 4px solid orange;
    transition: 0.3s ease-in-out;
  }
`;

const SuggestionLink = styled(NavLink)`
  text-decoration: none;
  color: #060930;
  position: relative;
`;

const Prediction = styled.span`
  font-weight: bold;
  margin-left: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 8px;
  border: 3px solid orange;
  border-radius: 100%;
  /* z-index: 2; */
`;
