const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    const cityDetails = data.cityDetails;
    const weatherDetails = data.weatherDetails;
    
    details.innerHTML = `
	<h5 class="my-3">${cityDetails.EnglishName}</h5>
	<div class="my-3">${weatherDetails[0].WeatherText}</div>
	<div class="display-4 my-4">
		<span>${weatherDetails[0].Temperature.Metric.Value}</span>
		<span>&deg;C</span>
	</div>
	`;

	// update images
	const iconSrc = `img/icons/${weatherDetails[0].WeatherIcon}.svg`;
	icon.setAttribute('src', iconSrc);

	let timeSrc = null;
	weatherDetails[0].IsDayTime ? timeSrc='img/day.svg' : timeSrc='img/night.svg';
	time.setAttribute('src',timeSrc);

	//remove d-none if present
	card.classList.contains('d-none') ? card.classList.remove('d-none'): pass;
};

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weatherDetails = await getWeather(cityDetails.Key);

    return {
        cityDetails,
        weatherDetails
    };
};

cityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});