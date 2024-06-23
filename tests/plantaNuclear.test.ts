import Operador from "../src/operador";
import Duenio from "../src/duenio";
import { horasLimite } from "../src/constantes";
import ReactorNuclear from "../src/reactor_nuclear/ReactorNuclear";
import PlantaNuclear from "../src/plantaNuclear";
import EstadoReactor from "../src/estados/EstadoReactor";
import Apagado from "../src/estados/Apagado";
import Moderado from "../src/estados/Moderado";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("PlantaNuclear", () => {
  let instance: PlantaNuclear;
  let reactor_nuclear: ReactorNuclear;
  let estadoInicial: EstadoReactor;
  let operador1: Operador;
  let operador2: Operador;
  let duenio: Duenio;

  beforeEach(() => {
    duenio = new Duenio([operador1, operador2]);
    operador1 = new Operador("Homero", duenio);
    operador2 = new Operador("Jorge", duenio);
    estadoInicial = new Apagado(reactor_nuclear);
    reactor_nuclear = new ReactorNuclear(estadoInicial, 380, []);
    reactor_nuclear.cambiarEstado(estadoInicial);
    reactor_nuclear.encenderReactor(new Moderado(reactor_nuclear));
    instance = new PlantaNuclear(
      reactor_nuclear,
      [operador1, operador2],
      duenio
    );
  });

  it("deberia ser una instancia de PlantaNuclear", () => {
    expect(instance instanceof PlantaNuclear).toBeTruthy();
  });

  it("deberia tener un return code de 0 ya que logra finalizar la simulacion", () => {
    let horasReporte: number = 1;
    let limite: number = 1;
    expect(instance.iniciarSimulacion(horasReporte, limite)).toBe(0);
  });

  it("deberia apagar el reactor y reportar los datos finales", () => {
    instance.finalizarSimulacion();
    expect(reactor_nuclear.getEstado() instanceof Apagado).toBeTruthy();
  });
});
