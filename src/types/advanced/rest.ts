type Rest<T extends any[]> = T extends [infer _R, ...infer P] ? P : never

export type {
    Rest
}