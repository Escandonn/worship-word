import type { EscenarioSala } from "../espacial/EscenarioSala";

export interface DimensionesLienzo {
	ancho: number;
	alto: number;
}

export const margenLienzo = 32;

export function calcularDimensionesLienzo(
	escenario: EscenarioSala,
): DimensionesLienzo {
	const sumaDimensiones = escenario.ancho + escenario.profundidad;
	const alturaVisualPared =
		escenario.paredes.reduce(
			(alturaMaxima, pared) => Math.max(alturaMaxima, pared.altura),
			0,
		) *
		(escenario.cuadricula.altoBaldosa / 2);

	return {
		ancho:
			sumaDimensiones * (escenario.cuadricula.anchoBaldosa / 2) +
			margenLienzo * 2,
		alto:
			sumaDimensiones * (escenario.cuadricula.altoBaldosa / 2) +
			alturaVisualPared +
			escenario.cuadricula.altoBaldosa / 2 +
			margenLienzo * 2,
	};
}
