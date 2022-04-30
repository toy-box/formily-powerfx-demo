export interface MetaService {
  findById(repoId: string, id: string): Promise<Record<string, any>>;
  find(repoId: string, query: any): Promise<Record<string, any>>;
  deleteById(repoId: string, id: string): Promise<any>;
  updateOne(repoId: string, id: string, data: Record<string, any>): Promise<Record<string, any>>;
  replaceOne(repoId: string, id: string, data: Record<string, any>): Promise<Record<string, any>>;
}
