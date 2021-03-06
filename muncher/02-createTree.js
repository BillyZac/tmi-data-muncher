// var numberOfOrganismsToProcess = organismsArray.length
var numberOfOrganismsToProcess = 2000

/********************************/

var fs = require('fs')

var sourceFile = './output/taxa.json'
var taxonsByName = {}

fs.readFile(sourceFile, 'utf-8', function(err, data) {
  if (err) throw err

  var chordataTree = []
  var organismsArray = JSON.parse(data)

  var organismsCount = 0 // Count how many organisms make it into the final data

  // organismsArray.forEach(function(organism, i) {
  for (var i=0; i<numberOfOrganismsToProcess; i++) {
    var indexOfClass,
        indexOfOrder,
        indexOfFamily,
        indexOfGenus
    var organism = organismsArray[i]

    if (organism.description) {
      /*** CLASS ***/
      // Create the Class if it does not exist
      if (!taxonLevelExists(organism.class, chordataTree)) {
        var newClass = {
          "taxonRank": "class",
          "name": organismsArray[i].class, // use organism.class?
          "children": []
        }
        taxonsByName[organism.class] = newClass
        chordataTree.push(newClass)
      }
      // Get the index of the class
      // indexOfClass = taxonLevelExists(organism.class, chordataTree)

      /*** ORDER ***/
      // Create the Order if it does not exist
      // var orderTree = chordataTree[indexOfClass].children
      var orderTree = taxonsByName[organism.class].children
      if (!taxonLevelExists(organism.order, orderTree)) {
        var newOrder = {
          "taxonRank": "order",
          "name": organism.order,
          "children": []
        }
        orderTree.push(newOrder)
      }
      // Get the index of the family
      indexOfOrder = taxonLevelExists(organism.order, orderTree)

      /*** FAMILY ***/
      // Create the Family if it does not exist
      var familyTree = orderTree[indexOfOrder].children
      if (!taxonLevelExists(organism.family, familyTree)) {
        var newFamily = {
          "taxonRank": "family",
          "name": organism.family,
          "children": []
        }
        familyTree.push(newFamily)
      }
      // Get the index of the family
      indexOfFamily = taxonLevelExists(organism.family, familyTree)

      /*** GENUS ***/
      var genusTree = familyTree[indexOfFamily].children
      if (!taxonLevelExists(organism.genus, genusTree)) {
        var newGenus = {
          "taxonRank": "genus",
          "name": organism.genus,
          "children": []
        }
        genusTree.push(newGenus)
      }
      indexOfGenus = taxonLevelExists(organism.genus, genusTree)

      /*** SPECIES ***/
      var speciesTree = genusTree[indexOfGenus].children
      var newSpecies = {
        "taxonRank": "species",
        "taxonId": organism.taxonID,
        "name": organism.genus + '-' + organism.specificEpithet,
        "description": organism.description,
        "references": organism.references
      }
      speciesTree.push(newSpecies)
      organismsCount++
    }
  } // end for loop

  // After the tree is built, wrap it in the chordata phylum
  var root = {
    taxonRank: 'phylum',
    name: 'chordates',
    children: chordataTree
  }

  // Write it to a file
  var fileName = './output/tree-' + numberOfOrganismsToProcess + '.json'
  fs.writeFile(fileName, JSON.stringify(root))

  // Report on the status of the script:
  console.log('==========================================');
  console.log('Organisms processed:', numberOfOrganismsToProcess)
  console.log('Saved to file:', organismsCount)
  console.log('File name:', fileName)
  console.log('==========================================');
})




/****************************************************************************/
// Return index if found, false if not found
function taxonLevelExists(taxonLevelName, tree) {
  // return taxonsByName[taxonLevelName] ? true:false
  var found = false
  tree.forEach(function(treeItem, i) {
    if (taxonLevelName === treeItem.name) {
      found = i
    }
  })
  return found
}

/***  CJ Magic below this line  ***/
// function CJ_magick() {
//   var taxonsByName = {}
//   //DO STUFF
//   var chordataTree = Object.keys(taxonsByName).map(function(name){ return taxonsByName[name] })
// }
