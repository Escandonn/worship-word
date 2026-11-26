import { CuadriculaIsometrica } from "./CuadriculaIsometrica";
import { Pared } from "./Pared";
import { Suelo } from "./Suelo";
import type {
	InformacionEscenario,
	TipoBaldosa,
	TipoDistribucionEscenario,
} from "../tipos/EstructuraEspacial";

export class EscenarioSala {
	public readonly cuadricula: CuadriculaIsometrica;
	public readonly suelo: Suelo;
	private readonly paredesInternas: Pared[] = [];
	private inicializado = false;

	public constructor(
		public readonly ancho: number,
		public readonly profundidad: number,
		public readonly distribucion: TipoDistribucionEscenario = "rectangular",
	) {
		this.validarDimensiones();
		this.cuadricula = new CuadriculaIsometrica(64, 32, 0, 0);
		this.suelo = new Suelo(ancho, profundidad);
	}

	public get paredes(): readonly Pared[] {
		return [...this.paredesInternas];
	}

	public inicializar(): void {
		if (this.inicializado) {
			return;
		}

		this.generarEscenario();
		this.inicializado = true;
	}

	public generarEscenario(): void {
		this.suelo.generarBaldosas((posicionX, posicionY) =>
			this.obtenerTipoBaldosa(posicionX, posicionY),
		);
		this.paredesInternas.length = 0;

		if (this.distribucion === "rectangular") {
			this.paredesInternas.push(
				new Pared({ x: 0, y: 0 }, this.ancho, 3, "norte"),
				new Pared({ x: this.ancho, y: 0 }, this.profundidad, 3, "este"),
				new Pared(
					{ x: 0, y: this.profundidad },
					this.ancho,
					3,
					"sur",
				),
				new Pared(
					{ x: 0, y: 0 },
					this.profundidad,
					3,
					"oeste",
				),
			);
		}
	}

	public obtenerInformacionEscenario(): InformacionEscenario {
		return {
			ancho: this.ancho,
			profundidad: this.profundidad,
			anchoBaldosa: this.cuadricula.anchoBaldosa,
			altoBaldosa: this.cuadricula.altoBaldosa,
			cantidadBaldosas: this.suelo.obtenerTodasLasBaldosas().length,
			cantidadParedes: this.paredesInternas.length,
			distribucion: this.distribucion,
		};
	}

	private obtenerTipoBaldosa(
		posicionX: number,
		posicionY: number,
	): TipoBaldosa {
		if (this.distribucion !== "cruz") {
			return "suelo";
		}

		const dimensionMenor = Math.min(this.ancho, this.profundidad);
		const anchoVial = Math.min(
			5,
			dimensionMenor % 2 === 0 ? dimensionMenor - 1 : dimensionMenor,
		);
		const anchoAcera = anchoVial >= 3 ? 1 : 0;
		const radioVial = Math.floor((anchoVial - 1) / 2);
		const radioCalzada = Math.floor(
			(anchoVial - anchoAcera * 2 - 1) / 2,
		);
		const centroX = Math.floor(this.ancho / 2);
		const centroY = Math.floor(this.profundidad / 2);
		const dentroBrazoVertical =
			Math.abs(posicionX - centroX) <= radioVial;
		const dentroBrazoHorizontal =
			Math.abs(posicionY - centroY) <= radioVial;

		if (dentroBrazoVertical && dentroBrazoHorizontal) {
			return "calzada";
		}

		if (
			(dentroBrazoVertical &&
				Math.abs(posicionX - centroX) <= radioCalzada) ||
			(dentroBrazoHorizontal &&
				Math.abs(posicionY - centroY) <= radioCalzada)
		) {
			return "calzada";
		}

		if (dentroBrazoVertical || dentroBrazoHorizontal) {
			return "acera";
		}

		return "exterior";
	}

	private validarDimensiones(): void {
		if (
			!Number.isInteger(this.ancho) ||
			this.ancho <= 0 ||
			!Number.isInteger(this.profundidad) ||
			this.profundidad <= 0
		) {
			throw new Error(
				"Las dimensiones de la sala deben ser números enteros positivos.",
			);
		}
	}
}
