export class vasttrafik {
  constructor(authKey) {
    this.authKey = authKey;
    this.token = null;
    this.tokenExpiry = null;
  }

  async getToken() {
    if (this.token && this.tokenExpiry > Date.now()) {
      return this.token;
    }

    const response = await fetch("https://ext-api.vasttrafik.se/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${this.authKey}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error(`Token request failed: ${response.status}`);
    }

    const data = await response.json();
    this.token = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;

    return this.token;
  }

  async getPointsOfInterest(latitude, longitude) {
    const token = await this.getToken();

    const params = new URLSearchParams({
      latitude: latitude,
      longitude: longitude,
      radiusInMeters: 750,
    });

    const response = await fetch(
      `https://ext-api.vasttrafik.se/pr/v4/locations/by-coordinates?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get points of interest.");
    }

    return await response.json();
  }
}
