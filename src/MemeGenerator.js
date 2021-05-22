import React, { useEffect, useState } from "react";

function MemeGenerator() {
  const [state, setState] = useState({
    topText: "",
    bottomText: "",
    randomImg: "http://i.imgflip.com/1bij.jpg",
    allMemeImgs: []
  });

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        setState({ ...state, allMemeImgs: memes });
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * state.allMemeImgs.length);
    const randMemeImg = state.allMemeImgs[randNum].url;
    setState({ ...state, randomImg: randMemeImg });
  };

  return (
    <div>
      <form className="meme-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="topText"
          placeholder="Top Text"
          value={state.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={state.bottomText}
          onChange={handleChange}
        />

        <button>Generate</button>
      </form>
      <div className="meme">
        <img src={state.randomImg} alt="" />
        <h2 className="top">{state.topText}</h2>
        <h2 className="bottom">{state.bottomText}</h2>
      </div>
    </div>
  );
}

export default MemeGenerator;
