//after page loaded
window.addEventListener('load', () => {

    //longitude and latitude
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

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

                    //Set icon
                    setIcons(icon, document.querySelector('#icon'));
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