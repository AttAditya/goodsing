export function RootProvider({ children }) {
  const mergeProviders = (...providers) => {
    if (!providers.length)
      return children;

    const Provider = providers.shift();
    return (<>
      <Provider>
        {mergeProviders(...providers)}
      </Provider>
    </>);
  };

  return mergeProviders();
}

