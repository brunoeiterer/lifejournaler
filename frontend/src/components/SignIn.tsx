'use client';

import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { login } from '@/services/BackendApiService';
import { Alert, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import LoadingButton from '@mui/lab/LoadingButton';

interface SignInProps {
    onSignedIn: (username: string) => void;
    onForgotPassword: () => void;
}

const SignIn: React.FC<SignInProps> = (signInProps: SignInProps) => {
    const { translations } = useLanguage();

    const providers = [{ id: 'credentials', name: 'Email and Password' }];

    const signIn: (provider: AuthProvider, formData: FormData) => void = async (provider, formData,) => {
        const password = formData.get('password')?.toString() ?? '';
        const username = formData.get('email')?.toString() ?? "";
        const error = await login(username, password);

        if(error != '') {
            setShowErrorAlert(true);
            setError(error)
            return;
        }

        signInProps.onSignedIn(username);
    }

    const forgotPassword = () => {
        return (
        <Button onClick={signInProps.onForgotPassword}>
          {translations['ForgotPassword']}
        </Button>
      );
    }

    const subtitle = () => {
        return (
          <Typography variant="body2" color="textSecondary" gutterBottom textAlign="center">
            {translations['SignInWelcome']}
          </Typography>
        )
    }

    const title = () => {
        return (
            <Typography
                variant="h5"
                color="textPrimary"
                sx={{
                mb: 1,
                fontWeight: 600,
                }}
            >
                {translations['SignIn']}
            </Typography>
        )
    }

    const submitButton = () => {
        return (
            <LoadingButton
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            disableElevation
            color="primary"
            sx={{
              mt: 3,
              mb: 2,
              textTransform: 'capitalize',
            }}
          >
            {translations['SignIn']}
          </LoadingButton>
        )
    }

    const theme = useTheme();

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [error, setError] = useState('');

    return (
        <AppProvider theme={theme}>
            <div className={showErrorAlert ? undefined : 'hidden'}>
                <Alert severity='error' onClose={() => { setShowErrorAlert(false) }}>
                    {error}
                </Alert>
            </div>
            <SignInPage signIn={signIn} providers={providers} 
                slots={{forgotPasswordLink: forgotPassword, subtitle: subtitle, title: title, submitButton: submitButton}} />
        </AppProvider>
    );
}

export default SignIn;