'use client';

import { useState } from 'react';
import Drawer from '../components/Drawer';
import MoodStatistics, { moods } from '../components/MoodStatistics';
import JournalEntries, { JournalEntry } from '../components/JournalEntries';
import { AppBar, Box, Button, Dialog, Modal, Toolbar, Typography } from '@mui/material';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import { deleteAccount, getEntries } from '@/services/BackendApiService'; 
import ResetPassword from '@/components/ResetPassword';
import { css } from '@emotion/css';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from './contexts/LanguageContext';
import PrivacyPolicy from '@/components/PrivacyPolicy';

const Dashboard: React.FC = () => {
    const [view, setView] = useState('journal');

    const [moodsMap] = useState<Map<string, number>>(new Map(moods.map((m, i) => [m, i])));
    const [moodsArray, setMoodsArray] = useState<number[]>(new Array<number>(moods.length).fill(0));

    const [showSignInButton, setShowSignInButton] = useState(true);
    const [showDeleteAccountButton, setShowDeleteAccountButton] = useState(false);

    const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);
    const handleOpenDeleteAccountDialog = () => setShowDeleteAccountDialog(true);

    const [showSignInModal, setShowSignInModal] = useState(false);
    const handleOpenSignInModal = () => setShowSignInModal(true);
    const handleCloseSignInModal = () => setShowSignInModal(false);

    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const handleOpenSignUpModal = () => setShowSignUpModal(true);
    const handleCloseSignUpModal = () => setShowSignUpModal(false);

    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const handleOpenResetPasswordModal = () => setShowResetPasswordModal(true);
    const handleCloseResetPasswordModal = () => setShowResetPasswordModal(false);

    const [username, setUserName] = useState('');

    const [entries, setEntries] = useState<JournalEntry[]>([]);

    const addEntry = (newEntry: JournalEntry) => {
        setEntries(entries => [newEntry, ...entries]);
        moodsArray[(moodsMap.get(newEntry.mood) as number)] += 1
    }

    const removeEntry = (id: number) => {
        setEntries(entries.filter(e => e.id !== id));
    }

    const editEntry = (editedEntry: JournalEntry) => {
        const entriesCopy = [...entries];
        const entryIndex = entries.findIndex(e => e.id == editedEntry.id);
        entriesCopy[entryIndex] = editedEntry;
        setEntries(entriesCopy);
    }

    const onSignedIn = async (username: string) => {
        handleCloseSignInModal();
        setShowSignInButton(false);
        setShowDeleteAccountButton(true);
        setUserName(username);
        const userEntries = await getEntries(sessionStorage.getItem('loginToken') ?? '');
        for (const entry of userEntries) {
            addEntry(entry);
        }
    }

    const onSignedUp = () => {
        handleCloseSignUpModal();
        handleOpenSignInModal();
    }

    const handleSignOut = () => {
        setShowSignInButton(true);
        setShowDeleteAccountButton(false);
        sessionStorage.clear();
        setEntries([]);
        setMoodsArray(new Array<number>(moods.length).fill(0));
    }

    const onForgotPassword = () => {
        handleCloseSignInModal();
        handleOpenResetPasswordModal();
    }

    const handleDeleteAccountConfirmation = async (confirm: boolean) => {
        if(confirm) {
            var success = await deleteAccount(sessionStorage.getItem('loginToken') ?? '');
            if(success) {
                handleSignOut();
            }
        }

        setShowDeleteAccountDialog(false);
    }

    const { translations } = useLanguage();

    return (
            <div>
                <AppBar position="static">
                    <Toolbar className={css({display: 'flex', justifyContent: 'space-between'})}>
                        <div>
                            <div className={showSignInButton ? 'hidden' : undefined}>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    {username}
                                </Typography>
                                <Button color='inherit'
                                    onClick={handleSignOut}>
                                    {translations['SignOut']}
                                </Button>
                            </div>
                            <div className={showSignInButton ? undefined : 'hidden'}>
                                <Button color="inherit"
                                    onClick={handleOpenSignInModal}
                                >{translations['SignIn']}</Button>
                                <Button color="inherit"
                                    onClick={handleOpenSignUpModal}
                                >{translations['SignUp']}</Button>
                            </div>
                            <div className={showDeleteAccountButton ? undefined : 'hidden'}>
                                <Button color="inherit"
                                    onClick={handleOpenDeleteAccountDialog}
                                >{translations['DeleteAccount']}</Button>
                            </div>
                        </div>

                        <div>
                            <LanguageSwitcher />
                        </div>
                    </Toolbar>
                </AppBar>

                <Modal open={showSignInModal} onClose={handleCloseSignInModal}>
                    <Box>
                        <SignIn onSignedIn={onSignedIn} onForgotPassword={onForgotPassword} />
                    </Box>
                </Modal>

                <Modal open={showSignUpModal} onClose={handleCloseSignUpModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            borderRadius: '8px',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <SignUp onSignedUp={onSignedUp} />
                    </Box>
                </Modal>

                <Modal open={showResetPasswordModal} onClose={handleCloseResetPasswordModal}>
                    <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                borderRadius: '8px',
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            <ResetPassword />
                        </Box>
                </Modal>

                <Dialog open={showDeleteAccountDialog}>
                    {translations['DeleteAccountConfirmation']}
                    <Button onClick={() => handleDeleteAccountConfirmation(true)}>
                        {translations['Yes']}
                    </Button>
                    <Button onClick={() => handleDeleteAccountConfirmation(false)}>
                        {translations['No']}
                    </Button>
                </Dialog>

                <div style={{ display: 'flex'}}>
                    <Drawer onSelect={setView} />
                    <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
                        {view === 'journal' ? (
                            <>
                                <h2>{translations['JournalEntries']}</h2>
                                <JournalEntries entries={entries} addEntry={addEntry} removeEntry={removeEntry} editEntry={editEntry} />
                            </>
                        ) : view === 'statistics' ? (
                            <>
                                <h2>{translations['MoodStatistics']}</h2>
                                <MoodStatistics moods={moodsArray} />
                            </>
                        ) : (
                            <>
                                <PrivacyPolicy />
                            </>
                        )}
                    </div>
                </div>
            </div>
    );
};

export default Dashboard;
