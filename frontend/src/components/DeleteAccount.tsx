'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useModalError } from '@/app/contexts/ModalErrorContext';
import { deleteAccount } from '@/services/BackendApiService';

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
        <div className="text-center">
            <p className="text-gray-700 mb-4">
                <strong className="text-red-600">{translations['DeleteAccountConfirmation']}</strong>
            </p>

            <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={handleDelete}
            >
                {translations['DeleteAccount']}
            </button>
        </div>
    );
}
