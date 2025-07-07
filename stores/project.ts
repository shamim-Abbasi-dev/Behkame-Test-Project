
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'

interface Project {
  id:    number
  title: string
  url:   string
}


const key = (userId: string) => `projects_${userId}`

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects:  [] as Project[],
    currentId: 1
  }),

  actions: {
    
    load() {
      const auth = useAuthStore()
      if (!auth.token) {
        this.projects  = []
        this.currentId = 1
        return
      }

      const raw = localStorage.getItem(key(auth.token))
      if (!raw) {
        this.projects  = []
        this.currentId = 1
        return
      }

      try {
        const parsed = JSON.parse(raw) as Project[]
        this.projects  = parsed
        this.currentId = parsed.length
          ? Math.max(...parsed.map(p => p.id)) + 1
          : 1
      } catch (e) {
        console.error('Failed to parse projects', e)
        this.projects  = []
        this.currentId = 1
      }
    },

   
    persist() {
      const auth = useAuthStore()
      if (!auth.token) return
      localStorage.setItem(key(auth.token), JSON.stringify(this.projects))
    },

    addProject(project: Omit<Project, 'id'>) {
      const newProject = { ...project, id: this.currentId++ }
      this.projects.push(newProject)
      this.persist()
    },

    updateProject(updated: Project) {
      const i = this.projects.findIndex(p => p.id === updated.id)
      if (i !== -1) this.projects.splice(i, 1, updated)
      this.persist()
    },

    deleteProject(id: number) {
      this.projects = this.projects.filter(p => p.id !== id)
      this.persist()
    }
  }
})
