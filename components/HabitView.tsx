import { useHabits } from "../lib/HabitProvider";
import { HabitType } from "../lib/habits";

export const HabitView = ({ habit }: { habit: HabitType }) => {
  const { toggleHabit } = useHabits();

  return <pre>{JSON.stringify(habit, null, 2)}</pre>;
};
