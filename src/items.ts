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

