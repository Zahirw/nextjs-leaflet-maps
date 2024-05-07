"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import L from "leaflet";
import {
  Marker,
  Popup,
  useMapEvents,
  MapContainer,
  TileLayer,
  useMapEvent,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGetReverseGeocoding } from "@/services/maps/queries/useReverseGeocoding.query";

interface propsType {
  onDblClick?: (e: any) => void;
  lat: number;
  lng: number;
  className?: string;
}

let DefaultIcon = L.icon({
  iconRetinaUrl: "/assets/maps/marker-icon-2x.png",
  iconUrl: "/assets/maps/marker-icon.png",
  shadowUrl: "/assets/maps/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

const Maps = (props: propsType) => {
  const { onDblClick, lat, lng, className } = props;
  const [position, setPosition] = useState({
    lat: lat || 0,
    lng: lng || 0,
  });
  const { refetch, ...reverseGeocodingQuery } = useGetReverseGeocoding({
    lat: position.lat,
    lng: position.lng,
  });
  const geocodingData = useMemo(
    () => reverseGeocodingQuery.data,
    [reverseGeocodingQuery.data]
  );

  const Handler = () => {
    const maps = useMap();
    const map = useMapEvents({
      async dblclick(e: any) {
        if (onDblClick) {
          map.locate();
          setPosition(e.latlng);
        }
      },
    });
    const flying = useMemo(() => {
      if (position.lat !== 0 && position.lng !== 0) {
        maps.setView(position, 19);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);
    return null;
  };
  const LocationMarker = useCallback(() => {
    return (
      <Marker position={position}>
        <Popup>Event Location here</Popup>
      </Marker>
    );
  }, [position]);
  useEffect(() => {
    if (onDblClick) onDblClick(geocodingData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geocodingData]);

  useEffect(() => {
    lat && lng && setPosition({ lat, lng });
  }, [lat, lng]);

  return (
    <>
      <MapContainer
        className={className}
        center={{ lat: -6.2, lng: 106.816666 }}
        zoom={15}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Handler />
        <LocationMarker />
      </MapContainer>
    </>
  );
};

export default Maps;
