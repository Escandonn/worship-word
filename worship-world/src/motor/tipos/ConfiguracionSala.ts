import type { InformacionEscenario } from "./EstructuraEspacial";

export type TipoSala = "calle" | "tienda";

export type CategoriaTienda = "ropa" | "alimentos" | "vehiculos";

export interface ConfiguracionSala {
	nombre: string;
	tipo: TipoSala;
	ancho: number;
	profundidad: number;
	categoria?: CategoriaTienda;
}

export interface InformacionSala {
	id: string;
	nombre: string;
	ancho: number;
	profundidad: number;
	tipo: TipoSala;
	jugadores: number;
	elementos: number;
	escenario?: InformacionEscenario;
	categoria?: CategoriaTienda;
}
