"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const courierIcon = L.divIcon({
  html: '<div style="background-color: #0f766e; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">🛵</div>',
  className: "custom-courier-icon",
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const destIcon = L.divIcon({
  html: '<div style="background-color: #b91c1c; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">📍</div>',
  className: "custom-dest-icon",
  iconSize: [34, 34],
  iconAnchor: [17, 30],
});

function MapBoundsSync({
  courierPos,
  destPos,
}: {
  courierPos: [number, number];
  destPos: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    if (courierPos && destPos) {
      const bounds = L.latLngBounds([courierPos, destPos]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    }
  }, [courierPos, destPos, map]);

  return null;
}

export interface DeliveryMapProps {
  courierPos: [number, number];
  destPos: [number, number];
  courierName: string;
  destinationAddress: string;
}

export default function DeliveryMapLeaf({
  courierPos,
  destPos,
  courierName,
  destinationAddress,
}: DeliveryMapProps) {
  return (
    <MapContainer
      center={destPos}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "360px", width: "100%", borderRadius: "0.5rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapBoundsSync courierPos={courierPos} destPos={destPos} />

      <Marker position={courierPos} icon={courierIcon}>
        <Popup>
          <strong>Courier: {courierName}</strong>
          <br />
          On the way with your delivery
        </Popup>
      </Marker>

      <Marker position={destPos} icon={destIcon}>
        <Popup>
          <strong>Delivery Location</strong>
          <br />
          {destinationAddress}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
