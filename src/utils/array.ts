//使用三等号查找元素并执行更新，如果更新成功，返回元素的下标，否则返回-1

function update<T>(arr: T[], before: T, after: T) {
    for (let i = 0; i < arr.length; i++)
        if (arr[i] === before) {
            arr[i] = after
            return i
        }
    return -1
}

function del<T>(arr: T[], el: T) {
    for (let i = 0; i < arr.length; i++)
        if (arr[i] === el) {
            arr.splice(i, 1)
            return i
        }
    return -1
}

export const ArrayUtil = { update, del }