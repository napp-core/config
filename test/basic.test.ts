import { suite, test, } from "@testdeck/mocha";
import assert from 'assert';
import { ConfigureBase } from "../src";
import { Loader } from "./loader";
import { ConfigPortItem } from "../src/item.port";
import { ConfigStringItem } from "../src/item.string";


export class Config1 extends ConfigureBase {

    port = new ConfigPortItem(this, 'port')
        .default(3000)
        .valueOf();


    host = new ConfigStringItem(this, 'host')
        .default('localhost')
        .valueOf();
}


export class Config2 extends ConfigureBase {

    host = new ConfigStringItem(this, 'host')
        .requared()
        .valueOf();
}


@suite
class BasicTest {

    @test
    hi() {

        let conf = new Config1(new Loader({}))
        assert.equal(
            'localhost',
            conf.host,
            'host'
        )
        assert.equal(
            3000,
            conf.port,
            'port'
        )
    }

    @test
    load() {


        let conf = new Config1(new Loader({
            host: '127.0.0.1',
            port: '7788'
        }))
        assert.deepEqual(
            '127.0.0.1',
            conf.host,
            'host'
        )
        assert.deepEqual(
            7788,
            conf.port,
            'port'
        )
    }

    @test
    missed() {

        try {
            let conf = new Config2(new Loader({

            }))

            '' + conf.host


        } catch (error) {

            assert.deepEqual(
                `requared config value: host`,
                (error as any || {}).message
            )


            return

        }


        assert.fail('aldaa zaasangui')


    }





}