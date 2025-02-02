/// <reference path="AbstractPolyshape.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Provider.Google.Shape {
    export class Polygon
        extends AbstractPolyshape<
            Configuration.Shape.FilledShapeConfig,
            google.maps.Polygon
        >
        implements OSFramework.Shape.IShapePolyshape
    {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any

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
                new Configuration.Shape.FilledShapeConfig(configs)
            );
        }

        protected _createProvider(
            path: Array<OSFramework.OSStructures.OSMap.Coordinates>
        ): google.maps.Polygon {
            return new google.maps.Polygon({
                map: this.map.provider,
                path,
                ...this.getProviderConfig()
            });
        }

        protected get invalidShapeLocationErrorCode(): OSFramework.Enum.ErrorCodes {
            return OSFramework.Enum.ErrorCodes.CFG_InvalidPolygonShapeLocations;
        }

        public get shapeTag(): string {
            return OSFramework.Helper.Constants.shapePolygonTag;
        }
    }
}
