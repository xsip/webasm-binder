import * as fs from 'fs';
import {WebAsmInstanceStore} from "../store/webasm-module.store";

export enum EModuleResolutionType {
    require,
    fetch
}

export const getWebasmModuleFromClassName =
    (resolveLocation: string, resolutionType: EModuleResolutionType) => (target: any) => {

        if (!WebAsmInstanceStore.modulePathOrUrlSet(target.name)) {
            WebAsmInstanceStore.setFileLocationOrUrlForModule(target.name, resolveLocation);
        }
        if (!WebAsmInstanceStore.moduleHasInstance(target.name)) {
            if (resolutionType === EModuleResolutionType.require) {
                try {
                const buf: any = fs.readFileSync(`${resolveLocation}/${target.name}.wasm`);
                const wasmModule: any = new WebAssembly.Module(new Uint8Array(buf));
                WebAsmInstanceStore.addModuleInstanceToStore(target.name, new WebAssembly.Instance(wasmModule));
                } catch (e) {
                    console.info(`can not resolve webasm module ${target.name}.wasm`);
                    console.log(e);
                }

            } else {

                const fetchPromise = fetch(`${resolveLocation}/${target.name}.wasm`);
                WebAsmInstanceStore.addModuleInstanceToStore(target.name, WebAssembly.instantiate(fetchPromise));
            }
        } else {

        }
    };

export const getFunctionFromAsmModule = (moduleName: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = (...args: any[]) => WebAsmInstanceStore.getModuleMethod(moduleName,propertyKey)(...args);
    return descriptor;
};