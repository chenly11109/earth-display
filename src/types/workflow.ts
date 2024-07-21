interface Workflow {
  workflowId: string,
  workflowName: string,
  events: number,

}

export interface WorkflowTemp extends Workflow {
  engagementCount: number,
  favorite: boolean

}

export interface MyWorkflow extends Workflow {
  lastTime: number,
  published: boolean
}

export interface Event {
  eventId: string,
  eventNo: string,
  eventName: string,
  prerequisite: string,//need to be updated
  positionX: number,
  positionY: number
}


export interface Event_Position {
  eventNo: number,
  position: number,
}

export interface Event_Ir { dataId: number; irId: string; irName: string; systemId: string; systemName: string; systemNo: string; threshold: number }
export interface Event_tags {
  tagName: string;
  tagId?: string;
  ifNew: boolean;
  eventNo: number;
  userName: string;
}


export interface Workflow_Add {
  effectType: boolean;
  timeValue: number;
  duration: number;
  durationType: number;
  userName: string;
  dopId: string;
  workflowName: string,
  classification: Array<string>
}

export interface Event_InfoDtoList {
  eventNo: number;
  eventName: string;
  eventDesc: string;

  prerequisites: {
    events: Array<{
      eventId?: string;
      eventNo: number;
      ifNew: boolean;
      workflowName: string;
      workflowId?: string;
    }>;
    logicType: boolean;
    tags: Array<{ tagName: string; }>;
  };

  conditions: {
    irs: { irs: Array<Event_Ir>; logicType: boolean };
    shares: { shares: Array<{ shareObjectType: number; values: number }>; logicType: boolean };
    tasks: {
      tasks: Array<{
        taskName: string;
        taskDesc: string
      }>; logicType: boolean
    }
  };

  tags: Array<Event_tags>;
}

export interface Workflow_dto {
  dopId: string;
  duration: number;
  effectType: boolean;
  timeValue: string;
  userName: string;
  workflowName: string;

  infoDtoList: Array<Event_InfoDtoList>;

}