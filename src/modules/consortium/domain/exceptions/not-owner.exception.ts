export class NotOwnerException extends Error {
  constructor() {
    super('You are not the owner of this consortium');
    this.name = 'NotOwnerException';
  }
}
