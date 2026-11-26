import { Mundo } from "../nucleo/Mundo";

export function verificarEstructuraEspacial(): void {
	const mundo = new Mundo("WORSHIP WORLD");
	const salaPequena = mundo.crearSala({
		nombre: "Sala de prueba pequeña",
		tipo: "calle",
		ancho: 8,
		profundidad: 6,
	});
	const salaGrande = mundo.crearSala({
		nombre: "Sala de prueba grande",
		tipo: "tienda",
		ancho: 20,
		profundidad: 15,
	});

	const escenarioPequeno = salaPequena.obtenerEscenario();
	const escenarioGrande = salaGrande.obtenerEscenario();
	const baldosasPequenas =
		escenarioPequeno.suelo.obtenerTodasLasBaldosas();
	const baldosasGrandes = escenarioGrande.suelo.obtenerTodasLasBaldosas();

	if (baldosasPequenas.length !== 48) {
		throw new Error(`Se esperaban 48 baldosas y se generaron ${baldosasPequenas.length}.`);
	}

	if (baldosasGrandes.length !== 300) {
		throw new Error(`Se esperaban 300 baldosas y se generaron ${baldosasGrandes.length}.`);
	}

	if (!escenarioPequeno.suelo.obtenerBaldosa(7, 5)) {
		throw new Error("No se encontró la baldosa ubicada en (7, 5).");
	}

	const posicionOriginal = { x: 3, y: 2 };
	const posicionEnPantalla =
		escenarioGrande.cuadricula.convertirAPantalla(posicionOriginal);
	const posicionReconstruida =
		escenarioGrande.cuadricula.convertirACuadricula(posicionEnPantalla);

	if (
		posicionReconstruida.x !== posicionOriginal.x ||
		posicionReconstruida.y !== posicionOriginal.y
	) {
		throw new Error("La conversión de coordenadas no conservó la posición.");
	}

	if (
		escenarioPequeno.distribucion !== "cruz" ||
		escenarioPequeno.paredes.length !== 0 ||
		escenarioGrande.paredes.length !== 4
	) {
		throw new Error("La calle debe quedar abierta y la tienda conservar sus paredes.");
	}

	const tiposDeBaldosa = new Set(
		baldosasPequenas.map((baldosa) => baldosa.tipo),
	);
	if (
		!tiposDeBaldosa.has("calzada") ||
		!tiposDeBaldosa.has("acera") ||
		!tiposDeBaldosa.has("exterior")
	) {
		throw new Error("La intersección debe distinguir calzada, acera y exterior.");
	}

	console.log({
		baldosasSalaPequena: baldosasPequenas.length,
		baldosasSalaGrande: baldosasGrandes.length,
		distribucionCalle: escenarioPequeno.distribucion,
		tiposDeBaldosa: [...tiposDeBaldosa],
		posicionEnPantalla,
		posicionReconstruida,
		paredesCalle: escenarioPequeno.paredes.length,
		paredesTienda: escenarioGrande.paredes.length,
	});
}
