import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { format } from 'date-fns';

import { PlantInterface, StoragePlantInterface } from './interfaces';

const environment = 'plantmanager';

export async function getAsyncStorage(key: string)  {
    try {
        const data = await AsyncStorage.getItem(`@${environment}:${key}`);
        return (JSON.parse(`${data}`));

    } catch (error) {
        throw new Error(error);
    }
}

export async function setAsyncStorage(key: string, value: string | object)  {
    try {
        return await AsyncStorage.setItem(
            `@${environment}:${key}`,
            JSON.stringify(value)
        );
    } catch (error) {
        throw new Error(error);
    }
}

async function scheduleNotification() {
    
}

export async function storePlant(plant: PlantInterface): Promise<void> {
    const key = 'plants';

    try {
        const
            nextTime = new Date(plant.dateTimeNotification),
            now = new Date(),
            { times, repeat_every } = plant.frequency;

        if(repeat_every === 'week') {
            const interval = Math.trunc(7 / times);
            nextTime.setDate(now.getDate() + interval);
        } else {
            nextTime.setDate(nextTime.getDate() + 1);
        }

        const seconds = Math.abs(
            Math.ceil(now.getTime() - nextTime.getTime()) / 1000);

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Heeeyy, 🪴',
                body: `Está na hora de cuidar da sua ${plant.name}`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                }
            },
            trigger: {
                seconds: seconds < 60 ? 2 : seconds,
                repeats: true
            }
        });

        const
            data = await getAsyncStorage(key),
            oldPlant  = data ? data as StoragePlantInterface : {},
            newPlant = {
                [plant.id]: {
                    data: plant,
                    notificationId
                }
            };

            await setAsyncStorage(key, {...newPlant, ...oldPlant})

    } catch (error) {
        throw new Error(error);
    }
}

export async function getPlant(): Promise<PlantInterface[]> {
    const key = 'plants';

    try {
        const
            data = await getAsyncStorage(key),
            plants = data ? data as StoragePlantInterface : {},
            plantsSorted = Object
            .keys(plants)
            .map(plant => {
                return {
                    ...plants[plant].data,
                    hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
                }
            })
            .sort((a, b) =>
                Math.floor(
                    new Date(a.dateTimeNotification).getTime() / 1000 -
                    Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
                )
            );

        return plantsSorted;

    } catch (error) {
        throw new Error(error);
    }
}

export async function deletePlant(id: number): Promise<void> {
    const data = await getAsyncStorage('plants');

    const plants = data ? data as StoragePlantInterface : {};

    await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);

    delete plants[id];

    await setAsyncStorage('plants', plants);
}