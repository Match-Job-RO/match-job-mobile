import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, SafeAreaView } from 'react-native';

export default function PostService() {
  const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [postType, setPostType] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const handlePublish = () => {
    
  };

  return (
    <ScrollView>
			<SafeAreaView className="p-16 h-full">
				<View className="flex justify-center items-center py-16">
					<View className="mb-8">
						<Text className="font-light text-4xl text-purple p-4">SERVIÇO</Text>
              <View className="gap-8">
                <TextInput
                  className="border border-gray-500 p-2 mb-4"
                  placeholder="Título"
                  value={title}
                  onChangeText={setTitle}
                />
                <TextInput
                  className="border border-gray-500 p-2 mb-4"
                  placeholder="Conteúdo"
                  value={content}
                  onChangeText={setContent}
                />
                <TextInput
                  className="border border-gray-500 p-2 mb-4"
                  placeholder="Tipo de post"
                  value={postType}
                  onChangeText={setPostType}
                />
                <TextInput
                  className="border border-gray-500 p-2 mb-4"
                  placeholder="#"
                  value={tags}
                  onChangeText={setTags}
                />
              </View>
              <Button title="Publicar" onPress={handlePublish} />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>    
  );
}
