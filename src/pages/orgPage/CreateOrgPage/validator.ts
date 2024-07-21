import { Validator } from "./type";

const nameValidator = [{
    func: (word) => /^[\w]*$/.test(word),//包括下划线
    hint: '*Only letters and numbers and spaces are allowed'
}] as Validator[]

export const orgValidator = { nameValidator }