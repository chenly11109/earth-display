import { devtools } from 'zustand/middleware'
import produce from 'immer'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { Authority, Decision, Member, Position, UnitStep, PayState } from '../types/orgPage'
import { ArrayUtil } from '../utils/array'

//things for combine:https://github.com/pmndrs/zustand/blob/main/docs/typescript.md
//通过subscribe的形式代替devtool调试 useStore.subscribe(state=>{console.log(state)})

//创建组织页面的状态
//外部化可以保存编辑状态，确保编辑组件的状态一致外部化

// 创建组织的状态
const CreateOrgPageStore = create(combine({
    step: 0,
    name: "",
    intro: "",
    logo: null as File | null,
    logoSrc: '',
    isSuccessDone: false,
    members: [] as Member[],
    whyNotCompliant: ""
}, (set) => ({
    setStep: (step: number) => set({ step }),
    setName: (name: string) => set({ name }),
    setIntro: (intro: string) => set({ intro }),
    setLogo: (logo: File) => set({ logo }),
    setLogoSrc: (logoSrc: string) => set({ logoSrc }),
    setSuccessDone: (isSuccessDone: boolean) => set({isSuccessDone}),
    setWhyNotCompliant: (whyNotCompliant: string) => set({ whyNotCompliant }),
    addMember: (member: Member) => set(state => {
        state.members.push(member)
    }),
    delMember: (member: Member) => set(state => {
        for (let i = 0; i < state.members.length; i++)
            if (state.members[i] === member) {
                state.members.splice(i, 1)
                break
            }
    }),
    clear: () => set(state => {
        state.step = 0
        state.name = ""
        state.intro = ""
        state.logo = null
        state.members = []
    }),
})))

//组织设置的状态
const OrgSettingPageStore = create(combine({
    modalWidth: 1009,
    modalHeight: 584,
    positions: [

    ] as Position[],
    isPositionCreating: false,
    isExistingPosSetting: false,
    isDeletingPos: false,
    isManagingMember: false,
    isAddingMembers: false,
    orgSettingStep: 0,
    isPosInfoModefied: false,
    idOfDeletingPosition: '',
    members: [] as Member[],
    selectedMemberList: [] as Member[],  // removableList的人员列表
    checkedMemberList: [] as Member[],  // checkableList的人员列表
    membersToAdd: [] as Member[],
    membersToDelete: [] as Member[],
    checkAgainList: [] as Member[],

    decisions: [{
        title: 'D1-Design decision',
        type: 'Equal',
        members: [{
            userName: 'MarkLee'
        }, {
            userName: 'Jeno'
        }, {
            userName: 'Leon'
        }]
    }, {
        title: 'D2-Development decision',
        type: 'Custom',
        members: [{
            userName: 'MarkLee',
            percent: 20
        }, {
            userName: 'Jeno',
            percent: 60
        }, {
            userName: 'Leon',
            percent: 20
        }]
    }, {
        title: 'D3-Invest decision',
        type: 'Shareholding',
        assetType: 'CUA',
        members: [{
            userName: 'MarkLee'
        }, {
            userName: 'Jeno'
        }, {
            userName: 'Leon'
        }]
    }, {
        title: 'D4-Management decision',
        type: 'Shareholding',
        assetType: 'CUA',
        members: [{
            userName: 'MarkLee'
        }, {
            userName: 'Jeno'
        }, {
            userName: 'Leon'
        }]
    },] as Decision[],
    authorities: [
        [{
            name: 'Create DOP',
        }] as Authority[]
        ,
        [{
            name: 'Create Asset',
        }, {
            name: 'Transfer Asset',
        }, {
            name: 'Mint Asset',
        }, {
            name: 'Burn Asset',
        }] as Authority[],
        [{
            name: 'Invite specified members'
        }, {
            name: 'Remove specified members'
        }, {
            name: 'Transfer the CEO Position'
        }, {
            name: 'Approved application to join'
        }] as Authority[],
        [{
            name: 'Change organization name'
        }, {
            name: 'Change organization logo and introduction'
        }, {
            name: 'Change Management set'
        }, {
            name: 'Change Position'
        }] as Authority[]

    ] as Authority[][],
}, (set) => ({
    setModalSize: (w:number, h:number) => set(state => {
      state.modalWidth = w
      state.modalHeight = h
    }),
    setPositions: (poss: Position[]) => set(state => {
      state.positions = [...poss]
    }),
    addPosition: (position: Position) => set(state => {
      state.positions = [...state.positions, position]
    }),
    delPosition: (index: number) => set(state => {
      state.positions.splice(index,1)
    }),
    updatePosition: (index: number, pos: Position) => set(state =>{
      state.positions.splice(index,1, pos)
      console.log(state.positions)
    }),
    setIdOfDeletingPosition: (id: string) => set(state => {state.idOfDeletingPosition = id}),
    setPositionCreating: (flag: boolean) => set(state => {state.isPositionCreating = flag}),
    setExistingPosSetting: (flag: boolean) => set(state => {state.isExistingPosSetting = flag}),
    setDeletingPos: (flag: boolean) => set(state => {state.isDeletingPos = flag}),
    setManagingMember: (flag: boolean) => set(state => {state.isManagingMember = flag}),
    setAddingMembers: (flag: boolean) => set(state => {state.isAddingMembers = flag}),
    setSelectedMemberList: (uList: Member[]) => set(state => {
      uList.map(u => {
        if(state.selectedMemberList.findIndex(p => p.userId===u.userId) < 0){
          const tmpList = [...state.selectedMemberList]
          state.selectedMemberList = [...tmpList, u]
        }
      })
    }),
    updateSelectedMemberList: (uList: Member[]) => set(state => {
      state.selectedMemberList = [...uList]
    }),
    clearSelectedMemberList: () => set(state => {state.selectedMemberList = []}),
    deleteSelectedMemberList: (u: Member) => set(state => {
      const index = state.selectedMemberList.findIndex(user => user.userId===u.userId)
      const tmpList = [...state.selectedMemberList]
      tmpList.splice(index, 1)
      state.selectedMemberList = [...tmpList]
    }),
    setPosInfoModefied: (b: boolean) => set(state => {
      state.isPosInfoModefied = b
    }),
    setCheckedMemberList: (uList: Member[]) => set(state => {
      state.checkedMemberList = [...uList]
    }),
    setOrgSettingStep: (n: number) => set(state => {state.orgSettingStep = n}),
    initMembers: (members: Member[]) => set(state => {state.members = members}),

    addMember: (member: Member) => set(state => {
        state.members.push(member)
    }),
    delMember: (member: Member) => set(state => {
        ArrayUtil.del(state.members, member)
    }),
    updateMember: (before: Member, after: Member) => set(state => {
        ArrayUtil.update(state.members, before, after)
    }),
    clearMembersToAdd: () => set(state => {
      state.membersToAdd = []
    }),
    setMembersToAdd: () => set(state => {
      state.checkedMemberList.forEach(checkedUser => {
        if(state.selectedMemberList.findIndex(u => u.userId===checkedUser.userId)<0){
          state.membersToAdd = [...state.membersToAdd, checkedUser]
        }
      })
    }),
    setMembersToDelete: (u: Member) => set(state => {
      state.membersToDelete = [...state.membersToDelete, u]
    }),
    setCheckAgainList: (uList: Member[]) => set(state => {
      state.checkAgainList = [...uList]
    }),

})))

// 创建资产的状态
const CreateUnitPageStore = create(combine({
  step: 'fillName' as UnitStep,  // step
  name: '',   // unit name
  abbr: '',
  releaseAmount: '',  
  properties: [] as string[],
  stepEnd: false,   // 每个step结束的时刻，用于控制页面内容消失动画
  payState: 'pending' as PayState,   // 付费的状态

  whyNotCompliant: "",
  logo: null as File | null,
  logoSrc: '',

}, (set) => ({
  setStep: (s: UnitStep) => set(state => {state.step = s}),
  setName: (n: string) => set(state => {state.name = n}),
  setAbbr: (n: string) => set(state => {state.abbr = n}),
  setRealeaseAmount: (n: string) => set(state => {state.releaseAmount = n}),
  setProperties: (arr: string[]) => set(state => {state.properties = [...arr]}),
  setStepEnd: (b: boolean) => set(state => {state.stepEnd = b}),
  setPayState: (s: PayState) => set(state => {state.payState = s}),
  setWhyNotCompliant: (whyNotCompliant: string) => set({ whyNotCompliant }),
  setLogo: (logo: File) => set({ logo }),
  setLogoSrc: (logoSrc: string) => set({ logoSrc }),

})))


export const useOrgPageStore = create((set: any) => ({
    CreateOrgPageStore,
    OrgSettingPageStore,
    CreateUnitPageStore
}))