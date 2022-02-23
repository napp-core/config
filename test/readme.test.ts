import { suite, test, } from "@testdeck/mocha";
import assert from "assert";
import { ConfigureBase, configureItem, IConfigLoader, IntItem, StringItem } from "../src";



// config.ts
export class Config extends ConfigureBase {

    @configureItem(new IntItem())
    PORT = 3000;

    @configureItem(new StringItem())
    HOST = 'localhost';
}


export class DBConfig extends ConfigureBase {

    @configureItem(new StringItem(), { requared: true })
    DATABASE = '';

    @configureItem(new StringItem())
    USERNAME = 'root';
}

class envLoader implements IConfigLoader {
    get(key: string): string {
        return process.env[key] || ''
    }
    has(key: string): boolean {
        return key in process.env
    }
}

class fileLoader implements IConfigLoader {

    store: Record<string, string>;
    constructor() {
        // load here file data load
        this.store = {
            // ... sample data,
            PORT: '4000',
            DATABASE: 'testdb', USERNAME: "dbuser"
        }
    }

    get(key: string): string {
        return this.store[key] || ''
    }
    has(key: string): boolean {
        return key in this.store
    }
}

// export const config = new Config(new envLoader())
export const config = new Config(new fileLoader())

// export const db = new DBConfig(new envLoader())
export const db = new DBConfig(new fileLoader())


@suite
class ReadmeTest {
    @test
    config() {
        assert.deepEqual('localhost', config.HOST,'default value')
        assert.deepEqual(4000, config.PORT, 'file store PORT value')
        assert.deepEqual('testdb', db.DATABASE, 'file store DATABASE value')
        assert.deepEqual('dbuser', db.USERNAME, 'file store USERNAME value')
    }
}