"use strict";
// TODO: Move this into separate package? e.g. @typepoint/tsdv-joi
Object.defineProperty(exports, "__esModule", { value: true });
var joi = require("tsdv-joi");
var shared_1 = require("../../shared");
exports.validateAndTransform = 
// tslint:disable-next-line:ban-types
function (input, Class) {
    if (Class) {
        var validator = new joi.Validator();
        var checkValidationResult = function (validationResult) {
            if (validationResult.error) {
                return {
                    validationError: validationResult.error
                };
            }
            return {
                value: validationResult.value
            };
        };
        if (shared_1.isArrayOf(Class)) {
            var arrayOfInstance = new Class();
            var ElementClass = arrayOfInstance.classInfo && arrayOfInstance.classInfo.element;
            if (ElementClass) {
                var elementValidationResult = validator.validateAsClass(input, ElementClass);
                return checkValidationResult(elementValidationResult);
            }
        }
        else {
            var validationResult = validator.validateAsClass(input, Class);
            return checkValidationResult(validationResult);
        }
    }
    return {
        value: input
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNkdi1qb2kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL3ZhbGlkYXRpb24vdHNkdi1qb2kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtFQUFrRTs7QUFFbEUsOEJBQWdDO0FBSWhDLHVDQUFzRDtBQUV6QyxRQUFBLG9CQUFvQjtBQUMvQixxQ0FBcUM7QUFDckMsVUFDRSxLQUErQixFQUMvQixLQUFzQjtJQUV0QixJQUFJLEtBQUssRUFBRTtRQUNULElBQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXRDLElBQU0scUJBQXFCLEdBQUcsVUFDNUIsZ0JBQXVDO1lBRXZDLElBQUksZ0JBQWdCLENBQUMsS0FBSyxFQUFFO2dCQUMxQixPQUFPO29CQUNMLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLO2lCQUN4QyxDQUFDO2FBQ0g7WUFDRCxPQUFPO2dCQUNMLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLO2FBQzlCLENBQUM7UUFDSixDQUFDLENBQUM7UUFFRixJQUFJLGtCQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEIsSUFBTSxlQUFlLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNwQyxJQUFNLFlBQVksR0FBRyxlQUFlLENBQUMsU0FBUyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQ3BGLElBQUksWUFBWSxFQUFFO2dCQUNoQixJQUFNLHVCQUF1QixHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUMvRSxPQUFPLHFCQUFxQixDQUFDLHVCQUF1QixDQUFDLENBQUM7YUFDdkQ7U0FDRjthQUFNO1lBQ0wsSUFBTSxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRSxPQUFPLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDaEQ7S0FDRjtJQUVELE9BQU87UUFDTCxLQUFLLEVBQUUsS0FBaUI7S0FDekIsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9