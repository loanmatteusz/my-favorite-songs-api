export interface RepositoryContract<T> {
  create: (createDto: Omit<T, "id">) => Promise<T>
  findAll: () => Promise<Partial<T>[]>
  find: (id: string) => Promise<Partial<T>>
  update: (id: string, updateDto: Partial<T>) => Promise<Partial<T>>
  delete: (id: string) => Promise<string>
}
