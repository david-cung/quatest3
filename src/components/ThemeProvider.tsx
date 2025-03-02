/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }: any) {
  const { theme } = useSelector((state: any) => state.theme);

  return (
    <div className={theme}>
      <div className='bg-white text-gray-700 dark:text-gray-100 dark:bg-[rgb(16,23,42)] min-h-screen'>
        {children}
      </div>
    </div>
  );
}
