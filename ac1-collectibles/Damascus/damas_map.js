let flagsFile;

function preload(){
    flagsFile = loadJSON('http://localhost/ac1-collectibles/Damascus/flags.json');
}

function setup() { 
    noCanvas();
    var bounds = [[0,0], [2303,4096]];
    var map = L.map('damascusMap', {
        crs: L.CRS.Simple,
        minZoom: -1.2,
        maxZoom: 2,
        zoomSnap: 0,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0 
    });

    for(let flag of flagsFile.flags){
        console.log(flag);
        L.marker([flag.y, flag.x]).bindPopup(flag.note).addTo(map);
    }
    
    L.imageOverlay('Damascus1.png', bounds).addTo(map);
    map.fitBounds(bounds);
} 

function draw() { 

}