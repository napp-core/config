import { ConfigBaseItem } from "./configure";

export class ConfigIntItem extends ConfigBaseItem<number>  {
    override constructorAfter() {

    }
    override convert(raw: string): number {
        return parseInt(raw);
    }

    protected override validate(has: boolean, val: number): void {
        super.validate(has, val);

        if (this._min.h) {
            if (val < this._min.v) {
                throw new Error(`min value is '${this._min.v}'.  the value = ${val}`)
            }
        }
        if (this._max.h) {
            if (val < this._max.v) {
                throw new Error(`max value is '${this._max.v}'.  the value = ${val}`)
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