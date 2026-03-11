/**
 * Jest manual mock for SpaceTravelApi (used when jest.mock('../services/SpaceTravelApi') is called).
 */
const mockPlanets = [
  { id: 0, name: 'Mercury', currentPopulation: 0, pictureUrl: null },
  { id: 2, name: 'Earth', currentPopulation: 100000, pictureUrl: null },
];
const mockSpacecraft = [
  { id: 'prispax', name: 'Prispax', capacity: 10000, description: 'A vessel.', currentLocation: 2, pictureUrl: null },
];

export default {
  getPlanets: () => Promise.resolve({ isError: false, data: mockPlanets }),
  getSpacecrafts: () => Promise.resolve({ isError: false, data: mockSpacecraft }),
  getSpacecraftById: () => Promise.resolve({ isError: false, data: mockSpacecraft[0] }),
  buildSpacecraft: () => Promise.resolve({ isError: false, data: null }),
  destroySpacecraftById: () => Promise.resolve({ isError: false }),
  sendSpacecraftToPlanet: () => Promise.resolve({ isError: false }),
};
