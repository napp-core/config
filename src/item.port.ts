import { ConfigIntItem } from "./item.int";

export class ConfigPortItem extends ConfigIntItem {

    override constructorAfter() {
        this.min(3000)
        this.max(10000)
    };

}