import { useState, useEffect } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  lat: number;
  lon: number;
}

interface Props {
  position: Location;
  onChange: (location: Location) => void;
}

const DraggableMarker = ({ position, onChange }: Props) => {
  const [markerPos, setMarkerPos] = useState(position);

  // Update marker position when prop changes
  useEffect(() => {
    setMarkerPos(position);
  }, [position]);

  useMapEvents({
    click(e) {
      const newPos = { lat: e.latlng.lat, lon: e.latlng.lng };
      setMarkerPos(newPos);
      onChange(newPos);
    },
  });

  return (
    <Marker
      draggable
      position={[markerPos.lat, markerPos.lon]}
      icon={DefaultIcon}
      eventHandlers={{
        dragend: (e) => {
          const latlng = e.target.getLatLng();
          const newPos = { lat: latlng.lat, lon: latlng.lng };
          setMarkerPos(newPos);
          onChange(newPos);
        },
      }}
    />
  );
};

export default DraggableMarker;
