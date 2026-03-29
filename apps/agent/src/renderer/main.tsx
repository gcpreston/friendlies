import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import type { ElectronAPI } from '../preload';
import { App } from './App';
import './globals.css';

declare global {
  interface Window {
    api: ElectronAPI;
  }
}

window.api.onNotificationSound(() => {
  window.api.getSettings().then((s: any) => {
    const audio = new Audio('./sounds/notification.wav');
    audio.volume = typeof s.notificationVolume === 'number' ? s.notificationVolume : 0.35;
    audio.play().catch(() => {});
  }).catch(() => {});
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
