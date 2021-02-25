const fs = require("fs").promises;
const path = require("path");
const os = require("os");
const Website = require("./Website");

class LocalWebsite extends Website {
  async analyze() {
    try {
      const data = await fs.readFile(this.getFilePath());
      const html = Buffer.from(data).toString();
      this.length = html.length;
      this.findDependencies(html);
    } catch (error) {
      console.log(`Sorry, we couldn't find "${this.path}"`);
      throw error;
    }
  }

  getFilePath() {
    const splitPath = this.path.split(path.sep);
    if (splitPath[0] === "~") {
      splitPath[0] = os.homedir();
      return splitPath.reduce((memo, part) => path.join(memo, part), "");
    }
    return this.path;
  }
}

module.exports = LocalWebsite;
