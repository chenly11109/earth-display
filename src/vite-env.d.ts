/// <reference types="vite/client" />
declare type Override<P, S> = Omit<S, keyof P> & P
//升级：可以组合自定义组件的props和新组件的props
declare type FunctionComponentProps<S, T> = Override<S, React.HTMLAttributes<T>> & {
    //children?: React.ReactNode children应该自己显式定义
    //directives?: ((Ref: React.MutableRefObject<T>) => void)[]//根据hooks规则，directives不可改变否则会有严重异常。
    Ref?: React.MutableRefObject<T>
}