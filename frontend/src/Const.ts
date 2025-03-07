export interface FormTy{
    fullName:string;
    email:string;
    password?:string
    profile?:string;
    createdAt?:string;
}

export interface LoginFormTy{
    email:string;
    password:string
}