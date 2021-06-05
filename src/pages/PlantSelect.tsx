import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


import { Loader } from '../components/Loader';
import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantsCardPrimary } from '../components/PlantsCard';

interface EnvironmentsData {
    key: string,
    title: string
}

interface PlantsData {
    id: number;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
      times: number;
      repeat_every: string;
    }
}

export function PlantSelect() {
    const
        navigation = useNavigation(),
        [environments, setEnvironments] = useState<EnvironmentsData[]>([]),
        [plants, setPlants] = useState<PlantsData[]>([]),
        [filteredPlants, setFilteredPlants] = useState<PlantsData[]>([]),
        [environmentSelected, setEnvironmentSelected] = useState('all'),
        [loadingMore, setLoadingMore] = useState(true),
        [loading, setLoading] = useState(true),
        [page, setPage] = useState(1);

    useEffect(() => {
        getEnvironments();
    }, []);

    useEffect(() => {
        getPlants();
    }, [page]);

    function handleEnvironmentSelected(environment: string) {
        setEnvironmentSelected(environment);

        if(environment === 'all')
            return setFilteredPlants(plants);

        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        );

        setFilteredPlants(filtered);
    }

    async function getEnvironments() {
        try {
            const { data: res } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...res
            ]);
        } catch (error) {
            console.error(error)
        }
    }

    async function getPlants() {
        const params = {
            _sort: 'name',
            _order: 'asc',
            _page: page,
            _limit: 8
        };

        try {
            const { data: res } = await api.get('plants', {params});

            if(!res)
                setLoading(true);

            if(page > 1) {
                setPlants(oldValue => [...oldValue, ...res])
                setFilteredPlants(oldValue => [...oldValue, ...res]);
            } else {
                setPlants(res);
                setFilteredPlants(res);
            }

            setLoading(false);
            setLoadingMore(false);
        } catch (error) {
            setLoading(false);
        }
    }

    function storePlant(plant: PlantsData) {
        navigation.navigate('PlantSave', { plant });
    }

    function handleInfinityScroll(distance: number) {
        if(distance < 1) {
            return;
        }

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
    }


    if(loading)
        return <Loader />

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Header />
                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
            </View>

            <View>
                <FlatList
                    data={environments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            title={item.title}
                            active={item.key === environmentSelected}
                            onPress={() => handleEnvironmentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviroment_list}
                />
            </View>

            <View style={styles.plants_list}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantsCardPrimary
                            data={item}
                            onPress={() => storePlant(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleInfinityScroll(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.green} />
                        : <></>
                    }

                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    wrapper: {
        padding: 30
    },
    title: {
        marginTop: 32,
        fontFamily: fonts.heading,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    enviroment_list: {
        marginLeft: 33,
        marginVertical: 16,
        paddingBottom: 5,
        justifyContent: 'center',
        height: 40
    },
    plants_list: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})