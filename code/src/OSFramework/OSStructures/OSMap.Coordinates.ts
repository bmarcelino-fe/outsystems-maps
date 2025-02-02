// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSFramework.OSStructures.OSMap {
    export class Coordinates {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public lat: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public lng: any;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    export class OSCoordinates {
        public Lat: number;
        public Lng: number;

        constructor(lat: number, lng: number) {
            this.Lat = lat;
            this.Lng = lng;
        }
    }
}
