### Visual Studio Code Marketplace

[ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

[vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)

[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Chrome

[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related)

### [Create React App](https://create-react-app.dev/)

`npx create-react-app <name> --template typescript`

### Package

Router

`npm install --save react-router react-router-dom`

Redux

`npm install --save redux react-redux @types/react-redux @reduxjs/toolkit`

Zustand

`npm install --save zustand`

AXIOS

`npm install --save axios`

File Saver (ajax download)

`npm install file-saver @types/file-saver --save`

node-sass

`npm install --save-dev node-sass`

[immer](https://immerjs.github.io/immer/)

`npm install --save immer`

Eslint

`npm install --save-dev eslint eslint-config-prettier eslint-plugin-prettier`

Prettier

`npm install --save-dev prettier`

### UI

[MUI](https://mui.com/)

`npm install @mui/material @emotion/react @emotion/styled @mui/icons-material`

`npm install @mui/x-date-pickers`

`npm install moment`

`npm install dayjs`

[Customization](https://mui.com/zh/material-ui/customization/theming/)

### Test

[react-testing-library](https://github.com/testing-library/react-testing-library)

[axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter)

`npm install --save-dev axios-mock-adapter`

### Self Certification

[Install Chocolatey with PowerShell](https://docs.chocolatey.org/en-us/choco/setup)

`choco --version`

`choco install mkcert`

`mkcert -install`

`mkcert -help`

`mkcert localhost 127.0.0.1 ::1`

### Architecture

- asserts
  - \[name\].\[png|svg|css\]
- components
  - \[name\]
    - index.tsx
    - style.ts 
- hooks
  - \[name\].ts
- pages
  - \[parent\]
    - \[child\]
	    - index.tsx
	    - model.ts
	    - context.ts 
	    - \[name\]
	      - index.tsx
	      - style.ts
- routes
  - \[name\]
    - index.tsx
- services
  - \[name\]
    - index.ts
    - dto.ts
- stores
  - \[name\]
    - index.ts
    - state.ts
  - page
    - \[parent\]
      - \[child\]
        - index.ts
        - state.ts
- styles
  - \[name\].ts
- utils
  - \[name\].ts
