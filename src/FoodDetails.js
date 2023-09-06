import React from "react"
import {useParams} from "react-router-dom"
import { useState,useEffect, Component } from "react";

function FoodDetails() {
    const {foodId} = useParams()
    const[data,setData] = useState(null);
    const[results,setResults] =useState(0);
    const[error,setError] = useState(null);
    const[loading,setLoading] = useState(false);
    const[summary,setSummery] = useState("");
    const[image,setImage] = useState("");
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(()=>{
        setLoading(true);
        fetch(`https://api.spoonacular.com/recipes/${foodId}/information?includeNutrition=false&apiKey=${apiKey}` 
        )
        .then((response)=>response.json())
        .then((data)=>{
            console.log("data is :" + data.summary);
            
            setData(data);
            setSummery(data.summary);
            setImage(data.image);
            setResults(data.totalResults)
        }).then(()=> setLoading(false))
        .catch((error)=>{
            console.log(error);
        })
        
        }
        ,[]
        );
    
    
    return (
        <div class="container">
            <div class="row ng-scope">
                <h1>Info:</h1>
                <p><img src={image}/></p>
                <div dangerouslySetInnerHTML={{__html: summary}}></div>
             </div>
        </div>
    )
}

export default FoodDetails