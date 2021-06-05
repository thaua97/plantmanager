import React, {useEffect} from 'react';
import * as Notifications from 'expo-notifications';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';

import Routes from './src/routes';
import { PlantInterface } from './src/services/interfaces';

export default function App() {
  const [fonstLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    manageNotifications()
  }, []);

  function manageNotifications() {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantInterface;
      }
    )

    return () => subscription.remove();
  }

  if(!fonstLoaded)
    return <AppLoading />;

  return <Routes />;
}
