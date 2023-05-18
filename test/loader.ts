import { IConfigLoader } from "../src";



export class Loader implements IConfigLoader {

    private _store:Record<string,string> = {};

    constructor(store:Record<string,string>){
        this._store = store;
    }

    get(key: string): string {
        return this._store[key]
    }
    has(key: string): boolean {
        return key in this._store
    }

    setStore(store:Record<string,string>) {
        this._store = store;
    }

    getStore() {
        return this._store ;
    }

} 




