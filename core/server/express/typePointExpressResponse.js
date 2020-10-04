"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpStatusCodes = require("http-status-codes");
var server_1 = require("../../server");
var TypePointExpressResponse = /** @class */ (function () {
    function TypePointExpressResponse(response) {
        this.response = response;
        this.innerHasFlushedBody = false;
        this.innerContentType = 'application/json';
    }
    Object.defineProperty(TypePointExpressResponse.prototype, "hasFlushedHeaders", {
        get: function () {
            return this.response.headersSent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypePointExpressResponse.prototype, "hasFlushed", {
        get: function () {
            return this.innerHasFlushedBody;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypePointExpressResponse.prototype, "statusCode", {
        get: function () {
            return this.innerStatusCode;
        },
        set: function (value) {
            this.ensureHeadersNotSent();
            this.innerStatusCode = value;
            if (value) {
                this.response.statusCode = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypePointExpressResponse.prototype, "contentType", {
        get: function () {
            return this.innerContentType;
        },
        set: function (value) {
            this.ensureHeadersNotSent();
            this.innerContentType = value;
            if (value) {
                this.response.contentType(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypePointExpressResponse.prototype, "body", {
        get: function () {
            return this.innerBody;
        },
        set: function (value) {
            this.ensureBodyNotSent();
            this.innerBody = value;
            if (this.statusCode === undefined) {
                this.statusCode = httpStatusCodes.OK;
            }
        },
        enumerable: true,
        configurable: true
    });
    TypePointExpressResponse.prototype.flushHeaders = function () {
        if (!this.response.headersSent) {
            this.response.flushHeaders();
        }
    };
    TypePointExpressResponse.prototype.flush = function () {
        if (this.body === undefined) {
            this.response.end();
        }
        else {
            if ((this.contentType || '').toLowerCase() === 'application/json') {
                this.response.json(this.body);
            }
            else {
                this.response.send(this.body);
            }
        }
        this.innerHasFlushedBody = true;
    };
    TypePointExpressResponse.prototype.cookie = function (name, value, options) {
        this.response.cookie(name, value, options);
    };
    TypePointExpressResponse.prototype.clearCookie = function (name, options) {
        this.response.clearCookie(name, options);
    };
    TypePointExpressResponse.prototype.header = function (name, value) {
        if (arguments.length === 1) {
            return this.response.getHeader(name);
        }
        if (this.hasFlushedHeaders) {
            throw new server_1.HeadersAlreadySent('Cannot set header');
        }
        if (value === undefined) {
            this.response.removeHeader(name);
        }
        else {
            this.response.setHeader(name, value);
        }
    };
    TypePointExpressResponse.prototype.headers = function () {
        return this.response.getHeaders();
    };
    TypePointExpressResponse.prototype.ensureHeadersNotSent = function () {
        if (this.response.headersSent) {
            throw new server_1.HeadersAlreadySent();
        }
    };
    TypePointExpressResponse.prototype.ensureBodyNotSent = function () {
        if (this.response.headersSent) {
            throw new server_1.HeadersAlreadySent();
        }
    };
    return TypePointExpressResponse;
}());
exports.TypePointExpressResponse = TypePointExpressResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZVBvaW50RXhwcmVzc1Jlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9leHByZXNzL3R5cGVQb2ludEV4cHJlc3NSZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1EQUFxRDtBQUVyRCx1Q0FHc0I7QUFFdEI7SUEwREUsa0NBQW9CLFFBQXlCO1FBQXpCLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBSHJDLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxxQkFBZ0IsR0FBd0Isa0JBQWtCLENBQUM7SUFHbkUsQ0FBQztJQXpERCxzQkFBSSx1REFBaUI7YUFBckI7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBRUQsc0JBQUksZ0RBQVU7YUFBZDtZQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksZ0RBQVU7YUFBZDtZQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QixDQUFDO2FBRUQsVUFBZSxLQUF5QjtZQUN0QyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUU1QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUU3QixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7YUFDbEM7UUFDSCxDQUFDOzs7T0FWQTtJQVlELHNCQUFJLGlEQUFXO2FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQixDQUFDO2FBRUQsVUFBZ0IsS0FBMEI7WUFDeEMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFFNUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUU5QixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsUUFBUSxDQUFD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