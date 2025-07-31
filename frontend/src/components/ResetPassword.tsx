import { useLanguage } from '@/app/contexts/LanguageContext';
import { requestPasswordReset, resetPassword } from '@/services/BackendApiService';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const ResetPassword = () => {
    const { language, translations } = useLanguage();

    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState<'request' | 'reset'>('request'); // Step of the process
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleRequestCode = async () => {
        const codeSent = await requestPasswordReset(email, language);
        if (codeSent) {
            setStep('reset');
        } 
        else {
            setError(translations['FailedToSendResetCode']);
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError(translations['PasswordsDoNotMatch']);
            return;
        }

        const passwordReseted = await resetPassword(email, verificationCode, newPassword);
        if (passwordReseted) {
            setSuccess(true);
        } 
        else {
            setError(translations['FailedToResetPassword']);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom align='center'>Password Reset</Typography>

            {success ? (
                <p>{translations['PasswordResetSuccessfully']}</p>
            ) : step === 'request' ? (
                <>
                    <FormControl fullWidth>
                        <TextField
                            type="email"
                            placeholder={translations['EnterYourEmail']}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            variant="outlined"
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <Button onClick={handleRequestCode}
                            style={{ marginTop: '10px' }}
                            variant="contained"
                            color="primary">
                            {translations['RequestResetCode']}
                        </Button>
                    </FormControl>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder={translations['EnterResetCode']}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        style={{ width: '100%', padding: '10px', margin: '10px 0' }}
                    />
                    <input
                        type="password"
                        placeholder={translations['NewPassword']}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px', margin: '10px 0' }}
                    />
                    <input
                        type="password"
                        placeholder={translations['ConfirmNewPassword']}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px', margin: '10px 0' }}
                    />
                    <button onClick={handleResetPassword} style={{ width: '100%', padding: '10px', marginTop: '10px' }}>
                        {translations['ResetPassword']}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
            )}
        </div>
    );
};

export default ResetPassword;
