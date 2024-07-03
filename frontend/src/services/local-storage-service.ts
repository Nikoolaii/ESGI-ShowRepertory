export default class LocalStorageService {
    static setItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static removeItem(key: string) {
        localStorage.removeItem(key);
    }

    static getItem(key: string) {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        }
        return null;
    }
}