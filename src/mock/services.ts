import { FlowService } from '../services';
import { MetaService } from '../services/MetaService';

export const metaService: MetaService = {
  findById(repo: string, id: string) {
    return new Promise((resolve, reject) => {
      resolve({
        firstName: '刘',
        lastName: '伯承',
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

export const flowService: FlowService = {
  postFlow(flow: string, data: any) {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  },
};
