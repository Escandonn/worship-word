# Documentación de WORSHIP WORLD

## Objetivo

WORSHIP WORLD es un videojuego social en desarrollo, inspirado en los mundos
virtuales 2D y ambientado en Tuluá, Valle del Cauca. Esta documentación describe
la arquitectura existente y la estructura espacial de sus salas.

## Estado de desarrollo

- **Fase 1 — Administración de salas:** implementada. `Mundo` crea, registra,
  consulta y elimina instancias `Sala`, `SalaCalle` y `SalaTienda`.
- **Fase 2 — Estructura espacial:** implementada. Cada sala inicializada
  compone un escenario con cuadrícula isométrica, baldosas de suelo y paredes.
- **Fase 3 — Representación gráfica:** implementada. `EscenaSala` conecta el
  escenario con Phaser y `RepresentadorSala` dibuja el suelo y sus paredes.
- **Fase 4 — Navegación y visualización:** implementada. La interfaz genera
  botones desde las salas de `Mundo`, cambia el escenario en una sola instancia
  de Phaser y ajusta la cámara al viewport. Las calles muestran una intersección
  abierta en cruz con calzada, aceras y zonas exteriores.

Las pruebas ejecutables de dimensiones y conversiones espaciales están en
`src/motor/ejemplos/verificarEstructuraEspacial.ts`.
La representación se monta desde el componente Astro `Juego.astro`; no se usa
React porque el proyecto no tiene la integración ni los paquetes de React y las
restricciones de esta fase prohíben instalarlos.

## Estructura general

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
documentacion/
├── arquitectura/
├── decisiones/
└── diagramas/
```

`src/motor/nucleo/` administra el mundo. `src/motor/salas/` contiene la clase
base y sus especializaciones. `src/motor/espacial/` modela la cuadrícula, el
suelo, las baldosas, las paredes y el escenario. `src/motor/tipos/` reúne los
contratos de configuración e información. `src/motor/representacion/` dibuja
los datos espaciales con Phaser sin añadir dependencias de Phaser a `Sala`.
`src/interfaz/` integra la escena y el juego con Astro. La página serializa la
configuración del mundo y el cliente reconstruye sus salas con `Mundo` para
producir la navegación dinámicamente.

## Documentos

- [Arquitectura general](./arquitectura/01-arquitectura-general.md)
- [Estructura de salas](./arquitectura/02-estructura-de-salas.md)
- [Cuadrícula isométrica](./arquitectura/03-cuadricula-isometrica.md)
- [Renderizado con Phaser](./arquitectura/04-renderizado-con-phaser.md)
- [Navegación y visualización de salas](./arquitectura/05-navegacion-y-visualizacion-de-salas.md)
- [Intersección de calle](./arquitectura/06-interseccion-calle.md)
- [Decisiones técnicas](./decisiones/01-decisiones-tecnicas.md)
- [Separación entre modelo y renderizado](./decisiones/02-separacion-modelo-renderizado.md)
- [Selección de sala](./diagramas/05-seleccion-de-sala.mmd)
- [Distribución de calle](./diagramas/06-distribucion-calle.mmd)
- Diagramas Mermaid: `diagramas/`
