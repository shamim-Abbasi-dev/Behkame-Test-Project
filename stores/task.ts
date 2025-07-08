

// import { defineStore } from 'pinia'
// import { useAuthStore } from '@/stores/auth'

// export interface Task {
//   id:        number
//   name:      string
//   token:     string
//   ref:       string
//   trigger:   string
//   projectId: number
// }

// const key = (userId: string, projectId: number) => `tasks_${userId}_${projectId}`

// export const useTaskStore = defineStore('tasks', {
//   state: () => ({
//     tasks: [] as Task[]
//   }),

//   getters: {
//     tasksByProject: (state) => (projectId: number) =>
//       state.tasks.filter(t => t.projectId === projectId),

//     tasksByGroup(): (projectId: number) => Task[] {
//       return this.tasksByProject
//     }
//   },

//   actions: {
//     load(projectId: number) {
//       const auth = useAuthStore()
//       if (!auth.token) {
//         this.tasks = []
//         return
//       }

//       try {
//         const raw = localStorage.getItem(key(auth.token, projectId))
//         this.tasks = raw ? (JSON.parse(raw) as Task[]) : []
//       } catch (err) {
//         console.error('Failed to load tasks', err)
//         this.tasks = []
//       }
//     },

//     persist(projectId: number) {
//       const auth = useAuthStore()
//       if (!auth.token) return
//       localStorage.setItem(key(auth.token, projectId), JSON.stringify(this.tasks))
//     },

//     add(task: Omit<Task, 'id'>) {
//       const newId = this.tasks.length
//         ? Math.max(...this.tasks.map(t => t.id)) + 1
//         : 1
//       this.tasks.push({ ...task, id: newId })
//       this.persist(task.projectId)
//     },

//     update(updated: Task) {
//       const i = this.tasks.findIndex(t => t.id === updated.id)
//       if (i !== -1) {
//         this.tasks.splice(i, 1, updated)
//         this.persist(updated.projectId)
//       }
//     },

//     deleteTask(id: number, projectId: number) {
//       this.tasks = this.tasks.filter(t => t.id !== id)
//       this.persist(projectId)
//     }
//   }
// })
import { defineStore } from 'pinia'
import type { Task } from '../models/task'
import { useAuthStore } from './auth' 

const key = (token: string, projectId: number) => `tasks_${token}_${projectId}`

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  const reset = () => {
    tasks.value = [];
  };

  const tasksByProject = (projectId: number) =>
    computed(() => tasks.value.filter(t => t.projectId === projectId))

  const tasksByGroup = () => tasksByProject

  const load = (projectId: number) => {
    const auth = useAuthStore()
    if (!auth.token) {
      tasks.value = []
      return
    }

    try {
      const raw = localStorage.getItem(key(auth.token, projectId))
      tasks.value = raw ? (JSON.parse(raw) as Task[]) : []
    } catch (err) {
      console.error('Failed to load tasks', err)
      tasks.value = []
    }
  }

  const persist = (projectId: number) => {
    const auth = useAuthStore()
    if (!auth.token) return
    localStorage.setItem(key(auth.token, projectId), JSON.stringify(tasks.value))
  }

  const add = (task: Omit<Task, 'id'>) => {
    const newId = tasks.value.length
      ? Math.max(...tasks.value.map(t => t.id)) + 1
      : 1
    tasks.value.push({ ...task, id: newId })
    persist(task.projectId)
  }

  const update = (updated: Task) => {
    const i = tasks.value.findIndex(t => t.id === updated.id)
    if (i !== -1) {
      tasks.value.splice(i, 1, updated)
      persist(updated.projectId)
    }
  }

  const deleteTask = (id: number, projectId: number) => {
    tasks.value = tasks.value.filter(t => t.id !== id)
    persist(projectId)
  }

  return {
    
    tasks,
    tasksByProject,
    tasksByGroup,
    load,
    persist,
    add,
    update,
    deleteTask,
    reset
  }
})
