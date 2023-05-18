import { ConfigBaseItem } from "./configure";

export class ConfigBooleanItem extends ConfigBaseItem<boolean>  {
    override convert(raw: string): boolean {
        let v = ('' + raw).toLowerCase();
        if (v === 'ok' || v === 'on' || v === '1' || v === 'true' || v === 'yes') {
            return true;
        }
        if (v === 'no' || v === 'off' || v === '0' || v === 'false') {
            return false;
        }
        throw new Error('not supported boolean value. suppoted true = (ok,on,true,yes,1); false = (no, off,0,false)')
    }

}