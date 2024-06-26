import EstadoReactor from "./estados/EstadoReactor";
import { Notificable } from "./notificable";

export default class GestorDeOperadores {
  private _operadores: Notificable[];
  private _indiceActual: number;

  constructor(operadores: Notificable[]) {
    this._indiceActual = 0;
    this._operadores = operadores;
  }

  public notificarOperadores(estadoReactor: EstadoReactor) {
    for (let i: number = 0; i < this._operadores.length; i++) {
      if (this._indiceActual != i) {
        this._operadores[i].recibirAlerta(estadoReactor, true);
      }
    }
    this._operadores[this._indiceActual].recibirAlerta(estadoReactor, false);

    this._indiceActual = (this._indiceActual + 1) % this._operadores.length;
  }

  public agregarOperador(operador: Notificable) {
    this._operadores.push(operador);
  }

  public sacarOperador(operador: Notificable) {
    const index: number = this._operadores.indexOf(operador);
    this._operadores.splice(index, 1);
  }

  public getOperadores(): Notificable[] {
    return this._operadores;
  }
}