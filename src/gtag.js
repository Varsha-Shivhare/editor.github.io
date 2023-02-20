export const GA_ID = process.env.GA_TRACKING_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag("config", GA_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label }) => {
  console.log('Custom Event Log: ', action, category, label)
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    debug_mode: true
  });
};