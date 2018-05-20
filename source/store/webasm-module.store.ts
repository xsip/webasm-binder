interface IRequestedData {
    module: string;
    method: string;
}
export class WebAsmInstanceStore {

    private static moduleInstance: any = [];
    private static moduleLocation: any = [];
    private static lastRequestedData: IRequestedData = {} as IRequestedData;
    private static info(data: any): void {
        console.info(`[WebASMInstanceStore] ${data}`);
    }

    public static addModuleInstanceToStore(moduleName: string, instance: any, overrideExistingInstance?: boolean): void {

        const instanceExists: boolean = WebAsmInstanceStore.moduleHasInstance(moduleName);

        if (!instanceExists || overrideExistingInstance) {
            WebAsmInstanceStore.moduleInstance[moduleName] = instance;
            if (overrideExistingInstance) {
                WebAsmInstanceStore.info(`overriden current module instance for ${moduleName}`);
            }
        } else if (instanceExists) {
            WebAsmInstanceStore.info(`instance for  ${moduleName} is allready available!`);
            WebAsmInstanceStore.info(`instance => ${WebAsmInstanceStore.getModuleInstanceByName(moduleName) }`);
        }

    }

    public static setFileLocationOrUrlForModule(
        moduleName: string, location: string, overrideExistingInstance?: boolean): void {

        const modulePathSet: boolean = WebAsmInstanceStore.modulePathOrUrlSet(moduleName);

        if (!modulePathSet || overrideExistingInstance) {
            WebAsmInstanceStore.moduleLocation[moduleName] = location;
            if (overrideExistingInstance) {
                WebAsmInstanceStore.info(`overriden current path for ${moduleName}`);
            }

        } else if (modulePathSet) {
            WebAsmInstanceStore.info(`modulepath for ${moduleName} is allready set!`);
        }

    }

    public static getModuleMethod(moduleName: string, methodName: string): Function {
        const moduleInstance: WebAssembly.Instance = WebAsmInstanceStore.getModuleInstanceByName(moduleName);
        WebAsmInstanceStore.lastRequestedData = {method: methodName, module: moduleName};
        return moduleInstance ? moduleInstance.exports[<any>methodName] : WebAsmInstanceStore.fallbackFunction;
    }
    public static fallbackFunction(...args: any[]): any {

        console.log(
            `${WebAsmInstanceStore.lastRequestedData.method} is not resolvable since the module ${
                WebAsmInstanceStore.lastRequestedData.module} is not available or the instance has not been created!`);

        console.log('Provided Parameters =>');
        console.log(args);

        return undefined;
    }
    public static getModuleInstanceByName = (moduleName: string): WebAssembly.Instance | undefined =>
        WebAsmInstanceStore.moduleInstance[moduleName];

    public static getModulePathOrUrlByName = (moduleName: string): WebAssembly.Instance | undefined =>
        WebAsmInstanceStore.moduleLocation[moduleName];

    public static moduleHasInstance = (moduleName: string): boolean =>
        WebAsmInstanceStore.getModuleInstanceByName(moduleName) !== undefined;

    public static modulePathOrUrlSet = (moduleName: string): boolean =>
        WebAsmInstanceStore.getModulePathOrUrlByName(moduleName) !== undefined;
}