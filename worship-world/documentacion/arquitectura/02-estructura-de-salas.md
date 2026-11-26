# Estructura de salas

## Dimensiones lógicas

`Sala.ancho` y `Sala.profundidad` expresan cantidades de baldosas, no píxeles.
Por ejemplo, una sala de `8 × 6` tiene ocho columnas y seis filas. Las
dimensiones deben ser enteros positivos para que el suelo pueda generar una
baldosa por cada celda.

`Mundo` conserva la validación original de números positivos. La comprobación
adicional de enteros ocurre al construir `EscenarioSala`; si una dimensión
fraccionaria no se puede representar como cuadrícula, la inicialización falla y
la sala no se registra en el mundo.

## Composición

Al llamar `Sala.inicializar()`:

1. La sala crea `EscenarioSala` con sus dimensiones lógicas.
2. El escenario crea una cuadrícula de baldosas de `64 × 32` píxeles y un
   `Suelo` del mismo ancho y profundidad.
3. `EscenarioSala.inicializar()` llama a `generarEscenario()`.
4. El suelo genera las baldosas. En las salas de tipo calle, cada celda recibe
   el tipo `calzada`, `acera` o `exterior`; en las otras salas, conserva el tipo
   `suelo`. Solo la distribución rectangular crea cuatro paredes perimetrales.
5. Si todo se inicializa correctamente, la sala conserva el escenario y
   completa su propio estado de inicialización.

Las baldosas tienen identificadores locales basados en sus coordenadas, por
ejemplo `baldosa-2-4`. `Suelo` las indexa por el par `(x, y)`, impide duplicar
una celda y devuelve copias de su colección al solicitar todas las baldosas.
`generarBaldosas()` completa las celdas que falten sin reemplazar las existentes.

Las paredes están expresadas en coordenadas lógicas. En escenarios rectangulares
se crean en los cuatro lados con longitud igual al lado correspondiente y
altura inicial de tres unidades. La distribución en cruz deja las cuatro
direcciones abiertas. La información del escenario expone dimensiones,
distribución, tamaño de baldosa y cantidades de baldosas y paredes.

La relación entre estas clases se muestra en
[`../diagramas/02-diagrama-componentes.mmd`](../diagramas/02-diagrama-componentes.mmd).
