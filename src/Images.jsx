import React from "react";
import {useState,useRef} from "react"
import image from "./assets/image.png"
import { FaCity } from "react-icons/fa6";
import { MdForest } from "react-icons/md";
import { IoIosAirplane } from "react-icons/io";

const Images = () => {


  const imageRef = useRef(null); 

  
  
  const [inputText , setInputText] = useState("")
    const [imagesData , setImageData] = useState(null)
    const [loading , setLoading] = useState(false)

  async function getImages() {
    if(inputText === ""){
      alert("Please fill the input")
      return
    }
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
        inputs: inputText
      })
    };
    
  
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      
      setImageData(result.url)
      setLoading(false)
      setInputText("")
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

  const prompts = [
    {
      icon: <FaCity className="icon"/>,
      text:  "A futuristic cityscape at sunset, blending neon cyberpunk aesthetics with lush green vertical gardens on skyscrapers."
    },
    {
      icon:  <MdForest className="icon"/>,
      text: "A magical forest where glowing mushrooms light the way, and a small, enchanted river flows with sparkling liquid gold."
    },
    {
      icon: <IoIosAirplane className="icon"/>,
      text: "A steampunk-inspired airship flying over a Victorian-era city, with intricate gears and pipes visible against a vibrant, cloudy sky."
    }
   
  ]


  return (
        <div>
          <h2>Suggested prompts</h2>
          <div className="promptContainer">
         {prompts.map((item ,index) => (
          <div key={index} onClick={() => setInputText(item.text)}>
            {item.icon} <br/>
            <p >{item.text}</p>
          </div>
         ))}
          </div>


            <h1>AI Image <span>Generator</span></h1>
      
            
            <img 
             className="generatedImage"    
          
             src={imagesData ? imagesData : image} 
             alt="" /><br />
      
             
                <div className="loading">
                  <div className={loading? "loading-bar-full" : "loading-bar"}></div>
                  <div className={loading?"loading-text" :  "display-none"}>Loading...</div>
                </div>


                <input onKeyDown={(e) => enter(e)} placeholder="Describe what u wanna see" onChange={(e) => setInputText(e.target.value) } value={inputText} type="text" />

                <button onClick={getImages}>Generate</button>
        </div>
  )
}

export default Images;
