namespace JournalerBackend.Messages;

public static class LocalizedMessages
{
    private static readonly Dictionary<string, string> _messagesEnUs = new()
    {
        { "PasswordResetEmailSubject", "LifeJournaler - Password Reset" },
        { "PasswordResetEmailBody", "Please find your password reset code below.\n"},
        { "PasswordResetEmailFooter", "If you didn’t request this change, please ignore this message.\n\n One day at a time,\n LifeJournaler"}
    };

    private static readonly Dictionary<string, string> _messagesPtBr = new()
    {
        { "PasswordResetEmailSubject", "LifeJournaler - Recuperação de Senha" },
        { "PasswordResetEmailBody", "Por favor, veja seu código de recuperação de senha abaixo.\n"},
        { "PasswordResetEmailFooter", "Caso não tenha requisitado esta alteração, por favor, ignore esta mensagem.\n\n Um dia de cada vez,\n LifeJournaler"}
    };

    public static string GetMessage(string key, string locale) => locale switch
    {
        "en-US" => _messagesEnUs[key],
        "pt-BR" => _messagesPtBr[key],
        _ => throw new ArgumentOutOfRangeException($"{locale} is not a valid value for nameof{locale}")
    };
}