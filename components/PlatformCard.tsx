import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import LogoPlaystation from './icons/LogoPlaystation';
import LogoXbox from './icons/LogoXbox';
import LogoPC from './icons/LogoPC';
import { useRouter } from 'expo-router';

type PlatformCardProps = {
  path: string;
}; 

export default function PlatformCard({ path }: PlatformCardProps) {
  const router = useRouter();

  const handlePlatformSelect = (platform: string) => {
    router.push(`/games?platform=${platform}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => handlePlatformSelect('Playstation')}>
        <View style={styles.card}>
          <LogoPlaystation width={50} height={50} />
          <Text style={styles.platform}>Playstation</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handlePlatformSelect('Xbox')}>
        <View style={styles.card}>
          <LogoXbox width={50} height={50} />
          <Text style={styles.platform}>Xbox</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handlePlatformSelect('PC')}>
        <View style={styles.card}>
          <LogoPC width={50} height={50} />
          <Text style={styles.platform}>PC</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    width: 125,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#84a59d',
    borderRadius: 10,
    margin: 15,
  },
  platform: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
