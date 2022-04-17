// access token
mapboxgl.accessToken =
  "pk.eyJ1Ijoib2x1c29sYTk0IiwiYSI6ImNsMWxnZ2pkeTBhZngzaXM5NGgxNjY0MXoifQ.kh8I7JrtUoXCAAqskKF9Ew";

// create map
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-71.091542, 42.358862],
  zoom: 12,
});
// add marker
const marker = new mapboxgl.Marker()
  .setLngLat([-71.091542, 42.358862])
  .addTo(map);
// array of coordinates for all bus stops between MIT and Harvard
const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];

// counter that represents the index of the current bus stop with a function that updates the marker current coordinate every 5000ms.
let counter = 0;
function move() {
  setTimeout(() => {
    if (counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    counter++;
    move();
  }, 5000);
}

async function run() {
  // get bus data
  const locations = await getBusLocations();
  console.log(new Date());
  console.log(locations);

  // timer
  setTimeout(run, 15000);
}

async function getBusLocations() {
  const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

run();
