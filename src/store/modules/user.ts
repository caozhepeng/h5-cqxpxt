import { defineStore } from 'pinia'
import { createStorage } from '@/utils/Storage'
import { store } from '@/store'
import { KEY_ACCESS_TOKEN, KEY_CURRENT_USER } from '@/store/mutation-types'
import { ResultEnum } from '@/enums/httpEnum'
import { doLogout, getUserInfo, login } from '@/api/system/user'
import { PageEnum } from '@/enums/pageEnum'
import router from '@/router'

const Storage = createStorage({ storage: localStorage })

interface UserInfo {
  userId: string | number
  username: string
  realname: string
  nickname: string
  avatar: string
  cover: string
  gender: number
  phone: string
  sign?: string
  industry?: number
}

interface IUserState {
  token?: string
  userInfo: Nullable<UserInfo>
  lastUpdateTime: number
}

interface LoginParams {
  code: string;
  password: string;
  versionCode: string;
  versionType: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    userInfo: null,
    token: undefined,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || Storage.get(KEY_CURRENT_USER, '') || {}
    },
    getToken(): string {
      return this.token || Storage.get(KEY_ACCESS_TOKEN, '')
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token || ''
      Storage.set(KEY_ACCESS_TOKEN, token)
    },
    setUserInfo(info: any | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      Storage.set(KEY_CURRENT_USER, info)
    },

    async Login(params: LoginParams) {
      try {
        const response = await login(params)
        const { data, code } = response
        if (code === ResultEnum.SUCCESS) {
          // save token
          this.setToken(data.token)
          this.setUserInfo(data);
        }
        return Promise.resolve(response)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    async GetUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            this.setUserInfo(res)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    async Logout() {
      if (this.getToken) {
        try {
          await doLogout()
        }
        catch {
          console.error('注销Token失败')
        }
      }
      this.setToken(undefined)
      this.setUserInfo(null)
      Storage.remove(KEY_ACCESS_TOKEN)
      Storage.remove(KEY_CURRENT_USER)
      router.push(PageEnum.BASE_LOGIN)
      location.reload()
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store)
}
