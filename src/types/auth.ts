export  interface createUserField{
    email: string
    username: string
    password: string
    id?: number
}
export  interface AuthReqField{
    username: string
    password: string

}
export interface IAuth {
    refresh: string
    access: string
}
export  interface AuthResField{
    data: IAuth
    
}
