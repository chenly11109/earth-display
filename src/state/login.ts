import create from 'zustand'
import { combine } from 'zustand/middleware'

export const useLoginStore = create(combine({
  containerCls: '',  // 控制container的显示与消失
  userId: '', 
  userName: '',   // 完整的用户名
  token: '', 
  pk: '',  // user public key get from wallet
  sign: '',  // register Oauth check
}, (set) => ({
  setContainerCls: (cls: string) => set(state => state.containerCls = cls),
  setUserId: (id: string) => set(state => state.userId = id),
  setUserName: (name: string) => set(state => state.userName = name),
  setToken: (t: string) => set(state => state.token = t),
  setPk: (pk: string) => set(state => state.pk = pk),
  setSign: (sign: string) => set(state => state.sign = sign),
})))
