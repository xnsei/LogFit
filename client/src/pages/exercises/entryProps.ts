export interface EntryProps {
  exerciseId: string;
  numberOfEntriesREquested: number;
}

export interface ExerciseEntryProps {
  exerciseName: string;
  exerciseId: string;
  onDelete: (event: React.MouseEvent<HTMLElement>) => void;
}
