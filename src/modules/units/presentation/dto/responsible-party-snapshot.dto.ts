import { IsEmail, IsString, MinLength } from 'class-validator';
import { ResponsiblePartySnapshot } from '../../domain/interfaces/responsible-party-snapshot.type';

export class ResponsiblePartySnapshotDto implements ResponsiblePartySnapshot {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  phone: string;
}
