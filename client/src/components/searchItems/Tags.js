import { useState } from "react"
import styled from "styled-components"


const Tags = ({tags, setTags}) => {
  
  
  const DeleteTag = (tag) => {
    const newTags = [ ...tags ];
    newTags.splice(tag, 1);

    setTags(newTags);
  };

  const handleChangeDown = (e) => {
    const val = e.target.value;
    console.log(e.target.value)
    if (e.key === 'Enter' && val) {
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val]);
      e.target.value = ""
     
    } else if (e.key === 'Backspace' && !val) {
      DeleteTag(tags.length - 1);
    }
  };
  
  return (
    <Wrapper className="input-tag">
      <ul className="input-tag__tags">
        { tags.map((tag, i) => (
          <li key={tag}>
            {tag}
            <button type="button" onClick={() => { DeleteTag(i); }}>+</button>
          </li>
        ))}
        <li className="input-tag__tags__input"><input type="text" onKeyDown={handleChangeDown} ref={c => { c = c; }} /></li>
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
body {
  background: #f2f2f2;
  padding: 20px;
}

.input-tag {
  background: white;
  border: 1px solid #d6d6d6;
  border-radius: 2px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px 5px 0;
}

.input-tag input {
  border: none;
  width: 100%;
}

.input-tag__tags {
  display: inline-flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  width: 100%;
}

.input-tag__tags li {
  align-items: center;
  background: #85A3BF;
  border-radius: 2px;
  color: white;
  display: flex;
  font-weight: 300;
  list-style: none;
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 5px 10px;
}

.input-tag__tags li button {
  align-items: center;
  appearance: none;
  background: #333333;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: inline-flex;
  font-size: 12px;
  height: 15px;
  justify-content: center;
  line-height: 0;
  margin-left: 8px;
  padding: 0;
  transform: rotate(45deg);
  width: 15px;
}

.input-tag__tags li.input-tag__tags__input {
  background: none;
  flex-grow: 1;
  padding: 0;
}

`

export default Tags