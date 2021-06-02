/// <reference path="../../OSFramework/OSMap/AbstractMap.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace GoogleProvider.Map {
    type Size = {
        height: number;
        width: number;
    };

    export class StaticMap
        extends OSFramework.OSMap.AbstractMap<
            google.maps.Map,
            Configuration.OSMap.GoogleStaticMapConfig
        >
        implements IMapGoogle {
        private _center: string;
        private _markerString: string;
        private _size: Size;
        private _type: OSFramework.Enum.OSMap.Type;
        private _zoom: number;
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
        constructor(mapId: string, configs: any) {
            super(
                mapId,
                new Configuration.OSMap.GoogleStaticMapConfig(configs),
                OSFramework.Enum.MapType.StaticMap
            );
        }

        private _getCenter(center?: string): string {
            // If the center paramater is undefined, then use the config.center
            let position = center === undefined ? this.config.center : center;
            // If has markers use the first one's config location as the new position
            if (this.markers.length >= 1) {
                position = this.markers[0].config.location;
            }
            return position;
        }

        private _getMarkers(): string {
            return this.markers.reduce((acc, curr) => {
                if (curr.config.iconUrl !== '') {
                    acc +=
                        '&markers=icon:' +
                        encodeURIComponent(curr.config.iconUrl) +
                        '%7C' +
                        encodeURIComponent(
                            curr.config.location.replace(
                                /[^.,\-a-zA-Z0-9 ]/g,
                                ''
                            )
                        );
                } else {
                    acc +=
                        '&markers=' +
                        encodeURIComponent(
                            curr.config.location.replace(
                                /[^.,\-a-zA-Z0-9 ]/g,
                                ''
                            )
                        );
                }
                return acc;
            }, '');
        }

        private _getSize(): Size {
            const container = OSFramework.Helper.GetElementByUniqueId(
                this.uniqueId
            );
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            // We are using Scale = 2 (better resolution), so we need to divide the width and height by 2 as well
            return {
                width: Math.round(width / 2),
                height: Math.round(height / 2)
            };
        }

        private _getZoom(level?: number): number {
            // If level is undefined, use the config zoom as the default
            if (level === undefined) level = this.config.zoom;

            if (level === OSFramework.Enum.OSMap.Zoom.Auto) {
                if (this.markers.length > 0) {
                    // If zoom is set to Auto, we don't need to set the zoom so let's use -1 to help rendering the image
                    return -1;
                } else {
                    return OSFramework.Enum.OSMap.Zoom.Zoom8;
                }
            } else {
                return level;
            }
        }

        /**
         * Change the source of the image with the new url from GoogleAPI
         */
        private _renderImage(): void {
            const container = OSFramework.Helper.GetElementByUniqueId(
                this.uniqueId
            );
            const image = container.querySelector(
                OSFramework.Helper.Constants.staticMapCss
            ) as HTMLImageElement;

            image.src =
                /* eslint-disable prettier/prettier */
                `${OSFramework.Helper.Constants.googleMapsApiStaticMap}?` +
                'key=' + this.config.apiKey +
                '&center=' + this._center +
                /*'&markers=' +*/ this._markerString +
                '&maptype=' + this._type +
                // If the zoom = -1, then don't use the zoom parameter
                (this._zoom > -1 ? '&zoom=' + this._zoom : '') +
                // Scale 2 will give the Map a better resolution
                '&scale=' + 2 + 
                '&size=' + this._size.width + 'x' + this._size.height;
                /* eslint-enable prettier/prettier */
            image.onerror = () => {
                MapAPI.MapManager.GetActiveMap().mapEvents.trigger(
                    OSFramework.Event.OSMap.MapEventType.OnError,
                    this,
                    OSFramework.Enum.Errors.InvalidApiKey
                );
                // Invalid API key?
                image.alt = 'Image could not be loaded.';
            };
        }

        public get mapTag(): string {
            // To be removed
            // If the map has been built via the deprecated input parameter (SS) -> isStaticMap
            if (this.config.staticMap) {
                return OSFramework.Helper.Constants.mapTag;
            }
            return OSFramework.Helper.Constants.staticMapTag;
        }

        public get providerEvents(): Array<string> {
            throw new Error('StaticMap provider has no events');
        }

        public addMarker(
            marker: OSFramework.Marker.IMarker
        ): OSFramework.Marker.IMarker {
            if (this.isReady) {
                throw new Error(`Markers can't be changed on a StaticMap`);
            }
            super.addMarker(marker);

            return marker;
        }

        public build(): void {
            super.build();

            this._center = this._getCenter();
            this._zoom = this._getZoom();
            this._markerString = this._getMarkers();
            this._size = this._getSize();
            this._type = this.config.type;

            this._renderImage();
            this.finishBuild();
        }

        // ChangeMarkerProperty method can't be used on a StaticMap
        public changeMarkerProperty(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            markerId: string,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            propertyName: string,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
            propertyValue: any
        ): void {
            throw new Error(
                `ChangeMarkerProperty method can't be used on a StaticMap`
            );
        }

        // ChangeProperty method can't be used on a StaticMap
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
        public changeProperty(propertyName: string, value: any): void {
            if (this.isReady) {
                throw Error(
                    `ChangeProperty method can't be used on a StaticMap`
                );
            }

            const propValue =
                OSFramework.Enum.OS_Config_StaticMap[propertyName];

            switch (propValue) {
                case OSFramework.Enum.OS_Config_StaticMap.apiKey:
                    if (this.config.apiKey !== '') {
                        this.mapEvents.trigger(
                            OSFramework.Event.OSMap.MapEventType.OnError,
                            this,
                            OSFramework.Enum.Errors.APIKeyAlreadySet
                        );
                    }
                    return super.changeProperty(propertyName, value);
                case OSFramework.Enum.OS_Config_StaticMap.center:
                    this._center = this._getCenter(value);
                    return;
                case OSFramework.Enum.OS_Config_StaticMap.zoom:
                    this._zoom = this._getZoom(value);
                    return;
                case OSFramework.Enum.OS_Config_StaticMap.type:
                    this._type = value;
                    return;
                default:
                    throw Error(
                        `changeProperty - Property '${propertyName}' can't be changed.`
                    );
            }
        }

        public dispose(): void {
            super.dispose();
        }

        // Refresh method can't be used on a StaticMap
        public refresh(): void {
            throw new Error(`Refresh method can't be used on a StaticMap`);
        }

        // Refresh Provider Events method can't be used on a StaticMap because Static Maps don't have events.
        public refreshProviderEvents(): void {
            throw new Error(
                "Refresh Provider Events method can't be used on a StaticMap because Static Maps don't have events."
            );
        }
    }
}