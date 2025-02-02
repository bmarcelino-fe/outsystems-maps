/**
 * Namespace that contains the callbacks signatures to be passed in DrawingTools events.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSFramework.Callbacks.DrawingTools {
    /**
     * This is the callback signature for events triggered by DrawingTools.
     * @param {string} mapId id of the Map where the DrawingTools that triggered the event belongs to
     * @param {string} drawingToolsId id of the DrawingTools that triggered the event
     * @param {OSFramework.DrawingTools.DrawingTools} drawingToolsObj object of the DrawingTools that triggered the event
     * @param args additional arguments in an Array
     */
    export type Event = {
        (
            mapId: string,
            drawingToolsId: string,
            drawingToolsObj: OSFramework.DrawingTools.IDrawingTools,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...args: any
        ): void;
    };
}
