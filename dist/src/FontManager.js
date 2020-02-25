"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = __importDefault(require("react"));
// FIXME: This function is hideous
function double_pascal_case_to_two_words(str) {
    var index;
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        var ch = str.charAt(i);
        if (ch >= 'A' && ch <= 'Z') {
            count++;
        }
        if (count === 2 && !index) {
            index = i;
        }
    }
    if (count === 2) {
        return str.substr(0, index) + ' ' + str.substring(index, str.length);
    }
    else {
        return str;
    }
}
function font_style_generator(font_family, font_weight, font_style) {
    var fontFamily = font_family + "-";
    switch (font_weight) {
        case 'normal':
            fontFamily += 'Regular';
            break;
        case 'bold':
            fontFamily += 'Bold';
            break;
        case '100':
        case '200':
            fontFamily += 'Thin';
            break;
        case '300':
            fontFamily += 'Light';
            break;
        case '400':
            fontFamily += 'Regular';
            break;
        case '500':
        case '600':
            fontFamily += 'Medium';
            break;
        case '700':
        case '800':
            fontFamily += 'Bold';
            break;
        case '900':
            fontFamily += 'Black';
            break;
        case 'bolder':
        case 'lighter':
        // @ts-ignore
        case 'default':
            fontFamily += 'Regular';
            break;
    }
    if (font_style === 'italic') {
        fontFamily += 'Italic';
    }
    return { fontFamily: fontFamily, fontWeight: 'normal' };
}
var oldRender = react_native_1.Text.render;
var FontManager = /** @class */ (function () {
    function FontManager() {
    }
    FontManager.prototype.init = function (isExpo) {
        if (isExpo === void 0) { isExpo = true; }
        return __awaiter(this, void 0, void 0, function () {
            var Font;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isExpo) return [3 /*break*/, 2];
                        Font = require('expo-font');
                        // @ts-ignore
                        return [4 /*yield*/, Font.loadAsync({
                                'Roboto-Black': require('./fonts/Roboto-Black.ttf'),
                                'Roboto-Medium': require('./fonts/Roboto-Medium.ttf'),
                                'Roboto-Bold-Medium': require('./fonts/Roboto-Bold.ttf'),
                                'Roboto-Regular': require('./fonts/Roboto-Regular.ttf'),
                                'Roboto-Thin': require('./fonts/Roboto-Thin.ttf'),
                                'Roboto-Bold': require('./fonts/Roboto-Bold.ttf'),
                                'Roboto-Light': require('./fonts/Roboto-Light.ttf'),
                            })];
                    case 1:
                        // @ts-ignore
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        react_native_1.Text.render = this.override;
                        return [2 /*return*/];
                }
            });
        });
    };
    FontManager.prototype.override = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        /* FIXME: Determine if this was the correct thing to do
     *   Original code  ->  const origin = oldRender.call(this, ...args);
     *   Used to contain error 'the containing arrow function captures the global'
     *   Therefore swapped it to function instead of arrow to remove global scope
     */
        var origin = oldRender.call.apply(oldRender, [this].concat(args));
        if (react_native_1.Platform.OS === 'android') {
            if (origin.props.style) {
                var fontWeight = origin.props.style.fontWeight ? origin.props.style.fontWeight : '400';
                var fontStyle = origin.props.style.fontStyle ? origin.props.style.fontStyle : 'normal';
                // HACK: Disabled mutation of fontStyle as is immutable in some libaries
                // origin.props.style.fontStyle = 'normal'
                var fontFamily = origin.props.style.fontFamily ? origin.props.style.fontFamily : 'Roboto';
                return react_1.default.cloneElement(origin, {
                    style: [{}, origin.props.style, font_style_generator(fontFamily, fontWeight, fontStyle)],
                });
            }
            return origin;
        }
        else {
            if (origin.props.style) {
                if (origin.props.style.fontFamily) {
                    var fontFamily = origin.props.style.fontFamily;
                    origin.props.style.fontFamily = double_pascal_case_to_two_words(fontFamily);
                }
            }
            return origin;
        }
    };
    return FontManager;
}());
exports.default = new FontManager();
