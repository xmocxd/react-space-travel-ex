const initialPlanets = [
  { id: 0, name: 'Mercury', currentPopulation: 0, pictureUrl: null },
  { id: 1, name: 'Venus', currentPopulation: 0, pictureUrl: null },
  { id: 2, name: 'Earth', currentPopulation: 100000, pictureUrl: null },
  { id: 3, name: 'Mars', currentPopulation: 0, pictureUrl: null },
  { id: 4, name: 'Jupiter', currentPopulation: 0, pictureUrl: null },
  { id: 5, name: 'Saturn', currentPopulation: 0, pictureUrl: null },
  { id: 6, name: 'Uranus', currentPopulation: 0, pictureUrl: null },
  { id: 7, name: 'Neptune', currentPopulation: 0, pictureUrl: null },
];
const initialSpacecraft = [
  { id: 'prispax', name: 'Prispax', capacity: 10000, description: 'A vessel.', currentLocation: 2, pictureUrl: null },
];

let mockPlanets = initialPlanets.map((p) => ({ ...p }));
let mockSpacecraft = initialSpacecraft.map((s) => ({ ...s }));

export function resetSpaceTravelApiMock() {
  mockPlanets = initialPlanets.map((p) => ({ ...p }));
  mockSpacecraft = initialSpacecraft.map((s) => ({ ...s }));
}

export default {
  getPlanets: () => Promise.resolve({ isError: false, data: mockPlanets }),
  getSpacecrafts: () => Promise.resolve({ isError: false, data: mockSpacecraft }),
  getSpacecraftById: ({ id }) =>
    Promise.resolve({
      isError: false,
      data: mockSpacecraft.find((s) => s.id === id) ?? null,
    }),
  buildSpacecraft: () => Promise.resolve({ isError: false, data: null }),
  destroySpacecraftById: () => Promise.resolve({ isError: false }),
  sendSpacecraftToPlanet: ({ spacecraftId, targetPlanetId }) => {
    const craft = mockSpacecraft.find((s) => s.id === spacecraftId);
    if (!craft) return Promise.resolve({ isError: true, data: new Error('Spacecraft not found') });
    const targetId = Number(targetPlanetId);
    if (craft.currentLocation === targetId) {
      return Promise.resolve({ isError: true, data: new Error('Already at destination') });
    }
    const origin = mockPlanets.find((p) => p.id === craft.currentLocation);
    const dest = mockPlanets.find((p) => p.id === targetId);
    if (!origin || !dest) return Promise.resolve({ isError: true, data: new Error('Invalid planet') });
    const transferred = Math.min(craft.capacity, origin.currentPopulation);
    origin.currentPopulation -= transferred;
    dest.currentPopulation += transferred;
    craft.currentLocation = targetId;
    return Promise.resolve({ isError: false });
  },
};
