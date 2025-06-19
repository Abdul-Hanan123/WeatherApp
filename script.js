// WEATHER APP PROJECT

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "2a508cdf43fdc5b39489a4222155eb27";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getweatherData(city);
            displayweatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    } else{
        displayError("Please Enter a City");
    }
});

async function getweatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    
    if(!response.ok){
        throw new Error("Could not fetch Weather Data!");
    }
    return await response.json();
}

function displayweatherInfo(data){
    
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`
    tempDisplay.classList.add("tempDisplay"); 
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay"); 
    descDisplay.textContent = description;
    descDisplay.classList.add("descDisplay");
    weatherEmoji.textContent = getweatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getweatherEmoji(weatherID){

    switch(true){
        case (weatherID >= 200 && weatherID < 300):
        return "🌩";
        case (weatherID >= 300 && weatherID < 400):
        return "🌨";
        case (weatherID >= 500 && weatherID < 600):
        return "🌧";
        case (weatherID >= 600 && weatherID < 700):
        return "❄";
        case (weatherID >= 700 && weatherID < 800):
        return "🌫";
        case (weatherID === 800):
        return "🌞";
        case (weatherID >= 801 && weatherID < 810):
        return "☁";
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}