import { Baldosa } from "./Baldosa";
import type { TipoBaldosa } from "../tipos/EstructuraEspacial";

export class Suelo {
	private readonly baldosas = new Map<string, Baldosa>();

	public constructor(
		public readonly ancho: number,
		public readonly profundidad: number,
	) {
		this.validarDimensiones();
	}

	public generarBaldosas(
		obtenerTipoBaldosa?: (posicionX: number, posicionY: number) => TipoBaldosa,
	): void {
		for (let posicionY = 0; posicionY < this.profundidad; posicionY += 1) {
			for (let posicionX = 0; posicionX < this.ancho; posicionX += 1) {
				if (!this.obtenerBaldosa(posicionX, posicionY)) {
					this.agregarBaldosa(
						new Baldosa(
							`baldosa-${posicionX}-${posicionY}`,
							posicionX,
							posicionY,
							obtenerTipoBaldosa?.(posicionX, posicionY) ?? "suelo",
						),
					);
				}
			}
		}
	}

	public obtenerBaldosa(
		posicionX: number,
		posicionY: number,
	): Baldosa | undefined {
		return this.baldosas.get(this.crearClave(posicionX, posicionY));
	}

	public agregarBaldosa(baldosa: Baldosa): void {
		this.validarPosicion(baldosa.posicionX, baldosa.posicionY);

		const clave = this.crearClave(baldosa.posicionX, baldosa.posicionY);
		if (this.baldosas.has(clave)) {
			throw new Error(
				`Ya existe una baldosa en (${baldosa.posicionX}, ${baldosa.posicionY}).`,
			);
		}

		this.baldosas.set(clave, baldosa);
	}

	public eliminarBaldosa(posicionX: number, posicionY: number): boolean {
		return this.baldosas.delete(this.crearClave(posicionX, posicionY));
	}

	public obtenerTodasLasBaldosas(): Baldosa[] {
		return [...this.baldosas.values()];
	}

	private validarDimensiones(): void {
		if (
			!Number.isInteger(this.ancho) ||
			this.ancho <= 0 ||
			!Number.isInteger(this.profundidad) ||
			this.profundidad <= 0
		) {
			throw new Error(
				"El ancho y la profundidad del suelo deben ser enteros positivos.",
			);
		}
	}

	private validarPosicion(posicionX: number, posicionY: number): void {
		if (
			!Number.isInteger(posicionX) ||
			!Number.isInteger(posicionY) ||
			posicionX < 0 ||
			posicionY < 0 ||
			posicionX >= this.ancho ||
			posicionY >= this.profundidad
		) {
			throw new Error(
				`La posición (${posicionX}, ${posicionY}) está fuera del suelo.`,
			);
		}
	}

	private crearClave(posicionX: number, posicionY: number): string {
		return `${posicionX}:${posicionY}`;
	}
}
