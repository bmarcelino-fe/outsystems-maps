/**
 * Namespace that contains the signatures of the callbacks in OutSystems code.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace OSFramework.Callbacks {
    /**
     * This is the most generic callback signature and can be used even for internal events
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export type Generic = { (...ags): any };

    /**
     * This is the most generic callback signature for events existing in OutSystems code.
     * @param {string} mapID enables the OutSystems code to understand which map triggered the event
     */
    export type OSGeneric = { (mapID: string, ...args): void };
}
