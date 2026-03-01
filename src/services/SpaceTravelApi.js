import SpaceTravelMockApi from "./SpaceTravelMockApi.js";


// getPlanets	getPlanets (): Array<planet>	Fetches all planets.
// getSpacecrafts	getSpacecrafts (): Array<spacecraft>	Fetches all spacecraft.
// getSpacecraftById	getSpacecraftById ({id: <string>}): <spacecraft>	Fetches a spacecraft by its ID.
// buildSpacecraft	createSpacecraft ({name: <string>, capacity: <int>, description <string>, pictureUrl: [<string>]}):
//  void (means pictureUrl is optional)	Builds a spacecraft on the Earth by generating an ID.
//  destroySpacecraftById	destroySpacecraftById ({id: <int>}): void	Deletes a spacecraft by its ID.
// sendSpacecraftToPlanet	sendSpacecraftToPlanet ({spacecraftId: <string>, targetPlanetId: <int>}): void	Transfer people
//  by sending the spacecraft from its currently located planet to the target planet.
// - If the capacity is greater than the current population of the currently located planet, it fills as much as it gets.
// - Throws an error if the target planet is the same as the currently located planet.


class SpaceTravelApi
{
  static async getPlanets ()
  {
    return SpaceTravelMockApi.getPlanets();
  }

  static async getSpacecrafts ()
  {
    try {
      return SpaceTravelMockApi.getSpacecrafts();
    } catch (error) {
      throw new Error("Failed to fetch spacecrafts. Please try again later.");
    }
  }

  static async getSpacecraftById ({id})
  {
    return SpaceTravelMockApi.getSpacecraftById({id});
  }

  static async buildSpacecraft ({name, capacity, description, pictureUrl = undefined})
  {
    return SpaceTravelMockApi.buildSpacecraft({name, capacity, description, pictureUrl});
  }

  static async destroySpacecraftById ({id})
  {
    return SpaceTravelMockApi.destroySpacecraftById({id});
  }

  static async sendSpacecraftToPlanet ({spacecraftId, targetPlanetId})
  {
    return SpaceTravelMockApi.sendSpacecraftToPlanet({spacecraftId, targetPlanetId});
  }
}

export default SpaceTravelApi;
