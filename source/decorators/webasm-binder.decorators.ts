import * as fs from 'fs';

export enum EModuleResolutionType {
    require,
    fetch
}

export class AsmInstanceStore {
    public static instanceFor: any = [];
    public static asmModuleLocation: any = [];
}
/* the name of the registerd*/
export const getWebasmModuleFromClassName =
    (resolveLocation: string, resolutionType: EModuleResolutionType) => (target: any) => {

        if (resolutionType === EModuleResolutionType.require) {
            AsmInstanceStore.asmModuleLocation[target.name] = resolveLocation;
            const buf: any = fs.readFileSync(`${process.cwd()}/dist/demo/${target.name}.wasm`);
            const wasmModule: any = new WebAssembly.Module(new Uint8Array(buf));
            AsmInstanceStore.instanceFor[target.name] = new WebAssembly.Instance(wasmModule);
        } else {
            const fetchPromise = fetch(`assets/modules${target.name}.wasm`);
            AsmInstanceStore.instanceFor[target.name] = WebAssembly.instantiate(fetchPromise);
        }

    };

export const getFunctionFromAsmModule = (moduleName: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = (...args: any[]) => AsmInstanceStore.instanceFor[moduleName].exports[propertyKey](...args);
    return descriptor;
};