# Navegación y visualización de salas

## Fuente de salas y navegación

`src/pages/index.astro` crea las salas mediante `Mundo.crearSala()` y pasa a
`Juego.astro` únicamente sus configuraciones. El cliente vuelve a crear las
instancias en un `Mundo` mediante la misma API y obtiene la colección con
`listarSalas()`. Por cada sala construye un botón con nombre y tipo, y marca la
selección con `aria-pressed`. No existe una lista paralela de botones
codificados manualmente.

Al seleccionar un botón, el cliente obtiene la sala correspondiente y solicita
a `EscenaSala.cambiarSala()` que sustituya el escenario representado. El
renderizador anterior se destruye antes de crear el siguiente. Se conserva la
misma instancia de `Phaser.Game`; el identificador de sala queda reflejado en el
contenedor para mantener sincronizada la navegación.

## Área y cámara

El panel de navegación ocupa una columna; el área Phaser ocupa el espacio
restante. En pantallas estrechas, la navegación pasa a una franja superior y el
canvas continúa ocupando el resto de la altura disponible.
`Phaser.Scale.RESIZE` cambia el tamaño del canvas con su contenedor. Al iniciar,
seleccionar otra sala o recibir un evento de resize, `EscenaSala` calcula un
zoom único usando las dimensiones del lienzo lógico y del viewport, y centra la
cámara en el punto medio del área del escenario. Las escalas horizontal y
vertical no se ajustan por separado, así que las baldosas conservan su
proporción.

El orden de profundidad de las baldosas se mantiene en `RepresentadorSala`.
La interfaz no dibuja gráficos ni convierte coordenadas isométricas.

## Integración y verificación

La integración utiliza el script cliente de Astro. El repositorio no incluye
React ni su integración Astro, y no se añaden paquetes. El componente registra
el juego montado por contenedor, lo destruye en los eventos de salida de página
y evita instancias repetidas durante los ciclos de navegación de Astro.

Verifica manualmente en la página principal que aparecen tres botones, que
cambiar la selección actualiza el escenario sin añadir otro canvas y que el
encuadre se adapta al cambiar entre la calle de `12 × 8`, la de `20 × 15` y la
tienda de `10 × 8`. Redimensiona el navegador y comprueba que la sala completa
sigue visible.
