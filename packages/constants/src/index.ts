export const APP_NAME = 'Turborepo Starter Kit';
export const APP_VERSION = '1.0.0';
export const API_PREFIX = '/api';
export const API_VERSION = 'v1';

export const SHARED_MESSAGE = {
  welcome: 'Welcome to the Turborepo starter kit.',
  database: 'PostgreSQL database adapter is active.',
};

export const API_CONFIG = {
  baseUrl: `${API_PREFIX}/${API_VERSION}`,
  healthPath: `${API_PREFIX}/${API_VERSION}/health`,
} as const;
