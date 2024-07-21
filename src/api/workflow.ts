
import { service } from "./service";
import useSWR from "swr";


function getData(url: string) {
    return service.get(url).then((res) => {

        const workflowTemps = (res && res.data.data) || [
            {
                engagementCount: 0,
                events: 0,
                favorite: true,
                lastTime: 0,
                published: 0,
                workflowId: "123",
                workflowName: "temp workflow",
            },
        ]

        return workflowTemps;
    }).catch(err => {
        return err
    })
}
export function useWorkflowTemps(index: number) {
    const type = (index + 1).toString();
    const { data } = useSWR(`/community/workflow/search/template/${type}`, getData);
    return { workflowTemps: data }
}


export function useMyWorkflow(groupId: string) {
    if (groupId === "-1") {
        const { data } = useSWR(`/community/workflow/search/my/0/`, getData);
        return { myWorkflows: data }
    } else {
        const { data } = useSWR(`/community/workflow/search/my/${groupId}/`, getData);
        return { myWorkflows: data }
    }
}

export function useWorkflowView(workflowId: string) {
    const { data } = useSWR(`/community/workflow/view/${workflowId}`, getData);
    return { workflowView: data }
}

export function useIrfromDopId(dopId: string) {
    const { data } = useSWR(`/community/event/query/list/ir/${dopId}`, getData);
    return { systems: data };
}