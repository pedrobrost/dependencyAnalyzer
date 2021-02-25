const csv = require("csv-parser");
const fs = require("fs");
const HTTPWebsite = require("./HTTPWebsite");
const LocalWebsite = require("./LocalWebsite");

class WebsiteGenerator {
  getWebsitesFromCSV(path) {
    return new Promise((resolve) => {
      const websites = [];
      fs.createReadStream(path)
        .on("error", () => {
          this.handleCSVError(path);
        })
        .pipe(csv({ headers: false }))
        .on("data", (row) => {
          if (this.validRow(row)) {
            websites.push(this.getWebsite(row));
          } else {
            this.handleCSVFormatError();
          }
        })
        .on("end", () => {
          resolve(websites);
        });
    });
  }

  handleCSVPathError(path) {
    console.log(`Sorry, we couldn't find "${path}"`);
    process.exit();
  }

  handleCSVFormatError() {
    console.log("Invalid CSV file");
    process.exit();
  }

  validRow(row) {
    return row[0] && row[1];
  }

  getWebsite(row) {
    if (this.validURL(row[1])) {
      return new HTTPWebsite(row[0], row[1]);
    } else {
      return new LocalWebsite(row[0], row[1]);
    }
  }

  validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }
}

module.exports = WebsiteGenerator;
