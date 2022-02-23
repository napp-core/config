import { suite, test, } from "@testdeck/mocha";
import assert from 'assert';
import { ConfigureBase, configureItem, IntItem, StringItem } from "../src";
import { Loader } from "./loader";


export class Config1 extends ConfigureBase {

    @configureItem(new IntItem())
    port = 3000;

    @configureItem(new StringItem())
    host = 'localhost';
}


export class Config2 extends ConfigureBase {

    @configureItem(new StringItem(), { requared: true })
    host: string='';
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

            ''+conf.host

            
        } catch (error) {

            assert.deepEqual(
                `Config property missing. propertyName="host"`,
                (error as any || {}).message
            )


            return

        }


        assert.fail('aldaa zaasangui')


    }





}