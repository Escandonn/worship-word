import Phaser from "phaser";
import type { Sala } from "../motor/salas/Sala";
import { calcularDimensionesLienzo } from "../motor/representacion/calcularDimensionesLienzo";
import { RepresentadorSala } from "../motor/representacion/RepresentadorSala";

export class EscenaSala extends Phaser.Scene {
	private representador: RepresentadorSala | undefined;

	public constructor(private sala: Sala) {
		super({ key: "escena-sala" });
	}

	public create(): void {
		this.cameras.main.setBackgroundColor("#dce9df");
		this.representarSala();
		this.scale.on(
			Phaser.Scale.Events.RESIZE,
			this.ajustarCamara,
			this,
		);
		this.events.once(
			Phaser.Scenes.Events.SHUTDOWN,
			this.limpiarRepresentador,
			this,
		);
		this.events.once(
			Phaser.Scenes.Events.DESTROY,
			this.limpiarRepresentador,
			this,
		);
	}

	public cambiarSala(sala: Sala): void {
		this.sala = sala;
		if (!this.sys.isActive()) {
			return;
		}

		this.representarSala();
	}

	private representarSala(): void {
		this.representador?.destruir();
		this.representador = new RepresentadorSala(
			this,
			this.sala.obtenerEscenario(),
		);
		this.representador.dibujar();
		this.ajustarCamara();
	}

	private ajustarCamara(): void {
		const escenario = this.sala.obtenerEscenario();
		const dimensiones = calcularDimensionesLienzo(escenario);
		const anchoDisponible = Math.max(1, this.scale.width - 48);
		const altoDisponible = Math.max(1, this.scale.height - 48);
		const zoom = Math.min(
			anchoDisponible / dimensiones.ancho,
			altoDisponible / dimensiones.alto,
		);

		this.cameras.main
			.setZoom(zoom)
			.centerOn(dimensiones.ancho / 2, dimensiones.alto / 2);
	}

	private limpiarRepresentador(): void {
		this.scale.off(
			Phaser.Scale.Events.RESIZE,
			this.ajustarCamara,
			this,
		);
		this.representador?.destruir();
		this.representador = undefined;
	}
}
