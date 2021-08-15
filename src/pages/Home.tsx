import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks(state => [
      ...state, 
      { 
        id: state.length + 1, 
        title: newTaskTitle, 
        done: false,
      }
    ])
  }

  function handleToggleTaskDone(id: number) {
    const oldTask = tasks.find(tsk => tsk.id === id)
    if (oldTask) {
      const oldState = tasks.filter(tsk => tsk.id !== id)
      const newState = [...oldState, { 
        id: oldTask.id, 
        title: oldTask.title, 
        done: oldTask.done ? false : true,
      }]
      setTasks(newState)
    }
  }

  function handleRemoveTask(id: number) {
    if (tasks.find(tsk => tsk.id === id)) {
      setTasks(() => {
        return tasks.filter(tsk => tsk.id !== id)
      })
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})