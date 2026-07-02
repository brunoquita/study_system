export const AUTH_COOKIE = "sistema_academico_session";

export function authConfig() {
  return {
    username: process.env.LOGIN_USER ?? "bruno.rocha",
    password: process.env.LOGIN_PASSWORD ?? "@123Mudar",
    sessionToken: process.env.AUTH_SECRET ?? "local-sistema-academico-session"
  };
}

export function isValidSession(value?: string) {
  return Boolean(value && value === authConfig().sessionToken);
}
