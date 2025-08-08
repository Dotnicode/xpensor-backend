export abstract class RepositoryBaseMapper<TDomain, TOrm> {
  abstract toDomain(orm: TOrm): TDomain;
  abstract toOrm(domain: TDomain): Partial<TOrm>;

  toDomainArray(orms: TOrm[]): TDomain[] {
    return orms.map((orm) => this.toDomain(orm));
  }

  toOrmArray(domains: TDomain[]): Partial<TOrm>[] {
    return domains.map((domain) => this.toOrm(domain));
  }
}
