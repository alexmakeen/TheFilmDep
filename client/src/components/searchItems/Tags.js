import styled from "styled-components"

const Tags = ({tags, setTags}) => {
  
  //lets a user delete a tag they've added
  const DeleteTag = (tag) => {
    const dTag = [ ...tags ];
    dTag.splice(tag, 1);

    setTags(dTag);
  };

  //function to add a tag on key down, backspace to delete
  const handleChange = (e) => {
    const tagItem = e.target.value;
    console.log(e.target.value)
    if (e.key === 'Enter' && tagItem) {
      if (tags.find(tag => tag.toLowerCase() === tagItem.toLowerCase())) {
        return;
      }
      setTags([...tags, tagItem]);
      e.target.value = ""
     
    } else if (e.key === 'Backspace' && !tagItem) {
      DeleteTag(tags.length - 1);
    }
  };
  
  return (
    <Wrapper className="inputTagContainer">
      <ul className="inputTags">
        { tags.map((tag, i) => (
          <li key={Math.floor(Math.random() * 14000000000)}>
            {tag}
            <button type="button" onClick={() => { DeleteTag(i); }}>+</button>
          </li>
        ))}
        <li className="inputTag"><input type="text" onKeyDown={handleChange} ref={ipt => { ipt = ipt; }} /></li>
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`


.inputTagContainer {
  background: white;
  border: 1px solid orangered;
  border-radius: 2px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px 5px 0;
}

.inputTags {
  display: inline-flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  width: 100%;
}

.inputTags li {
  align-items: center;
  background: orangered;
  border-radius: 2px;
  color: white;
  display: flex;
  font-weight: 300;
  list-style: none;
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 5px 10px;
}

.inputTags li button {
  display: inline-flex;
  font-size: 12px;
  height: 15px;
  justify-content: center;
  line-height: 0;
  margin-left: 8px;
  padding: 0;
  align-items: center;
  background: orangered;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transform: rotate(45deg);
  width: 15px;
}

.inputTags li.inputTag {
  background: none;
  flex-grow: 1;
  padding: 0;
}

`

export default Tags