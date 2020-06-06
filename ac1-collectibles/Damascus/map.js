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
        maxBoundsViscosity: 1.0,
        doubleClickZoom: false
    });

    var ActiveTemplarIcon = L.divIcon({
        html: '<img src="img/Templar_Active.png" width=35 height=35 class="markerIcon"/>',
        iconAnchor:   [17.5, 17.5],
        tooltipAnchor:  [23, -8],
        className: ''
    });

    var InactiveTemplarIcon = L.divIcon({
        html: '<img src="img/Templar_Inactive.png" width=35 height=35 class="markerIcon"/>',
        iconAnchor:   [17.5, 17.5],
        tooltipAnchor:  [23, -8],
        className: ''
    });

    var ActiveFlagIcon = L.divIcon({
        html: '<img src="img/SaracenFlag_Active.png" width=30 height=50 class="markerIcon"/>',
        iconAnchor:   [15, 50],
        tooltipAnchor:  [20, -37.5],
        className: ''
    });

    var InactiveFlagIcon = L.divIcon({
        html: '<img src="img/SaracenFlag_Inactive.png" width=30 height=50 class="markerIcon"/>',
        iconAnchor:   [15, 50],
        tooltipAnchor:  [20, -37.5],
        className: ''
    });

    for(let flag of flagsFile.flags){
        var marker = L.marker([flag.y, flag.x], {icon: InactiveFlagIcon});
        marker.bindTooltip(flag.note);
        marker.on('click', function(ev){
            var layer = ev.target;
            layer.setIcon(layer.options.icon == InactiveFlagIcon ? ActiveFlagIcon : InactiveFlagIcon);
        });

        marker.addTo(map);
    }
    
    for(let templar of templarsFile.templars){
        var marker = L.marker([templar.y, templar.x], {icon: InactiveTemplarIcon});
        marker.bindTooltip(templar.note);
        marker.on('click', function(ev){
            var layer = ev.target;
            layer.setIcon(layer.options.icon == InactiveTemplarIcon ? ActiveTemplarIcon : InactiveTemplarIcon);
        });

        marker.addTo(map);
    }

    L.imageOverlay('img/map.png', bounds).addTo(map);
    map.fitBounds(bounds);
} 

function draw() { 

}