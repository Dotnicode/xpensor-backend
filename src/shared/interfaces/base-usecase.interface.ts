export abstract class BaseUseCase {
  abstract execute(...args: any[]): Promise<any>;
}

export type UseCaseParams<T> = T extends BaseUseCase
  ? Parameters<T['execute']>
  : never;

export type UseCaseResult<T> = T extends BaseUseCase
  ? ReturnType<T['execute']>
  : never;
