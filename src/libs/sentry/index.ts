import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { getEnvironment } from '../utils';

export function initializeSentry() {
  // NOTE: must load sentry before other codes, so don't use async import
  // sentry = await import('@sentry/browser');
  if (
    process.env.NODE_ENV === 'production' &&
    !window.localStorage.getItem('SENTRY_DISABLED')
  ) {
    try {
      Sentry.init({
        release: process.env.APP_VERSION,
        dsn: process.env.SENTRY_DSN,
        integrations: [new Integrations.BrowserTracing()],
        environment: getEnvironment() || undefined,
        tracesSampleRate: 1.0,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export function setSentryUser(user: Sentry.User) {
  Sentry.setUser(user);
}

export function unsetSentryUser() {
  Sentry.configureScope((scope) => scope.setUser(null));
}
