import React from "react";

const style = {
  styleTtile: {
    textAlign: "center",
  },
};

function Title(props) {
  const { title } = props;
  return <h1 style={style.styleTtile}>{title}</h1>;
}

export default Title;
