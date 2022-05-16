export interface FlowService {
  postFlow(flowId: string, data: any): Promise<any>;
}
