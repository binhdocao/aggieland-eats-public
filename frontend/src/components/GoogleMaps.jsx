import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '35vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Maps = ({ address }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCZaKUc5TnNrlQOUICqnINSBH3BNvUuwOE", //uNHARDCODE API
  });

  const [center, setCenter] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (isLoaded && address) {
      // Initialize Geocoder (takes string of location and sends to api to convert to lat and long)
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          setCenter({ lat, lng });
        } else {
          console.error('Geocode failed: ' + status);
        }
      });
    }
  }, [isLoaded, address]);

  const onLoad = React.useCallback(function callback(map) {
    if (center) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
    }
    setMap(map);
  }, [center]);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded && center ? (
    <div>
      <div className='bg-white'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
          mapTypeId='satellite'
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={center} icon={{ url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png" }} />
        </GoogleMap>
      </div>
    </div>
  ) : <></>;
};

export default React.memo(Maps);
