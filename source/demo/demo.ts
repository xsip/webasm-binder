import {
    getFunctionFromAsmModule, EModuleResolutionType,
    getWebasmModuleFromClassName
} from "../decorators/webasm-binder.decorators";

@getWebasmModuleFromClassName(`${process.cwd()}/dist/demo/`, EModuleResolutionType.require)
export class Demo {
    private static _name: string = 'Demo';

    constructor() {
        console.log('[Demo] crated instance');
    }

    @getFunctionFromAsmModule(Demo._name)
    public add(first: number, second: number): any {};

}

const instance: Demo = new Demo();
let res: number = instance.add(4,4);

console.log(res); /*result => 8*/


