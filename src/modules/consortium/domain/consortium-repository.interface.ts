import { Consortium } from './consortium.entity';

export interface IConsortiumRepository {
  save(consortium: Consortium): Promise<void>;
  findAll(): Promise<Consortium[]>;
  findAllByAdministratorId(administratorId: string): Promise<Consortium[]>;
  findById(id: string): Promise<Consortium | null>;
  update(consortium: Consortium): Promise<void>;
  delete(id: string): Promise<void>;
}
