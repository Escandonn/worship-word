# Arquitectura general

## Organización

La lógica del juego está en `src/motor/` y la página de inicio en
`src/interfaz/` y `src/pages/`. Astro entrega la interfaz, pero no es responsable
de administrar el estado espacial ni de dibujar las salas.

### Mundo

`Mundo` conserva un registro privado de salas. `crearSala()` valida la
configuración, selecciona `SalaCalle` o `SalaTienda`, solicita a esa sala que se
inicialice y solo entonces la registra. El mundo no crea ni conoce los
componentes internos del escenario.

### Salas

`Sala` es abstracta y contiene el estado común: identificador, nombre,
dimensiones lógicas, jugadores y elementos. `SalaCalle` y `SalaTienda` heredan
ese comportamiento. Al inicializarse, `Sala` crea y prepara su propio
`EscenarioSala`.

### Modelo espacial

`EscenarioSala` compone una `CuadriculaIsometrica`, un `Suelo` y cuatro `Pared`.
`Suelo` administra objetos `Baldosa` indexados por coordenadas de cuadrícula.
La cuadrícula convierte las coordenadas lógicas a posiciones en píxeles y
viceversa; no representa ni dibuja gráficos.

### Renderizado e interfaz

`src/pages/index.astro` crea un mundo de demostración y serializa las salas
registradas. `src/interfaz/Juego.astro` reconstruye el modelo con `Mundo`, crea
un botón por cada sala y monta una única instancia de `Phaser.Game`.

`EscenaSala` adapta el ciclo de vida de Phaser al modelo: recibe una `Sala`,
obtiene su escenario, crea `RepresentadorSala` y calcula un zoom uniforme para
centrar el escenario. Al seleccionar otra sala reutiliza escena y juego,
destruye el renderizador previo y representa el nuevo escenario. `Phaser.Scale`
redimensiona el lienzo con el viewport. Ni `Mundo` ni `Sala` dependen de Phaser.
El script Astro evita montajes duplicados y destruye el juego al abandonar la
página.

Las salas calle tienen una distribución lógica en cruz y clasifican las celdas
como calzada, acera o exterior. La calle no genera paredes perimetrales; las
salas tienda conservan el escenario rectangular cerrado.

## Relaciones

- **Herencia:** `SalaCalle` y `SalaTienda` extienden `Sala`.
- **Composición:** `Sala` crea su `EscenarioSala`; el escenario crea y administra
  su suelo y sus paredes; el suelo compone y administra sus baldosas.
- **Uso:** `EscenarioSala` consulta la cuadrícula para disponer de sus
  conversiones, pero la cuadrícula no depende del escenario.

El diagrama exacto de clases y sus multiplicidades se encuentra en
[`../diagramas/01-diagrama-clases.mmd`](../diagramas/01-diagrama-clases.mmd).
