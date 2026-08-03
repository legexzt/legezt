/**
 * 200m GPS Geofence Verification Service
 * Default Campus Coordinates: LIET Hyderabad (17.385044, 78.486671)
 */

export interface GeofenceConfig {
  campusLat: number;
  campusLon: number;
  maxRadiusMeters: number;
  campusName: string;
}

export const DEFAULT_CAMPUS_GEOFENCE: GeofenceConfig = {
  campusLat: 17.385044,
  campusLon: 78.486671,
  maxRadiusMeters: 200.0, // Strict 200-meter radius requirement
  campusName: "LIET College Campus",
};

export interface GeofenceVerificationResult {
  verified: boolean;
  distanceMeters: number;
  maxAllowedRadiusMeters: number;
  campusName: string;
  userLat: number;
  userLon: number;
  statusMessage: string;
  timestamp: string;
}

/**
 * Calculates the exact distance in meters between two GPS coordinates using the Haversine formula
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const EARTH_RADIUS_METERS = 6371000; // Earth radius in meters

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * c;
}

/**
 * Verifies if student's current GPS position is within the allowed campus geofence radius
 */
export function verifyStudentGeofence(
  userLat: number,
  userLon: number,
  config: GeofenceConfig = DEFAULT_CAMPUS_GEOFENCE
): GeofenceVerificationResult {
  // Input validation & crash guard
  if (
    typeof userLat !== "number" ||
    typeof userLon !== "number" ||
    isNaN(userLat) ||
    isNaN(userLon) ||
    userLat < -90 ||
    userLat > 90 ||
    userLon < -180 ||
    userLon > 180
  ) {
    return {
      verified: false,
      distanceMeters: Infinity,
      maxAllowedRadiusMeters: config.maxRadiusMeters,
      campusName: config.campusName,
      userLat: userLat || 0,
      userLon: userLon || 0,
      statusMessage: "Invalid or missing GPS coordinates provided.",
      timestamp: new Date().toISOString(),
    };
  }

  const distanceMeters = calculateHaversineDistance(
    userLat,
    userLon,
    config.campusLat,
    config.campusLon
  );

  const verified = distanceMeters <= config.maxRadiusMeters;

  const statusMessage = verified
    ? `SUCCESS: Location verified within ${distanceMeters.toFixed(1)}m of ${config.campusName} (Limit: ${config.maxRadiusMeters}m).`
    : `VIOLATION: Student is ${distanceMeters.toFixed(1)}m away from ${config.campusName}, exceeding the allowed ${config.maxRadiusMeters}m geofence. Access Locked.`;

  return {
    verified,
    distanceMeters: parseFloat(distanceMeters.toFixed(2)),
    maxAllowedRadiusMeters: config.maxRadiusMeters,
    campusName: config.campusName,
    userLat,
    userLon,
    statusMessage,
    timestamp: new Date().toISOString(),
  };
}
