import type { InformacionSala, TipoSala } from "../tipos/ConfiguracionSala";
import { EscenarioSala } from "../espacial/EscenarioSala";

export abstract class Sala<TJugador = unknown, TElemento = unknown> {
	private readonly _jugadores: TJugador[] = [];
	private readonly _elementos: TElemento[] = [];
	private escenarioSala: EscenarioSala | undefined;
	private inicializada = false;

	protected constructor(
		public readonly id: string,
		public readonly nombre: string,
		public readonly ancho: number,
		public readonly profundidad: number,
		public readonly tipo: TipoSala,
	) {}

	public get jugadores(): readonly TJugador[] {
		return [...this._jugadores];
	}

	public get elementos(): readonly TElemento[] {
		return [...this._elementos];
	}

	public obtenerEscenario(): EscenarioSala {
		if (!this.escenarioSala) {
			throw new Error(`El escenario de la sala "${this.nombre}" no está inicializado.`);
		}

		return this.escenarioSala;
	}

	public inicializar(): void {
		if (this.inicializada) {
			return;
		}

		const distribucion = this.tipo === "calle" ? "cruz" : "rectangular";
		const escenario = new EscenarioSala(
			this.ancho,
			this.profundidad,
			distribucion,
		);
		escenario.inicializar();

		this._jugadores.length = 0;
		this._elementos.length = 0;
		this.escenarioSala = escenario;
		this.inicializada = true;
	}

	public agregarJugador(jugador: TJugador): void {
		this.asegurarInicializada();
		this._jugadores.push(jugador);
	}

	public eliminarJugador(jugador: TJugador): boolean {
		return this.eliminarDeColeccion(this._jugadores, jugador);
	}

	public agregarElemento(elemento: TElemento): void {
		this.asegurarInicializada();
		this._elementos.push(elemento);
	}

	public eliminarElemento(elemento: TElemento): boolean {
		return this.eliminarDeColeccion(this._elementos, elemento);
	}

	public obtenerInformacion(): InformacionSala {
		return {
			id: this.id,
			nombre: this.nombre,
			ancho: this.ancho,
			profundidad: this.profundidad,
			tipo: this.tipo,
			jugadores: this._jugadores.length,
			elementos: this._elementos.length,
			...(this.escenarioSala
				? { escenario: this.escenarioSala.obtenerInformacionEscenario() }
				: {}),
		};
	}

	private asegurarInicializada(): void {
		if (!this.inicializada) {
			throw new Error(`La sala "${this.nombre}" no ha sido inicializada.`);
		}
	}

	private eliminarDeColeccion<T>(coleccion: T[], elemento: T): boolean {
		const indice = coleccion.indexOf(elemento);
		if (indice === -1) {
			return false;
		}

		coleccion.splice(indice, 1);
		return true;
	}
}
