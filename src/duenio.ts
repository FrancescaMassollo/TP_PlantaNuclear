import EstadoReactor from "./estados/EstadoReactor";
import { Notificable } from "./notificable";
import Operador from "./operador";
import { Reporte } from "./reportes/reporte";

export default class Duenio implements Notificable {
  private _nombre: String;
  constructor(nombre: String) {
    this._nombre = nombre;
  }

  public recibirAlerta(estado: EstadoReactor, manejado: boolean): number {
    console.log(`El duenio recibio la notificacion`);
    return 1;
  }

  public recibirReporte(reporte: Reporte): number {
    reporte.getDatos();
    return 1;
  }
}
