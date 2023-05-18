import { ConfigBaseItem } from "./configure";
import { readFileSync } from "fs";

export class ConfigFileItem extends ConfigBaseItem<string>  {
    override convert(raw: string): string {
        let filename = raw || '';
        try {
            return readFileSync(filename).toString()
        } catch (error) {
            console.log(error)
            throw new Error(`cannot read file. filename="${filename}"`)
        }
    }

}