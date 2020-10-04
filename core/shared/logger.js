"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-empty
var noop = function () { };
var NoopLogger = /** @class */ (function () {
    function NoopLogger() {
        this.log = noop;
        this.debug = noop;
        this.info = noop;
        this.warn = noop;
        this.error = noop;
    }
    return NoopLogger;
}());
exports.NoopLogger = NoopLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NoYXJlZC9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSxvQ0FBb0M7QUFDcEMsSUFBTSxJQUFJLEdBQUcsY0FBUSxDQUFDLENBQUM7QUFFdkI7SUFBQTtRQUNFLFFBQUcsR0FBRyxJQUFJLENBQUM7UUFDWCxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixVQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2YsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSxnQ0FBVSJ9