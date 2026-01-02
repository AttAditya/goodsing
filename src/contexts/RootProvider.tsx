import React, { ReactNode } from 'react';

interface RootProviderProps {
  children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  const mergeProviders = (
    ...providers: React.ComponentType<any>[]
  ): React.ReactElement => {
    if (!providers.length)
      return <>{children}</>;

    const Provider = providers.shift()!;
    return (
      <Provider>
        {mergeProviders(...providers)}
      </Provider>
    );
  };

  return mergeProviders();
}

