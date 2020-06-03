function isNumber(str) {
    var pattern = /^-?\d+\.?\d*$|^\d*\.?\d+$/;
    return pattern.test(str);
}

// custom marker icon
var icon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#c30b82;' class='marker-pin'></div>",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -40]
});

// custom marker icon for new marker
var newIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div class='marker-text' id='marker-text'>new</div><div style='background-color:#c3890b;' class='new-marker-pin'></div>",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -40]
});