# Separación entre modelo y renderizado

## Decisión

El modelo espacial conserva sus clases independientes de Phaser. `Sala`
contiene el estado y `EscenarioSala`, `CuadriculaIsometrica`, `Suelo`, `Baldosa`
y `Pared` describen la estructura y las coordenadas del escenario. `Mundo` no
crea ni dibuja objetos gráficos.

`EscenaSala` es el adaptador de ciclo de vida de Phaser: recibe una instancia de
`Sala`, obtiene su escenario y crea el renderizador. `RepresentadorSala`
transforma los datos ya existentes en comandos de dibujo `Graphics` y no cambia
el modelo. Así, la cuadrícula sigue siendo la única fuente de conversión
isométrica y el mismo escenario puede consultarse sin iniciar Phaser.

## Ciclo de vida y limpieza

El componente cliente Astro verifica el contenedor antes de montar un juego y
guarda la instancia `Phaser.Game`. Los botones se generan desde las salas
reconstruidas por `Mundo.listarSalas()` y reemplazan el escenario dentro de la
misma instancia. En los eventos de salida de página destruye el juego y elimina
el lienzo. La escena también limpia su `Graphics` al cambiar de sala o durante
el apagado mediante `RepresentadorSala.destruir()`. El método
`limpiar()` del renderizador solo borra los comandos, de modo que luego se puede
volver a llamar a `dibujar()`. Esta doble limpieza atiende el ciclo de vida de
la escena y el de la aplicación que la monta.

## Decisión de integración

El repositorio cuenta con Astro y Phaser, pero no con React, React DOM ni la
integración Astro-React. Se usa `Juego.astro` con un script de navegador, sin
introducir dependencias ni modificar `package.json` o `astro.config.mjs`. Si el
proyecto integra React en otra fase, se podrá sustituir el contenedor manteniendo
las clases de escena y representación.

## Límites

- La distribución rectangular dibuja suelo y cuatro paredes; la calle dibuja
  calzada, aceras y exterior en cruz, con demarcación vial y extremos abiertos.
- No se cargan imágenes, sprites, texturas ni mapas externos.
- `Phaser.Scale.RESIZE` ajusta el lienzo al contenedor. La cámara aplica un zoom
  uniforme para encuadrar cada escenario sin deformar las baldosas.
- `dibujar()` permite actualizar el gráfico explícitamente, pero no existe aún
  un sistema de notificaciones automáticas al cambiar el modelo.
- La validación visual debe realizarse en un navegador con soporte WebGL o
  Canvas; el build comprueba integración y compilación, no el aspecto por sí
  solo.
