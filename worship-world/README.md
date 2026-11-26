# WORSHIP WORLD

Proyecto de un mundo social inspirado en Tuluá, Valle del Cauca. La página de
inicio presenta el mundo y sus espacios de ejemplo; el motor de salas se
mantiene independiente de la interfaz.

## Estructura

```text
src/
├── interfaz/
│   ├── EscenaSala.ts
│   ├── Juego.astro
│   └── MenuInicio.astro
├── motor/
│   ├── ejemplos/
│   ├── espacial/
│   ├── nucleo/
│   ├── representacion/
│   ├── salas/
│   └── tipos/
├── layouts/
└── pages/
    └── index.astro
```

`src/pages/index.astro` prepara un mundo de demostración y serializa las salas
registradas para la interfaz. `Juego.astro` crea botones desde ese registro y
mantiene una única instancia de Phaser mientras cambia la sala representada.
`src/motor/` contiene el modelo espacial y `src/interfaz/` integra la escena
Phaser con Astro. La lógica de las salas no depende de Phaser.

Las calles usan un escenario en cruz con calzada, aceras y exterior; las tiendas
conservan el suelo rectangular y sus paredes.

La documentación de arquitectura y los diagramas de las fases implementadas se
encuentran en [`documentacion/`](./documentacion/README.md). La verificación
ejecutable del sistema espacial está en
`src/motor/ejemplos/verificarEstructuraEspacial.ts`.

## Comandos

- `npm run dev`: inicia el servidor local de desarrollo.
- `npm run build`: genera la versión estática del sitio.
- `npm run preview`: previsualiza la versión generada.

Astro se conserva como framework del frontend. La página de inicio usa
componentes Astro y estilos CSS sin añadir dependencias de interfaz.
