import { ReactNode } from "react";

interface WeightData {
  entry: string;
  date: string;
}

export interface BigCardProps {
  entryModal: ReactNode;
  title: string;
  addEntryText: string;
  onDelete: (event: React.MouseEvent<HTMLElement>) => void;
  subTitile: string;
  namesList: {
    onEntryDelete: (event: React.MouseEvent<HTMLElement>) => void;
    _id: string;
    data: WeightData;
  }[];
}
