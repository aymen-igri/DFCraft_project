import { SettingsProvider } from './shared/context/SettingsContext';
import { SoundDataProvider } from './shared/context/SoundDataContext';

import MainLayout from './components/Layout/MainLayout/MainLayout'

function App() {
  return (
  <SettingsProvider>
    <SoundDataProvider>
      <MainLayout />
    </SoundDataProvider>
  </SettingsProvider>
  )
}

export default App