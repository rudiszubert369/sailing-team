
# Segel Team 

[[toc]]

## Dependencies

- Node.js (version >= 12, < 17)
- or install nvm and get the correct version with `nvm use`

## Editorconfig

The Jumpstart comes with an .editorconfig file to keep consistent coding styles for all developers. Please make sure to install the matching plugin for your code editor, e.g. ["EditorConfig for VS Code"](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) to enable it.

## How to start

1. Run command `npm install` to install the dependencies
2. Run command `npm run build` to build the files
3. Setup vhost for the project. Point your root to the `templates/dist` folder so you can directly open the templates in the browser

## Commands

You can use `npm run` to run all the commands.

| Command | Description |
| --- | --- |
| `build` | Build all files |
| `watch` | Watch files |
| `clean:assets` | Remove all built assets in development distribution directories |

For detailed documentation on components, styles, and development practices, see our [Project Documentation](/documentation.md).
