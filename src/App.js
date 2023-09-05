import React,{useState,useEffect} from "react";

//directly we are rendering from the google maps using react and npm package manager

 import {CssBaseline,Grid} from '@material-ui/core';
import Header from "./components/Header/Header"
 import List from "./components/List/List";
  import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

import {getPlacesData} from './api'


const App =()=>{

    const [places,setPlaces]=useState([]);

    const [weatherData,setWeatherData]=useState([])
    const [filteredPlaces,setFilteredPlaces]=useState([])
    const [coordinates,setCoordinates]=useState({});
    const [bounds,setBounds]=useState({});

    const [childClicked,setChildClicked]=useState(null)

    const [isLoading,setIsLoading]=useState(false); 
    const [type,setType]=useState('');
    const [rating,setRating]=useState('');


    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
            setCoordinates({lat:latitude,lng:longitude})  //destructring following data
        })
    },[])

    useEffect(() => {
        const filtered = places.filter((place) => Number(place.rating) > rating);
    
        setFilteredPlaces(filtered);
      }, [rating]);

    useEffect(()=>{ 
        if(bounds.sw &&bounds.ne){             //its compulsory to represen any kind of data 
        setIsLoading(true);

        
    //   const getWeatherData(coordinates.lat, coordinates.lng)
    //   .then((data) => setWeatherData(data));

        getPlacesData(type,bounds.sw,bounds.ne)
        .then((data)=>{
            setPlaces(data?.filter((place)=>place.name && place.num_reviews >0));
            setIsLoading(false);
        })
      }
    },[type,bounds])  
    return(
        <div>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates}/>

            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12} md={4}>
                   <List  
                   places={filteredPlaces.length?filteredPlaces:places}
                   childClicked={childClicked}
                   isLoading={isLoading}
                   type={type}
                   setType={setType}
                    rating={rating}
                  setRating={setRating}
                   />
                </Grid>

                <Grid item xs={10} md={8}>  
                 {/* xs->phones  and md for desktop */}
                    <Map
                      setCoordinates={setCoordinates}
                      setBounds={setBounds}
                      coordinates={coordinates}
                      places={places}
                      setChildClicked={setChildClicked}
                      weatherData={weatherData}
                    />
                </Grid>
            </Grid>
            
            
            <h1>Hello,World!</h1>

        </div>
    );
}

export default App;