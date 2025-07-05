import {Request} from 'express'

export interface customRequest extends Request {
    id? :string|object ;
    link?:string;
    share?:boolean;
}