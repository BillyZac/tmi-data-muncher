# Data Muncher

## Description

A script, which is to be run once and only once, that does the following:

- Runs out and grabs a bunch of data about animals and their taxonomies (Maybe not)
- Parses this data
- Generates a json object that is consumable by D3.js.

The resulting object will end up in a folder on the [front-end site](https://github.com/TelegraphMoarInterstices/front-end) in a file named something like treeData.json. 

## Usage
### Convert CSV list to JSON formatted list
We have a list of organisms in CSV format from the Darwin database. The first step to making it useable in our D3 visualization is converting it to a list in JSON format.

In the folder "Muncher", run:

```
$ node 01-convertCSVtoJSON.js
```

This takes in a csv (e.g. './darwin-data/taxa_edited.csv') and outputs a file called "taxa.json" to the "output" folder.

### Convert JSON list to a hierarchical tree
Now we need to convert the JSON formatted list to a nested taxonomy.

Open "02-createTree.js". Around line 5, see the variable `numberOfOrganismsToProcess`. Set it appropriately. Then run:

```
$node 02-createTree.js
```

This takes as input the file generated by the previous step and outputs a file in the "output" folder. The name of the file is determined by how many organisms were processed. For example, if 100 organisms were processed the file name would be "tree-100.json"

The Darwin data is now consumable by D3!
