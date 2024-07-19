import {Designer} from "./Designer.ts";

export interface Comment {
    id: string;
    issue: string;
    designer: Designer;
    date_created: string;
    message: string;
}

export interface CommentsProps {
    onLoad: () => void;
}
