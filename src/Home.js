import { useState,useEffect, Component } from "react";
import FoodFooter from "./FoodFooter";
import FoodEntry from "./FoodEntry";
import FoodHeader from "./FoodHeader";
import 'bootstrap/dist/css/bootstrap.css';



const cuisinesList = [
    "African",
    "Asian",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese"
];

const dietList = [
    {
      order: 0,
      name: "Gluten Free",
    },
    {
      order: 1,
      name: "Ketogenic",
    },
    {
      order: 2,
      name: "Vegetarian",
    },
    {
        order: 0,
        name: "Lacto-Vegetarian",
      },
      {
        order: 1,
        name: "Ovo-Vegetarian",
      },
      {
        order: 2,
        name: "Vegan",
      },
      {
        order: 2,
        name: "Pescetarian",
      },
      {
          order: 0,
          name: "Paleo",
        },
        {
          order: 1,
          name: "Primal",
        },
        {
          order: 2,
          name: "Low FODMAP",
        }
  ];


function Home() {

    

    const[pageSize,setPageSize] = useState(10)

    const[data,setData] = useState(null);
    const[diet,setDiet] = useState("");
    const[selectedDiet,setSelectedDiet] = useState([{}]);
    const[includeNutrition,setIncludeNutrition] = useState(false);
    const[cuise,setCuise] = useState("");
    const[results,setResults] =useState(0);
    const[searchFood,setSearchFood] = useState("");
    const[error,setError] = useState(null);
    const[loading,setLoading] = useState(false);
    const apiKey = process.env.REACT_APP_API_KEY;

    const handleChange = (event)=>{
        console.log(event.target.value);
        setPageSize(event.target.value);
    };
    const handleTextSearch = (event)=>{
        setSearchFood(event.target.value);
    };

    const handleCuisenChange = (event)=>{
        console.log(event.target.value);
        setCuise(event.target.value);
    };

    const handleIncludeNutrition = (event)=>{
        setIncludeNutrition(!includeNutrition);
    }
    
    const handleDiet = (event)=>{
        /*console.log(event.target.value);
        console.log(event.target.name);
        console.log(event.target.checked);
        setDiet(event.target.name);*/
         //var array = [...selectedDiet]; make a separate copy of the array
        if(event.target.checked){
            console.log("Field : " + event.target.name + " checked " + event.target.checked)
            selectedDiet.push({"name":event.target.name,"checked":event.target.checked});
        }else{
            console.log("Field : " + event.target.name + "Not checked " + event.target.checked + " then remove it from selected list ")
            let filtered = selectedDiet.filter((current)=>{
                return event.target.name !== current.name && current.checked === true
              });
            let dietStr = filtered.map((entry)=>{
                console.log(entry);
                return entry.name + ","
            })
            setSelectedDiet(filtered);
            console.log("After filter ");
            console.log(filtered);
            console.log(dietStr.join(""));
            setDiet(dietStr.join(""));
        }
       
       
       
    }

    useEffect(()=>{
        setLoading(true);
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=`+pageSize 
        + "&query=" + searchFood + "&cuisine=" 
        + cuise + "&includeNutrition=" 
        + includeNutrition
        +"&diet="+diet)
        .then((response)=>response.json())
        .then((data)=>{
            console.log("data is :" + data);
            console.log(JSON.stringify(data.results));
            console.log("type is " + typeof data.results);
            console.log("val is " +  data.results[0].title);
            data.results.map((arr,index)=>{
                
                     console.log(arr.title);
               
               
            })
            setData(data.results);
            setResults(data.totalResults)
        }).then(()=> setLoading(false))
        .catch((error)=>{
            console.log(error);
        })
        
        }
        ,[pageSize,searchFood,cuise,includeNutrition,diet]
        );

        const style = {
            "textAlign":"center"
        }

    
    if(error){
        
        return <pre>{JSON.stringify(error)}</pre>
    }
    if(!data){
        return null;
    }

    //const all = data.map((da,index) => <FoodEntry avatar={da.image} name={da.title} location={da.title}/>);
    //<Link to={`/users/${user.id}`} activeClassName="current">{user.name}</Link>
    const allCuisines = cuisinesList.map((da) =>  <option value={da}>{da}</option>);
        return(
                <>
                  <div className="container">
                        <div className="row ng-scope">
                            <div className="col-md-3 col-md-push-9">
                                <h4>Results <span className="fw-semi-bold">Filtering</span></h4>
                                <p className="text-muted fs-mini">Listed content is categorized by the following groups:</p>
                                <ul className="nav nav-pills nav-stacked search-result-categories mt">
                                    <li><a href="#">Friends <span className="badge">34</span></a>
                                    </li>
                                    <li><a href="#">Pages <span className="badge">9</span></a>
                                    </li>
                                    <li><a href="#">Images</a>
                                    </li>
                                    <li><a href="#">Groups</a>
                                    </li>
                                    <li><a href="#">Globals <span className="badge">18</span></a>
                                    </li>
                                </ul>
                                <div className="row">
                                    <label>Cuisines:</label>
                                    <select className="form-select" aria-label="Default select example" value={cuise} onChange={handleCuisenChange}>
                                        {allCuisines}
                                    </select>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" checked={includeNutrition} id="flexCheckDefault"  onChange={handleIncludeNutrition}/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Include Nutrition
                                    </label>
                                </div>

                                <div className="row">
                                    
                                        {dietList.map(({ name, order }, index) => {
                                        return (
                                           
                                            <div key={index}>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`custom-checkbox-${index}`}
                                                        name={name}
                                                        value={name}
                                                        onChange={handleDiet}
                                                        
                                                    />
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                       {name}
                                                    </label>
                                                </div>
                                            </div>
                                           
                                        );
                                        })}
                                    
                            </div>


                            </div>
                            <div className="col-md-9 col-md-pull-3">
                            
                                <FoodHeader pageSize={pageSize} searchFood={searchFood} results={results} handleTextSearch={handleTextSearch} handleChange={handleChange}/>
                                
                                {loading ? 
         <h1 style={style}>Loading ...</h1>
     : data.map(function(da, idx){
                                        return (<FoodEntry avatar={da.image} name={da.title} location={da.title} id={da.id}/>)
                                })}

                                <FoodFooter result={results}/>
                            </div>
                        </div>
                    </div>
                   
                </>
                   
    );



}

export default Home;