import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Alert
} from 'react-native';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

 import { PlantInterface } from '../services/interfaces';
 import { deletePlant, getPlant } from '../services/storage';

 import fonts from '../styles/fonts';
 import colors from '../styles/colors';

import { Header } from '../components/Header';
import { Spotlight } from '../components/Spotlight';
import { PlantsCardSecondary } from '../components/PlantsCard';
import { Loader } from '../components/Loader';

export function Plants() {
    const
        [plants, setPlants] = useState<PlantInterface[]>([]),
        [loading, setLoading] = useState(true),
        [nextWaterd, setNextWaterd] = useState<string>();

    useEffect(() => {
        loadStorageData();
    }, []);

    async function loadStorageData() {
        const
            plansStoraged = await getPlant(),
            nextTime = formatDistance(
                new Date(plansStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: ptBR }
            );

        setPlants(plansStoraged);
        setLoading(false);
        setNextWaterd(`Regue sua ${plansStoraged[0].name} daqui a ${nextTime}`);
    };

    function handleDelete(plant: PlantInterface) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não 🙏',
                style: 'cancel'
            },
            {
                text: 'Sim 🤷‍♂️',
                onPress: async () => {
                    try {
                        await deletePlant(plant.id);

                        setPlants(oldData =>
                            oldData.filter(item => item.id !== plant.id)
                        );

                    } catch(err) {
                        Alert.alert('Não foi possível remover! 🙀');
                    }
                }
            }
        ])
    }

    if(loading)
        return <Loader />;

    return (
        <View style={styles.container}>
            <Header />
            <Spotlight text={`${nextWaterd}`} />
            <View style={styles.plants_section}>
                <Text style={styles.plants_title}>Próximas regadas</Text>
                <FlatList
                    data={plants}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantsCardSecondary
                            data={item}
                            handleDelete={() => {handleDelete(item)}}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex: 1}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 77,
        backgroundColor: colors.background,
    },
    plants_section: {
        flex: 1,
        width: '100%'
    },
    plants_title: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 10
    }
})

