import { ConfigBaseItem } from "./configure";

export class ConfigStringItem extends ConfigBaseItem<string>  {
    override convert(raw: string): string {
        return raw || '';
    }

    protected override validate(has: boolean, val: string): void {
        super.validate(has, val);

        if (this._min.h) {
            if (val && val.length < this._min.v) {
                throw new Error(`min length is '${this._min.v}'.  the length = ${val.length}`)
            }
        }
        if (this._max.h) {
            if (val && val.length < this._max.v) {
                throw new Error(`max length is '${this._max.v}'.  the length = ${val.length}`)
            }
        }
    }



    private _min = {
        h: false,
        v: 0
    }
    private _max = {
        h: false,
        v: 0
    }
    min(v: number) {
        this._min = { h: true, v }
        return this
    }
    max(v: number) {
        this._max = { h: true, v }
        return this
    }
}