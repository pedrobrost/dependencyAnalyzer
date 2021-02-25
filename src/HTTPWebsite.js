const fetch = require("node-fetch");
const Website = require("./Website");

class HTTPWebsite extends Website {
  async analyze() {
    try {
      const response = await fetch(this.path);
      const html = await response.text();
      this.length = html.length;
      this.findDependencies(html);
    } catch (error) {
      console.log(`Sorry, we couldn't get "${this.path} website"`);
      throw error;
    }
  }
}

module.exports = HTTPWebsite;
