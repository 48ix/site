import { createContext, useContext, useMemo } from 'react';
import siteConfig from '../siteConfig';

import type { Config } from '~types';

const ConfigCtx = createContext<Config>({} as Config);
export const useConfig = (): Config => useContext(ConfigCtx);

export const ConfigProvider: React.FC = props => {
  const config = useMemo(() => siteConfig, []);
  return <ConfigCtx.Provider value={config}>{props.children}</ConfigCtx.Provider>;
};
