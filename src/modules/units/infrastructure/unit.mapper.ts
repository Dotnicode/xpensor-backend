import { RepositoryBaseMapper } from 'src/shared/utils/repository-base-mapper.util';
import { Unit } from '../domain/entities/unit.entity';
import { IUnit } from '../domain/interfaces/unit.interface';
import { UnitOrmEntity } from './unit.schema';

export class UnitRepositoryMapper extends RepositoryBaseMapper<
  IUnit,
  UnitOrmEntity
> {
  toDomain(orm: UnitOrmEntity): Unit {
    return new Unit(
      orm.id,
      orm.consortiumId,
      orm.floor,
      orm.division,
      orm.percentage,
      orm.responsibleParty,
    );
  }
  toOrm(domain: IUnit): Partial<UnitOrmEntity> {
    return {
      consortiumId: domain.consortiumId,
      floor: domain.floor,
      division: domain.division,
      percentage: domain.percentage,
      responsibleParty: domain.responsibleParty ?? null,
    };
  }
}
