let flagsFile;
let templarsFile;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "[]";
}

function preload(){
    flagsFile = loadJSON('/ac1-collectibles/Damascus/json/flags.json');
    templarsFile = loadJSON('/ac1-collectibles/Damascus/json/templars.json');
}

function setup() { 
    noCanvas();

    var json_str = getCookie('activeMarkersDamascus');
    var activeMarkers = JSON.parse(json_str);
    console.log(activeMarkers);

    var bounds = [[0,0], [2303,4096]];
    
    var map = L.map('damascusMap', {
        crs: L.CRS.Simple,
        minZoom: -1,
        maxZoom: 1,
        zoomSnap: 0,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
        doubleClickZoom: false
    });

    var ActiveTemplarIcon = L.divIcon({
        html: '<img src="img/Templar_Active.png" width=50 height=50 class="markerIcon"/>',
        iconAnchor:   [25, 25],
        tooltipAnchor:  [30, -8],
        className: ''
    });

    var InactiveTemplarIcon = L.divIcon({
        html: '<img src="img/Templar_Inactive.png" width=50 height=50 class="markerIcon"/>',
        iconAnchor:   [25, 25],
        tooltipAnchor:  [30, -8],
        className: ''
    });

    var ActiveFlagIcon = L.divIcon({
        html: '<img src="img/SaracenFlag_Active.png" width=45 height=75 class="markerIcon"/>',
        iconAnchor:   [22, 75],
        tooltipAnchor:  [30, -60],
        className: ''
    });

    var InactiveFlagIcon = L.divIcon({
        html: '<img src="img/SaracenFlag_Inactive.png" width=45 height=75 class="markerIcon"/>',
        iconAnchor:   [22, 75],
        tooltipAnchor:  [30, -60],
        className: ''
    });

    for(let flag of flagsFile.flags){
        var marker = L.marker([flag.y, flag.x], {icon: InactiveFlagIcon});
        for(let mark of activeMarkers){
            if (flag.y == mark.lat && flag.x == mark.lng){
                marker.setIcon(ActiveFlagIcon);
                break;
            }
        }
        marker.bindTooltip(flag.note);
        marker.on('click', function(ev){
            var layer = ev.target;
            if(layer.options.icon == InactiveFlagIcon){
                layer.setIcon(ActiveFlagIcon);
                activeMarkers.push(layer.getLatLng());
                console.log(activeMarkers);
                setCookie('activeMarkersDamascus', JSON.stringify(activeMarkers), 30);
            }else{
                layer.setIcon(InactiveFlagIcon);
                var index = activeMarkers.indexOf(layer.getLatLng());
                var latlng = layer.getLatLng();
                var index = -1;
                for(var i = 0; i < activeMarkers.length; i++){
                    if(activeMarkers[i].lat == latlng.lat && activeMarkers[i].lng == latlng.lng){
                        index = i;
                    }
                }
                console.log(index);
                if (index !== -1){
                    activeMarkers.splice(index, 1);
                }
                console.log(activeMarkers);
                setCookie('activeMarkersDamascus', JSON.stringify(activeMarkers), 30);
            }
        });

        marker.addTo(map);
    }
    
    for(let templar of templarsFile.templars){
        var marker = L.marker([templar.y, templar.x], {icon: InactiveTemplarIcon});
        for(let mark of activeMarkers){
            if (templar.y == mark.lat && templar.x == mark.lng){
                marker.setIcon(ActiveTemplarIcon);
                break;
            }
        }
        marker.bindTooltip(templar.note);
        marker.on('click', function(ev){
            var layer = ev.target;
            if(layer.options.icon == InactiveTemplarIcon){
                layer.setIcon(ActiveTemplarIcon);
                activeMarkers.push(layer.getLatLng());
                console.log(activeMarkers);
                setCookie('activeMarkersDamascus', JSON.stringify(activeMarkers), 30);
            }else{
                layer.setIcon(InactiveTemplarIcon);
                var index = activeMarkers.indexOf(layer.getLatLng());
                var latlng = layer.getLatLng();
                var index = -1;
                for(var i = 0; i < activeMarkers.length; i++){
                    if(activeMarkers[i].lat == latlng.lat && activeMarkers[i].lng == latlng.lng){
                        index = i;
                    }
                }
                console.log(index);
                if (index !== -1){
                    activeMarkers.splice(index, 1);
                }
                console.log(activeMarkers);
                setCookie('activeMarkersDamascus', JSON.stringify(activeMarkers), 30);
            }
        });

        marker.addTo(map);
    }

    L.imageOverlay('img/map.png', bounds).addTo(map);
    map.fitBounds(bounds);
} 

function draw() { 

}