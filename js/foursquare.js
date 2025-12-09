export class FourSquare {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getPointsOfInterest(lat, long) {
    const params = new URLSearchParams({
      ll: `${lat},${long}`,
      radius: 750,
    });

    const response = await fetch(
      `https://corsproxy.io/?https://places-api.foursquare.com/places/search?${params}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.apiKey}`,
          "X-Places-Api-Version": "2025-06-17",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Could not retrieve point of interest data."); // Fixed typo
    }

    return await response.json();
  }
}
