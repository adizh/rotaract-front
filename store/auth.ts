import  type {Leader, User} from '@/types/User'

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: {} as User,
    leader :{} as Leader
  }),
  
  actions: {
    logout() {
      localStorage.removeItem("groupId");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
     localStorage.removeItem("role");

      setTimeout(() => {
        window.location.reload();
      }, 500);
      return navigateTo("/auth");
    },


     async loginUser(body:any) {
      try {
  
          const response = await http.post('/auth/login',body)
  
          console.log('response login', response)
          if (response.status === 200) {
              localStorage.setItem('role', response?.data.user?.role)
        localStorage.setItem('token',response.data.token)
            localStorage.setItem('userId', response?.data?.user.id)
        
            if (response.data.user.role?.includes('leader')) {
              localStorage.setItem('groupId', response?.data?.user.groupId)
            }
            navigateTo('/')
  
              // setTimeout(() => {
              //     window.location.reload()
              // }, 400)
          }
  
      } catch (err: any) {
          console.log('err', err)
        if (err.status === 401) {
            return err.status
         
            
            return err.state
          } else if (err.status === 404) {
           
            return err.status
          }
      }
    },
    async fetchUser(userId:string) {
      try {
        const response = await http(`/auth/fetch-user-by-id/${userId}`)
        console.log('respone fetch user id', response)
        if (response.status === 200) {
          if (response.data?.role.includes('leader')) {
            
            this.leader=response.data
          }
        }
      } catch (err) {
        console.log(err)
       }
     }
  },
  getters: {
    getUserFromStorage(state) {
      if (import.meta.client) {
        let userData = localStorage.getItem("role");
        if (userData && userData !== undefined) {
          return userData;
        }
      }
    },

    getIsLeader(state) {
      if (import.meta.client) {
        let userData = localStorage.getItem("role");
        if (userData && userData !== undefined) {
          return userData?.includes('leader') ? true :false
        }
      }
    },
    getLeaderId(state):string|undefined {
      if (import.meta.client) {
        let userData = localStorage.getItem("role");
        if (userData && userData !== undefined) {
          return userData?.split('-')[1]
        } else {
          return;
        }
      }
    },
    getLeader(state) {
      return state.leader
    },
    getUserId(state) {
      if (import.meta.client) {
        let userData = localStorage.getItem("userId");
        if (userData && userData !== undefined) {
          return userData
        }
      }
    },  getGroupId(state) {
      if (import.meta.client) {
        let userData = localStorage.getItem("groupId");
        if (userData && userData !== undefined) {
          return userData
        }
      }
    },
    getUserRole(state) {
      if (import.meta.client) {
        let userData = localStorage.getItem("role");
        if (userData && userData !== undefined) {
          return userData
        }
      }
    },
    getToken(state) {
      if (import.meta.client) {
        let userData = localStorage.getItem("token");
        if (userData && userData !== undefined) {
          return userData
        }
      }
    },
  },
});
