// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSFramework.Shape {
    export interface IShape
        extends Interface.IBuilder,
            Interface.ISearchById,
            Interface.IDisposable {
        config: Configuration.IConfigurationShape; //IConfigurationShape
        isReady: boolean;
        map: OSMap.IMap; //IMap
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        provider: any;
        /** Events from the Shape */
        shapeEvents: Event.Shape.ShapeEventsManager;
        /** Events from the Shape provider */
        shapeProviderEvents: Array<string>;
        /** Gets the type of the Shape */
        type: Enum.ShapeType;
        uniqueId: string;
        widgetId: string;

        build(): void;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        changeProperty(propertyName: string, propertyValue: any): void;
        dispose(): void;
        /**
         * Refreshes the Events of the Shape Provider after Subscribing/Unsubscribing events
         */
        refreshProviderEvents(): void;
        /**
         * Check if the event name is valid for the provider events
         * @param eventName name of the event from provider
         */
        validateProviderEvent(eventName: string): boolean;
    }
}
