## Dependency Analyzer

### How to use

Execute `analyzer.js` with node, using the `--file` param to specify the `websites.csv` file location.

The csv file format must be like this:

{Website name},{HTML file aboslute path | HTML URL}

```bash
git clone git@github.com:pedrobrost/dependencyAnalyzer.git
cd dependencyAnalyzer
yarn install
node analyzer.js --file sample/websites.csv
```
