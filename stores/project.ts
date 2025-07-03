import { defineStore } from 'pinia';

interface Project {
  id: number;
  title: string;
  url: string;
}

const STORAGE_KEY = 'projects';

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
    currentId: 1
  }),
  actions: {
    loadProjectsFromStorage() {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Project[];
          this.projects = parsed;
          this.currentId = parsed.length ? Math.max(...parsed.map(p => p.id)) + 1 : 1;
        } catch (e) {
          console.error('Failed to parse projects from localStorage', e);
          this.projects = [];
          this.currentId = 1;
        }
      }
    },
    saveProjectsToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.projects));
    },
    addProject(project: Omit<Project, 'id'>) {
      const newProject = { ...project, id: this.currentId++ };
      this.projects.push(newProject);
      this.saveProjectsToStorage();
    },
    deleteProject(id: number) {
      this.projects = this.projects.filter(p => p.id !== id);
      this.saveProjectsToStorage();
    },
    updateProject(updated: Project) {
      const index = this.projects.findIndex(p => p.id === updated.id);
      if (index !== -1) this.projects[index] = updated;
      this.saveProjectsToStorage();
    }
  }
});
// import { defineStore } from 'pinia'
// import { useAuthStore } from '@/stores/auth'

// interface Project {
//   id: number
//   title: string
//   url: string
// }

// const key = (userId: string) => `projects_${userId}`

// export const useProjectStore = defineStore('projects', {
//   state: () => ({
//     projects: [] as Project[],
//     currentId: 1
//   }),

//   actions: {
//     /** خواندن از localStorage فقط برای همین کاربر */
//     load() {
//       const auth = useAuthStore()
//       if (!auth.userId) return

//       const raw = localStorage.getItem(key(auth.userId))
//       if (!raw) return

//       try {
//         const parsed = JSON.parse(raw) as Project[]
//         this.projects = parsed
//         this.currentId = parsed.length
//           ? Math.max(...parsed.map(p => p.id)) + 1
//           : 1
//       } catch (err) {
//         console.error('Failed to parse projects', err)
//         this.projects = []
//         this.currentId = 1
//       }
//     },

//     persist() {
//       const auth = useAuthStore()
//       if (!auth.userId) return
//       localStorage.setItem(key(auth.userId), JSON.stringify(this.projects))
//     },

//     addProject(project: Omit<Project, 'id'>) {
//       const newProject = { ...project, id: this.currentId++ }
//       this.projects.push(newProject)
//       this.persist()
//     },

//     updateProject(updated: Project) {
//       const i = this.projects.findIndex(p => p.id === updated.id)
//       if (i !== -1) this.projects.splice(i, 1, updated)
//       this.persist()
//     },

//     deleteProject(id: number) {
//       this.projects = this.projects.filter(p => p.id !== id)
//       this.persist()
//     }
//   }
// })
