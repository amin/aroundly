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
    this.currentCoordinates = null;
  }

  getMap() {
    return this.map;
  }

  highlightLocations(coordinates) {
    this.resetMarkers();

    coordinates.forEach((coordinate) => {
      new mapboxgl.Marker({
        scale: 1.25,
        color: "red",
      })
        .setLngLat(coordinate)
        .addTo(this.map);
    });
  }

  resetMarkers() {
    document.querySelectorAll(".mapboxgl-marker").forEach((m) => m.remove());
  }
}
