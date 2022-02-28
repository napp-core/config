import { IConfigItem } from "./common"

export class IntItem implements IConfigItem<number> {
    convert(raw: string, defaut: number) {
        try {
            if (raw) {
                return parseInt(raw)
            }
        } catch (error) {

        }
        return defaut
    }
}

export class StringItem implements IConfigItem<string> {
    convert(raw: string, defaut: string) {
        return ('' + raw) || defaut || '';
    }
}

export class ChooseItem implements IConfigItem<string> {
    constructor(private allowed:string[]) {

    }
    convert(raw: string, defaut: string) {
        let v = ('' + raw) || defaut || '';
        if(this.allowed.includes(v) ) {
            return v;
        }
        throw new Error('not allowed value. allowed values :' + this.allowed.join('; ') )
    }
}

export class BooleanItem implements IConfigItem<boolean> {
    convert(raw: string, defaut: boolean) {
        let v = ('' + raw).toLowerCase();
        if (v === 'ok' || v === 'on' || v === '1' || v === 'true' || v === 'yes') {
            return true;
        }

        if (v === 'no' || v === 'off' || v === '0' || v === 'false') {
            return false;
        }
        return defaut;
    }
}