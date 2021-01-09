import React, { createContext, useContext, useEffect, useState } from "react";

const layoutContext = createContext({
  title: "",
  setTitle: (title: string) => {},
});

export function useProvideLayout() {
  const initialTitle = "Habit Tracker";
  const [title, setTitle] = useState(initialTitle);

  return {
    title,
    setTitle: (newTitle) => {
      setTitle(`${newTitle} | ${initialTitle}`);
    },
  };
}

export const LayoutProvider: React.FC = ({ children }) => {
  const layout = useProvideLayout();
  return (
    <layoutContext.Provider value={layout}>{children}</layoutContext.Provider>
  );
};

export const useLayout = () => {
  return useContext(layoutContext);
};

export const useTitle = (title) => {
  const { setTitle } = useLayout();
  useEffect(() => {
    setTitle(title);
  }, []);
};
