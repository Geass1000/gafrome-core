
export namespace DI {
  export const Client = Symbol('Nats-DI-Client');
  export const Config = Symbol('Nats-DI-Config');
}

export namespace Exception {
  export const Code = 0;
  export const Name = 'Nats Error';
}
