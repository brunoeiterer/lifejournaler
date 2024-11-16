'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PasswordIcon from '@mui/icons-material/Password';
import Stack from '@mui/material/Stack';
import { LinkProps } from '@mui/material/Link';
import { Button } from '@mui/material';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { LoadingButtonProps } from '@mui/lab/LoadingButton';

type SupportedOAuthProvider =
  | 'github'
  | 'google'
  | 'facebook'
  | 'gitlab'
  | 'twitter'
  | 'apple'
  | 'instagram'
  | 'tiktok'
  | 'linkedin'
  | 'slack'
  | 'spotify'
  | 'twitch'
  | 'discord'
  | 'line'
  | 'auth0'
  | 'cognito'
  | 'keycloak'
  | 'okta'
  | 'fusionauth'
  | 'microsoft-entra-id';

export type SupportedAuthProvider =
  | SupportedOAuthProvider
  | 'credentials'
  | 'passkey'
  | 'nodemailer';

const IconProviderMap = new Map<SupportedAuthProvider, React.ReactNode>([
  ['credentials', <PasswordIcon key="credentials" />]
]);

export interface AuthProvider {
  /**
   * The unique identifier of the authentication provider.
   * @default undefined
   * @example 'google'
   * @example 'github'
   */
  id: SupportedAuthProvider;
  /**
   * The name of the authentication provider.
   * @default ''
   * @example 'Google'
   * @example 'GitHub'
   */
  name: string;
}

export interface AuthResponse {
  /**
   * The error message if the sign-in failed.
   * @default ''
   */
  error?: string;
  /**
   * The type of error if the sign-in failed.
   * @default ''
   */
  type?: string;
  /**
   * The success notification if the sign-in was successful.
   * @default ''
   * Only used for magic link sign-in.
   * @example 'Check your email for a magic link.'
   */
  success?: string;
}

export interface SignUpPageSlots {
  /**
   * The custom email field component used in the credentials form.
   * @default TextField
   */
  emailField?: React.JSXElementConstructor<TextFieldProps>;
  /**
   * The custom password field component used in the credentials form.
   * @default TextField
   */
  passwordField?: React.JSXElementConstructor<TextFieldProps>;
  /**
   * The custom submit button component used in the credentials form.
   * @default LoadingButton
   */
  submitButton?: React.JSXElementConstructor<LoadingButtonProps>;
  /**
   * The custom forgot password link component used in the credentials form.
   * @default Link
   */
  forgotPasswordLink?: React.JSXElementConstructor<LinkProps>;
  /**
   * The custom sign up link component used in the credentials form.
   * @default Link
   */
  signUpLink?: React.JSXElementConstructor<LinkProps>;
}

export interface SignUpPageProps {
  /**
   * The list of authentication providers to display.
   * @default []
   */
  providers?: AuthProvider[];
  /**
   * Callback fired when a user signs in.
   * @param {AuthProvider} provider The authentication provider.
   * @param {FormData} formData The form data if the provider id is 'credentials'.\
   * @param {string} callbackUrl The URL to redirect to after signing up.
   * @returns {void|Promise<AuthResponse>}
   * @default undefined
   */
  signUp?: (
    provider: AuthProvider,
    formData?: FormData,
    callbackUrl?: string,
  ) => void | Promise<AuthResponse> | undefined;
  /**
   * The components used for each slot inside.
   * @default {}
   * @example { forgotPasswordLink: <Link href="/forgot-password">Forgot password?</Link> }
   * @example { signUpLink: <Link href="/sign-up">Sign up</Link> }
   */
  slots?: SignUpPageSlots;
  /**
   * The props used for each slot inside.
   * @default {}
   * @example { emailField: { autoFocus: false } }
   * @example { passwordField: { variant: 'outlined' } }
   * @example { emailField: { autoFocus: false }, passwordField: { variant: 'outlined' } }
   */
  slotProps?: {
    emailField?: TextFieldProps;
    passwordField?: TextFieldProps;
    submitButton?: LoadingButtonProps;
    forgotPasswordLink?: LinkProps;
    signUpLink?: LinkProps;
  };
}

function SignUpPage(props: SignUpPageProps) {
  const { translations} = useLanguage();
  const { providers, signUp, slots, slotProps } = props;
  const credentialsProvider = providers?.find((provider) => provider.id === 'credentials');
  const [{ loading, selectedProviderId, error }, setFormStatus] = React.useState<{
    loading: boolean;
    selectedProviderId?: SupportedAuthProvider;
    error?: string;
  }>({
    selectedProviderId: undefined,
    loading: false,
    error: ''
  });

  //const callbackUrl = router?.searchParams.get('callbackUrl') ?? '/';
  const singleProvider = React.useMemo(() => providers?.length === 1, [providers]);
  const isOauthProvider = React.useCallback(
    (provider?: SupportedAuthProvider) =>
      provider && provider !== 'credentials' && provider !== 'nodemailer' && provider !== 'passkey',
    [],
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography variant="h5" color="textPrimary" gutterBottom textAlign="center">
          {translations['SignUp']}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom textAlign="center">
          {translations['SingUpWelcome']}
        </Typography>
        <Box sx={{ mt: 2, width: '100%' }}>
          <Stack spacing={1}>
            {error && isOauthProvider(selectedProviderId) ? (
              <Alert severity="error">{error}</Alert>
            ) : null}
            {Object.values(providers ?? {})
              .filter((provider) => isOauthProvider(provider.id))
              .map((provider) => {
                return (
                  <form
                    key={provider.id}
                    onSubmit={async (event) => {
                      event.preventDefault();
                      setFormStatus({ error: '', selectedProviderId: provider.id, loading: true });
                      const oauthResponse = await signUp?.(provider, undefined, undefined);
                      setFormStatus((prev) => ({
                        ...prev,
                        $loading: oauthResponse?.error ? false : prev.loading,
                        error: oauthResponse?.error,
                      }));
                    }}
                  >
                    <Button
                      key={provider.id}
                      variant="contained"
                      type="submit"
                      fullWidth
                      size="large"
                      disableElevation
                      color={singleProvider ? 'primary' : 'inherit'}
                      value={provider.id}
                      startIcon={IconProviderMap.get(provider.id)}
                      sx={{
                        textTransform: 'capitalize',
                        filter: 'opacity(0.9)',
                        transition: 'filter 0.2s ease-in',
                        '&:hover': {
                          filter: 'opacity(1)',
                        },
                      }}
                    >
                      <span>{translations['SignUpWith']}</span>
                    </Button>
                  </form>
                );
              })}
          </Stack>

          {credentialsProvider ? (
            <React.Fragment>
              {singleProvider ? null : <Divider sx={{ mt: 2, mx: 0, mb: 1 }}>or</Divider>}
              {error && selectedProviderId === 'credentials' ? (
                <Alert sx={{ my: 2 }} severity="error">
                  {error}
                </Alert>
              ) : null}
              <Box
                component="form"
                onSubmit={async (event) => {
                  setFormStatus({
                    error: '',
                    selectedProviderId: credentialsProvider.id,
                    loading: true,
                  });
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const credentialsResponse = await signUp?.(
                    credentialsProvider,
                    formData,
                    undefined,
                  );
                  setFormStatus((prev) => ({
                    ...prev,
                    loading: false,
                    error: credentialsResponse?.error,
                  }));
                }}
              >
                {slots?.emailField ? (
                  <slots.emailField {...slotProps?.emailField} />
                ) : (
                  <TextField
                    margin="dense"
                    required
                    slotProps={{
                      htmlInput: {
                        sx: (theme) => ({
                          paddingTop: theme.spacing(1.5),
                          paddingBottom: theme.spacing(1.5),
                        }),
                      },
                      inputLabel: {
                        sx: (theme) => ({
                          lineHeight: theme.typography.pxToRem(16),
                        }),
                      },
                    }}
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoFocus={false}
                    {...slotProps?.emailField}
                  />
                )}

                {slots?.passwordField ? (
                  <slots.passwordField {...slotProps?.passwordField} />
                ) : (
                  <TextField
                    margin="dense"
                    required
                    fullWidth
                    slotProps={{
                      htmlInput: {
                        sx: (theme) => ({
                          paddingTop: theme.spacing(1.5),
                          paddingBottom: theme.spacing(1.5),
                        }),
                      },
                      inputLabel: {
                        sx: (theme) => ({
                          lineHeight: theme.typography.pxToRem(16),
                        }),
                      },
                    }}
                    name="password"
                    label={translations['Password']}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...slotProps?.passwordField}
                  />
                )}

                {slots?.submitButton ? (
                  <slots.submitButton {...slotProps?.submitButton} />
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    disableElevation
                    color={singleProvider ? 'primary' : 'inherit'}
                    loading={loading && selectedProviderId === credentialsProvider.id}
                    sx={{
                      mt: 3,
                      mb: 2,
                      textTransform: 'capitalize',
                      filter: 'opacity(0.9)',
                      transition: 'filter 0.2s ease-in',
                      '&:hover': {
                        filter: 'opacity(1)',
                      },
                    }}
                    {...slotProps?.submitButton}
                  >
                    {translations['SignUp']}
                  </Button>
                )}

                {slots?.forgotPasswordLink || slots?.signUpLink ? (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    {slots?.forgotPasswordLink ? (
                      <slots.forgotPasswordLink {...slotProps?.forgotPasswordLink} />
                    ) : null}

                    {slots?.signUpLink ? <slots.signUpLink {...slotProps?.signUpLink} /> : null}
                  </Box>
                ) : null}
              </Box>
            </React.Fragment>
          ) : null}
        </Box>
      </Box>
    </Container>
  );
}

SignUpPage.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The list of authentication providers to display.
   * @default []
   */
  providers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOf([
        'apple',
        'auth0',
        'cognito',
        'credentials',
        'discord',
        'facebook',
        'fusionauth',
        'github',
        'gitlab',
        'google',
        'instagram',
        'keycloak',
        'line',
        'linkedin',
        'microsoft-entra-id',
        'nodemailer',
        'okta',
        'passkey',
        'slack',
        'spotify',
        'tiktok',
        'twitch',
        'twitter',
      ]).isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  /**
   * Callback fired when a user signs in.
   * @param {AuthProvider} provider The authentication provider.
   * @param {FormData} formData The form data if the provider id is 'credentials'.\
   * @param {string} callbackUrl The URL to redirect to after signing up.
   * @returns {void|Promise<AuthResponse>}
   * @default undefined
   */
  signUp: PropTypes.func,
  /**
   * The props used for each slot inside.
   * @default {}
   * @example { emailField: { autoFocus: false } }
   * @example { passwordField: { variant: 'outlined' } }
   * @example { emailField: { autoFocus: false }, passwordField: { variant: 'outlined' } }
   */
  slotProps: PropTypes.shape({
    emailField: PropTypes.object,
    forgotPasswordLink: PropTypes.object,
    passwordField: PropTypes.object,
    signUpLink: PropTypes.object,
    submitButton: PropTypes.object,
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   * @example { forgotPasswordLink: <Link href="/forgot-password">Forgot password?</Link> }
   * @example { signUpLink: <Link href="/sign-up">Sign up</Link> }
   */
  slots: PropTypes.shape({
    emailField: PropTypes.elementType,
    forgotPasswordLink: PropTypes.elementType,
    passwordField: PropTypes.elementType,
    signUpLink: PropTypes.elementType,
    submitButton: PropTypes.elementType,
  }),
};

export { SignUpPage };