/**
 * Utility functions for NFT marketplace
 */

/**
 * Generates a random countdown time for demo purposes
 * Returns time in format: "Xh : Ym : Zs"
 */
export function generateRandomCountdown(): string {
  const hours = Math.floor(Math.random() * 8) + 1; // 1-8 hours
  const minutes = Math.floor(Math.random() * 60); // 0-59 minutes
  const seconds = Math.floor(Math.random() * 60); // 0-59 seconds
  
  return `${hours}h : ${minutes}m : ${seconds}s`;
}

/**
 * Generates creator name from product tags
 * Uses first tag and adds "Creator" suffix
 */
export function generateCreatorName(tags: string[]): string {
  if (tags.length === 0) return 'Unknown Creator';
  
  const creatorNames: Record<string, string> = {
    sporty: 'SportyStyle',
    xmas: 'HolidayJoy',
    santa: 'SantaWorkshop',
    camping: 'OutdoorAdventure',
    student: 'StudyMaster',
    monster: 'MonsterLab',
    halloween: 'SpookyArtist',
    queen: 'RoyalDesign',
    king: 'KingdomCreator',
    baby: 'BabyDream',
    angel: 'HeavenlyArt',
    blue: 'BlueOcean',
    friend: 'FriendlyVibes',
    love: 'LoveArtisan',
    music: 'MusicMaker',
    summer: 'SummerBreeze',
    snow: 'WinterWonder',
    cold: 'FrostyDesign',
  };

  const firstTag = tags[0].toLowerCase();
  return creatorNames[firstTag] || `${tags[0]} Creator`;
}

/**
 * Determines if creator should be verified based on rating
 */
export function isVerified(rating: number): boolean {
  return rating >= 4.5;
}
