import { Consortium } from './consortium.entity';

export interface IConsortiumRepository {
  create(consortium: Consortium): Promise<void>;
  listByUserId(userId: string): Promise<Consortium[]>;
  findById(id: string): Promise<Consortium | null>;
  update(consortium: Consortium): Promise<void>;
  delete(id: string): Promise<void>;
}
