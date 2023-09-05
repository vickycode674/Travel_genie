import axios from 'axios'

  
//   try {
//       const response = await axios.request(options);
//       console.log(response.data);
//   } catch (error) {
//       console.error(error);
//   }
export const getPlacesData=async(type,sw,ne)=>{
    try{ 
         const {data:{data}}=await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
          params: {
            bl_latitude: sw.lat, //bottom left  //store in the form of non string
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          //   restaurant_tagcategory_standalone: '10591',
          //   restaurant_tagcategory: '10591',
          //   limit: '30',
          //   currency: 'USD',
          //   open_now: 'false',
          //   lunit: 'km',
          //   lang: 'en_US'
          },
          headers: {
            'X-RapidAPI-Key': '7a8cbdfe06msh9d5e08bb3353599p1372e4jsn0e298d04a606',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
        });

         return data; 
    }

    catch(error){
      console.log(error)
    }
}


export const getWeatherData=async()=>{

 try{

  const {data}=await axios.get('https://open-weather13.p.rapidapi.com/city/landon',{
  params:{lon:'lng' ,lat:'lat'},

  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
  }
});
  
 }
 catch(error){
  console.log(error);
 }

}