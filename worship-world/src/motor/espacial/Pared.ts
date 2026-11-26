import type {
	CoordenadaCuadricula,
	OrientacionPared,
} from "../tipos/EstructuraEspacial";

export class Pared {
	public readonly posicion: CoordenadaCuadricula;

	public constructor(
		posicion: CoordenadaCuadricula,
		public readonly longitud: number,
		public readonly altura: number,
		public readonly orientacion: OrientacionPared,
	) {
		if (
			!Number.isInteger(longitud) ||
			longitud <= 0 ||
			!Number.isFinite(altura) ||
			altura <= 0
		) {
			throw new Error("La longitud y la altura de la pared deben ser positivas.");
		}

		if (
			!Number.isInteger(posicion.x) ||
			posicion.x < 0 ||
			!Number.isInteger(posicion.y) ||
			posicion.y < 0
		) {
			throw new Error("La posición de la pared debe usar coordenadas enteras no negativas.");
		}

		this.posicion = { x: posicion.x, y: posicion.y };
	}
}
