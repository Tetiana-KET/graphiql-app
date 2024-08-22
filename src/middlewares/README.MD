**Later, when we'll be implementing middleware for history, I guess it will be correct to make separate files and then combine them. This file will be deleted later.**

#### Convention

Use the file middleware.ts (or .js) in the root of your project to define Middleware. For example, at the same level as pages or app, or inside src if applicable.

Note: While only one middleware.ts file is supported per project, you can still organize your middleware logic modularly. Break out middleware functionalities into separate .ts or .js files and import them into your main middleware.ts file. This allows for cleaner management of route-specific middleware, aggregated in the middleware.ts for centralized control. By enforcing a single middleware file, it simplifies configuration, prevents potential conflicts, and optimizes performance by avoiding multiple middleware layers.
