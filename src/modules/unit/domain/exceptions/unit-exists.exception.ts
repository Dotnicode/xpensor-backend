type UnitInfo = {
  floor: string;
  apartment: string;
};

export class UnitExistsException extends Error {
  constructor(unitInfo?: UnitInfo) {
    const message = unitInfo
      ? `Unit already exists: floor ${unitInfo.floor}, apartment ${unitInfo.apartment}`
      : 'Unit already exists';
    super(message);
  }
}
