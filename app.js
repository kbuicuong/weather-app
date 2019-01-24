//after page loaded
window.addEventListener('load', () => {

    //longitude and latitude
    let long;
    let lat;

    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    //if have location from user
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //Doesn't work without this proxy
            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/79e3dfa148646c16381ecf28b9e75874/${lat},${long}`;

            //Get data, convert to json then get data
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    //Set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //calculate celsius
                    let celsius = (temperature - 32) * (5/9);

                    //Set icon
                    setIcons(icon, document.querySelector('#icon'));

                    //Change temp to celsius/farenheit
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "F"){
                            temperatureDegree.textContent = Math.floor(celsius);
                            temperatureSpan.textContent = "C";
                        }else{
                            temperatureDegree.textContent = temperature;
                            temperatureSpan.textContent = "F";
                        }
                    })
                })
        });

        function setIcons(icon, iconID){
            const skycons = new Skycons({color: "white"});
            //replace '-' with '_'
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }

    }
    // else{
    //     h1.textContent = "Please Enable location"
    // }

});