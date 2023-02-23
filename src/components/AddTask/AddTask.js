import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal";
import DatePicker from 'react-native-date-picker'
import { Formik } from 'formik';
import { format } from 'date-fns'
import AsyncStorage from '@react-native-async-storage/async-storage';



const AddTask = ({Rtask}) => {
    const [isModalVisible, setModalVisible] = useState()
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const handleAddTask = () => {
        setModalVisible(true)
    }
    const handleSubmitTask = async (values) => {
        const task = JSON.parse(await AsyncStorage.getItem('task'))

        if (!task) {
            await AsyncStorage.setItem('task', JSON.stringify([values]))
        } else {
            await AsyncStorage.setItem('task', JSON.stringify([values, ...task]))
        }
        setModalVisible(false)
        Rtask()
        
    }
    


    return (
        <TouchableOpacity className="mx-4 self-center p-3 rounded-xl bg-[#b1c8f0]" onPress={handleAddTask}>
            <Text className="text-[#1055CD]">+ New Task</Text>
            <View>
                <Modal isVisible={isModalVisible}
                    onBackdropPress={() => setModalVisible(false)}
                    onBackButtonPress={() => setModalVisible(false)}
                >
                    <View className="bg-white p-3 rounded-xl">
                        <Text className="text-black text-2xl font-bold text-center">Add Task</Text>
                        <Formik
                            initialValues={{ taskName: '', taskSection: '', taskDescription: '', date: '' }}
                            onSubmit={values => handleSubmitTask(values)}
                        >
                            {({ handleChange, setFieldValue, handleBlur, handleSubmit, values }) => (
                                <View>
                                    <TextInput
                                        className="p-3 m-2 border rounded text-black"
                                        placeholder='Task Name'
                                        placeholderTextColor={'black'}
                                        onChangeText={handleChange('taskName')}
                                        onBlur={handleBlur('taskName')}
                                        value={values.taskName}
                                    />
                                    <TextInput
                                        className="p-3 m-2 border rounded text-black"
                                        placeholder='Task Section'
                                        placeholderTextColor={'black'}
                                        onChangeText={handleChange('taskSection')}
                                        onBlur={handleBlur('taskSection')}
                                        value={values.taskSection}
                                    />
                                    <TextInput
                                        className="p-3 m-2 border rounded text-black"
                                        placeholder='Task Description'
                                        placeholderTextColor={'black'}
                                        onChangeText={handleChange('taskDescription')}
                                        onBlur={handleBlur('taskDescription')}
                                        value={values.taskDescription}
                                    />
                                    <View className="p-3 m-2 flex flex-row gap-2">
                                        <TouchableOpacity className="border rounded flex-1" onPress={() => setOpen(true)}>
                                            <Text className="text-black text-lg font-bold text-center" >Select Date</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text className="px-3 mx-2 text-black">{format(date, 'dd/MM/yyyy HH:m')}</Text>
                                    <DatePicker
                                        locale='tr'
                                        modal
                                        open={open}
                                        date={date}
                                        onConfirm={(date) => {
                                            setOpen(false)
                                            setDate(date)
                                            setFieldValue('date', date)
                                        }}
                                        onCancel={() => {
                                            setOpen(false)
                                        }}
                                    />

                                    <View className="p-3 m-2 flex flex-row gap-2">
                                        <TouchableOpacity className="border border-red-600 rounded flex-1" onPress={() => setModalVisible(false)}>
                                            <Text className="text-red-600 text-lg font-bold text-center" >Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className="border border-green-500 rounded flex-1" onPress={handleSubmit}>
                                            <Text className="text-green-500 text-lg font-bold text-center"> Add Task</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </Modal>
            </View>
        </TouchableOpacity>
    )
}

export default AddTask