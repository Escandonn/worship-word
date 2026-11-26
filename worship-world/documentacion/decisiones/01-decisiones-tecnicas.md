# Decisiones técnicas

## Composición y herencia

Las salas comparten identidad, dimensiones y estado en la clase abstracta
`Sala`; `SalaCalle` y `SalaTienda` heredan esas características porque son
variantes del mismo concepto.

El escenario, la cuadrícula, el suelo, las baldosas y las paredes son objetos
separados que `Sala` y `EscenarioSala` componen. No son tipos de sala ni
variantes intercambiables de `Sala`; mantenerlos como componentes concentra
cambios en la responsabilidad correspondiente. `Mundo` no crea directamente
ninguno de esos componentes.

## Proyección isométrica

Se usa la proyección 2:1 definida para la fase: baldosas de 64 × 32 píxeles y
las fórmulas documentadas en
[`../arquitectura/03-cuadricula-isometrica.md`](../arquitectura/03-cuadricula-isometrica.md).
La transformación inversa redondea al punto de cuadrícula más cercano para
seleccionar una baldosa.

## Responsabilidades

- `Mundo`: validación de configuración, creación y registro de salas.
- `Sala`: estado común e inicialización de su escenario.
- `SalaCalle` y `SalaTienda`: especialización por tipo.
- `EscenarioSala`: generación del suelo y las cuatro paredes perimetrales.
- `CuadriculaIsometrica`: conversión entre coordenadas lógicas y píxeles.
- `Suelo`: colección de baldosas y generación según dimensiones.
- `Baldosa`: identidad, posición, tipo y estado transitable.
- `Pared`: datos geométricos de una pared.

## Limitaciones de esta fase

- El modelo espacial no se dibuja todavía con Phaser; no contiene texturas,
  escenas Phaser ni renderizado.
- El ancho y la profundidad deben ser enteros positivos. La validación espacial
  ocurre al inicializar el escenario, no en la configuración base de `Mundo`.
- La baldosa es de tipo `suelo` y transitable por defecto. El indicador se puede
  cambiar, pero aún no interviene en movimiento, colisiones o navegación.
- Las paredes son datos perimetrales con longitud y altura, no polígonos
  renderizados ni colisionables.
- Las coordenadas inversas se redondean al centro más cercano; no hay detección
  exacta del rombo ni coordenadas de elevación.
- El origen de los escenarios creados por `Sala` es `(0, 0)`. La cuadrícula
  permite configurar otros orígenes cuando se construye de forma independiente.
- No se añadieron jugadores, movimiento, puertas, muebles, persistencia ni
  comunicación multijugador.
