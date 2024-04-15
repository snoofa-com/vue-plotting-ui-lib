# VueJS Plotting UI Library

## Introduction

A plotting UI component made using VueJS.

## ⚡ Quick Start

Getting started with VueJS Plotting UI Library is easy. To add to your project, choose your package manager and run one of the following commands:

Using [npm](https://npmjs.com/)

```bash
npm install vue-plotting-ui-lib
```

Using [yarn](https://yarnpkg.com/)

```bash
yarn add vue-plotting-ui-lib
```

Using [pnpm](https://pnpm.io/)

```bash
pnpm add vue-plotting-ui-lib
```

Using [bun](https://bun.sh/)

```bash
bun add vue-plotting-ui-lib
```

## Usage

1. Import the component and its style

    ```ts
    import PointPlacer from 'vue-plotting-ui-lib'
    import "vue-plotting-ui-lib/style.css"
    ```

2. Use it

    ```tsx
    <PointPlacer image-source="https://furtadosbeta.gumlet.io/media/catalog/product/2/0/208079_1_1.jpg"
        :measurements="measurements" :on-save-click="(lines) => console.log(lines)" />
    ```
