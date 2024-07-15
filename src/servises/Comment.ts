import {Designer} from "./Designer.ts";

export interface Comment {
    id: number;
    issue: string;
    designer: Designer;
    date_created: string;
    message: string;
}
