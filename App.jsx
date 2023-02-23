import { View, Text, SafeAreaView, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskCard from './src/components/TaskCard'
import AddTask from './src/components/AddTask';

const App = () => {
  const [task, setTask] = useState()
  useEffect(() => {
    getTask()
    // console.log(task);
  }, [])
  const getTask = async () => {
    const task = await AsyncStorage.getItem('task')
    if (task) {
      setTask(JSON.parse(task))
    }
  }



  return (

      <SafeAreaView className="bg-[#F9F9F9] h-full">
        <View className="flex flex-row">
          <View className="flex-1 mx-4 my-2 p-2">
            <Text className="text-black text-3xl font-bold">Today's Task</Text>
            <Text className="text-black text-lg opacity-50 ">Tuesday, 21 Feb</Text>
          </View>
          <AddTask Rtask={getTask}/>
        </View>
        <View>
          {/* <TaskCard />
          <TaskCard />
          <TaskCard /> */}
        </View>
        <FlatList
        data={task}
        renderItem={({item}) => <TaskCard item={item}/>}
        />
      </SafeAreaView>

  )
}

export default App