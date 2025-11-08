# Traveleasy

A modern travel booking application built with React + Vite.

## Setup

### Install Dependencies

```bash
npm install
```

### Google Maps API Setup

1. Get your Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
2. Enable the following APIs in your Google Cloud Console:
   - **Places API** (for location autocomplete)
   - **Maps JavaScript API** (for maps functionality)
3. Create a `.env` file in the root directory:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```
4. Replace `your_google_maps_api_key_here` with your actual API key

### Run Development Server

```bash
npm run dev
```

## Features

- Google Maps Places Autocomplete for location search
- Date picker for check-in and check-out dates
- Responsive design with Tailwind CSS
- React Router for navigation

## Technologies

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Google Maps API (@react-google-maps/api)
- Lucide React (icons)
# TravelEasy
# TravelEasy
