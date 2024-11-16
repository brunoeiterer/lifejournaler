import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import { AuthProvider, SignUpPage } from './SignUpPage';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { register } from '@/services/BackendApiService';

interface SignUpProps {
    onSignedUp: () => void;
}

const SignUp: React.FC<SignUpProps> = (signUpProps: SignUpProps) => {
    const { translations } = useLanguage();

    // preview-start
    const providers: AuthProvider[] = [{ id: 'credentials', name: 'Email and Password' }];
    // preview-end

    const signUp: (provider: AuthProvider, formData: FormData | undefined) => void = async (provider, formData) => {
        const password = formData?.get('password')?.toString() ?? '';
        const regex = new RegExp('^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$');
        const isPasswordInvalid = regex.test(password);

        if (isPasswordInvalid) {
            setError(translations['PasswordWrongFormat'])
            setShowErrorAlert(true);
            return;
        }

        const success = await register(formData?.get('email')?.toString() ?? '', password);

        if (success) {
            signUpProps.onSignedUp();
        }
        else {
            setError(translations['SignUpError']);
            setShowErrorAlert(true);
        }
    };

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [error, setError] = useState('');

    const theme = useTheme();
    return (
        <AppProvider theme={theme}>
            <div className={showErrorAlert ? undefined : 'hidden'}>
                <Alert severity='error' onClose={() => { setShowErrorAlert(false) }}>
                    {error}
                </Alert>
            </div>
            <SignUpPage signUp={signUp} providers={providers} />
        </AppProvider>
    );
}

export default SignUp;