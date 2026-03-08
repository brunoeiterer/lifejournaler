'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useState } from 'react';
import { deleteAccount } from '@/services/backendApiService';
import Toast from '../Common/Toast/Toast';
import { DeleteAccountButton, DeleteAccountConfirmation, DeleteAccountConfirmationContainer, DeleteAccountContainer } from './DeleteAccount.styles';

interface DeleteAccountProps {
    onSuccess: () => void;
}

export default function DeleteAccount({ onSuccess} : DeleteAccountProps) {
    const { translations } = useLanguage();
    const { signOut } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');

    const handleDelete = async () => {
        const success = await deleteAccount();

        if(success) {
            onSuccess();
            signOut();
        }
        else {
            setErrorMessage(translations['ErrorDeletingAccount'] || 'Error deleting account');
        }
    }

    return (
        <DeleteAccountContainer>
            <DeleteAccountConfirmationContainer>
                <DeleteAccountConfirmation>{translations['DeleteAccountConfirmation']}</DeleteAccountConfirmation>
            </DeleteAccountConfirmationContainer>

            <DeleteAccountButton
                onClick={handleDelete}
            >
                {translations['DeleteAccount']}
            </DeleteAccountButton>

            {errorMessage != '' && 
                <Toast 
                    message={errorMessage}
                    onClose={() => setErrorMessage('')}
                />
            }
        </DeleteAccountContainer>
    );
}
