import React, { useEffect, useState, Fragment } from 'react';
import MapFilter from '../../molecules/map/mapFilter';
import Map from '../../molecules/map';
import CardRadio from '../../molecules/cardRadio';

const cartOptions = [
  {
    id: 1,
    title: 'Abu Dhabi',
    content: 'Card content',
  },
  {
    id: 2,
    title: 'singulane',
    content: 'Card content',
  },
];

const dropdownOptions = [
  {
    id: 1,
    value: 'Abu Dhabi',
    text: 'Card content',
  },
  {
    id: 2,
    value: 'singulane',
    text: 'Card content',
  },
];

const LabSelection = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [center, setCenter] = useState({ lat: 44.076613, lng: -98.362239833 });
  const [locations, setlocations] = useState([]);
  const [zoom, setZoom] = useState(5);
  const [infoOpen, setInfoOpen] = useState(false);

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }

    // if you want to center the selected Marker
    // setCenter(place.pos)
  };

  useEffect(() => {
    setTimeout(() => {
      setCenter({ lat: 39.09366509575983, lng: -94.58751660204751 });
      setlocations([
        {
          id: 'place1',
          pos: { lat: 39.09366509575983, lng: -94.58751660204751 },
        },
        {
          id: 'place2',
          pos: { lat: 39.10894664788252, lng: -94.57926449532226 },
        },
        {
          id: 'place3',
          pos: { lat: 39.07602397235644, lng: -94.5184089401211 },
        },
      ]);

      setTimeout(() => {
        markerClickHandler(null, {
          id: 'place1',
          pos: { lat: 39.09366509575983, lng: -94.58751660204751 },
        });
      }, 500);
    }, 3000);
  }, []);

  return (
    <Fragment>
      <MapFilter stateOptions={dropdownOptions} cityOptions={dropdownOptions} serviceOptions={dropdownOptions} />
      <CardRadio cartOptions={cartOptions} />
      <Map
        infoOpen={infoOpen}
        myPlaces={locations}
        zoom={zoom}
        setSelectedPlace={setSelectedPlace}
        center={center}
        selectedPlace={selectedPlace}
        markerClickHandler={markerClickHandler}
      />
    </Fragment>
  );
};

export default LabSelection;
