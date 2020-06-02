let flagsFile;
let templarsFile;

function preload(){
    flagsFile = loadJSON('http://localhost/ac1-collectibles/Damascus/flags.json');
    templarsFile = loadJSON('http://localhost/ac1-collectibles/Damascus/templars.json');
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

    var templarIcon = L.icon({
        iconUrl: 'templar.png',
        iconSize:     [35, 35],
        iconAnchor:   [17.5, 17.5],
        popupAnchor:  [0, 0]
    });

    for(let flag of flagsFile.flags){
        L.marker([flag.y, flag.x]).bindPopup(flag.note).addTo(map);
    }
    
    for(let templar of templarsFile.templars){
        L.marker([templar.y, templar.x], {icon: templarIcon}).bindPopup(templar.note).addTo(map);
    }

    L.imageOverlay('Damascus1.png', bounds).addTo(map);
    map.fitBounds(bounds);
} 

function draw() { 

}