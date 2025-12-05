import type { AppConfig } from './lib/types';

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'DarkWings',
  pageTitle: 'Voice/Conversational commerce demo | DarkWings',
  pageDescription:
    'Live example of voice and conversational commerce available for everyone to understand the benefits of modern e-commerce approaches.',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/darkwings_logo.png',
  accent: '#0066cc',
  logoDark: '/darkwings_logo.png',
  accentDark: '#004c99',
  startButtonText: 'Start demo',
};
