import type { Metric } from 'web-vitals';
import { getAnalyticsId } from '../utils';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed() {
  return (navigator as any).connection?.effectiveType || '';
}

export function sendToVercelAnalytics(metric: Metric) {
  const analyticsId = getAnalyticsId();
  if (
    !analyticsId ||
    analyticsId === '__ANALYTICS_ID__' ||
    analyticsId === 'undefined'
  ) {
    return;
  }

  const body = {
    dsn: analyticsId,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  };

  const blob = new Blob([new URLSearchParams(body).toString()], {
    // This content type is necessary for `sendBeacon`
    type: 'application/x-www-form-urlencoded',
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
}
