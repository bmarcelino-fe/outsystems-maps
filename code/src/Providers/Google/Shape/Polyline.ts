/// <reference path="AbstractPolyshape.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Provider.Google.Shape {
    export class Polyline
        extends AbstractPolyshape<
            Configuration.Shape.BasicShapeConfig,
            google.maps.Polyline
        >
        implements OSFramework.Shape.IShapePolyshape
    {
        constructor(
            map: OSFramework.OSMap.IMap,
            shapeId: string,
            type: OSFramework.Enum.ShapeType,
            // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
            configs: any
        ) {
            super(
                map,
                shapeId,
                type,
                new Configuration.Shape.BasicShapeConfig(configs)
            );
        }

        protected _createProvider(
            path: Array<OSFramework.OSStructures.OSMap.Coordinates>
        ): google.maps.Polyline {
            return new google.maps.Polyline({
                map: this.map.provider,
                path,
                ...this.getProviderConfig()
            });
        }

        protected get invalidShapeLocationErrorCode(): OSFramework.Enum.ErrorCodes {
            return OSFramework.Enum.ErrorCodes
                .CFG_InvalidPolylineShapeLocations;
        }

        public get shapeTag(): string {
            return OSFramework.Helper.Constants.shapePolylineTag;
        }
    }
}
