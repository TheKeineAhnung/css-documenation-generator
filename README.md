# css-documenation-generator

![Licence](https://img.shields.io/badge/License-CC--BY--3.0-yellow.svg?style=flat-square) ![Version](https://img.shields.io/github/package-json/v/thekeineahnung/css-documenation-generator/main?style=flat-square&label=Version) ![build status](https://img.shields.io/github/workflow/status/thekeineahnung/css-documenation-generator/Test%20build?label=Build&style=flat-square) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

css-documenation-generator is a tool that automatically generates documentation for CSS files based on the code in the css file. It is written in TypeScript. Please take a look to the [licence](https://github.com/TheKeineAhnung/resi-script-manager/blob/main/LICENCE.md) before using it.

## Prerequisites

This project requires NodeJS (version >= 14.0.0) and NPM. [NodeJS](https://nodejs.org/) and [NPM](https://www.npmjs.com/) are very easy to install. To make sure you have them available, you can try running the following command:

```
npm -v && node -v
```

## Installation

```
npm install css-documenation-generator
```

## Quick start

After installation you can import the package with in your JavaScript or TypeScript file:

```
import { generateCssDocs } from 'css-documenation-generator/build/lib/cssDocumentationGenerator';
```

To generate the documentation you can use the following function:

```
generateCssDocs(inputPaths: string[], outputPath: string)
```

The inputPaths parameter is an array of paths to the CSS files you want to generate the documentation for. The outputPath parameter is the path to the directory where the documentation will be saved. Both need to be absolute paths.

The function returns a [StatusObject](https://github.com/TheKeineAhnung/css-documenation-generator/blob/main/lib/types/StatusObject.ts) which contains the following properties:

```
status: Status
message?: string
```

You can find information about the `Status` type [here](https://github.com/TheKeineAhnung/css-documenation-generator/blob/main/lib/types/Status.ts)

### Commands

- `npm run dev`: Starts the TypeScript compiler in watch mode.
- `npm run build`: Starts the TypeScript compiler in build mode.

## Bug reports

Have you found a bug? Please open an [issue](https://github.com/TheKeineAhnung/css-documenation-generator/issues/new).

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA--4.0-yellow.svg?style=flat-square
