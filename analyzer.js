const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const WebsiteGenerator = require("./src/WebsiteGenerator");
const DependencyAnalyzer = require("./src/DependencyAnalyzer");

(async () => {
  const argv = yargs(hideBin(process.argv)).argv;
  const csvPath = argv.file;
  if (csvPath) {
    try {
      const generator = new WebsiteGenerator();
      const websites = await generator.getWebsitesFromCSV(csvPath);
      const dependencyAnalyzer = new DependencyAnalyzer(websites);
      await dependencyAnalyzer.printInfo();
    } catch (error) {
      process.exit();
    }
  } else {
    console.log("File not provided");
  }
})();
