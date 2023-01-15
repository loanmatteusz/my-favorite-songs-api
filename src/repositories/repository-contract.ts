export interface RepositoryContract<T, CreateDto, UpdateDto> {
  create: (createDto: CreateDto) => Promise<T>
  findAll: () => Promise<Partial<T>[]>
  find: (id: string) => Promise<Partial<T>>
  update: (id: string, updateDto: UpdateDto) => Promise<Partial<T>>
  delete: (id: string) => Promise<string>
}
