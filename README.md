# Weather API  
roadmap.sh:https://roadmap.sh/projects/weather-api-wrapper-service

## Overview

The Weather API is a simple and efficient tool that provides real-time weather data for cities around the world. It retrieves data from a third-party weather service and leverages caching to deliver fast responses, reducing load times on repeated requests.

## Features

- **City-Level Weather Data**: Get current weather conditions, temperature, humidity, wind speed, and more for any city worldwide.
- **Caching for Performance**: Utilizes Redis caching with a configurable expiry time to ensure quick data retrieval and minimize API calls.
- **JSON Responses**: All data is returned in an easy-to-use JSON format, making it simple to integrate with various applications.

## Prerequisites

Before you can use the Weather API, you'll need:

- Node.js installed on your system.
- Redis installed and running for caching.
- An API key from the third-party weather service provider https://www.visualcrossing.com/weather-api

