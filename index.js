
 function  fetchWeatherDetails(cityName){
    const APIkey='b724e0df8fbe88d6d737a920c99afaf2';
    url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`
    return  fetch(url)
         .then(response=>{
        return response.json()
    })
    .then(data=>data)
    .catch(error=>{
        console.log(error)
        console.error('Error fetching weather data:', error);
       return null
    })
}

function getWeatherIconClass(iconCode) {
    const weatherIcons = {
        '01d': 'fa-solid fa-sun',
        '01n': 'fa-solid fa-moon',
        '02d': 'fa-solid fa-cloud-sun',
        '02n': 'fa-solid fa-cloud-moon',
        '03d': 'fa-solid fa-cloud',
        '03n': 'fa-solid fa-cloud',
        '04d': 'fa-solid fa-cloud',
        '04n': 'fa-solid fa-cloud',
        '09d': 'fa-solid fa-cloud-rain',
        '09n': 'fa-solid fa-cloud-rain',
      
    };
  
    return weatherIcons[iconCode] || 'fa-question'; 
  }


function DisplayFetchDetails(data){
    if(!data){
        alert('Please Enter valid location')
    }else{
        document.getElementById('error').classList.add('no-display')
        document.getElementById('weather').classList.remove('no-display')
        console.log(data)
        const { name, main, weather ,wind} = data;
        if(data.cod==404){
            document.getElementById('error').classList.remove('no-display')
            document.getElementById('weather').classList.add('no-display')
        }
        document.getElementById('place').innerText=name;
        document.getElementById('temperature').innerText=(main.temp-273).toFixed(2)+'°C';
        document.getElementById('weather-condition').innerText=weather[0].description;
        document.getElementById('Humidity').innerText=main.humidity+' %';
        document.getElementById('windSpeed').innerText=wind.speed+' km/h';
        const weatherIconClass = getWeatherIconClass(weather[0].icon);
        const weatherIconEle=document.getElementById('Weather-icon');
        weatherIconEle.className='';
        weatherIconEle.classList.add(...weatherIconClass.split(' '))
    }
    
}

submitBtn.addEventListener('submit', (e) => {
    e.preventDefault()
    const cityName=document.getElementById('inputEle').value;
    if(cityName==''){
        alert('Enter Location')
    }else{
        fetchWeatherDetails(cityName)
        .then(data=>DisplayFetchDetails(data))
    }

})
    
   