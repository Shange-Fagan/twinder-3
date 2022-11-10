import React from 'react'
import Header from '../components/Header'
import ChatList from '../components/ChatList'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn'

const EditInfoScreen = () => {
  const tailwind = useTailwind();

  return (
    <SafeAreaView style={[tailwind("h-full"), { backgroundColor: '#1f1f23'}]}>
      <Header title="Edit Info" />
      
    </SafeAreaView>
  );
};

export default EditInfoScreen;