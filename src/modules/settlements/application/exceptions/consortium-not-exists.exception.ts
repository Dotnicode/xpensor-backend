export class ConsortiumNotExistsException extends Error {
  constructor(consortiumId?: string) {
    super(
      consortiumId
        ? `Consortium with id ${consortiumId} not exists`
        : 'Consortium not exists',
    );
  }
}
