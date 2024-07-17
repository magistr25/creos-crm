import { Designer } from './fetchAllDesigners';

export const handleSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    designers: Designer[],
    setSortKey: React.Dispatch<React.SetStateAction<keyof Designer>>,
    setDesigners: React.Dispatch<React.SetStateAction<Designer[]>>,
    sortOrder: string,
    setSortOrder: React.Dispatch<React.SetStateAction<string>>
) => {
    const key = event.target.value as keyof Designer;
    setSortKey(key);
    let order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(order);

    const sortedDesigners = [...designers].sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
    });

    setDesigners(sortedDesigners);
};

