const testDMS = '27�42\'52.1""S 153�11\'58.6""E';
console.log('Testing DMS parsing with:', testDMS);

function parseDMSCoordinates(dmsString) {
    if (!dmsString || typeof dmsString !== 'string') return null;
    
    try {
        // Handle the specific format from the CSV with � symbols and double quotes
        const cleaned = dmsString.trim()
            .replace(/"/g, '') // Remove all quote marks
            .replace(/�/g, '°'); // Replace � with degree symbol
        
        console.log('Cleaned string:', cleaned);
        
        // Pattern to match the specific format: 27°42'52.1S 153°11'58.6E
        const dmsPattern = /(\\d+)°(\\d+)'([\\d.]+)([NSEW])\\s+(\\d+)°(\\d+)'([\\d.]+)([NSEW])/i;
        const match = cleaned.match(dmsPattern);
        
        console.log('Regex match result:', match);
        
        if (!match) {
            console.warn('Could not parse DMS coordinates:', dmsString);
            return null;
        }
        
        const [, deg1, min1, sec1, dir1, deg2, min2, sec2, dir2] = match;
        console.log('Extracted parts:', {deg1, min1, sec1, dir1, deg2, min2, sec2, dir2});
        
        const coord1 = parseInt(deg1) + parseInt(min1)/60 + parseFloat(sec1)/3600;
        const coord2 = parseInt(deg2) + parseInt(min2)/60 + parseFloat(sec2)/3600;
        
        let lat, lng;
        if (dir1.toUpperCase() === 'N' || dir1.toUpperCase() === 'S') {
            lat = dir1.toUpperCase() === 'S' ? -coord1 : coord1;
            lng = dir2.toUpperCase() === 'W' ? -coord2 : coord2;
        } else {
            lng = dir1.toUpperCase() === 'W' ? -coord1 : coord1;
            lat = dir2.toUpperCase() === 'S' ? -coord2 : coord2;
        }
        
        console.log('Final coordinates:', {lat, lng});
        return { lat, lng };
    } catch (error) {
        console.error('Error parsing DMS coordinates:', dmsString, error);
        return null;
    }
}

const result = parseDMSCoordinates(testDMS);
console.log('Parsed result:', result);