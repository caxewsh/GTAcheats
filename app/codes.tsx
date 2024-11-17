import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../utils/supabase';
import { useNavigation } from '@react-navigation/native';

const platformMap = {
    Playstation: 'PS',
    Xbox: 'Xbox',
    PC: 'PC',
};

// Define the type for each cheat code
interface CheatCode {
  cheatName: string;
  cheatCode: string;
  cheatCategory: string;
  game: string;
}

export default function GameCodeScreen() {
  const { platform, game } = useLocalSearchParams();
  const [codes, setCodes] = useState<CheatCode[]>([]);
  const [loading, setLoading] = useState(true);
  
  const platformKey = Array.isArray(platform) ? platform[0] : platform;
  const platformAbbr = platformMap[platformKey as keyof typeof platformMap] || platformKey;
  
  useEffect(() => {
    const fetchCodes = async () => {
            setLoading(true);
            const { data, error } = await supabase
            .from('CheatsGTA5V2')
            .select('*')
            .eq('platform', platformAbbr)
            .eq('game', game);
            
            if (error) {
                console.error('Error fetching codes:', error);
            } else {
                console.log("Fetched data:", data); // Log for verification
                setCodes(data as CheatCode[]); // Cast the data to CheatCode[]
            }
            setLoading(false);
        };
        
        fetchCodes();
    }, [platform, game]);
    
    const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTintColor: '#FF5733',
      title: `Cheats codes`,
    });
  }, [navigation, platform]);

  console.log("Codes state:", codes); // Log for verification

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#FF5733" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{`Codes pour ${game} sur ${platform}`}</Text>
      {codes && codes.length > 0 ? (
        codes.map((code, index) => (
          <View key={index} style={styles.codeContainer}>
            <Text style={styles.codeTitle}>{code.cheatName}</Text>
            <Text style={styles.codeDescription}>{code.cheatCode}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>Aucun code de triche disponible pour cette plateforme.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  codeContainer: {
    marginBottom: 10,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  codeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  codeDescription: {
    fontSize: 16,
    color: '#BBBBBB',
  },
  codeCategory: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    backgroundColor: '#e76f51',
    borderRadius: 10,
    padding: 4,
    margin: 4,
    marginLeft: 'auto',
  },
  noData: {
    fontSize: 16,
    color: '#BBBBBB',
    textAlign: 'center',
    marginTop: 20,
  },
});
