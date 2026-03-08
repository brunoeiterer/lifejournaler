import { DailyEntry } from "@/app/models/DailyEntry";
import { supabase } from "./supabaseClient";

export const login = async (username: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
    });

    if (error) {
        return error.message === 'Invalid login credentials'
            ? 'Invalid username or password.'
            : 'There was an error logging in. Please try again later.';
    }

    return '';
}

export const register = async (username: string, password: string, language: string) => {
    const { error } = await supabase.auth.signUp({
        email: username,
        password: password,
        options: {
            data: {
                language: language
            }
        }
    });

    return !error;
}

export const updateUserLanguage = async (language: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return false;
    }

    const { error } = await supabase.auth.updateUser({
        data: { language: language }
    });

    return !error;
}

export const getEntries = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return {};
    }

    const { data, error } = await supabase
        .from('entries')
        .select('*');

    if (error) {
        console.log(error);
        return {};
    }

    const entries: Record<string, DailyEntry> = {};
    for (const row of data) {
        entries[row.date] = {
            Mood: row.mood,
            Weather: row.weather,
            SleepQuality: row.sleep_quality,
            Menstruation: row.menstruation,
            Exercise: row.exercise,
            AppetiteLevel: row.appetite_level,
            AnxietyThoughts: row.anxiety_thoughts,
            DepressiveThoughts: row.depressive_thoughts,
            Autocriticism: row.autocriticism,
            SensorialOverload: row.sensorial_overload,
            RacingThoughts: row.racing_thoughts,
            Notes: row.notes,
        };
    }

    return entries;
}

export const addEntry = async (date: string, entry: DailyEntry) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return false;
    }

    const { error } = await supabase
        .from('entries')
        .insert({
            user_id: session.user.id,
            date: date,
            mood: entry.Mood,
            weather: entry.Weather,
            sleep_quality: entry.SleepQuality,
            menstruation: entry.Menstruation,
            exercise: entry.Exercise,
            appetite_level: entry.AppetiteLevel,
            anxiety_thoughts: entry.AnxietyThoughts,
            depressive_thoughts: entry.DepressiveThoughts,
            autocriticism: entry.Autocriticism,
            sensorial_overload: entry.SensorialOverload,
            racing_thoughts: entry.RacingThoughts,
            notes: entry.Notes,
        });

    if (error) {
        console.log(error);
        return false;
    }

    return true;
}

export const requestPasswordReset = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });
    return !error;
}

export const resetPassword = async (_email: string, _authenticationCode: string, newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return !error;
}

export const deleteEntry = async (id: number) => {
    const { error } = await supabase
        .from('entries')
        .delete()
        .eq('id', id);

    if (error) {
        console.log(error);
        return false;
    }

    return true;
}

export const editEntry = async (date: string, entry: DailyEntry) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return false;
    }

    const { error } = await supabase
        .from('entries')
        .update({
            mood: entry.Mood,
            weather: entry.Weather,
            sleep_quality: entry.SleepQuality,
            menstruation: entry.Menstruation,
            exercise: entry.Exercise,
            appetite_level: entry.AppetiteLevel,
            anxiety_thoughts: entry.AnxietyThoughts,
            depressive_thoughts: entry.DepressiveThoughts,
            autocriticism: entry.Autocriticism,
            sensorial_overload: entry.SensorialOverload,
            racing_thoughts: entry.RacingThoughts,
            notes: entry.Notes,
        })
        .eq('user_id', session.user.id)
        .eq('date', date);

    if (error) {
        console.log(error);
        return false;
    }

    return true;
}

export const deleteAccount = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return false;
    }

    const response = await supabase.functions.invoke('delete-account');
    return !response.error;
}

export const refresh = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        return session.user.email ?? '';
    }

    return '';
}

export const signOut = async () => {
    await supabase.auth.signOut();
}