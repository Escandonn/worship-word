import type {
	CoordenadaCuadricula,
	CoordenadaPantalla,
} from "../tipos/EstructuraEspacial";

export class CuadriculaIsometrica {
	public constructor(
		public readonly anchoBaldosa: number = 64,
		public readonly altoBaldosa: number = 32,
		public readonly origenX: number = 0,
		public readonly origenY: number = 0,
	) {
		if (
			!Number.isFinite(anchoBaldosa) ||
			anchoBaldosa <= 0 ||
			!Number.isFinite(altoBaldosa) ||
			altoBaldosa <= 0
		) {
			throw new Error("Las dimensiones de la baldosa deben ser positivas.");
		}

		if (!Number.isFinite(origenX) || !Number.isFinite(origenY)) {
			throw new Error("El origen de la cuadrícula debe tener coordenadas válidas.");
		}
	}

	public convertirAPantalla(
		posicion: CoordenadaCuadricula,
	): CoordenadaPantalla {
		this.validarCoordenadas(posicion.x, posicion.y);

		return {
			x: this.origenX + ((posicion.x - posicion.y) * this.anchoBaldosa) / 2,
			y: this.origenY + ((posicion.x + posicion.y) * this.altoBaldosa) / 2,
		};
	}

	public convertirACuadricula(
		posicion: CoordenadaPantalla,
	): CoordenadaCuadricula {
		this.validarCoordenadas(posicion.x, posicion.y);

		const desplazamientoX = posicion.x - this.origenX;
		const desplazamientoY = posicion.y - this.origenY;

		return {
			x: Math.round(
				desplazamientoX / this.anchoBaldosa +
					desplazamientoY / this.altoBaldosa,
			),
			y: Math.round(
				desplazamientoY / this.altoBaldosa -
					desplazamientoX / this.anchoBaldosa,
			),
		};
	}

	public obtenerPosicionBaldosa(
		posicionX: number,
		posicionY: number,
	): CoordenadaPantalla {
		return this.convertirAPantalla({ x: posicionX, y: posicionY });
	}

	private validarCoordenadas(x: number, y: number): void {
		if (!Number.isFinite(x) || !Number.isFinite(y)) {
			throw new Error("Las coordenadas deben ser números finitos.");
		}
	}
}
