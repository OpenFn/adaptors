If you're working from a github repo you won't get code-completion in VSC.

One day we'll create a VSC plugin to enable this seamlessly. But in the meantime, you can do it with this one weird trick:

* Install an adaptor globally
  * `npm -g install @openfn/language-commcare`
  * run this from your project folder to avoid asdf issues
* Get the path to the global installation
  * `npm -g list`
* Go to your project's github
* Create a `jsconfig.json` in root (you should probably gitignore it)
* Paste this into `jsconfig.json`:
```
{
  "compilerOptions": {
    "paths": {
      "@openfn/*": ["<your global root>/node_modules/@openfn/*"]
    }
  } 
}
```
* In your job code, explicitly import the adaptor functions you need (this is safe but redundant in lightning)
```
import { fetchReportData } from '@openfn/language-commcare'
```
* ta-da :tada: 

![image](https://github.com/user-attachments/assets/67bb9f9e-c59d-4a14-8701-ba2c65ec7905)

You can do this with the monorepo too - but you'll need to individually map your packages (`*` won't work because the folder structure is different). Like this:

```
{
  "compilerOptions": {
    "paths": {
      "@openfn/language-commcare": ["~/repo/openfn/adaptors/packages/commcare"]
    }
  } 
}
```
The adaptor will need to be built, obviously.