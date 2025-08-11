import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "689a6202a6354c296e709a41", 
  requiresAuth: true // Ensure authentication is required for all operations
});
