export interface IConfigLoader {
    get(key: string): string;
    has(key:string):boolean;
}

export interface IConfigItem<T> {
    convert: (raw: string, defaut: T) => T;
}