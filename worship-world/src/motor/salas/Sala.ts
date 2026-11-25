import type { InformacionSala, TipoSala } from "../tipos/ConfiguracionSala";

export abstract class Sala<TJugador = unknown, TElemento = unknown> {
	private readonly _jugadores: TJugador[] = [];
	private readonly _elementos: TElemento[] = [];
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

	public inicializar(): void {
		if (this.inicializada) {
			return;
		}

		this._jugadores.length = 0;
		this._elementos.length = 0;
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
