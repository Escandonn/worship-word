import { Sala } from "./Sala";

export class SalaCalle extends Sala {
	public constructor(
		id: string,
		nombre: string,
		ancho: number,
		profundidad: number,
	) {
		super(id, nombre, ancho, profundidad, "calle");
	}
}
