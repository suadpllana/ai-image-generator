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
    const url = 'https://ai-text-to-image-generator-api.p.rapidapi.com/3D';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'ai-text-to-image-generator-api.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: inputRef.current.value
      })
    };
    
  
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      
      setImageData(result.url)
      setLoading(false)
    }
     
    catch (error) {
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
}

export default Images;
