// Create tile layers - map backgrounds
var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 10,
  id: "dark-v10",
  accessToken: API_KEY
});
var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 10,
  id: "light-v10",
  accessToken: API_KEY
});
var satMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 10,
  id: "satellite-v9",
  accessToken: API_KEY
});
var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    id: "outdoors-v11",
    accessToken: API_KEY
});

// Create basemap object for all layers - only one layer can be shown at a time
var baseMaps = {
    "Dark": darkMap,
    "Light": lightMap,
    "Satellite": satMap,
    "Outdoors": outdoorsMap,
}

// Initialize layer groups to use on map
var quakeCircles = L.layerGroup();
var quakeMarkers = L.layerGroup();
var tectonicPlates = L.layerGroup();


// Create overlay object for layer control on map
var overlays = {
    "Markers": quakeMarkers,
    "Tectonics": tectonicPlates
}

// Create map object with default layers
var myMap = L.map("map", {
    center: [30.0000, 0.0000],
    zoom: 3,
    layers: [satMap, quakeMarkers, tectonicPlates]
  });

// Add layer control to map - pass map layers
L.control.layers(baseMaps, overlays).addTo(myMap);

// Link for geojson data of earthquakes and tectonic plates
var quakeLink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
var tectonicLink = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

// Function for setting color of quake by depth
function setColors(depth){
    if (depth <= 10) {
        return "#99ff66";
    } else if (depth <= 30){
        return "#ffff66";
    } else if (depth <= 50){
        return "#ffc266";
    } else if (depth <= 70){
        return "#ff9900";
    } else if (depth <= 90){
        return "#ff9999";
    } else {
        return "#ff4d4d";
    }};

// Request geojson data for USGS earthquakes - 4.5+ in the last month
d3.json(quakeLink, function(data){
    // Loop data to get coords/magnitude
    for (var i=0; i<data.length; i++){
        var magnitude = data[i].properties.mag;
        var coordinates = data[i].geometry.coordinates;
        // Create markes and add to layer
        L.circle([coordinates[1], coordinates[0]], {
            fillOpacity: 0.8,
            fillColor: setColors(magnitude),
            color: "purple",
            radius: magnitude*100 //otherwise circles too small
        })
        // Add popup when circle clicked
        .bindPopup("<h2>" + features[index].properties.place + "</h2><hr><h4>" + "Magnitude Level: " + magnitude + 
        "<br>" + new Date(features[index].properties.time) + "<br>" + 
        "Location: [" + coords[1] + ", " + coords[1] + "]" + "</h4>").addTo(quakeMarkers); }

    // Create legend for map
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function(){
        var div =  L.DomUtil.create("div", "info legend");
        var depth = ["<10", "10-30", "30-50", "50-70", "70-90", ">90"];
        var colors = ["#99ff66", "#ffff66", "#ffc266", "#ff9900", "#ff9999", "#FF4d4d"]
        var labels = [];
        // Insert div and fix html for legend
        div.innerHTML +=
            "<div class=\"labels\">" +
            "<div class=\"min\">" + depth[0] + "</div>" +
            "<div class=\"max\">" + depth[depth.length - 1] + "</div>" + "</div>";
        depth.forEach(function(depth, i) {
            labels.push("<li style=\"background-color: " + colors[i] + "\"></li>");
      });
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
      // Adding legend to the map
      legend.addTo(myMap);
});

// Request geojson data for tectonic plates 
d3.json(tectonicLink, function(data){
    L.geoJSON(data, {
        style: {
            color: "red",
            fillOpacity: 0 }
    }).addTo(tectonicPlates)
});