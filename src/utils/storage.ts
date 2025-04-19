export const setToLocalStorage = <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = <T>(key: string): T | undefined => {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : undefined;
};

export const removeFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
};
