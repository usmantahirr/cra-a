import React, { useState, Fragment } from 'react';
import { useLoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const MapContainer = ({ myPlaces, center, zoom, infoOpen, selectedPlace, markerClickHandler }) => {
  // The things we need to track in state
  // eslint-disable-next-line
  const [mapRef, setMapRef] = useState(null);
  const [markerMap, setMarkerMap] = useState({});

  // Load the Google maps scripts
  const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: 'AIzaSyC5wzEBHV_vzzybukHvJDqp0XsglftJvUY',
  });

  // The places I want to create markers for.
  // This could be a data-driven prop.

  // Iterate myPlaces to size, center, and zoom map to contain all markers
  const fitBounds = map => {
    const bounds = new window.google.maps.LatLngBounds();
    myPlaces.map(place => {
      bounds.extend(place.pos);
      return place.id;
    });
    map.fitBounds(bounds);
  };

  const loadHandler = map => {
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);
  };

  // We have to create a mapping of our places to actual Marker objects
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.id]: marker };
    });
  };

  const renderMap = () => {
    return (
      <Fragment>
        <GoogleMap
          // Do stuff on map initial laod
          onLoad={loadHandler}
          center={center}
          zoom={zoom}
          mapContainerStyle={{
            height: '70vh',
            width: '50%',
          }}
        >
          {myPlaces.map(place => (
            <Marker
              key={place.id}
              position={place.pos}
              onLoad={marker => markerLoadHandler(marker, place)}
              onClick={event => markerClickHandler(event, place)}
              // Not required, but if you want a custom icon:
              //   icon={{
              //     path:
              //       'M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z',
              //     fillColor: '#0000ff',
              //     fillOpacity: 1.0,
              //     strokeWeight: 0,
              //     scale: 1.25,
              //   }}
            />
          ))}

          {infoOpen && selectedPlace && (
            <InfoWindow anchor={markerMap[selectedPlace.id]}>
              <div>
                <h3>{selectedPlace.id}</h3>
                <div>This is your info window content</div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </Fragment>
    );
  };

  return isLoaded ? renderMap() : null;
};

export default MapContainer;
