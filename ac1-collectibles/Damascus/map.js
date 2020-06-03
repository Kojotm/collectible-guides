let flagsFile;
let templarsFile;

function preload(){
    flagsFile = loadJSON('/ac1-collectibles/Damascus/json/flags.json');
    templarsFile = loadJSON('/ac1-collectibles/Damascus/json/templars.json');
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
        iconUrl: 'img/templar.png',
        iconSize:     [35, 35],
        iconAnchor:   [17.5, 17.5],
        popupAnchor:  [0, 0]
    });

    for(let flag of flagsFile.flags){
        var marker = L.marker([flag.y, flag.x]).bindPopup(flag.note, {closeButton: false}).addTo(map);

        marker.on('mouseover', function(ev) {
            ev.target.openPopup();
        });
        marker.on('mouseout', function(ev) {
            ev.target.closePopup();
        });
        marker.off('click');
    }
    
    for(let templar of templarsFile.templars){
        var marker = L.marker([templar.y, templar.x], {icon: templarIcon}).bindPopup(templar.note, {closeButton: false}).addTo(map);

        marker.on('mouseover', function(ev) {
            ev.target.openPopup();
        });
        marker.on('mouseout', function(ev) {
            ev.target.closePopup();
        });
        marker.off('click');
    }

    L.imageOverlay('img/map.png', bounds).addTo(map);
    map.fitBounds(bounds);
} 

function draw() { 

}