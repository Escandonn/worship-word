# Cuadrícula isométrica

## Sistemas de coordenadas

La sala usa coordenadas lógicas cartesianas `(x, y)` para identificar una
baldosa. Ambas coordenadas son índices enteros no negativos; `x` avanza por
columnas y `y` por filas. No son posiciones en píxeles.

La pantalla usa coordenadas `(pantallaX, pantallaY)` expresadas en píxeles. La
cuadrícula inicial configura una baldosa de 64 píxeles de ancho por 32 de alto,
con origen `(0, 0)`. El origen es el punto central proyectado de la baldosa
lógica `(0, 0)`.

## Proyección

Para una posición lógica `(x, y)`, `convertirAPantalla()` aplica:

```text
pantallaX = origenX + (x - y) * anchoBaldosa / 2
pantallaY = origenY + (x + y) * altoBaldosa / 2
```

La primera fórmula proyecta el eje `x` hacia la derecha y el eje `y` hacia la
izquierda. La segunda hace que ambos ejes avancen hacia abajo, creando el
rombo isométrico.

## Conversión inversa

`convertirACuadricula()` despeja las dos ecuaciones. Con `dx = pantallaX -
origenX` y `dy = pantallaY - origenY`:

```text
x = dx / anchoBaldosa + dy / altoBaldosa
y = dy / altoBaldosa - dx / anchoBaldosa
```

El resultado se redondea al entero más cercano: la función selecciona el centro
de baldosa más cercano, no una coordenada fraccionaria ni una prueba exacta de
contención dentro del rombo. `obtenerPosicionBaldosa(x, y)` devuelve el punto
proyectado de esa baldosa.

Con el tamaño `64 × 32`, la posición lógica `(3, 2)` se proyecta en `(32, 80)`
cuando el origen es `(0, 0)` y vuelve a `(3, 2)` mediante la conversión inversa.
