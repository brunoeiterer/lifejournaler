'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useModalError } from '@/app/contexts/ModalErrorContext';
import { deleteAccount } from '@/services/BackendApiService';
import { DeleteAccountButton, DeleteAccountConfirmation, DeleteAccountConfirmationContainer, DeleteAccountContainer } from './DeleteAccount.styles';

interface DeleteAccountProps {
    onSuccess: () => void;
}

export default function DeleteAccount({ onSuccess} : DeleteAccountProps) {
    const { translations } = useLanguage();
    const { signOut } = useAuth();
    const { setErrorMessage } = useModalError();

    const handleDelete = async () => {
        const success = await deleteAccount();

        if(success) {
            onSuccess();
            signOut();
        }
        else {
            setErrorMessage(translations['ErrorDeletingAccount']);
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
        </DeleteAccountContainer>
    );
}
