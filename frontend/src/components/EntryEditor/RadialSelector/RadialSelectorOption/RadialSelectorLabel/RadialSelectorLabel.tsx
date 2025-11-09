import { ReactNode } from "react";
import { RadialSelectDeselectedLabel, RadialSelectorSelectedLabel } from "./RadialSelectorLabel.styles";

interface RadialSelectorLabelProps {
    isSelected: boolean;
    children: ReactNode;
}

export default function RadialselectorLabel({ isSelected, children }: RadialSelectorLabelProps) {
    return(
        isSelected ?
            <RadialSelectorSelectedLabel> 
                { children }
            </RadialSelectorSelectedLabel>
            :
            <RadialSelectDeselectedLabel>
                { children }
            </RadialSelectDeselectedLabel>
    )
}