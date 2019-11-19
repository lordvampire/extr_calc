const API_HOSTNAME = 'http://localhost:5000/calculator/';
const API_VERSION = 'v1';

const constructUrl = url => `${API_HOSTNAME}${API_VERSION}${url}`;

export const PROFILE_TYPE_URL = constructUrl('/profile_types/profile_types');
export const CREATE_PROFILE_TYPE_URL = constructUrl('/profile_types');
export const DELETE_PROFILE_TYPE_URL = constructUrl('/profile_types/delete/%s');
export const UPDATE_PROFILE_TYPE_URL = constructUrl('/profile_types/update/%s');

export const ALLOY_URL = constructUrl('/alloys/alloys');
export const CREATE_ALLOY_URL = constructUrl('/alloys');
export const UPDATE_ALLOY_URL = constructUrl('/alloys/update/%s');
export const DELETE_ALLOY_URL = constructUrl('/alloys/delete/%s');

export const SURFACE_URL = constructUrl('/surfaces/surfaces');
export const CREATE_SURFACE_URL = constructUrl('/surfaces');
export const UPDATE_SURFACE_URL = constructUrl('/surfaces/update/%s');
export const DELETE_SURFACE_URL = constructUrl('/surfaces/delete/%s');

export const COMPLEXITY_URL = constructUrl('/complexities/complexities');
export const CREATE_COMPLEXITY_URL = constructUrl('/complexities');
export const UPDATE_COMPLEXITY_URL = constructUrl('/complexities/update/%s');
export const DELETE_COMPLEXITY_URL = constructUrl('/complexities/delete/%s');

export const PRESS_URL = constructUrl('/press/press');
export const CREATE_PRESS_URL = constructUrl('/press');
export const UPDATE_PRESS_URL = constructUrl('/press/update/%s');
export const DELETE_PRESS_URL = constructUrl('/press/delete/%s');