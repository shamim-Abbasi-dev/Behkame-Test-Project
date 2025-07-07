

import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export interface Task {
  id:        number
  name:      string
  token:     string
  ref:       string
  trigger:   string
  projectId: number
}

const key = (userId: string, projectId: number) => `tasks_${userId}_${projectId}`

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[]
  }),

  getters: {
    tasksByProject: (state) => (projectId: number) =>
      state.tasks.filter(t => t.projectId === projectId),

    tasksByGroup(): (projectId: number) => Task[] {
      return this.tasksByProject
    }
  },

  actions: {
    load(projectId: number) {
      const auth = useAuthStore()
      if (!auth.token) {
        this.tasks = []
        return
      }

      try {
        const raw = localStorage.getItem(key(auth.token, projectId))
        this.tasks = raw ? (JSON.parse(raw) as Task[]) : []
      } catch (err) {
        console.error('Failed to load tasks', err)
        this.tasks = []
      }
    },

    persist(projectId: number) {
      const auth = useAuthStore()
      if (!auth.token) return
      localStorage.setItem(key(auth.token, projectId), JSON.stringify(this.tasks))
    },

    add(task: Omit<Task, 'id'>) {
      const newId = this.tasks.length
        ? Math.max(...this.tasks.map(t => t.id)) + 1
        : 1
      this.tasks.push({ ...task, id: newId })
      this.persist(task.projectId)
    },

    update(updated: Task) {
      const i = this.tasks.findIndex(t => t.id === updated.id)
      if (i !== -1) {
        this.tasks.splice(i, 1, updated)
        this.persist(updated.projectId)
      }
    },

    deleteTask(id: number, projectId: number) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.persist(projectId)
    }
  }
})
