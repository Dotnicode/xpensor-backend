import { IConsortium } from './consortium.interface';

export interface IConsortiumRepository {
  create(consortium: IConsortium): Promise<void>;
  listByUserId(userId: string): Promise<IConsortium[]>;
  findById(id: string): Promise<IConsortium | null>;
  update(consortium: IConsortium): Promise<void>;
  delete(id: string): Promise<void>;
}
