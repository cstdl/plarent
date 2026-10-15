export type Profile = {
  name: string;
  avatarUrl: string | null;
  plantCount: number;
  points: number;
  formerPlantCount: number;
};

// Placeholder until profile data is served by the backend.
export const MOCK_PROFILE: Profile = {
  name: "Mutti",
  avatarUrl: null,
  plantCount: 3,
  points: 100,
  formerPlantCount: 2,
};
