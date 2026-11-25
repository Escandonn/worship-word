import { Mundo } from "../nucleo/Mundo";

export function ejecutarEjemploCreacionSalas(): void {
	const mundo = new Mundo("WORSHIP WORLD");

	const calle = mundo.crearSala({
		nombre: "Avenida principal",
		tipo: "calle",
		ancho: 20,
		profundidad: 15,
	});

	const tienda = mundo.crearSala({
		nombre: "Tienda de ropa",
		tipo: "tienda",
		ancho: 10,
		profundidad: 8,
		categoria: "ropa",
	});

	console.log(mundo.listarSalas());
	console.log(calle.obtenerInformacion());
	console.log(tienda.obtenerInformacion());
}
