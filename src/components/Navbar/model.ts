import React, { ReactNode } from 'react';

export type TabsType = {
  [key: string]: {
    title: string;
    render: ReactNode | null;
  };
};
