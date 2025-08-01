mapboxgl.accessToken = 'pk.eyJ1IjoiamFuZGVrb3N0ZXIiLCJhIjoiY2x3a3lrMnYwMWJsejJucW10dWV5MXpuNyJ9.t2bk-zDEZhGfWCQmnH_biA';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [3.889, 51.506],
  zoom: 13
});

document.getElementById("mapStyleSwitcher").addEventListener("change", (e) => {
  map.setStyle(e.target.value);
});

const pois = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "De Loods Café",
        type: "Cafe",
        description: "Gezellig bruin café in Goes.",
        photo: "images/cafe.jpg"
      },
      geometry: {
        type: "Point",
        coordinates: [3.889, 51.506]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Stadshaven Goes",
        type: "Landmark",
        description: "Mooi stadsplein en haven.",
        photo: "images/stadshaven.jpg"
      },
      geometry: {
        type: "Point",
        coordinates: [3.8945, 51.509]
      }
    }
  ]
};

function loadPOIs() {
  pois.features.forEach((marker) => {
    const el = document.createElement("div");
    el.className = "marker";
    el.style.backgroundImage = "url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)";
    el.style.width = "32px";
    el.style.height = "39px";
    el.style.backgroundSize = "cover";

    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map)
      .getElement()
      .addEventListener("click", () => {
        document.getElementById("sidebar").classList.remove("hidden");
        document.getElementById("poiName").textContent = marker.properties.name;
        document.getElementById("poiType").textContent = marker.properties.type;
        document.getElementById("poiDesc").textContent = marker.properties.description;
        document.getElementById("poiImage").src = marker.properties.photo;
        document.getElementById("poiImage").alt = marker.properties.name;

        const [lng, lat] = marker.geometry.coordinates;
        const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=nl&z=16&output=embed`;
        document.getElementById("mapEmbed").src = mapsUrl;
      });
  });
}

map.on("style.load", loadPOIs);

document.getElementById("closeSidebar").addEventListener("click", () => {
  document.getElementById("sidebar").classList.add("hidden");
});