import Phaser from "phaser";
import { EscenarioSala } from "../espacial/EscenarioSala";
import type {
	CoordenadaPantalla,
	TipoBaldosa,
} from "../tipos/EstructuraEspacial";
import { margenLienzo } from "./calcularDimensionesLienzo";

interface VerticesPared {
	inicio: CoordenadaPantalla;
	final: CoordenadaPantalla;
}

export class RepresentadorSala {
	private readonly graficos: Phaser.GameObjects.Graphics;
	private destruido = false;

	public constructor(
		private readonly escena: Phaser.Scene,
		private readonly escenario: EscenarioSala,
	) {
		this.graficos = this.escena.add.graphics();
	}

	public dibujar(): void {
		this.limpiar();

		const desplazamiento = this.obtenerDesplazamiento();
		const paredes = this.escenario.paredes;

		for (const pared of paredes) {
			if (pared.orientacion === "norte" || pared.orientacion === "oeste") {
				this.dibujarPared(pared, desplazamiento);
			}
		}

		this.dibujarSuelo(desplazamiento);

		for (const pared of paredes) {
			if (pared.orientacion === "sur" || pared.orientacion === "este") {
				this.dibujarPared(pared, desplazamiento);
			}
		}
	}

	public limpiar(): void {
		this.asegurarActivo();
		this.graficos.clear();
	}

	public destruir(): void {
		if (this.destruido) {
			return;
		}

		this.graficos.clear();
		this.graficos.destroy();
		this.destruido = true;
	}

	private dibujarSuelo(desplazamiento: CoordenadaPantalla): void {
		const baldosas = this.escenario.suelo
			.obtenerTodasLasBaldosas()
			.sort(
				(primera, segunda) =>
					primera.posicionX +
					primera.posicionY -
					(segunda.posicionX + segunda.posicionY),
			);
		const mitadAncho = this.escenario.cuadricula.anchoBaldosa / 2;
		const mitadAlto = this.escenario.cuadricula.altoBaldosa / 2;

		for (const baldosa of baldosas) {
			const centro = this.escenario.cuadricula.obtenerPosicionBaldosa(
				baldosa.posicionX,
				baldosa.posicionY,
			);
			const puntos = this.crearPuntos([
				{ x: centro.x, y: centro.y - mitadAlto },
				{ x: centro.x + mitadAncho, y: centro.y },
				{ x: centro.x, y: centro.y + mitadAlto },
				{ x: centro.x - mitadAncho, y: centro.y },
			], desplazamiento);

			this.graficos.fillStyle(
				this.obtenerColorBaldosa(
					baldosa.tipo,
					baldosa.posicionX,
					baldosa.posicionY,
				),
				1,
			);
			this.graficos.fillPoints(puntos, true);
			this.graficos.lineStyle(
				1,
				baldosa.tipo === "calzada" ? 0x252c2a : 0x587b59,
				0.9,
			);
			this.graficos.strokePoints(puntos, true);
		}

		this.dibujarDemarcacion(desplazamiento);
	}

	private obtenerColorBaldosa(
		tipo: TipoBaldosa,
		posicionX: number,
		posicionY: number,
	): number {
		switch (tipo) {
			case "calzada":
				return 0x414846;
			case "acera":
				return 0xc3b89e;
			case "exterior":
				return (posicionX + posicionY) % 2 === 0 ? 0x8eaa7a : 0x829e70;
			case "suelo":
				return (posicionX + posicionY) % 2 === 0 ? 0x86ad78 : 0x7fa471;
		}
	}

	private dibujarDemarcacion(
		desplazamiento: CoordenadaPantalla,
	): void {
		if (this.escenario.distribucion !== "cruz") {
			return;
		}

		const centroX = Math.floor(this.escenario.ancho / 2);
		const centroY = Math.floor(this.escenario.profundidad / 2);
		this.graficos.lineStyle(3, 0xf2c85e, 0.95);

		for (let posicionX = 0; posicionX < this.escenario.ancho; posicionX += 2) {
			const baldosa = this.escenario.suelo.obtenerBaldosa(
				posicionX,
				centroY,
			);
			if (baldosa?.tipo !== "calzada") {
				continue;
			}

			const inicio = this.escenario.cuadricula.convertirAPantalla({
				x: posicionX + 0.08,
				y: centroY,
			});
			const final = this.escenario.cuadricula.convertirAPantalla({
				x: posicionX + 0.38,
				y: centroY,
			});
			this.graficos.lineBetween(
				inicio.x + desplazamiento.x,
				inicio.y + desplazamiento.y,
				final.x + desplazamiento.x,
				final.y + desplazamiento.y,
			);
		}

		for (
			let posicionY = 0;
			posicionY < this.escenario.profundidad;
			posicionY += 2
		) {
			const baldosa = this.escenario.suelo.obtenerBaldosa(
				centroX,
				posicionY,
			);
			if (baldosa?.tipo !== "calzada") {
				continue;
			}

			const inicio = this.escenario.cuadricula.convertirAPantalla({
				x: centroX,
				y: posicionY + 0.08,
			});
			const final = this.escenario.cuadricula.convertirAPantalla({
				x: centroX,
				y: posicionY + 0.38,
			});
			this.graficos.lineBetween(
				inicio.x + desplazamiento.x,
				inicio.y + desplazamiento.y,
				final.x + desplazamiento.x,
				final.y + desplazamiento.y,
			);
		}
	}

	private dibujarPared(
		pared: EscenarioSala["paredes"][number],
		desplazamiento: CoordenadaPantalla,
	): void {
		const extremos = this.obtenerExtremosPared(pared);
		const alturaVisual =
			pared.altura * (this.escenario.cuadricula.altoBaldosa / 2);
		const puntos = this.crearPuntos(
			[
				extremos.inicio,
				extremos.final,
				{ x: extremos.final.x, y: extremos.final.y - alturaVisual },
				{ x: extremos.inicio.x, y: extremos.inicio.y - alturaVisual },
			],
			desplazamiento,
		);
		const colorPared =
			pared.orientacion === "norte" || pared.orientacion === "sur"
				? 0xc97859
				: 0xa95f4c;

		this.graficos.fillStyle(colorPared, 1);
		this.graficos.fillPoints(puntos, true);
		this.graficos.lineStyle(2, 0x77483f, 1);
		this.graficos.strokePoints(puntos, true);
	}

	private obtenerExtremosPared(
		pared: EscenarioSala["paredes"][number],
	): VerticesPared {
		const { ancho, profundidad } = this.escenario;
		const mitadAncho = this.escenario.cuadricula.anchoBaldosa / 2;
		const mitadAlto = this.escenario.cuadricula.altoBaldosa / 2;

		switch (pared.orientacion) {
			case "norte": {
				const inicio = this.escenario.cuadricula.convertirAPantalla(
					pared.posicion,
				);
				const final = this.escenario.cuadricula.convertirAPantalla({
					x: pared.posicion.x + pared.longitud - 1,
					y: pared.posicion.y,
				});
				return {
					inicio: { x: inicio.x, y: inicio.y - mitadAlto },
					final: { x: final.x + mitadAncho, y: final.y },
				};
			}
			case "sur": {
				const fila = profundidad - 1;
				const inicio = this.escenario.cuadricula.convertirAPantalla({
					x: 0,
					y: fila,
				});
				const final = this.escenario.cuadricula.convertirAPantalla({
					x: ancho - 1,
					y: fila,
				});
				return {
					inicio: { x: inicio.x - mitadAncho, y: inicio.y },
					final: { x: final.x, y: final.y + mitadAlto },
				};
			}
			case "este": {
				const columna = ancho - 1;
				const inicio = this.escenario.cuadricula.convertirAPantalla({
					x: columna,
					y: 0,
				});
				const final = this.escenario.cuadricula.convertirAPantalla({
					x: columna,
					y: pared.longitud - 1,
				});
				return {
					inicio: { x: inicio.x + mitadAncho, y: inicio.y },
					final: { x: final.x, y: final.y + mitadAlto },
				};
			}
			case "oeste": {
				const inicio = this.escenario.cuadricula.convertirAPantalla(
					pared.posicion,
				);
				const final = this.escenario.cuadricula.convertirAPantalla({
					x: pared.posicion.x,
					y: pared.posicion.y + pared.longitud - 1,
				});
				return {
					inicio: { x: inicio.x, y: inicio.y - mitadAlto },
					final: { x: final.x - mitadAncho, y: final.y },
				};
			}
		}
	}

	private obtenerDesplazamiento(): CoordenadaPantalla {
		return {
			x:
				this.escenario.profundidad *
					(this.escenario.cuadricula.anchoBaldosa / 2) +
				margenLienzo,
			y:
				this.escenario.paredes.reduce(
					(alturaMaxima, pared) => Math.max(alturaMaxima, pared.altura),
					0,
				) *
					(this.escenario.cuadricula.altoBaldosa / 2) +
				this.escenario.cuadricula.altoBaldosa / 2 +
				margenLienzo,
		};
	}

	private crearPuntos(
		coordenadas: CoordenadaPantalla[],
		desplazamiento: CoordenadaPantalla,
	): Phaser.Math.Vector2[] {
		return coordenadas.map(
			(coordenada) =>
				new Phaser.Math.Vector2(
					coordenada.x + desplazamiento.x,
					coordenada.y + desplazamiento.y,
				),
		);
	}

	private asegurarActivo(): void {
		if (this.destruido) {
			throw new Error("No se puede dibujar con un representador destruido.");
		}
	}
}
