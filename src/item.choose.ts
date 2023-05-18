import { ConfigBaseItem } from "./configure";

export class ConfigChooseItem extends ConfigBaseItem<string>  {
    override convert(raw: string): string {
        return raw as string;
    }

    protected override validate(has: boolean, val: string): void {

        if (this._items) {
            for (let it of this._items) {
                if (it === val) {
                    return;
                }
            }
            throw new Error('not allowed value. allowed values :' + this._items.join('; '))
        }

        throw new Error('not defined allowed values. you call need "allowed" method ')
    }

    private _items: Array<string> | null = null;
    allowed(items: Array<string>) {
        this._items = items;
    }

}