import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMotorcycle, FaBicycle, FaTruck, FaWalking } from 'react-icons/fa';

const ListContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 100%;
  overflow-y: auto;
`;

const FilterSection = styled.div`
  margin-bottom: 16px;
`;

const DeliveryPersonCard = styled.div`
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  background: ${props => props.active ? '#e6f7ff' : '#f9f9f9'};
  border-left: 4px solid ${props => props.status === 'active' ? '#52c41a' : '#f5222d'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #e6f7ff;
  }
`;

const DeliveryList = ({ 
  deliveryPersons, 
  selectedDeliveryPerson, 
  onSelectDeliveryPerson,
  onFilterChange 
}) => {
  const [filters, setFilters] = useState({
    status: '',
    vehicleType: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const getVehicleIcon = (vehicleType) => {
    switch (vehicleType.toLowerCase()) {
      case 'motorcycle': return <FaMotorcycle />;
      case 'bicycle': return <FaBicycle />;
      case 'truck': return <FaTruck />;
      default: return <FaWalking />;
    }
  };

  return (
    <ListContainer>
      <h2>Delivery Persons</h2>
      
      <FilterSection>
        <h4>Filters</h4>
        <div>
          <label>Status: </label>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        <div>
          <label>Vehicle: </label>
          <select name="vehicleType" value={filters.vehicleType} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="bicycle">Bicycle</option>
            <option value="truck">Truck</option>
            <option value="walking">Walking</option>
          </select>
        </div>
      </FilterSection>
      
      {deliveryPersons.map(person => (
        <DeliveryPersonCard
          key={person.id}
          active={selectedDeliveryPerson?.id === person.id}
          status={person.status}
          onClick={() => onSelectDeliveryPerson(person)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {getVehicleIcon(person.vehicleType)}
            <h3>{person.name}</h3>
          </div>
          <p>Phone: {person.phone}</p>
          <p>Status: <span style={{ color: person.status === 'active' ? 'green' : 'red' }}>
            {person.status}
          </span></p>
        </DeliveryPersonCard>
      ))}
    </ListContainer>
  );
};

export default DeliveryList;