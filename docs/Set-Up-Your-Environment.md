To develop an OpenFn adaptor, set up your environment with these tools:

Refer to the wiki: [Creating a New Adaptor](https://github.com/OpenFn/adaptors/wiki/Creating-a-new-Adaptor)

### Prerequisites

1. **IDE (e.g., VS Code)**
   - Recommended for JavaScript/Node.js development.
   - Extensions: Prettier (formatting), ESLint (linting).

2. **asdf (Package Manager)**
   - Manages dependencies in the adaptor repository.
   - To install asdf, refer to the official [asdf installation guide](https://asdf-vm.com/guide/getting-started.html)
   - Verify the installation:

```bash
asdf version
```

3. **Node.js and pnpm**
   - Node.js runs JavaScript adaptors.
   - pnpm handles dependencies.
   - The adaptor monorepo includes a `.tool-versions` file that specifies the required versions of Node.js and pnpm.
   - First-time users should add the necessary plugins to asdf before installing the versions specified in `.tool-versions`:

```bash
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf plugin add pnpm https://github.com/jonathanmorley/asdf-pnpm.git

# Install the required versions from .tool-versions
asdf install
```

4. **Install the OpenFn CLI**

To install, use the following command:
```bash
npm install -g @openfn/cli
```
For more information, run `openfn --help`.

***

Follow these steps to prepare your environment for adaptor development.