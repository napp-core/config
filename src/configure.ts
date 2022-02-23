import { IConfigItem, IConfigLoader } from "./common";


const _key = Symbol.for('__my-napp-config')
const _val = Symbol.for('__my-napp-config-val')
export class ConfigureBase {

    private [_key] = _val;
    constructor(public loader: IConfigLoader) {

    }

}

export interface OConfigureItem {
    requared?: boolean
}

export function configureItem(item: IConfigItem<any>, opt?: OConfigureItem): PropertyDecorator {
    return function (target: object, propertyKey: string | symbol) {

        if (typeof propertyKey === 'string') {
            const $ = {
                val: undefined as any
            }



            Object.defineProperty(target, propertyKey, {
                get() {
                    let me = (this as ConfigureBase);
                    if (me && me[_key] === _val) {
                        ;
                    } else {
                        throw new Error('not support napp conig')
                    }
                    if (typeof propertyKey === 'string') {
                        let has = me.loader.has(propertyKey);
                        if (has) {
                            let v = me.loader.get(propertyKey);
                            return item.convert(v, $.val);
                        } else {
                            if (opt?.requared === true) {
                                throw new Error(`Config property missing. propertyName="${propertyKey}"`)
                            }
                        }
                    }
                    return $.val
                },
                set(value) { $.val = value },
                configurable: false,
                enumerable: false,
            });
        }
    }
}

