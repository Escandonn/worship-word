# Renderizado de salas con Phaser

## Flujo y responsabilidades

`src/pages/index.astro` registra las salas de demostración en `Mundo` y entrega
sus configuraciones a `Juego.astro`. Astro serializa los datos, no las
instancias de las clases, para que el navegador pueda reconstruir el modelo.

El script cliente de `Juego.astro` verifica que el mundo no esté ya montado,
crea un `Mundo` y llama a `crearSala()` para cada configuración. Esto inicializa
cada `EscenarioSala`, su suelo y sus baldosas; los escenarios rectangulares
también crean paredes. El cliente genera la navegación a partir de
`mundo.listarSalas()` y monta una instancia de `Phaser.Game` con
`Phaser.Scale.RESIZE`.

`EscenaSala` recibe la instancia de `Sala`. En `create()` recupera su escenario,
crea un `RepresentadorSala` y solicita el dibujo. Cambiar de sala sustituye el
renderizador dentro de la misma escena; no crea otro `Phaser.Game`. La escena
mantiene la cámara centrada y calcula un zoom uniforme para ajustar las
dimensiones del escenario al espacio disponible.

## Representación

`RepresentadorSala` mantiene un objeto `Phaser.GameObjects.Graphics` y dibuja
con polígonos y colores planos. Para cada baldosa, obtiene el centro proyectado
mediante `CuadriculaIsometrica.obtenerPosicionBaldosa()` y dibuja sus cuatro
vértices usando las dimensiones de esa misma cuadrícula. La conversión
isométrica no se implementa una segunda vez en el renderizador.

Las baldosas se dibujan en orden de profundidad creciente (`x + y`) para que las
filas posteriores se pinten antes que las anteriores. Las paredes norte y oeste
se pintan detrás del suelo; las paredes sur y este se pintan delante. La altura
de pared, almacenada en unidades lógicas, se representa con la mitad de la
altura de baldosa por unidad.

El contenedor del juego ocupa el espacio restante de la página después de la
navegación lateral (o superior en pantallas estrechas). `Phaser.Scale.RESIZE`
actualiza el tamaño del lienzo al cambiar el viewport. La cámara aplica el
mismo zoom horizontal y vertical, conservando la proporción de las baldosas.

El build actual muestra una advertencia de Vite porque el bundle de cliente que
incluye Phaser supera los 500 kB. La aplicación compila y funciona, pero la
carga del motor puede aumentar el tiempo de descarga inicial; no se modificó la
configuración de build ni se añadieron herramientas de división de código.

`RepresentadorSala.dibujar()` limpia el `Graphics` antes de redibujar el
escenario. `limpiar()` permite borrar y volver a dibujar; `destruir()` libera el
objeto gráfico cuando la escena termina. `EscenaSala` llama a esta destrucción
al apagarse o destruirse. El componente destruye el `Phaser.Game` y retira su lienzo en
`astro:before-swap` y `pagehide`; los montajes repetidos se evitan mediante un
registro de contenedores.

## Componente Astro y React

En el repositorio existe Astro, pero no están instalados `react`, `react-dom` ni
la integración `@astrojs/react`. Como no se permiten instalaciones ni cambios a
la configuración, `Juego.astro` usa un `<script>` cliente nativo de Astro para
montar Phaser. No se crea un archivo React `.tsx` que no podría ejecutarse con
las dependencias actuales.

## Verificación

Desde la raíz del proyecto:

```powershell
npm run dev
npm run build
```

La página de inicio presenta una navegación con salas de calle y tienda. La
prueba espacial independiente está en
`src/motor/ejemplos/verificarEstructuraEspacial.ts`. El build verifica la
compilación Astro, pero no sustituye la inspección visual de selección,
redimensionamiento y encuadre en el navegador.

El diagrama del recorrido completo está en
[`../diagramas/04-flujo-renderizado-sala.mmd`](../diagramas/04-flujo-renderizado-sala.mmd).
