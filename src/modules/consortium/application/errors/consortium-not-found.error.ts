export class ConsortiumNotFoundError extends Error {
  constructor(id: string) {
    super(`Consortium with ID '${id}' not found.`);
    this.name = 'ConsortiumNotFoundError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
