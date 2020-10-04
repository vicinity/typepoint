"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function combineMiddlewares(middlewares) {
    return function (req, res, next) {
        var middlewareIndex = 0;
        function executeNextMiddleware() {
            if (middlewareIndex >= middlewares.length) {
                next();
                return;
            }
            var middleware = middlewares[middlewareIndex++];
            middleware(req, res, executeNextMiddleware);
        }
        executeNextMiddleware();
    };
}
exports.combineMiddlewares = combineMiddlewares;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvZXhwcmVzcy9taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsU0FBZ0Isa0JBQWtCLENBQUMsV0FBOEI7SUFDL0QsT0FBTyxVQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtRQUM3RSxJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFFeEIsU0FBUyxxQkFBcUI7WUFDNUIsSUFBSSxlQUFlLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtnQkFDekMsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsT0FBTzthQUNSO1lBRUQsSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7WUFDbEQsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBRUQscUJBQXFCLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUM7QUFDSixDQUFDO0FBaEJELGdEQWdCQyJ9