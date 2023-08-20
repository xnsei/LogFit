export interface SmallCardProps {
  title: string;
  onDelete: (event: React.MouseEvent<HTMLElement>) => void;
  subTitile: string;
  namesList: string[];
}
