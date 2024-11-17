import React, { useLayoutEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from '@/components/Themed';
import { useRouter, useLocalSearchParams } from 'expo-router';
import GameCard from '@/components/GameCard';
import { useNavigation } from '@react-navigation/native';

const platformGames = {
  Playstation: [
    { title: 'GTA V', image: require('../assets/games/GTA5.jpg'), description: 'Back in Los Santos' },
    { title: 'GTA San Andreas', image: require('../assets/games/GTASA.jpg'), description: 'Here we go again...' },
    { title: 'GTA Vice City', image: require('../assets/games/GTAVC.jpg'), description: 'Tommy Vercetti vibes' },
    { title: 'GTA III', image: require('../assets/games/GTA3.jpg'), description: 'Mafia rules' },
  ],
  Xbox: [
    { title: 'GTA V', image: require('../assets/games/GTA5.jpg'), description: 'Description of GTA V' },
    { title: 'GTA San Andreas', image: require('../assets/games/GTASA.jpg'), description: 'Here we go again...' },
    { title: 'GTA Vice City', image: require('../assets/games/GTAVC.jpg'), description: 'Description of GTA Vice City' },
    { title: 'GTA III', image: require('../assets/games/GTA3.jpg'), description: 'Description of GTA III' },
  ],
  PC: [
    { title: 'GTA V', image: require('../assets/games/GTA5.jpg'), description: 'Description of GTA V' },
    { title: 'GTA San Andreas', image: require('../assets/games/GTASA.jpg'), description: 'Here we go again...' },
    { title: 'GTA Vice City', image: require('../assets/games/GTAVC.jpg'), description: 'Description of GTA Vice City' },
    { title: 'GTA III', image: require('../assets/games/GTA3.jpg'), description: 'Description of GTA III' },
  ],
};

export default function PlatformGamesScreen() {
  const { platform: platformParam } = useLocalSearchParams();
  const platform = Array.isArray(platformParam) ? platformParam[0] : platformParam;
  const games = platform && platformGames.hasOwnProperty(platform) ? platformGames[platform as keyof typeof platformGames] : [];

  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false, // Hide the back button title
      headerTintColor: '#FF5733', // Set your desired color here
      title: `Jeux ${platform}`, // Optional: Set a dynamic title
    });
  }, [navigation, platform]);

  const handleGameSelect = (gameTitle: string) => {
    router.push({
      pathname: '/codes',
      params: { game: gameTitle, platform },
    });
  };

  return (
    <ScrollView style={styles.container}>
      {games.map((game, index) => (
        <GameCard key={index} title={game.title} image={game.image} description={game.description} onPress={() => handleGameSelect(game.title)} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
