import Region, { TRegion } from "./models/Region";

async function parse(regions: TRegion[]) {
  for (let region of regions) {
    await Region.create(region);
  }
}

export default parse;
