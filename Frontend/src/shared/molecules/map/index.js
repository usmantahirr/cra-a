import React, { useState, Fragment } from 'react';
import { useLoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { RED_PIN, BLUE_PIN } from './mapConfig';

const MapContainer = ({ myPlaces, center, zoom, infoOpen, selectedPlace, markerClickHandler }) => {
  // Fit map bounds to contain all markers
  const [places, setPlaces] = useState(null);

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
  const fitBounds = () => {
    if (places !== myPlaces && myPlaces.length && myPlaces.length > 1 && window.google) {
      setPlaces(myPlaces);
      const bounds = new window.google.maps.LatLngBounds();
      myPlaces.map(place => {
        bounds.extend(place.pos);
        return place.id;
      });
      if (mapRef) {
        // setTimeout(() => {
        mapRef.fitBounds(bounds);
        // }, 1000);
      }
    }
  };

  const loadHandler = map => {
    // Store a reference to the google map instance in state
    setMapRef(map);
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
          // ref={map => map && map.fitBounds(bounds)}
          // Do stuff on map initial laod
          options={{ mapTypeControl: false }}
          onLoad={loadHandler}
          center={center}
          zoom={zoom}
          mapContainerClassName="facility-map"
          mapContainerStyle={{
            width: '100%',
          }}
          onTilesLoaded={() => {
            fitBounds();
          }}
        >
          {myPlaces.map(place => (
            <Marker
              key={place.id}
              position={place.pos}
              onLoad={marker => markerLoadHandler(marker, place)}
              onClick={event => markerClickHandler(event, place)}
              // Not required, but if you want a custom icon:
              icon={selectedPlace && selectedPlace.id === place.id ? BLUE_PIN : RED_PIN}
            />
          ))}

          {infoOpen && selectedPlace && (
            <InfoWindow anchor={markerMap[selectedPlace.id]}>
              <div>
                <h3>{selectedPlace.name}</h3>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </Fragment>
    );
  };

  return isLoaded && myPlaces.length ? renderMap() : null;
};

export default MapContainer;
