import { MetaService } from '../services/MetaService';

export const metaService: MetaService = {
  findById(repo: string, id: string) {
    return new Promise((resolve, reject) => {
      resolve({
        name: 'Jack',
        gender: 'male',
      });
    });
  },
  find(repoId: string, query: any): Promise<Record<string, any>> {
    throw new Error('Function not implemented.');
  },
  deleteById(repoId: string, id: string): Promise<any> {
    throw new Error('Function not implemented.');
  },
  updateOne(repoId: string, id: string, data: Record<string, any>): Promise<Record<string, any>> {
    throw new Error('Function not implemented.');
  },
  replaceOne(repoId: string, id: string, data: Record<string, any>): Promise<Record<string, any>> {
    throw new Error('Function not implemented.');
  },
};
