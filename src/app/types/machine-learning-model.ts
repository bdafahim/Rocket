export class MachineLearningModel {
  id: number;
  name: string;
  description: string;
  state: string;
  tags: string[];
  url?: string;
  requestBody?: string;
  responseBody?: string;
}

export enum ModelStatus {
  ON = 'On',
  OFF = 'Off',
  STARTING = 'Starting',
  STOPPING = 'Stopping'
}
