export class InvalidIdException extends Error {
  constructor() {
    super('Invalid ID, must be a valid UUID');
    this.name = 'InvalidIdException';
  }
}
