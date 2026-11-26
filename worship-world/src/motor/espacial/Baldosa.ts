import type {
	CoordenadaCuadricula,
	TipoBaldosa,
} from "../tipos/EstructuraEspacial";

export class Baldosa {
	public constructor(
		public readonly identificador: string,
		public readonly posicionX: number,
		public readonly posicionY: number,
		public readonly tipo: TipoBaldosa = "suelo",
		private transitableInterna: boolean = true,
	) {
		if (!identificador.trim()) {
			throw new Error("La baldosa debe tener un identificador.");
		}

		if (
			!Number.isInteger(posicionX) ||
			posicionX < 0 ||
			!Number.isInteger(posicionY) ||
			posicionY < 0
		) {
			throw new Error("La posición de la baldosa debe usar índices enteros no negativos.");
		}
	}

	public get transitable(): boolean {
		return this.transitableInterna;
	}

	public obtenerPosicion(): CoordenadaCuadricula {
		return {
			x: this.posicionX,
			y: this.posicionY,
		};
	}

	public establecerTransitable(transitable: boolean): void {
		this.transitableInterna = transitable;
	}
}
