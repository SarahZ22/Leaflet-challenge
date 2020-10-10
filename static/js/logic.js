// Create tile layers - map backgrounds
var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});
var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});
var satMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "satellite-v9",
  accessToken: API_KEY
});
var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "outdoors-v11",
    accessToken: API_KEY
});
var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "streets-v11", //"light-v10",
  accessToken: API_KEY
});

// Create basemap object for all layers - only one layer can be shown at a time
var baseMaps = {
    "Dark": darkMap,
    "Light": lightMap,
    "Satellite": satMap,
    "Outdoors": outdoorsMap,
    "Streets": streetMap
}

// Initialize layer groups to use on map
var quakeCircles = L.layerGroup();
var quakeMarkers = L.layerGroup();
var tectonicPlates = L.layerGroup();


// Create overlay object for layer control on map
var overlays = {
    "Quakes": quakeCircles,
    "Markers": quakeMarkers,
    "Tectonics": tectonicPlates
}

// Create map object with default layers
var myMap = L.map("mapid", {
    center: [37.0902, -95.7129],
    zoom: 6,
    layers: [outdoorsMap, quakeCircles, tectonicPlates]
  });

// Add layer control to map - pass map layers
L.control.layers(baseMaps, overlays).addTo(myMap);

// Link for geojson data of earthquakes and tectonic plates
var quakelink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
var tectoniclink = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";