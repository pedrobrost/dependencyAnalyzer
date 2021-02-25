const HTMLParser = require("node-html-parser");

class Website {
  name = "";
  path = "";
  length = 0;
  dependencies = [];

  constructor(name, path) {
    this.name = name;
    this.path = path;
  }

  findDependencies(html) {
    const root = HTMLParser.parse(html);
    const scripts = root.querySelectorAll("script");
    const dependencies = scripts
      .map((s) => {
        const src = s.attributes.src?.split("?")[0];
        return src?.split("/").find((s) => s.endsWith(".js"));
      })
      .filter((s) => s);
    this.dependencies = dependencies;
  }

  getName() {
    return this.name;
  }

  getLength() {
    return this.length;
  }

  getDependencies() {
    return this.dependencies;
  }
}

module.exports = Website;
