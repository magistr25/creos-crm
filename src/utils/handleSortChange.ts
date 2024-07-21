import { Designer, Project } from '../services/Designer';
import React from "react";


export const handleSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    designers: Designer[],
    setSortKey: (key: keyof Designer) => void,
    setDesigners: (designers: Designer[]) => void
) => {
    const key = event.target.value as keyof Designer;
    setSortKey(key);
    let order = 'asc';

    const sortedDesigners = [...designers].sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
    });

    setDesigners(sortedDesigners);
};

export const handleSortChangeDefault = (
    designers: Designer[],
    setDesigners: (designers: Designer[]) => void
) => {
    let order = 'asc';
    const sortedDesigners = [...designers].sort((a, b) => {
        if (a.username < b.username) return order === 'asc' ? -1 : 1;
        if (a.username > b.username) return order === 'asc' ? 1 : -1;
        return 0;
    });
    setDesigners(sortedDesigners);
};

export const handleSortChangeDefaultProjects = (
    projects: Project[],
    setProjects: (projects: Project[]) => void
) => {
    let order = 'asc';
    const sortedProjects = [...projects].sort((a, b) => {
        if (a.name < b.name) return order === 'asc' ? -1 : 1;
        if (a.name > b.name) return order === 'asc' ? 1 : -1;
        return 0;
    });
    setProjects(sortedProjects);
};
