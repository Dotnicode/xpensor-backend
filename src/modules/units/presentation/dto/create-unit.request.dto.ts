import { Transform, Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsUUID,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { IUnit } from 'src/shared/interfaces/unit.interface';
import { ResponsiblePartySnapshotDto } from './responsible-party-snapshot.dto';

export class CreateUnitRequestDto implements Partial<IUnit> {
  @IsUUID()
  consortiumId: string;

  @IsNumberString()
  @MinLength(1)
  floor: string;

  @IsAlphanumeric()
  @MinLength(1)
  @Transform(({ value }: { value: string }) => value.toUpperCase())
  division: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  percentage: number;

  @IsObject()
  @ValidateNested()
  @Type(() => ResponsiblePartySnapshotDto)
  @IsOptional()
  responsibleParty?: ResponsiblePartySnapshotDto;
}
