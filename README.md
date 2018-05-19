# webasm-binder
The webasm binding decorators gives you the possibility to bind webasm Module Functions to Typescript class functions,
by resolving them using "fetch" (for using it in frontend projects) or via "fs" ( used in backend Projects )
# How to run the demo ?
Move the "Demo.wasm" from source/demo/ to dist/demo and run "npm run demo"
# decorator parameters
> Class Decorator 

The class parameter ( getWebasmModuleFromClassName ) resolves a webasm module by classname and the in parameter one
specified Location. 

Parameter two ( of type EModuleResolutionType ( require or fetch ) describes how to resolve
the module.

So the module name needs to have the same name as the class. i.e class Demo would need a "Demo.wasm" file!
> Function Decorator

Since i haven't found any possibility to get the parent class name of a method at runtime,
The function decorator takes in one Parameter of type string ( moduleName ) which needs again to be the same 
as the Classname of the Class where the function is declared in.

The Decorator will execute the Method from the module on class Method ussage,
by resolving it from the module by using the name of the method in your class.
So when your function is called "add" within your typescript class, it will execute "add" from your wasm module!
