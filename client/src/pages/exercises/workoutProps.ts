export interface WorkoutProps {
  id: string;
  baseUrl?: string;
  onCloseModal: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface WorkoutExercisesProps {
  id: string;
  baseUrl?: string;
}
