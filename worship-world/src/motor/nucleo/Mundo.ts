import { SalaCalle } from "../salas/SalaCalle";
import { SalaTienda } from "../salas/SalaTienda";
import type { Sala } from "../salas/Sala";
import type { ConfiguracionSala } from "../tipos/ConfiguracionSala";

let siguienteIdentificadorDeSala = 1;

export class Mundo {
	private readonly salasRegistradas = new Map<string, Sala>();

	public constructor(public readonly nombre: string) {}

	public get salas(): readonly Sala[] {
		return [...this.salasRegistradas.values()];
	}

	public crearSala(configuracion: ConfiguracionSala): Sala {
		this.validarConfiguracion(configuracion);

		const id = this.generarIdentificador();
		let sala: Sala;

		switch (configuracion.tipo) {
			case "calle":
				sala = new SalaCalle(
					id,
					configuracion.nombre.trim(),
					configuracion.ancho,
					configuracion.profundidad,
				);
				break;
			case "tienda":
				sala = new SalaTienda(
					id,
					configuracion.nombre.trim(),
					configuracion.ancho,
					configuracion.profundidad,
					configuracion.categoria,
				);
				break;
			default:
				throw new Error(`Tipo de sala desconocido: "${configuracion.tipo}".`);
		}

		sala.inicializar();
		this.salasRegistradas.set(sala.id, sala);
		return sala;
	}

	public obtenerSala(id: string): Sala | undefined {
		return this.salasRegistradas.get(id);
	}

	public eliminarSala(id: string): boolean {
		return this.salasRegistradas.delete(id);
	}

	public listarSalas(): Sala[] {
		return [...this.salasRegistradas.values()];
	}

	private validarConfiguracion(configuracion: ConfiguracionSala): void {
		if (!configuracion.nombre.trim()) {
			throw new Error("El nombre de la sala no puede estar vacío.");
		}

		if (
			!Number.isFinite(configuracion.ancho) ||
			configuracion.ancho <= 0 ||
			!Number.isFinite(configuracion.profundidad) ||
			configuracion.profundidad <= 0
		) {
			throw new Error("El ancho y la profundidad deben ser números positivos.");
		}
	}

	private generarIdentificador(): string {
		let id = `sala-${siguienteIdentificadorDeSala}`;
		while (this.salasRegistradas.has(id)) {
			siguienteIdentificadorDeSala += 1;
			id = `sala-${siguienteIdentificadorDeSala}`;
		}

		siguienteIdentificadorDeSala += 1;
		return id;
	}
}
