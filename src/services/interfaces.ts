
// Data Interfaces

import { RectButtonProps } from "react-native-gesture-handler";

export interface PlantInterface {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  },
  hour?: string;
  dateTimeNotification: Date;
}

export interface StoragePlantInterface {
  [id: string]: {
    data: PlantInterface,
    notificationId: string;
  },
}

// Components Interface

export interface SpotlightProps {
  text: string;
  relative?: boolean;
  background?: boolean;
}

export interface PlantsCardProps extends RectButtonProps {
  data: {
    name: string,
    photo: string,
    hour?: string,
  };
  handleDelete?: () => void;
}

// Pages Interfaces
export interface ConfirmationInterface {
  title: string;
  complement: string;
  button: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}
