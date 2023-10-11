import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { getUserById } from "../services/fetchUserService";
import { getProfileById } from "../services/fetchProfileService";

export default function Home({ route, navigation }) {
  const paramData = route.params.data;
  const [profile, setProfile] = useState({ name: '', posts: {} });

  async function fetchProfile() {
    try {
      const userData = await getUserById(paramData.userId, paramData.token);
      console.log("userData:", userData);
      const profileData = await getProfileById(userData.profiles.id, paramData.token);
      console.log("profileData:", profileData);
      setProfile(profileData);
    } catch (error) {
      console.error("Erro ao buscar dados do perfil:", error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleCreateService = () => {
    // Lógica para navegar para a tela de cadastro de serviço
    navigation.navigate('CadastroServico');
  };

  const handlePublishService = () => {
    // Lógica para navegar para a tela de publicação de serviço
    navigation.navigate('PublicarServico');
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>{profile.name}</Text>
      <Text>{profile.posts?.title}</Text>
      <Text>{profile.posts?.content}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCreateService}>
          <Text style={styles.buttonText}>Cadastrar Serviço</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePublishService}>
          <Text style={styles.buttonText}>Publicar Serviço</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'blue',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
