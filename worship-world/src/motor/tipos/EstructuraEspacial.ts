export interface CoordenadaCuadricula {
	readonly x: number;
	readonly y: number;
}

export interface CoordenadaPantalla {
	readonly x: number;
	readonly y: number;
}

export type TipoBaldosa = "suelo" | "calzada" | "acera" | "exterior";

export type OrientacionPared = "norte" | "este" | "sur" | "oeste";

export type TipoDistribucionEscenario = "rectangular" | "cruz";

export interface InformacionEscenario {
	ancho: number;
	profundidad: number;
	anchoBaldosa: number;
	altoBaldosa: number;
	cantidadBaldosas: number;
	cantidadParedes: number;
	distribucion: TipoDistribucionEscenario;
}
