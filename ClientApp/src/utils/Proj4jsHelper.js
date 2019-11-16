import proj4 from 'proj4/dist/proj4';

class Proj4jsHelper {
    static convertToDegrees(lat, long) {
        console.log("Input lat:", lat, "Input long:", long);
        const position = [lat, long];
        position.reverse();
        const firstProjection = '+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';
        const projectedPosition = proj4(firstProjection).inverse(position);
        projectedPosition.reverse();
        return projectedPosition;
    }
}

export default Proj4jsHelper;