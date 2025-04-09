import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapView = ({ deliveryPersons, selectedDeliveryPerson, onSelectDeliveryPerson }) => {
  const mapRef = useRef(null);
  const [routes, setRoutes] = useState({});
  const [positions, setPositions] = useState({});

  // Update positions when deliveryPersons prop changes
  useEffect(() => {
    const initialPositions = {};
    deliveryPersons.forEach(person => {
      if (person.trackingData?.position) {
        initialPositions[person.id] = [
          person.trackingData.position.coordinates[1],
          person.trackingData.position.coordinates[0]
        ];
      }
    });
    setPositions(initialPositions);
  }, [deliveryPersons]);

  // Center map on selected delivery person
  useEffect(() => {
    if (selectedDeliveryPerson && positions[selectedDeliveryPerson.id] && mapRef.current) {
      mapRef.current.flyTo(positions[selectedDeliveryPerson.id], 15);
    }
  }, [selectedDeliveryPerson, positions]);

  const renderRoute = (deliveryPerson) => {
    if (!deliveryPerson.trackingData?.route) return null;

    const { route } = deliveryPerson.trackingData;
    const routeCoordinates = [];

    // Start point
    routeCoordinates.push([route.start.coordinates[1], route.start.coordinates[0]]);

    // Checkpoints
    route.checkpoints.forEach(checkpoint => {
      routeCoordinates.push([checkpoint.coordinates[1], checkpoint.coordinates[0]]);
    });

    // End point
    routeCoordinates.push([route.end.coordinates[1], route.end.coordinates[0]]);

    return (
      <Polyline
        key={`route-${deliveryPerson.id}`}
        positions={routeCoordinates}
        color={deliveryPerson.id === selectedDeliveryPerson?.id ? 'blue' : 'gray'}
        weight={3}
        opacity={0.7}
      />
    );
  };

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: '100%', width: '100%' }}
      whenCreated={map => { mapRef.current = map; }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {deliveryPersons.map(person => (
        <React.Fragment key={person.id}>
          {renderRoute(person)}
          {positions[person.id] && (
            <Marker
              position={positions[person.id]}
              eventHandlers={{
                click: () => onSelectDeliveryPerson(person),
              }}
            >
              <Popup>
                <div>
                  <h3>{person.name}</h3>
                  <p>Status: {person.status}</p>
                  <p>Vehicle: {person.vehicleType}</p>
                </div>
              </Popup>
            </Marker>
          )}
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default MapView;