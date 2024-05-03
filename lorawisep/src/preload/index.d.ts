 
 export interface ElectronAPI {
    setParameters: (values: SimulationParameters) => Promise<void>,
    generateGraph: () => Promise<void>,
    handleResult: (imageData) => Promise<void>,
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



