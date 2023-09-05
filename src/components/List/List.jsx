import React,{useState,useEffect,createRef} from 'react'; //use state used to select the following response in the form of hook

import {CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,Select} from '@material-ui/core'

import PlaceDetails from '../PlaceDetails/PlaceDetails.jsx';
import useStyles from './styles.js'



const List = ({places,childClicked,isLoading,type,setType,rating,setRating}) => {
  const classes=useStyles();

const [elRefs,setElRefs]=useState([])

console.log({childClicked});

useEffect(()=>{
const refs=Array(places?.length).fill().map((_,i)=>elRefs[i] || createRef());
   
   setElRefs(refs)
},[places]);


  return (
    <div className={classes.container}>

      {/* Selecting the form label for restaunrants and types */}
       
       <Typography variant='h4'>Restaurants ,Hotels & Attractions around you</Typography>

          {isLoading?(
          <div className={classes.loading}>
            <CircularProgress size="5rem"/>
          </div>
         ): (<>   
       <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e)=>setType(e.target.value)}>  
                                                    {/* event targeting can fetch the value directly */}
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractioins">Attractions</MenuItem>
         </Select>
       </FormControl>

       <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e)=>setRating(e.target.value)}>  
                                                    {/* event targeting can fetch the value directly */}
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem vaue={4.5}>Above 4.5</MenuItem>
         </Select>
       </FormControl>
{/* container for getting options */}
       <Grid container spacing={3} className={classes.list}>    
           {places?.map((place,i)=>(
             <Grid item key={i} xs={12}>
               <PlaceDetails
          
               selected={Number(childClicked)===i}
               refProp={elRefs[i]}
               place={place}
               />
             </Grid>
           ))}
       </Grid>
       </>
      )}
    </div>
  );
}

export default List;
