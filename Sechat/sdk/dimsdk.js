/**
 *  DIM-SDK (v2.0.0)
 *  (DIMP: Decentralized Instant Messaging Protocol)
 *
 * @author    moKy <albert.moky at gmail.com>
 * @date      Aug. 23, 2025
 * @copyright (c) 2020-2025 Albert Moky
 * @license   {@link https://mit-license.org | MIT License}
 */;
if (typeof DIMP !== 'object') {
    DIMP = {}
}
(function (dkd, mkm, mk) {
    var DaoKeDao = dkd;
    var MingKeMing = mkm;
    var MONKEY = mk;
    if (typeof MONKEY !== 'object') {
        MONKEY = {}
    }
    (function (mk) {
        if (typeof mk.type !== 'object') {
            mk.type = {}
        }
        if (typeof mk.format !== 'object') {
            mk.format = {}
        }
        if (typeof mk.digest !== 'object') {
            mk.digest = {}
        }
        if (typeof mk.protocol !== 'object') {
            mk.protocol = {}
        }
        if (typeof mk.ext !== 'object') {
            mk.ext = {}
        }
        mk.type.Class = function (child, parent, interfaces) {
            if (!child) {
                child = function () {
                    Object.call(this)
                }
            } else if (typeof child === 'function') {
            } else {
                throw new TypeError('class params error: ' + child + ', ' + parent + ', ' + interfaces);
            }
            if (typeof parent === 'function') {
                child._mk_super_class = parent
            } else {
                parent = Object
            }
            child.prototype = Object.create(parent.prototype);
            child.prototype.constructor = child;
            if (interfaces instanceof Array) {
                child._mk_interfaces = interfaces
            }
            return child
        };
        var Class = mk.type.Class;
        mk.type.Mixin = function (clazz, methods) {
            if (!clazz) {
                clazz = function () {
                }
            } else if (typeof clazz === 'function') {
            } else {
                throw new TypeError('mixin params error: ' + clazz + ', ' + methods);
            }
            if (typeof methods === 'function') {
                methods = methods.prototype
            }
            return Implementation(clazz, methods)
        };
        var Mixin = mk.type.Mixin;
        mk.type.Implementation = function (clazz, methods) {
            var names = Object.keys(methods);
            var key;
            for (var i = 0; i < names.length; ++i) {
                key = names[i];
                clazz.prototype[key] = methods[key]
            }
            return clazz
        };
        var Implementation = mk.type.Implementation;
        mk.type.Interface = function (child, parents) {
            if (!child) {
                child = function () {
                }
            } else if (typeof child === 'function') {
            } else {
                throw new TypeError('interface params error: ' + child + ', ' + parents);
            }
            if (parents instanceof Array) {
                child._mk_super_interfaces = parents
            }
            return child
        };
        var Interface = mk.type.Interface;
        Interface.conforms = function (object, protocol) {
            if (!object) {
                return false
            } else if (object instanceof protocol) {
                return true
            }
            return check_extends(object.constructor, protocol)
        };
        var check_extends = function (constructor, protocol) {
            if (!constructor) {
                return false
            }
            var interfaces = constructor._mk_interfaces;
            if (interfaces && check_implements(interfaces, protocol)) {
                return true
            }
            var parent = constructor._mk_super_class;
            return parent && check_extends(parent, protocol)
        };
        var check_implements = function (interfaces, protocol) {
            var child, parents;
            for (var i = 0; i < interfaces.length; ++i) {
                child = interfaces[i];
                if (child === protocol) {
                    return true
                }
                parents = child._mk_super_interfaces;
                if (parents && check_implements(parents, protocol)) {
                    return true
                }
            }
            return false
        };
        mk.type.Object = Interface(null, null);
        var IObject = mk.type.Object;
        IObject.prototype = {
            getClassName: function () {
            }, equals: function () {
            }, valueOf: function () {
            }, toString: function () {
            }
        };
        IObject.isNull = function (object) {
            if (typeof object === 'undefined') {
                return true
            } else {
                return object === null
            }
        };
        IObject.isString = function (object) {
            return typeof object === 'string'
        };
        IObject.isNumber = function (object) {
            return typeof object === 'number'
        };
        IObject.isBoolean = function (object) {
            return typeof object === 'boolean'
        };
        IObject.isFunction = function (object) {
            return typeof object === 'function'
        };
        IObject.isBaseType = function (object) {
            var t = typeof object;
            if (t === 'string' || t === 'number' || t === 'boolean' || t === 'function') {
                return true
            }
            if (object instanceof Date) {
                return true
            }
            if (object instanceof RegExp) {
                return true
            }
            return object instanceof Error
        };
        mk.type.BaseObject = function () {
            Object.call(this)
        };
        var BaseObject = mk.type.BaseObject;
        Class(BaseObject, null, [IObject]);
        BaseObject.prototype.getClassName = function () {
            return Object.getPrototypeOf(this).constructor.name
        };
        BaseObject.prototype.equals = function (other) {
            return this === other
        };
        mk.type.Mapper = Interface(null, [IObject]);
        var Mapper = mk.type.Mapper;
        Mapper.prototype = {
            toMap: function () {
            }, copyMap: function (deepCopy) {
            }, isEmpty: function () {
            }, getLength: function () {
            }, allKeys: function () {
            }, getValue: function (key) {
            }, setValue: function (key, value) {
            }, removeValue: function (key) {
            }, getString: function (key, defaultValue) {
            }, getBoolean: function (key, defaultValue) {
            }, getInt: function (key, defaultValue) {
            }, getFloat: function (key, defaultValue) {
            }, getDateTime: function (key, defaultValue) {
            }, setDateTime: function (key, time) {
            }, setString: function (key, stringer) {
            }, setMap: function (key, mapper) {
            }
        };
        Mapper.count = function (dict) {
            if (!dict) {
                return 0
            } else if (Interface.conforms(dict, Mapper)) {
                dict = dict.toMap()
            } else if (typeof dict !== 'object') {
                throw TypeError('not a map: ' + dict);
            }
            return Object.keys(dict).length
        };
        Mapper.isEmpty = function (dict) {
            return Mapper.count(dict) === 0
        };
        Mapper.keys = function (dict) {
            if (!dict) {
                return null
            } else if (Interface.conforms(dict, Mapper)) {
                dict = dict.toMap()
            } else if (typeof dict !== 'object') {
                throw TypeError('not a map: ' + dict);
            }
            return Object.keys(dict)
        };
        Mapper.removeKey = function (dict, key) {
            if (!dict) {
                return null
            } else if (Interface.conforms(dict, Mapper)) {
                dict = dict.toMap()
            } else if (typeof dict !== 'object') {
                throw TypeError('not a map: ' + dict);
            }
            var value = dict[key];
            delete dict[key];
            return value
        };
        Mapper.forEach = function (dict, handleKeyValue) {
            if (!dict) {
                return -1
            } else if (Interface.conforms(dict, Mapper)) {
                dict = dict.toMap()
            } else if (typeof dict !== 'object') {
                throw TypeError('not a map: ' + dict);
            }
            var keys = Object.keys(dict);
            var cnt = keys.length;
            var stop;
            var i = 0, k, v;
            for (; i < cnt; ++i) {
                k = keys[i];
                v = dict[k];
                stop = handleKeyValue(k, v);
                if (stop) {
                    break
                }
            }
            return i
        };
        Mapper.addAll = function (dict, fromDict) {
            if (!dict) {
                return -1
            } else if (Interface.conforms(dict, Mapper)) {
                dict = dict.toMap()
            } else if (typeof dict !== 'object') {
                throw TypeError('not a map: ' + dict);
            }
            return Mapper.forEach(fromDict, function (key, value) {
                dict[key] = value;
                return false
            })
        };
        mk.type.DataConverter = Interface(null, null);
        var DataConverter = mk.type.DataConverter;
        DataConverter.prototype = {
            getString: function (value, defaultValue) {
            }, getBoolean: function (value, defaultValue) {
            }, getInt: function (value, defaultValue) {
            }, getFloat: function (value, defaultValue) {
            }, getDateTime: function (value, defaultValue) {
            }
        };
        mk.type.BaseConverter = function () {
            BaseObject.call(this)
        };
        var BaseConverter = mk.type.BaseConverter;
        Class(BaseConverter, BaseObject, [DataConverter]);
        BaseConverter.prototype.getDateTime = function (value, defaultValue) {
            if (IObject.isNull(value)) {
                return defaultValue
            } else if (value instanceof Date) {
                return value
            }
            var seconds = this.getFloat(value, 0);
            var millis = seconds * 1000;
            return new Date(millis)
        };
        BaseConverter.prototype.getFloat = function (value, defaultValue) {
            if (IObject.isNull(value)) {
                return defaultValue
            } else if (IObject.isNumber(value)) {
                return value
            } else if (IObject.isBoolean(value)) {
                return value ? 1.0 : 0.0
            }
            var text = conv_str(value);
            return parseFloat(text)
        };
        BaseConverter.prototype.getInt = function (value, defaultValue) {
            if (IObject.isNull(value)) {
                return defaultValue
            } else if (IObject.isNumber(value)) {
                return value
            } else if (IObject.isBoolean(value)) {
                return value ? 1 : 0
            }
            var text = conv_str(value);
            return parseInt(text)
        };
        BaseConverter.prototype.getBoolean = function (value, defaultValue) {
            if (IObject.isNull(value)) {
                return defaultValue
            } else if (IObject.isBoolean(value)) {
                return value
            } else if (IObject.isNumber(value)) {
                return value > 0 || value < 0
            }
            var text = conv_str(value);
            text = text.trim();
            var size = text.length;
            if (size === 0) {
                return false
            } else if (size > Converter.MAX_BOOLEAN_LEN) {
                throw new TypeError('Boolean value error: "' + value + '"');
            } else {
                text = text.toLowerCase()
            }
            var state = Converter.BOOLEAN_STATES[text];
            if (IObject.isNull(state)) {
                throw new TypeError('Boolean value error: "' + value + '"');
            }
            return state
        };
        BaseConverter.prototype.getString = function (value, defaultValue) {
            if (IObject.isNull(value)) {
                return defaultValue
            } else if (IObject.isString(value)) {
                return value
            } else {
                return value.toString()
            }
        };
        var conv_str = function (value) {
            if (IObject.isString(value)) {
                return value
            } else {
                return value.toString()
            }
        };
        mk.type.Converter = {
            getString: function (value, defaultValue) {
                return this.converter.getString(value, defaultValue)
            },
            getBoolean: function (value, defaultValue) {
                return this.converter.getBoolean(value, defaultValue)
            },
            getInt: function (value, defaultValue) {
                return this.converter.getInt(value, defaultValue)
            },
            getFloat: function (value, defaultValue) {
                return this.converter.getFloat(value, defaultValue)
            },
            getDateTime: function (value, defaultValue) {
                return this.converter.getDateTime(value, defaultValue)
            },
            converter: new BaseConverter(),
            BOOLEAN_STATES: {
                '1': true,
                'yes': true,
                'true': true,
                'on': true,
                '0': false,
                'no': false,
                'false': false,
                'off': false,
                'null': false,
                'none': false,
                'undefined': false
            },
            MAX_BOOLEAN_LEN: 'undefined'.length
        };
        var Converter = mk.type.Converter;
        mk.type.Dictionary = function (dict) {
            BaseObject.call(this);
            if (!dict) {
                dict = {}
            } else if (Interface.conforms(dict, Mapper)) {
                dict = dict.toMap()
            }
            this.__dictionary = dict
        };
        var Dictionary = mk.type.Dictionary;
        Class(Dictionary, BaseObject, [Mapper]);
        Dictionary.prototype.equals = function (other) {
            if (Interface.conforms(other, Mapper)) {
                if (this === other) {
                    return true
                }
                other = other.valueOf()
            }
            return Arrays.equals(this.__dictionary, other)
        };
        Dictionary.prototype.valueOf = function () {
            return this.__dictionary
        };
        Dictionary.prototype.toString = function () {
            return mk.format.JSON.encode(this.__dictionary)
        };
        Dictionary.prototype.toMap = function () {
            return this.__dictionary
        };
        Dictionary.prototype.copyMap = function (deepCopy) {
            if (deepCopy) {
                return Copier.deepCopyMap(this.__dictionary)
            } else {
                return Copier.copyMap(this.__dictionary)
            }
        };
        Dictionary.prototype.isEmpty = function () {
            var keys = Object.keys(this.__dictionary);
            return keys.length === 0
        };
        Dictionary.prototype.getLength = function () {
            var keys = Object.keys(this.__dictionary);
            return keys.length
        };
        Dictionary.prototype.allKeys = function () {
            return Object.keys(this.__dictionary)
        };
        Dictionary.prototype.getValue = function (key) {
            return this.__dictionary[key]
        };
        Dictionary.prototype.setValue = function (key, value) {
            if (value) {
                this.__dictionary[key] = value
            } else if (this.__dictionary.hasOwnProperty(key)) {
                delete this.__dictionary[key]
            }
        };
        Dictionary.prototype.removeValue = function (key) {
            var value;
            if (this.__dictionary.hasOwnProperty(key)) {
                value = this.__dictionary[key];
                delete this.__dictionary[key]
            } else {
                value = null
            }
            return value
        };
        Dictionary.prototype.getString = function (key, defaultValue) {
            var value = this.__dictionary[key];
            return Converter.getString(value, defaultValue)
        };
        Dictionary.prototype.getBoolean = function (key, defaultValue) {
            var value = this.__dictionary[key];
            return Converter.getBoolean(value, defaultValue)
        };
        Dictionary.prototype.getInt = function (key, defaultValue) {
            var value = this.__dictionary[key];
            return Converter.getInt(value, defaultValue)
        };
        Dictionary.prototype.getFloat = function (key, defaultValue) {
            var value = this.__dictionary[key];
            return Converter.getFloat(value, defaultValue)
        };
        Dictionary.prototype.getDateTime = function (key, defaultValue) {
            var value = this.__dictionary[key];
            return Converter.getDateTime(value, defaultValue)
        };
        Dictionary.prototype.setDateTime = function (key, time) {
            if (!time) {
                this.removeValue(key)
            } else if (time instanceof Date) {
                time = time.getTime() / 1000.0;
                this.__dictionary[key] = time
            } else {
                time = Converter.getFloat(time, 0);
                this.__dictionary[key] = time
            }
        };
        Dictionary.prototype.setString = function (key, string) {
            if (!string) {
                this.removeValue(key)
            } else {
                this.__dictionary[key] = string.toString()
            }
        };
        Dictionary.prototype.setMap = function (key, map) {
            if (!map) {
                this.removeValue(key)
            } else {
                this.__dictionary[key] = map.toMap()
            }
        };
        var is_array = function (obj) {
            return obj instanceof Array || is_number_array(obj)
        };
        var is_number_array = function (obj) {
            if (obj instanceof Uint8ClampedArray) {
                return true
            } else if (obj instanceof Uint8Array) {
                return true
            } else if (obj instanceof Int8Array) {
                return true
            } else if (obj instanceof Uint16Array) {
                return true
            } else if (obj instanceof Int16Array) {
                return true
            } else if (obj instanceof Uint32Array) {
                return true
            } else if (obj instanceof Int32Array) {
                return true
            } else if (obj instanceof Float32Array) {
                return true
            } else if (obj instanceof Float64Array) {
                return true
            }
            return false
        };
        var number_arrays_equal = function (array1, array2) {
            var pos = array1.length;
            if (pos !== array2.length) {
                return false
            }
            while (pos > 0) {
                pos -= 1;
                if (array1[pos] !== array2[pos]) {
                    return false
                }
            }
            return true
        };
        var arrays_equal = function (array1, array2) {
            if (is_number_array(array1) || is_number_array(array2)) {
                return number_arrays_equal(array1, array2)
            }
            var pos = array1.length;
            if (pos !== array2.length) {
                return false
            }
            while (pos > 0) {
                pos -= 1;
                if (!objects_equal(array1[pos], array2[pos], false)) {
                    return false
                }
            }
            return true
        };
        var maps_equal = function (dict1, dict2) {
            var keys1 = Object.keys(dict1);
            var keys2 = Object.keys(dict2);
            var pos = keys1.length;
            if (pos !== keys2.length) {
                return false
            }
            var key;
            while (pos > 0) {
                pos -= 1;
                key = keys1[pos];
                if (!key || key.length === 0) {
                    continue
                }
                if (!objects_equal(dict1[key], dict2[key], key.charAt(0) === '_')) {
                    return false
                }
            }
            return true
        };
        var objects_equal = function (obj1, obj2, shallow) {
            if (!obj1) {
                return !obj2
            } else if (!obj2) {
                return false
            } else if (obj1 === obj2) {
                return true
            }
            if (typeof obj1['equals'] === 'function') {
                return obj1.equals(obj2)
            } else if (typeof obj2['equals'] === 'function') {
                return obj2.equals(obj1)
            }
            if (is_array(obj1)) {
                return is_array(obj2) && arrays_equal(obj1, obj2)
            } else if (is_array(obj2)) {
                return false
            }
            if (obj1 instanceof Date) {
                return obj2 instanceof Date && obj1.getTime() === obj2.getTime()
            } else if (obj2 instanceof Date) {
                return false
            } else if (IObject.isBaseType(obj1)) {
                return false
            } else if (IObject.isBaseType(obj2)) {
                return false
            }
            return !shallow && maps_equal(obj1, obj2)
        };
        var copy_items = function (src, srcPos, dest, destPos, length) {
            if (srcPos !== 0 || length !== src.length) {
                src = src.subarray(srcPos, srcPos + length)
            }
            dest.set(src, destPos)
        };
        var insert_item = function (array, index, item) {
            if (index < 0) {
                index += array.length + 1;
                if (index < 0) {
                    return false
                }
            }
            if (index === 0) {
                array.unshift(item)
            } else if (index === array.length) {
                array.push(item)
            } else if (index > array.length) {
                array[index] = item
            } else {
                array.splice(index, 0, item)
            }
            return true
        };
        var update_item = function (array, index, item) {
            if (index < 0) {
                index += array.length;
                if (index < 0) {
                    return false
                }
            }
            array[index] = item;
            return true
        };
        var remove_item = function (array, item) {
            var index = find_item(array, item);
            if (index < 0) {
                return false
            } else if (index === 0) {
                array.shift()
            } else if ((index + 1) === array.length) {
                array.pop()
            } else {
                array.splice(index, 1)
            }
            return true
        };
        var find_item = function (array, item) {
            for (var i = 0; i < array.length; ++i) {
                if (objects_equal(array[i], item, false)) {
                    return i
                }
            }
            return -1
        };
        mk.type.Arrays = {
            insert: insert_item,
            update: update_item,
            remove: remove_item,
            find: find_item,
            equals: function (array1, array2) {
                return objects_equal(array1, array2, false)
            },
            copy: copy_items,
            isArray: is_array
        };
        var Arrays = mk.type.Arrays;
        var get_enum_alias = function (enumeration, value) {
            var alias = null;
            Mapper.forEach(enumeration, function (n, e) {
                if (e instanceof BaseEnum && e.equals(value)) {
                    alias = e.__alias;
                    return true
                }
                return false
            });
            return alias
        };
        mk.type.BaseEnum = function (value, alias) {
            BaseObject.call(this);
            if (!alias) {
                alias = get_enum_alias(this, value)
            }
            this.__value = value;
            this.__alias = alias
        };
        var BaseEnum = mk.type.BaseEnum;
        Class(BaseEnum, BaseObject, null);
        BaseEnum.prototype.equals = function (other) {
            if (other instanceof BaseEnum) {
                if (this === other) {
                    return true
                }
                other = other.valueOf()
            }
            return this.__value === other
        };
        BaseEnum.prototype.toString = function () {
            return '<' + this.getName() + ': ' + this.getValue() + '>'
        };
        BaseEnum.prototype.valueOf = function () {
            return this.__value
        };
        BaseEnum.prototype.getValue = function () {
            return this.__value
        };
        BaseEnum.prototype.getName = function () {
            return this.__alias
        };
        var enum_class = function (type) {
            var NamedEnum = function (value, alias) {
                BaseEnum.call(this, value, alias)
            };
            Class(NamedEnum, BaseEnum, null);
            Implementation(NamedEnum, {
                toString: function () {
                    var clazz = NamedEnum.__type;
                    if (!clazz) {
                        clazz = this.getClassName()
                    }
                    return '<' + clazz + ' ' + this.getName() + ': ' + this.getValue() + '>'
                }
            });
            NamedEnum.__type = type;
            return NamedEnum
        };
        mk.type.Enum = function (enumeration, elements) {
            if (IObject.isString(enumeration)) {
                enumeration = enum_class(enumeration)
            } else if (!enumeration) {
                enumeration = enum_class(null)
            } else {
                Class(enumeration, BaseEnum, null)
            }
            Mapper.forEach(elements, function (alias, value) {
                if (value instanceof BaseEnum) {
                    value = value.getValue()
                } else if (typeof value !== 'number') {
                    throw new TypeError('Enum value must be a number!');
                }
                enumeration[alias] = new enumeration(value, alias);
                return false
            });
            return enumeration
        };
        var Enum = mk.type.Enum;
        Enum.prototype.getValue = function () {
        };
        Enum.prototype.getName = function () {
        };
        Enum.isEnum = function (value) {
            return value instanceof BaseEnum
        };
        Enum.getInt = function (value, defaultValue) {
            if (value instanceof BaseEnum) {
                return value.getValue()
            }
            return Converter.getInt(value, defaultValue)
        };
        Enum.getString = function (value, defaultValue) {
            if (value instanceof BaseEnum) {
                return value.getName()
            }
            return Converter.getString(value, defaultValue)
        };
        mk.type.Set = Interface(null, [IObject]);
        var Set = mk.type.Set;
        Set.prototype = {
            isEmpty: function () {
            }, getLength: function () {
            }, contains: function (element) {
            }, add: function (element) {
            }, remove: function (element) {
            }, clear: function () {
            }, toArray: function () {
            }
        };
        mk.type.HashSet = function () {
            BaseObject.call(this);
            this.__array = []
        };
        var HashSet = mk.type.HashSet;
        Class(HashSet, BaseObject, [Set]);
        HashSet.prototype.equals = function (other) {
            if (Interface.conforms(other, Set)) {
                if (this === other) {
                    return true
                }
                other = other.valueOf()
            }
            return Arrays.equals(this.__array, other)
        };
        HashSet.prototype.valueOf = function () {
            return this.__array
        };
        HashSet.prototype.toString = function () {
            return this.__array.toString()
        };
        HashSet.prototype.isEmpty = function () {
            return this.__array.length === 0
        };
        HashSet.prototype.getLength = function () {
            return this.__array.length
        };
        HashSet.prototype.contains = function (item) {
            var pos = Arrays.find(this.__array, item);
            return pos >= 0
        };
        HashSet.prototype.add = function (item) {
            var pos = Arrays.find(this.__array, item);
            if (pos < 0) {
                this.__array.push(item);
                return true
            } else {
                return false
            }
        };
        HashSet.prototype.remove = function (item) {
            return Arrays.remove(this.__array, item)
        };
        HashSet.prototype.clear = function () {
            this.__array = []
        };
        HashSet.prototype.toArray = function () {
            return this.__array.slice()
        };
        mk.type.Stringer = Interface(null, [IObject]);
        var Stringer = mk.type.Stringer;
        Stringer.prototype = {
            isEmpty: function () {
            }, getLength: function () {
            }, equalsIgnoreCase: function (other) {
            }
        };
        mk.type.ConstantString = function (str) {
            BaseObject.call(this);
            if (!str) {
                str = ''
            } else if (Interface.conforms(str, Stringer)) {
                str = str.toString()
            }
            this.__string = str
        };
        var ConstantString = mk.type.ConstantString;
        Class(ConstantString, BaseObject, [Stringer]);
        ConstantString.prototype.equals = function (other) {
            if (Interface.conforms(other, Stringer)) {
                if (this === other) {
                    return true
                }
                other = other.valueOf()
            }
            return this.__string === other
        };
        ConstantString.prototype.valueOf = function () {
            return this.__string
        };
        ConstantString.prototype.toString = function () {
            return this.__string
        };
        ConstantString.prototype.isEmpty = function () {
            return this.__string.length === 0
        };
        ConstantString.prototype.getLength = function () {
            return this.__string.length
        };
        ConstantString.prototype.equalsIgnoreCase = function (other) {
            if (this === other) {
                return true
            } else if (!other) {
                return !this.__string
            } else if (Interface.conforms(other, Stringer)) {
                return equalsIgnoreCase(this.__string, other.toString())
            } else {
                return equalsIgnoreCase(this.__string, other)
            }
        };
        var equalsIgnoreCase = function (str1, str2) {
            if (str1.length !== str2.length) {
                return false
            }
            var low1 = str1.toLowerCase();
            var low2 = str2.toLowerCase();
            return low1 === low2
        };
        mk.type.Wrapper = {
            fetchString: function (str) {
                if (Interface.conforms(str, Stringer)) {
                    return str.toString()
                } else if (typeof str === 'string') {
                    return str
                } else {
                    return null
                }
            }, fetchMap: function (dict) {
                if (Interface.conforms(dict, Mapper)) {
                    return dict.toMap()
                } else if (typeof dict === 'object') {
                    return dict
                } else {
                    return null
                }
            }, unwrap: function (object) {
                if (IObject.isNull(object)) {
                    return null
                } else if (IObject.isBaseType(object)) {
                    return object
                } else if (Enum.isEnum(object)) {
                    return object.getValue()
                } else if (Interface.conforms(object, Stringer)) {
                    return object.toString()
                } else if (Interface.conforms(object, Mapper)) {
                    return this.unwrapMap(object.toMap())
                } else if (!Arrays.isArray(object)) {
                    return this.unwrapMap(object)
                } else if (object instanceof Array) {
                    return this.unwrapList(object)
                } else {
                    return object
                }
            }, unwrapMap: function (dict) {
                var result = {};
                Mapper.forEach(dict, function (key, value) {
                    result[key] = Wrapper.unwrap(value);
                    return false
                });
                return result
            }, unwrapList: function (array) {
                var result = [];
                var count = array.length;
                for (var i = 0; i < count; ++i) {
                    result[i] = this.unwrap(array[i])
                }
                return result
            }
        };
        var Wrapper = mk.type.Wrapper;
        mk.type.Copier = {
            copy: function (object) {
                if (IObject.isNull(object)) {
                    return null
                } else if (IObject.isBaseType(object)) {
                    return object
                } else if (Enum.isEnum(object)) {
                    return object.getValue()
                } else if (Interface.conforms(object, Stringer)) {
                    return object.toString()
                } else if (Interface.conforms(object, Mapper)) {
                    return this.copyMap(object.toMap())
                } else if (!Arrays.isArray(object)) {
                    return this.copyMap(object)
                } else if (object instanceof Array) {
                    return this.copyList(object)
                } else {
                    return object
                }
            }, copyMap: function (dict) {
                var clone = {};
                Mapper.forEach(dict, function (key, value) {
                    clone[key] = value;
                    return false
                });
                return clone
            }, copyList: function (array) {
                var clone = [];
                var count = array.length;
                for (var i = 0; i < count; ++i) {
                    clone.push(array[i])
                }
                return clone
            }, deepCopy: function (object) {
                if (IObject.isNull(object)) {
                    return null
                } else if (IObject.isBaseType(object)) {
                    return object
                } else if (Enum.isEnum(object)) {
                    return object.getValue()
                } else if (Interface.conforms(object, Stringer)) {
                    return object.toString()
                } else if (Interface.conforms(object, Mapper)) {
                    return this.deepCopyMap(object.toMap())
                } else if (!Arrays.isArray(object)) {
                    return this.deepCopyMap(object)
                } else if (object instanceof Array) {
                    return this.deepCopyList(object)
                } else {
                    return object
                }
            }, deepCopyMap: function (dict) {
                var clone = {};
                Mapper.forEach(dict, function (key, value) {
                    clone[key] = Copier.deepCopy(value);
                    return false
                });
                return clone
            }, deepCopyList: function (array) {
                var clone = [];
                var count = array.length;
                for (var i = 0; i < count; ++i) {
                    clone.push(this.deepCopy(array[i]))
                }
                return clone
            }
        };
        var Copier = mk.type.Copier;
        mk.digest.MessageDigester = Interface(null, null);
        var MessageDigester = mk.digest.MessageDigester;
        MessageDigester.prototype = {
            digest: function (data) {
            }
        };
        mk.digest.SHA256 = {
            digest: function (data) {
                return this.getDigester().digest(data)
            }, getDigester: function () {
                return sha256Digester
            }, setDigester: function (digester) {
                sha256Digester = digester
            }
        };
        var SHA256 = mk.digest.SHA256;
        var sha256Digester = null;
        mk.digest.RIPEMD160 = {
            digest: function (data) {
                return this.getDigester().digest(data)
            }, getDigester: function () {
                return ripemd160Digester
            }, setDigester: function (digester) {
                ripemd160Digester = digester
            }
        };
        var RIPEMD160 = mk.digest.RIPEMD160;
        var ripemd160Digester = null;
        mk.digest.KECCAK256 = {
            digest: function (data) {
                return this.getDigester().digest(data)
            }, getDigester: function () {
                return keccak256Digester
            }, setDigester: function (digester) {
                keccak256Digester = digester
            }
        };
        var KECCAK256 = mk.digest.KECCAK256;
        var keccak256Digester = null;
        mk.format.DataCoder = Interface(null, null);
        var DataCoder = mk.format.DataCoder;
        DataCoder.prototype = {
            encode: function (data) {
            }, decode: function (string) {
            }
        };
        mk.format.ObjectCoder = Interface(null, null);
        var ObjectCoder = mk.format.ObjectCoder;
        ObjectCoder.prototype = {
            encode: function (object) {
            }, decode: function (string) {
            }
        };
        mk.format.StringCoder = Interface(null, null);
        var StringCoder = mk.format.StringCoder;
        StringCoder.prototype = {
            encode: function (string) {
            }, decode: function (data) {
            }
        };
        mk.format.Hex = {
            encode: function (data) {
                return this.getCoder().encode(data)
            }, decode: function (string) {
                return this.getCoder().decode(string)
            }, getCoder: function () {
                return hexCoder
            }, setCoder: function (coder) {
                hexCoder = coder
            }
        };
        var Hex = mk.format.Hex;
        var hexCoder = null;
        mk.format.Base58 = {
            encode: function (data) {
                return this.getCoder().encode(data)
            }, decode: function (string) {
                return this.getCoder().decode(string)
            }, getCoder: function () {
                return base58Coder
            }, setCoder: function (coder) {
                base58Coder = coder
            }
        };
        var Base58 = mk.format.Base58;
        var base58Coder = null;
        mk.format.Base64 = {
            encode: function (data) {
                return this.getCoder().encode(data)
            }, decode: function (string) {
                return this.getCoder().decode(string)
            }, getCoder: function () {
                return base64Coder
            }, setCoder: function (coder) {
                base64Coder = coder
            }
        };
        var Base64 = mk.format.Base64;
        var base64Coder = null;
        mk.format.UTF8 = {
            encode: function (string) {
                return this.getCoder().encode(string)
            }, decode: function (data) {
                return this.getCoder().decode(data)
            }, getCoder: function () {
                return utf8Coder
            }, setCoder: function (coder) {
                utf8Coder = coder
            }
        };
        var UTF8 = mk.format.UTF8;
        var utf8Coder = null;
        mk.format.JSON = {
            encode: function (object) {
                return this.getCoder().encode(object)
            }, decode: function (string) {
                return this.getCoder().decode(string)
            }, getCoder: function () {
                return jsonCoder
            }, setCoder: function (coder) {
                jsonCoder = coder
            }
        };
        var jsonCoder = null;
        mk.format.JSONMap = {
            encode: function (dictionary) {
                return this.getCoder().encode(dictionary)
            }, decode: function (string) {
                return this.getCoder().decode(string)
            }, getCoder: function () {
                return jsonCoder
            }, setCoder: function (coder) {
                jsonCoder = coder
            }
        };
        var JSONMap = mk.format.JSONMap;
        mk.protocol.TransportableData = Interface(null, [Mapper]);
        var TransportableData = mk.protocol.TransportableData;
        TransportableData.prototype = {
            getAlgorithm: function () {
            }, getData: function () {
            }, toString: function () {
            }, toObject: function () {
            }
        };
        TransportableData.encode = function (data) {
            var ted = TransportableData.create(data);
            return ted.toObject()
        };
        TransportableData.decode = function (encoded) {
            var ted = TransportableData.parse(encoded);
            if (!ted) {
                return null
            }
            return ted.getData()
        };
        TransportableData.create = function (data, algorithm) {
            var helper = FormatExtensions.getTEDHelper();
            return helper.createTransportableData(data, algorithm)
        };
        TransportableData.parse = function (ted) {
            var helper = FormatExtensions.getTEDHelper();
            return helper.parseTransportableData(ted)
        };
        TransportableData.setFactory = function (algorithm, factory) {
            var helper = FormatExtensions.getTEDHelper();
            return helper.setTransportableDataFactory(algorithm, factory)
        };
        TransportableData.getFactory = function (algorithm) {
            var helper = FormatExtensions.getTEDHelper();
            return helper.getTransportableDataFactory(algorithm)
        };
        TransportableData.Factory = Interface(null, null);
        var TransportableDataFactory = TransportableData.Factory;
        TransportableDataFactory.prototype = {
            createTransportableData: function (data) {
            }, parseTransportableData: function (ted) {
            }
        };
        mk.protocol.PortableNetworkFile = Interface(null, [Mapper]);
        var PortableNetworkFile = mk.protocol.PortableNetworkFile;
        PortableNetworkFile.prototype = {
            setData: function (fileData) {
            }, getData: function () {
            }, setFilename: function (filename) {
            }, getFilename: function () {
            }, setURL: function (url) {
            }, getURL: function () {
            }, setPassword: function (key) {
            }, getPassword: function () {
            }, toString: function () {
            }, toObject: function () {
            }
        };
        PortableNetworkFile.createFromURL = function (url, password) {
            return PortableNetworkFile.create(null, null, url, password)
        };
        PortableNetworkFile.createFromData = function (ted, filename) {
            return PortableNetworkFile.create(ted, filename, null, null)
        };
        PortableNetworkFile.create = function (ted, filename, url, password) {
            var helper = FormatExtensions.getPNFHelper();
            return helper.createPortableNetworkFile(ted, filename, url, password)
        };
        PortableNetworkFile.parse = function (pnf) {
            var helper = FormatExtensions.getPNFHelper();
            return helper.parsePortableNetworkFile(pnf)
        };
        PortableNetworkFile.setFactory = function (factory) {
            var helper = FormatExtensions.getPNFHelper();
            return helper.setPortableNetworkFileFactory(factory)
        };
        PortableNetworkFile.getFactory = function () {
            var helper = FormatExtensions.getPNFHelper();
            return helper.getPortableNetworkFileFactory()
        };
        PortableNetworkFile.Factory = Interface(null, null);
        var PortableNetworkFileFactory = PortableNetworkFile.Factory;
        PortableNetworkFileFactory.prototype = {
            createPortableNetworkFile: function (ted, filename, url, password) {
            }, parsePortableNetworkFile: function (pnf) {
            }
        };
        mk.protocol.CryptographyKey = Interface(null, [Mapper]);
        var CryptographyKey = mk.protocol.CryptographyKey;
        CryptographyKey.prototype = {
            getAlgorithm: function () {
            }, getData: function () {
            }
        };
        mk.protocol.EncryptKey = Interface(null, [CryptographyKey]);
        var EncryptKey = mk.protocol.EncryptKey;
        EncryptKey.prototype = {
            encrypt: function (plaintext, extra) {
            }
        };
        mk.protocol.DecryptKey = Interface(null, [CryptographyKey]);
        var DecryptKey = mk.protocol.DecryptKey;
        DecryptKey.prototype = {
            decrypt: function (ciphertext, params) {
            }, matchEncryptKey: function (pKey) {
            }
        };
        mk.protocol.AsymmetricKey = Interface(null, [CryptographyKey]);
        var AsymmetricKey = mk.protocol.AsymmetricKey;
        mk.protocol.SignKey = Interface(null, [AsymmetricKey]);
        var SignKey = mk.protocol.SignKey;
        SignKey.prototype = {
            sign: function (data) {
            }
        };
        mk.protocol.VerifyKey = Interface(null, [AsymmetricKey]);
        var VerifyKey = mk.protocol.VerifyKey;
        VerifyKey.prototype = {
            verify: function (data, signature) {
            }, matchSignKey: function (sKey) {
            }
        };
        mk.protocol.SymmetricKey = Interface(null, [EncryptKey, DecryptKey]);
        var SymmetricKey = mk.protocol.SymmetricKey;
        SymmetricKey.generate = function (algorithm) {
            var helper = CryptoExtensions.getSymmetricHelper();
            return helper.generateSymmetricKey(algorithm)
        };
        SymmetricKey.parse = function (key) {
            var helper = CryptoExtensions.getSymmetricHelper();
            return helper.parseSymmetricKey(key)
        };
        SymmetricKey.setFactory = function (algorithm, factory) {
            var helper = CryptoExtensions.getSymmetricHelper();
            helper.setSymmetricKeyFactory(algorithm, factory)
        };
        SymmetricKey.getFactory = function (algorithm) {
            var helper = CryptoExtensions.getSymmetricHelper();
            return helper.getSymmetricKeyFactory(algorithm)
        };
        SymmetricKey.Factory = Interface(null, null);
        var SymmetricKeyFactory = SymmetricKey.Factory;
        SymmetricKeyFactory.prototype = {
            generateSymmetricKey: function () {
            }, parseSymmetricKey: function (key) {
            }
        };
        mk.protocol.PublicKey = Interface(null, [VerifyKey]);
        var PublicKey = mk.protocol.PublicKey;
        PublicKey.parse = function (key) {
            var helper = CryptoExtensions.getPublicHelper();
            return helper.parsePublicKey(key)
        };
        PublicKey.setFactory = function (algorithm, factory) {
            var helper = CryptoExtensions.getPublicHelper();
            helper.setPublicKeyFactory(algorithm, factory)
        };
        PublicKey.getFactory = function (algorithm) {
            var helper = CryptoExtensions.getPublicHelper();
            return helper.getPublicKeyFactory(algorithm)
        };
        PublicKey.Factory = Interface(null, null);
        var PublicKeyFactory = PublicKey.Factory;
        PublicKeyFactory.prototype = {
            parsePublicKey: function (key) {
            }
        };
        mk.protocol.PrivateKey = Interface(null, [SignKey]);
        var PrivateKey = mk.protocol.PrivateKey;
        PrivateKey.prototype = {
            getPublicKey: function () {
            }
        };
        PrivateKey.generate = function (algorithm) {
            var helper = CryptoExtensions.getPrivateHelper();
            return helper.generatePrivateKey(algorithm)
        };
        PrivateKey.parse = function (key) {
            var helper = CryptoExtensions.getPrivateHelper();
            return helper.parsePrivateKey(key)
        };
        PrivateKey.setFactory = function (algorithm, factory) {
            var helper = CryptoExtensions.getPrivateHelper();
            helper.setPrivateKeyFactory(algorithm, factory)
        };
        PrivateKey.getFactory = function (algorithm) {
            var helper = CryptoExtensions.getPrivateHelper();
            return helper.getPrivateKeyFactory(algorithm)
        };
        PrivateKey.Factory = Interface(null, null);
        var PrivateKeyFactory = PrivateKey.Factory;
        PrivateKeyFactory.prototype = {
            generatePrivateKey: function () {
            }, parsePrivateKey: function (key) {
            }
        };
        mk.ext.PublicKeyHelper = Interface(null, null);
        var PublicKeyHelper = mk.ext.PublicKeyHelper;
        PublicKeyHelper.prototype = {
            setPublicKeyFactory: function (algorithm, factory) {
            }, getPublicKeyFactory: function (algorithm) {
            }, parsePublicKey: function (key) {
            }
        };
        mk.ext.PrivateKeyHelper = Interface(null, null);
        var PrivateKeyHelper = mk.ext.PrivateKeyHelper;
        PrivateKeyHelper.prototype = {
            setPrivateKeyFactory: function (algorithm, factory) {
            }, getPrivateKeyFactory: function (algorithm) {
            }, generatePrivateKey: function (algorithm) {
            }, parsePrivateKey: function (key) {
            }
        };
        mk.ext.SymmetricKeyHelper = Interface(null, null);
        var SymmetricKeyHelper = mk.ext.SymmetricKeyHelper;
        SymmetricKeyHelper.prototype = {
            setSymmetricKeyFactory: function (algorithm, factory) {
            }, getSymmetricKeyFactory: function (algorithm) {
            }, generateSymmetricKey: function (algorithm) {
            }, parseSymmetricKey: function (key) {
            }
        };
        mk.ext.CryptoExtensions = {
            setPublicHelper: function (helper) {
                publicHelper = helper
            }, getPublicHelper: function () {
                return publicHelper
            }, setPrivateHelper: function (helper) {
                privateHelper = helper
            }, getPrivateHelper: function () {
                return privateHelper
            }, setSymmetricHelper: function (helper) {
                symmetricHelper = helper
            }, getSymmetricHelper: function () {
                return symmetricHelper
            }
        };
        var CryptoExtensions = mk.ext.CryptoExtensions;
        var publicHelper = null;
        var privateHelper = null;
        var symmetricHelper = null;
        mk.ext.GeneralCryptoHelper = Interface(null, null);
        var GeneralCryptoHelper = mk.ext.GeneralCryptoHelper;
        GeneralCryptoHelper.prototype = {
            getKeyAlgorithm: function (key, defaultValue) {
            }
        };
        GeneralCryptoHelper.PROMISE = 'Moky loves May Lee forever!';
        var sample_data = function () {
            var promise = GeneralCryptoHelper.PROMISE;
            if (promise instanceof Uint8Array) {
                return promise
            } else {
                var data = UTF8.encode(promise);
                GeneralCryptoHelper.PROMISE = data;
                return data
            }
        };
        GeneralCryptoHelper.matchAsymmetricKeys = function (sKey, pKey) {
            var promise = sample_data();
            var signature = sKey.sign(promise);
            return pKey.verify(promise, signature)
        };
        GeneralCryptoHelper.matchSymmetricKeys = function (encKey, decKey) {
            var promise = sample_data();
            var params = {};
            var ciphertext = encKey.encrypt(promise, params);
            var plaintext = decKey.decrypt(ciphertext, params);
            return plaintext && Arrays.equals(plaintext, promise)
        };
        mk.ext.SharedCryptoExtensions = {
            setPublicHelper: function (helper) {
                CryptoExtensions.setPublicHelper(helper)
            }, getPublicHelper: function () {
                return CryptoExtensions.getPublicHelper()
            }, setPrivateHelper: function (helper) {
                CryptoExtensions.setPrivateHelper(helper)
            }, getPrivateHelper: function () {
                return CryptoExtensions.getPrivateHelper()
            }, setSymmetricHelper: function (helper) {
                CryptoExtensions.setSymmetricHelper(helper)
            }, getSymmetricHelper: function () {
                return CryptoExtensions.getSymmetricHelper()
            }, setHelper: function (helper) {
                generalCryptoHelper = helper
            }, getHelper: function () {
                return generalCryptoHelper
            }
        };
        var SharedCryptoExtensions = mk.ext.SharedCryptoExtensions;
        var generalCryptoHelper = null;
        mk.ext.TransportableDataHelper = Interface(null, null);
        var TransportableDataHelper = mk.ext.TransportableDataHelper;
        TransportableDataHelper.prototype = {
            setTransportableDataFactory: function (algorithm, factory) {
            }, getTransportableDataFactory: function (algorithm) {
            }, createTransportableData: function (data, algorithm) {
            }, parseTransportableData: function (ted) {
            }
        };
        mk.ext.PortableNetworkFileHelper = Interface(null, null);
        var PortableNetworkFileHelper = mk.ext.PortableNetworkFileHelper;
        PortableNetworkFileHelper.prototype = {
            setPortableNetworkFileFactory: function (factory) {
            }, getPortableNetworkFileFactory: function () {
            }, createPortableNetworkFile: function (data, filename, url, password) {
            }, parsePortableNetworkFile: function (pnf) {
            }
        };
        mk.ext.FormatExtensions = {
            setTEDHelper: function (helper) {
                tedHelper = helper
            }, getTEDHelper: function () {
                return tedHelper
            }, setPNFHelper: function (helper) {
                pnfHelper = helper
            }, getPNFHelper: function () {
                return pnfHelper
            }
        };
        var FormatExtensions = mk.ext.FormatExtensions;
        var tedHelper = null;
        var pnfHelper = null;
        mk.ext.GeneralFormatHelper = Interface(null, null);
        var GeneralFormatHelper = mk.ext.GeneralFormatHelper;
        GeneralFormatHelper.prototype = {
            getFormatAlgorithm: function (ted, defaultValue) {
            }
        };
        mk.ext.SharedFormatExtensions = {
            setTEDHelper: function (helper) {
                FormatExtensions.setTEDHelper(helper)
            }, getTEDHelper: function () {
                return FormatExtensions.getTEDHelper()
            }, setPNFHelper: function (helper) {
                FormatExtensions.setPNFHelper(helper)
            }, getPNFHelper: function () {
                return FormatExtensions.getPNFHelper()
            }, setHelper: function (helper) {
                generalFormatHelper = helper
            }, getHelper: function () {
                return generalFormatHelper
            }
        };
        var SharedFormatExtensions = mk.ext.SharedFormatExtensions;
        var generalFormatHelper = null
    })(MONKEY);
    if (typeof MingKeMing !== 'object') {
        MingKeMing = {}
    }
    (function (mkm, mk) {
        if (typeof mkm.protocol !== 'object') {
            mkm.protocol = {}
        }
        if (typeof mkm.mkm !== 'object') {
            mkm.mkm = {}
        }
        if (typeof mkm.ext !== 'object') {
            mkm.ext = {}
        }
        var Interface = mk.type.Interface;
        var Class = mk.type.Class;
        var IObject = mk.type.Object;
        var Stringer = mk.type.Stringer;
        var Mapper = mk.type.Mapper;
        var Enum = mk.type.Enum;
        var ConstantString = mk.type.ConstantString;
        mkm.protocol.EntityType = {
            USER: (0x00),
            GROUP: (0x01),
            STATION: (0x02),
            ISP: (0x03),
            BOT: (0x04),
            ICP: (0x05),
            SUPERVISOR: (0x06),
            COMPANY: (0x07),
            ANY: (0x80),
            EVERY: (0x81)
        };
        var EntityType = mkm.protocol.EntityType;
        EntityType.isUser = function (network) {
            var user = 0x00;
            var group = 0x01;
            return (network & group) === user
        };
        EntityType.isGroup = function (network) {
            var group = 0x01;
            return (network & group) === group
        };
        EntityType.isBroadcast = function (network) {
            var any = 0x80;
            return (network & any) === any
        };
        mkm.protocol.Address = Interface(null, [Stringer]);
        var Address = mkm.protocol.Address;
        Address.prototype.getType = function () {
        };
        Address.ANYWHERE = null;
        Address.EVERYWHERE = null;
        Address.generate = function (meta, network) {
            var helper = AccountExtensions.getAddressHelper();
            return helper.generateAddress(meta, network)
        };
        Address.parse = function (address) {
            var helper = AccountExtensions.getAddressHelper();
            return helper.parseAddress(address)
        };
        Address.setFactory = function (factory) {
            var helper = AccountExtensions.getAddressHelper();
            helper.setAddressFactory(factory)
        };
        Address.getFactory = function () {
            var helper = AccountExtensions.getAddressHelper();
            return helper.getAddressFactory()
        };
        Address.Factory = Interface(null, null);
        var AddressFactory = Address.Factory;
        AddressFactory.prototype.generateAddress = function (meta, network) {
        };
        AddressFactory.prototype.parseAddress = function (address) {
        };
        mkm.protocol.ID = Interface(null, [Stringer]);
        var ID = mkm.protocol.ID;
        ID.prototype.getName = function () {
        };
        ID.prototype.getAddress = function () {
        };
        ID.prototype.getTerminal = function () {
        };
        ID.prototype.getType = function () {
        };
        ID.prototype.isBroadcast = function () {
        };
        ID.prototype.isUser = function () {
        };
        ID.prototype.isGroup = function () {
        };
        ID.ANYONE = null;
        ID.EVERYONE = null;
        ID.FOUNDER = null;
        ID.convert = function (array) {
            var members = [];
            var did;
            for (var i = 0; i < array.length; ++i) {
                did = ID.parse(array[i]);
                if (did) {
                    members.push(did)
                }
            }
            return members
        };
        ID.revert = function (identifiers) {
            var array = [];
            var did;
            for (var i = 0; i < identifiers.length; ++i) {
                did = identifiers[i];
                if (Interface.conforms(did, Stringer)) {
                    array.push(did.toString())
                } else if (IObject.isString(did)) {
                    array.push(did)
                }
            }
            return array
        };
        ID.generate = function (meta, network, terminal) {
            var helper = AccountExtensions.getIdentifierHelper();
            return helper.generateIdentifier(meta, network, terminal)
        };
        ID.create = function (name, address, terminal) {
            var helper = AccountExtensions.getIdentifierHelper();
            return helper.createIdentifier(name, address, terminal)
        };
        ID.parse = function (identifier) {
            var helper = AccountExtensions.getIdentifierHelper();
            return helper.parseIdentifier(identifier)
        };
        ID.setFactory = function (factory) {
            var helper = AccountExtensions.getIdentifierHelper();
            helper.setIdentifierFactory(factory)
        };
        ID.getFactory = function () {
            var helper = AccountExtensions.getIdentifierHelper();
            return helper.getIdentifierFactory()
        };
        ID.Factory = Interface(null, null);
        var IDFactory = ID.Factory;
        IDFactory.prototype.generateIdentifier = function (meta, network, terminal) {
        };
        IDFactory.prototype.createIdentifier = function (name, address, terminal) {
        };
        IDFactory.prototype.parseIdentifier = function (identifier) {
        };
        mkm.protocol.Meta = Interface(null, [Mapper]);
        var Meta = mkm.protocol.Meta;
        Meta.prototype.getType = function () {
        };
        Meta.prototype.getPublicKey = function () {
        };
        Meta.prototype.getSeed = function () {
        };
        Meta.prototype.getFingerprint = function () {
        };
        Meta.prototype.isValid = function () {
        };
        Meta.prototype.generateAddress = function (network) {
        };
        Meta.create = function (type, key, seed, fingerprint) {
            var helper = AccountExtensions.getMetaHelper();
            return helper.createMeta(type, key, seed, fingerprint)
        };
        Meta.generate = function (type, sKey, seed) {
            var helper = AccountExtensions.getMetaHelper();
            return helper.generateMeta(type, sKey, seed)
        };
        Meta.parse = function (meta) {
            var helper = AccountExtensions.getMetaHelper();
            return helper.parseMeta(meta)
        };
        Meta.setFactory = function (type, factory) {
            var helper = AccountExtensions.getMetaHelper();
            helper.setMetaFactory(type, factory)
        };
        Meta.getFactory = function (type) {
            var helper = AccountExtensions.getMetaHelper();
            return helper.getMetaFactory(type)
        };
        Meta.Factory = Interface(null, null);
        var MetaFactory = Meta.Factory;
        MetaFactory.prototype.createMeta = function (pKey, seed, fingerprint) {
        };
        MetaFactory.prototype.generateMeta = function (sKey, seed) {
        };
        MetaFactory.prototype.parseMeta = function (meta) {
        };
        mkm.protocol.TAI = Interface(null, null);
        var TAI = mkm.protocol.TAI;
        TAI.prototype.isValid = function () {
        };
        TAI.prototype.verify = function (pKey) {
        };
        TAI.prototype.sign = function (sKey) {
        };
        TAI.prototype.allProperties = function () {
        };
        TAI.prototype.getProperty = function (name) {
        };
        TAI.prototype.setProperty = function (name, value) {
        };
        mkm.protocol.Document = Interface(null, [TAI, Mapper]);
        var Document = mkm.protocol.Document;
        Document.prototype.getIdentifier = function () {
        };
        Document.prototype.getTime = function () {
        };
        Document.prototype.setName = function (name) {
        };
        Document.prototype.getName = function () {
        };
        Document.convert = function (array) {
            var documents = [];
            var doc;
            for (var i = 0; i < array.length; ++i) {
                doc = Document.parse(array[i]);
                if (doc) {
                    documents.push(doc)
                }
            }
            return documents
        };
        Document.revert = function (documents) {
            var array = [];
            var doc;
            for (var i = 0; i < documents.length; ++i) {
                doc = documents[i];
                if (Interface.conforms(doc, Mapper)) {
                    array.push(doc.toMap())
                } else {
                    array.push(doc)
                }
            }
            return array
        };
        Document.create = function (type, identifier, data, signature) {
            var helper = AccountExtensions.getDocumentHelper();
            return helper.createDocument(type, identifier, data, signature)
        };
        Document.parse = function (doc) {
            var helper = AccountExtensions.getDocumentHelper();
            return helper.parseDocument(doc)
        };
        Document.setFactory = function (type, factory) {
            var helper = AccountExtensions.getDocumentHelper();
            helper.setDocumentFactory(type, factory)
        };
        Document.getFactory = function (type) {
            var helper = AccountExtensions.getDocumentHelper();
            return helper.getDocumentFactory(type)
        };
        Document.Factory = Interface(null, null);
        var DocumentFactory = Document.Factory;
        DocumentFactory.prototype.createDocument = function (identifier, data, signature) {
        };
        DocumentFactory.prototype.parseDocument = function (doc) {
        };
        mkm.mkm.BroadcastAddress = function (string, network) {
            ConstantString.call(this, string);
            this.__network = Enum.getInt(network)
        };
        var BroadcastAddress = mkm.mkm.BroadcastAddress;
        Class(BroadcastAddress, ConstantString, [Address]);
        BroadcastAddress.prototype.getType = function () {
            return this.__network
        };
        Address.ANYWHERE = new BroadcastAddress('anywhere', EntityType.ANY);
        Address.EVERYWHERE = new BroadcastAddress('everywhere', EntityType.EVERY);
        mkm.mkm.Identifier = function (identifier, name, address, terminal) {
            ConstantString.call(this, identifier);
            this.__name = name;
            this.__address = address;
            this.__terminal = terminal
        };
        var Identifier = mkm.mkm.Identifier;
        Class(Identifier, ConstantString, [ID]);
        Identifier.prototype.getName = function () {
            return this.__name
        };
        Identifier.prototype.getAddress = function () {
            return this.__address
        };
        Identifier.prototype.getTerminal = function () {
            return this.__terminal
        };
        Identifier.prototype.getType = function () {
            var address = this.__address;
            return address.getType()
        };
        Identifier.prototype.isBroadcast = function () {
            var network = this.getType();
            return EntityType.isBroadcast(network)
        };
        Identifier.prototype.isUser = function () {
            var network = this.getType();
            return EntityType.isUser(network)
        };
        Identifier.prototype.isGroup = function () {
            var network = this.getType();
            return EntityType.isGroup(network)
        };
        Identifier.create = function (name, address, terminal) {
            var string = Identifier.concat(name, address, terminal);
            return new Identifier(string, name, address, terminal)
        };
        Identifier.concat = function (name, address, terminal) {
            var string = address.toString();
            if (name && name.length > 0) {
                string = name + '@' + string
            }
            if (terminal && terminal.length > 0) {
                string = string + '/' + terminal
            }
            return string
        };
        ID.ANYONE = Identifier.create("anyone", Address.ANYWHERE, null);
        ID.EVERYONE = Identifier.create("everyone", Address.EVERYWHERE, null);
        ID.FOUNDER = Identifier.create("moky", Address.ANYWHERE, null);
        mkm.ext.AddressHelper = Interface(null, null);
        var AddressHelper = mkm.ext.AddressHelper;
        AddressHelper.prototype = {
            setAddressFactory: function (factory) {
            }, getAddressFactory: function () {
            }, parseAddress: function (address) {
            }, generateAddress: function (meta, network) {
            }
        };
        mkm.ext.IdentifierHelper = Interface(null, null);
        var IdentifierHelper = mkm.ext.IdentifierHelper;
        IdentifierHelper.prototype = {
            setIdentifierFactory: function (factory) {
            }, getIdentifierFactory: function () {
            }, parseIdentifier: function (identifier) {
            }, createIdentifier: function (name, address, terminal) {
            }, generateIdentifier: function (meta, network, terminal) {
            }
        };
        mkm.ext.MetaHelper = Interface(null, null);
        var MetaHelper = mkm.ext.MetaHelper;
        MetaHelper.prototype = {
            setMetaFactory: function (type, factory) {
            }, getMetaFactory: function (type) {
            }, createMeta: function (type, key, seed, fingerprint) {
            }, generateMeta: function (type, sKey, seed) {
            }, parseMeta: function (meta) {
            }
        };
        mkm.ext.DocumentHelper = Interface(null, null);
        var DocumentHelper = mkm.ext.DocumentHelper;
        DocumentHelper.prototype = {
            setDocumentFactory: function (type, factory) {
            }, getDocumentFactory: function (type) {
            }, createDocument: function (type, identifier, data, signature) {
            }, parseDocument: function (doc) {
            }
        };
        mkm.ext.AccountExtensions = {
            setAddressHelper: function (helper) {
                addressHelper = helper
            }, getAddressHelper: function () {
                return addressHelper
            }, setIdentifierHelper: function (helper) {
                idHelper = helper
            }, getIdentifierHelper: function () {
                return idHelper
            }, setMetaHelper: function (helper) {
                metaHelper = helper
            }, getMetaHelper: function () {
                return metaHelper
            }, setDocumentHelper: function (helper) {
                docHelper = helper
            }, getDocumentHelper: function () {
                return docHelper
            }
        };
        var AccountExtensions = mkm.ext.AccountExtensions;
        var addressHelper = null;
        var idHelper = null;
        var metaHelper = null;
        var docHelper = null;
        mkm.ext.GeneralAccountHelper = Interface(null, null);
        var GeneralAccountHelper = mkm.ext.GeneralAccountHelper;
        GeneralAccountHelper.prototype = {
            getMetaType: function (meta, defaultValue) {
            }, getDocumentType: function (doc, defaultValue) {
            }
        };
        mkm.ext.SharedAccountExtensions = {
            setAddressHelper: function (helper) {
                AccountExtensions.setAddressHelper(helper)
            }, getAddressHelper: function () {
                return AccountExtensions.getAddressHelper()
            }, setIdentifierHelper: function (helper) {
                AccountExtensions.setIdentifierHelper(helper)
            }, getIdentifierHelper: function () {
                return AccountExtensions.getIdentifierHelper()
            }, setMetaHelper: function (helper) {
                AccountExtensions.setMetaHelper(helper)
            }, getMetaHelper: function () {
                return AccountExtensions.getMetaHelper()
            }, setDocumentHelper: function (helper) {
                AccountExtensions.setDocumentHelper(helper)
            }, getDocumentHelper: function () {
                return AccountExtensions.getDocumentHelper()
            }, setHelper: function (helper) {
                generalAccountHelper = helper
            }, getHelper: function () {
                return generalAccountHelper
            }
        };
        var SharedAccountExtensions = mkm.ext.SharedAccountExtensions;
        var generalAccountHelper = null
    })(MingKeMing, MONKEY);
    if (typeof DaoKeDao !== 'object') {
        DaoKeDao = {}
    }
    (function (dkd, mk) {
        if (typeof dkd.protocol !== 'object') {
            dkd.protocol = {}
        }
        if (typeof dkd.ext !== 'object') {
            dkd.ext = {}
        }
        var Interface = mk.type.Interface;
        var Mapper = mk.type.Mapper;
        dkd.protocol.Content = Interface(null, [Mapper]);
        var Content = dkd.protocol.Content;
        Content.prototype.getType = function () {
        };
        Content.prototype.getSerialNumber = function () {
        };
        Content.prototype.getTime = function () {
        };
        Content.prototype.setGroup = function (identifier) {
        };
        Content.prototype.getGroup = function () {
        };
        Content.convert = function (array) {
            var contents = [];
            var msg;
            for (var i = 0; i < array.length; ++i) {
                msg = Content.parse(array[i]);
                if (msg) {
                    contents.push(msg)
                }
            }
            return contents
        };
        Content.revert = function (contents) {
            var array = [];
            var msg;
            for (var i = 0; i < contents.length; ++i) {
                msg = contents[i];
                if (Interface.conforms(msg, Mapper)) {
                    array.push(msg.toMap())
                } else {
                    array.push(msg)
                }
            }
            return array
        };
        Content.parse = function (content) {
            var helper = MessageExtensions.getContentHelper();
            return helper.parseContent(content)
        };
        Content.setFactory = function (type, factory) {
            var helper = MessageExtensions.getContentHelper();
            helper.setContentFactory(type, factory)
        };
        Content.getFactory = function (type) {
            var helper = MessageExtensions.getContentHelper();
            return helper.getContentFactory(type)
        };
        Content.Factory = Interface(null, null);
        var ContentFactory = Content.Factory;
        ContentFactory.prototype.parseContent = function (content) {
        };
        dkd.protocol.Envelope = Interface(null, [Mapper]);
        var Envelope = dkd.protocol.Envelope;
        Envelope.prototype.getSender = function () {
        };
        Envelope.prototype.getReceiver = function () {
        };
        Envelope.prototype.getTime = function () {
        };
        Envelope.prototype.setGroup = function (identifier) {
        };
        Envelope.prototype.getGroup = function () {
        };
        Envelope.prototype.setType = function (type) {
        };
        Envelope.prototype.getType = function () {
        };
        Envelope.create = function (from, to, when) {
            var helper = MessageExtensions.getEnvelopeHelper();
            return helper.createEnvelope(from, to, when)
        };
        Envelope.parse = function (env) {
            var helper = MessageExtensions.getEnvelopeHelper();
            return helper.parseEnvelope(env)
        };
        Envelope.getFactory = function () {
            var helper = MessageExtensions.getEnvelopeHelper();
            return helper.getEnvelopeFactory()
        };
        Envelope.setFactory = function (factory) {
            var helper = MessageExtensions.getEnvelopeHelper();
            helper.setEnvelopeFactory(factory)
        };
        Envelope.Factory = Interface(null, null);
        var EnvelopeFactory = Envelope.Factory;
        EnvelopeFactory.prototype.createEnvelope = function (from, to, when) {
        };
        EnvelopeFactory.prototype.parseEnvelope = function (env) {
        };
        dkd.protocol.Message = Interface(null, [Mapper]);
        var Message = dkd.protocol.Message;
        Message.prototype.getEnvelope = function () {
        };
        Message.prototype.getSender = function () {
        };
        Message.prototype.getReceiver = function () {
        };
        Message.prototype.getTime = function () {
        };
        Message.prototype.getGroup = function () {
        };
        Message.prototype.getType = function () {
        };
        dkd.protocol.InstantMessage = Interface(null, [Message]);
        var InstantMessage = dkd.protocol.InstantMessage;
        InstantMessage.prototype.getContent = function () {
        };
        InstantMessage.convert = function (array) {
            var messages = [];
            var msg;
            for (var i = 0; i < array.length; ++i) {
                msg = InstantMessage.parse(array[i]);
                if (msg) {
                    messages.push(msg)
                }
            }
            return messages
        };
        InstantMessage.revert = function (messages) {
            var array = [];
            var msg;
            for (var i = 0; i < messages.length; ++i) {
                msg = messages[i];
                if (Interface.conforms(msg, Mapper)) {
                    array.push(msg.toMap())
                } else {
                    array.push(msg)
                }
            }
            return array
        };
        InstantMessage.generateSerialNumber = function (type, now) {
            var helper = MessageExtensions.getInstantHelper();
            return helper.generateSerialNumber(type, now)
        };
        InstantMessage.create = function (head, body) {
            var helper = MessageExtensions.getInstantHelper();
            return helper.createInstantMessage(head, body)
        };
        InstantMessage.parse = function (msg) {
            var helper = MessageExtensions.getInstantHelper();
            return helper.parseInstantMessage(msg)
        };
        InstantMessage.getFactory = function () {
            var helper = MessageExtensions.getInstantHelper();
            return helper.getInstantMessageFactory()
        };
        InstantMessage.setFactory = function (factory) {
            var helper = MessageExtensions.getInstantHelper();
            helper.setInstantMessageFactory(factory)
        };
        InstantMessage.Factory = Interface(null, null);
        var InstantMessageFactory = InstantMessage.Factory;
        InstantMessageFactory.prototype.generateSerialNumber = function (msgType, now) {
        };
        InstantMessageFactory.prototype.createInstantMessage = function (head, body) {
        };
        InstantMessageFactory.prototype.parseInstantMessage = function (msg) {
        };
        dkd.protocol.SecureMessage = Interface(null, [Message]);
        var SecureMessage = dkd.protocol.SecureMessage;
        SecureMessage.prototype.getData = function () {
        };
        SecureMessage.prototype.getEncryptedKey = function () {
        };
        SecureMessage.prototype.getEncryptedKeys = function () {
        };
        SecureMessage.parse = function (msg) {
            var helper = MessageExtensions.getSecureHelper();
            return helper.parseSecureMessage(msg)
        };
        SecureMessage.getFactory = function () {
            var helper = MessageExtensions.getSecureHelper();
            return helper.getSecureMessageFactory()
        };
        SecureMessage.setFactory = function (factory) {
            var helper = MessageExtensions.getSecureHelper();
            helper.setSecureMessageFactory(factory)
        };
        SecureMessage.Factory = Interface(null, null);
        var SecureMessageFactory = SecureMessage.Factory;
        SecureMessageFactory.prototype.parseSecureMessage = function (msg) {
        };
        dkd.protocol.ReliableMessage = Interface(null, [SecureMessage]);
        var ReliableMessage = dkd.protocol.ReliableMessage;
        ReliableMessage.prototype.getSignature = function () {
        };
        ReliableMessage.convert = function (array) {
            var messages = [];
            var msg;
            for (var i = 0; i < array.length; ++i) {
                msg = ReliableMessage.parse(array[i]);
                if (msg) {
                    messages.push(msg)
                }
            }
            return messages
        };
        ReliableMessage.revert = function (messages) {
            var array = [];
            var msg;
            for (var i = 0; i < messages.length; ++i) {
                msg = messages[i];
                if (Interface.conforms(msg, Mapper)) {
                    array.push(msg.toMap())
                } else {
                    array.push(msg)
                }
            }
            return array
        };
        ReliableMessage.parse = function (msg) {
            var helper = MessageExtensions.getReliableHelper();
            return helper.parseReliableMessage(msg)
        };
        ReliableMessage.getFactory = function () {
            var helper = MessageExtensions.getReliableHelper();
            return helper.getReliableMessageFactory()
        };
        ReliableMessage.setFactory = function (factory) {
            var helper = MessageExtensions.getReliableHelper();
            helper.setReliableMessageFactory(factory)
        };
        ReliableMessage.Factory = Interface(null, null);
        var ReliableMessageFactory = ReliableMessage.Factory;
        ReliableMessageFactory.prototype.parseReliableMessage = function (msg) {
        };
        dkd.ext.ContentHelper = Interface(null, null);
        var ContentHelper = dkd.ext.ContentHelper;
        ContentHelper.prototype = {
            setContentFactory: function (msg_type, factory) {
            }, getContentFactory: function (msg_type) {
            }, parseContent: function (content) {
            }
        };
        dkd.ext.EnvelopeHelper = Interface(null, null);
        var EnvelopeHelper = dkd.ext.EnvelopeHelper;
        EnvelopeHelper.prototype = {
            setEnvelopeFactory: function (factory) {
            }, getEnvelopeFactory: function () {
            }, createEnvelope: function (sender, receiver, time) {
            }, parseEnvelope: function (env) {
            }
        };
        dkd.ext.InstantMessageHelper = Interface(null, null);
        var InstantMessageHelper = dkd.ext.InstantMessageHelper;
        InstantMessageHelper.prototype = {
            setInstantMessageFactory: function (factory) {
            }, getInstantMessageFactory: function () {
            }, createInstantMessage: function (head, body) {
            }, parseInstantMessage: function (msg) {
            }, generateSerialNumber: function (msg_type, when) {
            }
        };
        dkd.ext.SecureMessageHelper = Interface(null, null);
        var SecureMessageHelper = dkd.ext.SecureMessageHelper;
        SecureMessageHelper.prototype = {
            setSecureMessageFactory: function (factory) {
            }, getSecureMessageFactory: function () {
            }, parseSecureMessage: function (msg) {
            }
        };
        dkd.ext.ReliableMessageHelper = Interface(null, null);
        var ReliableMessageHelper = dkd.ext.ReliableMessageHelper;
        ReliableMessageHelper.prototype = {
            setReliableMessageFactory: function (factory) {
            }, getReliableMessageFactory: function () {
            }, parseReliableMessage: function (msg) {
            }
        };
        dkd.ext.MessageExtensions = {
            setContentHelper: function (helper) {
                contentHelper = helper
            }, getContentHelper: function () {
                return contentHelper
            }, setEnvelopeHelper: function (helper) {
                envelopeHelper = helper
            }, getEnvelopeHelper: function () {
                return envelopeHelper
            }, setInstantHelper: function (helper) {
                instantHelper = helper
            }, getInstantHelper: function () {
                return instantHelper
            }, setSecureHelper: function (helper) {
                secureHelper = helper
            }, getSecureHelper: function () {
                return secureHelper
            }, setReliableHelper: function (helper) {
                reliableHelper = helper
            }, getReliableHelper: function () {
                return reliableHelper
            }
        };
        var MessageExtensions = dkd.ext.MessageExtensions;
        var contentHelper = null;
        var envelopeHelper = null;
        var instantHelper = null;
        var secureHelper = null;
        var reliableHelper = null;
        dkd.ext.GeneralMessageHelper = Interface(null, null);
        var GeneralMessageHelper = dkd.ext.GeneralMessageHelper;
        GeneralMessageHelper.prototype = {
            getContentType: function (content, defaultValue) {
            }
        };
        dkd.ext.SharedMessageExtensions = {
            setContentHelper: function (helper) {
                MessageExtensions.setContentHelper(helper)
            }, getContentHelper: function () {
                return MessageExtensions.getContentHelper()
            }, setEnvelopeHelper: function (helper) {
                MessageExtensions.setEnvelopeHelper(helper)
            }, getEnvelopeHelper: function () {
                return MessageExtensions.getEnvelopeHelper()
            }, setInstantHelper: function (helper) {
                MessageExtensions.setInstantHelper(helper)
            }, getInstantHelper: function () {
                return MessageExtensions.getInstantHelper()
            }, setSecureHelper: function (helper) {
                MessageExtensions.setSecureHelper(helper)
            }, getSecureHelper: function () {
                return MessageExtensions.getSecureHelper()
            }, setReliableHelper: function (helper) {
                MessageExtensions.setReliableHelper(helper)
            }, getReliableHelper: function () {
                return MessageExtensions.getReliableHelper()
            }, setHelper: function (helper) {
                generalMessageHelper = helper
            }, getHelper: function () {
                return generalMessageHelper
            }
        };
        var SharedMessageExtensions = dkd.ext.SharedMessageExtensions;
        var generalMessageHelper = null
    })(DaoKeDao, MONKEY);
    (function (dkd, mkm, mk) {
        if (typeof mk.crypto !== 'object') {
            mk.crypto = {}
        }
        if (typeof dkd.dkd !== 'object') {
            dkd.dkd = {}
        }
        if (typeof dkd.msg !== 'object') {
            dkd.msg = {}
        }
        var Interface = mk.type.Interface;
        var Class = mk.type.Class;
        var Implementation = mk.type.Implementation;
        var IObject = mk.type.Object;
        var Dictionary = mk.type.Dictionary;
        var Converter = mk.type.Converter;
        var Base64 = mk.format.Base64;
        var Base58 = mk.format.Base58;
        var Hex = mk.format.Hex;
        var UTF8 = mk.format.UTF8;
        var JSONMap = mk.format.JSONMap;
        var TransportableData = mk.protocol.TransportableData;
        var PortableNetworkFile = mk.protocol.PortableNetworkFile;
        var CryptographyKey = mk.protocol.CryptographyKey;
        var EncryptKey = mk.protocol.EncryptKey;
        var SymmetricKey = mk.protocol.SymmetricKey;
        var AsymmetricKey = mk.protocol.AsymmetricKey;
        var PrivateKey = mk.protocol.PrivateKey;
        var PublicKey = mk.protocol.PublicKey;
        var GeneralCryptoHelper = mk.ext.GeneralCryptoHelper;
        var SharedCryptoExtensions = mk.ext.SharedCryptoExtensions;
        var ID = mkm.protocol.ID;
        var Meta = mkm.protocol.Meta;
        var Document = mkm.protocol.Document;
        var SharedAccountExtensions = mkm.ext.SharedAccountExtensions;
        var Envelope = dkd.protocol.Envelope;
        var Content = dkd.protocol.Content;
        var Message = dkd.protocol.Message;
        var InstantMessage = dkd.protocol.InstantMessage;
        var SecureMessage = dkd.protocol.SecureMessage;
        var ReliableMessage = dkd.protocol.ReliableMessage;
        var SharedMessageExtensions = dkd.ext.SharedMessageExtensions;
        mk.protocol.AsymmetricAlgorithms = {RSA: 'RSA', ECC: 'ECC'};
        var AsymmetricAlgorithms = mk.protocol.AsymmetricAlgorithms;
        mk.protocol.SymmetricAlgorithms = {AES: 'AES', DES: 'DES', PLAIN: 'PLAIN'};
        var SymmetricAlgorithms = mk.protocol.SymmetricAlgorithms;
        mk.protocol.EncodeAlgorithms = {DEFAULT: 'base64', BASE_64: 'base64', BASE_58: 'base58', HEX: 'hex'};
        var EncodeAlgorithms = mk.protocol.EncodeAlgorithms;
        mkm.protocol.MetaType = {
            DEFAULT: '' + (1),
            MKM: '' + (1),
            BTC: '' + (2),
            ExBTC: '' + (3),
            ETH: '' + (4),
            ExETH: '' + (5)
        };
        var MetaType = mkm.protocol.MetaType;
        mkm.protocol.DocumentType = {VISA: 'visa', PROFILE: 'profile', BULLETIN: 'bulletin'};
        var DocumentType = mkm.protocol.DocumentType;
        mkm.protocol.Visa = Interface(null, [Document]);
        var Visa = mkm.protocol.Visa;
        Visa.prototype.getPublicKey = function () {
        };
        Visa.prototype.setPublicKey = function (pKey) {
        };
        Visa.prototype.getAvatar = function () {
        };
        Visa.prototype.setAvatar = function (image) {
        };
        mkm.protocol.Bulletin = Interface(null, [Document]);
        var Bulletin = mkm.protocol.Bulletin;
        Bulletin.prototype.getFounder = function () {
        };
        Bulletin.prototype.getAssistants = function () {
        };
        Bulletin.prototype.setAssistants = function (bots) {
        };
        dkd.protocol.ContentType = {
            ANY: '' + (0x00),
            TEXT: '' + (0x01),
            FILE: '' + (0x10),
            IMAGE: '' + (0x12),
            AUDIO: '' + (0x14),
            VIDEO: '' + (0x16),
            PAGE: '' + (0x20),
            NAME_CARD: '' + (0x33),
            QUOTE: '' + (0x37),
            MONEY: '' + (0x40),
            TRANSFER: '' + (0x41),
            LUCKY_MONEY: '' + (0x42),
            CLAIM_PAYMENT: '' + (0x48),
            SPLIT_BILL: '' + (0x49),
            COMMAND: '' + (0x88),
            HISTORY: '' + (0x89),
            APPLICATION: '' + (0xA0),
            ARRAY: '' + (0xCA),
            CUSTOMIZED: '' + (0xCC),
            COMBINE_FORWARD: '' + (0xCF),
            FORWARD: '' + (0xFF)
        };
        var ContentType = dkd.protocol.ContentType;
        dkd.protocol.TextContent = Interface(null, [Content]);
        var TextContent = dkd.protocol.TextContent;
        TextContent.prototype.getText = function () {
        };
        TextContent.create = function (text) {
            return new BaseTextContent(text)
        };
        dkd.protocol.PageContent = Interface(null, [Content]);
        var PageContent = dkd.protocol.PageContent;
        PageContent.prototype.setTitle = function (title) {
        };
        PageContent.prototype.getTitle = function () {
        };
        PageContent.prototype.setIcon = function (pnf) {
        };
        PageContent.prototype.getIcon = function () {
        };
        PageContent.prototype.setDesc = function (text) {
        };
        PageContent.prototype.getDesc = function () {
        };
        PageContent.prototype.getURL = function () {
        };
        PageContent.prototype.setURL = function (url) {
        };
        PageContent.prototype.getHTML = function () {
        };
        PageContent.prototype.setHTML = function (url) {
        };
        PageContent.create = function (info) {
            var content = new WebPageContent();
            var title = info['title'];
            if (title) {
                content.setTitle(title)
            }
            var desc = info['desc'];
            if (desc) {
                content.setDesc(desc)
            }
            var url = info['URL'];
            if (url) {
                content.setURL(url)
            }
            var html = info['HTML'];
            if (html) {
                content.setHTML(html)
            }
            var icon = info['icon'];
            if (icon) {
                content.setIcon(icon)
            }
            return content
        };
        dkd.protocol.NameCard = Interface(null, [Content]);
        var NameCard = dkd.protocol.NameCard;
        NameCard.prototype.getIdentifier = function () {
        };
        NameCard.prototype.getName = function () {
        };
        NameCard.prototype.getAvatar = function () {
        };
        NameCard.create = function (identifier, mame, avatar) {
            var content = new NameCardContent(identifier);
            content.setName(name);
            content.setAvatar(avatar);
            return content
        };
        dkd.protocol.FileContent = Interface(null, [Content]);
        var FileContent = dkd.protocol.FileContent;
        FileContent.prototype.setData = function (data) {
        };
        FileContent.prototype.getData = function () {
        };
        FileContent.prototype.setFilename = function (filename) {
        };
        FileContent.prototype.getFilename = function () {
        };
        FileContent.prototype.setURL = function (url) {
        };
        FileContent.prototype.getURL = function () {
        };
        FileContent.prototype.setPassword = function (key) {
        };
        FileContent.prototype.getPassword = function () {
        };
        var _init_file_content = function (content, data, filename, url, password) {
            if (data) {
                content.setTransportableData(data)
            }
            if (filename) {
                content.setFilename(filename)
            }
            if (url) {
                content.setURL(url)
            }
            if (password) {
                content.setPassword(password)
            }
            return content
        };
        FileContent.create = function (type, data, filename, url, password) {
            var content;
            if (type === ContentType.IMAGE) {
                content = new ImageFileContent()
            } else if (type === ContentType.AUDIO) {
                content = new AudioFileContent()
            } else if (type === ContentType.VIDEO) {
                content = new VideoFileContent()
            } else {
                content = new BaseFileContent(type)
            }
            return _init_file_content(content, data, filename, url, password)
        };
        FileContent.file = function (data, filename, url, password) {
            var content = new BaseFileContent();
            return _init_file_content(content, data, filename, url, password)
        };
        FileContent.image = function (data, filename, url, password) {
            var content = new ImageFileContent();
            return _init_file_content(content, data, filename, url, password)
        };
        FileContent.audio = function (data, filename, url, password) {
            var content = new AudioFileContent();
            return _init_file_content(content, data, filename, url, password)
        };
        FileContent.video = function (data, filename, url, password) {
            var content = new VideoFileContent();
            return _init_file_content(content, data, filename, url, password)
        };
        dkd.protocol.ImageContent = Interface(null, [FileContent]);
        var ImageContent = dkd.protocol.ImageContent;
        ImageContent.prototype.setThumbnail = function (image) {
        };
        ImageContent.prototype.getThumbnail = function () {
        };
        dkd.protocol.VideoContent = Interface(null, [FileContent]);
        var VideoContent = dkd.protocol.VideoContent;
        VideoContent.prototype.setSnapshot = function (image) {
        };
        VideoContent.prototype.getSnapshot = function () {
        };
        dkd.protocol.AudioContent = Interface(null, [FileContent]);
        var AudioContent = dkd.protocol.AudioContent;
        AudioContent.prototype.setText = function (asr) {
        };
        AudioContent.prototype.getText = function () {
        };
        dkd.protocol.ForwardContent = Interface(null, [Content]);
        var ForwardContent = dkd.protocol.ForwardContent;
        ForwardContent.prototype.getForward = function () {
        };
        ForwardContent.prototype.getSecrets = function () {
        };
        ForwardContent.create = function (secrets) {
            return new SecretContent(secrets)
        };
        dkd.protocol.CombineContent = Interface(null, [Content]);
        var CombineContent = dkd.protocol.CombineContent;
        CombineContent.prototype.getTitle = function () {
        };
        CombineContent.prototype.getMessages = function () {
        };
        ForwardContent.create = function (title, messages) {
            return new CombineForwardContent(title, messages)
        };
        dkd.protocol.ArrayContent = Interface(null, [Content]);
        var ArrayContent = dkd.protocol.ArrayContent;
        ArrayContent.prototype.getContents = function () {
        };
        ArrayContent.create = function (contents) {
            return new ListContent(contents)
        };
        dkd.protocol.QuoteContent = Interface(null, [Content]);
        var QuoteContent = dkd.protocol.QuoteContent;
        QuoteContent.prototype.getText = function () {
        };
        QuoteContent.prototype.getOriginalEnvelope = function () {
        };
        QuoteContent.prototype.getOriginalSerialNumber = function () {
        };
        QuoteContent.create = function (text, head, body) {
            var origin = QuoteContent.purify(head);
            origin['type'] = body.getType();
            origin['sn'] = body.getSerialNumber();
            var group = body.getGroup();
            if (group) {
                origin['receiver'] = group.toString()
            }
            return new BaseQuoteContent(text, origin)
        };
        QuoteContent.purify = function (envelope) {
            var from = envelope.getSender();
            var to = envelope.getGroup();
            if (!to) {
                to = envelope.getReceiver()
            }
            return {'sender': from.toString(), 'receiver': to.toString()}
        };
        dkd.protocol.MoneyContent = Interface(null, [Content]);
        var MoneyContent = dkd.protocol.MoneyContent;
        MoneyContent.prototype.getCurrency = function () {
        };
        MoneyContent.prototype.setAmount = function (amount) {
        };
        MoneyContent.prototype.getAmount = function () {
        };
        MoneyContent.create = function (type, currency, amount) {
            return new BaseMoneyContent(type, currency, amount)
        };
        dkd.protocol.TransferContent = Interface(null, [MoneyContent]);
        var TransferContent = dkd.protocol.TransferContent;
        TransferContent.prototype.setRemitter = function (sender) {
        };
        TransferContent.prototype.getRemitter = function () {
        };
        TransferContent.prototype.setRemittee = function (receiver) {
        };
        TransferContent.prototype.getRemittee = function () {
        };
        TransferContent.create = function (currency, amount) {
            return new TransferMoneyContent(currency, amount)
        };
        dkd.protocol.AppContent = Interface(null, [Content]);
        var AppContent = dkd.protocol.AppContent;
        AppContent.prototype.getApplication = function () {
        };
        dkd.protocol.CustomizedContent = Interface(null, [AppContent]);
        var CustomizedContent = dkd.protocol.CustomizedContent;
        CustomizedContent.prototype.getModule = function () {
        };
        CustomizedContent.prototype.getAction = function () {
        };
        CustomizedContent.create = function () {
            var type, app, mod, act;
            if (arguments.length === 4) {
                type = arguments[0];
                app = arguments[1];
                mod = arguments[2];
                act = arguments[3];
                return new AppCustomizedContent(type, app, mod, act)
            } else if (arguments.length === 3) {
                app = arguments[0];
                mod = arguments[1];
                act = arguments[2];
                return new AppCustomizedContent(app, mod, act)
            } else {
                throw new SyntaxError('customized content arguments error: ' + arguments);
            }
        };
        dkd.protocol.Command = Interface(null, [Content]);
        var Command = dkd.protocol.Command;
        Command.META = 'meta';
        Command.DOCUMENTS = 'documents';
        Command.RECEIPT = 'receipt';
        Command.prototype.getCmd = function () {
        };
        Command.parse = function (command) {
            var helper = CommandExtensions.getCommandHelper();
            return helper.parseCommand(command)
        };
        Command.setFactory = function (cmd, factory) {
            var helper = CommandExtensions.getCommandHelper();
            helper.setCommandFactory(cmd, factory)
        };
        Command.getFactory = function (cmd) {
            var helper = CommandExtensions.getCommandHelper();
            return helper.getCommandFactory(cmd)
        };
        Command.Factory = Interface(null, null);
        var CommandFactory = Command.Factory;
        CommandFactory.prototype.parseCommand = function (content) {
        };
        dkd.protocol.MetaCommand = Interface(null, [Command]);
        var MetaCommand = dkd.protocol.MetaCommand;
        MetaCommand.prototype.getIdentifier = function () {
        };
        MetaCommand.prototype.getMeta = function () {
        };
        MetaCommand.query = function (identifier) {
            return new BaseMetaCommand(identifier)
        };
        MetaCommand.response = function (identifier, meta) {
            var command = new BaseMetaCommand(identifier);
            command.setMeta(meta);
            return command
        };
        dkd.protocol.DocumentCommand = Interface(null, [MetaCommand]);
        var DocumentCommand = dkd.protocol.DocumentCommand;
        DocumentCommand.prototype.getDocuments = function () {
        };
        DocumentCommand.prototype.getLastTime = function () {
        };
        DocumentCommand.query = function (identifier, lastTime) {
            var command = new BaseDocumentCommand(identifier);
            if (lastTime) {
                command.setLastTime(lastTime)
            }
            return command
        };
        DocumentCommand.response = function (identifier, meta, docs) {
            var command = new BaseDocumentCommand(identifier);
            command.setMeta(meta);
            command.setDocuments(docs);
            return command
        };
        dkd.protocol.HistoryCommand = Interface(null, [Command]);
        var HistoryCommand = dkd.protocol.HistoryCommand;
        HistoryCommand.REGISTER = 'register';
        HistoryCommand.SUICIDE = 'suicide';
        dkd.protocol.GroupCommand = Interface(null, [HistoryCommand]);
        var GroupCommand = dkd.protocol.GroupCommand;
        GroupCommand.FOUND = 'found';
        GroupCommand.ABDICATE = 'abdicate';
        GroupCommand.INVITE = 'invite';
        GroupCommand.EXPEL = 'expel';
        GroupCommand.JOIN = 'join';
        GroupCommand.QUIT = 'quit';
        GroupCommand.RESET = 'reset';
        GroupCommand.HIRE = 'hire';
        GroupCommand.FIRE = 'fire';
        GroupCommand.RESIGN = 'resign';
        GroupCommand.prototype.setMember = function (identifier) {
        };
        GroupCommand.prototype.getMember = function () {
        };
        GroupCommand.prototype.setMembers = function (members) {
        };
        GroupCommand.prototype.getMembers = function () {
        };
        var _command_init_members = function (content, members) {
            if (members instanceof Array) {
                content.setMembers(members)
            } else if (Interface.conforms(members, ID)) {
                content.setMember(members)
            } else {
                throw new TypeError('group members error: ' + members);
            }
            return content
        };
        GroupCommand.create = function (cmd, group, members) {
            var content = new BaseGroupCommand(cmd, group);
            if (members) {
                _command_init_members(content, members)
            }
            return content
        };
        GroupCommand.invite = function (group, members) {
            var content = new InviteGroupCommand(group);
            return _command_init_members(content, members)
        };
        GroupCommand.expel = function (group, members) {
            var content = new ExpelGroupCommand(group);
            return _command_init_members(content, members)
        };
        GroupCommand.join = function (group) {
            return new JoinGroupCommand(group)
        };
        GroupCommand.quit = function (group) {
            return new QuitGroupCommand(group)
        };
        GroupCommand.reset = function (group, members) {
            var content = new ResetGroupCommand(group, members);
            if (members instanceof Array) {
                content.setMembers(members)
            } else {
                throw new TypeError('reset members error: ' + members);
            }
            return content
        };
        var _command_init_admins = function (content, administrators, assistants) {
            if (administrators && administrators.length > 0) {
                content.setAdministrators(administrators)
            }
            if (assistants && assistants.length > 0) {
                content.setAssistants(assistants)
            }
            return content
        };
        GroupCommand.hire = function (group, administrators, assistants) {
            var content = new HireGroupCommand(group);
            return _command_init_admins(content, administrators, assistants)
        };
        GroupCommand.fire = function (group, administrators, assistants) {
            var content = new FireGroupCommand(group);
            return _command_init_admins(content, administrators, assistants)
        };
        GroupCommand.resign = function (group) {
            return new ResignGroupCommand(group)
        };
        dkd.protocol.InviteCommand = Interface(null, [GroupCommand]);
        var InviteCommand = dkd.protocol.InviteCommand;
        dkd.protocol.ExpelCommand = Interface(null, [GroupCommand]);
        var ExpelCommand = dkd.protocol.ExpelCommand;
        dkd.protocol.JoinCommand = Interface(null, [GroupCommand]);
        var JoinCommand = dkd.protocol.JoinCommand;
        dkd.protocol.QuitCommand = Interface(null, [GroupCommand]);
        var QuitCommand = dkd.protocol.QuitCommand;
        dkd.protocol.ResetCommand = Interface(null, [GroupCommand]);
        var ResetCommand = dkd.protocol.ResetCommand;
        dkd.protocol.HireCommand = Interface(null, [GroupCommand]);
        var HireCommand = dkd.protocol.HireCommand;
        HireCommand.prototype.getAdministrators = function () {
        };
        HireCommand.prototype.setAdministrators = function (members) {
        };
        HireCommand.prototype.getAssistants = function () {
        };
        HireCommand.prototype.setAssistants = function (bots) {
        };
        dkd.protocol.FireCommand = Interface(null, [GroupCommand]);
        var FireCommand = dkd.protocol.FireCommand;
        FireCommand.prototype.getAdministrators = function () {
        };
        FireCommand.prototype.setAdministrators = function (members) {
        };
        FireCommand.prototype.getAssistants = function () {
        };
        FireCommand.prototype.setAssistants = function (bots) {
        };
        dkd.protocol.ResignCommand = Interface(null, [GroupCommand]);
        var ResignCommand = dkd.protocol.ResignCommand;
        dkd.protocol.ReceiptCommand = Interface(null, [Command]);
        var ReceiptCommand = dkd.protocol.ReceiptCommand;
        ReceiptCommand.prototype.getText = function () {
        };
        ReceiptCommand.prototype.getOriginalEnvelope = function () {
        };
        ReceiptCommand.prototype.getOriginalSerialNumber = function () {
        };
        ReceiptCommand.prototype.getOriginalSignature = function () {
        };
        ReceiptCommand.create = function (text, head, body) {
            var origin;
            if (!head) {
                origin = null
            } else if (!body) {
                origin = ReceiptCommand.purify(head)
            } else {
                origin = ReceiptCommand.purify(head);
                origin['sn'] = body.getSerialNumber()
            }
            var command = new BaseReceiptCommand(text, origin);
            if (body) {
                var group = body.getGroup();
                if (group) {
                    command.setGroup(group)
                }
            }
            return command
        };
        ReceiptCommand.purify = function (envelope) {
            var info = envelope.copyMap(false);
            if (info['data']) {
                delete info['data'];
                delete info['key'];
                delete info['keys'];
                delete info['meta'];
                delete info['visa']
            }
            return info
        };
        mk.crypto.BaseKey = function (dict) {
            Dictionary.call(this, dict)
        };
        var BaseKey = mk.crypto.BaseKey;
        Class(BaseKey, Dictionary, [CryptographyKey]);
        BaseKey.prototype.getAlgorithm = function () {
            return BaseKey.getKeyAlgorithm(this.toMap())
        };
        BaseKey.getKeyAlgorithm = function (key) {
            var helper = SharedCryptoExtensions.getHelper();
            var algorithm = helper.getKeyAlgorithm(key);
            return algorithm ? algorithm : ''
        };
        BaseKey.matchEncryptKey = function (pKey, sKey) {
            return GeneralCryptoHelper.matchSymmetricKeys(pKey, sKey)
        };
        BaseKey.matchSignKey = function (sKey, pKey) {
            return GeneralCryptoHelper.matchAsymmetricKeys(sKey, pKey)
        };
        BaseKey.symmetricKeyEquals = function (key1, key2) {
            if (key1 === key2) {
                return true
            }
            return BaseKey.matchEncryptKey(key1, key2)
        };
        BaseKey.privateKeyEquals = function (key1, key2) {
            if (key1 === key2) {
                return true
            }
            return BaseKey.matchSignKey(key1, key2)
        };
        mk.crypto.BaseSymmetricKey = function (dict) {
            Dictionary.call(this, dict)
        };
        var BaseSymmetricKey = mk.crypto.BaseSymmetricKey;
        Class(BaseSymmetricKey, Dictionary, [SymmetricKey]);
        BaseSymmetricKey.prototype.equals = function (other) {
            return Interface.conforms(other, SymmetricKey) && BaseKey.symmetricKeyEquals(other, this)
        };
        BaseSymmetricKey.prototype.matchEncryptKey = function (pKey) {
            return BaseKey.matchEncryptKey(pKey, this)
        };
        BaseSymmetricKey.prototype.getAlgorithm = function () {
            return BaseKey.getKeyAlgorithm(this.toMap())
        };
        mk.crypto.BaseAsymmetricKey = function (dict) {
            Dictionary.call(this, dict)
        };
        var BaseAsymmetricKey = mk.crypto.BaseAsymmetricKey;
        Class(BaseAsymmetricKey, Dictionary, [AsymmetricKey]);
        BaseAsymmetricKey.prototype.getAlgorithm = function () {
            return BaseKey.getKeyAlgorithm(this.toMap())
        };
        mk.crypto.BasePrivateKey = function (dict) {
            Dictionary.call(this, dict)
        };
        var BasePrivateKey = mk.crypto.BasePrivateKey;
        Class(BasePrivateKey, Dictionary, [PrivateKey]);
        BasePrivateKey.prototype.equals = function (other) {
            return Interface.conforms(other, PrivateKey) && BaseKey.privateKeyEquals(other, this)
        };
        BasePrivateKey.prototype.getAlgorithm = function () {
            return BaseKey.getKeyAlgorithm(this.toMap())
        };
        mk.crypto.BasePublicKey = function (dict) {
            Dictionary.call(this, dict)
        };
        var BasePublicKey = mk.crypto.BasePublicKey;
        Class(BasePublicKey, Dictionary, [PublicKey]);
        BasePublicKey.prototype.matchSignKey = function (sKey) {
            return BaseKey.matchSignKey(sKey, this)
        };
        BasePublicKey.prototype.getAlgorithm = function () {
            return BaseKey.getKeyAlgorithm(this.toMap())
        };
        mk.format.BaseDataWrapper = function (dict) {
            Dictionary.call(this, dict);
            this.__data = null
        };
        var BaseDataWrapper = mk.format.BaseDataWrapper;
        Class(BaseDataWrapper, Dictionary, null);
        Implementation(BaseDataWrapper, {
            toString: function () {
                var encoded = this.getString('data', null);
                if (!encoded) {
                    return ''
                }
                var alg = this.getString('algorithm', null);
                if (!alg || alg === EncodeAlgorithms.DEFAULT) {
                    alg = ''
                }
                if (alg === '') {
                    return encoded
                } else {
                    return alg + ',' + encoded
                }
            }, encode: function (mimeType) {
                var encoded = this.getString('data', null);
                if (!encoded) {
                    return ''
                }
                var alg = this.getAlgorithm();
                return 'data:' + mimeType + ';' + alg + ',' + encoded
            }, getAlgorithm: function () {
                var alg = this.getString('algorithm', null);
                if (!alg) {
                    alg = EncodeAlgorithms.DEFAULT
                }
                return alg
            }, setAlgorithm: function (name) {
                if (!name) {
                    this.removeValue('algorithm')
                } else {
                    this.setValue('algorithm', name)
                }
            }, getData: function () {
                var bin = this.__data;
                if (!bin) {
                    var encoded = this.getString('data', null);
                    if (!encoded) {
                        return null
                    } else {
                        var alg = this.getAlgorithm();
                        if (alg === EncodeAlgorithms.BASE_64) {
                            bin = Base64.decode(encoded)
                        } else if (alg === EncodeAlgorithms.BASE_58) {
                            bin = Base58.decode(encoded)
                        } else if (alg === EncodeAlgorithms.HEX) {
                            bin = Hex.decode(encoded)
                        } else {
                            throw new Error('data algorithm not support: ' + alg);
                        }
                    }
                    this.__data = bin
                }
                return bin
            }, setData: function (bin) {
                if (!bin) {
                    this.removeValue('data')
                } else {
                    var encoded = null;
                    var alg = this.getAlgorithm();
                    if (alg === EncodeAlgorithms.BASE_64) {
                        encoded = Base64.encode(bin)
                    } else if (alg === EncodeAlgorithms.BASE_58) {
                        encoded = Base58.encode(bin)
                    } else if (alg === EncodeAlgorithms.HEX) {
                        encoded = Hex.encode(bin)
                    } else {
                        throw new Error('data algorithm not support: ' + alg);
                    }
                    this.setValue('data', encoded)
                }
                this.__data = bin
            }
        });
        mk.format.BaseFileWrapper = function (dict) {
            Dictionary.call(this, dict);
            this.__attachment = null;
            this.__password = null
        };
        var BaseFileWrapper = mk.format.BaseFileWrapper;
        Class(BaseFileWrapper, Dictionary, null);
        Implementation(BaseFileWrapper, {
            getData: function () {
                var ted = this.__attachment;
                if (!ted) {
                    var base64 = this.getValue('data');
                    ted = TransportableData.parse(base64);
                    this.__attachment = ted
                }
                return ted
            }, setData: function (ted) {
                if (!ted) {
                    this.removeValue('data')
                } else {
                    this.setValue('data', ted.toObject())
                }
                this.__attachment = ted
            }, setBinaryData: function (bin) {
                var ted;
                if (!bin) {
                    ted = null;
                    this.removeValue('data')
                } else {
                    ted = TransportableData.create(bin);
                    this.setValue('data', ted.toObject())
                }
                this.__attachment = ted
            }, getFilename: function () {
                return this.getString('filename', null)
            }, setFilename: function (filename) {
                if (!filename) {
                    this.removeValue('filename')
                } else {
                    this.setValue('filename', filename)
                }
            }, getURL: function () {
                return this.getString('URL', null)
            }, setURL: function (url) {
                if (!url) {
                    this.removeValue('URL')
                } else {
                    this.setValue('URL', url)
                }
            }, getPassword: function () {
                var pwd = this.__password;
                if (!pwd) {
                    var key = this.getValue('password');
                    pwd = SymmetricKey.parse(key);
                    this.__password = pwd
                }
                return pwd
            }, setPassword: function (key) {
                if (!key) {
                    this.removeValue('password')
                } else {
                    this.setMap('password', key)
                }
                this.__password = key
            }
        });
        mkm.mkm.BaseMeta = function () {
            var type, key, seed, fingerprint;
            var status;
            var meta;
            if (arguments.length === 1) {
                meta = arguments[0];
                type = null;
                key = null;
                seed = null;
                fingerprint = null;
                status = 0
            } else if (arguments.length === 2) {
                type = arguments[0];
                key = arguments[1];
                seed = null;
                fingerprint = null;
                status = 1;
                meta = {'type': type, 'key': key.toMap()}
            } else if (arguments.length === 4) {
                type = arguments[0];
                key = arguments[1];
                seed = arguments[2];
                fingerprint = arguments[3];
                status = 1;
                meta = {'type': type, 'key': key.toMap(), 'seed': seed, 'fingerprint': fingerprint.toObject()}
            } else {
                throw new SyntaxError('meta arguments error: ' + arguments);
            }
            Dictionary.call(this, meta);
            this.__type = type;
            this.__key = key;
            this.__seed = seed;
            this.__fingerprint = fingerprint;
            this.__status = status
        };
        var BaseMeta = mkm.mkm.BaseMeta;
        Class(BaseMeta, Dictionary, [Meta]);
        Implementation(BaseMeta, {
            getType: function () {
                var type = this.__type;
                if (type === null) {
                    var helper = SharedAccountExtensions.getHelper();
                    type = helper.getMetaType(this.toMap(), '');
                    this.__type = type
                }
                return type
            }, getPublicKey: function () {
                var key = this.__key;
                if (!key) {
                    var info = this.getValue('key');
                    key = PublicKey.parse(info);
                    this.__key = key
                }
                return key
            }, hasSeed: function () {
                return this.__seed || this.getValue('seed')
            }, getSeed: function () {
                var seed = this.__seed;
                if (seed === null && this.hasSeed()) {
                    seed = this.getString('seed', null);
                    this.__seed = seed
                }
                return seed
            }, getFingerprint: function () {
                var ted = this.__fingerprint;
                if (!ted && this.hasSeed()) {
                    var base64 = this.getValue('fingerprint');
                    ted = TransportableData.parse(base64);
                    this.__fingerprint = ted
                }
                return !ted ? null : ted.getData()
            }, isValid: function () {
                if (this.__status === 0) {
                    if (this.checkValid()) {
                        this.__status = 1
                    } else {
                        this.__status = -1
                    }
                }
                return this.__status > 0
            }, checkValid: function () {
                var key = this.getPublicKey();
                if (!key) {
                    return false
                } else if (this.hasSeed()) {
                } else if (this.getValue('seed') || this.getValue('fingerprint')) {
                    return false
                } else {
                    return true
                }
                var name = this.getSeed();
                var signature = this.getFingerprint();
                if (!signature || !name) {
                    return false
                }
                var data = UTF8.encode(name);
                return key.verify(data, signature)
            }
        });
        mkm.mkm.BaseDocument = function () {
            var map, status;
            var type;
            var identifier, data, signature;
            var properties;
            if (arguments.length === 1) {
                map = arguments[0];
                status = 0;
                identifier = null;
                data = null;
                signature = null;
                properties = null
            } else if (arguments.length === 2) {
                type = arguments[0];
                identifier = arguments[1];
                map = {'type': type, 'did': identifier.toString()};
                status = 0;
                data = null;
                signature = null;
                var now = new Date();
                properties = {'type': type, 'created_time': (now.getTime() / 1000.0)}
            } else if (arguments.length === 4) {
                type = arguments[0];
                identifier = arguments[1];
                data = arguments[2];
                signature = arguments[3];
                map = {'type': type, 'did': identifier.toString(), 'data': data, 'signature': signature.toObject()};
                status = 1;
                properties = null
            } else {
                throw new SyntaxError('document arguments error: ' + arguments);
            }
            Dictionary.call(this, map);
            this.__identifier = identifier;
            this.__json = data;
            this.__sig = signature;
            this.__properties = properties;
            this.__status = status
        };
        var BaseDocument = mkm.mkm.BaseDocument;
        Class(BaseDocument, Dictionary, [Document]);
        Implementation(BaseDocument, {
            isValid: function () {
                return this.__status > 0
            }, getIdentifier: function () {
                var did = this.__identifier;
                if (!did) {
                    did = ID.parse(this.getValue('did'));
                    this.__identifier = did
                }
                return did
            }, getData: function () {
                var base64 = this.__json;
                if (!base64) {
                    base64 = this.getString('data', null);
                    this.__json = base64
                }
                return base64
            }, getSignature: function () {
                var ted = this.__sig;
                if (!ted) {
                    var base64 = this.getValue('signature');
                    ted = TransportableData.parse(base64);
                    this.__sig = ted
                }
                if (!ted) {
                    return null
                }
                return ted.getData()
            }, allProperties: function () {
                if (this.__status < 0) {
                    return null
                }
                var dict = this.__properties;
                if (!dict) {
                    var json = this.getData();
                    if (json) {
                        dict = JSONMap.decode(json)
                    } else {
                        dict = {}
                    }
                    this.__properties = dict
                }
                return dict
            }, getProperty: function (name) {
                var dict = this.allProperties();
                if (!dict) {
                    return null
                }
                return dict[name]
            }, setProperty: function (name, value) {
                this.__status = 0;
                var dict = this.allProperties();
                if (!dict) {
                } else if (value) {
                    dict[name] = value
                } else {
                    delete dict[name]
                }
                this.removeValue('data');
                this.removeValue('signature');
                this.__json = null;
                this.__sig = null
            }, verify: function (publicKey) {
                if (this.__status > 0) {
                    return true
                }
                var data = this.getData();
                var signature = this.getSignature();
                if (!data) {
                    if (!signature) {
                        this.__status = 0
                    } else {
                        this.__status = -1
                    }
                } else if (!signature) {
                    this.__status = -1
                } else if (publicKey.verify(UTF8.encode(data), signature)) {
                    this.__status = 1
                }
                return this.__status === 1
            }, sign: function (privateKey) {
                if (this.__status > 0) {
                    return this.getSignature()
                }
                var now = new Date();
                this.setProperty('time', now.getTime() / 1000.0);
                var dict = this.allProperties();
                if (!dict) {
                    return null
                }
                var data = JSONMap.encode(dict);
                if (!data || data.length === 0) {
                    return null
                }
                var signature = privateKey.sign(UTF8.encode(data));
                if (!signature || signature.length === 0) {
                    return null
                }
                var ted = TransportableData.create(signature);
                this.setValue('data', data);
                this.setValue('signature', ted.toObject());
                this.__json = data;
                this.__sig = ted;
                this.__status = 1;
                return signature
            }, getTime: function () {
                var timestamp = this.getProperty('time');
                return Converter.getDateTime(timestamp, null)
            }, getName: function () {
                var name = this.getProperty('name');
                return Converter.getString(name, null)
            }, setName: function (name) {
                this.setProperty('name', name)
            }
        });
        mkm.mkm.BaseVisa = function () {
            if (arguments.length === 3) {
                BaseDocument.call(this, DocumentType.VISA, arguments[0], arguments[1], arguments[2])
            } else if (Interface.conforms(arguments[0], ID)) {
                BaseDocument.call(this, DocumentType.VISA, arguments[0])
            } else if (arguments.length === 1) {
                BaseDocument.call(this, arguments[0])
            } else {
                throw new SyntaxError('visa params error: ' + arguments);
            }
            this.__key = null;
            this.__avatar = null
        };
        var BaseVisa = mkm.mkm.BaseVisa;
        Class(BaseVisa, BaseDocument, [Visa]);
        Implementation(BaseVisa, {
            getPublicKey: function () {
                var key = this.__key;
                if (!key) {
                    var info = this.getProperty('key');
                    key = PublicKey.parse(info);
                    if (Interface.conforms(key, EncryptKey)) {
                        this.__key = key
                    } else {
                        key = null
                    }
                }
                return key
            }, setPublicKey: function (pKey) {
                if (!pKey) {
                    this.setProperty('key', null)
                } else {
                    this.setProperty('key', pKey.toMap())
                }
                this.__key = pKey
            }, getAvatar: function () {
                var pnf = this.__avatar;
                if (!pnf) {
                    var url = this.getProperty('avatar');
                    if (typeof url === 'string' && url.length === 0) {
                    } else {
                        pnf = PortableNetworkFile.parse(url);
                        this.__avatar = pnf
                    }
                }
                return pnf
            }, setAvatar: function (pnf) {
                if (!pnf) {
                    this.setProperty('avatar', null)
                } else {
                    this.setProperty('avatar', pnf.toObject())
                }
                this.__avatar = pnf
            }
        });
        mkm.mkm.BaseBulletin = function () {
            if (arguments.length === 3) {
                BaseDocument.call(this, DocumentType.BULLETIN, arguments[0], arguments[1], arguments[2])
            } else if (Interface.conforms(arguments[0], ID)) {
                BaseDocument.call(this, DocumentType.BULLETIN, arguments[0])
            } else if (arguments.length === 1) {
                BaseDocument.call(this, arguments[0])
            } else {
                throw new SyntaxError('bulletin params error: ' + arguments);
            }
            this.__assistants = null
        };
        var BaseBulletin = mkm.mkm.BaseBulletin;
        Class(BaseBulletin, BaseDocument, [Bulletin]);
        Implementation(BaseBulletin, {
            getFounder: function () {
                return ID.parse(this.getProperty('founder'))
            }, getAssistants: function () {
                var bots = this.__assistants;
                if (!bots) {
                    var assistants = this.getProperty('assistants');
                    if (assistants) {
                        bots = ID.convert(assistants)
                    } else {
                        var single = ID.parse(this.getProperty('assistant'));
                        bots = !single ? [] : [single]
                    }
                    this.__assistants = bots
                }
                return bots
            }, setAssistants: function (bots) {
                if (bots) {
                    this.setProperty('assistants', ID.revert(bots))
                } else {
                    this.setProperty('assistants', null)
                }
                this.setProperty('assistant', null);
                this.__assistants = bots
            }
        });
        dkd.dkd.BaseContent = function (info) {
            var content, type, sn, time;
            if (IObject.isString(info)) {
                type = info;
                time = new Date();
                sn = InstantMessage.generateSerialNumber(type, time);
                content = {'type': type, 'sn': sn, 'time': time.getTime() / 1000.0}
            } else {
                content = info;
                type = null;
                sn = null;
                time = null
            }
            Dictionary.call(this, content);
            this.__type = type;
            this.__sn = sn;
            this.__time = time
        };
        var BaseContent = dkd.dkd.BaseContent;
        Class(BaseContent, Dictionary, [Content]);
        Implementation(BaseContent, {
            getType: function () {
                if (this.__type === null) {
                    var helper = SharedMessageExtensions.getHelper();
                    this.__type = helper.getContentType(this.toMap(), '')
                }
                return this.__type
            }, getSerialNumber: function () {
                if (this.__sn === null) {
                    this.__sn = this.getInt('sn', 0)
                }
                return this.__sn
            }, getTime: function () {
                if (this.__time === null) {
                    this.__time = this.getDateTime('time', null)
                }
                return this.__time
            }, getGroup: function () {
                var group = this.getValue('group');
                return ID.parse(group)
            }, setGroup: function (identifier) {
                this.setString('group', identifier)
            }
        });
        dkd.dkd.BaseCommand = function () {
            if (arguments.length === 2) {
                BaseContent.call(this, arguments[0]);
                this.setValue('command', arguments[1])
            } else if (IObject.isString(arguments[0])) {
                BaseContent.call(this, ContentType.COMMAND);
                this.setValue('command', arguments[0])
            } else {
                BaseContent.call(this, arguments[0])
            }
        };
        var BaseCommand = dkd.dkd.BaseCommand;
        Class(BaseCommand, BaseContent, [Command]);
        Implementation(BaseCommand, {
            getCmd: function () {
                var helper = SharedCommandExtensions.getHelper();
                return helper.getCmd(this.toMap(), '')
            }
        });
        dkd.dkd.BaseTextContent = function (info) {
            if (IObject.isString(info)) {
                BaseContent.call(this, ContentType.TEXT);
                this.setText(info)
            } else {
                BaseContent.call(this, info)
            }
        };
        var BaseTextContent = dkd.dkd.BaseTextContent;
        Class(BaseTextContent, BaseContent, [TextContent]);
        Implementation(BaseTextContent, {
            getText: function () {
                return this.getString('text', '')
            }, setText: function (text) {
                this.setValue('text', text)
            }
        });
        dkd.dkd.WebPageContent = function (info) {
            if (info) {
                BaseContent.call(this, info)
            } else {
                BaseContent.call(this, ContentType.PAGE)
            }
            this.__icon = null
        };
        var WebPageContent = dkd.dkd.WebPageContent;
        Class(WebPageContent, BaseContent, [PageContent]);
        Implementation(WebPageContent, {
            getTitle: function () {
                return this.getString('title', '')
            }, setTitle: function (title) {
                this.setValue('title', title)
            }, getDesc: function () {
                return this.getString('desc', null)
            }, setDesc: function (text) {
                this.setValue('desc', text)
            }, getURL: function () {
                return this.getString('URL', null)
            }, setURL: function (url) {
                this.setValue('URL', url)
            }, getHTML: function () {
                return this.getString('HTML', null)
            }, setHTML: function (html) {
                this.setValue('HTML', html)
            }, getIcon: function () {
                var pnf = this.__icon;
                if (!pnf) {
                    var url = this.getString('icon', null);
                    pnf = PortableNetworkFile.parse(url);
                    this.__icon = pnf
                }
                return pnf
            }, setIcon: function (image) {
                var pnf = null;
                if (Interface.conforms(image, PortableNetworkFile)) {
                    pnf = image;
                    this.setValue('icon', pnf.toObject())
                } else if (IObject.isString(image)) {
                    this.setValue('icon', image)
                } else {
                    this.removeValue('icon')
                }
                this.__icon = pnf
            }
        });
        dkd.dkd.NameCardContent = function (info) {
            if (Interface.conforms(info, ID)) {
                BaseContent.call(this, ContentType.NAME_CARD);
                this.setString('did', info)
            } else {
                BaseContent.call(this, info)
            }
            this.__image = null
        };
        var NameCardContent = dkd.dkd.NameCardContent;
        Class(NameCardContent, BaseContent, [NameCard]);
        Implementation(NameCardContent, {
            getIdentifier: function () {
                var id = this.getValue('did');
                return ID.parse(id)
            }, getName: function () {
                return this.getString('name', '')
            }, setName: function (name) {
                this.setValue('name', name)
            }, getAvatar: function () {
                var pnf = this.__image;
                if (!pnf) {
                    var url = this.getString('avatar', null);
                    pnf = PortableNetworkFile.parse(url);
                    this.__icon = pnf
                }
                return pnf
            }, setAvatar: function (image) {
                var pnf = null;
                if (Interface.conforms(image, PortableNetworkFile)) {
                    pnf = image;
                    this.setValue('avatar', pnf.toObject())
                } else if (IObject.isString(image)) {
                    this.setValue('avatar', image)
                } else {
                    this.removeValue('avatar')
                }
                this.__image = pnf
            }
        });
        dkd.dkd.BaseFileContent = function (info) {
            if (!info) {
                info = ContentType.FILE
            }
            BaseContent.call(this, info);
            this.__wrapper = new BaseFileWrapper(this.toMap())
        };
        var BaseFileContent = dkd.dkd.BaseFileContent;
        Class(BaseFileContent, BaseContent, [FileContent]);
        Implementation(BaseFileContent, {
            getData: function () {
                var ted = this.__wrapper.getData();
                return !ted ? null : ted.getData()
            }, setData: function (data) {
                this.__wrapper.setBinaryData(data)
            }, setTransportableData: function (ted) {
                this.__wrapper.setData(ted)
            }, getFilename: function () {
                return this.__wrapper.getFilename()
            }, setFilename: function (filename) {
                this.__wrapper.setFilename(filename)
            }, getURL: function () {
                return this.__wrapper.getURL()
            }, setURL: function (url) {
                this.__wrapper.setURL(url)
            }, getPassword: function () {
                return this.__wrapper.getPassword()
            }, setPassword: function (key) {
                this.__wrapper.setPassword(key)
            }
        });
        dkd.dkd.ImageFileContent = function (info) {
            if (!info) {
                BaseFileContent.call(this, ContentType.IMAGE)
            } else {
                BaseFileContent.call(this, info)
            }
            this.__thumbnail = null
        };
        var ImageFileContent = dkd.dkd.ImageFileContent;
        Class(ImageFileContent, BaseFileContent, [ImageContent]);
        Implementation(ImageFileContent, {
            getThumbnail: function () {
                var pnf = this.__thumbnail;
                if (!pnf) {
                    var base64 = this.getString('thumbnail', null);
                    pnf = PortableNetworkFile.parse(base64);
                    this.__thumbnail = pnf
                }
                return pnf
            }, setThumbnail: function (image) {
                var pnf = null;
                if (!image) {
                    this.removeValue('thumbnail')
                } else if (Interface.conforms(image, PortableNetworkFile)) {
                    pnf = image;
                    this.setValue('thumbnail', pnf.toObject())
                } else if (IObject.isString(image)) {
                    this.setValue('thumbnail', image)
                }
                this.__thumbnail = pnf
            }
        });
        dkd.dkd.VideoFileContent = function (info) {
            if (!info) {
                BaseFileContent.call(this, ContentType.VIDEO)
            } else {
                BaseFileContent.call(this, info)
            }
            this.__snapshot = null
        };
        var VideoFileContent = dkd.dkd.VideoFileContent;
        Class(VideoFileContent, BaseFileContent, [VideoContent]);
        Implementation(VideoFileContent, {
            getSnapshot: function () {
                var pnf = this.__snapshot;
                if (!pnf) {
                    var base64 = this.getString('snapshot', null);
                    pnf = PortableNetworkFile.parse(base64);
                    this.__snapshot = pnf
                }
                return pnf
            }, setSnapshot: function (image) {
                var pnf = null;
                if (!image) {
                    this.removeValue('snapshot')
                } else if (Interface.conforms(image, PortableNetworkFile)) {
                    pnf = image;
                    this.setValue('snapshot', pnf.toObject())
                } else if (IObject.isString(image)) {
                    this.setValue('snapshot', image)
                }
                this.__snapshot = pnf
            }
        });
        dkd.dkd.AudioFileContent = function (info) {
            if (!info) {
                BaseFileContent.call(this, ContentType.AUDIO)
            } else {
                BaseFileContent.call(this, info)
            }
        };
        var AudioFileContent = dkd.dkd.AudioFileContent;
        Class(AudioFileContent, BaseFileContent, [AudioContent]);
        Implementation(AudioFileContent, {
            getText: function () {
                return this.getString('text', null)
            }, setText: function (asr) {
                this.setValue('text', asr)
            }
        });
        dkd.dkd.SecretContent = function (info) {
            var forward = null;
            var secrets = null;
            if (info instanceof Array) {
                BaseContent.call(this, ContentType.FORWARD);
                secrets = info
            } else if (Interface.conforms(info, ReliableMessage)) {
                BaseContent.call(this, ContentType.FORWARD);
                forward = info
            } else {
                BaseContent.call(this, info)
            }
            if (forward) {
                this.setMap('forward', forward)
            } else if (secrets) {
                var array = ReliableMessage.revert(secrets);
                this.setValue('secrets', array)
            }
            this.__forward = forward;
            this.__secrets = secrets
        };
        var SecretContent = dkd.dkd.SecretContent;
        Class(SecretContent, BaseContent, [ForwardContent]);
        Implementation(SecretContent, {
            getForward: function () {
                if (this.__forward === null) {
                    var forward = this.getValue('forward');
                    this.__forward = ReliableMessage.parse(forward)
                }
                return this.__forward
            }, getSecrets: function () {
                var messages = this.__secrets;
                if (!messages) {
                    var array = this.getValue('secrets');
                    if (array) {
                        messages = ReliableMessage.convert(array)
                    } else {
                        var msg = this.getForward();
                        messages = !msg ? [] : [msg]
                    }
                    this.__secrets = messages
                }
                return messages
            }
        });
        dkd.dkd.CombineForwardContent = function () {
            var title;
            var messages;
            if (arguments.length === 2) {
                BaseContent.call(this, ContentType.COMBINE_FORWARD);
                title = arguments[0];
                messages = arguments[1]
            } else {
                BaseContent.call(this, arguments[0]);
                title = null;
                messages = null
            }
            if (title) {
                this.setValue('title', title)
            }
            if (messages) {
                var array = InstantMessage.revert(messages);
                this.setValue('messages', array)
            }
            this.__history = messages
        };
        var CombineForwardContent = dkd.dkd.CombineForwardContent;
        Class(CombineForwardContent, BaseContent, [CombineContent]);
        Implementation(CombineForwardContent, {
            getTitle: function () {
                return this.getString('title', '')
            }, getMessages: function () {
                var messages = this.__history;
                if (!messages) {
                    var array = this.getValue('messages');
                    if (array) {
                        messages = InstantMessage.convert(array)
                    } else {
                        messages = []
                    }
                    this.__history = messages
                }
                return messages
            }
        });
        dkd.dkd.ListContent = function (info) {
            var list;
            if (info instanceof Array) {
                BaseContent.call(this, ContentType.ARRAY);
                list = info;
                this.setValue('contents', Content.revert(list))
            } else {
                BaseContent.call(this, info);
                list = null
            }
            this.__list = list
        };
        var ListContent = dkd.dkd.ListContent;
        Class(ListContent, BaseContent, [ArrayContent]);
        Implementation(ListContent, {
            getContents: function () {
                var contents = this.__list;
                if (!contents) {
                    var array = this.getValue('contents');
                    if (array) {
                        contents = Content.convert(array)
                    } else {
                        contents = []
                    }
                    this.__list = contents
                }
                return contents
            }
        });
        dkd.dkd.BaseQuoteContent = function () {
            if (arguments.length === 1) {
                BaseContent.call(this, arguments[0])
            } else {
                BaseContent.call(this, Command.RECEIPT);
                this.setValue('text', arguments[0]);
                var origin = arguments[1];
                if (origin) {
                    this.setValue('origin', origin)
                }
            }
            this.__env = null
        };
        var BaseQuoteContent = dkd.dkd.BaseQuoteContent;
        Class(BaseQuoteContent, BaseContent, [QuoteContent]);
        Implementation(BaseQuoteContent, {
            getText: function () {
                return this.getString('text', '')
            }, getOrigin: function () {
                return this.getValue('origin')
            }, getOriginalEnvelope: function () {
                var env = this.__env;
                if (!env) {
                    env = Envelope.parse(this.getOrigin());
                    this.__env = env
                }
                return env
            }, getOriginalSerialNumber: function () {
                var origin = this.getOrigin();
                if (!origin) {
                    return null
                }
                return Converter.getInt(origin['sn'], null)
            }
        });
        dkd.dkd.BaseMoneyContent = function () {
            if (arguments.length === 1) {
                BaseContent.call(this, arguments[0])
            } else if (arguments.length === 2) {
                BaseContent.call(this, ContentType.MONEY);
                this.setCurrency(arguments[0]);
                this.setAmount(arguments[1])
            } else if (arguments.length === 3) {
                BaseContent.call(this, arguments[0]);
                this.setCurrency(arguments[1]);
                this.setAmount(arguments[2])
            } else {
                throw new SyntaxError('money content arguments error: ' + arguments);
            }
        };
        var BaseMoneyContent = dkd.dkd.BaseMoneyContent;
        Class(BaseMoneyContent, BaseContent, [MoneyContent]);
        Implementation(BaseMoneyContent, {
            setCurrency: function (currency) {
                this.setValue('currency', currency)
            }, getCurrency: function () {
                return this.getString('currency', null)
            }, setAmount: function (amount) {
                this.setValue('amount', amount)
            }, getAmount: function () {
                return this.getFloat('amount', 0)
            }
        });
        dkd.dkd.TransferMoneyContent = function () {
            if (arguments.length === 1) {
                MoneyContent.call(this, arguments[0])
            } else if (arguments.length === 2) {
                MoneyContent.call(this, ContentType.TRANSFER, arguments[0], arguments[1])
            } else {
                throw new SyntaxError('money content arguments error: ' + arguments);
            }
        };
        var TransferMoneyContent = dkd.dkd.TransferMoneyContent;
        Class(TransferMoneyContent, BaseMoneyContent, [TransferContent]);
        Implementation(TransferMoneyContent, {
            getRemitter: function () {
                var sender = this.getValue('remitter');
                return ID.parse(sender)
            }, setRemitter: function (sender) {
                this.setString('remitter', sender)
            }, getRemittee: function () {
                var receiver = this.getValue('remittee');
                return ID.parse(receiver)
            }, setRemittee: function (receiver) {
                this.setString('remittee', receiver)
            }
        });
        dkd.dkd.AppCustomizedContent = function () {
            var app = null;
            var mod = null;
            var act = null;
            if (arguments.length === 4) {
                BaseContent.call(this, arguments[0]);
                app = arguments[1];
                mod = arguments[2];
                act = arguments[3]
            } else if (arguments.length === 3) {
                BaseContent.call(this, ContentType.CUSTOMIZED);
                app = arguments[0];
                mod = arguments[1];
                act = arguments[2]
            } else {
                BaseContent.call(this, arguments[0])
            }
            if (app) {
                this.setValue('app', app)
            }
            if (mod) {
                this.setValue('mod', mod)
            }
            if (act) {
                this.setValue('act', act)
            }
        };
        var AppCustomizedContent = dkd.dkd.AppCustomizedContent;
        Class(AppCustomizedContent, BaseContent, [CustomizedContent]);
        Implementation(AppCustomizedContent, {
            getApplication: function () {
                return this.getString('app', '')
            }, getModule: function () {
                return this.getString('mod', '')
            }, getAction: function () {
                return this.getString('act', '')
            }
        });
        dkd.dkd.BaseMetaCommand = function () {
            var identifier = null;
            if (arguments.length === 2) {
                BaseCommand.call(this, arguments[1]);
                identifier = arguments[0]
            } else if (Interface.conforms(arguments[0], ID)) {
                BaseCommand.call(this, Command.META);
                identifier = arguments[0]
            } else {
                BaseCommand.call(this, arguments[0])
            }
            if (identifier) {
                this.setString('did', identifier)
            }
            this.__identifier = identifier;
            this.__meta = null
        };
        var BaseMetaCommand = dkd.dkd.BaseMetaCommand;
        Class(BaseMetaCommand, BaseCommand, [MetaCommand]);
        Implementation(BaseMetaCommand, {
            getIdentifier: function () {
                if (this.__identifier == null) {
                    var identifier = this.getValue("did");
                    this.__identifier = ID.parse(identifier)
                }
                return this.__identifier
            }, getMeta: function () {
                if (this.__meta === null) {
                    var meta = this.getValue('meta');
                    this.__meta = Meta.parse(meta)
                }
                return this.__meta
            }, setMeta: function (meta) {
                this.setMap('meta', meta);
                this.__meta = meta
            }
        });
        dkd.dkd.BaseDocumentCommand = function (info) {
            if (Interface.conforms(info, ID)) {
                BaseMetaCommand.call(this, info, Command.DOCUMENTS)
            } else {
                BaseMetaCommand.call(this, info)
            }
            this.__docs = null
        };
        var BaseDocumentCommand = dkd.dkd.BaseDocumentCommand;
        Class(BaseDocumentCommand, BaseMetaCommand, [DocumentCommand]);
        Implementation(BaseDocumentCommand, {
            getDocuments: function () {
                if (this.__docs === null) {
                    var docs = this.getValue('documents');
                    this.__docs = Document.convert(docs)
                }
                return this.__docs
            }, setDocuments: function (docs) {
                if (!docs) {
                    this.removeValue('documents')
                } else {
                    this.setValue('documents', Document.revert(docs))
                }
                this.__docs = docs
            }, getLastTime: function () {
                return this.getDateTime('last_time', null)
            }, setLastTime: function (when) {
                this.setDateTime('last_time', when)
            }
        });
        dkd.dkd.BaseHistoryCommand = function () {
            if (arguments.length === 2) {
                BaseCommand.call(this, arguments[0], arguments[1])
            } else if (IObject.isString(arguments[0])) {
                BaseCommand.call(this, ContentType.HISTORY, arguments[0])
            } else {
                BaseCommand.call(this, arguments[0])
            }
        };
        var BaseHistoryCommand = dkd.dkd.BaseHistoryCommand;
        Class(BaseHistoryCommand, BaseCommand, [HistoryCommand]);
        dkd.dkd.BaseGroupCommand = function () {
            if (arguments.length === 1) {
                BaseHistoryCommand.call(this, arguments[0])
            } else if (arguments.length === 2) {
                BaseHistoryCommand.call(this, ContentType.COMMAND, arguments[0]);
                this.setGroup(arguments[1])
            } else {
                throw new SyntaxError('Group command arguments error: ' + arguments);
            }
        };
        var BaseGroupCommand = dkd.dkd.BaseGroupCommand;
        Class(BaseGroupCommand, BaseHistoryCommand, [GroupCommand]);
        Implementation(BaseGroupCommand, {
            setMember: function (identifier) {
                this.setString('member', identifier);
                this.removeValue('members')
            }, getMember: function () {
                var member = this.getValue('member');
                return ID.parse(member)
            }, setMembers: function (users) {
                if (!users) {
                    this.removeValue('members')
                } else {
                    var array = ID.revert(users);
                    this.setValue('members', array)
                }
                this.removeValue('member')
            }, getMembers: function () {
                var array = this.getValue('members');
                if (array instanceof Array) {
                    return ID.convert(array)
                }
                var single = this.getMember();
                return !single ? [] : [single]
            }
        });
        dkd.dkd.InviteGroupCommand = function (info) {
            if (Interface.conforms(info, ID)) {
                BaseGroupCommand.call(this, GroupCommand.INVITE, info)
            } else {
                BaseGroupCommand.call(this, info)
            }
        };
        var InviteGroupCommand = dkd.dkd.InviteGroupCommand;
        Class(InviteGroupCommand, BaseGroupCommand, [InviteCommand]);
        dkd.dkd.ExpelGroupCommand = function (info) {
            if (Interface.conforms(info, ID)) {
                BaseGroupCommand.call(this, GroupCommand.EXPEL, info)
            } else {
                BaseGroupCommand.call(this, info)
            }
        };
        var ExpelGroupCommand = dkd.dkd.ExpelGroupCommand;
        Class(ExpelGroupCommand, BaseGroupCommand, [ExpelCommand]);
        dkd.dkd.JoinGroupCommand = function (info) {
            if (Interface.conforms(info, ID)) {
                BaseGroupCommand.call(this, GroupCommand.JOIN, info)
            } else {
                BaseGroupCommand.call(this, info)
            }
        };
        var JoinGroupCommand = dkd.dkd.JoinGroupCommand;
        Class(JoinGroupCommand, BaseGroupCommand, [JoinCommand]);
        dkd.dkd.QuitGroupCommand = function (info) {
            if (Interface.conforms(info, ID)) {
                BaseGroupCommand.call(this, GroupCommand.QUIT, info)
            } else {
                BaseGroupCommand.call(this, info)
            }
        };
        var QuitGroupCommand = dkd.dkd.QuitGroupCommand;
        Class(QuitGroupCommand, BaseGroupCommand, [QuitCommand]);
        dkd.dkd.ResetGroupCommand = function (info) {
            if (Interface.conforms(info, ID)) {
                BaseGroupCommand.call(this, GroupCommand.RESET, info)
            } else {
                BaseGroupCommand.call(this, info)
            }
        };
        var ResetGroupCommand = dkd.dkd.ResetGroupCommand;
        Class(ResetGroupCommand, BaseGroupCommand, [ResetCommand]);
        dkd.dkd.HireGroupCommand = function (info) {
            if (Interface.conforms(info, ID)) {
                BaseGroupCommand.call(this, GroupCommand.HIRE, info)
            } else {
                BaseGroupCommand.call(this, info)
            }
        };
        var HireGroupCommand = dkd.dkd.HireGroupCommand;
        Class(HireGroupCommand, BaseGroupCommand, [HireCommand]);
        Implementation(HireGroupCommand, {
            getAdministrators: function () {
                var array = this.getValue('administrators');
                return !array ? null : ID.convert(array)
            }, setAdministrators: function (admins) {
                if (!admins) {
                    this.removeValue('administrators')
                } else {
                    var array = ID.revert(admins);
                    this.setValue('administrators', array)
                }
            }, getAssistants: function () {
                var array = this.getValue('assistants');
                return !array ? null : ID.convert(array)
            }, setAssistants: function (bots) {
                if (!bots) {
                    this.removeValue('assistants')
                } else {
                    var array = ID.revert(bots);
                    this.setValue('assistants', array)
                }
            }
        });
        dkd.dkd.FireGroupCommand = function (info) {
            if (Interface.conforms(info, ID)) {
                BaseGroupCommand.call(this, GroupCommand.FIRE, info)
            } else {
                BaseGroupCommand.call(this, info)
            }
        };
        var FireGroupCommand = dkd.dkd.FireGroupCommand;
        Class(FireGroupCommand, BaseGroupCommand, [FireCommand]);
        Implementation(FireGroupCommand, {
            getAssistants: function () {
                var array = this.getValue('assistants');
                return !array ? null : ID.convert(array)
            }, setAssistants: function (bots) {
                if (!bots) {
                    this.removeValue('assistants')
                } else {
                    var array = ID.revert(bots);
                    this.setValue('assistants', array)
                }
            }, getAdministrators: function () {
                var array = this.getValue('administrators');
                return !array ? null : ID.convert(array)
            }, setAdministrators: function (admins) {
                if (!admins) {
                    this.removeValue('administrators')
                } else {
                    var array = ID.revert(admins);
                    this.setValue('administrators', array)
                }
            }
        });
        dkd.dkd.ResignGroupCommand = function (info) {
            if (Interface.conforms(info, ID)) {
                BaseGroupCommand.call(this, GroupCommand.RESIGN, info)
            } else {
                BaseGroupCommand.call(this, info)
            }
        };
        var ResignGroupCommand = dkd.dkd.ResignGroupCommand;
        Class(ResignGroupCommand, BaseGroupCommand, [ResignCommand]);
        dkd.dkd.BaseReceiptCommand = function () {
            if (arguments.length === 1) {
                BaseCommand.call(this, arguments[0])
            } else {
                BaseCommand.call(this, Command.RECEIPT);
                this.setValue('text', arguments[0]);
                var origin = arguments[1];
                if (origin) {
                    this.setValue('origin', origin)
                }
            }
            this.__env = null
        };
        var BaseReceiptCommand = dkd.dkd.BaseReceiptCommand;
        Class(BaseReceiptCommand, BaseCommand, [ReceiptCommand]);
        Implementation(BaseReceiptCommand, {
            getText: function () {
                return this.getString('text', '')
            }, getOrigin: function () {
                return this.getValue('origin')
            }, getOriginalEnvelope: function () {
                var env = this.__env;
                if (!env) {
                    env = Envelope.parse(this.getOrigin());
                    this.__env = env
                }
                return env
            }, getOriginalSerialNumber: function () {
                var origin = this.getOrigin();
                if (!origin) {
                    return null
                }
                return Converter.getInt(origin['sn'], null)
            }, getOriginalSignature: function () {
                var origin = this.getOrigin();
                if (!origin) {
                    return null
                }
                return Converter.getString(origin['signature'], null)
            }
        });
        dkd.msg.MessageEnvelope = function () {
            var from, to, when;
            var env;
            if (arguments.length === 1) {
                env = arguments[0];
                from = null;
                to = null;
                when = null
            } else if (arguments.length === 2 || arguments.length === 3) {
                from = arguments[0];
                to = arguments[1];
                if (arguments.length === 2) {
                    when = new Date()
                } else {
                    when = arguments[2];
                    if (when === null || when === 0) {
                        when = new Date()
                    } else {
                        when = Converter.getDateTime(when, null)
                    }
                }
                env = {'sender': from.toString(), 'receiver': to.toString(), 'time': when.getTime() / 1000.0}
            } else {
                throw new SyntaxError('envelope arguments error: ' + arguments);
            }
            Dictionary.call(this, env);
            this.__sender = from;
            this.__receiver = to;
            this.__time = when
        };
        var MessageEnvelope = dkd.msg.MessageEnvelope;
        Class(MessageEnvelope, Dictionary, [Envelope]);
        Implementation(MessageEnvelope, {
            getSender: function () {
                var sender = this.__sender;
                if (!sender) {
                    sender = ID.parse(this.getValue('sender'));
                    this.__sender = sender
                }
                return sender
            }, getReceiver: function () {
                var receiver = this.__receiver;
                if (!receiver) {
                    receiver = ID.parse(this.getValue('receiver'));
                    if (!receiver) {
                        receiver = ID.ANYONE
                    }
                    this.__receiver = receiver
                }
                return receiver
            }, getTime: function () {
                var time = this.__time;
                if (!time) {
                    time = this.getDateTime('time', null);
                    this.__time = time
                }
                return time
            }, getGroup: function () {
                return ID.parse(this.getValue('group'))
            }, setGroup: function (identifier) {
                this.setString('group', identifier)
            }, getType: function () {
                return this.getInt('type', null)
            }, setType: function (type) {
                this.setValue('type', type)
            }
        });
        dkd.msg.BaseMessage = function (msg) {
            var env = null;
            if (Interface.conforms(msg, Envelope)) {
                env = msg;
                msg = env.toMap()
            }
            Dictionary.call(this, msg);
            this.__envelope = env
        };
        var BaseMessage = dkd.msg.BaseMessage;
        Class(BaseMessage, Dictionary, [Message]);
        Implementation(BaseMessage, {
            getEnvelope: function () {
                var env = this.__envelope;
                if (!env) {
                    env = Envelope.parse(this.toMap());
                    this.__envelope = env
                }
                return env
            }, getSender: function () {
                var env = this.getEnvelope();
                return env.getSender()
            }, getReceiver: function () {
                var env = this.getEnvelope();
                return env.getReceiver()
            }, getTime: function () {
                var env = this.getEnvelope();
                return env.getTime()
            }, getGroup: function () {
                var env = this.getEnvelope();
                return env.getGroup()
            }, getType: function () {
                var env = this.getEnvelope();
                return env.getTime()
            }
        });
        BaseMessage.isBroadcast = function (msg) {
            if (msg.getReceiver().isBroadcast()) {
                return true
            }
            var group = ID.parse(msg.getValue('group'));
            if (!group) {
                return false
            }
            return group.isBroadcast()
        };
        dkd.msg.PlainMessage = function () {
            var msg, head, body;
            if (arguments.length === 1) {
                msg = arguments[0];
                head = null;
                body = null
            } else if (arguments.length === 2) {
                head = arguments[0];
                body = arguments[1];
                msg = head.toMap();
                msg['content'] = body.toMap()
            } else {
                throw new SyntaxError('message arguments error: ' + arguments);
            }
            BaseMessage.call(this, msg);
            this.__envelope = head;
            this.__content = body
        };
        var PlainMessage = dkd.msg.PlainMessage;
        Class(PlainMessage, BaseMessage, [InstantMessage]);
        Implementation(PlainMessage, {
            getTime: function () {
                var body = this.getContent();
                var time = body.getTime();
                if (time) {
                    return time
                }
                var head = this.getEnvelope();
                return head.getTime()
            }, getGroup: function () {
                var body = this.getContent();
                return body.getGroup()
            }, getType: function () {
                var body = this.getContent();
                return body.getType()
            }, getContent: function () {
                var body = this.__content;
                if (!body) {
                    body = Content.parse(this.getValue('content'));
                    this.__content = body
                }
                return body
            }, setContent: function (body) {
                this.setMap('content', body);
                this.__content = body
            }
        });
        dkd.msg.EncryptedMessage = function (msg) {
            BaseMessage.call(this, msg);
            this.__data = null;
            this.__key = null;
            this.__keys = null
        };
        var EncryptedMessage = dkd.msg.EncryptedMessage;
        Class(EncryptedMessage, BaseMessage, [SecureMessage]);
        Implementation(EncryptedMessage, {
            getData: function () {
                var binary = this.__data;
                if (!binary) {
                    var base64 = this.getValue('data');
                    if (!base64) {
                        throw new ReferenceError('message data not found: ' + this);
                    } else if (!BaseMessage.isBroadcast(this)) {
                        binary = TransportableData.decode(base64)
                    } else if (IObject.isString(base64)) {
                        binary = UTF8.encode(base64)
                    } else {
                        throw new ReferenceError('message data error: ' + base64);
                    }
                    this.__data = binary
                }
                return binary
            }, getEncryptedKey: function () {
                var ted = this.__key;
                if (!ted) {
                    var base64 = this.getValue('key');
                    if (!base64) {
                        var keys = this.getEncryptedKeys();
                        if (keys) {
                            var receiver = this.getReceiver();
                            base64 = keys[receiver.toString()]
                        }
                    }
                    ted = TransportableData.parse(base64);
                    this.__key = ted
                }
                return !ted ? null : ted.getData()
            }, getEncryptedKeys: function () {
                var keys = this.__keys;
                if (!keys) {
                    keys = this.getValue('keys');
                    this.__keys = keys
                }
                return keys
            }
        });
        dkd.msg.NetworkMessage = function (msg) {
            EncryptedMessage.call(this, msg);
            this.__signature = null
        };
        var NetworkMessage = dkd.msg.NetworkMessage;
        Class(NetworkMessage, EncryptedMessage, [ReliableMessage]);
        Implementation(NetworkMessage, {
            getSignature: function () {
                var ted = this.__signature;
                if (!ted) {
                    var base64 = this.getValue('signature');
                    ted = TransportableData.parse(base64);
                    this.__signature = ted
                }
                return !ted ? null : ted.getData()
            }
        });
        dkd.ext.CommandHelper = Interface(null, null);
        var CommandHelper = dkd.ext.CommandHelper;
        CommandHelper.prototype = {
            setCommandFactory: function (cmd, factory) {
            }, getCommandFactory: function (cmd) {
            }, parseCommand: function (content) {
            }
        };
        dkd.ext.CommandExtensions = {
            setCommandHelper: function (helper) {
                cmdHelper = helper
            }, getCommandHelper: function () {
                return cmdHelper
            }
        };
        var CommandExtensions = dkd.ext.CommandExtensions;
        var cmdHelper = null;
        dkd.ext.GeneralCommandHelper = Interface(null, null);
        var GeneralCommandHelper = dkd.ext.GeneralCommandHelper;
        GeneralCommandHelper.prototype = {
            getCmd: function (content, defaultValue) {
            }
        };
        dkd.ext.SharedCommandExtensions = {
            setCommandHelper: function (helper) {
                CommandExtensions.setCommandHelper(helper)
            }, getCommandHelper: function () {
                return CommandExtensions.getCommandHelper()
            }, setHelper: function (helper) {
                generalCommandHelper = helper
            }, getHelper: function () {
                return generalCommandHelper
            }
        };
        var SharedCommandExtensions = dkd.ext.SharedCommandExtensions;
        var generalCommandHelper = null
    })(DaoKeDao, MingKeMing, MONKEY)
})(DIMP, DIMP, DIMP);
(function (dimp, dkd, mkm, mk) {
    if (typeof dimp.ext !== 'object') {
        dimp.ext = {}
    }
    var Interface = mk.type.Interface;
    var Class = mk.type.Class;
    var Implementation = mk.type.Implementation;
    var Converter = mk.type.Converter;
    var Wrapper = mk.type.Wrapper;
    var Mapper = mk.type.Mapper;
    var Stringer = mk.type.Stringer;
    var IObject = mk.type.Object;
    var BaseObject = mk.type.BaseObject;
    var ConstantString = mk.type.ConstantString;
    var Dictionary = mk.type.Dictionary;
    var Arrays = mk.type.Arrays;
    var StringCoder = mk.format.StringCoder;
    var UTF8 = mk.format.UTF8;
    var ObjectCoder = mk.format.ObjectCoder;
    var JSONMap = mk.format.JSONMap;
    var DataCoder = mk.format.DataCoder;
    var Base58 = mk.format.Base58;
    var Base64 = mk.format.Base64;
    var Hex = mk.format.Hex;
    var BaseDataWrapper = mk.format.BaseDataWrapper;
    var BaseFileWrapper = mk.format.BaseFileWrapper;
    var MessageDigester = mk.digest.MessageDigester;
    var SHA256 = mk.digest.SHA256;
    var RIPEMD160 = mk.digest.RIPEMD160;
    var KECCAK256 = mk.digest.KECCAK256;
    var EncodeAlgorithms = mk.protocol.EncodeAlgorithms;
    var TransportableData = mk.protocol.TransportableData;
    var TransportableDataFactory = mk.protocol.TransportableData.Factory;
    var PortableNetworkFile = mk.protocol.PortableNetworkFile;
    var PortableNetworkFileFactory = mk.protocol.PortableNetworkFile.Factory;
    var SymmetricAlgorithms = mk.protocol.SymmetricAlgorithms;
    var AsymmetricAlgorithms = mk.protocol.AsymmetricAlgorithms;
    var EncryptKey = mk.protocol.EncryptKey;
    var DecryptKey = mk.protocol.DecryptKey;
    var SymmetricKey = mk.protocol.SymmetricKey;
    var SymmetricKeyFactory = mk.protocol.SymmetricKey.Factory;
    var PublicKey = mk.protocol.PublicKey;
    var PublicKeyFactory = mk.protocol.PublicKey.Factory;
    var PrivateKey = mk.protocol.PrivateKey;
    var PrivateKeyFactory = mk.protocol.PrivateKey.Factory;
    var BaseSymmetricKey = mk.crypto.BaseSymmetricKey;
    var BasePublicKey = mk.crypto.BasePublicKey;
    var BasePrivateKey = mk.crypto.BasePrivateKey;
    var GeneralCryptoHelper = mk.ext.GeneralCryptoHelper;
    var SymmetricKeyHelper = mk.ext.SymmetricKeyHelper;
    var PrivateKeyHelper = mk.ext.PrivateKeyHelper;
    var PublicKeyHelper = mk.ext.PublicKeyHelper;
    var GeneralFormatHelper = mk.ext.GeneralFormatHelper;
    var PortableNetworkFileHelper = mk.ext.PortableNetworkFileHelper;
    var TransportableDataHelper = mk.ext.TransportableDataHelper;
    var SharedCryptoExtensions = mk.ext.SharedCryptoExtensions;
    var SharedFormatExtensions = mk.ext.SharedFormatExtensions;
    var EntityType = mkm.protocol.EntityType;
    var Address = mkm.protocol.Address;
    var AddressFactory = mkm.protocol.Address.Factory;
    var ID = mkm.protocol.ID;
    var IDFactory = mkm.protocol.ID.Factory;
    var Meta = mkm.protocol.Meta;
    var MetaFactory = mkm.protocol.Meta.Factory;
    var Document = mkm.protocol.Document;
    var DocumentFactory = mkm.protocol.Document.Factory;
    var MetaType = mkm.protocol.MetaType;
    var DocumentType = mkm.protocol.DocumentType;
    var Identifier = mkm.mkm.Identifier;
    var BaseMeta = mkm.mkm.BaseMeta;
    var BaseDocument = mkm.mkm.BaseDocument;
    var BaseBulletin = mkm.mkm.BaseBulletin;
    var BaseVisa = mkm.mkm.BaseVisa;
    var GeneralAccountHelper = mkm.ext.GeneralAccountHelper;
    var AddressHelper = mkm.ext.AddressHelper;
    var IdentifierHelper = mkm.ext.IdentifierHelper;
    var MetaHelper = mkm.ext.MetaHelper;
    var DocumentHelper = mkm.ext.DocumentHelper;
    var SharedAccountExtensions = mkm.ext.SharedAccountExtensions;
    var InstantMessage = dkd.protocol.InstantMessage;
    var InstantMessageFactory = dkd.protocol.InstantMessage.Factory;
    var SecureMessage = dkd.protocol.SecureMessage;
    var SecureMessageFactory = dkd.protocol.SecureMessage.Factory;
    var ReliableMessage = dkd.protocol.ReliableMessage;
    var ReliableMessageFactory = dkd.protocol.ReliableMessage.Factory;
    var Envelope = dkd.protocol.Envelope;
    var EnvelopeFactory = dkd.protocol.Envelope.Factory;
    var Content = dkd.protocol.Content;
    var ContentFactory = dkd.protocol.Content.Factory;
    var Command = dkd.protocol.Command;
    var CommandFactory = dkd.protocol.Command.Factory;
    var ContentType = dkd.protocol.ContentType;
    var GroupCommand = dkd.protocol.GroupCommand;
    var MessageEnvelope = dkd.msg.MessageEnvelope;
    var PlainMessage = dkd.msg.PlainMessage;
    var EncryptedMessage = dkd.msg.EncryptedMessage;
    var NetworkMessage = dkd.msg.NetworkMessage;
    var BaseContent = dkd.dkd.BaseContent;
    var BaseTextContent = dkd.dkd.BaseTextContent;
    var BaseFileContent = dkd.dkd.BaseFileContent;
    var ImageFileContent = dkd.dkd.ImageFileContent;
    var AudioFileContent = dkd.dkd.AudioFileContent;
    var VideoFileContent = dkd.dkd.VideoFileContent;
    var WebPageContent = dkd.dkd.WebPageContent;
    var NameCardContent = dkd.dkd.NameCardContent;
    var BaseQuoteContent = dkd.dkd.BaseQuoteContent;
    var BaseMoneyContent = dkd.dkd.BaseMoneyContent;
    var TransferMoneyContent = dkd.dkd.TransferMoneyContent;
    var ListContent = dkd.dkd.ListContent;
    var CombineForwardContent = dkd.dkd.CombineForwardContent;
    var SecretContent = dkd.dkd.SecretContent;
    var AppCustomizedContent = dkd.dkd.AppCustomizedContent;
    var BaseCommand = dkd.dkd.BaseCommand;
    var BaseMetaCommand = dkd.dkd.BaseMetaCommand;
    var BaseDocumentCommand = dkd.dkd.BaseDocumentCommand;
    var BaseReceiptCommand = dkd.dkd.BaseReceiptCommand;
    var BaseHistoryCommand = dkd.dkd.BaseHistoryCommand;
    var BaseGroupCommand = dkd.dkd.BaseGroupCommand;
    var InviteGroupCommand = dkd.dkd.InviteGroupCommand;
    var ExpelGroupCommand = dkd.dkd.ExpelGroupCommand;
    var JoinGroupCommand = dkd.dkd.JoinGroupCommand;
    var QuitGroupCommand = dkd.dkd.QuitGroupCommand;
    var ResetGroupCommand = dkd.dkd.ResetGroupCommand;
    var HireGroupCommand = dkd.dkd.HireGroupCommand;
    var FireGroupCommand = dkd.dkd.FireGroupCommand;
    var ResignGroupCommand = dkd.dkd.ResignGroupCommand;
    var GeneralMessageHelper = dkd.ext.GeneralMessageHelper;
    var ContentHelper = dkd.ext.ContentHelper;
    var EnvelopeHelper = dkd.ext.EnvelopeHelper;
    var InstantMessageHelper = dkd.ext.InstantMessageHelper;
    var SecureMessageHelper = dkd.ext.SecureMessageHelper;
    var ReliableMessageHelper = dkd.ext.ReliableMessageHelper;
    var GeneralCommandHelper = dkd.ext.GeneralCommandHelper;
    var CommandHelper = dkd.ext.CommandHelper;
    var SharedCommandExtensions = dkd.ext.SharedCommandExtensions;
    var SharedMessageExtensions = dkd.ext.SharedMessageExtensions;
    var string_repeat = function (count) {
        var text = '';
        for (var i = 0; i < count; ++i) {
            text += this
        }
        return text
    };

    function base_chars(ALPHABET) {
        if (ALPHABET.length >= 255) {
            throw new TypeError("Alphabet too long")
        }
        var BASE_MAP = new Uint8Array(256);
        for (var j = 0; j < BASE_MAP.length; j++) {
            BASE_MAP[j] = 255
        }
        for (var i = 0; i < ALPHABET.length; i++) {
            var x = ALPHABET.charAt(i);
            var xc = x.charCodeAt(0);
            if (BASE_MAP[xc] !== 255) {
                throw new TypeError(x + " is ambiguous")
            }
            BASE_MAP[xc] = i
        }
        var BASE = ALPHABET.length;
        var LEADER = ALPHABET.charAt(0);
        var FACTOR = Math.log(BASE) / Math.log(256);
        var iFACTOR = Math.log(256) / Math.log(BASE);

        function encode(source) {
            if (source.length === 0) {
                return ""
            }
            var zeroes = 0;
            var length = 0;
            var pbegin = 0;
            var pend = source.length;
            while (pbegin !== pend && source[pbegin] === 0) {
                pbegin++;
                zeroes++
            }
            var size = ((pend - pbegin) * iFACTOR + 1) >>> 0;
            var b58 = new Uint8Array(size);
            while (pbegin !== pend) {
                var carry = source[pbegin];
                var i = 0;
                for (var it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {
                    carry += (256 * b58[it1]) >>> 0;
                    b58[it1] = (carry % BASE) >>> 0;
                    carry = (carry / BASE) >>> 0
                }
                if (carry !== 0) {
                    throw new Error("Non-zero carry")
                }
                length = i;
                pbegin++
            }
            var it2 = size - length;
            while (it2 !== size && b58[it2] === 0) {
                it2++
            }
            var str = string_repeat.call(LEADER, zeroes);
            for (; it2 < size; ++it2) {
                str += ALPHABET.charAt(b58[it2])
            }
            return str
        }

        function decodeUnsafe(source) {
            if (typeof source !== "string") {
                throw new TypeError("Expected String")
            }
            if (source.length === 0) {
                return []
            }
            var psz = 0;
            if (source[psz] === " ") {
                return
            }
            var zeroes = 0;
            var length = 0;
            while (source[psz] === LEADER) {
                zeroes++;
                psz++
            }
            var size = (((source.length - psz) * FACTOR) + 1) >>> 0;
            var b256 = new Uint8Array(size);
            while (source[psz]) {
                var carry = BASE_MAP[source.charCodeAt(psz)];
                if (carry === 255) {
                    return
                }
                var i = 0;
                for (var it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {
                    carry += (BASE * b256[it3]) >>> 0;
                    b256[it3] = (carry % 256) >>> 0;
                    carry = (carry / 256) >>> 0
                }
                if (carry !== 0) {
                    throw new Error("Non-zero carry")
                }
                length = i;
                psz++
            }
            if (source[psz] === " ") {
                return
            }
            var it4 = size - length;
            while (it4 !== size && b256[it4] === 0) {
                it4++
            }
            var vch = [];
            var j = 0;
            for (; j < zeroes; ++j) {
                vch[j] = 0
            }
            while (it4 !== size) {
                vch[j++] = b256[it4++]
            }
            return vch
        }

        function decode(string) {
            var buffer = decodeUnsafe(string);
            if (buffer) {
                return new Uint8Array(buffer)
            }
            throw new Error("Non-base" + BASE + " character")
        }

        return {encode: encode, decodeUnsafe: decodeUnsafe, decode: decode}
    }

    var bs58 = base_chars('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
    mk.format.Base58Coder = function () {
        BaseObject.call(this)
    };
    var Base58Coder = mk.format.Base58Coder;
    Class(Base58Coder, BaseObject, [DataCoder]);
    Implementation(Base58Coder, {
        encode: function (data) {
            return bs58.encode(data)
        }, decode: function (string) {
            return bs58.decode(string)
        }
    });
    var base64_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var base64_values = new Int8Array(128);
    (function (chars, values) {
        for (var i = 0; i < chars.length; ++i) {
            values[chars.charCodeAt(i)] = i
        }
    })(base64_chars, base64_values);
    var base64_encode = function (data) {
        var base64 = '';
        var length = data.length;
        var remainder = length % 3;
        length -= remainder;
        var x1, x2, x3;
        var i;
        for (i = 0; i < length; i += 3) {
            x1 = data[i];
            x2 = data[i + 1];
            x3 = data[i + 2];
            base64 += base64_chars.charAt((x1 & 0xFC) >> 2);
            base64 += base64_chars.charAt(((x1 & 0x03) << 4) | ((x2 & 0xF0) >> 4));
            base64 += base64_chars.charAt(((x2 & 0x0F) << 2) | ((x3 & 0xC0) >> 6));
            base64 += base64_chars.charAt(x3 & 0x3F)
        }
        if (remainder === 1) {
            x1 = data[i];
            base64 += base64_chars.charAt((x1 & 0xFC) >> 2);
            base64 += base64_chars.charAt((x1 & 0x03) << 4);
            base64 += '=='
        } else if (remainder === 2) {
            x1 = data[i];
            x2 = data[i + 1];
            base64 += base64_chars.charAt((x1 & 0xFC) >> 2);
            base64 += base64_chars.charAt(((x1 & 0x03) << 4) | ((x2 & 0xF0) >> 4));
            base64 += base64_chars.charAt((x2 & 0x0F) << 2);
            base64 += '='
        }
        return base64
    };
    var base64_decode = function (string) {
        var str = string.replace(/[^A-Za-z0-9+\/=]/g, '');
        var length = str.length;
        if ((length % 4) !== 0 || !/^[A-Za-z0-9+\/]+={0,2}$/.test(str)) {
            throw new Error('base64 string error: ' + string)
        }
        var array = [];
        var ch1, ch2, ch3, ch4;
        var i;
        for (i = 0; i < length; i += 4) {
            ch1 = base64_values[str.charCodeAt(i)];
            ch2 = base64_values[str.charCodeAt(i + 1)];
            ch3 = base64_values[str.charCodeAt(i + 2)];
            ch4 = base64_values[str.charCodeAt(i + 3)];
            array.push(((ch1 & 0x3F) << 2) | ((ch2 & 0x30) >> 4));
            array.push(((ch2 & 0x0F) << 4) | ((ch3 & 0x3C) >> 2));
            array.push(((ch3 & 0x03) << 6) | ((ch4 & 0x3F) >> 0))
        }
        while (str[--i] === '=') {
            array.pop()
        }
        return Uint8Array.from(array)
    };
    mk.format.Base64Coder = function () {
        BaseObject.call(this)
    };
    var Base64Coder = mk.format.Base64Coder;
    Class(Base64Coder, BaseObject, [DataCoder]);
    Implementation(Base64Coder, {
        encode: function (data) {
            return base64_encode(data)
        }, decode: function (string) {
            return base64_decode(string)
        }
    });
    var hex_chars = '0123456789abcdef';
    var hex_values = new Int8Array(128);
    (function (chars, values) {
        for (var i = 0; i < chars.length; ++i) {
            values[chars.charCodeAt(i)] = i
        }
        values['A'.charCodeAt(0)] = 0x0A;
        values['B'.charCodeAt(0)] = 0x0B;
        values['C'.charCodeAt(0)] = 0x0C;
        values['D'.charCodeAt(0)] = 0x0D;
        values['E'.charCodeAt(0)] = 0x0E;
        values['F'.charCodeAt(0)] = 0x0F
    })(hex_chars, hex_values);
    var hex_encode = function (data) {
        var len = data.length;
        var str = '';
        var byt;
        for (var i = 0; i < len; ++i) {
            byt = data[i];
            str += hex_chars[byt >> 4];
            str += hex_chars[byt & 0x0F]
        }
        return str
    };
    var hex_decode = function (string) {
        var len = string.length;
        if (len > 2) {
            if (string[0] === '0') {
                if (string[1] === 'x' || string[1] === 'X') {
                    string = string.substring(2);
                    len -= 2
                }
            }
        }
        if (len % 2 === 1) {
            string = '0' + string;
            len += 1
        }
        var cnt = len >> 1;
        var hi, lo;
        var data = new Uint8Array(cnt);
        for (var i = 0, j = 0; i < cnt; ++i, j += 2) {
            hi = hex_values[string.charCodeAt(j)];
            lo = hex_values[string.charCodeAt(j + 1)];
            data[i] = (hi << 4) | lo
        }
        return data
    };
    mk.format.HexCoder = function () {
        BaseObject.call(this)
    };
    var HexCoder = mk.format.HexCoder;
    Class(HexCoder, BaseObject, [DataCoder]);
    Implementation(HexCoder, {
        encode: function (data) {
            return hex_encode(data)
        }, decode: function (string) {
            return hex_decode(string)
        }
    });
    mk.format.JSONCoder = function () {
        BaseObject.call(this)
    };
    var JSONCoder = mk.format.JSONCoder;
    Class(JSONCoder, BaseObject, [ObjectCoder]);
    Implementation(JSONCoder, {
        encode: function (object) {
            return JSON.stringify(object)
        }, decode: function (string) {
            return JSON.parse(string)
        }
    });
    mk.format.BaseNetworkFile = function () {
        var ted = null, filename = null, url = null, password = null;
        if (arguments.length === 1) {
            Dictionary.call(this, arguments[0])
        } else if (arguments.length === 4) {
            Dictionary.call(this);
            ted = arguments[0];
            filename = arguments[1];
            url = arguments[2];
            password = arguments[3]
        } else {
            throw new SyntaxError('PNF arguments error: ' + arguments);
        }
        var wrapper = new BaseFileWrapper(this.toMap());
        if (ted) {
            wrapper.setData(ted)
        }
        if (filename) {
            wrapper.setFilename(filename)
        }
        if (url) {
            wrapper.setURL(url)
        }
        if (password) {
            wrapper.setPassword(password)
        }
        this.__wrapper = wrapper
    };
    var BaseNetworkFile = mk.format.BaseNetworkFile;
    Class(BaseNetworkFile, Dictionary, [PortableNetworkFile]);
    Implementation(BaseNetworkFile, {
        getData: function () {
            var ted = this.__wrapper.getData();
            return !ted ? null : ted.getData()
        }, setData: function (binary) {
            this.__wrapper.setBinaryData(binary)
        }, getFilename: function () {
            return this.__wrapper.getFilename()
        }, setFilename: function (filename) {
            this.__wrapper.setFilename(filename)
        }, getURL: function () {
            return this.__wrapper.getURL()
        }, setURL: function (url) {
            this.__wrapper.setURL(url)
        }, getPassword: function () {
            return this.__wrapper.getPassword()
        }, setPassword: function (key) {
            this.__wrapper.setPassword(key)
        }, toString: function () {
            var url = this.getURLString();
            if (url) {
                return url
            }
            return JSONMap.encode(this.toMap())
        }, toObject: function () {
            var url = this.getURLString();
            if (url) {
                return url
            }
            return this.toMap()
        }, getURLString: function () {
            var url = this.getString('URL', '');
            var len = url.length;
            if (len === 0) {
                return null
            } else if (len > 5 && url.substring(0, 5) === 'data:') {
                return url
            }
            var count = this.getLength();
            if (count === 1) {
                return url
            } else if (count === 2 && this.getValue('filename')) {
                return url
            } else {
                return null
            }
        }
    });
    mk.format.BaseNetworkFileFactory = function () {
        BaseObject.call(this)
    };
    var BaseNetworkFileFactory = mk.format.BaseNetworkFileFactory;
    Class(BaseNetworkFileFactory, BaseObject, [PortableNetworkFileFactory]);
    Implementation(BaseNetworkFileFactory, {
        createPortableNetworkFile: function (ted, filename, url, password) {
            return new BaseNetworkFile(ted, filename, url, password)
        }, parsePortableNetworkFile: function (pnf) {
            if (pnf['data'] || pnf['URL'] || pnf['filename']) {
            } else {
                return null
            }
            return new BaseNetworkFile(pnf)
        }
    });
    mk.format.Base64Data = function (info) {
        var binary = null;
        if (info instanceof Uint8Array) {
            binary = info;
            info = null
        }
        Dictionary.call(this, info);
        var wrapper = new BaseDataWrapper(this.toMap());
        if (binary) {
            wrapper.setAlgorithm(EncodeAlgorithms.BASE_64);
            if (binary.length > 0) {
                wrapper.setData(binary)
            }
        }
        this.__wrapper = wrapper
    };
    var Base64Data = mk.format.Base64Data;
    Class(Base64Data, Dictionary, [TransportableData]);
    Implementation(Base64Data, {
        getAlgorithm: function () {
            return this.__wrapper.getAlgorithm()
        }, getData: function () {
            return this.__wrapper.getData()
        }, toObject: function () {
            return this.toString()
        }, toString: function () {
            return this.__wrapper.toString()
        }, encode: function (mimeType) {
            return this.__wrapper.encode(mimeType)
        }
    });
    mk.format.Base64DataFactory = function () {
        BaseObject.call(this)
    };
    var Base64DataFactory = mk.format.Base64DataFactory;
    Class(Base64DataFactory, BaseObject, [TransportableDataFactory]);
    Implementation(Base64DataFactory, {
        createTransportableData: function (data) {
            return new Base64Data(data)
        }, parseTransportableData: function (ted) {
            if (ted['data']) {
            } else {
                return null
            }
            return new Base64Data(ted)
        }
    });
    var utf8_encode = function (string) {
        var len = string.length;
        var array = [];
        var c, l;
        for (var i = 0; i < len; ++i) {
            c = string.charCodeAt(i);
            if (0xD800 <= c && c <= 0xDBFF) {
                l = string.charCodeAt(++i);
                c = ((c - 0xD800) << 10) + 0x10000 + l - 0xDC00
            }
            if (c <= 0) {
                break
            } else if (c < 0x0080) {
                array.push(c)
            } else if (c < 0x0800) {
                array.push(0xC0 | ((c >> 6) & 0x1F));
                array.push(0x80 | ((c >> 0) & 0x3F))
            } else if (c < 0x10000) {
                array.push(0xE0 | ((c >> 12) & 0x0F));
                array.push(0x80 | ((c >> 6) & 0x3F));
                array.push(0x80 | ((c >> 0) & 0x3F))
            } else {
                array.push(0xF0 | ((c >> 18) & 0x07));
                array.push(0x80 | ((c >> 12) & 0x3F));
                array.push(0x80 | ((c >> 6) & 0x3F));
                array.push(0x80 | ((c >> 0) & 0x3F))
            }
        }
        return Uint8Array.from(array)
    };
    var utf8_decode = function (array) {
        var string = '';
        var len = array.length;
        var c, c2, c3, c4;
        for (var i = 0; i < len; ++i) {
            c = array[i];
            switch (c >> 4) {
                case 12:
                case 13:
                    c2 = array[++i];
                    c = ((c & 0x1F) << 6) | (c2 & 0x3F);
                    break;
                case 14:
                    c2 = array[++i];
                    c3 = array[++i];
                    c = ((c & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
                    break;
                case 15:
                    c2 = array[++i];
                    c3 = array[++i];
                    c4 = array[++i];
                    c = ((c & 0x07) << 18) | ((c2 & 0x3F) << 12) | ((c3 & 0x3F) << 6) | (c4 & 0x3F);
                    break
            }
            if (c < 0x10000) {
                string += String.fromCharCode(c)
            } else {
                c -= 0x10000;
                string += String.fromCharCode((c >> 10) + 0xD800);
                string += String.fromCharCode((c & 0x03FF) + 0xDC00)
            }
        }
        return string
    };
    mk.format.UTF8Coder = function () {
        BaseObject.call(this)
    };
    var UTF8Coder = mk.format.UTF8Coder;
    Class(UTF8Coder, BaseObject, [StringCoder]);
    Implementation(UTF8Coder, {
        encode: function (string) {
            return utf8_encode(string)
        }, decode: function (data) {
            return utf8_decode(data)
        }
    })
    mk.digest.SHA256Digester = function () {
        BaseObject.call(this)
    };
    var SHA256Digester = mk.digest.SHA256Digester;
    Class(SHA256Digester, BaseObject, [MessageDigester]);
    Implementation(SHA256Digester, {
        digest: function (data) {
            var hex = Hex.encode(data);
            var array = CryptoJS.enc.Hex.parse(hex);
            var result = CryptoJS.SHA256(array);
            return Hex.decode(result.toString())
        }
    });
    mk.digest.RIPEMD160Digester = function () {
        BaseObject.call(this)
    };
    var RIPEMD160Digester = mk.digest.RIPEMD160Digester;
    Class(RIPEMD160Digester, BaseObject, [MessageDigester]);
    Implementation(RIPEMD160Digester, {
        digest: function (data) {
            var hex = Hex.encode(data);
            var array = CryptoJS.enc.Hex.parse(hex);
            var result = CryptoJS.RIPEMD160(array);
            return Hex.decode(result.toString())
        }
    });
    mk.digest.KECCAK256Digester = function () {
        BaseObject.call(this)
    };
    var KECCAK256Digester = mk.digest.KECCAK256Digester;
    Class(KECCAK256Digester, BaseObject, [MessageDigester]);
    Implementation(KECCAK256Digester, {
        digest: function (data) {
            var array = window.keccak256.update(data).digest();
            return new Uint8Array(array)
        }
    });
    var bytes2words = function (data) {
        var string = Hex.encode(data);
        return CryptoJS.enc.Hex.parse(string)
    };
    var words2bytes = function (array) {
        var result = array.toString();
        return Hex.decode(result)
    };
    var random_data = function (size) {
        var data = new Uint8Array(size);
        for (var i = 0; i < size; ++i) {
            data[i] = Math.floor(Math.random() * 256)
        }
        return data
    };
    var zero_data = function (size) {
        return new Uint8Array(size)
    };
    mk.crypto.AESKey = function (key) {
        BaseSymmetricKey.call(this, key);
        var base64 = this.getValue('data');
        if (base64) {
            this.__tedKey = null
        } else {
            this.__tedKey = this.generateKeyData()
        }
    };
    var AESKey = mk.crypto.AESKey;
    AESKey.AES_CBC_PKCS7 = 'AES/CBC/PKCS7Padding';
    Class(AESKey, BaseSymmetricKey, null);
    Implementation(AESKey, {
        generateKeyData: function () {
            var keySize = this.getKeySize();
            var pwd = random_data(keySize);
            var ted = TransportableData.create(pwd);
            this.setValue('data', ted.toObject());
            return ted
        }, getKeySize: function () {
            return this.getInt('keySize', 32)
        }, getBlockSize: function () {
            return this.getInt('blockSize', 16)
        }, getData: function () {
            var ted = this.__tedKey;
            if (!ted) {
                var base64 = this.getValue('data');
                ted = TransportableData.parse(base64);
                this.__tedKey = ted
            }
            return !ted ? null : ted.getData()
        }, getInitVector: function (params) {
            if (!params) {
                throw new SyntaxError('params must provided to fetch IV for AES');
            }
            var base64 = params['IV'];
            if (!base64) {
                base64 = params['iv']
            }
            var ted = TransportableData.parse(base64);
            if (ted) {
                return ted.getData()
            } else if (base64) {
                throw new TypeError('IV data error: ' + base64);
            } else {
                return null
            }
        }, zeroInitVector: function () {
            var blockSize = this.getBlockSize();
            return zero_data(blockSize)
        }, newInitVector: function (extra) {
            if (!extra) {
                throw new SyntaxError('extra dict must provided to store IV for AES');
            }
            var blockSize = this.getBlockSize();
            var ivData = random_data(blockSize);
            var ted = TransportableData.create(ivData, null);
            extra['IV'] = ted.toObject();
            return ivData
        }, encrypt: function (plaintext, extra) {
            var iv = this.getInitVector(extra);
            if (!iv) {
                iv = this.newInitVector(extra)
            }
            var ivWordArray = bytes2words(iv);
            var key = this.getData();
            var keyWordArray = bytes2words(key);
            var message = bytes2words(plaintext);
            var cipher = CryptoJS.AES.encrypt(message, keyWordArray, {iv: ivWordArray});
            if (cipher.hasOwnProperty('ciphertext')) {
                return words2bytes(cipher.ciphertext)
            }
            return null
        }, decrypt: function (ciphertext, params) {
            var iv = this.getInitVector(params);
            if (!iv) {
                iv = this.zeroInitVector()
            }
            var ivWordArray = bytes2words(iv);
            var key = this.getData();
            var keyWordArray = bytes2words(key);
            var message = bytes2words(ciphertext);
            var cipher = {ciphertext: message};
            var plaintext = CryptoJS.AES.decrypt(cipher, keyWordArray, {iv: ivWordArray});
            return words2bytes(plaintext)
        }
    });
    mk.crypto.AESKeyFactory = function () {
        BaseObject.call(this)
    };
    var AESKeyFactory = mk.crypto.AESKeyFactory;
    Class(AESKeyFactory, BaseObject, [SymmetricKeyFactory]);
    AESKeyFactory.prototype.generateSymmetricKey = function () {
        return new AESKey({'algorithm': SymmetricAlgorithms.AES})
    };
    AESKeyFactory.prototype.parseSymmetricKey = function (key) {
        if (key['data'] === null) {
            return null
        }
        return new AESKey(key)
    };
    var mem_cpy = function (dst, dst_offset, src, src_offset, src_len) {
        for (var i = 0; i < src_len; ++i) {
            dst[dst_offset + i] = src[src_offset + i]
        }
    };
    var trim_to_32_bytes = function (src, src_offset, src_len, dst) {
        var pos = src_offset;
        while (src[pos] === 0 && src_len > 0) {
            ++pos;
            --src_len
        }
        if (src_len > 32 || src_len < 1) {
            return false
        }
        var dst_offset = 32 - src_len;
        mem_cpy(dst, dst_offset, src, pos, src_len);
        return true
    };
    var ecc_der_to_sig = function (der, der_len) {
        var seq_len;
        var r_len;
        var s_len;
        if (der_len < 8 || der[0] !== 0x30 || der[2] !== 0x02) {
            return null
        }
        seq_len = der[1];
        if ((seq_len <= 0) || (seq_len + 2 !== der_len)) {
            return null
        }
        r_len = der[3];
        if ((r_len < 1) || (r_len > seq_len - 5) || (der[4 + r_len] !== 0x02)) {
            return null
        }
        s_len = der[5 + r_len];
        if ((s_len < 1) || (s_len !== seq_len - 4 - r_len)) {
            return null
        }
        var sig_r = new Uint8Array(32);
        var sig_s = new Uint8Array(32);
        if (trim_to_32_bytes(der, 4, r_len, sig_r) && trim_to_32_bytes(der, 6 + r_len, s_len, sig_s)) {
            return {r: sig_r, s: sig_s}
        } else {
            return null
        }
    };
    var ecc_sig_to_der = function (sig_r, sig_s, der) {
        var i;
        var p = 0, len, len1, len2;
        der[p] = 0x30;
        p++;
        der[p] = 0x00;
        len = p;
        p++;
        der[p] = 0x02;
        p++;
        der[p] = 0x00;
        len1 = p;
        p++;
        i = 0;
        while (sig_r[i] === 0 && i < 32) {
            i++
        }
        if (sig_r[i] >= 0x80) {
            der[p] = 0x00;
            p++;
            der[len1] = der[len1] + 1
        }
        while (i < 32) {
            der[p] = sig_r[i];
            p++;
            der[len1] = der[len1] + 1;
            i++
        }
        der[p] = 0x02;
        p++;
        der[p] = 0x00;
        len2 = p;
        p++;
        i = 0;
        while (sig_s[i] === 0 && i < 32) {
            i++
        }
        if (sig_s[i] >= 0x80) {
            der[p] = 0x00;
            p++;
            der[len2] = der[len2] + 1
        }
        while (i < 32) {
            der[p] = sig_s[i];
            p++;
            der[len2] = der[len2] + 1;
            i++
        }
        der[len] = der[len1] + der[len2] + 4;
        return der[len] + 2
    };
    var decode_points = function (data) {
        var x, y;
        if (data.length === 65) {
            if (data[0] === 4) {
                x = Secp256k1.uint256(data.subarray(1, 33), 16);
                y = Secp256k1.uint256(data.subarray(33, 65), 16)
            } else {
                throw new EvalError('key data head error: ' + data);
            }
        } else if (data.length === 33) {
            if (data[0] === 4) {
                x = Secp256k1.uint256(data.subarray(1, 33), 16);
                y = Secp256k1.decompressKey(x, 0)
            } else {
                throw new EvalError('key data head error: ' + data);
            }
        } else {
            throw new EvalError('key data length error: ' + data);
        }
        return {x: x, y: y}
    };
    var ecc_generate_private_key = function (bits) {
        var key = window.crypto.getRandomValues(new Uint8Array(bits / 8))
        var hex = Hex.encode(key);
        this.setValue('data', hex);
        this.setValue('curve', 'secp256k1');
        this.setValue('digest', 'SHA256');
        return key
    };
    mk.crypto.ECCPublicKey = function (key) {
        BasePublicKey.call(this, key)
    };
    var ECCPublicKey = mk.crypto.ECCPublicKey;
    Class(ECCPublicKey, BasePublicKey, null);
    Implementation(ECCPublicKey, {
        getData: function () {
            var pem = this.getValue('data');
            if (!pem || pem.length === 0) {
                throw new ReferenceError('ECC public key data not found');
            } else if (pem.length === 66) {
                return Hex.decode(pem)
            } else if (pem.length === 130) {
                return Hex.decode(pem)
            } else {
                var pos1 = pem.indexOf('-----BEGIN PUBLIC KEY-----');
                if (pos1 >= 0) {
                    pos1 += '-----BEGIN PUBLIC KEY-----'.length;
                    var pos2 = pem.indexOf('-----END PUBLIC KEY-----', pos1);
                    if (pos2 > 0) {
                        var base64 = pem.substr(pos1, pos2 - pos1);
                        var data = Base64.decode(base64);
                        return data.subarray(data.length - 65)
                    }
                }
            }
            throw new EvalError('key data error: ' + pem);
        }, getKeySize: function () {
            var size = this.getInt('keySize', null);
            if (size) {
                return size
            } else {
                return this.getData().length / 8
            }
        }, verify: function (data, signature) {
            var hash = SHA256.digest(data);
            var z = Secp256k1.uint256(hash, 16);
            var sig = ecc_der_to_sig(signature, signature.length);
            if (!sig) {
                throw new EvalError('signature error: ' + signature);
            }
            var sig_r = Secp256k1.uint256(sig.r, 16);
            var sig_s = Secp256k1.uint256(sig.s, 16);
            var pub = decode_points(this.getData());
            return Secp256k1.ecverify(pub.x, pub.y, sig_r, sig_s, z)
        }
    });
    mk.crypto.ECCPrivateKey = function (key) {
        BasePrivateKey.call(this, key);
        var keyPair = this.keyPair();
        this.__privateKey = keyPair.privateKey;
        this.__publicKey = keyPair.publicKey
    };
    var ECCPrivateKey = mk.crypto.ECCPrivateKey;
    Class(ECCPrivateKey, BasePrivateKey, null);
    Implementation(ECCPrivateKey, {
        getData: function () {
            var data = this.getValue('data');
            if (data && data.length > 0) {
                return Hex.decode(data)
            } else {
                throw new ReferenceError('ECC private key data not found');
            }
        }, keyPair: function () {
            var sKey;
            var data = this.getData();
            if (!data || data.length === 0) {
                sKey = ecc_generate_private_key(256)
            } else if (data.length === 32) {
                sKey = Secp256k1.uint256(data, 16)
            } else {
                throw new EvalError('key data length error: ' + data);
            }
            var pKey = Secp256k1.generatePublicKeyFromPrivateKeyData(sKey);
            return {privateKey: sKey, publicKey: pKey}
        }, getKeySize: function () {
            var size = this.getInt('keySize', null);
            if (size) {
                return size
            } else {
                return this.getData().length / 8
            }
        }, getPublicKey: function () {
            var pub = this.__publicKey;
            var data = '04' + pub.x + pub.y;
            var info = {
                'algorithm': this.getValue('algorithm'),
                'data': data,
                'curve': 'secp256k1',
                'digest': 'SHA256'
            };
            return PublicKey.parse(info)
        }, sign: function (data) {
            var hash = SHA256.digest(data);
            var z = Secp256k1.uint256(hash, 16);
            var sig = Secp256k1.ecsign(this.__privateKey, z);
            var sig_r = Hex.decode(sig.r);
            var sig_s = Hex.decode(sig.s);
            var der = new Uint8Array(72);
            var sig_len = ecc_sig_to_der(sig_r, sig_s, der);
            if (sig_len === der.length) {
                return der
            } else {
                return der.subarray(0, sig_len)
            }
        }
    });
    mk.crypto.ECCPrivateKeyFactory = function () {
        BaseObject.call(this)
    };
    var ECCPrivateKeyFactory = mk.crypto.ECCPrivateKeyFactory;
    Class(ECCPrivateKeyFactory, BaseObject, [PrivateKeyFactory]);
    ECCPrivateKeyFactory.prototype.generatePrivateKey = function () {
        return new ECCPrivateKey({'algorithm': AsymmetricAlgorithms.ECC})
    };
    ECCPrivateKeyFactory.prototype.parsePrivateKey = function (key) {
        if (key['data'] === null) {
            return null
        }
        return new ECCPrivateKey(key)
    };
    mk.crypto.ECCPublicKeyFactory = function () {
        BaseObject.call(this)
    };
    var ECCPublicKeyFactory = mk.crypto.ECCPublicKeyFactory;
    Class(ECCPublicKeyFactory, BaseObject, [PublicKeyFactory]);
    ECCPublicKeyFactory.prototype.parsePublicKey = function (key) {
        if (key['data'] === null) {
            return null
        }
        return new ECCPublicKey(key)
    };
    var MIME_LINE_MAX_LEN = 76;
    var CR_LF = '\r\n';
    var rfc2045 = function (data) {
        var base64 = Base64.encode(data);
        var length = base64.length;
        if (length > MIME_LINE_MAX_LEN && base64.indexOf(CR_LF) < 0) {
            var sb = '';
            var start = 0, end;
            for (; start < length; start += MIME_LINE_MAX_LEN) {
                end = start + MIME_LINE_MAX_LEN;
                if (end < length) {
                    sb += base64.substring(start, end);
                    sb += CR_LF
                } else {
                    sb += base64.substring(start, length);
                    break
                }
            }
            base64 = sb
        }
        return base64
    };
    var encode_key = function (key, left, right) {
        var content = rfc2045(key);
        return left + CR_LF + content + CR_LF + right
    };
    var decode_key = function (pem, left, right) {
        var start = pem.indexOf(left);
        if (start < 0) {
            return null
        }
        start += left.length;
        var end = pem.indexOf(right, start);
        if (end < start) {
            return null
        }
        return Base64.decode(pem.substring(start, end))
    };
    var encode_public = function (key) {
        return encode_key(key, '-----BEGIN PUBLIC KEY-----', '-----END PUBLIC KEY-----')
    };
    var encode_rsa_private = function (key) {
        return encode_key(key, '-----BEGIN RSA PRIVATE KEY-----', '-----END RSA PRIVATE KEY-----')
    };
    var decode_public = function (pem) {
        var data = decode_key(pem, '-----BEGIN PUBLIC KEY-----', '-----END PUBLIC KEY-----');
        if (!data) {
            data = decode_key(pem, "-----BEGIN RSA PUBLIC KEY-----", "-----END RSA PUBLIC KEY-----")
        }
        if (data) {
            return data
        }
        if (pem.indexOf('PRIVATE KEY') > 0) {
            throw new TypeError('this is a private key content');
        } else {
            return Base64.decode(pem)
        }
    };
    var decode_rsa_private = function (pem) {
        var data = decode_key(pem, '-----BEGIN RSA PRIVATE KEY-----', '-----END RSA PRIVATE KEY-----');
        if (data) {
            return data
        }
        if (pem.indexOf('PUBLIC KEY') > 0) {
            throw new TypeError('this is not a RSA private key content');
        } else {
            return Base64.decode(pem)
        }
    };
    mk.format.PEM = {
        encodePublicKey: encode_public,
        encodePrivateKey: encode_rsa_private,
        decodePublicKey: decode_public,
        decodePrivateKey: decode_rsa_private
    };
    var PEM = mk.format.PEM;
    mk.crypto.PlainKey = function (key) {
        BaseSymmetricKey.call(this, key)
    };
    var PlainKey = mk.crypto.PlainKey;
    Class(PlainKey, BaseSymmetricKey, null);
    Implementation(PlainKey, {
        getData: function () {
            return null
        }, encrypt: function (data, extra) {
            return data
        }, decrypt: function (data, params) {
            return data
        }
    });
    PlainKey.getInstance = function () {
        if (!plain_key) {
            var key = {'algorithm': SymmetricAlgorithms.PLAIN};
            plain_key = new PlainKey(key)
        }
        return plain_key
    };
    var plain_key = null;
    mk.crypto.PlainKeyFactory = function () {
        BaseObject.call(this)
    };
    var PlainKeyFactory = mk.crypto.PlainKeyFactory;
    Class(PlainKeyFactory, BaseObject, [SymmetricKeyFactory]);
    PlainKeyFactory.prototype.generateSymmetricKey = function () {
        return PlainKey.getInstance()
    };
    PlainKeyFactory.prototype.parseSymmetricKey = function (key) {
        return PlainKey.getInstance()
    };
    var x509_header = new Uint8Array([48, -127, -97, 48, 13, 6, 9, 42, -122, 72, -122, -9, 13, 1, 1, 1, 5, 0, 3, -127, -115, 0]);
    var rsa_public_key = function (der) {
        var key = Base64.encode(der);
        var cipher = new JSEncrypt();
        cipher.setPublicKey(key);
        if (cipher.key.e === 0 || cipher.key.n === null) {
            var fixed = new Uint8Array(x509_header.length + der.length);
            fixed.set(x509_header);
            fixed.set(der, x509_header.length);
            key = Base64.encode(fixed);
            cipher.setPublicKey(key)
        }
        return cipher
    };
    var rsa_private_key = function (der) {
        var key = Base64.encode(der);
        var cipher = new JSEncrypt();
        cipher.setPrivateKey(key);
        return cipher
    };
    var rsa_generate_keys = function (bits) {
        var cipher = new JSEncrypt({default_key_size: bits});
        var key = cipher.getKey();
        return key.getPublicKey() + '\r\n' + key.getPrivateKey()
    }
    mk.crypto.RSAPublicKey = function (key) {
        BasePublicKey.call(this, key)
    };
    var RSAPublicKey = mk.crypto.RSAPublicKey;
    Class(RSAPublicKey, BasePublicKey, [EncryptKey]);
    Implementation(RSAPublicKey, {
        getData: function () {
            var data = this.getValue('data');
            if (data) {
                return PEM.decodePublicKey(data)
            } else {
                throw new ReferenceError('RSA public key data not found');
            }
        }, getKeySize: function () {
            return this.getInt('keySize', 1024 / 8)
        }, verify: function (data, signature) {
            data = CryptoJS.enc.Hex.parse(Hex.encode(data));
            signature = Base64.encode(signature);
            var cipher = rsa_public_key(this.getData());
            return cipher.verify(data, signature, CryptoJS.SHA256)
        }, encrypt: function (plaintext, extra) {
            plaintext = UTF8.decode(plaintext);
            var cipher = rsa_public_key(this.getData());
            var base64 = cipher.encrypt(plaintext);
            if (base64) {
                var keySize = this.getKeySize();
                var res = Base64.decode(base64);
                if (res.length === keySize) {
                    return res
                }
                var pad = new Uint8Array(keySize);
                pad.set(res, keySize - res.length);
                return pad
            }
            throw new ReferenceError('RSA encrypt error: ' + plaintext);
        }
    });
    mk.crypto.RSAPrivateKey = function (key) {
        BasePrivateKey.call(this, key);
        var pem = this.getValue('data');
        if (!pem) {
            this.generateKeys()
        }
    };
    var RSAPrivateKey = mk.crypto.RSAPrivateKey;
    Class(RSAPrivateKey, BasePrivateKey, [DecryptKey]);
    Implementation(RSAPrivateKey, {
        getData: function () {
            var data = this.getValue('data');
            if (data) {
                return PEM.decodePrivateKey(data)
            } else {
                throw new ReferenceError('RSA private key data not found');
            }
        }, generateKeys: function () {
            var bits = this.getKeySize() * 8;
            var pem = rsa_generate_keys(bits);
            this.setValue('data', pem);
            this.setValue('mode', 'ECB');
            this.setValue('padding', 'PKCS1');
            this.setValue('digest', 'SHA256');
            return pem
        }, getKeySize: function () {
            return this.getInt('keySize', 1024 / 8)
        }, getPublicKey: function () {
            var cipher = rsa_private_key(this.getData());
            var pem = cipher.getPublicKey();
            var info = {
                'algorithm': this.getValue('algorithm'),
                'data': pem,
                'mode': 'ECB',
                'padding': 'PKCS1',
                'digest': 'SHA256'
            };
            return PublicKey.parse(info)
        }, sign: function (data) {
            data = CryptoJS.enc.Hex.parse(Hex.encode(data));
            var cipher = rsa_private_key(this.getData());
            var base64 = cipher.sign(data, CryptoJS.SHA256, 'sha256');
            if (base64) {
                return Base64.decode(base64)
            } else {
                throw new ReferenceError('RSA sign error: ' + data);
            }
        }, decrypt: function (data, params) {
            data = Base64.encode(data);
            var cipher = rsa_private_key(this.getData());
            var string = cipher.decrypt(data);
            if (string) {
                return UTF8.encode(string)
            } else {
                throw new ReferenceError('RSA decrypt error: ' + data);
            }
        }
    });
    mk.crypto.RSAPrivateKeyFactory = function () {
        BaseObject.call(this)
    };
    var RSAPrivateKeyFactory = mk.crypto.RSAPrivateKeyFactory;
    Class(RSAPrivateKeyFactory, BaseObject, [PrivateKeyFactory]);
    RSAPrivateKeyFactory.prototype.generatePrivateKey = function () {
        return new RSAPrivateKey({'algorithm': AsymmetricAlgorithms.RSA})
    };
    RSAPrivateKeyFactory.prototype.parsePrivateKey = function (key) {
        if (key['data'] === null) {
            return null
        }
        return new RSAPrivateKey(key)
    };
    mk.crypto.RSAPublicKeyFactory = function () {
        BaseObject.call(this)
    };
    var RSAPublicKeyFactory = mk.crypto.RSAPublicKeyFactory;
    Class(RSAPublicKeyFactory, BaseObject, [PublicKeyFactory]);
    RSAPublicKeyFactory.prototype.parsePublicKey = function (key) {
        if (key['data'] === null) {
            return null
        }
        return new RSAPublicKey(key)
    };
    mkm.mkm.BaseAddressFactory = function () {
        BaseObject.call(this);
        this._addresses = {}
    };
    var BaseAddressFactory = mkm.mkm.BaseAddressFactory;
    Class(BaseAddressFactory, BaseObject, [AddressFactory]);
    BaseAddressFactory.prototype.generateAddress = function (meta, network) {
        var address = meta.generateAddress(network);
        if (address) {
            this._addresses[address.toString()] = address
        }
        return address
    };
    BaseAddressFactory.prototype.parseAddress = function (string) {
        var address = this._addresses[string];
        if (!address) {
            address = this.parse(string);
            if (address) {
                this._addresses[string] = address
            }
        }
        return address
    };
    BaseAddressFactory.prototype.parse = function (string) {
        if (!string) {
            return null
        }
        var len = string.length;
        if (len === 8) {
            if (string.toLowerCase() === 'anywhere') {
                return Address.ANYWHERE
            }
        } else if (len === 10) {
            if (string.toLowerCase() === 'everywhere') {
                return Address.EVERYWHERE
            }
        }
        var res;
        if (26 <= len && len <= 35) {
            res = BTCAddress.parse(string)
        } else if (len === 42) {
            res = ETHAddress.parse(string)
        } else {
            res = null
        }
        return res
    };
    mkm.mkm.BTCAddress = function (string, network) {
        ConstantString.call(this, string);
        this.__type = network
    };
    var BTCAddress = mkm.mkm.BTCAddress;
    Class(BTCAddress, ConstantString, [Address]);
    Implementation(BTCAddress, {
        getType: function () {
            return this.__type
        }
    });
    BTCAddress.generate = function (fingerprint, network) {
        var digest = RIPEMD160.digest(SHA256.digest(fingerprint));
        var head = [];
        head.push(network);
        for (var i = 0; i < digest.length; ++i) {
            head.push(digest[i])
        }
        var cc = check_code(Uint8Array.from(head));
        var data = [];
        for (var j = 0; j < head.length; ++j) {
            data.push(head[j])
        }
        for (var k = 0; k < cc.length; ++k) {
            data.push(cc[k])
        }
        return new BTCAddress(Base58.encode(Uint8Array.from(data)), network)
    };
    BTCAddress.parse = function (string) {
        var len = string.length;
        if (len < 26 || len > 35) {
            return null
        }
        var data = Base58.decode(string);
        if (!data || data.length !== 25) {
            return null
        }
        var prefix = data.subarray(0, 21);
        var suffix = data.subarray(21, 25);
        var cc = check_code(prefix);
        if (Arrays.equals(cc, suffix)) {
            return new BTCAddress(string, data[0])
        } else {
            return null
        }
    };
    var check_code = function (data) {
        var sha256d = SHA256.digest(SHA256.digest(data));
        return sha256d.subarray(0, 4)
    };
    mkm.mkm.GeneralDocumentFactory = function (type) {
        BaseObject.call(this);
        this.__type = type
    };
    var GeneralDocumentFactory = mkm.mkm.GeneralDocumentFactory;
    Class(GeneralDocumentFactory, BaseObject, [DocumentFactory]);
    GeneralDocumentFactory.prototype.getType = function (docType, identifier) {
        if (!identifier) {
            return this.__type
        } else if (docType !== null && docType !== '' && docType !== '*') {
            return docType
        } else if (identifier.isGroup()) {
            return DocumentType.BULLETIN
        } else if (identifier.isUser()) {
            return DocumentType.VISA
        } else {
            return DocumentType.PROFILE
        }
    };
    GeneralDocumentFactory.prototype.createDocument = function (identifier, data, signature) {
        var type = this.getType(this.__type, identifier);
        if (data && signature) {
            if (type === DocumentType.VISA) {
                return new BaseVisa(identifier, data, signature)
            } else if (type === DocumentType.BULLETIN) {
                return new BaseBulletin(identifier, data, signature)
            } else {
                return new BaseDocument(type, identifier, data, signature)
            }
        } else {
            if (type === DocumentType.VISA) {
                return new BaseVisa(identifier)
            } else if (type === DocumentType.BULLETIN) {
                return new BaseBulletin(identifier)
            } else {
                return new BaseDocument(type, identifier)
            }
        }
    };
    GeneralDocumentFactory.prototype.parseDocument = function (doc) {
        var identifier = ID.parse(doc['did']);
        if (!identifier) {
            return null
        } else if (doc['data'] && doc['signature']) {
        } else {
            return null
        }
        var helper = SharedAccountExtensions.getHelper();
        var type = helper.getDocumentType(doc, null);
        if (!type) {
            type = this.getType('*', identifier)
        }
        if (type === DocumentType.VISA) {
            return new BaseVisa(doc)
        } else if (type === DocumentType.BULLETIN) {
            return new BaseBulletin(doc)
        } else {
            return new BaseDocument(doc)
        }
    };
    mkm.mkm.ETHAddress = function (string) {
        ConstantString.call(this, string)
    };
    var ETHAddress = mkm.mkm.ETHAddress;
    Class(ETHAddress, ConstantString, [Address]);
    Implementation(ETHAddress, {
        getType: function () {
            return EntityType.USER
        }
    });
    ETHAddress.getValidateAddress = function (address) {
        if (!is_eth(address)) {
            return null
        }
        var lower = address.substr(2).toLowerCase();
        return '0x' + eip55(lower)
    };
    ETHAddress.isValidate = function (address) {
        return address === this.getValidateAddress(address)
    };
    ETHAddress.generate = function (fingerprint) {
        if (fingerprint.length === 65) {
            fingerprint = fingerprint.subarray(1)
        } else if (fingerprint.length !== 64) {
            throw new TypeError('ECC key data error: ' + fingerprint);
        }
        var digest = KECCAK256.digest(fingerprint);
        var tail = digest.subarray(digest.length - 20);
        var address = Hex.encode(tail);
        return new ETHAddress('0x' + eip55(address))
    };
    ETHAddress.parse = function (address) {
        if (!is_eth(address)) {
            return null
        }
        return new ETHAddress(address)
    };
    var eip55 = function (hex) {
        var sb = new Uint8Array(40);
        var hash = KECCAK256.digest(UTF8.encode(hex));
        var ch;
        var _9 = '9'.charCodeAt(0);
        for (var i = 0; i < 40; ++i) {
            ch = hex.charCodeAt(i);
            if (ch > _9) {
                ch -= (hash[i >> 1] << (i << 2 & 4) & 0x80) >> 2
            }
            sb[i] = ch
        }
        return UTF8.decode(sb)
    };
    var is_eth = function (address) {
        if (address.length !== 42) {
            return false
        } else if (address.charAt(0) !== '0' || address.charAt(1) !== 'x') {
            return false
        }
        var ch;
        for (var i = 2; i < 42; ++i) {
            ch = address.charCodeAt(i);
            if (ch >= _0 && ch <= _9) {
                continue
            }
            if (ch >= _A && ch <= _Z) {
                continue
            }
            if (ch >= _a && ch <= _z) {
                continue
            }
            return false
        }
        return true
    };
    var _0 = '0'.charCodeAt(0);
    var _9 = '9'.charCodeAt(0);
    var _A = 'A'.charCodeAt(0);
    var _Z = 'Z'.charCodeAt(0);
    var _a = 'a'.charCodeAt(0);
    var _z = 'z'.charCodeAt(0);
    mkm.mkm.IdentifierFactory = function () {
        BaseObject.call(this);
        this._identifiers = {}
    };
    var IdentifierFactory = mkm.mkm.IdentifierFactory;
    Class(IdentifierFactory, BaseObject, [IDFactory]);
    IdentifierFactory.prototype.generateIdentifier = function (meta, network, terminal) {
        var address = Address.generate(meta, network);
        return ID.create(meta.getSeed(), address, terminal)
    };
    IdentifierFactory.prototype.createIdentifier = function (name, address, terminal) {
        var string = Identifier.concat(name, address, terminal);
        var did = this._identifiers[string];
        if (!did) {
            did = this.newID(string, name, address, terminal);
            this._identifiers[string] = did
        }
        return did
    }
    IdentifierFactory.prototype.parseIdentifier = function (identifier) {
        var did = this._identifiers[identifier];
        if (!did) {
            did = this.parse(identifier);
            if (did) {
                this._identifiers[identifier] = did
            }
        }
        return did
    };
    IdentifierFactory.prototype.newID = function (string, name, address, terminal) {
        return new Identifier(string, name, address, terminal)
    };
    IdentifierFactory.prototype.parse = function (string) {
        var name, address, terminal;
        var pair = string.split('/');
        if (pair.length === 1) {
            terminal = null
        } else {
            terminal = pair[1]
        }
        pair = pair[0].split('@');
        if (pair.length === 1) {
            name = null;
            address = Address.parse(pair[0])
        } else {
            name = pair[0];
            address = Address.parse(pair[1])
        }
        if (!address) {
            return null
        }
        return this.newID(string, name, address, terminal)
    };
    mkm.mkm.DefaultMeta = function () {
        if (arguments.length === 1) {
            BaseMeta.call(this, arguments[0])
        } else if (arguments.length === 4) {
            BaseMeta.call(this, arguments[0], arguments[1], arguments[2], arguments[3])
        } else {
            throw new SyntaxError('Default meta arguments error: ' + arguments);
        }
        this.__addresses = {}
    };
    var DefaultMeta = mkm.mkm.DefaultMeta;
    Class(DefaultMeta, BaseMeta, null);
    Implementation(DefaultMeta, {
        hasSeed: function () {
            return true
        }, generateAddress: function (network) {
            var cached = this.__addresses[network];
            if (!cached) {
                var data = this.getFingerprint();
                cached = BTCAddress.generate(data, network);
                this.__addresses[network] = cached
            }
            return cached
        }
    });
    mkm.mkm.BTCMeta = function () {
        if (arguments.length === 1) {
            BaseMeta.call(this, arguments[0])
        } else if (arguments.length === 2) {
            BaseMeta.call(this, arguments[0], arguments[1])
        } else if (arguments.length === 4) {
            BaseMeta.call(this, arguments[0], arguments[1], arguments[2], arguments[3])
        } else {
            throw new SyntaxError('BTC meta arguments error: ' + arguments);
        }
        this.__addresses = {}
    };
    var BTCMeta = mkm.mkm.BTCMeta;
    Class(BTCMeta, BaseMeta, null);
    Implementation(BTCMeta, {
        hasSeed: function () {
            return false
        }, generateAddress: function (network) {
            var cached = this.__addresses[network];
            if (!cached) {
                var key = this.getPublicKey();
                var data = key.getData();
                cached = BTCAddress.generate(data, network);
                this.__addresses[network] = cached
            }
            return cached
        }
    });
    mkm.mkm.ETHMeta = function () {
        if (arguments.length === 1) {
            BaseMeta.call(this, arguments[0])
        } else if (arguments.length === 2) {
            BaseMeta.call(this, arguments[0], arguments[1])
        } else if (arguments.length === 4) {
            BaseMeta.call(this, arguments[0], arguments[1], arguments[2], arguments[3])
        } else {
            throw new SyntaxError('ETH meta arguments error: ' + arguments);
        }
        this.__address = null
    };
    var ETHMeta = mkm.mkm.ETHMeta;
    Class(ETHMeta, BaseMeta, null);
    Implementation(ETHMeta, {
        hasSeed: function () {
            return false
        }, generateAddress: function (network) {
            var cached = this.__address;
            if (!cached) {
                var key = this.getPublicKey();
                var data = key.getData();
                cached = ETHAddress.generate(data);
                this.__address = cached
            }
            return cached
        }
    });
    mkm.mkm.BaseMetaFactory = function (algorithm) {
        BaseObject.call(this);
        this.__type = algorithm
    };
    var BaseMetaFactory = mkm.mkm.BaseMetaFactory;
    Class(BaseMetaFactory, BaseObject, [MetaFactory]);
    BaseMetaFactory.prototype.getType = function () {
        return this.__type
    };
    BaseMetaFactory.prototype.generateMeta = function (sKey, seed) {
        var fingerprint = null;
        if (seed && seed.length > 0) {
            var data = UTF8.encode(seed);
            var sig = sKey.sign(data);
            fingerprint = TransportableData.create(sig)
        }
        var pKey = sKey.getPublicKey();
        return this.createMeta(pKey, seed, fingerprint)
    };
    BaseMetaFactory.prototype.createMeta = function (pKey, seed, fingerprint) {
        var out;
        var type = this.getType();
        switch (type) {
            case MetaType.MKM:
            case'mkm':
                out = new DefaultMeta(type, pKey, seed, fingerprint);
                break;
            case MetaType.BTC:
            case'btc':
                out = new BTCMeta(type, pKey);
                break;
            case MetaType.ETH:
            case'eth':
                out = new ETHMeta(type, pKey);
                break;
            default:
                throw new TypeError('unknown meta type: ' + type);
        }
        return out
    };
    BaseMetaFactory.prototype.parseMeta = function (meta) {
        var out;
        var helper = SharedAccountExtensions.getHelper();
        var type = helper.getMetaType(meta, '');
        switch (type) {
            case MetaType.MKM:
            case'mkm':
                out = new DefaultMeta(meta);
                break;
            case MetaType.BTC:
            case'btc':
                out = new BTCMeta(meta);
                break;
            case MetaType.ETH:
            case'eth':
                out = new ETHMeta(meta);
                break;
            default:
                throw new TypeError('unknown meta type: ' + type);
        }
        return out.isValid() ? out : null
    };
    dkd.dkd.GeneralCommandFactory = function () {
        BaseObject.call(this)
    };
    var GeneralCommandFactory = dkd.dkd.GeneralCommandFactory;
    Class(GeneralCommandFactory, BaseObject, [ContentFactory, CommandFactory]);
    GeneralCommandFactory.prototype.parseContent = function (content) {
        var helper = SharedCommandExtensions.getHelper();
        var cmdHelper = SharedCommandExtensions.getCommandHelper();
        var cmd = helper.getCmd(content, null);
        var factory = !cmd ? null : cmdHelper.getCommandFactory(cmd);
        if (!factory) {
            if (content['group']) {
                factory = cmdHelper.getCommandFactory('group')
            }
            if (!factory) {
                factory = this
            }
        }
        return factory.parseCommand(content)
    };
    GeneralCommandFactory.prototype.parseCommand = function (content) {
        if (!content['sn'] || !content['command']) {
            return null
        }
        return new BaseCommand(content)
    };
    dkd.dkd.HistoryCommandFactory = function () {
        GeneralCommandFactory.call(this)
    };
    var HistoryCommandFactory = dkd.dkd.HistoryCommandFactory;
    Class(HistoryCommandFactory, GeneralCommandFactory, null);
    HistoryCommandFactory.prototype.parseCommand = function (content) {
        if (!content['sn'] || !content['command'] || !content['time']) {
            return null
        }
        return new BaseHistoryCommand(content)
    };
    dkd.dkd.GroupCommandFactory = function () {
        HistoryCommandFactory.call(this)
    };
    var GroupCommandFactory = dkd.dkd.GroupCommandFactory;
    Class(GroupCommandFactory, HistoryCommandFactory, null);
    GroupCommandFactory.prototype.parseContent = function (content) {
        var helper = SharedCommandExtensions.getHelper();
        var cmdHelper = SharedCommandExtensions.getCommandHelper();
        var cmd = helper.getCmd(content, null);
        var factory = !cmd ? null : cmdHelper.getCommandFactory(cmd);
        if (!factory) {
            factory = this
        }
        return factory.parseCommand(content)
    };
    GroupCommandFactory.prototype.parseCommand = function (content) {
        if (!content['sn'] || !content['command'] || !content['group']) {
            return null
        }
        return new BaseGroupCommand(content)
    };
    var random_int = function (max) {
        return Math.floor(Math.random() * max)
    };
    dkd.msg.MessageFactory = function () {
        BaseObject.call(this);
        this.__sn = random_int(0x7fffffff)
    };
    var MessageFactory = dkd.msg.MessageFactory;
    Class(MessageFactory, BaseObject, [EnvelopeFactory, InstantMessageFactory, SecureMessageFactory, ReliableMessageFactory]);
    MessageFactory.prototype.next = function () {
        var sn = this.__sn;
        if (sn < 0x7fffffff) {
            sn += 1
        } else {
            sn = 1
        }
        this.__sn = sn;
        return sn
    };
    MessageFactory.prototype.createEnvelope = function (from, to, when) {
        return new MessageEnvelope(from, to, when)
    };
    MessageFactory.prototype.parseEnvelope = function (env) {
        if (!env['sender']) {
            return null
        }
        return new MessageEnvelope(env)
    };
    MessageFactory.prototype.generateSerialNumber = function (msgType, now) {
        return this.next()
    };
    MessageFactory.prototype.createInstantMessage = function (head, body) {
        return new PlainMessage(head, body)
    };
    MessageFactory.prototype.parseInstantMessage = function (msg) {
        if (!msg["sender"] || !msg["content"]) {
            return null
        }
        return new PlainMessage(msg)
    };
    MessageFactory.prototype.parseSecureMessage = function (msg) {
        if (!msg["sender"] || !msg["data"]) {
            return null
        }
        if (msg['signature']) {
            return new NetworkMessage(msg)
        }
        return new EncryptedMessage(msg)
    };
    MessageFactory.prototype.parseReliableMessage = function (msg) {
        if (!msg['sender'] || !msg['data'] || !msg['signature']) {
            return null
        }
        return new NetworkMessage(msg)
    };
    mk.ext.CryptoKeyGeneralFactory = function () {
        BaseObject.call(this);
        this.__symmetricKeyFactories = {};
        this.__privateKeyFactories = {};
        this.__publicKeyFactories = {}
    };
    var CryptoKeyGeneralFactory = mk.ext.CryptoKeyGeneralFactory;
    Class(CryptoKeyGeneralFactory, BaseObject, [GeneralCryptoHelper, SymmetricKeyHelper, PrivateKeyHelper, PublicKeyHelper]);
    CryptoKeyGeneralFactory.prototype.getKeyAlgorithm = function (key, defaultValue) {
        var algorithm = key['algorithm'];
        return Converter.getString(algorithm, defaultValue)
    };
    CryptoKeyGeneralFactory.prototype.setSymmetricKeyFactory = function (algorithm, factory) {
        this.__symmetricKeyFactories[algorithm] = factory
    };
    CryptoKeyGeneralFactory.prototype.getSymmetricKeyFactory = function (algorithm) {
        return this.__symmetricKeyFactories[algorithm]
    };
    CryptoKeyGeneralFactory.prototype.generateSymmetricKey = function (algorithm) {
        var factory = this.getSymmetricKeyFactory(algorithm);
        if (!factory) {
            throw new ReferenceError('key algorithm not supported: ' + algorithm);
        }
        return factory.generateSymmetricKey(algorithm)
    };
    CryptoKeyGeneralFactory.prototype.parseSymmetricKey = function (key) {
        if (!key) {
            return null
        } else if (Interface.conforms(key, SymmetricKey)) {
            return key
        }
        var info = Wrapper.fetchMap(key);
        if (!info) {
            return null
        }
        var algorithm = this.getKeyAlgorithm(info, null);
        var factory = !algorithm ? null : this.getSymmetricKeyFactory(algorithm);
        if (!factory) {
            factory = this.getSymmetricKeyFactory('*');
            if (!factory) {
                throw new ReferenceError('default symmetric key factory not found');
            }
        }
        return factory.parseSymmetricKey(info)
    };
    CryptoKeyGeneralFactory.prototype.setPrivateKeyFactory = function (algorithm, factory) {
        this.__privateKeyFactories[algorithm] = factory
    };
    CryptoKeyGeneralFactory.prototype.getPrivateKeyFactory = function (algorithm) {
        return this.__privateKeyFactories[algorithm]
    };
    CryptoKeyGeneralFactory.prototype.generatePrivateKey = function (algorithm) {
        var factory = this.getPrivateKeyFactory(algorithm);
        if (!factory) {
            throw new ReferenceError('key algorithm not supported: ' + algorithm);
        }
        return factory.generatePrivateKey(algorithm)
    };
    CryptoKeyGeneralFactory.prototype.parsePrivateKey = function (key) {
        if (!key) {
            return null
        } else if (Interface.conforms(key, PrivateKey)) {
            return key
        }
        var info = Wrapper.fetchMap(key);
        if (!info) {
            return null
        }
        var algorithm = this.getKeyAlgorithm(info, null);
        var factory = !algorithm ? null : this.getPrivateKeyFactory(algorithm);
        if (!factory) {
            factory = this.getPrivateKeyFactory('*');
            if (!factory) {
                throw new ReferenceError('default private key factory not found');
            }
        }
        return factory.parsePrivateKey(info)
    };
    CryptoKeyGeneralFactory.prototype.setPublicKeyFactory = function (algorithm, factory) {
        this.__publicKeyFactories[algorithm] = factory
    };
    CryptoKeyGeneralFactory.prototype.getPublicKeyFactory = function (algorithm) {
        return this.__publicKeyFactories[algorithm]
    };
    CryptoKeyGeneralFactory.prototype.parsePublicKey = function (key) {
        if (!key) {
            return null
        } else if (Interface.conforms(key, PublicKey)) {
            return key
        }
        var info = Wrapper.fetchMap(key);
        if (!info) {
            return null
        }
        var algorithm = this.getKeyAlgorithm(info, null);
        var factory = !algorithm ? null : this.getPublicKeyFactory(algorithm);
        if (!factory) {
            factory = this.getPublicKeyFactory('*');
            if (!factory) {
                throw new ReferenceError('default public key factory not found');
            }
        }
        return factory.parsePublicKey(info)
    };
    mk.ext.FormatGeneralFactory = function () {
        BaseObject.call(this);
        this.__tedFactories = {};
        this.__pnfFactory = null
    };
    var FormatGeneralFactory = mk.ext.FormatGeneralFactory;
    Class(FormatGeneralFactory, BaseObject, [GeneralFormatHelper, PortableNetworkFileHelper, TransportableDataHelper]);
    FormatGeneralFactory.prototype.split = function (text) {
        var pos1 = text.indexOf('://');
        if (pos1 > 0) {
            return [text]
        } else {
            pos1 = text.indexOf(':') + 1
        }
        var array = [];
        var pos2 = text.indexOf(';', pos1);
        if (pos2 > pos1) {
            array.push(text.substring(pos1, pos2));
            pos1 = pos2 + 1
        }
        pos2 = text.indexOf(',', pos1);
        if (pos2 > pos1) {
            array.unshift(text.substring(pos1, pos2));
            pos1 = pos2 + 1
        }
        if (pos1 === 0) {
            array.unshift(text)
        } else {
            array.unshift(text.substring(pos1))
        }
        return array
    };
    FormatGeneralFactory.prototype.decode = function (data, defaultKey) {
        var text;
        if (Interface.conforms(data, Mapper)) {
            return data.toMap()
        } else if (Interface.conforms(data, Stringer)) {
            text = data.toString()
        } else if (IObject.isString(data)) {
            text = data
        } else {
            return data
        }
        if (text.length === 0) {
            return null
        } else if (text.charAt(0) === '{' && text.charAt(text.length - 1) === '}') {
            return JSONMap.decode(text)
        }
        var info = {};
        var array = this.split(text);
        var size = array.length;
        if (size === 1) {
            info[defaultKey] = array[0]
        } else {
            info['data'] = array[0];
            info['algorithm'] = array[1];
            if (size > 2) {
                info['content-type'] = array[2];
                if (text.length > 5 && text.substring(0, 5) === 'data:') {
                    info['URL'] = text
                }
            }
        }
        return info
    };
    FormatGeneralFactory.prototype.getFormatAlgorithm = function (ted, defaultValue) {
        var algorithm = ted['algorithm'];
        return Converter.getString(algorithm, defaultValue)
    };
    FormatGeneralFactory.prototype.setTransportableDataFactory = function (algorithm, factory) {
        this.__tedFactories[algorithm] = factory
    };
    FormatGeneralFactory.prototype.getTransportableDataFactory = function (algorithm) {
        return this.__tedFactories[algorithm]
    };
    FormatGeneralFactory.prototype.createTransportableData = function (data, algorithm) {
        if (!algorithm || algorithm === '' || algorithm === '*') {
            algorithm = EncodeAlgorithms.DEFAULT
        }
        var factory = this.getTransportableDataFactory(algorithm);
        if (!factory) {
            throw new ReferenceError('TED algorithm not support: ' + algorithm);
        }
        return factory.createTransportableData(data)
    };
    FormatGeneralFactory.prototype.parseTransportableData = function (ted) {
        if (!ted) {
            return null
        } else if (Interface.conforms(ted, TransportableData)) {
            return ted
        }
        var info = this.decode(ted, 'data');
        if (!info) {
            return null
        }
        var algo = this.getFormatAlgorithm(info);
        var factory = !algo ? null : this.getTransportableDataFactory(algo);
        if (!factory) {
            factory = this.getTransportableDataFactory('*');
            if (!factory) {
                throw new ReferenceError('default TED factory not found');
            }
        }
        return factory.parseTransportableData(info)
    };
    FormatGeneralFactory.prototype.setPortableNetworkFileFactory = function (factory) {
        this.__pnfFactory = factory
    };
    FormatGeneralFactory.prototype.getPortableNetworkFileFactory = function () {
        return this.__pnfFactory
    };
    FormatGeneralFactory.prototype.createPortableNetworkFile = function (data, filename, url, password) {
        var factory = this.getPortableNetworkFileFactory();
        if (!factory) {
            throw new ReferenceError('PNF factory not ready');
        }
        return factory.createPortableNetworkFile(data, filename, url, password)
    };
    FormatGeneralFactory.prototype.parsePortableNetworkFile = function (pnf) {
        if (!pnf) {
            return null
        } else if (Interface.conforms(pnf, PortableNetworkFile)) {
            return pnf
        }
        var info = this.decode(pnf, 'URL');
        if (!info) {
            return null
        }
        var factory = this.getPortableNetworkFileFactory();
        if (!factory) {
            throw new ReferenceError('PNF factory not ready');
        }
        return factory.parsePortableNetworkFile(info)
    };
    mkm.ext.AccountGeneralFactory = function () {
        BaseObject.call(this);
        this.__addressFactory = null;
        this.__idFactory = null;
        this.__metaFactories = {};
        this.__docsFactories = {}
    };
    var AccountGeneralFactory = mkm.ext.AccountGeneralFactory;
    Class(AccountGeneralFactory, BaseObject, [GeneralAccountHelper, AddressHelper, IdentifierHelper, MetaHelper, DocumentHelper]);
    AccountGeneralFactory.prototype.getMetaType = function (meta, defaultValue) {
        var type = meta['type'];
        return Converter.getString(type, defaultValue)
    };
    AccountGeneralFactory.prototype.getDocumentType = function (doc, defaultValue) {
        var type = doc['type'];
        if (type) {
            return Converter.getString(type, defaultValue)
        } else if (defaultValue) {
            return defaultValue
        }
        var did = ID.parse(doc['did']);
        if (!did) {
            return null
        } else if (did.isUser()) {
            return DocumentType.VISA
        } else if (did.isUser()) {
            return DocumentType.BULLETIN
        } else {
            return DocumentType.PROFILE
        }
    };
    AccountGeneralFactory.prototype.setAddressFactory = function (factory) {
        this.__addressFactory = factory
    };
    AccountGeneralFactory.prototype.getAddressFactory = function () {
        return this.__addressFactory
    };
    AccountGeneralFactory.prototype.parseAddress = function (address) {
        if (!address) {
            return null
        } else if (Interface.conforms(address, Address)) {
            return address
        }
        var str = Wrapper.fetchString(address);
        if (!str) {
            return null
        }
        var factory = this.getAddressFactory();
        if (!factory) {
            throw new ReferenceError('address factory not ready');
        }
        return factory.parseAddress(address)
    };
    AccountGeneralFactory.prototype.generateAddress = function (meta, network) {
        var factory = this.getAddressFactory();
        if (!factory) {
            throw new ReferenceError('address factory not ready');
        }
        return factory.generateAddress(meta, network)
    };
    AccountGeneralFactory.prototype.setIdentifierFactory = function (factory) {
        this.__idFactory = factory
    };
    AccountGeneralFactory.prototype.getIdentifierFactory = function () {
        return this.__idFactory
    };
    AccountGeneralFactory.prototype.parseIdentifier = function (identifier) {
        if (!identifier) {
            return null
        } else if (Interface.conforms(identifier, ID)) {
            return identifier
        }
        var str = Wrapper.fetchString(identifier);
        if (!str) {
            return null
        }
        var factory = this.getIdentifierFactory();
        if (!factory) {
            throw new ReferenceError('ID factory not ready');
        }
        return factory.parseIdentifier(identifier)
    };
    AccountGeneralFactory.prototype.createIdentifier = function (name, address, terminal) {
        var factory = this.getIdentifierFactory();
        if (!factory) {
            throw new ReferenceError('ID factory not ready');
        }
        return factory.createIdentifier(name, address, terminal)
    };
    AccountGeneralFactory.prototype.generateIdentifier = function (meta, network, terminal) {
        var factory = this.getIdentifierFactory();
        if (!factory) {
            throw new ReferenceError('ID factory not ready');
        }
        return factory.generateIdentifier(meta, network, terminal)
    };
    AccountGeneralFactory.prototype.setMetaFactory = function (type, factory) {
        this.__metaFactories[type] = factory
    };
    AccountGeneralFactory.prototype.getMetaFactory = function (type) {
        return this.__metaFactories[type]
    };
    AccountGeneralFactory.prototype.createMeta = function (type, pKey, seed, fingerprint) {
        var factory = this.getMetaFactory(type);
        if (!factory) {
            throw new ReferenceError('meta type not supported: ' + type);
        }
        return factory.createMeta(pKey, seed, fingerprint)
    };
    AccountGeneralFactory.prototype.generateMeta = function (type, sKey, seed) {
        var factory = this.getMetaFactory(type);
        if (!factory) {
            throw new ReferenceError('meta type not supported: ' + type);
        }
        return factory.generateMeta(sKey, seed)
    };
    AccountGeneralFactory.prototype.parseMeta = function (meta) {
        if (!meta) {
            return null
        } else if (Interface.conforms(meta, Meta)) {
            return meta
        }
        var info = Wrapper.fetchMap(meta);
        if (!info) {
            return null
        }
        var type = this.getMetaType(info, null);
        var factory = !type ? null : this.getMetaFactory(type);
        if (!factory) {
            factory = this.getMetaFactory('*');
            if (!factory) {
                throw new ReferenceError('default meta factory not found');
            }
        }
        return factory.parseMeta(info)
    };
    AccountGeneralFactory.prototype.setDocumentFactory = function (type, factory) {
        this.__docsFactories[type] = factory
    };
    AccountGeneralFactory.prototype.getDocumentFactory = function (type) {
        return this.__docsFactories[type]
    };
    AccountGeneralFactory.prototype.createDocument = function (type, identifier, data, signature) {
        var factory = this.getDocumentFactory(type);
        if (!factory) {
            throw new ReferenceError('document type not supported: ' + type);
        }
        return factory.createDocument(identifier, data, signature)
    };
    AccountGeneralFactory.prototype.parseDocument = function (doc) {
        if (!doc) {
            return null
        } else if (Interface.conforms(doc, Document)) {
            return doc
        }
        var info = Wrapper.fetchMap(doc);
        if (!info) {
            return null
        }
        var type = this.getDocumentType(info, null);
        var factory = !type ? null : this.getDocumentFactory(type);
        if (!factory) {
            factory = this.getDocumentFactory('*');
            if (!factory) {
                throw new ReferenceError('default document factory not found');
            }
        }
        return factory.parseDocument(info)
    };
    dkd.ext.MessageGeneralFactory = function () {
        BaseObject.call(this);
        this.__contentFactories = {};
        this.__envelopeFactory = null;
        this.__instantMessageFactory = null;
        this.__secureMessageFactory = null;
        this.__reliableMessageFactory = null
    };
    var MessageGeneralFactory = dkd.ext.MessageGeneralFactory
    Class(MessageGeneralFactory, BaseObject, [GeneralMessageHelper, ContentHelper, EnvelopeHelper, InstantMessageHelper, SecureMessageHelper, ReliableMessageHelper]);
    MessageGeneralFactory.prototype.getContentType = function (content, defaultValue) {
        var type = content['type'];
        return Converter.getString(type, defaultValue)
    };
    MessageGeneralFactory.prototype.setContentFactory = function (type, factory) {
        this.__contentFactories[type] = factory
    };
    MessageGeneralFactory.prototype.getContentFactory = function (type) {
        return this.__contentFactories[type]
    };
    MessageGeneralFactory.prototype.parseContent = function (content) {
        if (!content) {
            return null
        } else if (Interface.conforms(content, Content)) {
            return content
        }
        var info = Wrapper.fetchMap(content);
        if (!info) {
            return null
        }
        var type = this.getContentType(info, null);
        var factory = !type ? null : this.getContentFactory(type);
        if (!factory) {
            factory = this.getContentFactory('*');
            if (!factory) {
                throw new ReferenceError('default content factory not found');
            }
        }
        return factory.parseContent(info)
    };
    MessageGeneralFactory.prototype.setEnvelopeFactory = function (factory) {
        this.__envelopeFactory = factory
    };
    MessageGeneralFactory.prototype.getEnvelopeFactory = function () {
        return this.__envelopeFactory
    };
    MessageGeneralFactory.prototype.createEnvelope = function (sender, receiver, time) {
        var factory = this.getEnvelopeFactory();
        if (!factory) {
            throw new ReferenceError('envelope factory not ready');
        }
        return factory.createEnvelope(sender, receiver, time)
    };
    MessageGeneralFactory.prototype.parseEnvelope = function (env) {
        if (!env) {
            return null
        } else if (Interface.conforms(env, Envelope)) {
            return env
        }
        var info = Wrapper.fetchMap(env);
        if (!info) {
            return null
        }
        var factory = this.getEnvelopeFactory();
        if (!factory) {
            throw new ReferenceError('envelope factory not ready');
        }
        return factory.parseEnvelope(info)
    };
    MessageGeneralFactory.prototype.setInstantMessageFactory = function (factory) {
        this.__instantMessageFactory = factory
    };
    MessageGeneralFactory.prototype.getInstantMessageFactory = function () {
        return this.__instantMessageFactory
    };
    MessageGeneralFactory.prototype.createInstantMessage = function (head, body) {
        var factory = this.getInstantMessageFactory();
        if (!factory) {
            throw new ReferenceError('instant message factory not ready');
        }
        return factory.createInstantMessage(head, body)
    };
    MessageGeneralFactory.prototype.parseInstantMessage = function (msg) {
        if (!msg) {
            return null
        } else if (Interface.conforms(msg, InstantMessage)) {
            return msg
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null
        }
        var factory = this.getInstantMessageFactory();
        if (!factory) {
            throw new ReferenceError('instant message factory not ready');
        }
        return factory.parseInstantMessage(info)
    };
    MessageGeneralFactory.prototype.generateSerialNumber = function (type, when) {
        var factory = this.getInstantMessageFactory();
        if (!factory) {
            throw new ReferenceError('instant message factory not ready');
        }
        return factory.generateSerialNumber(type, when)
    };
    MessageGeneralFactory.prototype.setSecureMessageFactory = function (factory) {
        this.__secureMessageFactory = factory
    };
    MessageGeneralFactory.prototype.getSecureMessageFactory = function () {
        return this.__secureMessageFactory
    };
    MessageGeneralFactory.prototype.parseSecureMessage = function (msg) {
        if (!msg) {
            return null
        } else if (Interface.conforms(msg, SecureMessage)) {
            return msg
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null
        }
        var factory = this.getSecureMessageFactory();
        if (!factory) {
            throw new ReferenceError('secure message factory not ready');
        }
        return factory.parseSecureMessage(info)
    };
    MessageGeneralFactory.prototype.setReliableMessageFactory = function (factory) {
        this.__reliableMessageFactory = factory
    };
    MessageGeneralFactory.prototype.getReliableMessageFactory = function () {
        return this.__reliableMessageFactory
    };
    MessageGeneralFactory.prototype.parseReliableMessage = function (msg) {
        if (!msg) {
            return null
        } else if (Interface.conforms(msg, ReliableMessage)) {
            return msg
        }
        var info = Wrapper.fetchMap(msg);
        if (!info) {
            return null
        }
        var factory = this.getReliableMessageFactory();
        if (!factory) {
            throw new ReferenceError('reliable message factory not ready');
        }
        return factory.parseReliableMessage(info)
    };
    dkd.ext.CommandGeneralFactory = function () {
        BaseObject.call(this);
        this.__commandFactories = {}
    };
    var CommandGeneralFactory = dkd.ext.CommandGeneralFactory
    Class(CommandGeneralFactory, BaseObject, [GeneralCommandHelper, CommandHelper]);
    CommandGeneralFactory.prototype.getCmd = function (content, defaultValue) {
        var cmd = content['command'];
        return Converter.getString(cmd, defaultValue)
    };
    CommandGeneralFactory.prototype.setCommandFactory = function (cmd, factory) {
        this.__commandFactories[cmd] = factory
    };
    CommandGeneralFactory.prototype.getCommandFactory = function (cmd) {
        return this.__commandFactories[cmd]
    };
    CommandGeneralFactory.prototype.parseCommand = function (content) {
        if (!content) {
            return null
        } else if (Interface.conforms(content, Command)) {
            return content
        }
        var info = Wrapper.fetchMap(content);
        if (!info) {
            return null
        }
        var cmd = this.getCmd(info, null);
        var factory = !cmd ? null : this.getCommandFactory(cmd);
        if (!factory) {
            factory = default_command_factory(info);
            if (!factory) {
                throw new ReferenceError('default document factory not found');
            }
        }
        return factory.parseCommand(info)
    };
    var default_command_factory = function (info) {
        var helper = SharedMessageExtensions.getHelper();
        var contentHelper = SharedMessageExtensions.getContentHelper();
        var type = helper.getContentType(info);
        if (!type) {
            return null
        }
        var factory = contentHelper.getContentFactory(type);
        if (!factory) {
            return null
        } else if (Interface.conforms(factory, CommandFactory)) {
            return factory
        } else {
            return null
        }
    };
    dimp.ext.ExtensionLoader = function () {
        BaseObject.call(this)
    };
    var ExtensionLoader = dimp.ext.ExtensionLoader;
    Class(ExtensionLoader, BaseObject, null);
    Implementation(ExtensionLoader, {
        load: function () {
            this.registerCoreHelpers();
            this.registerMessageFactories();
            this.registerContentFactories();
            this.registerCommandFactories()
        }, registerCoreHelpers: function () {
            this.registerCryptoHelpers();
            this.registerFormatHelpers();
            this.registerAccountHelpers();
            this.registerMessageHelpers();
            this.registerCommandHelpers()
        }, registerCryptoHelpers: function () {
            var helper = new CryptoKeyGeneralFactory();
            var ext = SharedCryptoExtensions;
            ext.setSymmetricHelper(helper);
            ext.setPrivateHelper(helper);
            ext.setPublicHelper(helper);
            ext.setHelper(helper)
        }, registerFormatHelpers: function () {
            var helper = new FormatGeneralFactory();
            var ext = SharedFormatExtensions;
            ext.setPNFHelper(helper);
            ext.setTEDHelper(helper);
            ext.setHelper(helper)
        }, registerAccountHelpers: function () {
            var helper = new AccountGeneralFactory();
            var ext = SharedAccountExtensions;
            ext.setAddressHelper(helper);
            ext.setIdentifierHelper(helper);
            ext.setMetaHelper(helper);
            ext.setDocumentHelper(helper);
            ext.setHelper(helper)
        }, registerMessageHelpers: function () {
            var helper = new MessageGeneralFactory();
            var ext = SharedMessageExtensions;
            ext.setContentHelper(helper);
            ext.setEnvelopeHelper(helper);
            ext.setInstantHelper(helper);
            ext.setSecureHelper(helper);
            ext.setReliableHelper(helper);
            ext.setHelper(helper)
        }, registerCommandHelpers: function () {
            var helper = new CommandGeneralFactory();
            var ext = SharedCommandExtensions;
            ext.setCommandHelper(helper);
            ext.setHelper(helper)
        }, registerMessageFactories: function () {
            var factory = new MessageFactory();
            Envelope.setFactory(factory);
            InstantMessage.setFactory(factory);
            SecureMessage.setFactory(factory);
            ReliableMessage.setFactory(factory)
        }, registerContentFactories: function () {
            this.setContentFactory(ContentType.TEXT, 'text', null, BaseTextContent);
            this.setContentFactory(ContentType.FILE, 'file', null, BaseFileContent);
            this.setContentFactory(ContentType.IMAGE, 'image', null, ImageFileContent);
            this.setContentFactory(ContentType.AUDIO, 'audio', null, AudioFileContent);
            this.setContentFactory(ContentType.VIDEO, 'video', null, VideoFileContent);
            this.setContentFactory(ContentType.PAGE, 'page', null, WebPageContent);
            this.setContentFactory(ContentType.NAME_CARD, 'card', null, NameCardContent);
            this.setContentFactory(ContentType.QUOTE, 'quote', null, BaseQuoteContent);
            this.setContentFactory(ContentType.MONEY, 'money', null, BaseMoneyContent);
            this.setContentFactory(ContentType.TRANSFER, 'transfer', null, TransferMoneyContent);
            this.setContentFactory(ContentType.COMMAND, 'command', new GeneralCommandFactory(), null);
            this.setContentFactory(ContentType.HISTORY, 'history', new HistoryCommandFactory(), null);
            this.setContentFactory(ContentType.ARRAY, 'array', null, ListContent);
            this.setContentFactory(ContentType.COMBINE_FORWARD, 'combine', null, CombineForwardContent);
            this.setContentFactory(ContentType.FORWARD, 'forward', null, SecretContent);
            this.setContentFactory(ContentType.ANY, '*', null, BaseContent);
            this.registerCustomizedFactories()
        }, registerCustomizedFactories: function () {
            this.setContentFactory(ContentType.CUSTOMIZED, 'customized', null, AppCustomizedContent)
        }, setContentFactory: function (type, alias, factory, clazz) {
            if (factory) {
                Content.setFactory(type, factory);
                Content.setFactory(alias, factory)
            }
            if (clazz) {
                factory = new ContentParser(clazz);
                Content.setFactory(type, factory);
                Content.setFactory(alias, factory)
            }
        }, setCommandFactory: function (cmd, factory, clazz) {
            if (factory) {
                Command.setFactory(cmd, factory)
            }
            if (clazz) {
                factory = new CommandParser(clazz);
                Command.setFactory(cmd, factory)
            }
        }, registerCommandFactories: function () {
            this.setCommandFactory(Command.META, null, BaseMetaCommand);
            this.setCommandFactory(Command.DOCUMENTS, null, BaseDocumentCommand);
            this.setCommandFactory(Command.RECEIPT, null, BaseReceiptCommand);
            this.setCommandFactory('group', new GroupCommandFactory(), null);
            this.setCommandFactory(GroupCommand.INVITE, null, InviteGroupCommand);
            this.setCommandFactory(GroupCommand.EXPEL, null, ExpelGroupCommand);
            this.setCommandFactory(GroupCommand.JOIN, null, JoinGroupCommand);
            this.setCommandFactory(GroupCommand.QUIT, null, QuitGroupCommand);
            this.setCommandFactory(GroupCommand.RESET, null, ResetGroupCommand);
            this.setCommandFactory(GroupCommand.HIRE, null, HireGroupCommand);
            this.setCommandFactory(GroupCommand.FIRE, null, FireGroupCommand);
            this.setCommandFactory(GroupCommand.RESIGN, null, ResignGroupCommand)
        }
    });
    dkd.dkd.ContentParser = function (clazz) {
        BaseObject.call(this);
        this.__class = clazz
    };
    var ContentParser = dkd.dkd.ContentParser;
    Class(ContentParser, BaseObject, [ContentFactory]);
    ContentParser.prototype.parseContent = function (content) {
        return new this.__class(content)
    };
    dkd.dkd.CommandParser = function (clazz) {
        BaseObject.call(this);
        this.__class = clazz
    };
    var CommandParser = dkd.dkd.CommandParser;
    Class(CommandParser, BaseObject, [CommandFactory]);
    CommandParser.prototype.parseCommand = function (content) {
        return new this.__class(content)
    };
    dimp.ext.PluginLoader = function () {
        BaseObject.call(this)
    };
    var PluginLoader = dimp.ext.PluginLoader;
    Class(PluginLoader, BaseObject, null);
    Implementation(PluginLoader, {
        load: function () {
            this.registerCoders();
            this.registerDigesters();
            this.registerSymmetricKeyFactories();
            this.registerAsymmetricKeyFactories();
            this.registerEntityFactories()
        }, registerCoders: function () {
            this.registerBase58Coder();
            this.registerBase64Coder();
            this.registerHexCoder();
            this.registerUTF8Coder();
            this.registerJSONCoder();
            this.registerPNFFactory();
            this.registerTEDFactory()
        }, registerBase58Coder: function () {
            Base58.setCoder(new Base58Coder())
        }, registerBase64Coder: function () {
            Base64.setCoder(new Base64Coder())
        }, registerHexCoder: function () {
            Hex.setCoder(new HexCoder())
        }, registerUTF8Coder: function () {
            UTF8.setCoder(new UTF8Coder())
        }, registerJSONCoder: function () {
            var coder = new JSONCoder();
            JSONMap.setCoder(coder)
        }, registerPNFFactory: function () {
            PortableNetworkFile.setFactory(new BaseNetworkFileFactory())
        }, registerTEDFactory: function () {
            var tedFactory = new Base64DataFactory();
            TransportableData.setFactory(EncodeAlgorithms.BASE_64, tedFactory);
            TransportableData.setFactory('*', tedFactory)
        }, registerDigesters: function () {
            this.registerSHA256Digester();
            this.registerKeccak256Digester();
            this.registerRIPEMD160Digester()
        }, registerSHA256Digester: function () {
            SHA256.setDigester(new SHA256Digester())
        }, registerKeccak256Digester: function () {
            KECCAK256.setDigester(new KECCAK256Digester())
        }, registerRIPEMD160Digester: function () {
            RIPEMD160.setDigester(new RIPEMD160Digester())
        }, registerSymmetricKeyFactories: function () {
            this.registerAESKeyFactory();
            this.registerPlainKeyFactory()
        }, registerAESKeyFactory: function () {
            var aes = new AESKeyFactory();
            SymmetricKey.setFactory(SymmetricAlgorithms.AES, aes);
            SymmetricKey.setFactory(AESKey.AES_CBC_PKCS7, aes)
        }, registerPlainKeyFactory: function () {
            var fact = new PlainKeyFactory();
            SymmetricKey.setFactory(SymmetricAlgorithms.PLAIN, fact)
        }, registerAsymmetricKeyFactories: function () {
            this.registerRSAKeyFactories();
            this.registerECCKeyFactories()
        }, registerRSAKeyFactories: function () {
            var rsaPub = new RSAPublicKeyFactory();
            PublicKey.setFactory(AsymmetricAlgorithms.RSA, rsaPub);
            PublicKey.setFactory('SHA256withRSA', rsaPub);
            PublicKey.setFactory('RSA/ECB/PKCS1Padding', rsaPub);
            var rsaPri = new RSAPrivateKeyFactory();
            PrivateKey.setFactory(AsymmetricAlgorithms.RSA, rsaPri);
            PrivateKey.setFactory('SHA256withRSA', rsaPri);
            PrivateKey.setFactory('RSA/ECB/PKCS1Padding', rsaPri)
        }, registerECCKeyFactories: function () {
            var eccPub = new ECCPublicKeyFactory();
            PublicKey.setFactory(AsymmetricAlgorithms.ECC, eccPub);
            PublicKey.setFactory('SHA256withECDSA', eccPub);
            var eccPri = new ECCPrivateKeyFactory();
            PrivateKey.setFactory(AsymmetricAlgorithms.ECC, eccPri);
            PrivateKey.setFactory('SHA256withECDSA', eccPri)
        }, registerEntityFactories: function () {
            this.registerIDFactory();
            this.registerAddressFactory();
            this.registerMetaFactories();
            this.registerDocumentFactories()
        }, registerIDFactory: function () {
            ID.setFactory(new IdentifierFactory())
        }, registerAddressFactory: function () {
            Address.setFactory(new BaseAddressFactory())
        }, registerMetaFactories: function () {
            this.setMetaFactory(MetaType.MKM, 'mkm', null);
            this.setMetaFactory(MetaType.BTC, 'btc', null);
            this.setMetaFactory(MetaType.ETH, 'eth', null)
        }, setMetaFactory: function (type, alias, factory) {
            if (!factory) {
                factory = new BaseMetaFactory(type)
            }
            Meta.setFactory(type, factory);
            Meta.setFactory(alias, factory)
        }, registerDocumentFactories: function () {
            this.setDocumentFactory('*', null);
            this.setDocumentFactory(DocumentType.VISA, null);
            this.setDocumentFactory(DocumentType.PROFILE, null);
            this.setDocumentFactory(DocumentType.BULLETIN, null)
        }, setDocumentFactory: function (type, factory) {
            if (!factory) {
                factory = new GeneralDocumentFactory(type)
            }
            Document.setFactory(type, factory)
        }
    })
})(DIMP, DIMP, DIMP, DIMP);
(function (sdk, dkd, mkm, mk) {
    if (typeof sdk.msg !== 'object') {
        sdk.msg = {}
    }
    if (typeof sdk.core !== 'object') {
        sdk.core = {}
    }
    if (typeof sdk.cpu !== 'object') {
        sdk.cpu = {}
    }
    var Interface = mk.type.Interface;
    var Class = mk.type.Class;
    var Implementation = mk.type.Implementation;
    var Converter = mk.type.Converter;
    var Mapper = mk.type.Mapper;
    var IObject = mk.type.Object;
    var BaseObject = mk.type.BaseObject;
    var UTF8 = mk.format.UTF8;
    var JSONMap = mk.format.JSONMap;
    var TransportableData = mk.protocol.TransportableData;
    var EncryptKey = mk.protocol.EncryptKey;
    var VerifyKey = mk.protocol.VerifyKey;
    var SymmetricKey = mk.protocol.SymmetricKey;
    var EntityType = mkm.protocol.EntityType;
    var Address = mkm.protocol.Address;
    var ID = mkm.protocol.ID;
    var Meta = mkm.protocol.Meta;
    var Document = mkm.protocol.Document;
    var Visa = mkm.protocol.Visa;
    var Bulletin = mkm.protocol.Bulletin;
    var Identifier = mkm.mkm.Identifier;
    var SharedAccountExtensions = mkm.ext.SharedAccountExtensions;
    var InstantMessage = dkd.protocol.InstantMessage;
    var SecureMessage = dkd.protocol.SecureMessage;
    var ReliableMessage = dkd.protocol.ReliableMessage;
    var Envelope = dkd.protocol.Envelope;
    var Content = dkd.protocol.Content;
    var Command = dkd.protocol.Command;
    var ContentType = dkd.protocol.ContentType;
    var ForwardContent = dkd.protocol.ForwardContent;
    var ArrayContent = dkd.protocol.ArrayContent;
    var MetaCommand = dkd.protocol.MetaCommand;
    var DocumentCommand = dkd.protocol.DocumentCommand;
    var GroupCommand = dkd.protocol.GroupCommand;
    var ReceiptCommand = dkd.protocol.ReceiptCommand;
    var BaseMessage = dkd.msg.BaseMessage;
    mkm.mkm.MetaUtils = {
        matchIdentifier: function (identifier, meta) {
            if (!meta.isValid()) {
                return false
            }
            var seed = meta.getSeed();
            var name = identifier.getName();
            if (seed !== name) {
                return false
            }
            var old = identifier.getAddress();
            var gen = Address.generate(meta, old.getType());
            return old.equals(gen)
        }, matchPublicKey: function (pKey, meta) {
            if (!meta.isValid()) {
                return false
            }
            if (meta.getPublicKey().equals(pKey)) {
                return true
            }
            var seed = meta.getSeed();
            if (!seed) {
                return false
            }
            var fingerprint = meta.getFingerprint();
            if (!fingerprint) {
                return false
            }
            var data = UTF8.encode(seed);
            return pKey.verify(data, fingerprint)
        }
    };
    var MetaUtils = mkm.mkm.MetaUtils;
    mkm.mkm.DocumentUtils = {
        getDocumentType: function (document) {
            var helper = SharedAccountExtensions.getHelper();
            return helper.getDocumentType(document.toMap(), null)
        }, isBefore: function (oldTime, thisTime) {
            if (!oldTime || !thisTime) {
                return false
            }
            return thisTime.getTime() < oldTime.getTime()
        }, isExpired: function (thisDoc, oldDoc) {
            var thisTime = thisDoc.getTime();
            var oldTime = oldDoc.getTime();
            return this.isBefore(oldTime, thisTime)
        }, lastDocument: function (documents, type) {
            if (!documents || documents.length === 0) {
                return null
            } else if (!type || type === '*') {
                type = ''
            }
            var checkType = type.length > 0;
            var last = null;
            var doc, docType, matched;
            for (var i = 0; i < documents.length; ++i) {
                doc = documents[i];
                if (checkType) {
                    docType = this.getDocumentType(doc);
                    matched = !docType || docType.length === 0 || docType === type;
                    if (!matched) {
                        continue
                    }
                }
                if (last != null && this.isExpired(doc, last)) {
                    continue
                }
                last = doc
            }
            return last
        }, lastVisa: function (documents) {
            if (!documents || documents.length === 0) {
                return null
            }
            var last = null;
            var doc, matched;
            for (var i = 0; i < documents.length; ++i) {
                doc = documents[i];
                matched = Interface.conforms(doc, Visa);
                if (!matched) {
                    continue
                }
                if (last != null && this.isExpired(doc, last)) {
                    continue
                }
                last = doc
            }
            return last
        }, lastBulletin: function (documents) {
            if (!documents || documents.length === 0) {
                return null
            }
            var last = null;
            var doc, matched;
            for (var i = 0; i < documents.length; ++i) {
                doc = documents[i];
                matched = Interface.conforms(doc, Bulletin);
                if (!matched) {
                    continue
                }
                if (last != null && this.isExpired(doc, last)) {
                    continue
                }
                last = doc
            }
            return last
        }
    };
    var DocumentUtils = mkm.mkm.DocumentUtils;
    mkm.mkm.Entity = Interface(null, [IObject]);
    var Entity = mkm.mkm.Entity;
    Entity.prototype.getIdentifier = function () {
    };
    Entity.prototype.getType = function () {
    };
    Entity.prototype.getMeta = function () {
    };
    Entity.prototype.getDocuments = function () {
    };
    Entity.prototype.setDataSource = function (barrack) {
    };
    Entity.prototype.getDataSource = function () {
    };
    Entity.DataSource = Interface(null, null);
    var EntityDataSource = Entity.DataSource;
    EntityDataSource.prototype.getMeta = function (identifier) {
    };
    EntityDataSource.prototype.getDocuments = function (identifier) {
    };
    Entity.Delegate = Interface(null, null);
    var EntityDelegate = Entity.Delegate;
    EntityDelegate.prototype.getUser = function (identifier) {
    };
    EntityDelegate.prototype.getGroup = function (identifier) {
    };
    mkm.mkm.BaseEntity = function (identifier) {
        BaseObject.call(this);
        this.__identifier = identifier;
        this.__facebook = null
    };
    var BaseEntity = mkm.mkm.BaseEntity;
    Class(BaseEntity, BaseObject, [Entity]);
    BaseEntity.prototype.equals = function (other) {
        if (this === other) {
            return true
        } else if (!other) {
            return false
        } else if (Interface.conforms(other, Entity)) {
            other = other.getIdentifier()
        }
        return this.__identifier.equals(other)
    };
    BaseEntity.prototype.valueOf = function () {
        return this.toString()
    };
    BaseEntity.prototype.toString = function () {
        var clazz = this.getClassName();
        var id = this.__identifier;
        var network = id.getAddress().getType();
        return '<' + clazz + ' id="' + id.toString() + '" network="' + network + '" />'
    };
    BaseEntity.prototype.getClassName = function () {
        return Object.getPrototypeOf(this).constructor.name
    };
    BaseEntity.prototype.setDataSource = function (facebook) {
        this.__facebook = facebook
    };
    BaseEntity.prototype.getDataSource = function () {
        return this.__facebook
    };
    BaseEntity.prototype.getIdentifier = function () {
        return this.__identifier
    };
    BaseEntity.prototype.getType = function () {
        return this.__identifier.getType()
    };
    BaseEntity.prototype.getMeta = function () {
        var facebook = this.getDataSource();
        return facebook.getMeta(this.__identifier)
    };
    BaseEntity.prototype.getDocuments = function () {
        var facebook = this.getDataSource();
        return facebook.getDocuments(this.__identifier)
    };
    mkm.mkm.Group = Interface(null, [Entity]);
    var Group = mkm.mkm.Group;
    Group.prototype.getBulletin = function () {
    };
    Group.prototype.getFounder = function () {
    };
    Group.prototype.getOwner = function () {
    };
    Group.prototype.getMembers = function () {
    };
    Group.prototype.getAssistants = function () {
    };
    Group.DataSource = Interface(null, [EntityDataSource]);
    var GroupDataSource = Group.DataSource;
    GroupDataSource.prototype.getFounder = function (identifier) {
    };
    GroupDataSource.prototype.getOwner = function (identifier) {
    };
    GroupDataSource.prototype.getMembers = function (identifier) {
    };
    GroupDataSource.prototype.getAssistants = function (identifier) {
    };
    mkm.mkm.BaseGroup = function (identifier) {
        BaseEntity.call(this, identifier);
        this.__founder = null
    };
    var BaseGroup = mkm.mkm.BaseGroup;
    Class(BaseGroup, BaseEntity, [Group]);
    Implementation(BaseGroup, {
        getBulletin: function () {
            var docs = this.getDocuments();
            return DocumentUtils.lastBulletin(docs)
        }, getFounder: function () {
            var founder = this.__founder;
            if (!founder) {
                var facebook = this.getDataSource();
                var group = this.getIdentifier();
                founder = facebook.getFounder(group);
                this.__founder = founder
            }
            return founder
        }, getOwner: function () {
            var facebook = this.getDataSource();
            var group = this.getIdentifier();
            return facebook.getOwner(group)
        }, getMembers: function () {
            var facebook = this.getDataSource();
            var group = this.getIdentifier();
            return facebook.getMembers(group)
        }, getAssistants: function () {
            var facebook = this.getDataSource();
            var group = this.getIdentifier();
            return facebook.getAssistants(group)
        }
    });
    mkm.mkm.User = Interface(null, [Entity]);
    var User = mkm.mkm.User;
    User.prototype.getVisa = function () {
    };
    User.prototype.getContacts = function () {
    };
    User.prototype.verify = function (data, signature) {
    };
    User.prototype.encrypt = function (plaintext) {
    };
    User.prototype.sign = function (data) {
    };
    User.prototype.decrypt = function (ciphertext) {
    };
    User.prototype.signVisa = function (doc) {
    };
    User.prototype.verifyVisa = function (doc) {
    };
    User.DataSource = Interface(null, [EntityDataSource]);
    var UserDataSource = User.DataSource;
    UserDataSource.prototype.getContacts = function (identifier) {
    };
    UserDataSource.prototype.getPublicKeyForEncryption = function (identifier) {
    };
    UserDataSource.prototype.getPublicKeysForVerification = function (identifier) {
    };
    UserDataSource.prototype.getPrivateKeysForDecryption = function (identifier) {
    };
    UserDataSource.prototype.getPrivateKeyForSignature = function (identifier) {
    };
    UserDataSource.prototype.getPrivateKeyForVisaSignature = function (identifier) {
    };
    mkm.mkm.BaseUser = function (identifier) {
        BaseEntity.call(this, identifier)
    };
    var BaseUser = mkm.mkm.BaseUser;
    Class(BaseUser, BaseEntity, [User]);
    Implementation(BaseUser, {
        getVisa: function () {
            var docs = this.getDocuments();
            return DocumentUtils.lastVisa(docs)
        }, getContacts: function () {
            var facebook = this.getDataSource();
            var user = this.getIdentifier();
            return facebook.getContacts(user)
        }, verify: function (data, signature) {
            var facebook = this.getDataSource();
            var user = this.getIdentifier();
            var keys = facebook.getPublicKeysForVerification(user);
            for (var i = 0; i < keys.length; ++i) {
                if (keys[i].verify(data, signature)) {
                    return true
                }
            }
            return false
        }, encrypt: function (plaintext) {
            var facebook = this.getDataSource();
            var user = this.getIdentifier();
            var pKey = facebook.getPublicKeyForEncryption(user);
            return pKey.encrypt(plaintext, null)
        }, sign: function (data) {
            var facebook = this.getDataSource();
            var user = this.getIdentifier();
            var sKey = facebook.getPrivateKeyForSignature(user);
            return sKey.sign(data)
        }, decrypt: function (ciphertext) {
            var facebook = this.getDataSource();
            var user = this.getIdentifier();
            var keys = facebook.getPrivateKeysForDecryption(user);
            var plaintext;
            for (var i = 0; i < keys.length; ++i) {
                plaintext = keys[i].decrypt(ciphertext, null);
                if (plaintext && plaintext.length > 0) {
                    return plaintext
                }
            }
            return null
        }, signVisa: function (doc) {
            var did = doc.getIdentifier();
            var facebook = this.getDataSource();
            var sKey = facebook.getPrivateKeyForVisaSignature(did);
            var sig = doc.sign(sKey);
            if (!sig) {
                return null
            }
            return doc
        }, verifyVisa: function (doc) {
            var did = doc.getIdentifier();
            if (!this.getIdentifier().equals(did)) {
                return false
            }
            var meta = this.getMeta();
            var pKey = meta.getPublicKey();
            return doc.verify(pKey)
        }
    });
    mkm.mkm.Bot = function (identifier) {
        BaseUser.call(this, identifier)
    };
    var Bot = mkm.mkm.Bot;
    Class(Bot, BaseUser, null);
    Implementation(Bot, {
        getProfile: function () {
            return this.getVisa()
        }, getProvider: function () {
            var doc = this.getProfile();
            if (doc) {
                var icp = doc.getProperty('provider');
                return ID.parse(icp)
            }
            return null
        }
    });
    mkm.mkm.Station = function () {
        BaseObject.call(this);
        var user;
        var host, port;
        if (arguments.length === 1) {
            user = new BaseUser(arguments[0]);
            host = null;
            port = 0
        } else if (arguments.length === 2) {
            user = new BaseUser(Station.ANY);
            host = arguments[0];
            port = arguments[1]
        } else if (arguments.length === 3) {
            user = new BaseUser(arguments[0]);
            host = arguments[1];
            port = arguments[2]
        }
        this.__user = user;
        this.__host = host;
        this.__port = port;
        this.__isp = null
    };
    var Station = mkm.mkm.Station;
    Class(Station, BaseObject, [User]);
    Implementation(Station, {
        equals: function (other) {
            if (this === other) {
                return true
            } else if (!other) {
                return false
            } else if (other instanceof Station) {
                return ServiceProvider.sameStation(other, this)
            }
            return this.__user.equals(other)
        }, valueOf: function () {
            return this.getString()
        }, toString: function () {
            var clazz = this.getClassName();
            var id = this.getIdentifier();
            var network = id.getAddress().getType();
            return '<' + clazz + ' id="' + id.toString() + '" network="' + network + '" host="' + this.getHost() + '" port=' + this.getPort() + ' />'
        }, getClassName: function () {
            return Object.getPrototypeOf(this).constructor.name
        }, setDataSource: function (delegate) {
            this.__user.setDataSource(delegate)
        }, getDataSource: function () {
            return this.__user.getDataSource()
        }, getIdentifier: function () {
            return this.__user.getIdentifier()
        }, getType: function () {
            return this.__user.getType()
        }, getMeta: function () {
            return this.__user.getMeta()
        }, getDocuments: function () {
            return this.__user.getDocuments()
        }, getVisa: function () {
            return this.__user.getVisa()
        }, getContacts: function () {
            return this.__user.getContacts()
        }, verify: function (data, signature) {
            return this.__user.verify(data, signature)
        }, encrypt: function (plaintext) {
            return this.__user.encrypt(plaintext)
        }, sign: function (data) {
            return this.__user.sign(data)
        }, decrypt: function (ciphertext) {
            return this.__user.decrypt(ciphertext)
        }, signVisa: function (doc) {
            return this.__user.signVisa(doc)
        }, verifyVisa: function (doc) {
            return this.__user.verifyVisa(doc)
        }, setIdentifier: function (identifier) {
            var facebook = this.getDataSource();
            var user = new BaseUser(identifier);
            user.setDataSource(facebook);
            this.__user = user
        }, getHost: function () {
            if (!this.__host) {
                this.reload()
            }
            return this.__host
        }, getPort: function () {
            if (!this.__port) {
                this.reload()
            }
            return this.__port
        }, getProvider: function () {
            if (!this.__isp) {
                this.reload()
            }
            return this.__isp
        }, getProfile: function () {
            var docs = this.getDocuments();
            return DocumentUtils.lastDocument(docs, '*')
        }, reload: function () {
            var doc = this.getProfile();
            if (doc) {
                var host = doc.getProperty('host');
                host = Converter.getString(host, null);
                if (host) {
                    this.__host = host
                }
                var port = doc.getProperty('port');
                port = Converter.getInt(port, 0);
                if (port > 0) {
                    this.__port = port
                }
                var isp = doc.getProperty('provider');
                isp = ID.parse(isp);
                if (isp) {
                    this.__isp = isp
                }
            }
        }
    });
    Station.ANY = Identifier.create('station', Address.ANYWHERE, null);
    Station.EVERY = Identifier.create('stations', Address.EVERYWHERE, null);
    mkm.mkm.ServiceProvider = function (identifier) {
        BaseGroup.call(this, identifier)
    };
    var ServiceProvider = mkm.mkm.ServiceProvider;
    Class(ServiceProvider, BaseGroup, null);
    Implementation(ServiceProvider, {
        getProfile: function () {
            var docs = this.getDocuments();
            return DocumentUtils.lastDocument(docs, '*')
        }, getStations: function () {
            var doc = this.getProfile();
            if (doc) {
                var stations = doc.getProperty('stations');
                if (stations instanceof Array) {
                    return stations
                }
            }
            return []
        }
    });
    ServiceProvider.sameStation = function (a, b) {
        if (a === b) {
            return true
        }
        return checkIdentifiers(a.getIdentifier(), b.getIdentifier()) && checkHosts(a.getHost(), b.getHost()) && checkPorts(a.getPort(), b.getPort())
    };
    var checkIdentifiers = function (a, b) {
        if (a === b) {
            return true
        } else if (a.isBroadcast() || b.isBroadcast()) {
            return true
        }
        return a.equals(b)
    };
    var checkHosts = function (a, b) {
        if (!a || !b) {
            return true
        }
        return a === b
    };
    var checkPorts = function (a, b) {
        if (!a || !b) {
            return true
        }
        return a === b
    };
    sdk.msg.MessageUtils = {
        setMeta: function (meta, msg) {
            msg.setMap('meta', meta)
        }, getMeta: function (msg) {
            var meta = msg.getValue('meta');
            return Meta.parse(meta)
        }, setVisa: function (visa, msg) {
            msg.setMap('visa', visa)
        }, getVisa: function (msg) {
            var visa = msg.getValue('visa');
            var doc = Document.parse(visa);
            if (Interface.conforms(doc, Visa)) {
                return doc
            }
            return null
        }
    };
    var MessageUtils = sdk.msg.MessageUtils;
    InstantMessage.Delegate = Interface(null, null);
    var InstantMessageDelegate = InstantMessage.Delegate;
    InstantMessageDelegate.prototype.serializeContent = function (content, pwd, iMsg) {
    };
    InstantMessageDelegate.prototype.encryptContent = function (data, pwd, iMsg) {
    };
    InstantMessageDelegate.prototype.serializeKey = function (pwd, iMsg) {
    };
    InstantMessageDelegate.prototype.encryptKey = function (data, receiver, iMsg) {
    };
    SecureMessage.Delegate = Interface(null, null);
    var SecureMessageDelegate = SecureMessage.Delegate;
    SecureMessageDelegate.prototype.decryptKey = function (data, receiver, sMsg) {
    };
    SecureMessageDelegate.prototype.deserializeKey = function (data, sMsg) {
    };
    SecureMessageDelegate.prototype.decryptContent = function (data, pwd, sMsg) {
    };
    SecureMessageDelegate.prototype.deserializeContent = function (data, pwd, sMsg) {
    };
    SecureMessageDelegate.prototype.signData = function (data, sMsg) {
    };
    ReliableMessage.Delegate = Interface(null, null);
    var ReliableMessageDelegate = ReliableMessage.Delegate;
    ReliableMessageDelegate.prototype.verifyDataSignature = function (data, signature, rMsg) {
    };
    InstantMessage.Packer = function (messenger) {
        BaseObject.call(this);
        this.__messenger = messenger
    };
    var InstantMessagePacker = InstantMessage.Packer;
    Class(InstantMessagePacker, BaseObject, null);
    InstantMessagePacker.prototype.getDelegate = function () {
        return this.__messenger
    };
    InstantMessagePacker.prototype.encryptMessage = function (iMsg, password, members) {
        var transceiver = this.getDelegate();
        var body = transceiver.serializeContent(iMsg.getContent(), password, iMsg);
        var ciphertext = transceiver.encryptContent(body, password, iMsg);
        var encodedData;
        if (BaseMessage.isBroadcast(iMsg)) {
            encodedData = UTF8.decode(ciphertext)
        } else {
            encodedData = TransportableData.encode(ciphertext)
        }
        var info = iMsg.copyMap(false);
        delete info['content'];
        info['data'] = encodedData;
        var pwd = transceiver.serializeKey(password, iMsg);
        if (!pwd) {
            return SecureMessage.parse(info)
        }
        var receiver;
        var encryptedKey;
        var encodedKey;
        if (!members) {
            receiver = iMsg.getReceiver();
            encryptedKey = transceiver.encryptKey(pwd, receiver, iMsg);
            if (!encryptedKey) {
                return null
            }
            encodedKey = TransportableData.encode(encryptedKey);
            info['key'] = encodedKey
        } else {
            var keys = {};
            for (var i = 0; i < members.length; ++i) {
                receiver = members[i];
                encryptedKey = transceiver.encryptKey(pwd, receiver, iMsg);
                if (!encryptedKey) {
                    continue
                }
                encodedKey = TransportableData.encode(encryptedKey);
                keys[receiver.toString()] = encodedKey
            }
            if (Object.keys(keys).length === 0) {
                return null
            }
            info['keys'] = keys
        }
        return SecureMessage.parse(info)
    };
    SecureMessage.Packer = function (messenger) {
        BaseObject.call(this);
        this.__messenger = messenger
    };
    var SecureMessagePacker = SecureMessage.Packer;
    Class(SecureMessagePacker, BaseObject, null);
    SecureMessagePacker.prototype.getDelegate = function () {
        return this.__messenger
    };
    SecureMessagePacker.prototype.decryptMessage = function (sMsg, receiver) {
        var transceiver = this.getDelegate();
        var encryptedKey = sMsg.getEncryptedKey();
        var keyData;
        if (encryptedKey) {
            keyData = transceiver.decryptKey(encryptedKey, receiver, sMsg);
            if (!keyData) {
                throw new ReferenceError('failed to decrypt message key: ' + encryptedKey.length + ' byte(s) ' + sMsg.getSender() + ' => ' + receiver + ', ' + sMsg.getGroup());
            }
        }
        var password = transceiver.deserializeKey(keyData, sMsg);
        if (!password) {
            throw new ReferenceError('failed to get message key: ' + keyData.length + ' byte(s) ' + sMsg.getSender() + ' => ' + receiver + ', ' + sMsg.getGroup());
        }
        var ciphertext = sMsg.getData();
        if (!ciphertext || ciphertext.length === 0) {
            return null
        }
        var body = transceiver.decryptContent(ciphertext, password, sMsg);
        if (!body) {
            throw new ReferenceError('failed to decrypt message data with key: ' + password + ', data length: ' + ciphertext.length + ' byte(s)');
        }
        var content = transceiver.deserializeContent(body, password, sMsg);
        if (!content) {
            return null
        }
        var info = sMsg.copyMap(false);
        delete info['key'];
        delete info['keys'];
        delete info['data'];
        info['content'] = content.toMap();
        return InstantMessage.parse(info)
    };
    SecureMessagePacker.prototype.signMessage = function (sMsg) {
        var transceiver = this.getDelegate();
        var ciphertext = sMsg.getData();
        var signature = transceiver.signData(ciphertext, sMsg);
        var base64 = TransportableData.encode(signature);
        var info = sMsg.copyMap(false);
        info['signature'] = base64;
        return ReliableMessage.parse(info)
    };
    ReliableMessage.Packer = function (messenger) {
        BaseObject.call(this);
        this.__messenger = messenger
    };
    var ReliableMessagePacker = ReliableMessage.Packer;
    Class(ReliableMessagePacker, BaseObject, null);
    ReliableMessagePacker.prototype.getDelegate = function () {
        return this.__messenger
    };
    ReliableMessagePacker.prototype.verifyMessage = function (rMsg) {
        var transceiver = this.getDelegate();
        var ciphertext = rMsg.getData();
        if (!ciphertext || ciphertext.length === 0) {
            return null
        }
        var signature = rMsg.getSignature();
        if (!signature || signature.length === 0) {
            return null
        }
        var ok = transceiver.verifyDataSignature(ciphertext, signature, rMsg);
        if (!ok) {
            return null
        }
        var info = rMsg.copyMap(false);
        delete info['signature'];
        return SecureMessage.parse(info)
    };
    sdk.cpu.ContentProcessor = Interface(null, null);
    var ContentProcessor = sdk.cpu.ContentProcessor;
    ContentProcessor.prototype.processContent = function (content, rMsg) {
    };
    ContentProcessor.Creator = Interface(null, null);
    var ContentProcessorCreator = ContentProcessor.Creator;
    ContentProcessorCreator.prototype.createContentProcessor = function (type) {
    };
    ContentProcessorCreator.prototype.createCommandProcessor = function (type, cmd) {
    };
    ContentProcessor.Factory = Interface(null, null);
    var ContentProcessorFactory = ContentProcessor.Factory;
    ContentProcessorFactory.prototype.getContentProcessor = function (content) {
    };
    ContentProcessorFactory.prototype.getContentProcessorForType = function (type) {
    };
    sdk.cpu.GeneralContentProcessorFactory = function (creator) {
        BaseObject.call(this);
        this.__creator = creator;
        this.__content_processors = {}
        this.__command_processors = {}
    };
    var GeneralContentProcessorFactory = sdk.cpu.GeneralContentProcessorFactory;
    Class(GeneralContentProcessorFactory, BaseObject, [ContentProcessorFactory]);
    GeneralContentProcessorFactory.prototype.getContentProcessor = function (content) {
        var cpu;
        var type = content.getType();
        if (Interface.conforms(content, Command)) {
            var cmd = content.getCmd();
            cpu = this.getCommandProcessor(type, cmd);
            if (cpu) {
                return cpu
            } else if (Interface.conforms(content, GroupCommand)) {
                cpu = this.getCommandProcessor(type, 'group');
                if (cpu) {
                    return cpu
                }
            }
        }
        return this.getContentProcessorForType(type)
    };
    GeneralContentProcessorFactory.prototype.getContentProcessorForType = function (type) {
        var cpu = this.__content_processors[type];
        if (!cpu) {
            cpu = this.__creator.createContentProcessor(type);
            if (cpu) {
                this.__content_processors[type] = cpu
            }
        }
        return cpu
    };
    GeneralContentProcessorFactory.prototype.getCommandProcessor = function (type, cmd) {
        var cpu = this.__command_processors[cmd];
        if (!cpu) {
            cpu = this.__creator.createCommandProcessor(type, cmd);
            if (cpu) {
                this.__command_processors[cmd] = cpu
            }
        }
        return cpu
    };
    sdk.core.Barrack = function () {
        BaseObject.call(this)
    };
    var Barrack = sdk.core.Barrack;
    Class(Barrack, BaseObject, null);
    Barrack.prototype.cacheUser = function (user) {
    };
    Barrack.prototype.cacheGroup = function (group) {
    };
    Barrack.prototype.getUser = function (identifier) {
    };
    Barrack.prototype.getGroup = function (identifier) {
    };
    Barrack.prototype.createUser = function (identifier) {
        var network = identifier.getType();
        if (EntityType.STATION === network) {
            return new Station(identifier)
        } else if (EntityType.BOT === network) {
            return new Bot(identifier)
        }
        return new BaseUser(identifier)
    };
    Barrack.prototype.createGroup = function (identifier) {
        var network = identifier.getType();
        if (EntityType.ISP === network) {
            return new ServiceProvider(identifier)
        }
        return new BaseGroup(identifier)
    };
    sdk.core.Archivist = Interface(null, null);
    var Archivist = sdk.core.Archivist;
    Archivist.prototype.saveMeta = function (meta, identifier) {
    };
    Archivist.prototype.saveDocument = function (doc) {
    };
    Archivist.prototype.getMetaKey = function (identifier) {
    };
    Archivist.prototype.getVisaKey = function (identifier) {
    };
    Archivist.prototype.getLocalUsers = function () {
    };
    sdk.core.Shortener = Interface(null, null);
    var Shortener = sdk.core.Shortener;
    Shortener.prototype.compressContent = function (content) {
    };
    Shortener.prototype.extractContent = function (content) {
    };
    Shortener.prototype.compressSymmetricKey = function (key) {
    };
    Shortener.prototype.extractSymmetricKey = function (key) {
    };
    Shortener.prototype.compressReliableMessage = function (msg) {
    };
    Shortener.prototype.extractReliableMessage = function (msg) {
    };
    sdk.core.MessageShortener = function () {
        BaseObject.call(this)
    };
    var MessageShortener = sdk.core.MessageShortener;
    Class(MessageShortener, BaseObject, [Shortener]);
    MessageShortener.prototype.moveKey = function (from, to, info) {
        var value = info[from];
        if (value) {
            delete info[from];
            info[to] = value
        }
    };
    MessageShortener.prototype.shortenKeys = function (keys, info) {
        for (var i = 1; i < keys.length; i += 2) {
            this.moveKey(keys[i], keys[i - 1], info)
        }
    };
    MessageShortener.prototype.restoreKeys = function (keys, info) {
        for (var i = 1; i < keys.length; i += 2) {
            this.moveKey(keys[i - 1], keys[i], info)
        }
    };
    MessageShortener.prototype.contentShortKeys = ["T", "type", "N", "sn", "W", "time", "G", "group", "C", "command"];
    MessageShortener.prototype.compressContent = function (content) {
        this.shortenKeys(this.contentShortKeys, content);
        return content
    };
    MessageShortener.prototype.extractContent = function (content) {
        this.restoreKeys(this.contentShortKeys, content);
        return content
    };
    MessageShortener.prototype.cryptoShortKeys = ["A", "algorithm", "D", "data", "I", "iv"];
    MessageShortener.prototype.compressSymmetricKey = function (key) {
        this.shortenKeys(this.cryptoShortKeys, key);
        return key
    };
    MessageShortener.prototype.extractSymmetricKey = function (key) {
        this.restoreKeys(this.cryptoShortKeys, key);
        return key
    };
    MessageShortener.prototype.messageShortKeys = ["F", "sender", "R", "receiver", "W", "time", "T", "type", "G", "group", "K", "key", "D", "data", "V", "signature", "M", "meta", "P", "visa"];
    MessageShortener.prototype.compressReliableMessage = function (msg) {
        this.moveKey("keys", "K", msg);
        this.shortenKeys(this.messageShortKeys, msg);
        return msg
    };
    MessageShortener.prototype.extractReliableMessage = function (msg) {
        var keys = msg['K'];
        if (!keys) {
        } else if (IObject.isString(keys)) {
            delete msg['K'];
            msg['key'] = keys
        } else {
            delete msg['K'];
            msg['keys'] = keys
        }
        this.restoreKeys(this.messageShortKeys, msg);
        return msg
    };
    sdk.core.Compressor = Interface(null, null);
    var Compressor = sdk.core.Compressor;
    Compressor.prototype.compressContent = function (content, key) {
    };
    Compressor.prototype.extractContent = function (data, key) {
    };
    Compressor.prototype.compressSymmetricKey = function (key) {
    };
    Compressor.prototype.extractSymmetricKey = function (data) {
    };
    Compressor.prototype.compressReliableMessage = function (msg) {
    };
    Compressor.prototype.extractReliableMessage = function (data) {
    };
    sdk.core.MessageCompressor = function (shortener) {
        BaseObject.call(this);
        this.__shortener = shortener
    };
    var MessageCompressor = sdk.core.MessageCompressor;
    Class(MessageCompressor, BaseObject, [Compressor]);
    MessageCompressor.prototype.getShortener = function () {
        return this.__shortener
    };
    MessageCompressor.prototype.compressContent = function (content, key) {
        var shortener = this.getShortener();
        content = shortener.compressContent(content);
        var text = JSONMap.encode(content);
        return UTF8.encode(text)
    };
    MessageCompressor.prototype.extractContent = function (data, key) {
        var text = UTF8.decode(data);
        if (!text) {
            return null
        }
        var info = JSONMap.decode(text);
        if (info) {
            var shortener = this.getShortener();
            info = shortener.extractContent(info)
        }
        return info
    };
    MessageCompressor.prototype.compressSymmetricKey = function (key) {
        var shortener = this.getShortener();
        key = shortener.compressSymmetricKey(key);
        var text = JSONMap.encode(key);
        return UTF8.encode(text)
    };
    MessageCompressor.prototype.extractSymmetricKey = function (data) {
        var text = UTF8.decode(data);
        if (!text) {
            return null
        }
        var key = JSONMap.decode(text);
        if (key) {
            var shortener = this.getShortener();
            key = shortener.extractSymmetricKey(key)
        }
        return key
    };
    MessageCompressor.prototype.compressReliableMessage = function (msg) {
        var shortener = this.getShortener();
        msg = shortener.compressReliableMessage(msg);
        var text = JSONMap.encode(msg);
        return UTF8.encode(text)
    };
    MessageCompressor.prototype.extractReliableMessage = function (data) {
        var text = UTF8.decode(data);
        if (!text) {
            return null
        }
        var msg = JSONMap.decode(text);
        if (msg) {
            var shortener = this.getShortener();
            msg = shortener.extractReliableMessage(msg)
        }
        return msg
    };
    sdk.core.CipherKeyDelegate = Interface(null, null);
    var CipherKeyDelegate = sdk.core.CipherKeyDelegate;
    CipherKeyDelegate.getDestinationForMessage = function (msg) {
        var receiver = msg.getReceiver();
        var group = ID.parse(msg.getValue('group'));
        return CipherKeyDelegate.getDestination(receiver, group)
    };
    CipherKeyDelegate.getDestination = function (receiver, group) {
        if (!group && receiver.isGroup()) {
            group = receiver
        }
        if (!group) {
            return receiver
        }
        if (group.isBroadcast()) {
            return group
        } else if (receiver.isBroadcast()) {
            return receiver
        } else {
            return group
        }
    };
    CipherKeyDelegate.prototype.getCipherKey = function (sender, receiver, generate) {
    };
    CipherKeyDelegate.prototype.cacheCipherKey = function (sender, receiver, key) {
    };
    sdk.core.Packer = Interface(null, null);
    var Packer = sdk.core.Packer;
    Packer.prototype.encryptMessage = function (iMsg) {
    };
    Packer.prototype.signMessage = function (sMsg) {
    };
    Packer.prototype.verifyMessage = function (rMsg) {
    };
    Packer.prototype.decryptMessage = function (sMsg) {
    };
    sdk.core.Processor = Interface(null, null);
    var Processor = sdk.core.Processor;
    Processor.prototype.processPackage = function (data) {
    };
    Processor.prototype.processReliableMessage = function (rMsg) {
    };
    Processor.prototype.processSecureMessage = function (sMsg, rMsg) {
    };
    Processor.prototype.processInstantMessage = function (iMsg, rMsg) {
    };
    Processor.prototype.processContent = function (content, rMsg) {
    };
    sdk.core.Transceiver = function () {
        BaseObject.call(this)
    };
    var Transceiver = sdk.core.Transceiver;
    Class(Transceiver, BaseObject, [InstantMessageDelegate, SecureMessageDelegate, ReliableMessageDelegate]);
    Transceiver.prototype.getFacebook = function () {
    };
    Transceiver.prototype.getCompressor = function () {
    };
    Transceiver.prototype.serializeMessage = function (rMsg) {
        var info = rMsg.toMap();
        var compressor = this.getCompressor();
        return compressor.compressReliableMessage(info)
    };
    Transceiver.prototype.deserializeMessage = function (data) {
        var compressor = this.getCompressor();
        var info = compressor.extractReliableMessage(data);
        return ReliableMessage.parse(info)
    };
    Transceiver.prototype.serializeContent = function (content, pwd, iMsg) {
        var compressor = this.getCompressor();
        return compressor.compressContent(content.toMap(), pwd.toMap())
    };
    Transceiver.prototype.encryptContent = function (data, pwd, iMsg) {
        return pwd.encrypt(data, iMsg.toMap())
    };
    Transceiver.prototype.serializeKey = function (pwd, iMsg) {
        if (BaseMessage.isBroadcast(iMsg)) {
            return null
        }
        var compressor = this.getCompressor();
        return compressor.compressSymmetricKey(pwd.toMap())
    };
    Transceiver.prototype.encryptKey = function (keyData, receiver, iMsg) {
        var facebook = this.getFacebook();
        var contact = facebook.getUser(receiver);
        if (!contact) {
            return null
        }
        return contact.encrypt(keyData)
    };
    Transceiver.prototype.decryptKey = function (keyData, receiver, sMsg) {
        var facebook = this.getFacebook();
        var user = facebook.getUser(receiver);
        if (!user) {
            return null
        }
        return user.decrypt(keyData)
    };
    Transceiver.prototype.deserializeKey = function (keyData, sMsg) {
        if (!keyData) {
            return null
        }
        var compressor = this.getCompressor();
        var info = compressor.extractSymmetricKey(keyData);
        return SymmetricKey.parse(info)
    };
    Transceiver.prototype.decryptContent = function (data, pwd, sMsg) {
        return pwd.decrypt(data, sMsg.toMap())
    };
    Transceiver.prototype.deserializeContent = function (data, pwd, sMsg) {
        var compressor = this.getCompressor();
        var info = compressor.extractContent(data, pwd.toMap());
        return Content.parse(info)
    };
    Transceiver.prototype.signData = function (data, sMsg) {
        var facebook = this.getFacebook();
        var sender = sMsg.getSender();
        var user = facebook.getUser(sender);
        return user.sign(data)
    };
    Transceiver.prototype.verifyDataSignature = function (data, signature, rMsg) {
        var facebook = this.getFacebook();
        var sender = rMsg.getSender();
        var contact = facebook.getUser(sender);
        if (!contact) {
            return false
        }
        return contact.verify(data, signature)
    };
    sdk.TwinsHelper = function (facebook, messenger) {
        BaseObject.call(this);
        this.__facebook = facebook;
        this.__messenger = messenger
    };
    var TwinsHelper = sdk.TwinsHelper;
    Class(TwinsHelper, BaseObject, null);
    TwinsHelper.prototype.getFacebook = function () {
        return this.__facebook
    }
    TwinsHelper.prototype.getMessenger = function () {
        return this.__messenger
    }
    sdk.Facebook = function () {
        BaseObject.call(this)
    };
    var Facebook = sdk.Facebook;
    Class(Facebook, BaseObject, [EntityDelegate, UserDataSource, GroupDataSource]);
    Facebook.prototype.getBarrack = function () {
    };
    Facebook.prototype.getArchivist = function () {
    };
    Facebook.prototype.selectLocalUser = function (receiver) {
        var archivist = this.getArchivist();
        var users = archivist.getLocalUsers();
        if (!users || users.length === 0) {
            return null
        } else if (receiver.isBroadcast()) {
            return users[0]
        }
        var i, uid;
        if (receiver.isUser()) {
            for (i = 0; i < users.length; ++i) {
                uid = users[i];
                if (!uid) {
                } else if (uid.equals(receiver)) {
                    return uid
                }
            }
        } else if (receiver.isGroup()) {
            var members = this.getMembers(receiver);
            if (!members || members.length === 0) {
                return null
            }
            var j, mid;
            for (i = 0; i < users.length; ++i) {
                uid = users[i];
                for (j = 0; j < members.length; ++j) {
                    mid = members[j];
                    if (!mid) {
                    } else if (mid.equals(uid)) {
                        return uid
                    }
                }
            }
        } else {
            throw new TypeError('receiver error: ' + receiver);
        }
        return null
    };
    Facebook.prototype.getUser = function (uid) {
        var barrack = this.getBarrack();
        var user = barrack.getUser(uid);
        if (user) {
            return user
        }
        if (uid.isBroadcast()) {
        } else {
            var visaKey = this.getPublicKeyForEncryption(uid);
            if (!visaKey) {
                return null
            }
        }
        user = barrack.createUser(uid);
        if (user) {
            barrack.cacheUser(user)
        }
        return user
    };
    Facebook.prototype.getGroup = function (gid) {
        var barrack = this.getBarrack();
        var group = barrack.getGroup(gid);
        if (group) {
            return group
        }
        if (gid.isBroadcast()) {
        } else {
            var members = this.getMembers(gid);
            if (!members || members.length === 0) {
                return null
            }
        }
        group = barrack.createGroup(gid);
        if (group) {
            barrack.cacheGroup(group)
        }
        return group
    };
    Facebook.prototype.getPublicKeyForEncryption = function (uid) {
        var archivist = this.getArchivist();
        var visaKey = archivist.getVisaKey(uid);
        if (visaKey) {
            return visaKey
        }
        var metaKey = archivist.getMetaKey(uid);
        if (Interface.conforms(metaKey, EncryptKey)) {
            return metaKey
        }
        return null
    };
    Facebook.prototype.getPublicKeysForVerification = function (uid) {
        var archivist = this.getArchivist();
        var verifyKeys = [];
        var visaKey = archivist.getVisaKey(uid);
        if (Interface.conforms(visaKey, VerifyKey)) {
            verifyKeys.push(visaKey)
        }
        var metaKey = archivist.getMetaKey(uid);
        if (metaKey) {
            verifyKeys.push(metaKey)
        }
        return verifyKeys
    };
    sdk.Messenger = function () {
        Transceiver.call(this)
    };
    var Messenger = sdk.Messenger;
    Class(Messenger, Transceiver, [Packer, Processor]);
    Messenger.prototype.getCipherKeyDelegate = function () {
    };
    Messenger.prototype.getPacker = function () {
    };
    Messenger.prototype.getProcessor = function () {
    };
    Messenger.prototype.deserializeKey = function (keyData, sMsg) {
        if (!keyData) {
            return this.getDecryptKey(sMsg)
        }
        var password = Transceiver.prototype.deserializeKey.call(this, keyData, sMsg);
        if (password) {
            this.cacheDecryptKey(password, sMsg)
        }
        return password
    };
    Messenger.prototype.getEncryptKey = function (iMsg) {
        var sender = iMsg.getSender();
        var target = CipherKeyDelegate.getDestinationForMessage(iMsg);
        var db = this.getCipherKeyDelegate();
        return db.getCipherKey(sender, target, true)
    };
    Messenger.prototype.getDecryptKey = function (sMsg) {
        var sender = sMsg.getSender();
        var target = CipherKeyDelegate.getDestinationForMessage(sMsg);
        var db = this.getCipherKeyDelegate();
        return db.getCipherKey(sender, target, false)
    };
    Messenger.prototype.cacheDecryptKey = function (key, sMsg) {
        var sender = sMsg.getSender();
        var target = CipherKeyDelegate.getDestinationForMessage(sMsg);
        var db = this.getCipherKeyDelegate();
        return db.cacheCipherKey(sender, target, key)
    };
    Messenger.prototype.encryptMessage = function (iMsg) {
        var packer = this.getPacker();
        return packer.encryptMessage(iMsg)
    };
    Messenger.prototype.signMessage = function (sMsg) {
        var packer = this.getPacker();
        return packer.signMessage(sMsg)
    };
    Messenger.prototype.verifyMessage = function (rMsg) {
        var packer = this.getPacker();
        return packer.verifyMessage(rMsg)
    };
    Messenger.prototype.decryptMessage = function (sMsg) {
        var packer = this.getPacker();
        return packer.decryptMessage(sMsg)
    };
    Messenger.prototype.processPackage = function (data) {
        var processor = this.getProcessor();
        return processor.processPackage(data)
    };
    Messenger.prototype.processReliableMessage = function (rMsg) {
        var processor = this.getProcessor();
        return processor.processReliableMessage(rMsg)
    };
    Messenger.prototype.processSecureMessage = function (sMsg, rMsg) {
        var processor = this.getProcessor();
        return processor.processSecureMessage(sMsg, rMsg)
    };
    Messenger.prototype.processInstantMessage = function (iMsg, rMsg) {
        var processor = this.getProcessor();
        return processor.processInstantMessage(iMsg, rMsg)
    };
    Messenger.prototype.processContent = function (content, rMsg) {
        var processor = this.getProcessor();
        return processor.processContent(content, rMsg)
    };
    sdk.MessagePacker = function (facebook, messenger) {
        TwinsHelper.call(this, facebook, messenger);
        this.__instantPacker = this.createInstantMessagePacker(messenger);
        this.__securePacker = this.createSecureMessagePacker(messenger);
        this.__reliablePacker = this.createReliableMessagePacker(messenger)
    };
    var MessagePacker = sdk.MessagePacker;
    Class(MessagePacker, TwinsHelper, [Packer]);
    MessagePacker.prototype.createInstantMessagePacker = function (delegate) {
        return new InstantMessagePacker(delegate)
    };
    MessagePacker.prototype.createSecureMessagePacker = function (delegate) {
        return new SecureMessagePacker(delegate)
    };
    MessagePacker.prototype.createReliableMessagePacker = function (delegate) {
        return new ReliableMessagePacker(delegate)
    };
    MessagePacker.prototype.getInstantMessagePacker = function () {
        return this.__instantPacker
    };
    MessagePacker.prototype.getSecureMessagePacker = function () {
        return this.__securePacker
    };
    MessagePacker.prototype.getReliableMessagePacker = function () {
        return this.__reliablePacker
    };
    MessagePacker.prototype.getArchivist = function () {
        var facebook = this.getFacebook();
        if (facebook) {
            return facebook.getArchivist()
        } else {
            return null
        }
    };
    MessagePacker.prototype.encryptMessage = function (iMsg) {
        var facebook = this.getFacebook();
        var messenger = this.getMessenger();
        var sMsg;
        var receiver = iMsg.getReceiver();
        var password = messenger.getEncryptKey(iMsg);
        if (!password) {
            return null
        }
        var instantPacker = this.getInstantMessagePacker();
        if (receiver.isGroup()) {
            var members = facebook.getMembers(receiver);
            if (!members || members.length === 0) {
                return null
            }
            sMsg = instantPacker.encryptMessage(iMsg, password, members)
        } else {
            sMsg = instantPacker.encryptMessage(iMsg, password, null)
        }
        if (sMsg == null) {
            return null
        }
        sMsg.getEnvelope().setType(iMsg.getContent().getType());
        return sMsg
    };
    MessagePacker.prototype.signMessage = function (sMsg) {
        var securePacker = this.getSecureMessagePacker();
        return securePacker.signMessage(sMsg)
    };
    MessagePacker.prototype.checkAttachments = function (rMsg) {
        var archivist = this.getArchivist();
        if (!archivist) {
            return false
        }
        var sender = rMsg.getSender();
        var meta = MessageUtils.getMeta(rMsg);
        if (meta) {
            archivist.saveMeta(meta, sender)
        }
        var visa = MessageUtils.getVisa(rMsg);
        if (visa) {
            archivist.saveDocument(visa)
        }
        return true
    };
    MessagePacker.prototype.verifyMessage = function (rMsg) {
        if (this.checkAttachments(rMsg)) {
        } else {
            return null
        }
        var reliablePacker = this.getReliableMessagePacker();
        return reliablePacker.verifyMessage(rMsg)
    };
    MessagePacker.prototype.decryptMessage = function (sMsg) {
        var receiver = sMsg.getReceiver();
        var facebook = this.getFacebook();
        var me = facebook.selectLocalUser(receiver);
        if (me == null) {
            throw new ReferenceError('receiver error: ' + receiver.toString() + ', from ' + sMsg.getSender().toString() + ', ' + sMsg.getGroup());
        }
        var securePacker = this.getSecureMessagePacker();
        return securePacker.decryptMessage(sMsg, me)
    };
    sdk.MessageProcessor = function (facebook, messenger) {
        TwinsHelper.call(this, facebook, messenger);
        this.__factory = this.createFactory(facebook, messenger)
    };
    var MessageProcessor = sdk.MessageProcessor;
    Class(MessageProcessor, TwinsHelper, [Processor]);
    MessageProcessor.prototype.createFactory = function (facebook, messenger) {
    };
    MessageProcessor.prototype.getFactory = function () {
        return this.__factory
    };
    MessageProcessor.prototype.processPackage = function (data) {
        var messenger = this.getMessenger();
        var rMsg = messenger.deserializeMessage(data);
        if (!rMsg) {
            return []
        }
        var responses = messenger.processReliableMessage(rMsg);
        if (!responses || responses.length === 0) {
            return []
        }
        var packages = [];
        var res, pack;
        for (var i = 0; i < responses.length; ++i) {
            res = responses[i];
            if (!res) {
                continue
            }
            pack = messenger.serializeMessage(res);
            if (!pack) {
                continue
            }
            packages.push(pack)
        }
        return packages
    };
    MessageProcessor.prototype.processReliableMessage = function (rMsg) {
        var messenger = this.getMessenger();
        var sMsg = messenger.verifyMessage(rMsg);
        if (!sMsg) {
            return []
        }
        var responses = messenger.processSecureMessage(sMsg, rMsg);
        if (!responses || responses.length === 0) {
            return []
        }
        var messages = [];
        var res, msg;
        for (var i = 0; i < responses.length; ++i) {
            res = responses[i];
            if (!res) {
                continue
            }
            msg = messenger.signMessage(res);
            if (!msg) {
                continue
            }
            messages.push(msg)
        }
        return messages
    };
    MessageProcessor.prototype.processSecureMessage = function (sMsg, rMsg) {
        var messenger = this.getMessenger();
        var iMsg = messenger.decryptMessage(sMsg);
        if (!iMsg) {
            return []
        }
        var responses = messenger.processInstantMessage(iMsg, rMsg);
        if (!responses || responses.length === 0) {
            return []
        }
        var messages = [];
        var res, msg;
        for (var i = 0; i < responses.length; ++i) {
            res = responses[i];
            if (!res) {
                continue
            }
            msg = messenger.encryptMessage(res);
            if (!msg) {
                continue
            }
            messages.push(msg)
        }
        return messages
    };
    MessageProcessor.prototype.processInstantMessage = function (iMsg, rMsg) {
        var facebook = this.getFacebook();
        var messenger = this.getMessenger();
        var responses = messenger.processContent(iMsg.getContent(), rMsg);
        if (!responses || responses.length === 0) {
            return []
        }
        var sender = iMsg.getSender();
        var receiver = iMsg.getReceiver();
        var me = facebook.selectLocalUser(receiver);
        if (!me) {
            return []
        }
        var messages = [];
        var res, env, msg;
        for (var i = 0; i < responses.length; ++i) {
            res = responses[i];
            if (!res) {
                continue
            }
            env = Envelope.create(me, sender, null);
            msg = InstantMessage.create(env, res);
            if (!msg) {
                continue
            }
            messages.push(msg)
        }
        return messages
    };
    MessageProcessor.prototype.processContent = function (content, rMsg) {
        var factory = this.getFactory();
        var cpu = factory.getContentProcessor(content);
        if (!cpu) {
            cpu = factory.getContentProcessorForType(ContentType.ANY)
        }
        return cpu.processContent(content, rMsg)
    };
    sdk.cpu.BaseContentProcessor = function (facebook, messenger) {
        TwinsHelper.call(this, facebook, messenger)
    };
    var BaseContentProcessor = sdk.cpu.BaseContentProcessor;
    Class(BaseContentProcessor, TwinsHelper, [ContentProcessor]);
    BaseContentProcessor.prototype.processContent = function (content, rMsg) {
        var text = 'Content not support.';
        return this.respondReceipt(text, rMsg.getEnvelope(), content, {
            'template': 'Content (type: ${type}) not support yet!',
            'replacements': {'type': content.getType()}
        })
    };
    BaseContentProcessor.prototype.respondReceipt = function (text, envelope, content, extra) {
        return [BaseContentProcessor.createReceipt(text, envelope, content, extra)]
    };
    BaseContentProcessor.createReceipt = function (text, envelope, content, extra) {
        var res = ReceiptCommand.create(text, envelope, content);
        if (extra) {
            Mapper.addAll(res, extra)
        }
        return res
    };
    sdk.cpu.BaseCommandProcessor = function (facebook, messenger) {
        BaseContentProcessor.call(this, facebook, messenger)
    };
    var BaseCommandProcessor = sdk.cpu.BaseCommandProcessor;
    Class(BaseCommandProcessor, BaseContentProcessor, null);
    Implementation(BaseCommandProcessor, {
        processContent: function (content, rMsg) {
            var text = 'Command not support.';
            return this.respondReceipt(text, rMsg.getEnvelope(), content, {
                'template': 'Command (name: ${command}) not support yet!',
                'replacements': {'command': content.getCmd()}
            })
        }
    });
    sdk.cpu.ForwardContentProcessor = function (facebook, messenger) {
        BaseContentProcessor.call(this, facebook, messenger)
    };
    var ForwardContentProcessor = sdk.cpu.ForwardContentProcessor;
    Class(ForwardContentProcessor, BaseContentProcessor, null);
    Implementation(ForwardContentProcessor, {
        processContent: function (content, rMsg) {
            var secrets = content.getSecrets();
            if (!secrets) {
                return null
            }
            var messenger = this.getMessenger();
            var responses = [];
            var res;
            var results;
            for (var i = 0; i < secrets.length; ++i) {
                results = messenger.processReliableMessage(secrets[i]);
                if (!results) {
                    res = ForwardContent.create([])
                } else if (results.length === 1) {
                    res = ForwardContent.create(results[0])
                } else {
                    res = ForwardContent.create(results)
                }
                responses.push(res)
            }
            return responses
        }
    });
    sdk.cpu.ArrayContentProcessor = function (facebook, messenger) {
        BaseContentProcessor.call(this, facebook, messenger)
    };
    var ArrayContentProcessor = sdk.cpu.ArrayContentProcessor;
    Class(ArrayContentProcessor, BaseContentProcessor, null);
    Implementation(ArrayContentProcessor, {
        processContent: function (content, rMsg) {
            var array = content.getContents();
            if (!array) {
                return null
            }
            var messenger = this.getMessenger();
            var responses = [];
            var res;
            var results;
            for (var i = 0; i < array.length; ++i) {
                results = messenger.processContent(array[i], rMsg);
                if (!results) {
                    res = ArrayContent.create([])
                } else if (results.length === 1) {
                    res = results[0]
                } else {
                    res = ArrayContent.create(results)
                }
                responses.push(res)
            }
            return responses
        }
    });
    sdk.cpu.MetaCommandProcessor = function (facebook, messenger) {
        BaseCommandProcessor.call(this, facebook, messenger)
    };
    var MetaCommandProcessor = sdk.cpu.MetaCommandProcessor;
    Class(MetaCommandProcessor, BaseCommandProcessor, null);
    Implementation(MetaCommandProcessor, {
        getArchivist: function () {
            var facebook = this.getFacebook();
            if (!facebook) {
                return null
            }
            return facebook.getArchivist()
        }, processContent: function (content, rMsg) {
            var identifier = content.getIdentifier();
            if (!identifier) {
                var text = 'Meta command error.';
                return this.respondReceipt(text, rMsg.getEnvelope(), content, null)
            }
            var meta = content.getMeta();
            if (meta) {
                return this.updateMeta(meta, identifier, content, rMsg.getEnvelope())
            } else {
                return this.queryMeta(identifier, content, rMsg.getEnvelope())
            }
        }, queryMeta: function (identifier, content, envelope) {
            var facebook = this.getFacebook();
            var meta = facebook.getMeta(identifier);
            if (meta) {
                return [MetaCommand.response(identifier, meta)]
            }
            var text = 'Meta not found.';
            return this.respondReceipt(text, envelope, content, {
                'template': 'Meta not found: ${did}.',
                'replacements': {'did': identifier.toString()}
            })
        }, updateMeta: function (meta, identifier, content, envelope) {
            var errors = this.saveMeta(meta, identifier, content, envelope);
            if (errors) {
                return errors
            }
            var text = 'Meta received.';
            return this.respondReceipt(text, envelope, content, {
                'template': 'Meta received: ${did}.',
                'replacements': {'did': identifier.toString()}
            })
        }, saveMeta: function (meta, identifier, content, envelope) {
            var text;
            if (!this.checkMeta(meta, identifier)) {
                text = 'Meta not valid.';
                return this.respondReceipt(text, envelope, content, {
                    'template': 'Meta not valid: ${did}.',
                    'replacements': {'did': identifier.toString()}
                })
            } else if (!this.getArchivist().saveMeta(meta, identifier)) {
                text = 'Meta not accepted.';
                return this.respondReceipt(text, envelope, content, {
                    'template': 'Meta not accepted: ${did}.',
                    'replacements': {'did': identifier.toString()}
                })
            }
            return null
        }, checkMeta: function (meta, identifier) {
            return meta.isValid() && MetaUtils.matchIdentifier(identifier, meta)
        }
    });
    sdk.cpu.DocumentCommandProcessor = function (facebook, messenger) {
        MetaCommandProcessor.call(this, facebook, messenger)
    };
    var DocumentCommandProcessor = sdk.cpu.DocumentCommandProcessor;
    Class(DocumentCommandProcessor, MetaCommandProcessor, null);
    Implementation(DocumentCommandProcessor, {
        processContent: function (content, rMsg) {
            var text;
            var identifier = content.getIdentifier();
            if (!identifier) {
                text = 'Document command error.';
                return this.respondReceipt(text, rMsg.getEnvelope(), content)
            }
            var documents = content.getDocuments();
            if (!documents) {
                return this.queryDocument(identifier, content, rMsg.getEnvelope())
            }
            var doc;
            for (var i = 0; i < documents.length; ++i) {
                doc = documents[i];
                if (identifier.equals(doc.getIdentifier())) {
                } else {
                    text = 'Document ID not match.';
                    return this.respondReceipt(text, rMsg.getEnvelope(), content, {
                        'template': 'Document ID not match: ${did}.',
                        'replacements': {'did': identifier.toString()}
                    })
                }
            }
            return this.updateDocuments(documents, identifier, content, rMsg.getEnvelope())
        }, queryDocument: function (identifier, content, envelope) {
            var text;
            var documents = this.getFacebook().getDocuments(identifier);
            if (!documents || documents.length === 0) {
                text = 'Document not found.';
                return this.respondReceipt(text, envelope, content, {
                    'template': 'Document not found: ${did}.',
                    'replacements': {'did': identifier.toString()}
                })
            }
            var queryTime = content.getLastTime();
            if (queryTime) {
                var last = DocumentUtils.lastDocument(documents);
                var lastTime = !last ? null : last.getTime();
                if (!lastTime) {
                } else if (lastTime.getTime() <= queryTime.getTime()) {
                    text = 'Document not updated.';
                    return this.respondReceipt(text, envelope, content, {
                        'template': 'Document not updated: ${did}, last time: ${time}.',
                        'replacements': {'did': identifier.toString(), 'time': lastTime.getTime()}
                    })
                }
            }
            var meta = this.getFacebook().getMeta(identifier);
            return [DocumentCommand.response(identifier, meta, documents)]
        }, updateDocuments: function (documents, identifier, content, envelope) {
            var errors;
            var meta = content.getMeta();
            var text;
            if (!meta) {
                meta = this.getFacebook().getMeta(identifier);
                if (!meta) {
                    text = 'Meta not found.';
                    return this.respondReceipt(text, envelope, content, {
                        'template': 'Meta not found: ${did}.',
                        'replacements': {'did': identifier.toString()}
                    })
                }
            } else {
                errors = this.saveMeta(meta, identifier, content, envelope);
                if (errors) {
                    return errors
                }
            }
            errors = [];
            var array;
            var doc;
            for (var i = 0; i < documents.length; ++i) {
                doc = documents[i];
                array = this.saveDocument(doc, meta, identifier, content, envelope);
                if (array) {
                    for (var j = 0; j < array.length; ++j) {
                        errors.push(array[j])
                    }
                }
            }
            if (errors.length > 0) {
                return errors
            }
            text = 'Document received.';
            return this.respondReceipt(text, envelope, content, {
                'template': 'Document received: ${did}.',
                'replacements': {'did': identifier.toString()}
            })
        }, saveDocument: function (doc, meta, identifier, content, envelope) {
            var text;
            if (!this.checkDocument(doc, meta)) {
                text = 'Document not accepted.';
                return this.respondReceipt(text, envelope, content, {
                    'template': 'Document not accepted: ${did}.',
                    'replacements': {'did': identifier.toString()}
                })
            } else if (!this.getArchivist().saveDocument(doc)) {
                text = 'Document not changed.';
                return this.respondReceipt(text, envelope, content, {
                    'template': 'Document not changed: ${did}.',
                    'replacements': {'did': identifier.toString()}
                })
            }
            return null
        }, checkDocument: function (doc, meta) {
            if (doc.isValid()) {
                return true
            }
            return doc.verify(meta.getPublicKey())
        }
    });
    sdk.cpu.CustomizedContentHandler = Interface(null, null);
    var CustomizedContentHandler = sdk.cpu.CustomizedContentHandler;
    CustomizedContentHandler.prototype.handleAction = function (act, sender, content, rMsg) {
    };
    sdk.cpu.BaseCustomizedHandler = function (facebook, messenger) {
        TwinsHelper.call(this, facebook, messenger)
    };
    var BaseCustomizedHandler = sdk.cpu.BaseCustomizedHandler;
    Class(BaseCustomizedHandler, TwinsHelper, [CustomizedContentHandler]);
    BaseCustomizedHandler.prototype.handleAction = function (act, sender, content, rMsg) {
        var app = content.getApplication();
        var mod = content.getModule();
        var text = 'Content not support.';
        return this.respondReceipt(text, rMsg.getEnvelope(), content, {
            'template': 'Customized content (app: ${app}, mod: ${mod}, act: ${act}) not support yet!',
            'replacements': {'app': app, 'mod': mod, 'act': act}
        })
    };
    BaseCustomizedHandler.prototype.respondReceipt = function (text, envelope, content, extra) {
        return [BaseContentProcessor.createReceipt(text, envelope, content, extra)]
    };
    sdk.cpu.CustomizedContentProcessor = function (facebook, messenger) {
        BaseContentProcessor.call(this, facebook, messenger);
        this.__defaultHandler = this.createDefaultHandler(facebook, messenger)
    };
    var CustomizedContentProcessor = sdk.cpu.CustomizedContentProcessor;
    Class(CustomizedContentProcessor, BaseContentProcessor, [CustomizedContentHandler]);
    CustomizedContentProcessor.prototype.createDefaultHandler = function (facebook, messenger) {
        return new BaseCustomizedHandler(facebook, messenger)
    };
    CustomizedContentProcessor.prototype.getDefaultHandler = function () {
        return this.__defaultHandler
    };
    CustomizedContentProcessor.prototype.processContent = function (content, rMsg) {
        var app = content.getApplication();
        var mod = content.getModule();
        var handler = this.filter(app, mod, content, rMsg);
        var act = content.getAction();
        var sender = rMsg.getSender();
        return handler.handleAction(act, sender, content, rMsg)
    };
    CustomizedContentProcessor.prototype.filter = function (app, mod, content, rMsg) {
        return this.getDefaultHandler()
    };
    sdk.cpu.BaseContentProcessorCreator = function (facebook, messenger) {
        TwinsHelper.call(this, facebook, messenger)
    };
    var BaseContentProcessorCreator = sdk.cpu.BaseContentProcessorCreator;
    Class(BaseContentProcessorCreator, TwinsHelper, [ContentProcessorCreator]);
    Implementation(BaseContentProcessorCreator, {
        createContentProcessor: function (type) {
            var facebook = this.getFacebook();
            var messenger = this.getMessenger();
            switch (type) {
                case ContentType.FORWARD:
                case'forward':
                    return ForwardContentProcessor(facebook, messenger);
                case ContentType.ARRAY:
                case'array':
                    return ArrayContentProcessor(facebook, messenger);
                case ContentType.COMMAND:
                case'command':
                    return new BaseCommandProcessor(facebook, messenger);
                case ContentType.ANY:
                case'*':
                    return new BaseContentProcessor(facebook, messenger)
            }
            return null
        }, createCommandProcessor: function (type, cmd) {
            var facebook = this.getFacebook();
            var messenger = this.getMessenger();
            switch (cmd) {
                case Command.META:
                    return new MetaCommandProcessor(facebook, messenger);
                case Command.DOCUMENTS:
                    return new DocumentCommandProcessor(facebook, messenger)
            }
            return null
        }
    })
})(DIMP, DIMP, DIMP, DIMP);
