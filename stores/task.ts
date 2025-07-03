// import { defineStore } from 'pinia'

// export interface Task {
//   id: number
//   name: string
//   token: string
//   ref: string
//   trigger: string
//   projectId: number        
// }

// const makeKey = (projectId: number) => `tasks_${projectId}`

// export const useTaskStore = defineStore('tasks', {
//   state: () => ({
//     tasks: [] as Task[]
//   }),
//   getters: {
//     tasksByGroup: (state) => {
//       return (projectId: number) => state.tasks.filter(t => t.projectId === projectId)
//     }
//   },

//   actions: {
//     load(projectId: number) {
//       const raw = localStorage.getItem(makeKey(projectId))
//       this.tasks = raw ? (JSON.parse(raw) as Task[]) : []
//     },

//     persist(projectId: number) {
//       localStorage.setItem(makeKey(projectId), JSON.stringify(this.tasks))
//     },

//     add(task: Omit<Task, 'id'>) {
//       const newId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1
//       this.tasks.push({ ...task, id: newId })
//       this.persist(task.projectId)
//     },

//     update(updated: Task) {
//       const i = this.tasks.findIndex(t => t.id === updated.id)
//       if (i !== -1) this.tasks[i] = updated
//       this.persist(updated.projectId)
//     },

//   deleteTask(id: number, projectId: number) {
//   this.tasks = this.tasks.filter(t => t.id !== id)
//   this.persist(projectId)
// }
//   }
// })
// stores/task.ts
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export interface Task {
  id: number
  name: string
  token: string
  ref: string
  trigger: string
  projectId: number
}

/* کلید: tasks_<userId>_<projectId> */
const key = (userId: string, projectId: number) => `tasks_${userId}_${projectId}`

export const useTaskStore = defineStore('tasks', {
  /* ——— state ——— */
  state: () => ({
    tasks: [] as Task[]
  }),

  /* ——— getters ——— */
  getters: {
    /* Getter اصلی؛ پارامتر می‌گیرد */
    tasksByProject: (state) => (projectId: number) =>
      state.tasks.filter(t => t.projectId === projectId),

    /* سازگاری عقب‌رو با نام قدیمی */
    tasksByGroup(): (projectId: number) => Task[] {
      return this.tasksByProject
    }
  },

  /* ——— actions ——— */
  actions: {
    /** خواندن از localStorage (فقط روی کلاینت) */
    load(projectId: number) {
      const auth = useAuthStore()
      if (process.server || !auth.userId) return

      try {
        const raw = localStorage.getItem(key(auth.userId, projectId))
        this.tasks = raw ? (JSON.parse(raw) as Task[]) : []
      } catch (err) {
        console.error('Failed to load tasks', err)
        this.tasks = []
      }
    },

    /** ذخیره در localStorage */
    persist(projectId: number) {
      const auth = useAuthStore()
      if (process.server || !auth.userId) return
      localStorage.setItem(key(auth.userId, projectId), JSON.stringify(this.tasks))
    },

    /** ایجاد تسک جدید */
    add(task: Omit<Task, 'id'>) {
      const newId =
        this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1
      this.tasks.push({ ...task, id: newId })
      this.persist(task.projectId)
    },

    /** ویرایش تسک موجود */
    update(updated: Task) {
      const i = this.tasks.findIndex(t => t.id === updated.id)
      if (i !== -1) {
        this.tasks.splice(i, 1, updated) // واکنش‌پذیر
        this.persist(updated.projectId)
      }
    },

    /** حذف تسک */
    deleteTask(id: number, projectId: number) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.persist(projectId)
    }
  }
})

