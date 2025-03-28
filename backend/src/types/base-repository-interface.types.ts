export interface BaseRepositoryInterface<T> {
  create(data: T): Promise<T>;
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: number, data: T): Promise<T>;
  delete(id: number): Promise<T>;
}
