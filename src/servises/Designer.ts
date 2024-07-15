export interface Designer {
    avatar: string;
    username: string;
    thumbnails: Record<string, any>;
}

export interface DesignerResponse {
    results: Designer[];
    next: string | null;
}
