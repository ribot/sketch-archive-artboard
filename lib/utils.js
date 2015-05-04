// Fetch a layer inside the given layer group which has the name
function getChildLayerByName(group, name) {
  var layers = group.layers();
  var layerLoop = layers.array().objectEnumerator();
  while ( childLayer = layerLoop.nextObject() ) {
    if (childLayer.name() == name) {
      return childLayer;
    }
  }
  return null;
}

function getPageByName(pageName) {
  var matchingPages = getPagesByName( pageName );
  if ( matchingPages.length ) {
    return matchingPages[ 0 ];
  } else {
    return null;
  }
}

function getPagesByName(pageName) {
  var pageLoop = doc.pages().objectEnumerator();
  var matchingPages = [];

  while (page = pageLoop.nextObject()) {
    if (page.name() == pageName) {
      matchingPages.push( page );
    }
  }

  return matchingPages;
}

function sortLikeFinder( a, b ) {
  a = a.name.lastPathComponent();
  b = b.name.lastPathComponent();
  var comparison = [a localizedStandardCompare:b];

  return comparison;
}


function getFirstArtboard() {
  return doc.currentPage().artboards().firstObject()
}

function setTextOnChildLayerByName(group, name, text) {
  var layer = getChildLayerByName( group, name )
  if ( layer ) {
    layer.setStringValue( text )
    layer.adjustFrameToFit()
  }
}

function addPage( name, select ) {
  var page = doc.addBlankPage();
  page.setName( name );
  if ( select ) {
    doc.setCurrentPage( page );
  }
  return page;
}

function processAllLayers(layers, callback) {
  var abs = layers.objectEnumerator();
  while (layer = abs.nextObject() ) {
    if ([layer isMemberOfClass:[MSLayerGroup class]]) {
      callback(layer);
      // Process child layers/groups
      processAllLayers(layer.layers().array(), callback);
    }
    else {
      callback(layer);
    }
  }
}
