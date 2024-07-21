import create from 'zustand';
import produce from 'immer';
import { Event_Position, Event_Ir, Event_InfoDtoList } from '../types/workflow';
import { Workflow_Add } from '../types/workflow'


interface EventsLayout {
    events: Array<Event_Position>,
    eventsLength: number,
    eventsLastNo: number,
    selectedPosition: null | number,
    currentEvent: number,
    page: number
}

interface State {
    eventsLayout: EventsLayout,
    events: Array<Event_InfoDtoList>,
    workflow: Workflow_Add
}

export const EVENT_TYPES = [
    "Marketing",
    "Financial",
    "Time-limited Activity",
    "Human resource",
    "Engineering",]



const emptyEvent = {
    eventNo: 0,
    eventName: "",
    eventDesc: "",

    prerequisites:
    {
        events: [],
        logicType: false,
        tags: []
    },

    conditions:
    {
        irs: {
            irs: [],
            logicType: false
        },
        shares: {
            shares: [],
            logicType: false
        },
        tasks: {
            tasks: [],
            logicType: false
        }
    },

    tags: []
}


export const useWorkflowStore = create((set: any, get: any) => ({

    //set defaultTab when select other tabs
    detail: "information",
    setDetail: (detail: string) => set(() => ({ detail: detail })),

    showName: true,
    toggleName: (showName: boolean) => set(() => ({ showName: showName })),
    showDescription: true,
    toggleDescription: (showDescription: boolean) => set(() => ({ showDescription: showDescription })),


    //eventCanvas variables
    eventsLayout: {
        events: [
            {
                eventNo: 0,
                position: 1,
            },
        ],

        eventsLength: 1,
        eventsLastNo: 0,
        currentEvent: 0,
        selectedPosition: null,
        page: 0
    },

    eventsLayoutUtils: {
        addEvent: () =>
            set(
                produce((state: State) => {
                    state.eventsLayout.events.push({
                        eventNo: state.eventsLayout.eventsLastNo + 1,
                        position: state.eventsLayout.eventsLength * 3 + 1,
                    });
                    state.eventsLayout.eventsLength++;
                    state.eventsLayout.eventsLastNo++;
                    state.events.push({ ...emptyEvent, eventNo: state.eventsLayout.eventsLastNo });

                })
            ),

        deleteEvent: (eventNo: number) => set(
            produce((state: State) => {
                const eventsLayoutIndex = state.eventsLayout.events.findIndex(event => event.eventNo === eventNo);
                const evnetsIndex = state.events.findIndex(event => event.eventNo === eventNo);
                state.eventsLayout.events.splice(eventsLayoutIndex, 1);
                state.events.splice(evnetsIndex, 1);
            })
        ),

        changeCurrentEvent: (eventNo: number) => set(produce((state: State) => { state.eventsLayout.currentEvent = eventNo })),
        changeSelectedPosition: (position: number | null) =>
            set(produce((state: State) => { state.eventsLayout.selectedPosition = position })),

        moveEvent: (eventNo: number, newPosition: number) =>
            set(
                produce((state: State) => {
                    const index = state.eventsLayout.events.findIndex(
                        (event) => event.eventNo === eventNo
                    );
                    const eventsLength = state.eventsLayout.eventsLength;
                    state.eventsLayout.events[index].position = newPosition;
                    if (newPosition > eventsLength * 3 - 1) state.eventsLayout.eventsLength++;
                })
            ),

        removeEmptyColumn: () =>
            set(
                produce((state: State) => {
                    for (let i = 0; i < 3 * state.eventsLayout.eventsLength; i = i + 3) {
                        const columnPositions = [i, i + 1, i + 2];
                        const includes = state.eventsLayout.events.some((event) =>
                            columnPositions.includes(event.position)
                        );
                        if (!includes) {
                            state.eventsLayout.events.forEach((event) => {
                                if (event.position >= i + 3) {
                                    event.position -= 3;
                                }
                            });
                            state.eventsLayout.eventsLength--;
                        }
                    }
                })
            ),

        insertColumn: (curPosition: number) =>
            set(
                produce((state: State) => {
                    const column = Math.floor(curPosition / 3) * 3;
                    state.eventsLayout.events.forEach((event) => {
                        if (
                            event.position >= column
                        ) {
                            event.position += 3;
                        }
                    });
                    state.eventsLayout.eventsLength++;
                })
            ),

        addPage: () => set(
            produce((state: State) => {
                if (state.eventsLayout.eventsLength > 4) { state.eventsLayout.page = state.eventsLayout.page + 1 }

            })),
        nextPage: () => set(produce((state: State) => {
            state.eventsLayout.page = state.eventsLayout.page + 10 > state.eventsLayout.eventsLength ? state.eventsLayout.eventsLength - 4 : state.eventsLayout.page + 5
        })),
        prevPage: () => set(produce((state: State) => {
            state.eventsLayout.page = state.eventsLayout.page - 5 > 0 ? state.eventsLayout.page - 5 : 0
        }))
    },



    currentEvent:
        () => {
            const events = get().events;
            const eventNo = get().eventsLayout.currentEvent;
            const event = events.find((event: { eventNo: number }) => event.eventNo === eventNo);
            return event;
        },

    currentWorkflow: () => {
        const eventsLayout = get().eventsLayout;
        const events = get().events;
        const workflow = get().workflow;
        return { eventsLayout, events, workflow }
    },

    events: [produce(emptyEvent, () => { })],
    //quick method to get currentEvent    
    utils: {
        //information Tab
        setName: (name: string) => set(produce(
            (state: State) => {
                const index = state.eventsLayout.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                state.events[index].eventName = name;
            }
        )),
        setDescription: (description: string) => set(produce(
            (state: State) => {
                const index = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                state.events[index].eventDesc = description;
            }
        )),

        //prerequisite
        //you can only change the current selected event`s details, so there`s no need to put it in the arguments
        editPrerequisiteLogicType: (type: boolean) => set(produce(
            (state: State) => {
                const index = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                state.events[index].prerequisites.logicType = type;
            }
        )),

        addEventPrerequisite: (workflowName: string, eventNo: number, workflowId?: string, ifNew?: boolean, eventId?: string) => set(produce(
            (state: State) => {
                const index = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                const requisite = state.events[index].prerequisites.events;
                if (!requisite.some(event => event.eventId === eventId && event.eventNo === eventNo)) state.events[index].prerequisites.events.push({
                    eventId: eventId,
                    workflowName: workflowName,
                    eventNo: eventNo,
                    ifNew: ifNew === undefined ? true : false,
                    workflowId: workflowId
                });
            }
        )),
        deleteEventPrerequisite: (eventNo: number, eventId?: string) => set(produce(
            (state: State) => {
                const eventIndex = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                const requisite = state.events[eventIndex].prerequisites.events;
                const requisiteIndex = requisite.findIndex(event => event.eventId === eventId && event.eventNo === eventNo);
                requisite.splice(requisiteIndex, 1);
            }
        )),

        addTagPrerequisite: (tagName: string) => set(produce(
            (state: State) => {
                const index = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                const selectedTags = state.events[index].prerequisites.tags;
                //delete duplicated tags
                if (!selectedTags.some(tag => tag.tagName === tagName)) selectedTags.push({ tagName: tagName });
            }
        )),
        deleteTagPrerequisite: (tagName: string) => set(produce(
            (state: State) => {
                const eventIndex = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                const requisite = state.events[eventIndex].prerequisites.tags;
                const tagIndex = requisite.findIndex(tag => tag.tagName === tagName);
                requisite.splice(tagIndex, 1);
            }
        )),

        //shares === distribution    
        addDistribution: (times: number, type: "dop" | "workflow") => set(produce(
            (state: State) => {
                const shareObjectType = type === "dop" ? 2 : 1;
                const index = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                const distribution = state.events[index].conditions.shares.shares;
                const distributionIndex = distribution.findIndex(distribution => distribution.shareObjectType === shareObjectType);
                if (distributionIndex === -1) { distribution.push({ shareObjectType: shareObjectType, values: times }) }
                else { distribution[distributionIndex].values = times; }

            }
        )),

        deleteDistribution: (type: "dop" | "workflow") => set(produce(
            (state: State) => {
                const shareObjectType = type === "dop" ? 2 : 1;
                const index = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                const distribution = state.events[index].conditions.shares.shares;
                const distributionIndex = distribution.findIndex(distribution => distribution.shareObjectType === shareObjectType);
                distribution.splice(distributionIndex, 1);
            }
        )),

        editDistributionLogicType: (type: boolean) => set(produce(
            (state: State) => {
                const index = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                state.events[index].conditions.shares.logicType = type;
            }
        )),

        addIr: (ir: Event_Ir) => set(produce(
            (state: State) => {
                const index = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                const irCollection = state.events[index].conditions.irs.irs;
                if (!irCollection.some(item => item.irId === ir.irId && item.dataId === ir.dataId)) irCollection.push(ir);
            }
        )),

        editIr: (irId: string, dataId: number, threshold: number) => set(produce(
            (state: State) => {
                const index = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                const irCollection = state.events[index].conditions.irs.irs;
                const irIndex = irCollection.findIndex(ir => ir.irId === irId && ir.dataId === dataId);
                irCollection[irIndex].threshold = threshold;
            }
        )),

        deleteIr: (irId: string, dataId: number) => set(produce(
            (state: State) => {
                const index = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                const irCollection = state.events[index].conditions.irs.irs;
                const irIndex = irCollection.findIndex(ir => ir.irId === irId && ir.dataId === dataId);
                irCollection.splice(irIndex, 1);
            }
        )),

        editIrLogicType: (type: boolean) => set(produce(
            (state: State) => {
                const index = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                state.events[index].conditions.irs.logicType = type;
            }
        )),

        editTaskLogicType: (type: boolean) => set(produce(
            (state: State) => {
                const index = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                state.events[index].conditions.tasks.logicType = type;
            }
        )),

        addTask: (name: string, description: string) => set(produce(
            (state: State) => {
                const eventIndex = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                const task = state.events[eventIndex].conditions.tasks.tasks;
                task.push({
                    taskName: name,
                    taskDesc: description
                });

            }
        )),

        deleteTask: (name: string) => set(produce(
            (state: State) => {
                const eventIndex = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                const task = state.events[eventIndex].conditions.tasks.tasks;
                const taskIndex = task.findIndex(task => task.taskName === name);
                task.splice(taskIndex, 1);
            }
        )),

        //edit Task => add + delete

        addExistingReward: (tagName: string) => set(produce(
            (state: State) => {
                const eventIndex = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                const reward = state.events[eventIndex].tags;
                reward.push({
                    eventNo: state.eventsLayout.currentEvent,
                    ifNew: false,
                    tagName: tagName,
                    userName: state.workflow.userName,
                });
            }
        )),

        addNewReward: (tagName: string) => set(produce(
            (state: State) => {
                const eventIndex = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                const reward = state.events[eventIndex].tags;
                if (!reward.some(tag => tag.tagName === tagName)) reward.push({
                    eventNo: state.eventsLayout.currentEvent,
                    ifNew: true,
                    tagName: tagName,
                    userName: state.workflow.userName,
                });
            }
        )),

        //tagName is unique
        deleteReward: (tagName: string) => set(produce(
            (state: State) => {
                const eventIndex = state.events.findIndex(event => event.eventNo === state.eventsLayout.currentEvent);
                const reward = state.events[eventIndex].tags;
                const rewardIndex = reward.findIndex(reward => reward.tagName === tagName);
                reward.splice(rewardIndex, 1);
            }
        )),
    },

    //workflow Settings
    workflow: {
        effectType: true,
        userName: "user#12345",
        timeValue: Date.now(),
        duration: 1,
        durationType: 0,
        dopId: "0001234",
        workflowName: "",
        classification: []
    },

    workflowUtils: {
        setEffectType: (effectType: boolean) => set(produce((state: State) => {
            state.workflow.effectType = effectType;
        })),

        setTimeValue: (time: number) => set(produce((state: State) => {
            state.workflow.timeValue = time;
        })),

        setDurationType: (durationType: number) => set(produce((state: State) => {
            state.workflow.durationType = durationType;
        })),
        setDuration: (duration: number) => set(produce((state: State) => {
            state.workflow.duration = duration;
        })),

        setWorkflowName: (workflowName: string) => set(produce((state: State) => {
            state.workflow.workflowName = workflowName;
        })),

        addClassification: (classification: string) => set(produce(
            (state: State) => {
                if (state.workflow.classification.indexOf(classification) === -1) state.workflow.classification.push(classification);
            }
        )),

        deleteClassification: (classification: string) => set(produce(
            (state: State) => {
                const index = state.workflow.classification.indexOf(classification);
                if (index !== -1) state.workflow.classification.splice(index, 1);
            }
        )),


        events: [produce(emptyEvent, () => { })],




        resetWorkflow: () => set(produce((state: State) => {
            state.eventsLayout = {
                ...state.eventsLayout,
                events: [
                    {
                        eventNo: 0,
                        position: 1,
                    },
                ],

                eventsLength: 1,
                eventsLastNo: 0,
                currentEvent: 0,
                selectedPosition: null,
                page: 0,
            };

            state.workflow = {
                ...state.workflow,
                effectType: true,
                timeValue: Date.now(),
                duration: 1,
                durationType: 0,
                workflowName: ""
            };

            state.events = [emptyEvent];

        })),

        setWorkflowFromSave: ({ eventsLayout, events, workflow }: {
            eventsLayout: EventsLayout, events: Array<Event_InfoDtoList>, workflow: Workflow_Add
        }) => set(produce((state: State) => {
            state.events = events;
            state.eventsLayout = eventsLayout;
            state.workflow = workflow;
        })),


        checkPublishState: () => {
            const events = get().events;

            const eventNames = events.filter((event: Event_InfoDtoList) => (
                !(event.eventName &&
                    (event.conditions.irs.irs.length + event.conditions.shares.shares.length + event.conditions.tasks.tasks.length))
            )).map((event: Event_InfoDtoList) => ("Event" + event.eventNo))
            if (eventNames.length > 0) {
                return eventNames.join(",");
            } else {
                return false;
            }
        }
    }
}));