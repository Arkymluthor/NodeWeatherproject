const  request=require('request')

const geocode =(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJreW1sdXRob3IiLCJhIjoiY2tja3NueTIwMXNuZjJ6bnE4NTFoODk4aCJ9.NJe0pdXBrvDztq-30CDFBw&limit=1'
    request({url, json:true},(error,{body})=>{
     if(error){
         callback('Unable to connect',undefined)
    }else if(body.features.length===0){
         callback('Invalid location, try new search',undefined)
        
    }else{

      callback(undefined,{
          location:body.features[0].place_name,
          latitude:body.features[0].center[1],
          longitude:body.features[0].center[0]
         })

    }

})
}


module.exports= geocode