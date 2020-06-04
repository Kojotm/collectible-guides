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
        maxZoom: 1,
        zoomSnap: 0,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0
    });

    var templarIcon = L.divIcon({
        html: '<img src="img/templar.png" width=35 height=35 class="markerIcon"/>',
        iconAnchor:   [17.5, 17.5],
        popupAnchor:  [0, 0],
        className: ''
    });

    var flagIcon = L.divIcon({
        html: '<img src="img/SaracenFlag_Inactive.png" width=30 height=50 class="markerIcon"/>',
        iconAnchor:   [15, 50],
        popupAnchor:  [0, -50],
        className: ''
    });

    for(let flag of flagsFile.flags){
        var marker = L.marker([flag.y, flag.x], {icon: flagIcon});
        marker.bindPopup(flag.note, {closeButton: false})

        marker.on('mouseover', function(ev) {
            ev.target.openPopup();
        });
        marker.on('mouseout', function(ev) {
            ev.target.closePopup();
        });
        marker.off('click');

        marker.addTo(map);
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