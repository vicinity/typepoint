"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseUrl(url) {
    var index = 0;
    var pathStartIndex;
    var pathLength;
    while (index < url.length && pathLength === undefined) {
        if (pathStartIndex === undefined) {
            if (url[index] === '/') {
                if (url[index + 1] === '/') {
                    index += 2;
                }
                else {
                    pathStartIndex = index;
                    index++;
                }
            }
            else {
                index++;
            }
        }
        else if (pathLength === undefined) {
            if (url[index] === '#' || url[index] === '?') {
                pathLength = index - pathStartIndex;
            }
            else {
                index++;
            }
        }
    }
    if (pathStartIndex !== undefined && pathLength === undefined) {
        pathLength = url.length - pathStartIndex;
    }
    var prePath = url.substring(0, pathStartIndex === undefined ? url.length + 1 : pathStartIndex);
    var path = pathStartIndex === undefined ? '' : url.substr(pathStartIndex, pathLength);
    var postPath = ((pathStartIndex === undefined || pathLength === undefined) ?
        '' :
        url.substr(pathStartIndex + pathLength));
    return {
        prePath: prePath,
        path: path,
        postPath: postPath
    };
}
exports.parseUrl = parseUrl;
function parseQueryString(queryString) {
    var result = {};
    var Position;
    (function (Position) {
        Position[Position["key"] = 0] = "key";
        Position[Position["value"] = 1] = "value";
    })(Position || (Position = {}));
    queryString = queryString.trim();
    if (queryString[0] !== '?') {
        return result;
    }
    var position = Position.key;
    var parameterName = '';
    var parameterValue = '';
    var addParameter = function () {
        var existingValue = result[parameterName];
        if (existingValue === undefined) {
            result[parameterName] = parameterValue;
        }
        else if (typeof existingValue === 'string') {
            result[parameterName] = [existingValue, parameterValue];
        }
        else {
            existingValue.push(parameterValue);
        }
        parameterName = '';
        parameterValue = '';
    };
    var index = 1;
    while (index < queryString.length) {
        var char = queryString[index];
        if (char === '#') {
            break;
        }
        if (position === Position.key) {
            if (char === '=') {
                position = Position.value;
            }
            else if (char === '&') {
                addParameter();
            }
            else {
                parameterName += char;
            }
        }
        else {
            if (char === '&') {
                addParameter();
                position = Position.key;
            }
            else {
                parameterValue += char;
            }
        }
        index++;
    }
    if (parameterName) {
        addParameter();
    }
    return result;
}
exports.parseQueryString = parseQueryString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NoYXJlZC91cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSxTQUFnQixRQUFRLENBQUMsR0FBVztJQUNsQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxJQUFJLGNBQWtDLENBQUM7SUFDdkMsSUFBSSxVQUE4QixDQUFDO0lBRW5DLE9BQU8sS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtRQUNyRCxJQUFJLGNBQWMsS0FBSyxTQUFTLEVBQUU7WUFDaEMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUN0QixJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO29CQUMxQixLQUFLLElBQUksQ0FBQyxDQUFDO2lCQUNaO3FCQUFNO29CQUNMLGNBQWMsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLEtBQUssRUFBRSxDQUFDO2lCQUNUO2FBQ0Y7aUJBQU07Z0JBQ0wsS0FBSyxFQUFFLENBQUM7YUFDVDtTQUNGO2FBQU0sSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQ25DLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUM1QyxVQUFVLEdBQUcsS0FBSyxHQUFHLGNBQWMsQ0FBQzthQUNyQztpQkFBTTtnQkFDTCxLQUFLLEVBQUUsQ0FBQzthQUNUO1NBQ0Y7S0FDRjtJQUVELElBQUksY0FBYyxLQUFLLFNBQVMsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO1FBQzVELFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztLQUMxQztJQUVELElBQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLGNBQWMsS0FBSyxTQUFT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