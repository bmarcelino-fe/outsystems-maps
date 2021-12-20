// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSFramework.Shape {
    export namespace ShapeFactory {
        export function MakeShape(
            map: OSMap.IMap,
            shapeId: string,
            type: Enum.ShapeType,
            configs: JSON
        ): Shape.IShape {
            switch (map.providerType) {
                case Enum.ProviderType.Google:
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    return GoogleProvider.Shape.ShapeFactory.MakeShape(
                        map,
                        shapeId,
                        type,
                        configs as JSON
                    );
                case Enum.ProviderType.Leaflet:
                    return LeafletProvider.Shape.ShapeFactory.MakeShape(
                        map,
                        shapeId,
                        type,
                        configs as JSON
                    );
                default:
                    throw `There is no factory for the Shape using the provider ${map.providerType}`;
            }
        }
    }
}