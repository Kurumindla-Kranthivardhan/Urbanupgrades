import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';

function App() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchDevices();
    fetchUser();
  }, []);

  async function fetchDevices() {
    // Modify this query according to your updated GraphQL schema
    const apiData = await API.graphql({
      query: customListDevices, // Replace with your query name
    });
    const devicesFromAPI = apiData.data.customListDevices.items; // Replace with the query response field
    setDevices(devicesFromAPI);
  }

  async function fetchUser() {
    const authUser = await Auth.currentAuthenticatedUser();
    setUser(authUser);
  }

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  return (
    <div className="App">
      <h1>Welcome, {user ? user.username : 'Guest'}</h1>
      <h2>Select a Device:</h2>
      <select value={selectedDevice} onChange={handleDeviceChange}>
        <option value="">Select a device</option>
        {devices.map((device) => (
          <option key={device.id} value={device.id}>
            {device.name}
          </option>
        ))}
      </select>
      {selectedDevice && (
        <div>
          <h2>Device Details:</h2>
          <p>Name: {devices.find((device) => device.id === selectedDevice)?.name}</p>
          <p>Type: {devices.find((device) => device.id === selectedDevice)?.type}</p>
          <p>Status: {devices.find((device) => device.id === selectedDevice)?.status}</p>
        </div>
      )}
    </div>
  );
}

export default App;
