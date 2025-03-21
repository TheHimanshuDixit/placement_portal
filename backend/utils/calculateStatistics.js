const calculateStatistics = (packages) => {
  if (packages.length === 0) {
    return { highest: 0, lowest: 0, median: 0, average: 0 };
  }

  const sortedPackages = packages.slice().sort((a, b) => a - b);
  const highest = sortedPackages[sortedPackages.length - 1];
  const lowest = sortedPackages[0];
  const sum = sortedPackages.reduce((acc, pkg) => acc + pkg, 0);
  const average = sum / sortedPackages.length;
  const median = sortedPackages[Math.floor(sortedPackages.length / 2)];

  return { highest, lowest, median, average };
};

module.exports = { calculateStatistics };
