export interface ExerciseEntryProps {
  exerciseName: string;
  exerciseId: string;
  isCardio: boolean;
  onDelete: (event: React.MouseEvent<HTMLElement>) => void;
}
