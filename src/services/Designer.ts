export interface Designer {
    avatar: string;
    username: string;
    thumbnails: Record<string, any>;
    email: string;
    issues: { key: string; status: string }[];
}

export interface Project {
    key: string;
    name: string;
}
