// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSFramework.Feature {
    export interface ICenter {
        /** Get the Center position of the Map defined by the configuration
         * (can be changed after running the changeParameter method or is set by initializing the Map)
         */
        getCenter(): OSStructures.OSMap.Coordinates;
        /** Current center position of the Map that changes whenever a marker is added or by enabling the Autofit on Zoom feature */
        getCurrentCenter(): OSFramework.OSStructures.OSMap.Coordinates;
        /** Refreshes the Current Center position of the Map
         * Changes whenever a marker is added or by enabling the Autofit on Zoom feature
         */
        refreshCenter(value: OSFramework.OSStructures.OSMap.Coordinates): void;
        /** Set Current center position of the Map */
        setCurrentCenter(
            value: OSFramework.OSStructures.OSMap.Coordinates
        ): void;
        /** Sets or updates the initial center position of the Map.
         * (can be changed after running the changeParameter method or is set by initializing the Map)
         */
        updateCenter(location: string): void;
    }
}
