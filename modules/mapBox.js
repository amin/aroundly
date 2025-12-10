export class MapBox {
  constructor(container, accessToken) {
    this.map = new mapboxgl.Map({
      accessToken: accessToken,
      container,
      style: "mapbox://styles/mapbox/standard",
      center: [11.9746, 57.7089],
      zoom: 10,
      collectResourceTiming: false,
      trackResize: true,
      maxBounds: [
        [11.889380601282852, 57.61472469525833],
        [12.092460462690099, 57.82983891223083],
      ],
    });
    this.map.getCanvas().style.cursor = "pointer";

    this.map.on("load", () => {
      this.map.addControl(new mapboxgl.NavigationControl(), "top-left");
      this.map.addSource("pois", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      this.map.addLayer({
        id: "pois-layer",
        type: "circle",
        source: "pois",
        paint: {
          "circle-radius": 8,
          "circle-color": "#1d4ed8",
          "circle-stroke-width": 3,
          "circle-stroke-color": "#ffffff",
        },
      });

      this.map.on("click", "pois-layer", (e) => {
        e.originalEvent.stopPropagation();
        const props = e.features[0].properties;
        this.getPopupElement(props);

        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setDOMContent(this.getPopupElement(props))
          .addTo(this.map);
      });
    });
  }

  getPopupElement(props) {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    for (const [key, value] of Object.entries(props)) {
      const element = document.createElement("div");
      if (key === "name") {
        element.classList.add("popup-name");
        element.textContent = value;
      }

      if (key === "address") {
        element.classList.add("popup-address");
        element.textContent = value;
      }
      popup.append(element);
    }

    return popup;
  }

  getMap() {
    return this.map;
  }

  setLocations(results) {
    const geojson = {
      type: "FeatureCollection",
      features: results.map((poi) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [poi.longitude, poi.latitude],
        },
        properties: {
          name: poi.name,
          address: poi.location?.formatted_address,
        },
      })),
    };

    this.map.getSource("pois").setData(geojson);
  }
}
