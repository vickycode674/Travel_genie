import React,{useState} from 'react'
import GoogleMapReact from 'google-map-react';  
import {Paper,Typography, useMediaQuery} from '@material-ui/core'
import LocationOnOutLinedIcon from  '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles'; 

import mapStyles from './styleMap';

const Map = ({setCoordinates ,setBounds,coordinates,places,setChildClicked,weatherData }) => {
  const classes=useStyles(); //call the classes to use hooks
  const isDesktop=useMediaQuery('(min-width:600px)');

  return (
    
    <div className={classes.mapContainer}>
      <h1>Map</h1> 
      
      <GoogleMapReact

         bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
         defaultCenter={coordinates}
         center={coordinates}
         defaultZoom={14}
         margin={[50,50,50,50]}
         option={{disableDefaultUI:true,zoomControl:true,styles:mapStyles}} 
         onChange={(e)=>{
         
           setCoordinates({lat:e.center.lat,lng:e.center.lng});
           setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw});
         }}
         onChildClick={(child)=>setChildClicked(child)}
       >

        {places?.map((place,i)=>(
          <div 
          className={classes.markerContainer}
          lat={Number(place.latitude)}
          lng={Number(place.longitude)}
          key={i}
          >
             {
              !isDesktop? (
                 <LocationOnOutLinedIcon color="primary" fontSize='large'/>)
                 :(
                  <Paper elevation={3} className={classes.paper}>
                     <Typography className={classes.tyography} variant="subtitle2" gutterBottom>
                      {place.name}
                     </Typography>

                     <img 
                        className={classes.pointer}
                         src={place.photo? place.photo.images.large.url:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'}
                        alt={place.name}
                        />

                         <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                  </Paper>
                 )
             }
          </div>
        ))}
        {weatherData?.list?.length && weatherData.list.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
          </div>
        ))}

      </GoogleMapReact>
        
    </div>
  )
}

export default Map
