import {getFunctionFromAsmModule, EModuleResolutionType, getWebasmModuleFromClassName} from "../decorators/webasm-binder.decorators";

@getWebasmModuleFromClassName(`${process.cwd()}/dist/demo/`, EModuleResolutionType.require)
export class Demo {
    private static _name: string = 'Demo';

    constructor() {
        console.log('[Demo] crated instance');
    }

    @getFunctionFromAsmModule(Demo._name)
    public add(first: number, second: number): any {};

}

@getWebasmModuleFromClassName(`${process.cwd()}/dist/demo/`, EModuleResolutionType.require)
export class Demo2 {
    private static _name: string = 'Demo2';

    constructor() {
        console.log('[Demo2] crated instance');
    }

    @getFunctionFromAsmModule(Demo2._name)
    public add(first: number, second: number): any {};

}

const instance: Demo = new Demo();
let res: number = instance.add(4,4);
console.log(res); /*result => 8*/
const instance2: Demo2 = new Demo2();
let res2: number = instance2.add(4,5);
console.log(res2); /*result => 8*/



