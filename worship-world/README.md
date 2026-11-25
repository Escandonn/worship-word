# WORSHIP WORLD

Proyecto de un mundo social inspirado en Tuluá, Valle del Cauca. La página de
inicio presenta el mundo y sus espacios de ejemplo; el motor de salas se
mantiene independiente de la interfaz.

## Estructura

```text
src/
├── interfaz/
│   └── MenuInicio.astro
├── motor/
│   ├── ejemplos/
│   ├── nucleo/
│   ├── salas/
│   └── tipos/
├── layouts/
└── pages/
    └── index.astro
```

`src/pages/index.astro` prepara un mundo de demostración y entrega su
información al menú. `src/motor/` contiene las clases para administrar salas;
`src/interfaz/` se encarga de representarlas en la página.

## Comandos

- `npm run dev`: inicia el servidor local de desarrollo.
- `npm run build`: genera la versión estática del sitio.
- `npm run preview`: previsualiza la versión generada.

Astro se conserva como framework del frontend. La página de inicio usa
componentes Astro y estilos CSS sin añadir dependencias de interfaz.
