import Operador from "../src/operador";
import ReactorNuclear from "../src/reactor_nuclear/ReactorNuclear";
import Normal from "../src/estados/Normal";
import Frio from "../src/estados/frio";
import Apagado from "../src/estados/Apagado";
import Duenio from "../src/duenio";

describe("Apagado", () => {
  let instance: Apagado;
  let reactor: ReactorNuclear;
  let operador: Operador;
  let duenio: Duenio;

  beforeEach(() => {
    duenio = new Duenio("Burns");
    reactor = new ReactorNuclear(instance, 0, [], duenio);
    instance = new Apagado(reactor);
    operador = new Operador("Homero", duenio);
  });

  it("deberia ser una instancia de Apagado", () => {
    expect(instance instanceof Apagado).toBeTruthy();
  });

  it("deberia ser una instancia de Apagado aunque no se pasen parametros al constructor.", () => {
    instance = new Apagado();
    expect(instance instanceof Apagado).toBeTruthy();
  });

  it("deberia tener una capacidad de 0", () => {
    expect(instance.getCapacidad()).toBe(0);
  });

  it("deberia devolver generacion de 0 energia", () => {
    expect(instance.calcularEnergia(700)).toBe(0);
  });

  it("deberia cambiar al estado correcto segun la temperatura, en este caso Frio", () => {
    instance.checkEstado();
    expect(reactor.getEstado() instanceof Frio).toBeTruthy();
  });

  it("deberia cambiar al estado correcto segun la temperatura, en este caso Normal", () => {
    let reactor2: ReactorNuclear = new ReactorNuclear(
      instance,
      290,
      [],
      duenio
    );
    reactor2.cambiarEstado(instance);
    instance.checkEstado();
    expect(reactor2.getEstado() instanceof Normal).toBeTruthy();
  });

  it("debreia intentar insertar barras", () => {
    let reactor2: ReactorNuclear = new ReactorNuclear(
      instance,
      350,
      [],
      duenio
    );
    reactor2.cambiarEstado(instance);
    instance.manejarSituacion(operador);
    expect(reactor2.getTemperatura()).toBe(350);
  });

  it("deberia pasar cuanto cambia la temperatura en este estado (-0.5)", () => {
    expect(instance.cambioTemperatura()).toBe(-0.5);
  });
});
