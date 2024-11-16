import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { css } from "@emotion/css";

import { useLanguage } from '../app/contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const handleLanguageChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value);
    }

    return (
        <div>
            <Select
                labelId="language-select-label"
                value={language}
                label='Language'
                onChange={handleLanguageChange}
                className={css({ color: 'white', '.MuiSvgIcon-root': { fill: "white !important" } })}>
                <MenuItem value={'en-US'}>en-US</MenuItem>
                <MenuItem value={'pt-BR'}>pt-BR</MenuItem>
            </Select>
        </div>
    );
};

export default LanguageSwitcher;