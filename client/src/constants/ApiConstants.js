const API_HOSTNAME = 'http://localhost:5000/calculator/';
const API_VERSION = 'v1';

const constructUrl = url => `${API_HOSTNAME}${API_VERSION}${url}`;

export const PROFILE_TYPE_URL = constructUrl('/profile_types');
export const ALLOY_URL = constructUrl('/alloys');
export const SURFACE_URL = constructUrl('/surfaces');
export const COMPLEXITY_URL = constructUrl('/complexities');