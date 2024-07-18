import { Designer } from './fetchAllDesigners';

export const handleSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    designers: Designer[],
    setSortKey: React.Dispatch<React.SetStateAction<keyof Designer>>,
    setDesigners: React.Dispatch<React.SetStateAction<Designer[]>>
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
    setDesigners: React.Dispatch<React.SetStateAction<Designer[]>>
) => {
    let order = 'asc';
    const sortedDesigners = [...designers].sort((a, b) => {
        if (a.username < b.username) return order === 'asc' ? -1 : 1;
        if (a.username > b.username) return order === 'asc' ? 1 : -1;
        return 0;
    });
    setDesigners(sortedDesigners);
};
