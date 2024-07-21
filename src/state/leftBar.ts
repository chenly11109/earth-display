import create from 'zustand';
import produce from "immer";
import WorkflowLogo from "./workflow.svg";

interface Link  {
    index:number;
    type:"fullscreen" | "modal" | 'secondaryModal';
    link:string;
    abbr?:string;
    title:string;
    url?:string;
}

interface SecondaryLink  {
  index:string;
  preLink:string;
  link:string;
  title:string;
}

interface LeftStoreState {
    leftBarLinks:Array<Link>;
    secondaryModal:Array<SecondaryLink>;
    modal:{
        openModal:Array<Link>;
        selectedIndex:number;
    };
    openModal:(link:Link)=>void;
    closeModal:()=>void;
    selectModalLink:(newIndex:number,currentLink:string)=>void;

    showMountPage:boolean;
    showModal:boolean;
    setShowModal:(showModal:boolean)=>void;
    fullscreenApps:{
        openApps:Array<Link>;
        selectedIndex:number;
     
    }
    selectFullscreen:(index:number,type:boolean)=>void;
    closeFullscreen:()=>void;
    minimizeFullscreen:(link:string)=>void;

    openFullscreen:(link:Link)=>void;
    startIndex:number;
    setStartIndex:(index:number, type:boolean)=>void;
    homePageLink:string;
    setHomePageLink:(link:string)=>void;

}

export const useLeftBarStore = create<LeftStoreState>((set) => ({
    homePageLink : "",
    setHomePageLink : (link) => set(
        produce(state => {
            state.homePageLink = link
        })
    ),

    //there might be params to define event / workflow / organization etc.
    leftBarLinks: [
        { index: 0, type: "fullscreen", link: "/event", url:WorkflowLogo, title:"Event Workflow" },
        { index: 1, type: "fullscreen", link: "/applicationEdit", title:"Temp" },//一个template,不具备实际功能
        { index: 2, type: "modal", link: "/collaboration", abbr: "C",title:"Collaboration" },
        { index: 3, type: "modal", link: "/organization", abbr: "O",title:"Organization" },
    ],

    // 次级页面
    secondaryModal: [
      {index: '3-1', preLink: "/organization", link: "/organization/setting", title: "Organization Settings" },
      {index: '3-1-1', preLink: "/organization/setting", link: "/organization/setting/pos_setting", title: "Position Settings" },
    ],

    modal: {
        openModal: [], selectedIndex: -1
    },

    //start a new page in a link
    openModal:  (link:Link) => set(
        produce((state:LeftStoreState) => {
            if(!state.modal.openModal.find(modal=>modal.index===link.index))state.modal.openModal.push(link);
            state.modal.selectedIndex = link.index;
            state.showModal = true;
        })
    ),

    
    closeModal:()=>set(
        produce((state:LeftStoreState) => {
            const index = state.modal.openModal.findIndex(modal=>modal.index === state.modal.selectedIndex);
            state.modal.openModal.splice(index,1);
            if(state.modal.openModal.length){state.modal.selectedIndex = state.modal.openModal[0].index}
            if(!state.modal.openModal.length){
                state.showModal = false;
                state.modal.selectedIndex = -1;
            }
        })
    ),


    selectModalLink:(newIndex, currentLink)=>set(
        produce((state:LeftStoreState) => {
            const currentSequence = state.modal.openModal.findIndex(modal=>modal.index === state.modal.selectedIndex);
            state.modal.openModal[currentSequence].link = currentLink;
            state.modal.selectedIndex = newIndex;
        })
    ),

    showMountPage: true,
    showModal: false,
    setShowModal:((showModal:boolean)=>set(
        produce((state:LeftStoreState)=>{
            state.showModal = showModal;
        })
    )),

    fullscreenApps: {
        openApps: [
            
        ], selectedIndex: -1
    },

    //call when start a full-screen application
    openFullscreen: (link) => set(
        produce(state => {
            state.fullscreenApps.openApps.push(link);
            state.fullscreenApps.selectedIndex = link.index;
        })
    ),


    //call when you click on an full-screen application
    //type:boolean, true means open the app from the openApps, vice versa
    selectFullscreen: (index,type) => set(
        produce(state => {
            const selectedIndex = state.fullscreenApps.selectedIndex;
            if (selectedIndex === index && type) {
                state.fullscreenApps.selectedIndex = -1;
            } else {
                state.fullscreenApps.selectedIndex = index;
            }
        })
    ),
    closeFullscreen:()=>set(
        produce((state:LeftStoreState)=>{
            const selectedIndex = state.fullscreenApps.selectedIndex;
            const currentIndex = state.fullscreenApps.openApps.findIndex(item=>item.index === selectedIndex);
            state.fullscreenApps.openApps.splice(currentIndex,1);
            state.fullscreenApps.selectedIndex=-1;
        })
    ),
    minimizeFullscreen:(link:string)=>set(produce((state:LeftStoreState)=>{
        const index = state.fullscreenApps.selectedIndex;
        const sequenceIndex = state.fullscreenApps.openApps.findIndex(openApp=>openApp.index === index);
        state.fullscreenApps.openApps[sequenceIndex].link = link;
        state.startIndex =  state.leftBarLinks.length + state.fullscreenApps.openApps.findIndex(item => index === item.index) +1;
        state.fullscreenApps.selectedIndex=-1;
       
    })),

    //used to determine where the animation position starts
    startIndex: -1,
    //both opened application & closed application use the same function
    //type:boolean, true means the app is in openApps, vice versa
    setStartIndex: (index, type) => set(produce((state:LeftStoreState )=> {
        let selectedIndex: number;
        if (type) {
            selectedIndex = state.leftBarLinks.length + state.fullscreenApps.openApps.findIndex(item => index === item.index) +1
        }else{
            selectedIndex = state.leftBarLinks.findIndex(item=>item.index === index);
        }

        state.startIndex = selectedIndex;

    })),



}))