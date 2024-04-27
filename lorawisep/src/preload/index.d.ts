 
 export interface ElectronAPI {
    setParameters: (values: SimulationParameters) => Promise<void>,
    generateGraph: () => Promise<void>,
    handleResult: () => Promise<void>,
  }
declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }

  interface SimulationParameters {
    name: string;
    devices: string;    
    environment: string;
    width: string;
    heigth: string;
    qtdGateways: string;
    algorithmOptimization: string;
  }
}



