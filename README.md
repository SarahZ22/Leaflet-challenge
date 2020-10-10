# Leaflet Homework (Week 17 HW) - Earthquake Visualization

![USGS](https://upload.wikimedia.org/wikipedia/commons/0/08/USGS_logo.png)\

Welcome to the United States Geological Survey! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding...) on issues facing our planet.

##### Project Goals
The first task is to retrieve data from [USGS GeoJSON Feeds](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and visualize an earthquake data set. The map should plot all of the earthquakes from your data set based on their longitude and latitude with markers that reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

The second task is to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. This dataset can be found at https://github.com/fraxen/tectonicplates. The map should include several basemaps and layer controls along with a legend and useful data popups.

##### Note: 
To view final project - You'll need to use python -m http.server to run the visualization. This will host the page at localhost:8000 in your web browser.
