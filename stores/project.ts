
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import type { Project } from '@/models/project'

// interface Project {
//   id:    number
//   title: string
//   url:   string
// }


const key = (userId: string) => `projects_${userId}`


export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([]);
  const currentId = ref(1);
  const reset = () => {
    projects.value = [];
    currentId.value = 1;
  };
 const load = (): void => {
    const auth = useAuthStore();

    if (!auth.token) {
      projects.value = [];
      currentId.value = 1;
      return;
    }

    const raw = localStorage.getItem(key(auth.token));
    if (!raw) {
      projects.value = [];
      currentId.value = 1;
      return;
    }

    try {
      const parsed = JSON.parse(raw) as Project[];
      projects.value = parsed;
      currentId.value = parsed.length
        ? Math.max(...parsed.map(p => p.id)) + 1
        : 1;
    } catch (e) {
      console.error("Failed to parse projects", e);
      projects.value = [];
      currentId.value = 1;
    }
  };

  const persist = () => {
    const auth = useAuthStore()
      if (!auth.token) return
      localStorage.setItem(key(auth.token), JSON.stringify(projects.value))
  };

    const addProject = (project: Omit<Project, 'id'>): void => {
    const newProject = { ...project, id: currentId.value++ };
    projects.value.push(newProject);
    persist();
  };
    const updateProject = (updated: Project): void => {
    const i = projects.value.findIndex(p => p.id === updated.id);
    if (i !== -1) projects.value.splice(i, 1, updated);
    persist();
  };

  const deleteProject = (id: number): void => {
    projects.value = projects.value.filter(p => p.id !== id);
    persist();
  };



  return {
    projects,
    currentId,
    deleteProject,
    persist,
    addProject,
    updateProject,
    load,
    reset
  };
});




// export const useProjectStore = defineStore('projects', {
//   state: () => ({
//     projects:  [] as Project[],
//     currentId: 1
//   }),

//   actions: {
    
//   load(): void {
//       const auth = useAuthStore();

//       if (!auth.token) {
//         this.projects = [];
//         this.currentId = 1;
//         return;
//       }

//       const raw = localStorage.getItem(key(auth.token));
//       if (!raw) {
//         this.projects = [];
//         this.currentId = 1;
//         return;
//       }

//       try {
//         const parsed = JSON.parse(raw) as Project[];
//         this.projects = parsed;
//         this.currentId = parsed.length
//           ? Math.max(...parsed.map(p => p.id)) + 1
//           : 1;
//       } catch (e) {
//         console.error("Failed to parse projects", e);
//         this.projects = [];
//         this.currentId = 1;
//       }
//     },


   
//     persist(): void{
//       const auth = useAuthStore()
//       if (!auth.token) return
//       localStorage.setItem(key(auth.token), JSON.stringify(this.projects))
//     },

//     addProject(project: Omit<Project, 'id'>) :void {
//       const newProject = { ...project, id: this.currentId++ }
//       this.projects.push(newProject)
//       this.persist()
//     },

//     updateProject(updated: Project) :void{
//       const i = this.projects.findIndex(p => p.id === updated.id)
//       if (i !== -1) this.projects.splice(i, 1, updated)
//       this.persist()
//     },

//     deleteProject(id: number):void{
//       this.projects = this.projects.filter(p => p.id !== id)
//       this.persist()
//     }
//   }
// })