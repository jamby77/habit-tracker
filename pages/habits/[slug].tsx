import { useRouter } from "next/router";
import React from "react";
import { View } from "../../components/habits/View";
import { useAuth } from "../../lib/auth";
import { useHabit } from "../../lib/habits";

const ViewHabit = () => {
  const { user } = useAuth();
  const router = useRouter();

  const { slug } = router.query;
  const habit = useHabit(slug as string);

  if (!user || !habit) {
    return null;
  }
  return <View habit={habit} />;
};

export default ViewHabit;
