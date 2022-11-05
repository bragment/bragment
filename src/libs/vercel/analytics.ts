import { getAnalyticsId } from '../utils';

export function initializeVercelAnalytics() {
  const analyticsId = getAnalyticsId();
  if (
    process.env.NODE_ENV === 'production' &&
    analyticsId &&
    analyticsId !== '__ANALYTICS_ID__' &&
    analyticsId !== 'undefined'
  ) {
    import('@vercel/analytics').then(({ inject }) => inject());
  }
}
