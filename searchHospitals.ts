const search = (list: any, postCode: number, type: string) => {
  const queue = [postCode];
  const result = [];
  const checked = new Set();

  while (queue.length > 0) {
    const currentPostCode = queue.shift();

    // if postcode and type matches, return it.
    for (const regions of list) {
      for (const hospital of regions.hospitals) {
        if (hospital.postCode === currentPostCode && hospital.type === type) {
          result.push(hospital);
        }
      }
    }

    // search neighbours
    for (const regions of list) {
      if (regions.postCode === currentPostCode) {
        for (const nbrPostCode of regions.neighbours) {
          // make sure that we are not queuing the same postal code again
          const checkedBefore = checked.has(nbrPostCode);
          if (!checkedBefore) queue.push(nbrPostCode);
          [currentPostCode, nbrPostCode].forEach((pc) => checked.add(pc));
        }
      }
    }
  }
  return result;
};

export default search;
