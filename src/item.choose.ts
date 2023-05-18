import { ConfigBaseItem } from "./configure";

export class ConfigChooseItem<T> extends ConfigBaseItem<T>  {
    override convert(raw: string): T {
        return raw as T;
    }

    protected override validate(has: boolean, val: T): void {

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

    private _items: Array<T> | null = null;
    allowed(items: Array<T>) {
        this._items = items;
    }

}