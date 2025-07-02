import { defineStore } from 'pinia';


interface Project {
    id: number,
    title: string,
    url: string
}

const STORAGE_KEY = 'projects'

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
    currentId: 1
  }),
  actions: {
    loadProjectsFromStorage() {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Project[]
        this.projects = parsed
        this.currentId = parsed.length ? Math.max(...parsed.map(p => p.id)) + 1 : 1
      }
    },
    saveProjectsToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.projects))
    },
    addProject(project: Omit<Project, 'id'>) {
      const newProject = { ...project, id: this.currentId++ }
      this.projects.push(newProject)
      this.saveProjectsToStorage()
    },
    deleteProject(id: number) {
      this.projects = this.projects.filter(p => p.id !== id)
      this.saveProjectsToStorage()
    },
    updateProject(updated: Project) {
      const index = this.projects.findIndex(p => p.id === updated.id)
      if (index !== -1) this.projects[index] = updated
      this.saveProjectsToStorage()
    }
  }
})