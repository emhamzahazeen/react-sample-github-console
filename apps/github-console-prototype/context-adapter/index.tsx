import { createContext } from 'react';
import networkService from '../services/github';
import { INetworkService } from '../common/interfaces/services';

const NetworkServiceContext = createContext<INetworkService | null>(null);

const NetworkServiceProvider = ({ children }) => {
  return <NetworkServiceContext.Provider value={networkService}>{children}</NetworkServiceContext.Provider>;
};

export { NetworkServiceProvider, NetworkServiceContext };
