export interface IConfigLoader {
    get(key: string): string;
    has(key:string):boolean;
}


const _loader = Symbol.for('__my-napp-loader')
export class ConfigureBase {
    private [_loader] = {} as IConfigLoader;
    constructor(loader: IConfigLoader) {
        this[_loader] = loader;
    }
}

export class ConfigBaseItem<T> {
    private _default: { v?: T, h: boolean } = {
        h: false
    };
    private _requared = false;

    constructor(private conf: ConfigureBase, private kname: string) { }

    constructorAfter() { }

    default(v: T) {
        this._default = { h: true, v }
        return this;
    }
    requared() {
        this._requared = true
        return this;
    }



    protected getLoader() {
        return this.conf[_loader]
    }
    protected getRequared() {
        return this._requared;
    }

    convert(raw: string): T {
        throw new Error('requared overrite')
    }

    protected validate(has: boolean, val: T) {
        if (this._requared && has === false) {
            throw new Error(`requared config value: ${this.kname}`)
        }
    }
    valueOf(): T {
        let loader = this.getLoader();
        let has = loader.has(this.kname);
        if (has) {
            let raw = loader.get(this.kname);
            let val = this.convert(raw);
            this.validate(true, val);
            return val
        }


        if (this._default.h) {
            let val = this._default.v as T;
            this.validate(false, val);
            return val
        }
        if (this._requared) {
            throw new Error(`requared config value: ${this.kname}`)
        }

        return this._default.v as T
    }

}



