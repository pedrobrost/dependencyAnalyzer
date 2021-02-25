class DependencyAnalyzer {
  constructor(websites) {
    this.websites = websites;
  }

  async printInfo() {
    await this.analyzeWebsites();
    this.printLengths();
    this.printDependencies();
    this.printFrequency();
  }

  async analyzeWebsites() {
    const promises = [];
    this.websites.forEach((website) => {
      const promise = website.analyze();
      promises.push(promise);
    });
    await Promise.all(promises);
  }

  printLengths() {
    console.log("Length: ", "\n");
    this.websites.forEach((website) =>
      console.log(`${website.getName()}, ${website.getLength()}`)
    );
    console.log("\n");
  }

  printDependencies() {
    console.log("Dependencies: ", "\n");
    this.websites.forEach((website) =>
      website.getDependencies().forEach((dependency) => {
        console.log(`${website.getName()}, ${dependency}`);
      })
    );
    console.log("\n");
  }

  printFrequency() {
    console.log("Frequency: ", "\n");
    const dependencies = this.websites
      .map((website) => website.getDependencies())
      .flat(1);
    const counts = {};
    dependencies.forEach((dependency) => {
      counts[dependency] = counts[dependency] ? counts[dependency] + 1 : 1;
    });
    for (const [key, value] of Object.entries(counts)) {
      console.log(`${key}, ${value}`);
    }
  }
}

module.exports = DependencyAnalyzer;
