import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DeviceFrame from './components/DeviceFrame.tsx'
import { seedMockData } from './api/seed'

// Check URL params for device preview mode
const urlParams = new URLSearchParams(window.location.search);
const hasDeviceParam = urlParams.has('device');

if (!hasDeviceParam) {
  urlParams.set('device', 'true');
  urlParams.set('model', 'iphone-17-pro-max');
  urlParams.set('dark', 'true');
  const newUrl = `${window.location.pathname}?${urlParams.toString()}${window.location.hash}`;
  window.history.replaceState({}, '', newUrl);
}

const showDeviceFrame = urlParams.get('device') !== 'false';
const deviceType = (urlParams.get('model') as 'iphone-17-pro-max' | 'iphone-16-pro-max' | 'iphone-14-pro' | 'iphone-14' | 'pixel-7') || 'iphone-17-pro-max';
const darkFrame = urlParams.get('dark') !== 'false';

seedMockData();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {showDeviceFrame ? (
      <DeviceFrame device={deviceType} darkMode={darkFrame}>
        <App />
      </DeviceFrame>
    ) : (
      <App />
    )}
  </StrictMode>,
)
