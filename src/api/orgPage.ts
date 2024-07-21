import useSWR from "swr";
import { service } from "./service";

export function getUserList(url: string, userName: string) {
    if (!userName) return []
    return service
        .get<{ userId: string, userName: string }[]>(url, {
            params: { userName }
        })
        .then(res => {
            //搜索组件需要一个唯一的objectID
            return res.data.map(v => {
                return {
                    ...v,
                    objectID: v.userId,
                    content: v.userName,
                }
            })
        })
}
export function useUserList(username: string) {
    const res = useSWR(['/community/organization/userList', username], getUserList)
    return res
}
