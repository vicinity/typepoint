"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function warnIfWindowDetected(window, console) {
    if (typeof window !== 'undefined') {
        // tslint:disable-next-line: no-console
        var warn = (console.warn || console.log).bind(console);
        warn();
        warn('It appears you\'ve referenced \'@typepoint/core/server\' in your client side code (window detected)');
        warn();
    }
}
exports.warnIfWindowDetected = warnIfWindowDetected;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50RGV0ZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci9jbGllbnREZXRlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSxTQUFnQixvQkFBb0IsQ0FBQyxNQUFXLEVBQUUsT0FBcUI7SUFDckUsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDakMsdUNBQXVDO1FBQ3ZDLElBQU0sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELElBQUksRUFBRSxDQUFDO1FBQ1AsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7UUFDNUcsSUFBSSxFQUFFLENBQUM7S0FDUjtBQUNILENBQUM7QUFSRCxvREFRQyJ9