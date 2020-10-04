"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PathBuilder = /** @class */ (function () {
    // Marked as private to discourage consumers from instantiating directly.
    // Use the createPath function instead
    function PathBuilder() {
        this.parts = [];
    }
    PathBuilder.prototype.literal = function (path) {
        if (path) {
            this.parts.push(path);
        }
        return this;
    };
    PathBuilder.prototype.param = function (name) {
        if (name) {
            this.parts.push(':' + name);
        }
        return this;
    };
    PathBuilder.prototype.toString = function () {
        return '/' + this.parts.join('/');
    };
    return PathBuilder;
}());
exports.PathBuilder = PathBuilder;
function createPath(build) {
    var ConstructablePathBuilder = /** @class */ (function (_super) {
        __extends(ConstructablePathBuilder, _super);
        function ConstructablePathBuilder() {
            return _super.call(this) || this;
        }
        return ConstructablePathBuilder;
    }(PathBuilder));
    var pathBuilder = build(new ConstructablePathBuilder());
    return pathBuilder.toString();
}
exports.createPath = createPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aEJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2hhcmVkL3BhdGhCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBR0UseUVBQXlFO0lBQ3pFLHNDQUFzQztJQUN0QztRQUppQixVQUFLLEdBQWEsRUFBRSxDQUFDO0lBS3RDLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsSUFBWTtRQUNsQixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsMkJBQUssR0FBTCxVQUFNLElBQTBCO1FBQzlCLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzdCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsOEJBQVEsR0FBUjtRQUNFLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUF6QkQsSUF5QkM7QUF6Qlksa0NBQVc7QUE2QnhCLFNBQWdCLFVBQVUsQ0FBaUIsS0FBMkM7SUFDcEY7UUFBdUMsNENBQTJCO1FBQ2hFO21CQUNFLGlCQUFPO1FBQ1QsQ0FBQztRQUNILCtCQUFDO0lBQUQsQ0FBQyxBQUpELENBQXVDLFdBQVcsR0FJakQ7SUFDRCxJQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSx3QkFBd0IsRUFBRSxDQUFDLENBQUM7SUFDMUQsT0FBTyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDaEMsQ0FBQztBQVJELGdDQVFDIn0=