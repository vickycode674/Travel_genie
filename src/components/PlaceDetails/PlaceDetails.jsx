import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js'
const PlaceDetails = ({place,selected,refProp}) => { //passing as props
  const classes=useStyles();
  

  if(selected) refProp?.current?.scrollIntoView({behavior:'smooth', block:'start'});
  return (
   
    //card properites whihch shows whole data and images of the follwing 
    
    // <h1>{place.name}</h1>
   <Card elevation={6}>  
      <CardMedia 
        style={{height:300}}
        image={place.photo? place.photo.images.large.url:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'}
        title={place.name}
   />

<CardContent>
<Typography gutterBottom variant="h5">{place.name}</Typography>
  
  {/* rating  for an following item  */}
  <Box display={"flex"} justifyContent={"space-between"}>
  <Rating  name="read-only" value={Number(place.rating)} readOnly />

     <Typography gutterBottom variant="subtitle1">Out of {place.num_reviews}</Typography>
  </Box>


  {/* <Typography gutterBottom variant="h5">{place.name}</Typography> */}
  
  {/* Price for an following item  */}
  <Box display={"flex"} justifyContent={"space-between"}>
     <Typography variant="legend">Price</Typography>
     <Typography gutterBottom variant="subtitle1">{place.price}</Typography>
  </Box>

{/* Rating of an hotel */}
<Box display={"flex"} justifyContent={"space-between"}>
  <Typography variant="subtitle1">Ranking</Typography>
  <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography> 
  </Box>

{/* award component for an hotel */}
{place?.awards?.map((award)=>(
  <Box display="flex" justifyContent="space-beteween" align-items="center">
    <img src={award.images.small} alt={award.display_name}/>
  </Box>
  ))}

{/* //cusine compoenent */}
{place?.cuisine?.map(({name})=>(
  <Chip key={name} size="small" label={name} className={classes.chip}/>
))}


{place?.address && (
  <Typography gutterBottom variant='subtitile2' color="textSecondary" className={classes.subtitle}>
<LocationOnIcon/> {place.address}
  </Typography>
)}

{place?.phone && (
  <Typography gutterBottom variant='subtitile2' color="textSecondary" className={classes.spacing}>
<PhoneIcon/> {place.phone}
  </Typography>
)}

<CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
      </CardActions>
  </CardContent>
</Card>
  );
}

export default PlaceDetails;
