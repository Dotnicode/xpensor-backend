export class ConsortiumNotExistsException extends Error {
  constructor(id: string) {
    super(`Consortium with ID '${id}' not exists.`);
  }
}
