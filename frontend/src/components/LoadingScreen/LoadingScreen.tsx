import { LoadingScreenContainer, LoadingScreenContent, LoadingScreenContentContainer } from "./LoadingScreen.styles";

export default function LoadingScreen() {
  return (
    <LoadingScreenContainer>
      <LoadingScreenContentContainer>
        <LoadingScreenContent />
      </LoadingScreenContentContainer>
    </LoadingScreenContainer>
  );
}
