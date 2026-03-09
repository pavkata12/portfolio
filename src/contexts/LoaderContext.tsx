import { createContext, useContext, type ReactNode } from "react";

type LoaderContextType = {
  loaderComplete: boolean;
};

const LoaderContext = createContext<LoaderContextType>({ loaderComplete: false });

export const LoaderProvider = ({
  loaderComplete,
  children,
}: {
  loaderComplete: boolean;
  children: ReactNode;
}) => (
  <LoaderContext.Provider value={{ loaderComplete }}>{children}</LoaderContext.Provider>
);

export const useLoaderComplete = () => useContext(LoaderContext).loaderComplete;
