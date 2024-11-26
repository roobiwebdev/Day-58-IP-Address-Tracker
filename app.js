let map;
let marker;

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'ea6b8f519bd84b1f8df3e5ef519a896f';
    const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;

    // Fetch IP information on page load
    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateUI(data);
            initializeMap(data.latitude, data.longitude, data);
        })
        .catch(error => console.error('Error:', error));
});

document.querySelector('button').addEventListener('click', function() {
    const ip = document.querySelector('input').value;
    const apiKey = 'ea6b8f519bd84b1f8df3e5ef519a896f';
    const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateUI(data);
            updateMap(data.latitude, data.longitude, data);
        })
        .catch(error => console.error('Error:', error));
});

function updateUI(data) {
    document.querySelector('.address').textContent = data.ip;
    document.querySelector('.location').textContent = `${data.country_name}`;
    document.querySelector('.timezone').textContent = `UTC ${data.time_zone.offset}`;
    document.querySelector('.spacex').textContent = data.isp;
}

function initializeMap(lat, lon, data) {
    map = L.map('map').setView([lat, lon], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    marker = L.marker([lat, lon]).addTo(map)
        .bindPopup(`You are here:  ${data.country_name}`)
        .openPopup();
}

function updateMap(lat, lon, data) {
    map.setView([lat, lon], 5);
    marker.setLatLng([lat, lon])
        .bindPopup(`You are here:  ${data.country_name}`)
        .openPopup();
}