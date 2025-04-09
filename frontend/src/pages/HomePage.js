import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import io from 'socket.io-client';
import MapView from '../components/MapView';
import DeliveryList from '../components/DeliveryList';

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
  gap: 16px;
  padding: 16px;
  background: #f0f2f5;
`;

const socket = io('http://localhost:5000');

const HomePage = () => {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchDeliveryPersons = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.vehicleType) params.append('vehicleType', filters.vehicleType);
        
        const response = await axios.get(`http://localhost:5000/api/delivery?${params.toString()}`);
        setDeliveryPersons(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching delivery persons:', error);
        setLoading(false);
      }
    };

    fetchDeliveryPersons();
  }, [filters]);

  useEffect(() => {
    if (selectedDeliveryPerson) {
      // Subscribe to updates for selected delivery person
      socket.emit('subscribeToDelivery', selectedDeliveryPerson.id);
      
      return () => {
        socket.emit('unsubscribeFromDelivery', selectedDeliveryPerson.id);
      };
    }
  }, [selectedDeliveryPerson]);

  useEffect(() => {
    const handleLocationUpdate = (data) => {
      setDeliveryPersons(prev => prev.map(person => {
        if (person.id === data.deliveryPersonId) {
          return {
            ...person,
            trackingData: {
              ...person.trackingData,
              position: {
                type: 'Point',
                coordinates: [data.position.lng, data.position.lat]
              },
              route: data.route
            }
          };
        }
        return person;
      }));
    };

    socket.on('locationUpdate', handleLocationUpdate);

    return () => {
      socket.off('locationUpdate', handleLocationUpdate);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <DeliveryList
        deliveryPersons={deliveryPersons}
        selectedDeliveryPerson={selectedDeliveryPerson}
        onSelectDeliveryPerson={setSelectedDeliveryPerson}
        onFilterChange={setFilters}
      />
      
      <MapView
        deliveryPersons={deliveryPersons}
        selectedDeliveryPerson={selectedDeliveryPerson}
        onSelectDeliveryPerson={setSelectedDeliveryPerson}
      />
    </PageContainer>
  );
};

export default HomePage;