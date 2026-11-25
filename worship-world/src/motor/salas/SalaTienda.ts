import { Sala } from "./Sala";
import type {
	CategoriaTienda,
	InformacionSala,
} from "../tipos/ConfiguracionSala";

export class SalaTienda extends Sala {
	public constructor(
		id: string,
		nombre: string,
		ancho: number,
		profundidad: number,
		public readonly categoria: CategoriaTienda = "ropa",
	) {
		super(id, nombre, ancho, profundidad, "tienda");
	}

	public override obtenerInformacion(): InformacionSala {
		return {
			...super.obtenerInformacion(),
			categoria: this.categoria,
		};
	}
}
