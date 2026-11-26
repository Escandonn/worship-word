# Intersección de calle

## Estructura espacial

Al inicializar una `Sala` de tipo `calle`, esta crea un `EscenarioSala` con
distribución `cruz`. El escenario conserva la cuadrícula rectangular que permite
indexar cada baldosa, pero clasifica sus celdas según su posición en dos brazos
que se intersectan:

- `calzada`: centro de la vía y cruce principal.
- `acera`: franja de separación a los lados de la calzada.
- `exterior`: terreno fuera de ambos brazos.

Esta geometría no elimina celdas del suelo, por lo que las salidas norte, sur,
este y oeste continúan hasta los límites de la sala. El escenario en cruz no
crea paredes perimetrales. Las tiendas siguen usando la distribución
`rectangular`, el tipo de baldosa `suelo` y sus cuatro paredes existentes.

## Representación gráfica

`RepresentadorSala` mantiene la separación entre modelo y gráficos. El tipo de
cada `Baldosa` determina su color, y la cuadrícula existente proyecta todas las
coordenadas. Para la distribución en cruz, el renderizador dibuja marcas viales
discontinuas sobre la calzada, comprobando el tipo de cada baldosa para evitar
que invadan aceras o terreno exterior. Los trazos siguen los dos ejes
isométricos y se dibujan después del suelo.

La calle no añade edificios, vehículos, personajes ni paredes. El diagrama de
distribución se encuentra en
[`../diagramas/06-distribucion-calle.mmd`](../diagramas/06-distribucion-calle.mmd).

## Comprobaciones

`src/motor/ejemplos/verificarEstructuraEspacial.ts` comprueba que la calle
contenga los tres tipos de baldosa y no tenga paredes, mientras una tienda
rectangular conserva cuatro paredes. La inspección del aspecto de los brazos,
las aceras y las marcas se realiza en el navegador.
