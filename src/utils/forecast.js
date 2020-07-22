const request = require('request')


const forecast=(long,lat,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=46e5a47f13444400e9ca348be4b3eb07&query='+ encodeURIComponent(lat)+','+encodeURIComponent(long) +'&units=f'
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('unable to connect')
        }else if(body.error){
            callback('unable to find location') 
        } else{
            callback(undefined,body.current.weather_descriptions[0] + '.It is currently ' + body.current.temperature + ' degrees out. It feels like '+ body.current.feelslike + ' degrees.' )
             
        }

    })


}

module.exports= forecast