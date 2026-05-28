import { createContext, useContext, type RefObject, type ReactNode } from "react";

type ScrollContainerContextType = {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

const ScrollContainerContext = createContext<ScrollContainerContextType | null>(null);

export const ScrollContainerProvider = ({
  scrollContainerRef,
  children,
}: {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) => (
  <ScrollContainerContext.Provider value={{ scrollContainerRef }}>
    {children}
  </ScrollContainerContext.Provider>
);

export const useScrollContainer = () => {
  const ctx = useContext(ScrollContainerContext);
  return ctx?.scrollContainerRef ?? null;
};
