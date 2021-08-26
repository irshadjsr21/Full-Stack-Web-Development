import React from "react";

function Title(props) {
  const [counter, setCounter] = React.useState(0);
  const [text, setText] = React.useState("Title");

  const onClickBtn = () => {
    console.log("Click");
    setCounter(counter + 1);
    setText(text + " Changed");
  };

  return (
    <div>
      <p>{text}{" "}{counter}</p>
      <button onClick={onClickBtn}>Click</button>
    </div>
  );
}

export default Title;
