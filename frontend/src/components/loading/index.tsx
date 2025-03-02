import { useAppStore } from "../../stores/app.store";
import { ActivityIndicator, Overlay } from "./styles";

export const Loading = () => {
  const isLoading = useAppStore((state) => state.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <Overlay>
      <ActivityIndicator />
    </Overlay>
  );
};
