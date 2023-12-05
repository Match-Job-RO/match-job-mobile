import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

export default function Profile() {
  const [name] = useState('Usuário');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [tags, setTags] = useState('');
  const [genre, setGenre] = useState('Masculino');

  const handleUpdate = () => {
    
  };

  return (
    <ScrollView>
      <SafeAreaView className="p-16 h-full">
        <View className="flex justify-center items-center py-16">
          <View className="p-4">
            <Text className="font-light text-4xl text-purple p-4">
              Olá {name}
            </Text>
          </View>
            <View className="gap-8">
              <TextInput
                className="border border-gray-500 p-2 mb-4"
                placeholder="Bio"
                value={bio}
                onChangeText={setBio}
              />
              <TextInput
                className="border border-gray-500 p-2 mb-4"
                placeholder="Telefone"
                value={phone}
                onChangeText={setPhone}
              />
              <TextInput
                className="border border-gray-500 p-2 mb-4"
                placeholder="Endereço"
                value={address}
                onChangeText={setAddress}
              />
              <TextInput
                className="border border-gray-500 p-2 mb-4"
                placeholder="Tags"
                value={tags}
                onChangeText={setTags}
              />
              <View className="flex-row justify-between mb-4">
                <TouchableOpacity onPress={() => setGenre('Masculino')}>
                  <Text className="${genre === 'Masculino' && 'font-bold'}">Masculino</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setGenre('Feminino')}>
                  <Text className="${genre === 'Feminino' && 'font-bold'}">Feminino</Text>
                </TouchableOpacity>
              </View>
          </View>
          <Button title="Atualizar" onPress={handleUpdate} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
