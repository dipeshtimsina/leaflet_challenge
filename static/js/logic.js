function buildMap(earthquakes){
var satellite = L.tileLayer(
"https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
{
attribution:
"Map Copyright: <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='https://docs.mapbox.com/help/glossary/mapbox-satellite/'>Satellite Map</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
maxZoom: 19,
id: "satellite-v9",
accessToken: API_KEY,
}
);
var streetmap = L.tileLayer(
"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
{
attribution:
"Map Copyright: <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: API_KEY,
}
);
var graymap = L.tileLayer(
"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
{
attribution:
"© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/light-v10",
accessToken: API_KEY,
}
);
var baseMaps = {
Satellite: satellite,
"Street Map": streetmap,
Graymap: graymap,
};

var overlayMaps = {
Earthquakes: earthquakes,
};

var map = L.map("map", {
center: [64.33, -21.131],
zoom: 5,
layers: [graymap, earthquakes],
});

L.control
.layers(baseMaps, overlayMaps, {
collapsed: false,
})
.addTo(myMap);


satellite.addTo(map);

function createFeatures(earthquakeData) {
function onEachFeature(feature, layer) {
layer.bindPopup("<h3>" + feature.properties.place +
"</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
}
var earthquakes = L.geoJSON(earthquakeData, {
onEachFeature: onEachFeature
});

buildMap(earthquakes);
}
d3.json(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
    ).then(function (data) {
    function styleInfo(feature) {
    return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.geometry.coordinates[2]),
    color: "#000000",
    stroke: true,
    weight: 0.5,
    };
 }