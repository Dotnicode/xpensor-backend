type UnitInfo = {
  floor: string;
  division: string;
};

export class UnitExistsException extends Error {
  constructor(unitInfo?: UnitInfo) {
    const message = unitInfo
      ? `Unit already exists: floor ${unitInfo.floor}, apartment ${unitInfo.division}`
      : 'Unit already exists';
    super(message);
  }
}
