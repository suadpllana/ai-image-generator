import React from "react";
import {useState,useRef} from "react"
import image from "./assets/image.png"


const Images = () => {

    const inputRef = useRef(null)

    const [imagesData , setImageData] = useState(null)
    const [loading , setLoading] = useState(false)

  async function getImages() {
    try {
    setLoading(true)
    const url = "https://open-ai21.p.rapidapi.com/texttoimage2";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key":  import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "open-ai21.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputRef.current.value }),
    };

   
      const response = await fetch(url, options);
      const result = await response.json();
     
      setImageData(result.generated_image)
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  function enter(e){
    if(e.key === "Enter"){
      getImages()
    }
  }


  return (
        <div>
            <h1>AI Image <span>Generator</span></h1>
                <img src={imagesData ? imagesData : image} alt="" /><br />
                <div className="loading">
                  <div className={loading? "loading-bar-full" : "loading-bar"}></div>
                  <div className={loading?"loading-text" :  "display-none"}>Loading...</div>
                </div>


                <input onKeyDown={(e) => enter(e)} placeholder="Describe what u wanna see" ref={inputRef} type="text" />

                <button onClick={getImages}>Generate</button>
        </div>
  )
};

export default Images;
