import { StyledButton } from "./CloseButton.styles";

interface CloseButtonProps {
    onClose: () => void;
}

export default function CloseButton({ onClose }: CloseButtonProps) {
    return (
        <StyledButton
            onClick={() =>  onClose()}
            className=""
        >
            ×
        </StyledButton>
    )
}