import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { format,formatDistance } from 'date-fns'
import { tr } from 'date-fns/locale';


const TaskCard = ({item}) => {
    const [isClosed, setIsClosed] = useState(false)
    const handleOpen = () => {
        setIsClosed(true)
    }
    const handleClose = () => {
        setIsClosed(false)
    }
    console.log(typeof new Date(item.date));
    return (
        <View className="bg-white rounded-lg mx-4 my-2 px-3 py-4">
            <View className="flex flex-row">
                <View className="flex-1">
                    <Text className={ `text-black text-2xl font-bold ${isClosed && "line-through"}`}>{item.taskName}</Text>
                    <Text className="text-black text-lg opacity-60">{item.taskSection}</Text>
                </View>
                <View className="justify-center mx-5">
                    {
                        isClosed ? (
                            <TouchableOpacity className="bg-[#1364F3] w-9 h-9 items-center justify-center  rounded-full" onPress={handleClose}>
                                <Text className="text-white">✓</Text>
                            </TouchableOpacity>
                        ) :
                            (
                                <TouchableOpacity className="bg-white w-9 h-9 rounded-full border border-black opacity-50" onPress={handleOpen}>
                                    <Text></Text>
                                </TouchableOpacity>
                            )
                    }
                </View>
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginVertical: 10
                }}
            />
            <View>
                <Text className="text-black text-base opacity-40">{format(new Date(item.date), 'dd/MM/yyyy HH:m')}</Text>
            </View>
        </View>
    )
}

export default TaskCard