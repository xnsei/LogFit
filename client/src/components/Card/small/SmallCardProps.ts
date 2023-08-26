import { ReactNode } from "react";

interface WeightData {
  entry: string;
  date: string;
}

interface ExerciseData {
  entry: string;
}

type DataItem = WeightData | ExerciseData;

export interface SmallCardProps {
  title: string;
  entryModal: ReactNode;
  onDelete: (event: React.MouseEvent<HTMLElement>) => void;
  subTitile: string;
  isWeights: boolean;
  namesList: { url: string; _id: string; data: DataItem }[];
}
