import { suite, test, } from "@testdeck/mocha";
import assert from "assert";
import { ConfigureBase, IConfigLoader } from "../src";
import { ConfigPortItem } from "../src/item.port";
import { ConfigStringItem } from "../src/item.string";



// config.ts
export class Config extends ConfigureBase {
    PORT = new ConfigPortItem(this, 'PORT')
        .default(3000)
        .valueOf();

    HOST = new ConfigStringItem(this, 'HOST')
        .default('localhost')
        .valueOf();
}


export class DBConfig extends ConfigureBase {

    DATABASE = new ConfigStringItem(this, 'DATABASE')
        .requared()
        .valueOf();



    USERNAME = new ConfigStringItem(this, 'USERNAME')
        .default('root')
        .valueOf();
}

class EnvLoader implements IConfigLoader {
    get(key: string): string {
        return process.env[key] || ''
    }
    has(key: string): boolean {
        return key in process.env
    }
}

// test process fill
process.env['PORT'] = '4000'
process.env['DATABASE'] = 'testdb'
process.env['USERNAME'] = 'dbuser'


const loader = new EnvLoader();

export const config = new Config(loader)
export const db = new DBConfig(loader)

@suite
class ReadmeTest {
    @test
    config() {
        assert.deepEqual('localhost', config.HOST, 'default value')
        assert.deepEqual(4000, config.PORT, 'file store PORT value')
        assert.deepEqual('testdb', db.DATABASE, 'file store DATABASE value')
        assert.deepEqual('dbuser', db.USERNAME, 'file store USERNAME value')
    }
}