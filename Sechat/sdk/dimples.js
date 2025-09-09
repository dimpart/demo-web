/**
 *  DIM Library (v2.0.0)
 *  (DIMP: Decentralized Instant Messaging Protocol)
 *
 * @author    moKy <albert.moky at gmail.com>
 * @date      Sep. 1, 2025
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
(function (sdk) {
    if (typeof sdk.fsm !== 'object') {
        sdk.fsm = {}
    }
    if (typeof sdk.network !== 'object') {
        sdk.network = {}
    }
    var FiniteStateMachine = sdk.fsm;
    var StarTrek = sdk.network;
    var MONKEY = sdk;
    if (typeof FiniteStateMachine !== 'object') {
        FiniteStateMachine = {}
    }
    (function (fsm, mk) {
        if (typeof fsm.type !== 'object') {
            fsm.type = {}
        }
        if (typeof fsm.skywalker !== 'object') {
            fsm.skywalker = {}
        }
        if (typeof fsm.threading !== 'object') {
            fsm.threading = {}
        }
        var Interface = mk.type.Interface;
        var Class = mk.type.Class;
        var Implementation = mk.type.Implementation;
        var Converter = mk.type.Converter;
        var BaseObject = mk.type.BaseObject;
        var HashSet = mk.type.HashSet;
        var Enum = mk.type.Enum;
        var MILLISECONDS_PER_SECOND = 1000;
        var SECONDS_PER_MINUTE = 60;
        var MINUTES_PER_HOUR = 60;
        var HOURS_PER_DAY = 24;
        var MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
        var MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
        var MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * HOURS_PER_DAY;
        fsm.type.Duration = function (duration) {
            var days = Converter.getInt(duration['days'], 0);
            var hours = Converter.getInt(duration['hours'], 0);
            var minutes = Converter.getInt(duration['minutes'], 0);
            var seconds = Converter.getInt(duration['seconds'], 0);
            var milliseconds = Converter.getInt(duration['milliseconds'], 0);
            this.__millis = milliseconds + MILLISECONDS_PER_SECOND * seconds + MILLISECONDS_PER_MINUTE * minutes + MILLISECONDS_PER_HOUR * hours + MILLISECONDS_PER_DAY * days
        };
        var Duration = fsm.type.Duration;
        Duration.prototype.inMilliseconds = function () {
            return this.__millis
        };
        Duration.prototype.equals = function (other) {
            return this.__millis === get_millis(other)
        };
        Duration.prototype.shorterThan = function (other) {
            return this.__millis < get_millis(other)
        };
        Duration.prototype.longerThan = function (other) {
            return this.__millis > get_millis(other)
        };
        Duration.prototype.shorterOrEqual = function (other) {
            return this.__millis <= get_millis(other)
        };
        Duration.prototype.longerOrEqual = function (other) {
            return this.__millis >= get_millis(other)
        };
        Duration.prototype.abs = function () {
            return create_duration(Math.abs(this.__millis))
        };
        Duration.prototype.negated = function () {
            return create_duration(0 - this.__millis)
        };
        Duration.prototype.isNegative = function () {
            return this.__millis < 0
        };
        Duration.prototype.isPositive = function () {
            return this.__millis > 0
        };
        Duration.prototype.isZero = function () {
            return this.__millis === 0
        };
        Duration.prototype.adds = function (other) {
            return create_duration(this.__millis + get_millis(other))
        };
        Duration.prototype.subtracts = function (other) {
            return create_duration(this.__millis - get_millis(other))
        };
        Duration.prototype.multiplies = function (factor) {
            return create_duration(Math.round(this.__millis * factor))
        };
        Duration.prototype.divides = function (quotient) {
            return create_duration(Math.floor(this.__millis / quotient))
        };
        var get_millis = function (duration) {
            if (Interface.conforms(duration, Duration)) {
                return duration.inMilliseconds()
            } else {
                return Converter.getInt(duration, 0)
            }
        };
        var create_duration = function (millis) {
            return new Duration({'milliseconds': millis})
        };
        Duration.ofMilliseconds = function (millis) {
            return create_duration(millis * 1)
        };
        Duration.ofSeconds = function (seconds) {
            return create_duration(MILLISECONDS_PER_SECOND * seconds)
        };
        Duration.ofMinutes = function (minutes) {
            return create_duration(MILLISECONDS_PER_MINUTE * minutes)
        };
        Duration.ofHours = function (hours) {
            return create_duration(MILLISECONDS_PER_HOUR * hours)
        };
        Duration.ofDays = function (days) {
            return create_duration(MILLISECONDS_PER_DAY * days)
        };
        Duration.between = function (startTime, endTime) {
            return create_duration(endTime.getTime() - startTime.getTime())
        };
        Duration.prototype.addTo = function (time) {
            return new Date(time.getTime() + this.__millis)
        };
        Duration.prototype.subtractFrom = function (time) {
            return new Date(time.getTime() - this.__millis)
        };
        fsm.skywalker.Handler = Interface(null, null);
        var Handler = fsm.skywalker.Handler;
        Handler.prototype.setup = function () {
        };
        Handler.prototype.handle = function () {
        };
        Handler.prototype.finish = function () {
        };
        fsm.skywalker.Processor = Interface(null, null);
        var Processor = fsm.skywalker.Processor;
        Processor.prototype.process = function () {
        };
        fsm.skywalker.Runnable = Interface(null, null);
        var Runnable = fsm.skywalker.Runnable;
        Runnable.prototype.run = function () {
        };
        var STAGE_INIT = 0;
        var STAGE_HANDLING = 1;
        var STAGE_CLEANING = 2;
        var STAGE_STOPPED = 3;
        fsm.skywalker.Runner = function () {
            BaseObject.call(this);
            this.__running = false;
            this.__stage = STAGE_INIT
        };
        var Runner = fsm.skywalker.Runner;
        Class(Runner, BaseObject, [Runnable, Handler, Processor]);
        Implementation(Runner, {
            run: function () {
                if (this.__stage === STAGE_INIT) {
                    if (this.setup()) {
                        return true
                    }
                    this.__stage = STAGE_HANDLING
                }
                if (this.__stage === STAGE_HANDLING) {
                    try {
                        if (this.handle()) {
                            return true
                        }
                    } catch (e) {
                    }
                    this.__stage = STAGE_CLEANING
                }
                if (this.__stage === STAGE_CLEANING) {
                    if (this.finish()) {
                        return true
                    }
                    this.__stage = STAGE_STOPPED
                }
                return false
            }, setup: function () {
                this.__running = true;
                return false
            }, handle: function () {
                while (this.isRunning()) {
                    if (this.process()) {
                    } else {
                        return true
                    }
                }
                return false
            }, finish: function () {
                return false
            }
        });
        Runner.prototype.isRunning = function () {
            return this.__running
        };
        Runner.prototype.stop = function () {
            this.__running = false
        };
        fsm.threading.Ticker = Interface(null, null);
        var Ticker = fsm.threading.Ticker;
        Ticker.prototype.tick = function (now, elapsed) {
        };
        fsm.threading.Thread = function () {
            BaseObject.call(this);
            if (arguments.length === 0) {
                this.__target = null
            } else {
                this.__target = arguments[0]
            }
            this.__running = false
        };
        var Thread = fsm.threading.Thread;
        Class(Thread, BaseObject, [Runnable]);
        Thread.INTERVAL = Duration.ofMilliseconds(256);
        Thread.prototype.start = function () {
            this.__running = true;
            thr_run(this)
        };
        var thr_run = function (thread) {
            var running = thread.isRunning() && thread.run();
            if (running) {
                var interval = Thread.INTERVAL.inMilliseconds();
                setTimeout(function () {
                    thr_run(thread)
                }, interval)
            }
        };
        Thread.prototype.isRunning = function () {
            return this.__running
        };
        Thread.prototype.run = function () {
            var target = this.__target;
            if (!target || target === this) {
                throw new SyntaxError('Thread::run() > override me!');
            } else if (typeof target === 'function') {
                return target()
            } else if (Interface.conforms(target, Runnable)) {
                return target.run()
            } else {
                throw new SyntaxError('Thread::run() > target is not runnable: ' + target);
            }
        };
        Thread.prototype.stop = function () {
            this.__running = false
        };
        fsm.threading.Metronome = function (interval) {
            Runner.call(this);
            if (!interval || interval.shorterThan(Metronome.MIN_INTERVAL)) {
                interval = Metronome.MIN_INTERVAL
            }
            this.__interval = interval;
            this.__last_time = null;
            this.__thread = new Thread(this);
            this.__tickers = new HashSet()
        };
        var Metronome = fsm.threading.Metronome;
        Class(Metronome, Runner, null);
        Metronome.MIN_INTERVAL = Duration.ofMilliseconds(100);
        Metronome.prototype.start = function () {
            this.__thread.start()
        };
        Metronome.prototype.stop = function () {
            this.__thread.stop()
        };
        Metronome.prototype.setup = function () {
            this.__last_time = new Date();
            return Runner.prototype.setup.call(this)
        };
        Metronome.prototype.process = function () {
            var tickers = this.getTickers();
            if (tickers.length === 0) {
                return false
            }
            var now = new Date();
            var elapsed = Duration.between(this.__last_time, now);
            if (elapsed.shorterThan(this.__interval)) {
                return false
            }
            for (var i = tickers.length - 1; i >= 0; --i) {
                try {
                    tickers[i].tick(now, elapsed)
                } catch (e) {
                }
            }
            this.__last_time = now;
            return true
        };
        Metronome.prototype.getTickers = function () {
            return this.__tickers.toArray()
        };
        Metronome.prototype.addTicker = function (ticker) {
            return this.__tickers.add(ticker)
        };
        Metronome.prototype.removeTicker = function (ticker) {
            return this.__tickers.remove(ticker)
        };
        fsm.threading.PrimeMetronome = {
            addTicker: function (ticker) {
                var metronome = this.getInstance();
                return metronome.addTicker(ticker)
            }, removeTicker: function (ticker) {
                var metronome = this.getInstance();
                return metronome.removeTicker(ticker)
            }, getInstance: function () {
                var metronome = sharedMetronome;
                if (metronome === null) {
                    var interval = Duration.ofMilliseconds(200);
                    metronome = new Metronome(interval);
                    metronome.start();
                    sharedMetronome = metronome
                }
                return metronome
            }
        };
        var PrimeMetronome = fsm.threading.PrimeMetronome;
        var sharedMetronome = null;
        fsm.Context = Interface(null, null);
        var Context = fsm.Context;
        fsm.Transition = Interface(null, null);
        var Transition = fsm.Transition;
        Transition.prototype.evaluate = function (ctx, now) {
        };
        fsm.State = Interface(null, null);
        var State = fsm.State;
        State.prototype.evaluate = function (ctx, now) {
        };
        State.prototype.onEnter = function (previous, ctx, now) {
        };
        State.prototype.onExit = function (next, ctx, now) {
        };
        State.prototype.onPause = function (ctx, now) {
        };
        State.prototype.onResume = function (ctx, now) {
        };
        fsm.Delegate = Interface(null, null);
        var Delegate = fsm.Delegate;
        Delegate.prototype.enterState = function (next, ctx, now) {
        };
        Delegate.prototype.exitState = function (previous, ctx, now) {
        };
        Delegate.prototype.pauseState = function (current, ctx, now) {
        };
        Delegate.prototype.resumeState = function (current, ctx, now) {
        };
        fsm.Machine = Interface(null, [Ticker]);
        var Machine = fsm.Machine;
        Machine.prototype.getCurrentState = function () {
        };
        Machine.prototype.start = function () {
        };
        Machine.prototype.stop = function () {
        };
        Machine.prototype.pause = function () {
        };
        Machine.prototype.resume = function () {
        };
        fsm.BaseTransition = function (target) {
            BaseObject.call(this);
            this.__target = target
        };
        var BaseTransition = fsm.BaseTransition;
        Class(BaseTransition, BaseObject, [Transition]);
        BaseTransition.prototype.getTarget = function () {
            return this.__target
        };
        fsm.BaseState = function (index) {
            BaseObject.call(this);
            this.__index = index;
            this.__transitions = []
        };
        var BaseState = fsm.BaseState;
        Class(BaseState, BaseObject, [State]);
        Implementation(BaseState, {
            equals: function (other) {
                if (other instanceof BaseState) {
                    if (other === this) {
                        return true
                    }
                    other = other.getIndex()
                } else if (Enum.isEnum(other)) {
                    other = other.getValue()
                }
                return this.__index === other
            }, toString: function () {
                var clazz = this.getClassName();
                var index = this.getIndex();
                return '<' + clazz + ' index=' + index + ' />'
            }, valueOf: function () {
                return this.__index
            }
        });
        BaseState.prototype.getIndex = function () {
            return this.__index
        };
        BaseState.prototype.addTransition = function (transition) {
            if (this.__transitions.indexOf(transition) >= 0) {
                throw new ReferenceError('transition exists: ' + transition);
            }
            this.__transitions.push(transition)
        };
        BaseState.prototype.evaluate = function (ctx, now) {
            var transition;
            for (var index = 0; index < this.__transitions.length; ++index) {
                transition = this.__transitions[index];
                if (transition.evaluate(ctx, now)) {
                    return transition
                }
            }
        };
        var Status = Enum('MachineStatus', {STOPPED: 0, RUNNING: 1, PAUSED: 2});
        fsm.BaseMachine = function () {
            BaseObject.call(this);
            this.__states = [];
            this.__current = -1;
            this.__status = Status.STOPPED;
            this.__delegate = null
        };
        var BaseMachine = fsm.BaseMachine;
        Class(BaseMachine, BaseObject, [Machine]);
        BaseMachine.prototype.setDelegate = function (delegate) {
            this.__delegate = delegate
        };
        BaseMachine.prototype.getDelegate = function () {
            return this.__delegate
        };
        BaseMachine.prototype.getContext = function () {
        };
        BaseMachine.prototype.addState = function (newState) {
            var index = newState.getIndex();
            if (index < this.__states.length) {
                var old = this.__states[index];
                this.__states[index] = newState;
                return old
            }
            var spaces = index - this.__states.length;
            for (var i = 0; i < spaces; ++i) {
                this.__states.push(null)
            }
            this.__states.push(newState);
            return null
        };
        BaseMachine.prototype.getState = function (index) {
            return this.__states[index]
        };
        BaseMachine.prototype.getDefaultState = function () {
            if (this.__states.length === 0) {
                throw new ReferenceError('states empty');
            }
            return this.__states[0]
        };
        BaseMachine.prototype.getTargetState = function (transition) {
            var index = transition.getTarget();
            return this.__states[index]
        };
        BaseMachine.prototype.getCurrentState = function () {
            var index = this.__current;
            return index < 0 ? null : this.__states[index]
        };
        BaseMachine.prototype.setCurrentState = function (state) {
            this.__current = !state ? -1 : state.getIndex()
        };
        BaseMachine.prototype.changeState = function (newState, now) {
            var oldState = this.getCurrentState();
            if (!oldState) {
                if (!newState) {
                    return false
                }
            } else if (oldState === newState) {
                return false
            }
            var ctx = this.getContext();
            var delegate = this.getDelegate();
            if (delegate) {
                delegate.enterState(newState, ctx, now)
            }
            if (oldState) {
                oldState.onExit(newState, ctx, now)
            }
            this.setCurrentState(newState);
            if (newState) {
                newState.onEnter(oldState, ctx, now)
            }
            if (delegate) {
                delegate.exitState(oldState, ctx, now)
            }
            return true
        };
        BaseMachine.prototype.start = function () {
            if (this.__status !== Status.STOPPED) {
                return false
            }
            var now = new Date();
            var ok = this.changeState(this.getDefaultState(), now);
            this.__status = Status.RUNNING;
            return ok
        };
        BaseMachine.prototype.stop = function () {
            if (this.__status === Status.STOPPED) {
                return false
            }
            this.__status = Status.STOPPED;
            var now = new Date();
            this.changeState(null, now)
        };
        BaseMachine.prototype.pause = function () {
            if (this.__status !== Status.RUNNING) {
                return false
            }
            var now = new Date();
            var ctx = this.getContext();
            var current = this.getCurrentState();
            if (current) {
                current.onPause(ctx, now)
            }
            this.__status = Status.PAUSED;
            var delegate = this.getDelegate();
            if (delegate) {
                delegate.pauseState(current, ctx, now)
            }
            return true
        };
        BaseMachine.prototype.resume = function () {
            if (this.__status !== Status.PAUSED) {
                return false
            }
            var now = new Date();
            var ctx = this.getContext();
            var current = this.getCurrentState();
            var delegate = this.getDelegate();
            if (delegate) {
                delegate.resumeState(current, ctx, now)
            }
            this.__status = Status.RUNNING;
            if (current) {
                current.onResume(ctx, now)
            }
            return true
        };
        BaseMachine.prototype.tick = function (now, elapsed) {
            if (this.__status !== Status.RUNNING) {
                return
            }
            var current = this.getCurrentState();
            if (current) {
                var machine = this.getContext();
                var transition = current.evaluate(machine, now);
                if (transition) {
                    var next = this.getTargetState(transition);
                    this.changeState(next, now)
                }
            }
        };
        fsm.AutoMachine = function () {
            BaseMachine.call(this)
        };
        var AutoMachine = fsm.AutoMachine;
        Class(AutoMachine, BaseMachine, null);
        Implementation(AutoMachine, {
            start: function () {
                var ok = BaseMachine.prototype.start.call(this);
                var timer = PrimeMetronome.getInstance();
                timer.addTicker(this);
                return ok
            }, stop: function () {
                var timer = PrimeMetronome.getInstance();
                timer.removeTicker(this);
                return BaseMachine.prototype.stop.call(this)
            }, pause: function () {
                var timer = PrimeMetronome.getInstance();
                timer.removeTicker(this);
                return BaseMachine.prototype.pause.call(this)
            }, resume: function () {
                var ok = BaseMachine.prototype.resume.call(this);
                var timer = PrimeMetronome.getInstance();
                timer.addTicker(this);
                return ok
            }
        })
    })(FiniteStateMachine, MONKEY);
    if (typeof StarTrek !== 'object') {
        StarTrek = {}
    }
    (function (st, fsm, mk) {
        if (typeof st.type !== 'object') {
            st.type = {}
        }
        if (typeof st.net !== 'object') {
            st.net = {}
        }
        if (typeof st.port !== 'object') {
            st.port = {}
        }
        if (typeof st.socket !== 'object') {
            st.socket = {}
        }
        var Interface = mk.type.Interface;
        var Class = mk.type.Class;
        var Implementation = mk.type.Implementation;
        var IObject = mk.type.Object;
        var BaseObject = mk.type.BaseObject;
        var HashSet = mk.type.HashSet;
        var Enum = mk.type.Enum;
        var Arrays = mk.type.Arrays;
        var Mapper = mk.type.Mapper;
        var Stringer = mk.type.Stringer;
        var ConstantString = mk.type.ConstantString;
        var Duration = fsm.type.Duration;
        var Processor = fsm.skywalker.Processor;
        var Runnable = fsm.skywalker.Runnable;
        var Thread = fsm.threading.Thread;
        var Ticker = fsm.threading.Ticker;
        var Context = fsm.Context;
        var BaseMachine = fsm.BaseMachine;
        var BaseState = fsm.BaseState;
        var BaseTransition = fsm.BaseTransition;
        st.type.SocketAddress = Interface(null, [Stringer]);
        var SocketAddress = st.type.SocketAddress;
        SocketAddress.prototype.getHost = function () {
        };
        SocketAddress.prototype.getPort = function () {
        };
        st.type.InetSocketAddress = function (host, port) {
            ConstantString.call(this, '(' + host + ':' + port + ')');
            this.__host = host;
            this.__port = port
        };
        var InetSocketAddress = st.type.InetSocketAddress
        Class(InetSocketAddress, ConstantString, [SocketAddress]);
        InetSocketAddress.prototype.getHost = function () {
            return this.__host
        };
        InetSocketAddress.prototype.getPort = function () {
            return this.__port
        };
        st.type.AnyAddress = new InetSocketAddress('0.0.0.0', 0);
        var AnyAddress = st.type.AnyAddress;
        st.type.PairMap = Interface(null, null);
        var PairMap = st.type.PairMap;
        PairMap.prototype.items = function () {
        };
        PairMap.prototype.get = function (remote, local) {
        };
        PairMap.prototype.set = function (remote, local, value) {
        };
        PairMap.prototype.remove = function (remote, local, value) {
        };
        st.type.AbstractPairMap = function (any) {
            BaseObject.call(this);
            this.__default = any;
            this.__map = {}
        };
        var AbstractPairMap = st.type.AbstractPairMap;
        Class(AbstractPairMap, BaseObject, [PairMap]);
        AbstractPairMap.prototype.get = function (remote, local) {
            var key_pair = get_pair_keys(remote, local, null);
            var key1 = key_pair[0];
            var key2 = key_pair[1];
            var table = this.__map[key1];
            if (!table) {
                return null
            }
            var value;
            if (key2) {
                value = table[key2];
                if (value) {
                    return value
                }
                return table[this.__default]
            }
            value = table[this.__default];
            if (value) {
                return value
            }
            Mapper.forEach(table, function (address, conn) {
                if (conn) {
                    value = conn;
                    return true
                } else {
                    return false
                }
            });
            return value
        };
        AbstractPairMap.prototype.set = function (remote, local, value) {
            var key_pair = get_pair_keys(remote, local, this.__default);
            var key1 = key_pair[0];
            var key2 = key_pair[1];
            var table = this.__map[key1];
            var old = null;
            if (table) {
                old = table[key2];
                if (value) {
                    table[key2] = value
                } else if (old) {
                    delete table[key2]
                }
            } else if (value) {
                table = {};
                table[key2] = value;
                this.__map[key1] = table
            }
            return old
        };
        AbstractPairMap.prototype.remove = function (remote, local, value) {
            var key_pair = get_pair_keys(remote, local, this.__default);
            var key1 = key_pair[0];
            var key2 = key_pair[1];
            var table = this.__map[key1];
            if (!table) {
                return null
            }
            var old = table[key2];
            if (old) {
                delete table[key2];
                if (Mapper.isEmpty(table)) {
                    delete this.__map[key1]
                }
            }
            return old ? old : value
        };
        var get_pair_keys = function (remote, local, any) {
            if (!remote) {
                return [local, any]
            } else if (!local) {
                return [remote, any]
            } else {
                return [remote, local]
            }
        };
        st.type.HashPairMap = function (any) {
            AbstractPairMap.call(this, any);
            this.__items = new HashSet()
        };
        var HashPairMap = st.type.HashPairMap;
        Class(HashPairMap, AbstractPairMap, null);
        HashPairMap.prototype.items = function () {
            return this.__items.toArray()
        };
        HashPairMap.prototype.set = function (remote, local, value) {
            if (value) {
                this.__items.remove(value);
                this.__items.add(value)
            }
            var old = AbstractPairMap.prototype.set.call(this, remote, local, value);
            if (old && !object_equals(old, value)) {
                this.__items.remove(old)
            }
            return old
        };
        HashPairMap.prototype.remove = function (remote, local, value) {
            var old = AbstractPairMap.prototype.remove.call(this, remote, local, value);
            if (old) {
                this.__items.remove(old)
            }
            if (value && !object_equals(value, old)) {
                this.__items.remove(value)
            }
            return old ? old : value
        };
        var object_equals = function (a, b) {
            if (!a) {
                return !b
            } else if (!b) {
                return false
            } else if (a === b) {
                return true
            } else if (Interface.conforms(a, IObject)) {
                return a.equals(b)
            } else if (Interface.conforms(b, IObject)) {
                return b.equals(a)
            } else {
                return false
            }
        };
        st.type.AddressPairMap = function () {
            HashPairMap.call(this, AnyAddress)
        };
        var AddressPairMap = st.type.AddressPairMap;
        Class(AddressPairMap, HashPairMap, null);
        st.type.AddressPairObject = function (remote, local) {
            BaseObject.call(this);
            this.remoteAddress = remote;
            this.localAddress = local
        };
        var AddressPairObject = st.type.AddressPairObject;
        Class(AddressPairObject, BaseObject, null);
        AddressPairObject.prototype.getRemoteAddress = function () {
            return this.remoteAddress
        };
        AddressPairObject.prototype.getLocalAddress = function () {
            return this.localAddress
        };
        AddressPairObject.prototype.equals = function (other) {
            if (!other) {
                return this.isEmpty()
            } else if (other === this) {
                return true
            } else if (other instanceof AddressPairObject) {
                return address_equals(other.getRemoteAddress(), this.remoteAddress) && address_equals(other.getLocalAddress(), this.localAddress)
            } else {
                return false
            }
        };
        AddressPairObject.prototype.isEmpty = function () {
            return !(this.remoteAddress || this.localAddress)
        };
        AddressPairObject.prototype.valueOf = function () {
            return this.toString()
        };
        AddressPairObject.prototype.toString = function () {
            var cname = this.getClassName();
            var remote = this.getRemoteAddress();
            var local = this.getLocalAddress();
            if (remote) {
                remote = remote.toString()
            }
            if (local) {
                local = local.toString()
            }
            return '<' + cname + ' remote="' + remote + '" local="' + local + '" />'
        };
        var address_equals = function (a, b) {
            if (!a) {
                return !b
            } else if (!b) {
                return false
            } else if (a === b) {
                return true
            } else {
                return a.equals(b)
            }
        };
        st.net.SocketHelper = {
            socketGetLocalAddress: function (sock) {
                return sock.getRemoteAddress()
            }, socketGetRemoteAddress: function (sock) {
                return sock.getLocalAddress()
            }, socketIsBlocking: function (sock) {
                return sock.isBlocking()
            }, socketIsConnected: function (sock) {
                return sock.isConnected()
            }, socketIsBound: function (sock) {
                return sock.isBound()
            }, socketIsClosed: function (sock) {
                return !sock.isOpen()
            }, socketIsAvailable: function (sock) {
                return sock.isAlive()
            }, socketIsVacant: function (sock) {
                return sock.isAlive()
            }, socketSend: function (sock, data) {
                return sock.write(data)
            }, socketReceive: function (sock, maxLen) {
                return sock.read(maxLen)
            }, socketBind: function (sock, local) {
                return sock.bind(local)
            }, socketConnect: function (sock, remote) {
                return sock.connect(remote)
            }, socketDisconnect: function (sock) {
                return sock.close()
            }
        };
        var SocketHelper = st.net.SocketHelper;
        st.net.ChannelStateOrder = Enum('ChannelStatus', {INIT: 0, OPEN: 1, ALIVE: 2, CLOSED: 3});
        var ChannelStateOrder = st.net.ChannelStateOrder;
        st.net.Channel = Interface(null, null);
        var Channel = st.net.Channel;
        Channel.prototype.getStatus = function () {
        };
        Channel.prototype.isOpen = function () {
        };
        Channel.prototype.isBound = function () {
        };
        Channel.prototype.isAlive = function () {
        };
        Channel.prototype.isAvailable = function () {
        };
        Channel.prototype.isVacant = function () {
        };
        Channel.prototype.close = function () {
        };
        Channel.prototype.read = function (maxLen) {
        };
        Channel.prototype.write = function (src) {
        };
        Channel.prototype.configureBlocking = function (block) {
        };
        Channel.prototype.isBlocking = function () {
        };
        Channel.prototype.bind = function (local) {
        };
        Channel.prototype.getLocalAddress = function () {
        };
        Channel.prototype.isConnected = function () {
        };
        Channel.prototype.connect = function (remote) {
        };
        Channel.prototype.getRemoteAddress = function () {
        };
        Channel.prototype.disconnect = function () {
        };
        Channel.prototype.receive = function (maxLen) {
        };
        Channel.prototype.send = function (src, target) {
        };
        st.net.ConnectionStateOrder = Enum('ConnectionStatus', {
            DEFAULT: 0,
            PREPARING: 1,
            READY: 2,
            MAINTAINING: 3,
            EXPIRED: 4,
            ERROR: 5
        });
        var ConnectionStateOrder = st.net.ConnectionStateOrder;
        st.net.ConnectionState = function (order) {
            BaseState.call(this, Enum.getInt(order));
            this.__name = order.getName();
            this.__enterTime = null
        };
        var ConnectionState = st.net.ConnectionState;
        Class(ConnectionState, BaseState, null);
        Implementation(ConnectionState, {
            getName: function () {
                return this.__name
            }, getEnterTime: function () {
                return this.__enterTime
            }, toString: function () {
                return this.__name
            }, valueOf: function () {
                return this.__name
            }, equals: function (other) {
                if (other instanceof ConnectionState) {
                    if (other === this) {
                        return true
                    }
                    other = other.getIndex()
                } else if (other instanceof ConnectionStateOrder) {
                    other = other.getValue()
                }
                return this.getIndex() === other
            }
        });
        ConnectionState.prototype.onEnter = function (previous, ctx, now) {
            this.__enterTime = now
        };
        ConnectionState.prototype.onExit = function (next, ctx, now) {
            this.__enterTime = null
        };
        ConnectionState.prototype.onPause = function (ctx, now) {
        };
        ConnectionState.prototype.onResume = function (ctx, now) {
        };
        ConnectionState.Delegate = fsm.Delegate;
        st.net.ConnectionStateBuilder = function (transitionBuilder) {
            BaseObject.call(this);
            this.builder = transitionBuilder
        };
        var StateBuilder = st.net.ConnectionStateBuilder;
        Class(StateBuilder, BaseObject, null);
        Implementation(StateBuilder, {
            getDefaultState: function () {
                var state = new ConnectionState(ConnectionStateOrder.DEFAULT);
                state.addTransition(this.builder.getDefaultPreparingTransition());
                return state
            }, getPreparingState: function () {
                var state = new ConnectionState(ConnectionStateOrder.PREPARING);
                state.addTransition(this.builder.getPreparingReadyTransition());
                state.addTransition(this.builder.getPreparingDefaultTransition());
                return state
            }, getReadyState: function () {
                var state = new ConnectionState(ConnectionStateOrder.READY);
                state.addTransition(this.builder.getReadyExpiredTransition());
                state.addTransition(this.builder.getReadyErrorTransition());
                return state
            }, getExpiredState: function () {
                var state = new ConnectionState(ConnectionStateOrder.EXPIRED);
                state.addTransition(this.builder.getExpiredMaintainingTransition());
                state.addTransition(this.builder.getExpiredErrorTransition());
                return state
            }, getMaintainingState: function () {
                var state = new ConnectionState(ConnectionStateOrder.MAINTAINING);
                state.addTransition(this.builder.getMaintainingReadyTransition());
                state.addTransition(this.builder.getMaintainingExpiredTransition());
                state.addTransition(this.builder.getMaintainingErrorTransition());
                return state
            }, getErrorState: function () {
                var state = new ConnectionState(ConnectionStateOrder.ERROR);
                state.addTransition(this.builder.getErrorDefaultTransition());
                return state
            }
        });
        st.net.ConnectionStateTransition = function (order, evaluate) {
            BaseTransition.call(this, Enum.getInt(order));
            this.__evaluate = evaluate
        };
        var StateTransition = st.net.ConnectionStateTransition;
        Class(StateTransition, BaseTransition, null);
        StateTransition.prototype.evaluate = function (ctx, now) {
            return this.__evaluate.call(this, ctx, now)
        };
        st.net.ConnectionStateTransitionBuilder = function () {
            BaseObject.call(this)
        };
        var TransitionBuilder = st.net.ConnectionStateTransitionBuilder;
        Class(TransitionBuilder, BaseObject, null);
        Implementation(TransitionBuilder, {
            getDefaultPreparingTransition: function () {
                return new StateTransition(ConnectionStateOrder.PREPARING, function (ctx, now) {
                    var conn = ctx.getConnection();
                    return conn && conn.isOpen()
                })
            }, getPreparingReadyTransition: function () {
                return new StateTransition(ConnectionStateOrder.READY, function (ctx, now) {
                    var conn = ctx.getConnection();
                    return conn && conn.isAlive()
                })
            }, getPreparingDefaultTransition: function () {
                return new StateTransition(ConnectionStateOrder.DEFAULT, function (ctx, now) {
                    var conn = ctx.getConnection();
                    return !(conn && conn.isOpen())
                })
            }, getReadyExpiredTransition: function () {
                return new StateTransition(ConnectionStateOrder.EXPIRED, function (ctx, now) {
                    var conn = ctx.getConnection();
                    if (!(conn && conn.isAlive())) {
                        return false
                    }
                    return !conn.isReceivedRecently(now)
                })
            }, getReadyErrorTransition: function () {
                return new StateTransition(ConnectionStateOrder.ERROR, function (ctx, now) {
                    var conn = ctx.getConnection();
                    return !(conn && conn.isAlive())
                })
            }, getExpiredMaintainingTransition: function () {
                return new StateTransition(ConnectionStateOrder.MAINTAINING, function (ctx, now) {
                    var conn = ctx.getConnection();
                    if (!(conn && conn.isAlive())) {
                        return false
                    }
                    return conn.isSentRecently(now)
                })
            }, getExpiredErrorTransition: function () {
                return new StateTransition(ConnectionStateOrder.ERROR, function (ctx, now) {
                    var conn = ctx.getConnection();
                    if (!(conn && conn.isAlive())) {
                        return true
                    }
                    return conn.isNotReceivedLongTimeAgo(now)
                })
            }, getMaintainingReadyTransition: function () {
                return new StateTransition(ConnectionStateOrder.READY, function (ctx, now) {
                    var conn = ctx.getConnection();
                    if (!(conn && conn.isAlive())) {
                        return false
                    }
                    return conn.isReceivedRecently(now)
                })
            }, getMaintainingExpiredTransition: function () {
                return new StateTransition(ConnectionStateOrder.EXPIRED, function (ctx, now) {
                    var conn = ctx.getConnection();
                    if (!(conn && conn.isAlive())) {
                        return false
                    }
                    return !conn.isSentRecently(now)
                })
            }, getMaintainingErrorTransition: function () {
                return new StateTransition(ConnectionStateOrder.ERROR, function (ctx, now) {
                    var conn = ctx.getConnection();
                    if (!(conn && conn.isAlive())) {
                        return true
                    }
                    return conn.isNotReceivedLongTimeAgo(now)
                })
            }, getErrorDefaultTransition: function () {
                return new StateTransition(ConnectionStateOrder.DEFAULT, function (ctx, now) {
                    var conn = ctx.getConnection();
                    if (!(conn && conn.isAlive())) {
                        return false
                    }
                    var current = ctx.getCurrentState();
                    var enter = current.getEnterTime();
                    if (!enter) {
                        return true
                    }
                    var last = conn.getLastReceivedTime();
                    return last && enter.getTime() < last.getTime()
                })
            }
        });
        st.net.ConnectionStateMachine = function (connection) {
            BaseMachine.call(this);
            this.__connection = connection;
            var builder = this.createStateBuilder();
            this.addState(builder.getDefaultState());
            this.addState(builder.getPreparingState());
            this.addState(builder.getReadyState());
            this.addState(builder.getExpiredState());
            this.addState(builder.getMaintainingState());
            this.addState(builder.getErrorState())
        };
        var StateMachine = st.net.ConnectionStateMachine;
        Class(StateMachine, BaseMachine, [Context]);
        StateMachine.prototype.createStateBuilder = function () {
            var stb = new TransitionBuilder();
            return new StateBuilder(stb)
        };
        StateMachine.prototype.getConnection = function () {
            return this.__connection
        };
        StateMachine.prototype.getContext = function () {
            return this
        };
        st.net.Connection = Interface(null, [Ticker]);
        var Connection = st.net.Connection;
        Connection.prototype.isOpen = function () {
        };
        Connection.prototype.isBound = function () {
        };
        Connection.prototype.isConnected = function () {
        };
        Connection.prototype.isAlive = function () {
        };
        Connection.prototype.isAvailable = function () {
        };
        Connection.prototype.isVacant = function () {
        };
        Connection.prototype.getLocalAddress = function () {
        };
        Connection.prototype.getRemoteAddress = function () {
        };
        Connection.prototype.getState = function () {
        };
        Connection.prototype.sendData = function (data) {
        };
        Connection.prototype.onReceivedData = function (data) {
        };
        Connection.prototype.close = function () {
        };
        st.net.ConnectionDelegate = Interface(null, null);
        var ConnectionDelegate = st.net.ConnectionDelegate;
        ConnectionDelegate.prototype.onConnectionStateChanged = function (previous, current, connection) {
        };
        ConnectionDelegate.prototype.onConnectionReceived = function (data, connection) {
        };
        ConnectionDelegate.prototype.onConnectionSent = function (sent, data, connection) {
        };
        ConnectionDelegate.prototype.onConnectionFailed = function (error, data, connection) {
        };
        ConnectionDelegate.prototype.onConnectionError = function (error, connection) {
        };
        st.net.TimedConnection = Interface(null, null);
        var TimedConnection = st.net.TimedConnection;
        TimedConnection.EXPIRES = Duration.ofSeconds(16);
        TimedConnection.prototype.getLastSentTime = function () {
        };
        TimedConnection.prototype.getLastReceivedTime = function () {
        };
        TimedConnection.prototype.isSentRecently = function (now) {
        };
        TimedConnection.prototype.isReceivedRecently = function (now) {
        };
        TimedConnection.prototype.isNotReceivedLongTimeAgo = function (now) {
        };
        st.net.Hub = Interface(null, [Processor]);
        var Hub = st.net.Hub;
        Hub.prototype.open = function (remote, local) {
        };
        Hub.prototype.connect = function (remote, local) {
        };
        st.port.ShipStatus = Enum('ShipStatus', {
            NEW: (0x00),
            WAITING: (0x01),
            TIMEOUT: (0x02),
            DONE: (0x03),
            FAILED: (0x04),
            ASSEMBLING: (0x10),
            EXPIRED: (0x11)
        });
        var ShipStatus = st.port.ShipStatus;
        st.port.Ship = Interface(null, null);
        var Ship = st.port.Ship;
        Ship.prototype.getSN = function () {
        };
        Ship.prototype.touch = function (now) {
        };
        Ship.prototype.getStatus = function (now) {
        };
        st.port.Arrival = Interface(null, [Ship]);
        var Arrival = st.port.Arrival;
        Arrival.prototype.assemble = function (income) {
        };
        st.port.Departure = Interface(null, [Ship]);
        var Departure = st.port.Departure;
        Departure.prototype.getPriority = function () {
        };
        Departure.prototype.getFragments = function () {
        };
        Departure.prototype.checkResponse = function (response) {
        };
        Departure.prototype.isImportant = function () {
        };
        Departure.Priority = {URGENT: -1, NORMAL: 0, SLOWER: 1};
        var DeparturePriority = Departure.Priority;
        st.port.Porter = Interface(null, [Processor]);
        var Porter = st.port.Porter;
        Porter.prototype.isOpen = function () {
        };
        Porter.prototype.isAlive = function () {
        };
        Porter.prototype.getStatus = function () {
        };
        Porter.prototype.getRemoteAddress = function () {
        };
        Porter.prototype.getLocalAddress = function () {
        };
        Porter.prototype.sendData = function (payload) {
        };
        Porter.prototype.sendShip = function (ship) {
        };
        Porter.prototype.processReceived = function (data) {
        };
        Porter.prototype.heartbeat = function () {
        };
        Porter.prototype.purge = function (now) {
        };
        Porter.prototype.close = function () {
        };
        st.port.PorterStatus = Enum('PorterStatus', {ERROR: -1, INIT: 0, PREPARING: 1, READY: 2});
        var PorterStatus = st.port.PorterStatus;
        PorterStatus.getStatus = function (state) {
            if (!state) {
                return PorterStatus.ERROR
            }
            var index = state.getIndex();
            if (ConnectionStateOrder.READY.equals(index) || ConnectionStateOrder.EXPIRED.equals(index) || ConnectionStateOrder.MAINTAINING.equals(index)) {
                return PorterStatus.READY
            } else if (ConnectionStateOrder.PREPARING.equals(index)) {
                return PorterStatus.PREPARING
            } else if (ConnectionStateOrder.ERROR.equals(index)) {
                return PorterStatus.ERROR
            } else {
                return PorterStatus.INIT
            }
        };
        st.port.PorterDelegate = Interface(null, null);
        var PorterDelegate = st.port.PorterDelegate;
        PorterDelegate.prototype.onPorterReceived = function (arrival, porter) {
        };
        PorterDelegate.prototype.onPorterSent = function (departure, porter) {
        };
        PorterDelegate.prototype.onPorterFailed = function (error, departure, porter) {
        };
        PorterDelegate.prototype.onPorterError = function (error, departure, porter) {
        };
        PorterDelegate.prototype.onPorterStatusChanged = function (previous, current, porter) {
        };
        st.port.Gate = Interface(null, [Processor]);
        var Gate = st.port.Gate;
        Gate.prototype.sendData = function (payload, remote, local) {
        };
        Gate.prototype.sendShip = function (outgo, remote, local) {
        };
        st.socket.BaseChannel = function (remote, local) {
            AddressPairObject.call(this, remote, local);
            this.__reader = this.createReader();
            this.__writer = this.createWriter();
            this.__sock = null;
            this.__closed = -1
        };
        var BaseChannel = st.socket.BaseChannel;
        Class(BaseChannel, AddressPairObject, [Channel]);
        Implementation(BaseChannel, {
            toString: function () {
                var clazz = this.getClassName();
                var remote = this.getRemoteAddress();
                var local = this.getLocalAddress();
                var closed = !this.isOpen();
                var bound = this.isBound();
                var connected = this.isConnected();
                var sock = this.getSocket();
                return '<' + clazz + ' remote="' + remote + '" local="' + local + '"' + ' closed=' + closed + ' bound=' + bound + ' connected=' + connected + '>\n\t' + sock + '\n</' + clazz + '>'
            }
        });
        BaseChannel.prototype.createReader = function () {
        };
        BaseChannel.prototype.createWriter = function () {
        };
        BaseChannel.prototype.getReader = function () {
            return this.__reader
        };
        BaseChannel.prototype.getWriter = function () {
            return this.__writer
        };
        BaseChannel.prototype.getSocket = function () {
            return this.__sock
        };
        BaseChannel.prototype.setSocket = function (sock) {
            var old = this.__sock;
            if (sock) {
                this.__sock = sock;
                this.__closed = 0
            } else {
                this.__sock = null;
                this.__closed = 1
            }
            if (old && old !== sock) {
                SocketHelper.socketDisconnect(old)
            }
        };
        BaseChannel.prototype.getState = function () {
            if (this.__closed < 0) {
                return ChannelStateOrder.INIT
            }
            var sock = this.getSocket();
            if (!sock || SocketHelper.socketIsClosed(sock)) {
                return ChannelStateOrder.CLOSED
            } else if (SocketHelper.socketIsConnected(sock) || SocketHelper.socketIsBound(sock)) {
                return ChannelStateOrder.ALIVE
            } else {
                return ChannelStateOrder.OPEN
            }
        };
        BaseChannel.prototype.isOpen = function () {
            if (this.__closed < 0) {
                return true
            }
            var sock = this.getSocket();
            return sock && !SocketHelper.socketIsClosed(sock)
        };
        BaseChannel.prototype.isBound = function () {
            var sock = this.getSocket();
            return sock && SocketHelper.socketIsBound(sock)
        };
        BaseChannel.prototype.isConnected = function () {
            var sock = this.getSocket();
            return sock && SocketHelper.socketIsConnected(sock)
        };
        BaseChannel.prototype.isAlive = function () {
            return this.isOpen() && (this.isConnected() || this.isBound())
        };
        BaseChannel.prototype.isAvailable = function () {
            var sock = this.getSocket();
            if (!sock || SocketHelper.socketIsClosed(sock)) {
                return false
            } else if (SocketHelper.socketIsConnected(sock) || SocketHelper.socketIsBound(sock)) {
                return this.checkAvailable(sock)
            } else {
                return false
            }
        };
        BaseChannel.prototype.checkAvailable = function (sock) {
            return SocketHelper.socketIsAvailable(sock)
        };
        BaseChannel.prototype.isVacant = function () {
            var sock = this.getSocket();
            if (!sock || SocketHelper.socketIsClosed(sock)) {
                return false
            } else if (SocketHelper.socketIsConnected(sock) || SocketHelper.socketIsBound(sock)) {
                return this.checkVacant(sock)
            } else {
                return false
            }
        };
        BaseChannel.prototype.checkVacant = function (sock) {
            return SocketHelper.socketIsVacant(sock)
        };
        BaseChannel.prototype.isBlocking = function () {
            var sock = this.getSocket();
            return sock && SocketHelper.socketIsBlocking(sock)
        };
        BaseChannel.prototype.configureBlocking = function (block) {
            var sock = this.getSocket();
            sock.configureBlocking(block);
            return sock
        };
        BaseChannel.prototype.doBind = function (sock, local) {
            return SocketHelper.socketBind(sock, local)
        };
        BaseChannel.prototype.doConnect = function (sock, remote) {
            return SocketHelper.socketConnect(sock, remote)
        };
        BaseChannel.prototype.doDisconnect = function (sock) {
            return SocketHelper.socketDisconnect(sock)
        };
        BaseChannel.prototype.bind = function (local) {
            var sock = this.getSocket();
            if (sock) {
                this.doBind(sock, local)
            }
            this.localAddress = local;
            return sock
        };
        BaseChannel.prototype.connect = function (remote) {
            var sock = this.getSocket();
            if (sock) {
                this.doConnect(sock, remote)
            }
            this.remoteAddress = remote;
            return sock
        };
        BaseChannel.prototype.disconnect = function () {
            var sock = this.getSocket();
            if (sock) {
                this.doDisconnect(sock)
            }
            return sock
        };
        BaseChannel.prototype.close = function () {
            this.setSocket(null)
        };
        BaseChannel.prototype.read = function (maxLen) {
            try {
                return this.getReader().read(maxLen)
            } catch (e) {
                this.close();
                throw e;
            }
        };
        BaseChannel.prototype.write = function (src) {
            try {
                return this.getWriter().write(src)
            } catch (e) {
                this.close();
                throw e;
            }
        };
        BaseChannel.prototype.receive = function (maxLen) {
            try {
                return this.getReader().receive(maxLen)
            } catch (e) {
                this.close();
                throw e;
            }
        };
        BaseChannel.prototype.send = function (src, target) {
            try {
                return this.getWriter().send(src, target)
            } catch (e) {
                this.close();
                throw e;
            }
        };
        st.socket.SocketReader = Interface(null, null);
        var SocketReader = st.socket.SocketReader;
        SocketReader.prototype.read = function (maxLen) {
        };
        SocketReader.prototype.receive = function (maxLen) {
        };
        st.socket.SocketWriter = Interface(null, null);
        var SocketWriter = st.socket.SocketWriter;
        SocketWriter.prototype.write = function (src) {
        };
        SocketWriter.prototype.send = function (src, target) {
        };
        st.socket.ChannelController = function (channel) {
            BaseObject.call(this);
            this.__channel = channel
        };
        var ChannelController = st.socket.ChannelController
        Class(ChannelController, BaseObject, null);
        ChannelController.prototype.getChannel = function () {
            return this.__channel
        };
        ChannelController.prototype.getRemoteAddress = function () {
            var channel = this.getChannel();
            return !channel ? null : channel.getRemoteAddress()
        };
        ChannelController.prototype.getLocalAddress = function () {
            var channel = this.getChannel();
            return !channel ? null : channel.getLocalAddress()
        };
        ChannelController.prototype.getSocket = function () {
            var channel = this.getChannel();
            return !channel ? null : channel.getSocket()
        };
        st.socket.BaseConnection = function (remote, local) {
            AddressPairObject.call(this, remote, local);
            this.__channel = -1;
            this.__delegate = null;
            this.__lastSentTime = null;
            this.__lastReceivedTime = null;
            this.__fsm = null
        };
        var BaseConnection = st.socket.BaseConnection;
        Class(BaseConnection, AddressPairObject, [Connection, TimedConnection, ConnectionState.Delegate]);
        Implementation(BaseConnection, {
            toString: function () {
                var clazz = this.getClassName();
                var remote = this.getRemoteAddress();
                var local = this.getLocalAddress();
                var channel = this.getChannel();
                return '<' + clazz + ' remote="' + remote + '" local="' + local + '">\n\t' + channel + '\n</' + clazz + '>'
            }
        });
        BaseConnection.prototype.getDelegate = function () {
            return this.__delegate
        };
        BaseConnection.prototype.setDelegate = function (delegate) {
            this.__delegate = delegate
        };
        BaseConnection.prototype.getStateMachine = function () {
            return this.__fsm
        };
        BaseConnection.prototype.setStateMachine = function (machine) {
            var old = this.__fsm;
            this.__fsm = machine;
            if (old && old !== machine) {
                old.stop()
            }
        };
        BaseConnection.prototype.createStateMachine = function () {
            var machine = new StateMachine(this);
            machine.setDelegate(this);
            return machine
        };
        BaseConnection.prototype.getChannel = function () {
            var channel = this.__channel;
            return channel === -1 ? null : channel
        };
        BaseConnection.prototype.setChannel = function (channel) {
            var old = this.__channel;
            this.__channel = channel;
            if (old && old !== -1 && old !== channel) {
                try {
                    old.close()
                } catch (e) {
                }
            }
        };
        BaseConnection.prototype.isOpen = function () {
            var channel = this.__channel;
            if (channel === -1) {
                return true
            }
            return channel && channel.isOpen()
        };
        BaseConnection.prototype.isBound = function () {
            var channel = this.getChannel();
            return channel && channel.isBound()
        };
        BaseConnection.prototype.isConnected = function () {
            var channel = this.getChannel();
            return channel && channel.isConnected()
        };
        BaseConnection.prototype.isAlive = function () {
            return this.isOpen() && (this.isConnected() || this.isBound())
        };
        BaseConnection.prototype.isAvailable = function () {
            var channel = this.getChannel();
            return channel && channel.isAvailable()
        };
        BaseConnection.prototype.isVacant = function () {
            var channel = this.getChannel();
            return channel && channel.isVacant()
        };
        BaseConnection.prototype.close = function () {
            this.setStateMachine(null);
            this.setChannel(null)
        };
        BaseConnection.prototype.start = function (hub) {
            this.openChannel(hub);
            this.startMachine()
        };
        BaseConnection.prototype.startMachine = function () {
            var machine = this.createStateMachine();
            this.setStateMachine(machine);
            machine.start()
        };
        BaseConnection.prototype.openChannel = function (hub) {
            var remote = this.getRemoteAddress();
            var local = this.getLocalAddress();
            var channel = hub.open(remote, local);
            if (channel) {
                this.setChannel(channel)
            }
            return channel
        };
        BaseConnection.prototype.onReceivedData = function (data) {
            this.__lastReceivedTime = new Date();
            var delegate = this.getDelegate();
            if (delegate) {
                delegate.onConnectionReceived(data, this)
            }
        };
        BaseConnection.prototype.doSend = function (data, destination) {
            var channel = this.getChannel();
            if (!(channel && channel.isAlive())) {
                return -1
            } else if (!destination) {
                throw new ReferenceError('remote address should not empty')
            }
            var sent = channel.send(data, destination);
            if (sent > 0) {
                this.__lastSentTime = new Date()
            }
            return sent
        };
        BaseConnection.prototype.sendData = function (pack) {
            var error = null
            var sent = -1;
            try {
                var destination = this.getRemoteAddress();
                sent = this.doSend(pack, destination);
                if (sent < 0) {
                    error = new Error('failed to send data: ' + pack.length + ' byte(s) to ' + destination)
                }
            } catch (e) {
                error = e;
                this.setChannel(null)
            }
            var delegate = this.getDelegate();
            if (delegate) {
                if (error) {
                    delegate.onConnectionFailed(error, pack, this)
                } else {
                    delegate.onConnectionSent(sent, pack, this)
                }
            }
            return sent
        };
        BaseConnection.prototype.getState = function () {
            var machine = this.getStateMachine();
            return !machine ? null : machine.getCurrentState()
        };
        BaseConnection.prototype.tick = function (now, elapsed) {
            if (this.__channel === -1) {
                return
            }
            var machine = this.getStateMachine();
            if (machine) {
                machine.tick(now, elapsed)
            }
        };
        BaseConnection.prototype.getLastSentTime = function () {
            return this.__lastSentTime
        };
        BaseConnection.prototype.getLastReceivedTime = function () {
            return this.__lastReceivedTime
        };
        BaseConnection.prototype.isSentRecently = function (now) {
            var lastTime = this.__lastSentTime;
            if (!lastTime) {
                return false
            }
            var expired = TimedConnection.EXPIRES.addTo(lastTime);
            return expired.getTime() > now.getTime()
        };
        BaseConnection.prototype.isReceivedRecently = function (now) {
            var lastTime = this.__lastReceivedTime;
            if (!lastTime) {
                return false
            }
            var expired = TimedConnection.EXPIRES.addTo(lastTime);
            return expired.getTime() > now.getTime()
        };
        BaseConnection.prototype.isNotReceivedLongTimeAgo = function (now) {
            var lastTime = this.__lastReceivedTime;
            if (!lastTime) {
                return false
            }
            var expired = TimedConnection.EXPIRES.multiplies(8).addTo(lastTime);
            return expired.getTime() < now.getTime()
        };
        BaseConnection.prototype.enterState = function (next, ctx, now) {
        };
        BaseConnection.prototype.exitState = function (previous, ctx, now) {
            var current = ctx.getCurrentState();
            var currentIndex = !current ? -1 : current.getIndex();
            if (ConnectionStateOrder.READY.equals(currentIndex)) {
                var previousIndex = !previous ? -1 : previous.getIndex();
                if (ConnectionStateOrder.PREPARING.equals(previousIndex)) {
                    var soon = TimedConnection.EXPIRES.divides(2).subtractFrom(now);
                    var st = this.__lastSentTime;
                    if (!st || st.getTime() < soon.getTime()) {
                        this.__lastSentTime = soon
                    }
                    var rt = this.__lastReceivedTime;
                    if (!rt || rt.getTime() < soon.getTime()) {
                        this.__lastReceivedTime = soon
                    }
                }
            }
            var delegate = this.getDelegate();
            if (delegate) {
                delegate.onConnectionStateChanged(previous, current, this)
            }
            if (ConnectionStateOrder.ERROR.equals(currentIndex)) {
                this.setChannel(null)
            }
        };
        BaseConnection.prototype.pauseState = function (current, ctx, now) {
        };
        BaseConnection.prototype.resumeState = function (current, ctx, now) {
        };
        st.socket.ActiveConnection = function (remote, local) {
            BaseConnection.call(this, remote, local);
            this.__hub = null;
            this.__thread = null;
            this.__bg_next_loop = 0;
            this.__bg_expired = 0;
            this.__bg_last_time = 0;
            this.__bg_interval = 8000
        };
        var ActiveConnection = st.socket.ActiveConnection;
        Class(ActiveConnection, BaseConnection, [Runnable]);
        Implementation(ActiveConnection, {
            isOpen: function () {
                return this.getStateMachine() !== null
            }, start: function (hub) {
                this.__hub = hub;
                this.startMachine();
                var thread = this.__thread;
                if (thread) {
                    this.__thread = null;
                    thread.stop()
                }
                thread = new Thread(this);
                thread.start();
                this.__thread = thread
            }, run: function () {
                var now = (new Date()).getTime();
                if (this.__bg_next_loop === 0) {
                    this.__bg_next_loop = now + 1000;
                    return true
                } else if (this.__bg_next_loop > now) {
                    return true
                } else {
                    this.__bg_next_loop = now + 1000
                }
                if (!this.isOpen()) {
                    return false
                }
                try {
                    var channel = this.getChannel();
                    if (!(channel && channel.isOpen())) {
                        if (now < this.__bg_last_time + this.__bg_interval) {
                            return true
                        } else {
                            this.__bg_last_time = now
                        }
                        var hub = this.__hub;
                        if (!hub) {
                            return false
                        }
                        channel = this.openChannel(hub);
                        if (channel) {
                            this.__bg_expired = now + 128000
                        } else if (this.__bg_interval < 128000) {
                            this.__bg_interval <<= 1
                        }
                    } else if (channel.isAlive()) {
                        this.__bg_interval = 8000
                    } else if (0 < this.__bg_expired && this.__bg_expired < now) {
                        channel.close()
                    }
                } catch (e) {
                    var delegate = this.getDelegate();
                    if (delegate) {
                        delegate.onConnectionError(e, this)
                    }
                }
                return true
            }
        });
        st.socket.ConnectionPool = function () {
            AddressPairMap.call(this)
        };
        var ConnectionPool = st.socket.ConnectionPool;
        Class(ConnectionPool, AddressPairMap, null);
        Implementation(ConnectionPool, {
            set: function (remote, local, value) {
                var cached = AddressPairMap.prototype.remove.call(this, remote, local, value);
                AddressPairMap.prototype.set.call(this, remote, local, value);
                return cached
            }
        });
        st.socket.BaseHub = function (gate) {
            BaseObject.call(this);
            this.__delegate = gate;
            this.__connPool = this.createConnectionPool();
            this.__last = new Date()
        };
        var BaseHub = st.socket.BaseHub;
        Class(BaseHub, BaseObject, [Hub]);
        BaseHub.prototype.createConnectionPool = function () {
            return new ConnectionPool()
        };
        BaseHub.prototype.getDelegate = function () {
            return this.__delegate
        };
        BaseHub.MSS = 1472;
        BaseHub.prototype.allChannels = function () {
        };
        BaseHub.prototype.removeChannel = function (remote, local, channel) {
        };
        BaseHub.prototype.createConnection = function (remote, local) {
        };
        BaseHub.prototype.allConnections = function () {
            return this.__connPool.items()
        };
        BaseHub.prototype.getConnection = function (remote, local) {
            return this.__connPool.get(remote, local)
        };
        BaseHub.prototype.setConnection = function (remote, local, connection) {
            return this.__connPool.set(remote, local, connection)
        };
        BaseHub.prototype.removeConnection = function (remote, local, connection) {
            return this.__connPool.remove(remote, local, connection)
        };
        BaseHub.prototype.connect = function (remote, local) {
            var conn = this.getConnection(remote, local);
            if (conn) {
                if (!local) {
                    return conn
                }
                var address = conn.getLocalAddress();
                if (!address || address.equals(local)) {
                    return conn
                }
            }
            conn = this.createConnection(remote, local);
            if (!local) {
                local = conn.getLocalAddress()
            }
            var cached = this.setConnection(remote, local, conn);
            if (cached && cached !== conn) {
                cached.close()
            }
            if (conn instanceof BaseConnection) {
                conn.start(this)
            }
            return conn
        };
        BaseHub.prototype.closeChannel = function (channel) {
            try {
                if (channel.isOpen()) {
                    channel.close()
                }
            } catch (e) {
            }
        };
        BaseHub.prototype.driveChannel = function (channel) {
            var cs = channel.getState();
            if (ChannelStateOrder.INIT.equals(cs)) {
                return false
            } else if (ChannelStateOrder.CLOSED.equals(cs)) {
                return false
            }
            var conn;
            var remote;
            var local;
            var data;
            try {
                var pair = channel.receive(BaseHub.MSS);
                data = pair[0];
                remote = pair[1]
            } catch (e) {
                remote = channel.getRemoteAddress();
                local = channel.getLocalAddress();
                var gate = this.getDelegate();
                var cached;
                if (!gate || !remote) {
                    cached = this.removeChannel(remote, local, channel)
                } else {
                    conn = this.getConnection(remote, local);
                    cached = this.removeChannel(remote, local, channel);
                    if (conn) {
                        gate.onConnectionError(e, conn)
                    }
                }
                if (cached && cached !== channel) {
                    this.closeChannel(cached)
                }
                this.closeChannel(channel);
                return false
            }
            if (!remote || !data) {
                return false
            } else {
                local = channel.getLocalAddress()
            }
            conn = this.connect(remote, local);
            if (conn) {
                conn.onReceivedData(data)
            }
            return true
        };
        BaseHub.prototype.driveChannels = function (channels) {
            var count = 0;
            for (var i = channels.length - 1; i >= 0; --i) {
                if (this.driveChannel(channels[i])) {
                    ++count
                }
            }
            return count
        };
        BaseHub.prototype.cleanupChannels = function (channels) {
            var cached, sock;
            var remote, local;
            for (var i = channels.length - 1; i >= 0; --i) {
                sock = channels[i];
                if (!sock.isOpen()) {
                    remote = sock.getRemoteAddress();
                    local = sock.getLocalAddress();
                    cached = this.removeChannel(remote, local, sock);
                    if (cached && cached !== sock) {
                        this.closeChannel(cached)
                    }
                }
            }
        };
        BaseHub.prototype.driveConnections = function (connections) {
            var now = new Date();
            var elapsed = Duration.between(this.__last, now);
            for (var i = connections.length - 1; i >= 0; --i) {
                connections[i].tick(now, elapsed)
            }
            this.__last = now
        };
        BaseHub.prototype.cleanupConnections = function (connections) {
            var cached, conn;
            var remote, local;
            for (var i = connections.length - 1; i >= 0; --i) {
                conn = connections[i];
                if (!conn.isOpen()) {
                    remote = conn.getRemoteAddress();
                    local = conn.getLocalAddress();
                    cached = this.removeConnection(remote, local, conn);
                    if (cached && cached !== conn) {
                        cached.close()
                    }
                }
            }
        };
        BaseHub.prototype.process = function () {
            var channels = this.allChannels();
            var count = this.driveChannels(channels);
            var connections = this.allConnections();
            this.driveConnections(connections);
            this.cleanupChannels(channels);
            this.cleanupConnections(connections);
            return count > 0
        };
        st.ArrivalShip = function (now) {
            BaseObject.call(this);
            if (!now) {
                now = new Date()
            }
            this.__expired = ArrivalShip.EXPIRES.addTo(now)
        };
        var ArrivalShip = st.ArrivalShip;
        Class(ArrivalShip, BaseObject, [Arrival]);
        ArrivalShip.EXPIRES = Duration.ofMinutes(5);
        ArrivalShip.prototype.touch = function (now) {
            this.__expired = ArrivalShip.EXPIRES.addTo(now)
        };
        ArrivalShip.prototype.getStatus = function (now) {
            if (now.getTime() > this.__expired.getTime()) {
                return ShipStatus.EXPIRED
            } else {
                return ShipStatus.ASSEMBLING
            }
        };
        st.ArrivalHall = function () {
            BaseObject.call(this);
            this.__arrivals = new HashSet();
            this.__arrival_map = {};
            this.__finished_times = {}
        };
        var ArrivalHall = st.ArrivalHall;
        Class(ArrivalHall, BaseObject, null);
        ArrivalHall.prototype.assembleArrival = function (income) {
            var sn = income.getSN();
            if (!sn) {
                return income
            }
            var completed;
            var cached = this.__arrival_map[sn];
            if (cached) {
                completed = cached.assemble(income);
                if (completed) {
                    this.__arrivals.remove(cached);
                    delete this.__arrival_map[sn];
                    this.__finished_times[sn] = new Date()
                } else {
                    cached.touch(new Date())
                }
            } else {
                var time = this.__finished_times[sn];
                if (time) {
                    return null
                }
                completed = income.assemble(income);
                if (!completed) {
                    this.__arrivals.add(income);
                    this.__arrival_map[sn] = income
                }
            }
            return completed
        };
        ArrivalHall.prototype.purge = function (now) {
            if (!now) {
                now = new Date()
            }
            var count = 0;
            var ship;
            var sn;
            var arrivals = this.__arrivals.toArray();
            for (var i = arrivals.length - 1; i >= 0; --i) {
                ship = arrivals[i];
                if (ship.getStatus(now) === ShipStatus.EXPIRED) {
                    sn = ship.getSN();
                    if (sn) {
                        delete this.__arrival_map[sn]
                    }
                    ++count;
                    this.__arrivals.remove(ship)
                }
            }
            var ago = Duration.ofMinutes(60).subtractFrom(now);
            ago = ago.getTime();
            var finished_times = this.__finished_times;
            Mapper.forEach(finished_times, function (sn, when) {
                if (!when || when.getTime() < ago) {
                    delete finished_times[sn]
                }
                return false
            });
            return count
        };
        st.DepartureShip = function (priority, maxTries) {
            BaseObject.call(this);
            if (priority === null) {
                priority = DeparturePriority.NORMAL
            }
            if (maxTries === null) {
                maxTries = 1 + DepartureShip.RETRIES
            }
            this.__priority = priority;
            this.__tries = maxTries;
            this.__expired = null
        };
        var DepartureShip = st.DepartureShip;
        Class(DepartureShip, BaseObject, [Departure]);
        DepartureShip.EXPIRES = Duration.ofMinutes(2);
        DepartureShip.RETRIES = 2;
        DepartureShip.prototype.getPriority = function () {
            return this.__priority
        };
        DepartureShip.prototype.touch = function (now) {
            this.__expired = DepartureShip.EXPIRES.addTo(now);
            this.__tries -= 1
        };
        DepartureShip.prototype.getStatus = function (now) {
            var expired = this.__expired;
            var fragments = this.getFragments();
            if (!fragments || fragments.length === 0) {
                return ShipStatus.DONE
            } else if (!expired) {
                return ShipStatus.NEW
            } else if (now.getTime() < expired.getTime()) {
                return ShipStatus.WAITING
            } else if (this.__tries > 0) {
                return ShipStatus.TIMEOUT
            } else {
                return ShipStatus.FAILED
            }
        };
        st.DepartureHall = function () {
            BaseObject.call(this);
            this.__all_departures = new HashSet();
            this.__new_departures = [];
            this.__fleets = {};
            this.__priorities = [];
            this.__departure_map = {};
            this.__departure_level = {};
            this.__finished_times = {}
        };
        var DepartureHall = st.DepartureHall;
        Class(DepartureHall, BaseObject, null);
        DepartureHall.prototype.addDeparture = function (outgo) {
            if (this.__all_departures.contains(outgo)) {
                return false
            } else {
                this.__all_departures.add(outgo)
            }
            var priority = outgo.getPriority();
            var index = this.__new_departures.length;
            while (index > 0) {
                --index;
                if (this.__new_departures[index].getPriority() <= priority) {
                    ++index;
                    break
                }
            }
            Arrays.insert(this.__new_departures, index, outgo);
            return true
        };
        DepartureHall.prototype.checkResponse = function (response) {
            var sn = response.getSN();
            var time = this.__finished_times[sn];
            if (time) {
                return null
            }
            var ship = this.__departure_map[sn];
            if (ship && ship.checkResponse(response)) {
                removeDeparture.call(this, ship, sn);
                this.__finished_times[sn] = new Date();
                return ship
            }
            return null
        };
        var removeDeparture = function (ship, sn) {
            var priority = this.__departure_level[sn];
            if (!priority) {
                priority = 0
            }
            var fleet = this.__fleets[priority];
            if (fleet) {
                Arrays.remove(fleet, ship);
                if (fleet.length === 0) {
                    delete this.__fleets[priority]
                }
            }
            delete this.__departure_map[sn];
            delete this.__departure_level[sn];
            this.__all_departures.remove(ship)
        };
        DepartureHall.prototype.getNextDeparture = function (now) {
            var next = getNextNewDeparture.call(this, now);
            if (!next) {
                next = getNextTimeoutDeparture.call(this, now)
            }
            return next
        };
        var getNextNewDeparture = function (now) {
            if (this.__new_departures.length === 0) {
                return null
            }
            var outgo = this.__new_departures.shift();
            var sn = outgo.getSN();
            if (outgo.isImportant() && sn) {
                var priority = outgo.getPriority();
                insertDeparture.call(this, outgo, priority, sn);
                this.__departure_map[sn] = outgo
            } else {
                this.__all_departures.remove(outgo)
            }
            outgo.touch(now);
            return outgo
        };
        var insertDeparture = function (outgo, priority, sn) {
            var fleet = this.__fleets[priority];
            if (!fleet) {
                fleet = [];
                this.__fleets[priority] = fleet;
                insertPriority.call(this, priority)
            }
            fleet.push(outgo);
            this.__departure_level[sn] = priority
        };
        var insertPriority = function (priority) {
            var index, value;
            for (index = 0; index < this.__priorities.length; ++index) {
                value = this.__priorities[index];
                if (value === priority) {
                    return
                } else if (value > priority) {
                    break
                }
            }
            Arrays.insert(this.__priorities, index, priority)
        };
        var getNextTimeoutDeparture = function (now) {
            var priorityList = this.__priorities.slice();
            var departures;
            var fleet;
            var ship;
            var status;
            var sn;
            var prior;
            var i, j;
            for (i = 0; i < priorityList.length; ++i) {
                prior = priorityList[i];
                fleet = this.__fleets[prior];
                if (!fleet) {
                    continue
                }
                departures = fleet.slice();
                for (j = 0; j < departures.length; ++j) {
                    ship = departures[j];
                    sn = ship.getSN();
                    status = ship.getStatus(now);
                    if (status === ShipStatus.TIMEOUT) {
                        fleet.splice(j, 1);
                        insertDeparture.call(this, ship, prior + 1, sn);
                        ship.touch(now);
                        return ship
                    } else if (status === ShipStatus.FAILED) {
                        fleet.splice(j, 1);
                        delete this.__departure_map[sn];
                        delete this.__departure_level[sn];
                        this.__all_departures.remove(ship);
                        return ship
                    }
                }
            }
            return null
        };
        DepartureHall.prototype.purge = function (now) {
            if (!now) {
                now = new Date()
            }
            var count = 0;
            var priorityList = this.__priorities.slice();
            var departures;
            var fleet;
            var ship;
            var sn;
            var prior;
            var i, j;
            for (i = priorityList.length - 1; i >= 0; --i) {
                prior = priorityList[i];
                fleet = this.__fleets[prior];
                if (!fleet) {
                    this.__priorities.splice(i, 1);
                    continue
                }
                departures = fleet.slice();
                for (j = departures.length - 1; j >= 0; --j) {
                    ship = departures[j];
                    if (ship.getStatus(now) === ShipStatus.DONE) {
                        fleet.splice(j, 1);
                        sn = ship.getSN();
                        delete this.__departure_map[sn];
                        delete this.__departure_level[sn];
                        this.__finished_times[sn] = now;
                        ++count
                    }
                }
                if (fleet.length === 0) {
                    delete this.__fleets[prior];
                    this.__priorities.splice(i, 1)
                }
            }
            var finished_times = this.__finished_times;
            var ago = Duration.ofMinutes(60).subtractFrom(now);
            ago = ago.getTime();
            Mapper.forEach(finished_times, function (sn, when) {
                if (!when || when.getTime() < ago) {
                    delete finished_times[sn]
                }
                return false
            });
            return count
        };
        st.Dock = function () {
            BaseObject.call(this);
            this.__arrivalHall = this.createArrivalHall();
            this.__departureHall = this.createDepartureHall()
        };
        var Dock = st.Dock;
        Class(Dock, BaseObject, null);
        Dock.prototype.createArrivalHall = function () {
            return new ArrivalHall()
        };
        Dock.prototype.createDepartureHall = function () {
            return new DepartureHall()
        };
        Dock.prototype.assembleArrival = function (income) {
            return this.__arrivalHall.assembleArrival(income)
        };
        Dock.prototype.addDeparture = function (outgo) {
            return this.__departureHall.addDeparture(outgo)
        };
        Dock.prototype.checkResponse = function (response) {
            return this.__departureHall.checkResponse(response)
        };
        Dock.prototype.getNextDeparture = function (now) {
            return this.__departureHall.getNextDeparture(now)
        };
        Dock.prototype.purge = function (now) {
            var count = 0;
            count += this.__arrivalHall.purge(now);
            count += this.__departureHall.purge(now);
            return count
        };
        st.StarPorter = function (remote, local) {
            AddressPairObject.call(this, remote, local);
            this.__dock = this.createDock();
            this.__conn = -1;
            this.__delegate = null;
            this.__lastOutgo = null;
            this.__lastFragments = []
        };
        var StarPorter = st.StarPorter;
        Class(StarPorter, AddressPairObject, [Porter]);
        Implementation(StarPorter, {
            toString: function () {
                var clazz = this.getClassName();
                var remote = this.getRemoteAddress();
                var local = this.getLocalAddress();
                var conn = this.getConnection();
                return '<' + clazz + ' remote="' + remote + '" local="' + local + '">\n\t' + conn + '\n</' + clazz + '>'
            }
        });
        StarPorter.prototype.createDock = function () {
            return new Dock()
        };
        StarPorter.prototype.getDelegate = function () {
            return this.__delegate
        };
        StarPorter.prototype.setDelegate = function (keeper) {
            this.__delegate = keeper
        };
        StarPorter.prototype.getConnection = function () {
            var conn = this.__conn;
            return conn === -1 ? null : conn
        };
        StarPorter.prototype.setConnection = function (conn) {
            var old = this.__conn;
            this.__conn = conn;
            if (old && old !== -1 && old !== conn) {
                old.close()
            }
        };
        StarPorter.prototype.isOpen = function () {
            var conn = this.__conn;
            if (conn === -1) {
                return false
            }
            return conn && conn.isOpen()
        };
        StarPorter.prototype.isAlive = function () {
            var conn = this.getConnection();
            return conn && conn.isAlive()
        };
        StarPorter.prototype.getStatus = function () {
            var conn = this.getConnection();
            if (conn) {
                return PorterStatus.getStatus(conn.getState())
            } else {
                return PorterStatus.ERROR
            }
        };
        StarPorter.prototype.sendShip = function (ship) {
            return this.__dock.addDeparture(ship)
        };
        StarPorter.prototype.processReceived = function (data) {
            var incomeShips = this.getArrivals(data);
            if (!incomeShips || incomeShips.length === 0) {
                return
            }
            var keeper = this.getDelegate();
            var income, ship;
            for (var i = 0; i < incomeShips.length; ++i) {
                ship = incomeShips[i];
                income = this.checkArrival(ship);
                if (!income) {
                    continue
                }
                if (keeper) {
                    keeper.onPorterReceived(income, this)
                }
            }
        };
        StarPorter.prototype.getArrivals = function (data) {
        };
        StarPorter.prototype.checkArrival = function (income) {
        };
        StarPorter.prototype.checkResponse = function (income) {
            var linked = this.__dock.checkResponse(income);
            if (!linked) {
                return null
            }
            var keeper = this.getDelegate();
            if (keeper) {
                keeper.onPorterSent(linked, this)
            }
            return linked
        };
        StarPorter.prototype.assembleArrival = function (income) {
            return this.__dock.assembleArrival(income)
        };
        StarPorter.prototype.getNextDeparture = function (now) {
            return this.__dock.getNextDeparture(now)
        };
        StarPorter.prototype.purge = function (now) {
            return this.__dock.purge(now)
        };
        StarPorter.prototype.close = function () {
            this.setConnection(null)
        };
        StarPorter.prototype.process = function () {
            var conn = this.getConnection();
            if (!conn) {
                return false
            } else if (!conn.isVacant()) {
                return false
            }
            var keeper = this.getDelegate();
            var error;
            var outgo = this.__lastOutgo;
            var fragments = this.__lastFragments;
            if (outgo && fragments.length > 0) {
                this.__lastOutgo = null;
                this.__lastFragments = []
            } else {
                var now = new Date();
                outgo = this.getNextDeparture(now);
                if (!outgo) {
                    return false
                } else if (outgo.getStatus(now) === ShipStatus.FAILED) {
                    if (keeper) {
                        error = new Error('Request timeout');
                        keeper.onPorterFailed(error, outgo, this)
                    }
                    return true
                } else {
                    fragments = outgo.getFragments();
                    if (fragments.length === 0) {
                        return true
                    }
                }
            }
            var index = 0;
            var sent = 0;
            try {
                var fra;
                for (var i = 0; i < fragments.length; ++i) {
                    fra = fragments[i];
                    sent = conn.sendData(fra);
                    if (sent < fra.length) {
                        break
                    } else {
                        index += 1;
                        sent = 0
                    }
                }
                if (index < fragments.length) {
                    error = new Error('only ' + index + '/' + fragments.length + ' fragments sent.')
                } else {
                    if (outgo.isImportant()) {
                    } else if (keeper) {
                        keeper.onPorterSent(outgo, this)
                    }
                    return true
                }
            } catch (e) {
                error = e
            }
            for (; index > 0; --index) {
                fragments.shift()
            }
            if (sent > 0) {
                var last = fragments.shift();
                var part = last.subarray(sent);
                fragments.unshift(part)
            }
            this.__lastOutgo = outgo;
            this.__lastFragments = fragments;
            if (keeper) {
                keeper.onPorterError(error, outgo, this)
            }
            return false
        };
        st.PorterPool = function () {
            AddressPairMap.call(this)
        };
        var PorterPool = st.PorterPool;
        Class(PorterPool, AddressPairMap, null);
        Implementation(PorterPool, {
            set: function (remote, local, value) {
                var cached = AddressPairMap.prototype.remove.call(this, remote, local, value);
                AddressPairMap.prototype.set.call(this, remote, local, value);
                return cached
            }
        });
        st.StarGate = function (keeper) {
            BaseObject.call(this);
            this.__delegate = keeper;
            this.__porterPool = this.createPorterPool()
        };
        var StarGate = st.StarGate;
        Class(StarGate, BaseObject, [Gate, ConnectionDelegate]);
        StarGate.prototype.createPorterPool = function () {
            return new PorterPool()
        };
        StarGate.prototype.getDelegate = function () {
            return this.__delegate
        };
        StarGate.prototype.sendData = function (payload, remote, local) {
            var worker = this.getPorter(remote, local);
            if (!worker) {
                return false
            } else if (!worker.isAlive()) {
                return false
            }
            return worker.sendData(payload)
        };
        StarGate.prototype.sendShip = function (outgo, remote, local) {
            var worker = this.getPorter(remote, local);
            if (!worker) {
                return false
            } else if (!worker.isAlive()) {
                return false
            }
            return worker.sendShip(outgo)
        };
        StarGate.prototype.createPorter = function (remote, local) {
        };
        StarGate.prototype.allPorters = function () {
            return this.__porterPool.items()
        };
        StarGate.prototype.getPorter = function (remote, local) {
            return this.__porterPool.get(remote, local)
        };
        StarGate.prototype.setPorter = function (remote, local, porter) {
            return this.__porterPool.set(remote, local, porter)
        };
        StarGate.prototype.removePorter = function (remote, local, porter) {
            return this.__porterPool.remove(remote, local, porter)
        };
        StarGate.prototype.dock = function (connection, shouldCreatePorter) {
            var remote = connection.getRemoteAddress();
            var local = connection.getLocalAddress();
            if (!remote) {
                return null
            }
            var worker, cached;
            worker = this.getPorter(remote, local);
            if (worker) {
                return worker
            } else if (!shouldCreatePorter) {
                return null
            }
            worker = this.createPorter(remote, local);
            cached = this.setPorter(remote, local, worker);
            if (cached && cached !== worker) {
                cached.close()
            }
            if (worker instanceof StarPorter) {
                worker.setConnection(connection)
            }
            return worker
        };
        StarGate.prototype.process = function () {
            var dockers = this.allPorters();
            var count = this.drivePorters(dockers);
            this.cleanupPorters(dockers);
            return count > 0
        };
        StarGate.prototype.drivePorters = function (porters) {
            var count = 0;
            for (var i = porters.length - 1; i >= 0; --i) {
                if (porters[i].process()) {
                    ++count
                }
            }
            return count
        };
        StarGate.prototype.cleanupPorters = function (porters) {
            var now = new Date();
            var cached, worker;
            var remote, local;
            for (var i = porters.length - 1; i >= 0; --i) {
                worker = porters[i];
                if (worker.isOpen()) {
                    worker.purge(now);
                    continue
                }
                remote = worker.getRemoteAddress();
                local = worker.getLocalAddress();
                cached = this.removePorter(remote, local, worker);
                if (cached && cached !== worker) {
                    cached.close()
                }
            }
        };
        StarGate.prototype.heartbeat = function (connection) {
            var remote = connection.getRemoteAddress();
            var local = connection.getLocalAddress();
            var worker = this.getPorter(remote, local);
            if (worker) {
                worker.heartbeat()
            }
        };
        StarGate.prototype.onConnectionStateChanged = function (previous, current, connection) {
            var s1 = PorterStatus.getStatus(previous);
            var s2 = PorterStatus.getStatus(current);
            if (s1 !== s2) {
                var notFinished = s2 !== PorterStatus.ERROR;
                var worker = this.dock(connection, notFinished);
                if (!worker) {
                    return
                }
                var keeper = this.getDelegate();
                if (keeper) {
                    keeper.onPorterStatusChanged(s1, s2, worker)
                }
            }
            var index = !current ? -1 : current.getIndex();
            if (ConnectionStateOrder.EXPIRED.equals(index)) {
                this.heartbeat(connection)
            }
        };
        StarGate.prototype.onConnectionReceived = function (data, connection) {
            var worker = this.dock(connection, true);
            if (worker) {
                worker.processReceived(data)
            }
        };
        StarGate.prototype.onConnectionSent = function (sent, data, connection) {
        };
        StarGate.prototype.onConnectionFailed = function (error, data, connection) {
        };
        StarGate.prototype.onConnectionError = function (error, connection) {
        }
    })(StarTrek, FiniteStateMachine, MONKEY);
    (function (sg, st, fsm, mk) {
        if (typeof sg.dos !== 'object') {
            sg.dos = {}
        }
        if (typeof sg.lnc !== 'object') {
            sg.lnc = {}
        }
        if (typeof sg.ip !== 'object') {
            sg.ip = {}
        }
        if (typeof sg.ws !== 'object') {
            sg.ws = {}
        }
        var Interface = mk.type.Interface;
        var Class = mk.type.Class;
        var Implementation = mk.type.Implementation;
        var Mixin = mk.type.Mixin;
        var Converter = mk.type.Converter;
        var Mapper = mk.type.Mapper;
        var BaseObject = mk.type.BaseObject;
        var HashSet = mk.type.HashSet;
        var ConstantString = mk.type.ConstantString;
        var UTF8 = mk.format.UTF8;
        var JSONMap = mk.format.JSONMap;
        var Base64 = mk.format.Base64;
        var Duration = fsm.type.Duration;
        var Runnable = fsm.skywalker.Runnable;
        var Runner = fsm.skywalker.Runner;
        var Thread = fsm.threading.Thread;
        var AddressPairMap = st.type.AddressPairMap;
        var SocketHelper = st.net.SocketHelper;
        var Departure = st.port.Departure;
        var SocketReader = st.socket.SocketReader;
        var SocketWriter = st.socket.SocketWriter;
        var ChannelController = st.socket.ChannelController;
        var BaseChannel = st.socket.BaseChannel;
        var BaseHub = st.socket.BaseHub;
        var ActiveConnection = st.socket.ActiveConnection;
        var ArrivalShip = st.ArrivalShip;
        var DepartureShip = st.DepartureShip;
        var StarPorter = st.StarPorter;
        var StarGate = st.StarGate;
        sg.dos.Storage = function (storage, prefix) {
            BaseObject.call(this);
            this.storage = storage;
            if (prefix) {
                this.ROOT = prefix
            } else {
                this.ROOT = 'dim'
            }
        };
        var Storage = sg.dos.Storage;
        Class(Storage, BaseObject, null);
        Storage.prototype.getItem = function (key) {
            return this.storage.getItem(key)
        };
        Storage.prototype.setItem = function (key, value) {
            this.storage.setItem(key, value)
        };
        Storage.prototype.removeItem = function (key) {
            this.storage.removeItem(key)
        };
        Storage.prototype.clear = function () {
            this.storage.clear()
        };
        Storage.prototype.getLength = function () {
            return this.storage.length
        };
        Storage.prototype.key = function (index) {
            return this.storage.key(index)
        };
        Storage.prototype.exists = function (path) {
            return !!this.getItem(this.ROOT + '.' + path)
        };
        Storage.prototype.loadText = function (path) {
            return this.getItem(this.ROOT + '.' + path)
        };
        Storage.prototype.loadData = function (path) {
            var base64 = this.loadText(path);
            if (!base64) {
                return null
            }
            return Base64.decode(base64)
        };
        Storage.prototype.loadJSON = function (path) {
            var json = this.loadText(path);
            if (!json) {
                return null
            }
            return JSONMap.decode(json)
        };
        Storage.prototype.remove = function (path) {
            this.removeItem(this.ROOT + '.' + path);
            return true
        };
        Storage.prototype.saveText = function (text, path) {
            if (text) {
                this.setItem(this.ROOT + '.' + path, text);
                return true
            } else {
                this.removeItem(this.ROOT + '.' + path);
                return false
            }
        };
        Storage.prototype.saveData = function (data, path) {
            var base64 = null;
            if (data) {
                base64 = Base64.encode(data)
            }
            return this.saveText(base64, path)
        };
        Storage.prototype.saveJSON = function (container, path) {
            var json = null;
            if (container) {
                json = JSONMap.encode(container)
            }
            return this.saveText(json, path)
        };
        sg.dos.LocalStorage = new Storage(window.localStorage, 'dim.fs');
        sg.dos.SessionStorage = new Storage(window.sessionStorage, 'dim.mem');
        var DEBUG_FLAG = 1 << 0;
        var INFO_FLAG = 1 << 1;
        var WARNING_FLAG = 1 << 2;
        var ERROR_FLAG = 1 << 3;
        sg.lnc.Log = {
            DEBUG: DEBUG_FLAG | INFO_FLAG | WARNING_FLAG | ERROR_FLAG,
            DEVELOP: INFO_FLAG | WARNING_FLAG | ERROR_FLAG,
            RELEASE: WARNING_FLAG | ERROR_FLAG,
            level: WARNING_FLAG | ERROR_FLAG,
            showTime: false,
            showCaller: false,
            debug: function (msg) {
                this.logger.debug.apply(this.logger, arguments)
            },
            info: function (msg) {
                this.logger.info.apply(this.logger, arguments)
            },
            warning: function (msg) {
                this.logger.warning.apply(this.logger, arguments)
            },
            error: function (msg) {
                this.logger.error.apply(this.logger, arguments)
            },
            logger: null
        };
        var Log = sg.lnc.Log;
        sg.lnc.Logging = Mixin(null, {
            logDebug: function (msg) {
                Log.debug.apply(Log, logging_args(this, arguments))
            }, logInfo: function (msg) {
                Log.info.apply(Log, logging_args(this, arguments))
            }, logWarning: function (msg) {
                Log.warning.apply(Log, logging_args(this, arguments))
            }, logError: function (msg) {
                Log.error.apply(Log, logging_args(this, arguments))
            }
        });
        var logging_args = function (obj, args) {
            var getClassName = obj.getClassName;
            if (typeof getClassName !== 'function') {
                getClassName = BaseObject.prototype.getClassName
            }
            var clazz = getClassName.call(obj);
            args = Array.prototype.slice.call(args);
            args.unshift(clazz + ' > ');
            return args
        };
        sg.lnc.Logger = Interface(null, null);
        var Logger = sg.lnc.Logger;
        Logger.prototype.debug = function (msg) {
        };
        Logger.prototype.info = function (msg) {
        };
        Logger.prototype.warning = function (msg) {
        };
        Logger.prototype.error = function (msg) {
        };
        sg.lnc.DefaultLogger = function () {
            BaseObject.call(this)
        };
        var DefaultLogger = sg.lnc.DefaultLogger;
        Class(DefaultLogger, BaseObject, [Logger]);
        Implementation(DefaultLogger, {
            debug: function (msg) {
                var flag = Log.level & DEBUG_FLAG;
                if (flag > 0) {
                    console.debug.apply(console, log_args(arguments))
                }
            }, info: function (msg) {
                var flag = Log.level & INFO_FLAG;
                if (flag > 0) {
                    console.info.apply(console, log_args(arguments))
                }
            }, warning: function (msg) {
                var flag = Log.level & WARNING_FLAG;
                if (flag > 0) {
                    console.warn.apply(console, log_args(arguments))
                }
            }, error: function (msg) {
                var flag = Log.level & ERROR_FLAG;
                if (flag > 0) {
                    console.error.apply(console, log_args(arguments))
                }
            }
        });
        var log_args = function (args) {
            if (Log.showTime) {
                args = Array.prototype.slice.call(args);
                args.unshift('[' + current_time() + ']')
            }
            return args
        };
        var current_time = function () {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth();
            var date = now.getDate();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();
            return year + '-' + two_digits(month + 1) + '-' + two_digits(date) + ' ' + two_digits(hours) + ':' + two_digits(minutes) + ':' + two_digits(seconds)
        };
        var two_digits = function (value) {
            if (value < 10) {
                return '0' + value
            } else {
                return '' + value
            }
        };
        Log.logger = new DefaultLogger();
        sg.lnc.Observer = Interface(null, null);
        var Observer = sg.lnc.Observer;
        Observer.prototype.onReceiveNotification = function (notification) {
        };
        sg.lnc.Notification = function (name, sender, userInfo) {
            BaseObject.call(this);
            this.__name = name;
            this.__sender = sender;
            this.__info = userInfo
        };
        var Notification = sg.lnc.Notification;
        Class(Notification, BaseObject, null);
        Implementation(Notification, {
            toString: function () {
                var clazz = this.getClassName();
                return '<' + clazz + ' name="' + this.getName() + '>\n' + '\t<sender>' + this.getSender() + '</sender>\n' + '\t<info>' + this.getUserInfo() + '</info>\n' + '</' + clazz + '>'
            }
        });
        Notification.prototype.getName = function () {
            return this.__name
        };
        Notification.prototype.getSender = function () {
            return this.__sender
        };
        Notification.prototype.getUserInfo = function () {
            return this.__info
        };
        sg.lnc.BaseCenter = function () {
            BaseObject.call(this);
            this.__observers = {}
        };
        var BaseCenter = sg.lnc.BaseCenter;
        Class(BaseCenter, BaseObject, null);
        BaseCenter.prototype.addObserver = function (observer, name) {
            var listeners = this.__observers[name];
            if (!listeners) {
                listeners = new HashSet();
                this.__observers[name] = listeners
            }
            listeners.add(observer)
        };
        BaseCenter.prototype.removeObserver = function (observer, name) {
            var keys = !name ? Object.keys(this.__observers) : [name];
            for (var i = keys.length - 1; i >= 0; --i) {
                name = keys[i];
                var listeners = this.__observers[name];
                if (listeners) {
                    listeners.remove(observer);
                    if (listeners.isEmpty()) {
                        delete this.__observers[name]
                    }
                }
            }
        };
        BaseCenter.prototype.postNotification = function (name, sender, userInfo) {
            var notification = new Notification(name, sender, userInfo);
            return this.post(notification)
        };
        BaseCenter.prototype.post = function (notification) {
            var listeners = this.__observers[notification.getName()];
            if (!listeners || listeners.isEmpty()) {
                return
            }
            var observers = listeners.toArray();
            var obs;
            for (var i = observers.length - 1; i >= 0; --i) {
                obs = observers[i];
                try {
                    if (Interface.conforms(obs, Observer)) {
                        obs.onReceiveNotification(notification)
                    } else if (typeof obs === 'function') {
                        obs.call(notification)
                    } else {
                        Log.error('Notification observer error', obs, notification)
                    }
                } catch (e) {
                    Log.error('DefaultCenter::post() error', notification, obs, e)
                }
            }
        };
        sg.lnc.NotificationCenter = {
            addObserver: function (observer, name) {
                this.center.addObserver(observer, name)
            }, removeObserver: function (observer, name) {
                this.center.removeObserver(observer, name)
            }, postNotification: function (notification, sender, userInfo) {
                if (notification instanceof Notification) {
                    this.center.post(notification)
                } else {
                    this.center.postNotification(notification, sender, userInfo)
                }
            }, getInstance: function () {
                return this
            }, center: new BaseCenter()
        };
        var NotificationCenter = sg.lnc.NotificationCenter;
        sg.lnc.AsyncCenter = function () {
            BaseCenter.call(this);
            this.__notifications = [];
            this.__running = false;
            this.__thread = null
        };
        var AsyncCenter = sg.lnc.AsyncCenter;
        Class(AsyncCenter, BaseCenter, [Runnable]);
        Implementation(AsyncCenter, {
            postNotification: function (name, sender, userInfo) {
                var notification = new Notification(name, sender, userInfo);
                this.__notifications.push(notification)
            }, post: function (notification) {
                this.__notifications.push(notification)
            }, run: function () {
                while (this.isRunning()) {
                    if (!this.process()) {
                        return true
                    }
                }
                return false
            }, process: function () {
                var notification = this.__notifications.shift();
                if (notification) {
                    BaseCenter.prototype.post.call(this, notification);
                    return true
                } else {
                    return false
                }
            }
        });
        AsyncCenter.prototype.start = function () {
            force_stop.call(this);
            this.__running = true;
            var thread = new Thread(this);
            thread.start();
            this.__thread = thread
        };
        AsyncCenter.prototype.stop = function () {
            force_stop.call(this)
        };
        var force_stop = function () {
            var thread = this.__thread;
            if (thread) {
                this.__thread = null;
                thread.stop()
            }
        };
        AsyncCenter.prototype.isRunning = function () {
            return this.__running
        };
        var parseDuration = function (duration, defaultValueInSeconds) {
            if (duration instanceof Duration) {
                return duration
            }
            var seconds = Converter.getFloat(duration, defaultValueInSeconds);
            return Duration.ofSeconds(seconds)
        };
        var parseDateTime = function (time) {
            var date = Converter.getDateTime(time, null);
            return date || new Date()
        };
        sg.lnc.CacheHolder = function (value, lifeSpan, now) {
            lifeSpan = parseDuration(lifeSpan, 128);
            now = parseDateTime(now);
            this.__value = value;
            this.__lifeSpan = lifeSpan;
            var period = lifeSpan.multiplies(2);
            this.__expired = lifeSpan.addTo(now);
            this.__deprecated = period.addTo(now)
        };
        var CacheHolder = sg.lnc.CacheHolder;
        CacheHolder.prototype.getValue = function () {
            return this.__value
        };
        CacheHolder.prototype.updateValue = function (value, now) {
            now = parseDateTime(now);
            this.__value = value;
            var lifeSpan = this.__lifeSpan;
            var period = lifeSpan.multiplies(2);
            this.__expired = lifeSpan.addTo(now);
            this.__deprecated = period.addTo(now)
        };
        CacheHolder.prototype.isAlive = function (now) {
            now = parseDateTime(now);
            return now.getTime() < this.__expired.getTime()
        };
        CacheHolder.prototype.isDeprecated = function (now) {
            now = parseDateTime(now);
            return now.getTime() > this.__deprecated.getTime()
        };
        CacheHolder.prototype.renewal = function (duration, now) {
            duration = parseDuration(duration, 128);
            now = parseDateTime(now);
            var lifeSpan = this.__lifeSpan;
            var period = lifeSpan.multiplies(2);
            this.__expired = duration.addTo(now);
            this.__deprecated = period.addTo(now)
        };
        sg.lnc.CachePair = function (value, holder) {
            this.value = value;
            this.holder = holder
        };
        var CachePair = sg.lnc.CachePair;
        sg.lnc.CachePool = function () {
            this.__holders = {}
        };
        var CachePool = sg.lnc.CachePool
        CachePool.prototype.getKeys = function () {
            return Object.keys(this.__holders)
        };
        CachePool.prototype.updateHolder = function (key, holder) {
            this.__holders[key] = holder;
            return holder
        };
        CachePool.prototype.updateValue = function (key, value, lifeSpan, now) {
            var holder = new CacheHolder(value, lifeSpan, now);
            return this.updateHolder(key, holder)
        };
        CachePool.prototype.erase = function (key, now) {
            var old = null;
            if (now) {
                old = this.fetch(key, now)
            }
            delete this.__holders[key];
            return old
        };
        CachePool.prototype.fetch = function (key, now) {
            var holder = this.__holders[key];
            if (!holder) {
                return null
            } else if (holder.isAlive(now)) {
                return new CachePair(holder.getValue(), holder)
            } else {
                return new CachePair(null, holder)
            }
        };
        CachePool.prototype.purge = function (now) {
            now = parseDateTime(now);
            var count = 0;
            var all_holders = this.__holders;
            Mapper.forEach(all_holders, function (key, holder) {
                if (!holder || holder.isDeprecated(now)) {
                    delete all_holders[key];
                    ++count
                }
                return false
            });
            return count
        };
        var CacheRunner = function (duration) {
            Runner.call(this);
            duration = parseDuration(duration, 300);
            this.__interval = duration;
            this.__expired = duration.addTo(new Date());
            this.__pools = {};
            this.__thread = new Thread(this)
        };
        Class(CacheRunner, Runner, null);
        CacheRunner.prototype.start = function () {
            this.__thread.start()
        };
        CacheRunner.prototype.stop = function () {
            this.__thread.stop()
        };
        CacheRunner.prototype.process = function () {
            var now = new Date();
            if (now.getTime() > this.__expired.getTime()) {
                this.__expired = this.__interval.addTo(now);
                try {
                    var cnt = this.purge(now);
                    if (cnt > 0) {
                        Log.info('CacheManager: ' + cnt + ' object(s) removed.')
                    }
                } catch (e) {
                    Log.error('CacheManager::run()', e)
                }
            }
            return false
        };
        CacheRunner.prototype.purge = function (now) {
            var count = 0;
            Mapper.forEach(this.__pools, function (name, pool) {
                if (pool) {
                    count += pool.purge(now)
                }
                return false
            });
            return count
        };
        CacheRunner.prototype.getPool = function (name) {
            var pool = this.__pools[name];
            if (!pool) {
                pool = new CachePool();
                this.__pools[name] = pool
            }
            return pool
        };
        sg.lnc.CacheManager = {
            getPool: function (name) {
                this.getInstance();
                return this.cacheRunner.getPool(name)
            }, getInstance: function () {
                if (!this.cacheRunner) {
                    this.cacheRunner = new CacheRunner();
                    this.cacheRunner.start()
                }
                return this
            }, cacheRunner: null
        };
        var CacheManager = sg.lnc.CacheManager;
        sg.ip.Host = function (string, ip, port, data) {
            ConstantString.call(this, string);
            this.ip = ip;
            this.port = port;
            this.data = data
        };
        var Host = sg.ip.Host;
        Class(Host, ConstantString, null);
        Host.prototype.toArray = function (default_port) {
            var data = this.data;
            var port = this.port;
            var len = data.length;
            var array, index;
            if (!port || port === default_port) {
                array = new Uint8Array(len);
                for (index = 0; index < len; ++index) {
                    array[index] = data[index]
                }
            } else {
                array = new Uint8Array(len + 2);
                for (index = 0; index < len; ++index) {
                    array[index] = data[index]
                }
                array[len] = port >> 8;
                array[len + 1] = port & 0xFF
            }
            return array
        };
        sg.ip.IPv4 = function (ip, port, data) {
            if (data) {
                if (!ip) {
                    ip = data[0] + '.' + data[1] + '.' + data[2] + '.' + data[3];
                    if (data.length === 6) {
                        port = (data[4] << 8) | data[5]
                    }
                }
            } else if (ip) {
                data = new Uint8Array(4);
                var array = ip.split('.');
                for (var index = 0; index < 4; ++index) {
                    data[index] = parseInt(array[index], 10)
                }
            } else {
                throw new URIError('IP data empty: ' + data + ', ' + ip + ', ' + port);
            }
            var string;
            if (port === 0) {
                string = ip
            } else {
                string = ip + ':' + port
            }
            Host.call(this, string, ip, port, data)
        };
        var IPv4 = sg.ip.IPv4;
        Class(IPv4, Host, null);
        IPv4.patten = /^(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?$/;
        IPv4.parse = function (host) {
            if (!this.patten.test(host)) {
                return null
            }
            var pair = host.split(':');
            var ip = pair[0], port = 0;
            if (pair.length === 2) {
                port = parseInt(pair[1])
            }
            return new IPv4(ip, port)
        };
        var parse_v4 = function (data, array) {
            var item, index = data.byteLength;
            for (var i = array.length - 1; i >= 0; --i) {
                item = array[i];
                data[--index] = item
            }
            return data
        };
        var parse_v6 = function (data, ip, count) {
            var array, item, index;
            var pos = ip.indexOf('::');
            if (pos < 0) {
                array = ip.split(':');
                index = -1;
                for (var i = 0; i < count; ++i) {
                    item = parseInt(array[i], 16);
                    data[++index] = item >> 8;
                    data[++index] = item & 0xFF
                }
            } else {
                var left = ip.substring(0, pos).split(':');
                index = -1;
                for (var j = 0; j < left.length; ++j) {
                    item = parseInt(left[j], 16);
                    data[++index] = item >> 8;
                    data[++index] = item & 0xFF
                }
                var right = ip.substring(pos + 2).split(':');
                index = count * 2;
                for (var k = right.length - 1; k >= 0; --k) {
                    item = parseInt(right[k], 16);
                    data[--index] = item & 0xFF;
                    data[--index] = item >> 8
                }
            }
            return data
        };
        var hex_encode_ip_number = function (hi, lo) {
            if (hi > 0) {
                if (lo >= 16) {
                    return Number(hi).toString(16) + Number(lo).toString(16)
                }
                return Number(hi).toString(16) + '0' + Number(lo).toString(16)
            } else {
                return Number(lo).toString(16)
            }
        };
        sg.ip.IPv6 = function (ip, port, data) {
            if (data) {
                if (!ip) {
                    ip = hex_encode_ip_number(data[0], data[1]);
                    for (var index = 2; index < 16; index += 2) {
                        ip += ':' + hex_encode_ip_number(data[index], data[index + 1])
                    }
                    ip = ip.replace(/:(0:){2,}/, '::');
                    ip = ip.replace(/^(0::)/, '::');
                    ip = ip.replace(/(::0)$/, '::');
                    if (data.length === 18) {
                        port = (data[16] << 8) | data[17]
                    }
                }
            } else if (ip) {
                data = new Uint8Array(16);
                var array = ip.split('.');
                if (array.length === 1) {
                    data = parse_v6(data, ip, 8)
                } else if (array.length === 4) {
                    var prefix = array[0];
                    var pos = prefix.lastIndexOf(':');
                    array[0] = prefix.substring(pos + 1);
                    prefix = prefix.substring(0, pos);
                    data = parse_v6(data, prefix, 6);
                    data = parse_v4(data, array)
                } else {
                    throw new URIError('IPv6 format error: ' + ip);
                }
            } else {
                throw new URIError('IP data empty: ' + data + ', ' + ip + ', ' + port);
            }
            var string;
            if (port === 0) {
                string = ip
            } else {
                string = '[' + ip + ']:' + port
            }
            Host.call(this, string, ip, port, data)
        };
        var IPv6 = sg.ip.IPv6;
        Class(IPv6, Host, null);
        IPv6.patten = /^\[?([0-9A-Fa-f]{0,4}:){2,7}[0-9A-Fa-f]{0,4}(]:\d{1,5})?$/;
        IPv6.patten_compat = /^\[?([0-9A-Fa-f]{0,4}:){2,6}(\d{1,3}.){3}\d{1,3}(]:\d{1,5})?$/;
        IPv6.parse = function (host) {
            if (!this.patten.test(host) && !this.patten_compat.test(host)) {
                return null
            }
            var ip, port;
            if (host.charAt(0) === '[') {
                var pos = host.indexOf(']');
                ip = host.substring(1, pos);
                port = parseInt(host.substring(pos + 2))
            } else {
                ip = host;
                port = 0
            }
            return new IPv6(ip, port)
        };
        var ws_connect = function (url, proxy) {
            var ws = new WebSocket(url);
            ws.onopen = function (ev) {
                proxy.onConnected()
            };
            ws.onclose = function (ev) {
                proxy.onClosed()
            };
            ws.onerror = function (ev) {
                var error = new Error('WebSocket error: ' + ev);
                proxy.onError(error)
            };
            ws.onmessage = function (ev) {
                var data = ev.data;
                if (!data || data.length === 0) {
                    return
                } else if (typeof data === 'string') {
                    data = UTF8.encode(data)
                } else if (data instanceof Uint8Array) {
                } else {
                    data = new Uint8Array(data)
                }
                proxy.onReceived(data)
            };
            return ws
        };
        var build_ws_url = function (host, port) {
            if ('https' === window.location.protocol.split(':')[0]) {
                return 'wss://' + host + ':' + port
            } else {
                return 'ws://' + host + ':' + port
            }
        };
        sg.ws.Socket = function () {
            BaseObject.call(this);
            this.__packages = [];
            this.__connected = -1;
            this.__closed = -1;
            this.__host = null;
            this.__port = null;
            this.__ws = null;
            this.__remote = null;
            this.__local = null
        };
        var Socket = sg.ws.Socket;
        Class(Socket, BaseObject, null);
        Socket.prototype.getHost = function () {
            return this.__host
        };
        Socket.prototype.getPort = function () {
            return this.__port
        };
        Socket.prototype.onConnected = function () {
            this.__connected = true
        };
        Socket.prototype.onClosed = function () {
            this.__closed = true
        };
        Socket.prototype.onError = function (error) {
            this.__connected = false
        };
        Socket.prototype.onReceived = function (data) {
            this.__packages.push(data)
        };
        Socket.prototype.configureBlocking = function () {
        };
        Socket.prototype.isBlocking = function () {
            return false
        };
        Socket.prototype.isOpen = function () {
            return this.__closed === false
        };
        Socket.prototype.isConnected = function () {
            return this.__connected === true
        };
        Socket.prototype.isBound = function () {
            return this.__connected === true
        };
        Socket.prototype.isAlive = function () {
            return this.isOpen() && (this.isConnected() || this.isBound())
        };
        Socket.prototype.getRemoteAddress = function () {
            return this.__remote
        };
        Socket.prototype.getLocalAddress = function () {
            return this.__local
        };
        Socket.prototype.bind = function (local) {
            this.__local = local
        };
        Socket.prototype.connect = function (remote) {
            this.close();
            this.__closed = false;
            this.__connected = false;
            this.__remote = remote;
            this.__host = remote.getHost();
            this.__port = remote.getPort();
            var url = build_ws_url(this.__host, this.__port);
            this.__ws = ws_connect(url, this)
        };
        Socket.prototype.close = function () {
            if (this.__ws) {
                this.__ws.close();
                this.__ws = null
            }
        };
        Socket.prototype.read = function (maxLen) {
            if (this.__packages.length > 0) {
                return this.__packages.shift()
            } else {
                return null
            }
        };
        Socket.prototype.write = function (data) {
            this.__ws.send(data);
            return data.length
        };
        Socket.prototype.receive = function (maxLen) {
            var remote;
            var data = this.read(maxLen);
            if (data) {
                remote = this.getRemoteAddress()
            } else {
                remote = null
            }
            return [data, remote]
        };
        Socket.prototype.send = function (data, remote) {
            return this.write(data)
        };
        sg.ws.StreamChannelReader = function (channel) {
            ChannelController.call(this, channel)
        };
        var StreamChannelReader = sg.ws.StreamChannelReader;
        Class(StreamChannelReader, ChannelController, [SocketReader]);
        Implementation(StreamChannelReader, {
            read: function (maxLen) {
                var sock = this.getSocket();
                if (sock && sock.isOpen()) {
                    return SocketHelper.socketReceive(sock, maxLen)
                } else {
                    throw new Error('Socket channel closed: ' + sock);
                }
            }, receive: function (maxLen) {
                var remote;
                var data = this.read(maxLen);
                if (data) {
                    remote = this.getRemoteAddress()
                } else {
                    remote = null
                }
                return [data, remote]
            }
        });
        sg.ws.StreamChannelWriter = function (channel) {
            ChannelController.call(this, channel)
        };
        var StreamChannelWriter = sg.ws.StreamChannelWriter;
        Class(StreamChannelWriter, ChannelController, [SocketWriter]);
        Implementation(StreamChannelWriter, {
            write: function (data) {
                var sock = this.getSocket();
                if (sock && sock.isOpen()) {
                    return SocketHelper.socketSend(sock, data)
                } else {
                    throw new Error('Socket channel closed: ' + sock);
                }
            }, send: function (data, target) {
                return this.write(data)
            }
        });
        sg.ws.StreamChannel = function (remote, local) {
            BaseChannel.call(this, remote, local)
        };
        var StreamChannel = sg.ws.StreamChannel;
        Class(StreamChannel, BaseChannel, null);
        Implementation(StreamChannel, {
            createReader: function () {
                return new StreamChannelReader(this)
            }, createWriter: function () {
                return new StreamChannelWriter(this)
            }
        });
        sg.ws.ChannelPool = function () {
            AddressPairMap.call(this)
        };
        var ChannelPool = sg.ws.ChannelPool;
        Class(ChannelPool, AddressPairMap, null);
        Implementation(ChannelPool, {
            set: function (remote, local, value) {
                var cached = AddressPairMap.prototype.remove.call(this, remote, local, value);
                AddressPairMap.prototype.set.call(this, remote, local, value);
                return cached
            }
        })
        sg.ws.StreamHub = function (gate) {
            BaseHub.call(this, gate);
            this.__channelPool = this.createChannelPool()
        };
        var StreamHub = sg.ws.StreamHub;
        Class(StreamHub, BaseHub, null);
        StreamHub.prototype.createChannelPool = function () {
            return new ChannelPool()
        };
        StreamHub.prototype.createChannel = function (remote, local) {
            return new StreamChannel(remote, local)
        };
        StreamHub.prototype.allChannels = function () {
            return this.__channelPool.items()
        };
        StreamHub.prototype.removeChannel = function (remote, local, channel) {
            return this.__channelPool.remove(remote, null, channel)
        };
        StreamHub.prototype.getChannel = function (remote, local) {
            return this.__channelPool.get(remote, null)
        };
        StreamHub.prototype.setChannel = function (remote, local, channel) {
            return this.__channelPool.set(remote, null, channel)
        };
        StreamHub.prototype.removeConnection = function (remote, local, connection) {
            return BaseHub.prototype.removeConnection.call(this, remote, null, connection)
        };
        StreamHub.prototype.getConnection = function (remote, local) {
            return BaseHub.prototype.getConnection.call(this, remote, null)
        };
        StreamHub.prototype.setConnection = function (remote, local, connection) {
            return BaseHub.prototype.setConnection.call(this, remote, null, connection)
        };
        sg.ws.ClientHub = function (delegate) {
            StreamHub.call(this, delegate)
        };
        var ClientHub = sg.ws.ClientHub;
        Class(ClientHub, StreamHub, null);
        Implementation(ClientHub, {
            createConnection: function (remote, local) {
                var conn = new ActiveConnection(remote, local);
                conn.setDelegate(this.getDelegate());
                return conn
            }, open: function (remote, local) {
                if (!remote) {
                    throw new ReferenceError('remote address empty')
                }
                var channel = this.getChannel(remote, local);
                if (channel) {
                    if (!local) {
                        return channel
                    }
                    var address = channel.getLocalAddress();
                    if (!address || address.equals(local)) {
                        return channel
                    }
                }
                channel = this.createChannel(remote, local);
                if (!local) {
                    local = channel.getLocalAddress()
                }
                var cached = this.setChannel(remote, local, channel);
                if (cached && cached !== channel) {
                    cached.close()
                }
                if (channel instanceof BaseChannel) {
                    var sock = createWebSocketClient(remote, local);
                    if (sock) {
                        channel.setSocket(sock)
                    } else {
                        Log.error('[WS] failed to prepare socket', remote, local);
                        this.removeChannel(remote, local, channel);
                        channel = null
                    }
                }
                return channel
            }
        });
        var createWebSocketClient = function (remote, local) {
            var sock = new Socket();
            sock.configureBlocking(true);
            if (local) {
                sock.bind(local)
            }
            sock.connect(remote);
            sock.configureBlocking(false);
            return sock
        };
        sg.PlainArrival = function (data, now) {
            ArrivalShip.call(this, now);
            this.__data = data
        };
        var PlainArrival = sg.PlainArrival;
        Class(PlainArrival, ArrivalShip, null);
        PlainArrival.prototype.getPayload = function () {
            return this.__data
        };
        PlainArrival.prototype.getSN = function () {
            return null
        };
        PlainArrival.prototype.assemble = function (arrival) {
            return arrival
        };
        sg.PlainDeparture = function (data, prior) {
            if (!prior) {
                prior = 0
            }
            DepartureShip.call(this, prior, 1);
            this.__completed = data;
            this.__fragments = [data]
        };
        var PlainDeparture = sg.PlainDeparture;
        Class(PlainDeparture, DepartureShip, null);
        PlainDeparture.prototype.getPayload = function () {
            return this.__completed
        };
        PlainDeparture.prototype.getSN = function () {
            return null
        };
        PlainDeparture.prototype.getFragments = function () {
            return this.__fragments
        };
        PlainDeparture.prototype.checkResponse = function (arrival) {
            return false
        };
        PlainDeparture.prototype.isImportant = function (arrival) {
            return false
        };
        sg.PlainPorter = function (remote, local) {
            StarPorter.call(this, remote, local)
        };
        var PlainPorter = sg.PlainPorter;
        Class(PlainPorter, StarPorter, null);
        Implementation(PlainPorter, {
            createArrival: function (data) {
                return new PlainArrival(data, null)
            }, createDeparture: function (data, priority) {
                return new PlainDeparture(data, priority)
            }, getArrivals: function (data) {
                if (!data || data.length === 0) {
                    return []
                }
                return [this.createArrival(data)]
            }, checkArrival: function (income) {
                var data = income.getPayload();
                if (data.length === 4) {
                    init_bytes();
                    if (bytes_equal(data, PING)) {
                        this.send(PONG, Departure.Priority.SLOWER);
                        return null
                    } else if (bytes_equal(data, PONG) || bytes_equal(data, NOOP)) {
                        return null
                    }
                }
                return income
            }, send: function (payload, priority) {
                var ship = this.createDeparture(payload, priority);
                return this.sendShip(ship)
            }, sendData: function (payload) {
                var priority = Departure.Priority.NORMAL;
                return this.send(payload, priority)
            }, heartbeat: function () {
                init_bytes();
                var priority = Departure.Priority.SLOWER;
                this.send(PING, priority)
            }
        });
        var bytes_equal = function (data1, data2) {
            if (data1.length !== data2.length) {
                return false
            }
            for (var i = data1.length - 1; i >= 0; --i) {
                if (data1[i] !== data2[i]) {
                    return false
                }
            }
            return true
        };
        var init_bytes = function () {
            if (typeof PING === 'string') {
                PING = UTF8.encode(PING);
                PONG = UTF8.encode(PONG);
                NOOP = UTF8.encode(NOOP)
            }
        }
        var PING = 'PING';
        var PONG = 'PONG';
        var NOOP = 'NOOP';
        sg.BaseGate = function (keeper) {
            StarGate.call(this, keeper);
            this.__hub = null
        };
        var BaseGate = sg.BaseGate;
        Class(BaseGate, StarGate, null);
        Implementation(BaseGate, {
            setHub: function (hub) {
                this.__hub = hub
            }, getHub: function () {
                return this.__hub
            }, removePorter: function (remote, local, porter) {
                return StarGate.prototype.removePorter.call(this, remote, null, porter)
            }, getPorter: function (remote, local) {
                return StarGate.prototype.getPorter.call(this, remote, null)
            }, setPorter: function (remote, local, porter) {
                return StarGate.prototype.setPorter.call(this, remote, null, porter)
            }, fetchPorter: function (remote, local) {
                var hub = this.getHub();
                if (!hub) {
                    throw new ReferenceError('Gate hub not found');
                }
                var conn = hub.connect(remote, local);
                if (!conn) {
                    return null
                }
                return this.dock(conn, true)
            }, sendResponse: function (payload, ship, remote, local) {
                var docker = this.getPorter(remote, local);
                if (!docker) {
                    Log.error('docker not found', remote, local);
                    return false
                } else if (!docker.isAlive()) {
                    Log.error('docker not alive', remote, local);
                    return false
                }
                return docker.sendData(payload)
            }, heartbeat: function (connection) {
                if (connection instanceof ActiveConnection) {
                    StarGate.prototype.heartbeat.call(this, connection)
                }
            }
        });
        sg.AutoGate = function (delegate) {
            BaseGate.call(this, delegate);
            this.__running = false;
            this.__thread = new Thread(this)
        };
        var AutoGate = sg.AutoGate;
        Class(AutoGate, BaseGate, [Runnable]);
        Implementation(AutoGate, {
            isRunning: function () {
                return this.__running
            }, start: function () {
                this.__running = true;
                this.__thread.start()
            }, stop: function () {
                this.__running = false
            }, run: function () {
                if (!this.isRunning()) {
                    return false
                }
                var busy = this.process();
                if (busy) {
                    Log.debug('client busy', busy)
                }
                return true
            }, process: function () {
                var hub = this.getHub();
                try {
                    var incoming = hub.process();
                    var outgoing = BaseGate.prototype.process.call(this);
                    return incoming || outgoing
                } catch (e) {
                    Log.error('client process error', e)
                }
            }, getChannel: function (remote, local) {
                var hub = this.getHub();
                return hub.open(remote, local)
            }
        });
        sg.WSClientGate = function (delegate) {
            AutoGate.call(this, delegate)
        };
        var WSClientGate = sg.WSClientGate;
        Class(WSClientGate, AutoGate, null);
        Implementation(WSClientGate, {
            createPorter: function (remote, local) {
                var docker = new PlainPorter(remote, local);
                docker.setDelegate(this.getDelegate());
                return docker
            }, sendMessage: function (payload, remote, local) {
                var docker = this.fetchPorter(remote, local);
                if (!docker) {
                    Log.error('docker not found', remote, local);
                    return false
                } else if (!docker.isAlive()) {
                    Log.error('docker not alive', remote, local);
                    return false
                }
                return docker.sendData(payload)
            }
        })
    })(StarTrek, StarTrek, FiniteStateMachine, MONKEY)
})(DIMP);
(function (app, sdk, dimp, dkd, mkm, mk) {
    var fsm = sdk.fsm;
    var st = sdk.network;
    var sg = sdk.network;
    if (typeof app.compat !== 'object') {
        app.compat = {}
    }
    if (typeof app.dbi !== 'object') {
        app.dbi = {}
    }
    if (typeof app.utils !== 'object') {
        app.utils = {}
    }
    if (typeof app.database !== 'object') {
        app.database = {}
    }
    if (typeof app.group !== 'object') {
        app.group = {}
    }
    if (typeof app.network !== 'object') {
        app.network = {}
    }
    if (typeof app.cpu !== 'object') {
        app.cpu = {}
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
    var HashSet = mk.type.HashSet;
    var Enum = mk.type.Enum;
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
    var SHA256 = mk.digest.SHA256;
    var RIPEMD160 = mk.digest.RIPEMD160;
    var KECCAK256 = mk.digest.KECCAK256;
    var TransportableData = mk.protocol.TransportableData;
    var PortableNetworkFile = mk.protocol.PortableNetworkFile;
    var SymmetricAlgorithms = mk.protocol.SymmetricAlgorithms;
    var AsymmetricAlgorithms = mk.protocol.AsymmetricAlgorithms;
    var EncryptKey = mk.protocol.EncryptKey;
    var DecryptKey = mk.protocol.DecryptKey;
    var VerifyKey = mk.protocol.VerifyKey;
    var SymmetricKey = mk.protocol.SymmetricKey;
    var AsymmetricKey = mk.protocol.AsymmetricKey;
    var PublicKey = mk.protocol.PublicKey;
    var PrivateKey = mk.protocol.PrivateKey;
    var BaseSymmetricKey = mk.crypto.BaseSymmetricKey;
    var BasePublicKey = mk.crypto.BasePublicKey;
    var BasePrivateKey = mk.crypto.BasePrivateKey;
    var EntityType = mkm.protocol.EntityType;
    var Address = mkm.protocol.Address;
    var ID = mkm.protocol.ID;
    var IDFactory = mkm.protocol.ID.Factory;
    var Meta = mkm.protocol.Meta;
    var MetaFactory = mkm.protocol.Meta.Factory;
    var Document = mkm.protocol.Document;
    var DocumentFactory = mkm.protocol.Document.Factory;
    var Visa = mkm.protocol.Visa;
    var Bulletin = mkm.protocol.Bulletin;
    var MetaType = mkm.protocol.MetaType;
    var DocumentType = mkm.protocol.DocumentType;
    var Identifier = mkm.mkm.Identifier;
    var IdentifierFactory = mkm.mkm.IdentifierFactory;
    var BTCAddress = mkm.mkm.BTCAddress;
    var ETHAddress = mkm.mkm.ETHAddress;
    var BaseAddressFactory = mkm.mkm.BaseAddressFactory;
    var BaseMeta = mkm.mkm.BaseMeta;
    var DefaultMeta = mkm.mkm.DefaultMeta;
    var BTCMeta = mkm.mkm.BTCMeta;
    var ETHMeta = mkm.mkm.ETHMeta;
    var BaseMetaFactory = mkm.mkm.BaseMetaFactory;
    var BaseDocument = mkm.mkm.BaseDocument;
    var BaseBulletin = mkm.mkm.BaseBulletin;
    var BaseVisa = mkm.mkm.BaseVisa;
    var Station = mkm.mkm.Station;
    var ServiceProvider = mkm.mkm.ServiceProvider;
    var MetaUtils = mkm.mkm.MetaUtils;
    var DocumentUtils = mkm.mkm.DocumentUtils;
    var Group = mkm.mkm.Group;
    var GroupDataSource = mkm.mkm.Group.DataSource;
    var MetaHelper = mkm.ext.MetaHelper;
    var DocumentHelper = mkm.ext.DocumentHelper;
    var SharedAccountExtensions = mkm.ext.SharedAccountExtensions;
    var InstantMessage = dkd.protocol.InstantMessage;
    var SecureMessage = dkd.protocol.SecureMessage;
    var ReliableMessage = dkd.protocol.ReliableMessage;
    var Envelope = dkd.protocol.Envelope;
    var Content = dkd.protocol.Content;
    var Command = dkd.protocol.Command;
    var ContentType = dkd.protocol.ContentType;
    var TextContent = dkd.protocol.TextContent;
    var ForwardContent = dkd.protocol.ForwardContent;
    var ArrayContent = dkd.protocol.ArrayContent;
    var FileContent = dkd.protocol.FileContent;
    var NameCard = dkd.protocol.NameCard;
    var CustomizedContent = dkd.protocol.CustomizedContent;
    var MetaCommand = dkd.protocol.MetaCommand;
    var DocumentCommand = dkd.protocol.DocumentCommand;
    var GroupCommand = dkd.protocol.GroupCommand;
    var ResetCommand = dkd.protocol.ResetCommand;
    var ResignCommand = dkd.protocol.ResignCommand;
    var ReceiptCommand = dkd.protocol.ReceiptCommand;
    var MessageEnvelope = dkd.msg.MessageEnvelope;
    var BaseMessage = dkd.msg.BaseMessage;
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
    var BaseMoneyContent = dkd.dkd.BaseMoneyContent;
    var TransferMoneyContent = dkd.dkd.TransferMoneyContent;
    var ListContent = dkd.dkd.ListContent;
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
    var ContentHelper = dkd.ext.ContentHelper;
    var InstantMessageHelper = dkd.ext.InstantMessageHelper;
    var SecureMessageHelper = dkd.ext.SecureMessageHelper;
    var ReliableMessageHelper = dkd.ext.ReliableMessageHelper;
    var CommandHelper = dkd.ext.CommandHelper;
    var ExtensionLoader = dimp.ext.ExtensionLoader;
    var PluginLoader = dimp.ext.PluginLoader;
    var MessageUtils = sdk.msg.MessageUtils;
    var CipherKeyDelegate = sdk.core.CipherKeyDelegate;
    var MessageCompressor = sdk.core.MessageCompressor;
    var MessageShortener = sdk.core.MessageShortener;
    var Archivist = sdk.core.Archivist;
    var Barrack = sdk.core.Barrack;
    var TwinsHelper = sdk.TwinsHelper;
    var Facebook = sdk.Facebook;
    var Messenger = sdk.Messenger;
    var MessagePacker = sdk.MessagePacker;
    var MessageProcessor = sdk.MessageProcessor;
    var GeneralContentProcessorFactory = sdk.cpu.GeneralContentProcessorFactory;
    var BaseContentProcessor = sdk.cpu.BaseContentProcessor;
    var BaseCommandProcessor = sdk.cpu.BaseCommandProcessor;
    var BaseCustomizedHandler = sdk.cpu.BaseCustomizedHandler;
    var CustomizedContentProcessor = sdk.cpu.CustomizedContentProcessor;
    var BaseContentProcessorCreator = sdk.cpu.BaseContentProcessorCreator;
    var Duration = fsm.type.Duration;
    var Processor = fsm.skywalker.Processor;
    var Runner = fsm.skywalker.Runner;
    var Thread = fsm.threading.Thread;
    var Context = fsm.Context;
    var AutoMachine = fsm.AutoMachine;
    var BaseState = fsm.BaseState;
    var BaseTransition = fsm.BaseTransition;
    var InetSocketAddress = st.type.InetSocketAddress;
    var Departure = st.port.Departure;
    var PorterDelegate = st.port.PorterDelegate;
    var PorterStatus = st.port.PorterStatus;
    var BaseConnection = st.socket.BaseConnection;
    var StarPorter = st.StarPorter;
    var Storage = sg.dos.LocalStorage;
    var Log = sg.lnc.Log;
    var ClientHub = sg.ws.ClientHub;
    var CommonGate = sg.WSClientGate;
    var PlainPorter = sg.PlainPorter;
    var PlainArrival = sg.PlainArrival;
    var PlainDeparture = sg.PlainDeparture;
    app.utils.MemoryCache = Interface(null, null);
    var MemoryCache = app.utils.MemoryCache;
    MemoryCache.prototype = {
        get: function (key) {
        }, put: function (key, value) {
        }, reduceMemory: function () {
        }
    };
    app.utils.ThanosCache = function () {
        BaseObject.call(this);
        this.__caches = {}
    };
    var ThanosCache = app.utils.ThanosCache;
    Class(ThanosCache, BaseObject, [MemoryCache]);
    ThanosCache.prototype.get = function (key) {
        return this.__caches[key]
    };
    ThanosCache.prototype.put = function (key, value) {
        if (value) {
            this.__caches[key] = value
        } else {
            delete this.__caches[key]
        }
    };
    ThanosCache.prototype.reduceMemory = function () {
        var finger = 0;
        finger = thanos(this.__caches, finger);
        return finger >> 1
    };
    var thanos = function (planet, finger) {
        var keys = Object.keys(planet);
        var k;
        for (var i = 0; i < keys.length; ++i) {
            k = keys[i];
            finger += 1;
            if ((finger & 1) === 1) {
                delete planet[k]
            }
        }
        return finger
    };
    app.utils.FrequencyChecker = function (lifeSpan) {
        BaseObject.call(this);
        if (lifeSpan instanceof Duration) {
        } else {
            var seconds = Converter.getFloat(lifeSpan, 300);
            lifeSpan = Duration.ofSeconds(seconds)
        }
        this.__expires = lifeSpan;
        this.__records = {}
    };
    var FrequencyChecker = app.utils.FrequencyChecker;
    Class(FrequencyChecker, BaseObject, null);
    FrequencyChecker.prototype.checkExpired = function (key, now) {
        var expired = this.__records[key];
        if (expired && expired.getTime() > now.getTime()) {
            return false
        }
        this.__records[key] = this.__expires.addTo(now);
        return true
    };
    FrequencyChecker.prototype.forceExpired = function (key, now) {
        this.__records[key] = this.__expires.addTo(now);
        return true
    };
    FrequencyChecker.prototype.isExpired = function (key, now, force) {
        now = Converter.getDateTime(now, null);
        if (!now) {
            now = new Date()
        }
        if (force) {
            return this.forceExpired(key, now)
        } else {
            return this.checkExpired(key, now)
        }
    };
    app.utils.RecentTimeChecker = function () {
        this.__times = {}
    };
    var RecentTimeChecker = app.utils.RecentTimeChecker
    Class(RecentTimeChecker, null, null);
    RecentTimeChecker.prototype.setLastTime = function (key, when) {
        if (!when) {
            return false
        } else {
            when = Converter.getDateTime(when, null)
        }
        var last = this.__times[key];
        if (!last || last.getTime() < when.getTime()) {
            this.__times[key] = when;
            return true
        } else {
            return false
        }
    };
    RecentTimeChecker.prototype.isExpired = function (key, now) {
        if (!now) {
            return true
        } else {
            now = Converter.getDateTime(now, null)
        }
        var last = this.__times[key];
        return last && last.getTime() > now.getTime()
    };
    mkm.protocol.BroadcastUtils = {
        getGroupSeed: function (group_id) {
            var name = group_id.getName();
            if (name) {
                var len = name.length;
                if (len === 0) {
                    return null
                } else if (name === 8 && name.toLowerCase() === 'everyone') {
                    return null
                }
            }
            return name
        }, getBroadcastFounder: function (group_id) {
            var name = this.getGroupSeed(group_id);
            if (!name) {
                return ID.FOUNDER
            } else {
                return ID.parse(name + '.founder@anywhere')
            }
        }, getBroadcastOwner: function (group_id) {
            var name = this.getGroupSeed(group_id);
            if (!name) {
                return ID.ANYONE
            } else {
                return ID.parse(name + '.owner@anywhere')
            }
        }, getBroadcastMembers: function (group_id) {
            var name = this.getGroupSeed(group_id);
            if (!name) {
                return [ID.ANYONE]
            } else {
                var owner = ID.parse(name + '.owner@anywhere');
                var member = ID.parse(name + '.member@anywhere');
                return [owner, member]
            }
        }
    };
    var BroadcastUtils = mkm.protocol.BroadcastUtils;
    dkd.protocol.BlockCommand = Interface(null, [Command]);
    var BlockCommand = dkd.protocol.BlockCommand;
    Command.BLOCK = 'block';
    BlockCommand.prototype.setBlockCList = function (list) {
    };
    BlockCommand.prototype.getBlockCList = function () {
    };
    BlockCommand.fromList = function (contacts) {
        return new BaseBlockCommand(contacts)
    };
    dkd.dkd.BaseBlockCommand = function () {
        var list = null;
        if (arguments.length === 0) {
            BaseCommand.call(this, Command.BLOCK)
        } else if (arguments[0] instanceof Array) {
            BaseCommand.call(this, Command.BLOCK)
            list = arguments[0]
        } else {
            BaseCommand.call(this, arguments[0])
        }
        if (list) {
            this.setValue('list', ID.revert(list))
        }
        this.__list = list
    };
    var BaseBlockCommand = dkd.dkd.BaseBlockCommand;
    Class(BaseBlockCommand, BaseCommand, [BlockCommand]);
    Implementation(BaseBlockCommand, {
        setBlockCList: function (list) {
            this.__list = list;
            if (list) {
                list = ID.revert(list)
            }
            this.setValue('list', list)
        }, getBlockCList: function () {
            if (this.__list === null) {
                var list = this.getValue('list');
                if (list) {
                    this.__list = ID.convert(list)
                } else {
                    this.__list = []
                }
            }
            return this.__list
        }
    });
    dkd.protocol.QueryCommand = Interface(null, [GroupCommand]);
    var QueryCommand = dkd.protocol.QueryCommand;
    GroupCommand.QUERY = 'query';
    QueryCommand.prototype.getLastTime = function () {
    };
    GroupCommand.query = function (group, lastTime) {
        return new QueryGroupCommand(group, lastTime)
    };
    dkd.dkd.QueryGroupCommand = function () {
        if (arguments.length === 1) {
            var content = arguments[0];
            BaseGroupCommand.call(this, content)
        } else if (arguments.length === 2) {
            var group = arguments[0];
            var lastTime = arguments[1];
            BaseGroupCommand.call(this, GroupCommand.QUERY, group);
            if (lastTime) {
                this.setDateTime('last_time', lastTime)
            }
        } else {
            throw new SyntaxError('arguments error: ' + arguments);
        }
    };
    var QueryGroupCommand = dkd.dkd.QueryGroupCommand;
    Class(QueryGroupCommand, BaseGroupCommand, [QueryCommand]);
    Implementation(QueryGroupCommand, {
        getLastTime: function () {
            return this.getDateTime('last_time', null)
        }
    });
    dkd.protocol.GroupHistory = Interface(null, null);
    var GroupHistory = dkd.protocol.GroupHistory;
    GroupHistory.APP = 'chat.dim.group';
    GroupHistory.MOD = 'history';
    GroupHistory.ACT_QUERY = 'query';
    GroupHistory.queryGroupHistory = function (group, lastTime) {
        var content = CustomizedContent.create(GroupHistory.APP, GroupHistory.MOD, GroupHistory.ACT_QUERY);
        content.setGroup(group);
        if (lastTime) {
            content.setDateTime('last_time', lastTime)
        }
        return content
    };
    dkd.protocol.GroupKeys = Interface(null, null);
    var GroupKeys = dkd.protocol.GroupKeys;
    GroupKeys.APP = 'chat.dim.group';
    GroupKeys.MOD = 'keys';
    GroupKeys.ACT_QUERY = 'query';
    GroupKeys.ACT_UPDATE = 'update';
    GroupKeys.ACT_REQUEST = 'request';
    GroupKeys.ACT_RESPOND = 'respond';
    GroupKeys.create = function (action, group, sender, members, digest, encodedKeys) {
        var content = CustomizedContent.create(GroupKeys.APP, GroupKeys.MOD, action);
        content.setGroup(group);
        content.setString('from', sender);
        if (members instanceof Array) {
            content['to'] = ID.revert(members)
        }
        if (encodedKeys) {
            content['keys'] = encodedKeys
        } else if (digest) {
            content['digest'] = digest
        }
        return content
    };
    GroupKeys.queryGroupKeys = function (group, sender, members, digest) {
        return GroupKeys.create(GroupKeys.ACT_QUERY, group, sender, members, digest, null)
    };
    GroupKeys.updateGroupKeys = function (group, sender, encodedKeys) {
        return GroupKeys.create(GroupKeys.ACT_UPDATE, group, sender, null, null, encodedKeys)
    };
    GroupKeys.requestGroupKey = function (group, sender, digest) {
        return GroupKeys.create(GroupKeys.ACT_REQUEST, group, sender, null, digest, null)
    };
    GroupKeys.respondGroupKey = function (group, sender, member, digest, encodedKey) {
        var keys = {};
        keys['digest'] = digest;
        keys[member.toString()] = encodedKey;
        return GroupKeys.create(GroupKeys.ACT_RESPOND, group, sender, null, null, keys)
    };
    dkd.protocol.HandshakeState = Enum('HandshakeState', {START: 0, AGAIN: 1, RESTART: 2, SUCCESS: 3});
    var HandshakeState = dkd.protocol.HandshakeState;
    HandshakeState.checkState = function (title, session) {
        if (title === 'DIM!') {
            return HandshakeState.SUCCESS
        } else if (title === 'DIM?') {
            return HandshakeState.AGAIN
        } else if (!session) {
            return HandshakeState.START
        } else {
            return HandshakeState.RESTART
        }
    };
    Command.HANDSHAKE = 'handshake';
    dkd.protocol.HandshakeCommand = Interface(null, [Command]);
    var HandshakeCommand = dkd.protocol.HandshakeCommand;
    HandshakeCommand.prototype.getTitle = function () {
    };
    HandshakeCommand.prototype.getSessionKey = function () {
    };
    HandshakeCommand.prototype.getState = function () {
    };
    HandshakeCommand.start = function () {
        return new BaseHandshakeCommand('Hello world!', null)
    };
    HandshakeCommand.restart = function (sessionKey) {
        return new BaseHandshakeCommand('Hello world!', sessionKey)
    };
    HandshakeCommand.again = function (sessionKey) {
        return new BaseHandshakeCommand('DIM?', sessionKey)
    };
    HandshakeCommand.success = function (sessionKey) {
        return new BaseHandshakeCommand('DIM!', sessionKey)
    };
    dkd.dkd.BaseHandshakeCommand = function () {
        var title = null;
        var session = null;
        if (arguments.length === 2) {
            BaseCommand.call(this, Command.HANDSHAKE);
            title = arguments[0];
            session = arguments[1]
        } else if (typeof arguments[0] === 'string') {
            BaseCommand.call(this, Command.HANDSHAKE);
            title = arguments[0]
        } else {
            BaseCommand.call(this, arguments[0])
        }
        if (title) {
            this.setValue('title', title)
        }
        if (session) {
            this.setValue('session', session)
        }
    };
    var BaseHandshakeCommand = dkd.dkd.BaseHandshakeCommand;
    Class(BaseHandshakeCommand, BaseCommand, [HandshakeCommand]);
    Implementation(BaseHandshakeCommand, {
        getTitle: function () {
            return this.getString('title', null)
        }, getSessionKey: function () {
            return this.getString('session', null)
        }, getState: function () {
            return HandshakeState.checkState(this.getTitle(), this.getSessionKey())
        }
    });
    dkd.protocol.LoginCommand = Interface(null, [Command]);
    var LoginCommand = dkd.protocol.LoginCommand;
    Command.LOGIN = 'login';
    LoginCommand.prototype.getIdentifier = function () {
    };
    LoginCommand.prototype.getDevice = function () {
    };
    LoginCommand.prototype.setDevice = function (device) {
    };
    LoginCommand.prototype.getAgent = function () {
    };
    LoginCommand.prototype.setAgent = function (UA) {
    };
    LoginCommand.prototype.getStation = function () {
    };
    LoginCommand.prototype.setStation = function (station) {
    };
    LoginCommand.prototype.getProvider = function () {
    };
    LoginCommand.prototype.setProvider = function (provider) {
    };
    LoginCommand.create = function (identifier) {
        return new BaseLoginCommand(identifier)
    };
    dkd.dkd.BaseLoginCommand = function (info) {
        if (Interface.conforms(info, ID)) {
            BaseCommand.call(this, Command.LOGIN);
            this.setString('did', info)
        } else {
            BaseCommand.call(this, info)
        }
    };
    var BaseLoginCommand = dkd.dkd.BaseLoginCommand;
    Class(BaseLoginCommand, BaseCommand, [LoginCommand]);
    Implementation(BaseLoginCommand, {
        getIdentifier: function () {
            return ID.parse(this.getValue('did'))
        }, getDevice: function () {
            return this.getString('device', null)
        }, setDevice: function (device) {
            this.setValue('device', device)
        }, getAgent: function () {
            return this.getString('agent', null)
        }, setAgent: function (UA) {
            this.setValue('agent', UA)
        }, getStation: function () {
            return this.getValue('station')
        }, setStation: function (station) {
            var info;
            if (!station) {
                info = null
            } else if (station instanceof Station) {
                var sid = station.getIdentifier();
                if (sid.isBroadcast()) {
                    info = {'host': station.getHost(), 'port': station.getPort()}
                } else {
                    info = {'did': sid.toString(), 'host': station.getHost(), 'port': station.getPort()}
                }
            } else {
                info = Wrapper.fetchMap(station)
            }
            this.setValue('station', info)
        }, getProvider: function () {
            return this.getValue('provider')
        }, setProvider: function (provider) {
            var info;
            if (!provider) {
                info = null
            } else if (provider instanceof ServiceProvider) {
                info = {'did': provider.getIdentifier().toString()}
            } else if (Interface.conforms(provider, ID)) {
                info = {'did': provider.toString()}
            } else {
                info = Wrapper.fetchMap(provider)
            }
            this.setValue('provider', info)
        }
    });
    var kFounder = (0x20);
    var kOwner = (0x3F);
    var kAdmin = (0x0F);
    var kMember = (0x07);
    var kOther = (0x00);
    var kFreezing = (0x80);
    var kWaiting = (0x40);
    var kOwnerWaiting = (kOwner | kWaiting);
    var kOwnerFreezing = (kOwner | kFreezing);
    var kAdminWaiting = (kAdmin | kWaiting);
    var kAdminFreezing = (kAdmin | kFreezing);
    var kMemberWaiting = (kMember | kWaiting);
    var kMemberFreezing = (kMember | kFreezing);
    mkm.protocol.MemberType = Enum(null, {
        FOUNDER: kFounder,
        OWNER: kOwner,
        ADMIN: kAdmin,
        MEMBER: kMember,
        OTHER: kOther,
        FREEZING: kFreezing,
        WAITING: kWaiting,
        OWNER_WAITING: kOwnerWaiting,
        OWNER_FREEZING: kOwnerFreezing,
        ADMIN_WAITING: kAdminWaiting,
        ADMIN_FREEZING: kAdminFreezing,
        MEMBER_WAITING: kMemberWaiting,
        MEMBER_FREEZING: kMemberFreezing
    });
    var MemberType = mkm.protocol.MemberType;
    dkd.protocol.MuteCommand = Interface(null, [Command]);
    var MuteCommand = dkd.protocol.MuteCommand;
    Command.MUTE = 'mute';
    MuteCommand.prototype.setMuteCList = function (list) {
    };
    MuteCommand.prototype.getMuteCList = function () {
    };
    MuteCommand.fromList = function (contacts) {
        return new BaseMuteCommand(contacts)
    };
    dkd.dkd.BaseMuteCommand = function (info) {
        var list = null;
        if (arguments.length === 0) {
            BaseCommand.call(this, Command.MUTE)
        } else if (arguments[0] instanceof Array) {
            BaseCommand.call(this, Command.MUTE)
            list = arguments[0]
        } else {
            BaseCommand.call(this, arguments[0])
        }
        if (list) {
            this.setValue('list', ID.revert(list))
        }
        this.__list = list
    };
    var BaseMuteCommand = dkd.dkd.BaseMuteCommand;
    Class(BaseMuteCommand, BaseCommand, [MuteCommand]);
    Implementation(BaseMuteCommand, {
        getMuteCList: function () {
            if (this.__list === null) {
                var list = this.getValue('list');
                if (list) {
                    this.__list = ID.convert(list)
                } else {
                    this.__list = []
                }
            }
            return this.__list
        }, setMuteCList: function (list) {
            this.__list = list;
            if (list) {
                list = ID.revert(list)
            }
            this.setValue('list', list)
        }
    });
    mk.protocol.Password = function () {
        BaseObject.call(this)
    };
    var Password = mk.protocol.Password;
    Class(Password, BaseObject, null);
    Password.KEY_SIZE = 32;
    Password.BLOCK_SIZE = 16;
    Password.generate = function (password) {
        var data = UTF8.encode(password);
        var digest = SHA256.digest(data);
        var filling = Password.KEY_SIZE - data.length;
        if (filling > 0) {
            var merged = new Uint8Array(Password.KEY_SIZE);
            merged.set(digest.subarray(0, filling));
            merged.set(data, filling);
            data = merged
        } else if (filling < 0) {
            if (Password.KEY_SIZE === digest.length) {
                data = digest
            } else {
                data = digest.subarray(0, Password.KEY_SIZE)
            }
        }
        var iv = digest.subarray(digest.length - Password.BLOCK_SIZE, digest.length);
        var key = {'algorithm': SymmetricAlgorithms.AES, 'data': Base64.encode(data), 'iv': Base64.encode(iv)};
        return SymmetricKey.parse(key)
    };
    dkd.protocol.ReportCommand = Interface(null, [Command]);
    var ReportCommand = dkd.protocol.ReportCommand;
    Command.REPORT = 'report';
    Command.ONLINE = 'online';
    Command.OFFLINE = 'offline';
    ReportCommand.prototype.setTitle = function (title) {
    };
    ReportCommand.prototype.getTitle = function () {
    };
    ReportCommand.fromTitle = function (title) {
        return new BaseReportCommand(title)
    };
    dkd.dkd.BaseReportCommand = function () {
        if (arguments.length === 0) {
            BaseCommand.call(this, ReportCommand.REPORT)
        } else if (typeof arguments[0] === 'string') {
            BaseCommand.call(this, ReportCommand.REPORT);
            this.setTitle(arguments[0])
        } else {
            BaseCommand.call(this, arguments[0])
        }
    };
    var BaseReportCommand = dkd.dkd.BaseReportCommand;
    Class(BaseReportCommand, BaseCommand, [ReportCommand]);
    Implementation(BaseReportCommand, {
        setTitle: function (title) {
            this.setValue('title', title)
        }, getTitle: function () {
            return this.getString('title', null)
        }
    });
    dkd.protocol.SearchCommand = Interface(null, [Command]);
    var SearchCommand = dkd.protocol.SearchCommand;
    Command.SEARCH = 'search';
    Command.ONLINE_USERS = 'users';
    SearchCommand.prototype.setKeywords = function (keywords) {
    };
    SearchCommand.prototype.getKeywords = function () {
    };
    SearchCommand.prototype.setRange = function (start, limit) {
    };
    SearchCommand.prototype.getRange = function () {
    };
    SearchCommand.prototype.setStation = function (sid) {
    };
    SearchCommand.prototype.getStation = function () {
    };
    SearchCommand.prototype.getUsers = function () {
        throw new Error('NotImplemented');
    };
    SearchCommand.fromKeywords = function (keywords) {
        return new BaseSearchCommand(keywords)
    };
    dkd.dkd.BaseSearchCommand = function () {
        var keywords = null;
        if (arguments.length === 0) {
            BaseCommand.call(this, Command.ONLINE_USERS)
        } else if (typeof arguments[0] === 'string') {
            BaseCommand.call(this, Command.SEARCH);
            keywords = arguments[0]
        } else {
            BaseCommand.call(this, arguments[0])
        }
        if (keywords) {
            this.setKeywords(keywords)
        }
    };
    var BaseSearchCommand = dkd.dkd.BaseSearchCommand;
    Class(BaseSearchCommand, BaseCommand, [SearchCommand]);
    Implementation(BaseSearchCommand, {
        setKeywords: function (keywords) {
            if (keywords instanceof Array) {
                keywords = keywords.join(' ')
            } else if (typeof keywords !== 'string') {
                throw new TypeError('keywords error: ' + keywords);
            }
            this.setValue('keywords', keywords)
        }, getKeywords: function () {
            var words = this.getValue('keywords', null);
            if (!words && this.getCmd() === Command.ONLINE_USERS) {
                words = Command.ONLINE_USERS
            }
            return words
        }, setRange: function (start, limit) {
            this.setValue('start', start);
            this.setValue('limit', limit)
        }, getRange: function () {
            var start = this.getInt('start', 0);
            var limit = this.getInt('limit', 50);
            return [start, limit]
        }, setStation: function (sid) {
            return this.setString('station', sid)
        }, getStation: function () {
            return ID.parse(this.getValue('results'))
        }, getUsers: function () {
            var users = this.getValue('users');
            if (users) {
                return ID.convert(users)
            } else {
                return null
            }
        }
    });
    dkd.protocol.StorageCommand = Interface(null, [Command]);
    var StorageCommand = dkd.protocol.StorageCommand;
    Command.STORAGE = 'storage';
    Command.CONTACTS = 'contacts';
    Command.PRIVATE_KEY = 'private_key';
    StorageCommand.prototype.setTitle = function (title) {
    };
    StorageCommand.prototype.getTitle = function () {
    };
    StorageCommand.prototype.setIdentifier = function (identifier) {
    };
    StorageCommand.prototype.getIdentifier = function () {
    };
    StorageCommand.prototype.setData = function (data) {
    };
    StorageCommand.prototype.getData = function () {
    };
    StorageCommand.prototype.decrypt = function (key) {
    };
    StorageCommand.prototype.setKey = function (data) {
    };
    StorageCommand.prototype.getKey = function () {
    };
    dkd.dkd.BaseStorageCommand = function (info) {
        if (typeof info === 'string') {
            BaseCommand.call(this, Command.STORAGE);
            this.setValue('string', info)
        } else {
            BaseCommand.call(this, info)
        }
        this.__data = null;
        this.__plaintext = null;
        this.__key = null;
        this.__password = null
    };
    var BaseStorageCommand = dkd.dkd.BaseStorageCommand;
    Class(BaseStorageCommand, BaseCommand, [StorageCommand]);
    Implementation(BaseStorageCommand, {
        setTitle: function (title) {
            this.setValue('title', title)
        }, getTitle: function () {
            return this.getString('title', null)
        }, setIdentifier: function (identifier) {
            this.setString('did', identifier)
        }, getIdentifier: function () {
            return ID.parse(this.getValue('did'))
        }, setData: function (data) {
            var base64 = null;
            if (data) {
                base64 = Base64.encode(data)
            }
            this.setValue('data', base64);
            this.__data = data;
            this.__plaintext = null
        }, getData: function () {
            if (this.__data === null) {
                var base64 = this.getString('data', null);
                if (base64) {
                    this.__data = Base64.decode(base64)
                }
            }
            return this.__data
        }, setKey: function (data) {
            var base64 = null;
            if (data) {
                base64 = Base64.encode(data)
            }
            this.setValue('key', base64);
            this.__key = data;
            this.__password = null
        }, getKey: function () {
            if (this.__key === null) {
                var base64 = this.getValue('key');
                if (base64) {
                    this.__key = Base64.decode(base64)
                }
            }
            return this.__key
        }, decrypt: function (key) {
            if (Interface.conforms(key, PrivateKey)) {
                return decrypt_password_by_private_key.call(this, key)
            }
            if (Interface.conforms(key, SymmetricKey)) {
                return decrypt_data_by_symmetric_key.call(this, key)
            }
            throw new TypeError('key error: ' + key);
        }
    });
    var decrypt_password_by_private_key = function (privateKey) {
        if (this.__password === null) {
            if (Interface.conforms(privateKey, DecryptKey)) {
                this.__password = decrypt_symmetric_key.call(this, privateKey)
            } else {
                throw new TypeError('private key error: ' + privateKey);
            }
        }
        return decrypt_data_by_symmetric_key.call(this, this.__password)
    };
    var decrypt_data_by_symmetric_key = function (password) {
        if (this.__plaintext === null) {
            if (!password) {
                throw new Error('symmetric key empty');
            }
            var data = this.getData();
            if (data) {
                this.__plaintext = password.decrypt(data, this.toMap())
            }
        }
        return this.__plaintext
    };
    var decrypt_symmetric_key = function (decryptKey) {
        var data = this.getKey();
        if (!data) {
            return
        }
        var key = decryptKey.decrypt(data, this.toMap());
        if (!key) {
            throw new Error('failed to decrypt key');
        }
        var info = JSONMap.decode(UTF8.decode(key));
        return SymmetricKey.parse(info)
    };
    mk.digest.MD5 = {
        digest: function (data) {
            return this.getDigester().digest(data)
        }, getDigester: function () {
            return md5Digester
        }, setDigester: function (digester) {
            md5Digester = digester
        }
    };
    var MD5 = mk.digest.MD5;
    var md5Digester = null;
    mk.digest.SHA1 = {
        digest: function (data) {
            return this.getDigester().digest(data)
        }, getDigester: function () {
            return sha1Digester
        }, setDigester: function (digester) {
            sha1Digester = digester
        }
    };
    var SHA1 = mk.digest.SHA1;
    var sha1Digester = null;
    app.compat.MetaVersion = {DEFAULT: (0x01), MKM: (0x01), BTC: (0x02), ExBTC: (0x03), ETH: (0x04), ExETH: (0x05)};
    var MetaVersion = app.compat.MetaVersion;
    MetaVersion.parseString = function (type) {
        if (IObject.isString(type)) {
            return type
        } else if (IObject.isNumber(type)) {
            return '' + type
        } else {
            return type.toString()
        }
    };
    MetaVersion.hasSeed = function (type) {
        var version = MetaVersion.parseInt(type, 0);
        return 0 < version && (version & 1) === 1
    };
    MetaVersion.parseInt = function (type, defaultValue) {
        if (type === null) {
            return defaultValue
        } else if (IObject.isNumber(type)) {
            return type
        } else if (IObject.isString(type)) {
            if (type === 'MKM' || type === 'mkm') {
                return 1
            } else if (type === 'BTC' || type === 'btc') {
                return 2
            } else if (type === 'ETH' || type === 'eth') {
                return 4
            }
        } else {
            return -1
        }
        try {
            return parseInt(type)
        } catch (e) {
            return -1
        }
    };
    app.compat.UnknownAddress = function (string) {
        ConstantString.call(this, string)
    };
    var UnknownAddress = app.compat.UnknownAddress;
    Class(UnknownAddress, ConstantString, [Address]);
    Implementation(UnknownAddress, {
        getType: function () {
            return 0
        }
    });
    app.compat.CompatibleAddressFactory = function () {
        BaseAddressFactory.call(this)
    };
    var CompatibleAddressFactory = app.compat.CompatibleAddressFactory;
    Class(CompatibleAddressFactory, BaseAddressFactory, null);
    CompatibleAddressFactory.prototype.reduceMemory = function () {
        var finger = 0;
        finger = thanos(this._addresses, finger);
        return finger >> 1
    };
    CompatibleAddressFactory.prototype.parse = function (address) {
        if (!address) {
            return null
        }
        var len = address.length;
        if (len === 8) {
            if (address.toLowerCase() === 'anywhere') {
                return Address.ANYWHERE
            }
        } else if (len === 10) {
            if (address.toLowerCase() === 'everywhere') {
                return Address.EVERYWHERE
            }
        }
        var res;
        if (26 <= len && len <= 35) {
            res = BTCAddress.parse(address)
        } else if (len === 42) {
            res = ETHAddress.parse(address)
        } else {
            res = null
        }
        if (!res && 4 <= len && len <= 64) {
            res = new UnknownAddress(address)
        }
        return res
    };
    app.compat.Compatible = {
        fixMetaAttachment: function (rMsg) {
            var meta = rMsg.getValue('meta');
            if (meta) {
                fixMetaVersion(meta)
            }
        }, fixVisaAttachment: function (rMsg) {
            var visa = rMsg.getValue('visa');
            if (visa) {
                fixDocument(visa)
            }
        }
    };
    var Compatible = app.compat.Compatible;
    var fixMetaVersion = function (meta) {
        var type = meta['type'];
        if (!type) {
            type = meta['version']
        } else if (IObject.isString(type) && !meta['algorithm']) {
            if (type.length > 2) {
                meta['algorithm'] = type
            }
        }
        var version = MetaVersion.parseInt(type, 0);
        if (version > 0) {
            meta['type'] = version;
            meta['version'] = version
        }
    };
    var fixDocument = function (document) {
        fixDid(document);
        return document
    };
    var fixDid = function (content) {
        var did = content['did'];
        if (!did) {
            did = content['ID'];
            if (did) {
                content['did'] = did
            } else {
                console.assert(false, 'did not exists:', content)
            }
        } else if (content['ID']) {
            console.assert(content['ID'] === did, 'did error:', content)
        } else {
            content['ID'] = did
        }
    };
    var fixCmd = function (content) {
        var cmd = content['command'];
        if (!cmd) {
            cmd = content['cmd'];
            if (cmd) {
                content['command'] = cmd
            } else {
                console.assert(false, 'command error:', content)
            }
        } else if (content['cmd']) {
            console.assert(content['cmd'] === cmd, 'command error:', content)
        } else {
            content['cmd'] = cmd
        }
    };
    var fixFileContent = function (content) {
        var pwd = content['key'];
        if (pwd) {
            content['password'] = pwd
        } else {
            pwd = content['password'];
            if (pwd) {
                content['key'] = pwd
            }
        }
    };
    var fileTypes = [ContentType.FILE, 'file', ContentType.IMAGE, 'image', ContentType.AUDIO, 'audio', ContentType.VIDEO, 'video'];
    var array_contains = function (array, value) {
        var i = array.length - 1;
        for (; i >= 0; --i) {
            if (array[i] === value) {
                return true
            }
        }
        return false
    };
    app.compat.CompatibleIncoming = {
        fixContent: function (content) {
            var type = Converter.getString(content['type'], '');
            if (array_contains(fileTypes, type)) {
                fixFileContent(content);
                return
            }
            if (ContentType.NAME_CARD === type || type === 'card') {
                fixDid(content);
                return
            }
            if (ContentType.COMMAND === type || type === 'command') {
                fixCmd(content)
            }
            var cmd = Converter.getString(content['command'], '');
            if (!cmd) {
                return
            }
            if (Command.LOGIN === cmd) {
                fixDid(content);
                return
            }
            if (Command.DOCUMENTS === cmd || cmd === 'document') {
                this._fixDocs(content)
            }
            if (Command.META === cmd || Command.DOCUMENTS === cmd || cmd === 'document') {
                fixDid(content);
                var meta = content['meta'];
                if (meta) {
                    fixMetaVersion(meta)
                }
            }
        }, _fixDocs: function (content) {
            var cmd = content['command'];
            if (cmd === 'document') {
                content['command'] = 'documents'
            }
            var doc = content['document'];
            if (doc) {
                content['documents'] = [fixDocument(doc)];
                delete content['document']
            }
        }
    };
    var CompatibleIncoming = app.compat.CompatibleIncoming;
    var fixType = function (content) {
        var type = content['type'];
        if (IObject.isString(type)) {
            var number = Converter.getInt(type, 0);
            if (number >= 0) {
                content['type'] = number
            }
        }
    };
    app.compat.CompatibleOutgoing = {
        fixContent: function (content) {
            fixType(content.toMap());
            if (Interface.conforms(content, FileContent)) {
                fixFileContent(content.toMap());
                return
            }
            if (Interface.conforms(content, NameCard)) {
                fixDid(content.toMap());
                return
            }
            if (Interface.conforms(content, Command)) {
                fixCmd(content.toMap())
            }
            if (Interface.conforms(content, ReceiptCommand)) {
                fixReceiptCommand(content.toMap());
                return
            }
            if (Interface.conforms(content, LoginCommand)) {
                fixDid(content.toMap());
                var station = content['station'];
                if (typeof station === 'object') {
                    fixDid(station)
                }
                var provider = content['provider'];
                if (typeof provider === 'object') {
                    fixDid(provider)
                }
                return
            }
            if (Interface.conforms(content, DocumentCommand)) {
                this._fixDocs(content)
            }
            if (Interface.conforms(content, MetaCommand)) {
                fixDid(content.toMap());
                var meta = content['meta'];
                if (meta) {
                    fixMetaVersion(meta)
                }
            }
        }, _fixDocs: function (content) {
            var cmd = content.getCmd();
            if (cmd === 'documents') {
                content['cmd'] = 'document';
                content['command'] = 'document'
            }
            var array = content['documents'];
            if (array instanceof Array) {
                var docs = Document.convert(array);
                var last = DocumentUtils.lastDocument(docs);
                if (last != null) {
                    content['document'] = fixDocument(last.toMap())
                }
                if (docs.length === 1) {
                    delete content['documents']
                }
            }
            var document = content['document'];
            if (typeof document === 'object') {
                fixDid(document)
            }
        }
    };
    var CompatibleOutgoing = app.compat.CompatibleOutgoing
    var fixReceiptCommand = function (content) {
    };
    app.compat.CompatibleCompressor = function () {
        MessageCompressor.call(this, new CompatibleShortener())
    };
    var CompatibleCompressor = app.compat.CompatibleCompressor;
    Class(CompatibleCompressor, MessageCompressor, null);
    Implementation(CompatibleCompressor, {
        extractContent: function (data, key) {
            var content = MessageCompressor.prototype.extractContent.call(this, data, key);
            if (content) {
                CompatibleIncoming.fixContent(content)
            }
            return content
        }
    });
    app.compat.CompatibleShortener = function () {
        MessageShortener.call(this)
    };
    var CompatibleShortener = app.compat.CompatibleShortener;
    Class(CompatibleShortener, MessageShortener, null);
    Implementation(CompatibleShortener, {
        moveKey: function (from, to, info) {
            var value = info[from];
            if (value) {
                if (info[to]) {
                    console.assert(false, 'keys conflicted: ', from, to, info);
                    return
                }
                delete info[from];
                info[to] = value
            }
        }, compressContent: function (content) {
            return content
        }, compressSymmetricKey: function (key) {
            return key
        }, compressReliableMessage: function (msg) {
            return msg
        }
    });
    app.compat.NetworkType = {
        BTC_MAIN: (0x00),
        MAIN: (0x08),
        GROUP: (0x10),
        POLYLOGUE: (0x10),
        CHATROOM: (0x30),
        PROVIDER: (0x76),
        STATION: (0x88),
        BOT: (0xC8),
        THING: (0x80)
    };
    var NetworkType = app.compat.NetworkType;
    NetworkType.getEntityType = function (network) {
        switch (network) {
            case NetworkType.MAIN:
                return EntityType.USER;
            case NetworkType.GROUP:
                return EntityType.GROUP;
            case NetworkType.CHATROOM:
                return EntityType.GROUP | NetworkType.CHATROOM;
            case NetworkType.STATION:
                return EntityType.STATION;
            case NetworkType.PROVIDER:
                return EntityType.ISP;
            case NetworkType.BOT:
                return EntityType.BOT
        }
        return network
    };
    app.compat.EntityID = function (identifier, name, address, terminal) {
        Identifier.call(this, identifier, name, address, terminal)
    };
    var EntityID = app.compat.EntityID;
    Class(EntityID, Identifier, null);
    Implementation(EntityID, {
        getType: function () {
            var name = this.getName();
            if (!name || name.length === 0) {
                return EntityType.USER
            }
            var network = this.getAddress().getType();
            return NetworkType.getEntityType(network)
        }
    });
    app.compat.EntityIDFactory = function () {
        IdentifierFactory.call(this)
    };
    var EntityIDFactory = app.compat.EntityIDFactory;
    Class(EntityIDFactory, IdentifierFactory, null);
    EntityIDFactory.prototype.newID = function (string, name, address, terminal) {
        return new EntityID(string, name, address, terminal)
    };
    EntityIDFactory.prototype.parse = function (identifier) {
        if (!identifier) {
            throw new ReferenceError('ID empty');
        }
        var size = identifier.length;
        if (size < 4 || size > 64) {
            return false
        } else if (size === 15) {
            if (identifier.toLowerCase() === 'anyone@anywhere') {
                return ID.ANYONE
            }
        } else if (size === 19) {
            if (identifier.toLowerCase() === 'everyone@everywhere') {
                return ID.EVERYONE
            }
        } else if (size === 13) {
            if (identifier.toLowerCase() === 'moky@anywhere') {
                return ID.FOUNDER
            }
        }
        return IdentifierFactory.prototype.parse.call(this, identifier)
    };
    EntityIDFactory.prototype.reduceMemory = function () {
        var finger = 0;
        finger = thanos(this._identifiers, finger);
        return finger >> 1
    };
    app.compat.CompatibleMetaFactory = function (type) {
        BaseMetaFactory.call(this, type)
    };
    var CompatibleMetaFactory = app.compat.CompatibleMetaFactory;
    Class(CompatibleMetaFactory, BaseMetaFactory, null);
    Implementation(CompatibleMetaFactory, {
        parseMeta: function (meta) {
            var out;
            var helper = SharedAccountExtensions.getHelper();
            var type = helper.getMetaType(meta, '');
            switch (type) {
                case'MKM':
                case'mkm':
                case'1':
                    out = new DefaultMeta(meta);
                    break;
                case'BTC':
                case'btc':
                case'2':
                    out = new BTCMeta(meta);
                    break;
                case'ETH':
                case'eth':
                case'4':
                    out = new ETHMeta(meta);
                    break;
                default:
                    throw new TypeError('unknown meta type: ' + type);
            }
            return out.isValid() ? out : null
        }
    });
    app.compat.CommonExtensionLoader = function () {
        ExtensionLoader.call(this)
    };
    var CommonExtensionLoader = app.compat.CommonExtensionLoader;
    Class(CommonExtensionLoader, ExtensionLoader, null);
    Implementation(CommonExtensionLoader, {
        registerCustomizedFactories: function () {
            this.setContentFactory(ContentType.CUSTOMIZED, 'customized', null, AppCustomizedContent);
            this.setContentFactory(ContentType.APPLICATION, 'application', null, AppCustomizedContent)
        }, registerCommandFactories: function () {
            ExtensionLoader.prototype.registerCommandFactories.call(this);
            this.setCommandFactory(Command.HANDSHAKE, null, BaseHandshakeCommand);
            this.setCommandFactory(Command.LOGIN, null, BaseLoginCommand);
            this.setCommandFactory(Command.MUTE, null, BaseMuteCommand);
            this.setCommandFactory(Command.BLOCK, null, BaseBlockCommand);
            this.setCommandFactory(Command.REPORT, null, BaseReportCommand);
            this.setCommandFactory(Command.ONLINE, null, BaseReportCommand);
            this.setCommandFactory(Command.OFFLINE, null, BaseReportCommand);
            this.setCommandFactory('broadcast', null, BaseReportCommand);
            this.setCommandFactory(Command.SEARCH, null, BaseSearchCommand);
            this.setCommandFactory(Command.ONLINE_USERS, null, BaseSearchCommand);
            this.setCommandFactory(Command.STORAGE, null, BaseStorageCommand);
            this.setCommandFactory(Command.CONTACTS, null, BaseStorageCommand);
            this.setCommandFactory(Command.PRIVATE_KEY, null, BaseStorageCommand);
            this.setCommandFactory(GroupCommand.QUERY, null, QueryGroupCommand)
        }
    });
    app.compat.CommonPluginLoader = function () {
        PluginLoader.call(this)
    };
    var CommonPluginLoader = app.compat.CommonPluginLoader;
    Class(CommonPluginLoader, PluginLoader, null);
    Implementation(CommonPluginLoader, {
        registerIDFactory: function () {
            ID.setFactory(new EntityIDFactory())
        }, registerAddressFactory: function () {
            Address.setFactory(new CompatibleAddressFactory())
        }, registerMetaFactories: function () {
            var mkm = new CompatibleMetaFactory(MetaType.MKM);
            var btc = new CompatibleMetaFactory(MetaType.BTC);
            var eth = new CompatibleMetaFactory(MetaType.ETH);
            Meta.setFactory('1', mkm);
            Meta.setFactory('2', btc);
            Meta.setFactory('4', eth);
            Meta.setFactory('mkm', mkm);
            Meta.setFactory('btc', btc);
            Meta.setFactory('eth', eth);
            Meta.setFactory('MKM', mkm);
            Meta.setFactory('BTC', btc);
            Meta.setFactory('ETH', eth)
        }
    });
    app.dbi.PrivateKeyDBI = Interface(null, null);
    var PrivateKeyDBI = app.dbi.PrivateKeyDBI;
    PrivateKeyDBI.META = 'M';
    PrivateKeyDBI.VISA = 'V';
    PrivateKeyDBI.prototype.savePrivateKey = function (key, type, user) {
    };
    PrivateKeyDBI.prototype.getPrivateKeysForDecryption = function (user) {
    };
    PrivateKeyDBI.prototype.getPrivateKeyForSignature = function (user) {
    };
    PrivateKeyDBI.prototype.getPrivateKeyForVisaSignature = function (user) {
    };
    PrivateKeyDBI.convertDecryptKeys = function (privateKeys) {
        var decryptKeys = [];
        var key;
        for (var index = 0; index < privateKeys.length; ++index) {
            key = privateKeys[index];
            if (Interface.conforms(key, DecryptKey)) {
                decryptKeys.push(key)
            }
        }
        return decryptKeys
    };
    PrivateKeyDBI.convertPrivateKeys = function (decryptKeys) {
        var privateKeys = [];
        var key;
        for (var index = 0; index < decryptKeys.length; ++index) {
            key = decryptKeys[index];
            if (Interface.conforms(key, PrivateKey)) {
                privateKeys.push(key)
            }
        }
        return privateKeys
    };
    PrivateKeyDBI.revertPrivateKeys = function (privateKeys) {
        var array = [];
        for (var index = 0; index < privateKeys.length; ++index) {
            array.push(privateKeys[index].toMap())
        }
        return array
    };
    PrivateKeyDBI.insertKey = function (key, privateKeys) {
        var index = PrivateKeyDBI.findKey(key, privateKeys);
        if (index === 0) {
            return null
        } else if (index > 0) {
            privateKeys.splice(index, 1)
        } else if (privateKeys.length > 2) {
            privateKeys.pop()
        }
        privateKeys.unshift(key);
        return privateKeys
    };
    PrivateKeyDBI.findKey = function (key, privateKeys) {
        var data = key.getString('data', null);
        var item;
        for (var index = 0; index < privateKeys.length; ++index) {
            item = privateKeys[index];
            if (item.getString('data', null) === data) {
                return index
            }
        }
        return -1
    };
    app.dbi.MetaDBI = Interface(null, null);
    var MetaDBI = app.dbi.MetaDBI;
    MetaDBI.prototype.getMeta = function (entity) {
    };
    MetaDBI.prototype.saveMeta = function (meta, entity) {
    };
    app.dbi.DocumentDBI = Interface(null, null);
    var DocumentDBI = app.dbi.DocumentDBI;
    DocumentDBI.prototype.getDocuments = function (entity) {
    };
    DocumentDBI.prototype.saveDocument = function (doc) {
    };
    app.dbi.UserDBI = Interface(null, null);
    var UserDBI = app.dbi.UserDBI;
    app.dbi.ContactDBI = Interface(null, null);
    var ContactDBI = app.dbi.ContactDBI;
    UserDBI.prototype.getLocalUsers = function () {
    };
    UserDBI.prototype.saveLocalUsers = function (users) {
    };
    ContactDBI.prototype.getContacts = function (user) {
    };
    ContactDBI.prototype.saveContacts = function (contacts, user) {
    };
    app.dbi.GroupDBI = Interface(null, null);
    var GroupDBI = app.dbi.GroupDBI;
    GroupDBI.prototype.getFounder = function (group) {
    };
    GroupDBI.prototype.getOwner = function (group) {
    };
    GroupDBI.prototype.getMembers = function (group) {
    };
    GroupDBI.prototype.saveMembers = function (members, group) {
    };
    GroupDBI.prototype.getAssistants = function (group) {
    };
    GroupDBI.prototype.saveAssistants = function (bots, group) {
    };
    GroupDBI.prototype.getAdministrators = function (group) {
    };
    GroupDBI.prototype.saveAdministrators = function (members, group) {
    };
    app.dbi.GroupHistoryDBI = Interface(null, null);
    var GroupHistoryDBI = app.dbi.GroupHistoryDBI;
    GroupHistoryDBI.prototype.saveGroupHistory = function (content, rMsg, group) {
    };
    GroupHistoryDBI.prototype.getGroupHistories = function (group) {
    };
    GroupHistoryDBI.prototype.getResetCommandMessage = function (group) {
    };
    GroupHistoryDBI.prototype.clearGroupMemberHistories = function (group) {
    };
    GroupHistoryDBI.prototype.clearGroupAdminHistories = function (group) {
    };
    app.dbi.AccountDBI = Interface(null, [PrivateKeyDBI, MetaDBI, DocumentDBI, UserDBI, ContactDBI, GroupDBI, GroupHistoryDBI]);
    var AccountDBI = app.dbi.AccountDBI;
    app.dbi.CipherKeyDBI = CipherKeyDelegate;
    var CipherKeyDBI = app.dbi.CipherKeyDBI;
    app.dbi.GroupKeysDBI = Interface(null, null);
    var GroupKeysDBI = app.dbi.GroupKeysDBI;
    GroupKeysDBI.prototype.getGroupKeys = function (group, sender) {
    };
    GroupKeysDBI.prototype.saveGroupKeys = function (group, sender, keys) {
    };
    app.dbi.MessageDBI = Interface(null, [CipherKeyDBI, GroupKeysDBI]);
    var MessageDBI = app.dbi.MessageDBI;
    app.dbi.ProviderInfo = function (pid, chosen) {
        this.__identifier = pid;
        this.__chosen = chosen
    };
    var ProviderInfo = app.dbi.ProviderInfo;
    Class(ProviderInfo, null, null);
    ProviderInfo.prototype.getIdentifier = function () {
        return this.__identifier
    };
    ProviderInfo.prototype.getChosen = function () {
        return this.__chosen
    };
    ProviderInfo.prototype.setChosen = function (chosen) {
        this.__chosen = chosen
    };
    ProviderInfo.GSP = new Identifier('gsp@everywhere', 'gsp', Address.EVERYWHERE, null);
    ProviderInfo.convert = function (array) {
        var providers = [];
        var identifier;
        var chosen;
        var item;
        for (var i = 0; i < array.length; ++i) {
            item = array[i];
            identifier = ID.parse(item['did']);
            chosen = Converter.getInt(item['chosen'], 0);
            if (!identifier) {
                continue
            }
            providers.push(new ProviderInfo(identifier, chosen))
        }
        return providers
    };
    ProviderInfo.revert = function (providers) {
        var array = [];
        var info;
        for (var i = 0; i < providers.length; ++i) {
            info = providers[i];
            array.push({'did': info.getIdentifier().toString(), 'chosen': info.getChosen()})
        }
        return array
    };
    app.dbi.ProviderDBI = Interface(null, null);
    var ProviderDBI = app.dbi.ProviderDBI;
    ProviderDBI.prototype.allProviders = function () {
    };
    ProviderDBI.prototype.addProvider = function (identifier, chosen) {
    };
    ProviderDBI.prototype.updateProvider = function (identifier, chosen) {
    };
    ProviderDBI.prototype.removeProvider = function (identifier) {
    };
    app.dbi.StationInfo = function (sid, chosen, host, port, provider) {
        this.__identifier = sid;
        this.__chosen = chosen;
        this.__host = host;
        this.__port = port;
        this.__provider = provider
    };
    var StationInfo = app.dbi.StationInfo;
    Class(StationInfo, null, null);
    StationInfo.prototype.getIdentifier = function () {
        return this.__identifier
    };
    StationInfo.prototype.getChosen = function () {
        return this.__chosen
    };
    StationInfo.prototype.setChosen = function (chosen) {
        this.__chosen = chosen
    };
    StationInfo.prototype.getHost = function () {
        return this.__host
    };
    StationInfo.prototype.getPort = function () {
        return this.__port
    };
    StationInfo.prototype.getProvider = function () {
        return this.__provider
    };
    StationInfo.convert = function (array) {
        var stations = [];
        var sid;
        var chosen;
        var host;
        var port;
        var provider;
        var item;
        for (var i = 0; i < array.length; ++i) {
            item = array[i];
            sid = ID.parse(item['did']);
            chosen = Converter.getInt(item['chosen'], 0);
            host = Converter.getString(item['host'], null);
            port = Converter.getInt(item['port'], 0);
            provider = ID.parse(item['provider']);
            if (!host || port === 0) {
                continue
            }
            stations.push(new StationInfo(sid, chosen, host, port, provider))
        }
        return stations
    };
    StationInfo.revert = function (stations) {
        var array = [];
        var info;
        for (var i = 0; i < stations.length; ++i) {
            info = stations[i];
            array.push({
                'did': info.getIdentifier().toString(),
                'chosen': info.getChosen(),
                'host': info.getHost(),
                'port': info.getPort(),
                'provider': info.getProvider().toString()
            })
        }
        return array
    };
    app.dbi.StationDBI = Interface(null, null);
    var StationDBI = app.dbi.StationDBI;
    StationDBI.prototype.allStations = function (provider) {
    };
    StationDBI.prototype.addStation = function (sid, chosen, host, port, provider) {
    };
    StationDBI.prototype.updateStation = function (sid, chosen, host, port, provider) {
    };
    StationDBI.prototype.removeStation = function (host, port, provider) {
    };
    StationDBI.prototype.removeStations = function (provider) {
    };
    app.dbi.LoginDBI = Interface(null, null);
    var LoginDBI = app.dbi.LoginDBI;
    LoginDBI.prototype.getLoginCommandMessage = function (user) {
    };
    LoginDBI.prototype.saveLoginCommandMessage = function (user, content, message) {
    };
    app.dbi.SessionDBI = Interface(null, [LoginDBI, ProviderDBI, StationDBI]);
    var SessionDBI = app.dbi.SessionDBI;
    app.Anonymous = {
        getName: function (identifier) {
            var name;
            if (Interface.conforms(identifier, ID)) {
                name = identifier.getName();
                if (!name || name.length === 0) {
                    name = get_name(identifier.getType())
                }
            } else {
                name = get_name(identifier.getType())
            }
            var number = this.getNumberString(identifier);
            return name + ' (' + number + ')'
        }, getNumberString: function (address) {
            var str = '' + this.getNumber(address);
            while (str.length < 10) {
                str = '0' + str
            }
            return str.substr(0, 3) + '-' + str.substr(3, 3) + '-' + str.substr(6)
        }, getNumber: function (address) {
            if (Interface.conforms(address, ID)) {
                address = address.getAddress()
            }
            if (address instanceof BTCAddress) {
                return btc_number(address.toString())
            }
            if (address instanceof ETHAddress) {
                return eth_number(address.toString())
            }
            return 0
        }
    };
    var Anonymous = app.Anonymous;
    var get_name = function (type) {
        switch (type) {
            case EntityType.BOT:
                return 'Bot';
            case EntityType.STATION:
                return 'Station';
            case EntityType.ISP:
                return 'ISP';
            case EntityType.ICP:
                return 'ICP'
        }
        if (EntityType.isUser(type)) {
            return 'User'
        }
        if (EntityType.isGroup(type)) {
            return 'Group'
        }
        return 'Unknown'
    };
    var btc_number = function (address) {
        var data = Base58.decode(address);
        return user_number(data)
    };
    var eth_number = function (address) {
        var data = Hex.decode(address.substr(2))
        return user_number(data)
    };
    var user_number = function (cc) {
        var len = cc.length;
        var c1 = cc[len - 1] & 0xFF;
        var c2 = cc[len - 2] & 0xFF;
        var c3 = cc[len - 3] & 0xFF;
        var c4 = cc[len - 4] & 0xFF;
        return (c1 | (c2 << 8) | (c3 << 16)) + c4 * 0x01000000
    };
    app.AddressNameService = Interface(null, null);
    var AddressNameService = app.AddressNameService;
    AddressNameService.KEYWORDS = ["all", "everyone", "anyone", "owner", "founder", "dkd", "mkm", "dimp", "dim", "dimt", "rsa", "ecc", "aes", "des", "btc", "eth", "crypto", "key", "symmetric", "asymmetric", "public", "private", "secret", "password", "id", "address", "meta", "tai", "document", "profile", "visa", "bulletin", "entity", "user", "group", "contact", "member", "admin", "administrator", "assistant", "main", "polylogue", "chatroom", "social", "organization", "company", "school", "government", "department", "provider", "station", "thing", "bot", "robot", "message", "instant", "secure", "reliable", "envelope", "sender", "receiver", "time", "content", "forward", "command", "history", "keys", "data", "signature", "type", "serial", "sn", "text", "file", "image", "audio", "video", "page", "handshake", "receipt", "block", "mute", "register", "suicide", "found", "abdicate", "invite", "expel", "join", "quit", "reset", "query", "hire", "fire", "resign", "server", "client", "terminal", "local", "remote", "barrack", "cache", "transceiver", "ans", "facebook", "store", "messenger", "root", "supervisor"];
    AddressNameService.prototype.isReserved = function (name) {
    };
    AddressNameService.prototype.getIdentifier = function (name) {
    };
    AddressNameService.prototype.getNames = function (identifier) {
    };
    app.AddressNameServer = function () {
        BaseObject.call(this);
        var caches = {
            'all': ID.EVERYONE,
            'everyone': ID.EVERYONE,
            'anyone': ID.ANYONE,
            'owner': ID.ANYONE,
            'founder': ID.FOUNDER
        };
        var reserved = {};
        var keywords = AddressNameService.KEYWORDS;
        for (var i = 0; i < keywords.length; ++i) {
            reserved[keywords[i]] = true
        }
        this.__reserved = reserved;
        this.__caches = caches;
        this.__tables = {}
    };
    var AddressNameServer = app.AddressNameServer;
    Class(AddressNameServer, BaseObject, [AddressNameService]);
    AddressNameServer.prototype.isReserved = function (name) {
        return this.__reserved[name] === true
    };
    AddressNameServer.prototype.getIdentifier = function (name) {
        return this.__caches[name]
    };
    AddressNameServer.prototype.getNames = function (identifier) {
        var array = this.__tables[identifier.toString()];
        if (array === null) {
            array = [];
            Mapper.forEach(this.__caches, function (name, did) {
                if (identifier.equals(did)) {
                    array.push(name)
                }
                return false
            });
            this.__tables[identifier.toString()] = array
        }
        return array
    };
    AddressNameServer.prototype.cache = function (name, identifier) {
        if (this.isReserved(name)) {
            return false
        }
        if (identifier) {
            this.__caches[name] = identifier;
            delete this.__tables[identifier.toString()]
        } else {
            delete this.__caches[name];
            this.__tables = {}
        }
        return true
    };
    AddressNameServer.prototype.save = function (name, identifier) {
        return this.cache(name, identifier)
    };
    app.CommonArchivist = function (facebook, database) {
        Barrack.call(this);
        this.__facebook = facebook;
        this.__database = database;
        this.__userCache = this.createUserCache();
        this.__groupCache = this.createGroupCache()
    };
    var CommonArchivist = app.CommonArchivist;
    Class(CommonArchivist, Barrack, [Archivist]);
    CommonArchivist.prototype.getDatabase = function () {
        return this.__database
    };
    CommonArchivist.prototype.getFacebook = function () {
        return this.__facebook
    };
    CommonArchivist.prototype.createUserCache = function () {
        return new ThanosCache()
    };
    CommonArchivist.prototype.createGroupCache = function () {
        return new ThanosCache()
    };
    CommonArchivist.prototype.reduceMemory = function () {
        var cnt1 = this.__userCache.reduceMemory();
        var cnt2 = this.__groupCache.reduceMemory();
        return cnt1 + cnt2
    };
    CommonArchivist.prototype.cacheUser = function (user) {
        if (!user.getDataSource()) {
            user.setDataSource(this.getFacebook())
        }
        var uid = user.getIdentifier().toString();
        this.__userCache.put(uid, user)
    };
    CommonArchivist.prototype.cacheGroup = function (group) {
        if (!group.getDataSource()) {
            group.setDataSource(this.getFacebook())
        }
        var gid = group.getIdentifier().toString();
        this.__groupCache.put(gid, group)
    };
    CommonArchivist.prototype.getUser = function (identifier) {
        var uid = identifier.toString();
        return this.__userCache.get(uid)
    };
    CommonArchivist.prototype.getGroup = function (identifier) {
        var gid = identifier.toString();
        return this.__groupCache.get(gid)
    };
    CommonArchivist.prototype.saveMeta = function (meta, identifier) {
        if (this.checkMeta(meta, identifier)) {
        } else {
            Log.error('meta not valid:', identifier, meta);
            return false
        }
        var facebook = this.getFacebook();
        var old = facebook.getMeta(identifier);
        if (old) {
            Log.debug('meta duplicated: ', identifier);
            return true
        }
        var db = this.getDatabase();
        return db.saveMeta(meta, identifier)
    };
    CommonArchivist.prototype.checkMeta = function (meta, identifier) {
        return meta.isValid() && MetaUtils.matchIdentifier(identifier, meta)
    };
    CommonArchivist.prototype.saveDocument = function (doc) {
        if (this.checkDocumentValid(doc)) {
        } else {
            Log.error('document not valid:', doc.getIdentifier(), doc);
            return false
        }
        if (this.checkDocumentExpired(doc)) {
            Log.info('drop expired document:', doc.getIdentifier(), doc);
            return false
        }
        var db = this.getDatabase();
        return db.saveDocument(doc)
    };
    CommonArchivist.prototype.checkDocumentValid = function (doc) {
        var identifier = doc.getIdentifier();
        var docTime = doc.getTime();
        if (!docTime) {
            Log.warning('document without time:', identifier)
        } else {
            var now = new Date();
            var nearFuture = Duration.ofMinutes(30).addTo(now);
            if (docTime.getTime() > nearFuture.getTime()) {
                Log.error('document time error:', docTime, identifier);
                return false
            }
        }
        return this.verifyDocument(doc)
    };
    CommonArchivist.prototype.verifyDocument = function (doc) {
        if (doc.isValid()) {
            return true
        }
        var identifier = doc.getIdentifier();
        var facebook = this.getFacebook();
        var meta = facebook.getMeta(identifier);
        if (!meta) {
            Log.warning('failed to get meta:', identifier);
            return false
        }
        var pKey = meta.getPublicKey();
        return doc.verify(pKey)
    };
    CommonArchivist.prototype.checkDocumentExpired = function (doc) {
        var identifier = doc.getIdentifier();
        var type = DocumentUtils.getDocumentType(doc);
        if (!type) {
            type = '*'
        }
        var facebook = this.getFacebook();
        var documents = facebook.getDocuments(identifier);
        if (!documents || documents.length === 0) {
            return false
        }
        var old = DocumentUtils.lastDocument(documents, type);
        return old && DocumentUtils.isExpired(doc, old)
    };
    CommonArchivist.prototype.getMetaKey = function (uid) {
        var facebook = this.getFacebook();
        var meta = facebook.getMeta(uid);
        return !meta ? null : meta.getPublicKey()
    };
    CommonArchivist.prototype.getVisaKey = function (uid) {
        var facebook = this.getFacebook();
        var docs = facebook.getDocuments(uid);
        if (!docs || docs.length === 0) {
            return null
        }
        var visa = DocumentUtils.lastVisa(docs);
        return !visa ? null : visa.getPublicKey()
    };
    CommonArchivist.prototype.getLocalUsers = function () {
        var db = this.getDatabase();
        return db.getLocalUsers()
    };
    app.EntityChecker = function (database) {
        BaseObject.call(this);
        this.__database = database;
        this.__metaQueries = new FrequencyChecker(EntityChecker.QUERY_EXPIRES);
        this.__docsQueries = new FrequencyChecker(EntityChecker.QUERY_EXPIRES);
        this.__membersQueries = new FrequencyChecker(EntityChecker.QUERY_EXPIRES);
        this.__visaResponses = new FrequencyChecker(EntityChecker.RESPOND_EXPIRES);
        this.__lastDocumentTimes = new RecentTimeChecker();
        this.__lastHistoryTimes = new RecentTimeChecker();
        this.__lastActiveMembers = {}
    };
    var EntityChecker = app.EntityChecker;
    Class(EntityChecker, BaseObject, null);
    EntityChecker.QUERY_EXPIRES = Duration.ofMinutes(10);
    EntityChecker.RESPOND_EXPIRES = Duration.ofMinutes(10);
    EntityChecker.prototype.getDatabase = function () {
        return this.__database
    };
    EntityChecker.prototype.isMetaQueryExpired = function (identifier) {
        var did = identifier.toString();
        return this.__metaQueries.isExpired(did, null, false)
    };
    EntityChecker.prototype.isDocumentQueryExpired = function (identifier) {
        var did = identifier.toString();
        return this.__docsQueries.isExpired(did, null, false)
    };
    EntityChecker.prototype.isMembersQueryExpired = function (group) {
        var gid = group.toString();
        return this.__membersQueries.isExpired(gid, null, false)
    };
    EntityChecker.prototype.isDocumentResponseExpired = function (identifier, force) {
        var did = identifier.toString();
        return this.__visaResponses.isExpired(did, null, force)
    };
    EntityChecker.prototype.setLastActiveMember = function (member, group) {
        var gid = group.toString();
        this.__lastActiveMembers[gid] = member
    };
    EntityChecker.prototype.getLastActiveMember = function (group) {
        var gid = group.toString();
        return this.__lastActiveMembers[gid]
    };
    EntityChecker.prototype.setLastDocumentTime = function (current, identifier) {
        var did = identifier.toString();
        return this.__lastDocumentTimes.setLastTime(did, current)
    };
    EntityChecker.prototype.setLastGroupHistoryTime = function (current, group) {
        var gid = group.toString();
        return this.__lastHistoryTimes.setLastTime(gid, current)
    };
    EntityChecker.prototype.checkMeta = function (meta, identifier) {
        if (this.needsQueryMeta(identifier, meta)) {
            return this.queryMeta(identifier)
        } else {
            return false
        }
    };
    EntityChecker.prototype.needsQueryMeta = function (identifier, meta) {
        if (identifier.isBroadcast()) {
            return false
        } else if (!meta) {
            return true
        }
        return false
    };
    EntityChecker.prototype.checkDocuments = function (identifier, docs) {
        if (this.needsQueryDocuments(identifier, docs)) {
            return this.queryDocuments(identifier, docs)
        } else {
            return false
        }
    };
    EntityChecker.prototype.needsQueryDocuments = function (identifier, docs) {
        if (identifier.isBroadcast()) {
            return false
        } else if (!docs || docs.length === 0) {
            return true
        }
        var currentTime = this.getLastDocumentTime(identifier, docs);
        var did = identifier.toString();
        return this.__lastDocumentTimes.isExpired(did, currentTime)
    };
    EntityChecker.prototype.getLastDocumentTime = function (identifier, docs) {
        if (!docs || docs.length === 0) {
            return null
        }
        var docTime, lastTime = null;
        for (var i = 0; i < docs.length; ++i) {
            docTime = docs[i].getTime();
            if (!docTime) {
                Log.warning('document time error:', docs[i])
            } else if (!lastTime || lastTime.getTime() < docTime.getTime()) {
                lastTime = docTime
            }
        }
        return lastTime
    };
    EntityChecker.prototype.checkMembers = function (group, members) {
        if (this.needsQueryMembers(group, members)) {
            return this.queryMembers(group, members)
        } else {
            return false
        }
    };
    EntityChecker.prototype.needsQueryMembers = function (group, members) {
        if (group.isBroadcast()) {
            return false
        } else if (!members || members.length === 0) {
            return true
        }
        var currentTime = this.getLastGroupHistoryTime(group);
        var gid = group.toString();
        return this.__lastHistoryTimes.isExpired(gid, currentTime)
    };
    EntityChecker.prototype.getLastGroupHistoryTime = function (group) {
        var db = this.getDatabase();
        var array = db.getGroupHistories(group);
        if (!array || array.length === 0) {
            return null
        }
        var hisTime, lastTime = null;
        var his;
        var pair;
        for (var i = 0; i < array.length; ++i) {
            pair = array[i];
            his = pair.a;
            hisTime = his.getTime();
            if (!hisTime) {
                Log.warning('group command time error:', his)
            } else if (!lastTime || lastTime.getTime() < hisTime.getTime()) {
                lastTime = hisTime
            }
        }
        return lastTime
    };
    EntityChecker.prototype.queryMeta = function (identifier) {
    };
    EntityChecker.prototype.queryDocuments = function (identifier, docs) {
    };
    EntityChecker.prototype.queryMembers = function (group, members) {
    };
    EntityChecker.prototype.sendVisa = function (visa, receiver, updated) {
    };
    app.CommonFacebook = function (database) {
        Facebook.call(this);
        this.__database = database;
        this.__barrack = null;
        this.__entityChecker = null;
        this.__currentUser = null
    };
    var CommonFacebook = app.CommonFacebook;
    Class(CommonFacebook, Facebook, null);
    CommonFacebook.prototype.getDatabase = function () {
        return this.__database
    };
    CommonFacebook.prototype.getArchivist = function () {
        return this.__barrack
    };
    CommonFacebook.prototype.getBarrack = function () {
        return this.__barrack
    };
    CommonFacebook.prototype.setBarrack = function (archivist) {
        this.__barrack = archivist
    };
    CommonFacebook.prototype.getEntityChecker = function () {
        return this.__entityChecker
    };
    CommonFacebook.prototype.setEntityChecker = function (checker) {
        this.__entityChecker = checker
    };
    CommonFacebook.prototype.getCurrentUser = function () {
        var current = this.__currentUser;
        if (current) {
            return current
        }
        var db = this.getDatabase();
        var array = db.getLocalUsers();
        if (!array || array.length === 0) {
            return null
        }
        current = this.getUser(array[0]);
        this.__currentUser = current;
        return current
    };
    CommonFacebook.prototype.setCurrentUser = function (user) {
        if (!user.getDataSource()) {
            user.setDataSource(this)
        }
        this.__currentUser = user
    };
    CommonFacebook.prototype.selectLocalUser = function (receiver) {
        var user = this.__currentUser;
        if (user) {
            var current = user.getIdentifier();
            if (receiver.isBroadcast()) {
                return current
            } else if (receiver.isGroup()) {
                var members = this.getMember(receiver);
                if (!members || members.length === 0) {
                    Log.warning('members not found:', receiver);
                    return null
                } else if (members_contains(members, current)) {
                    return current
                }
            } else if (receiver.equals(current)) {
                return current
            }
        }
        return Facebook.prototype.selectLocalUser.call(this, receiver)
    };
    var members_contains = function (array, value) {
        var item;
        var i = array.length - 1;
        for (; i >= 0; --i) {
            item = array[i];
            if (!item) {
            } else if (item.equals(value)) {
                return true
            }
        }
        return false
    };
    CommonFacebook.prototype.getDocument = function (identifier, type) {
        var documents = this.getDocuments(identifier);
        var doc = DocumentUtils.lastDocument(documents, type);
        if (!doc && type === DocumentType.VISA) {
            doc = DocumentUtils.lastDocument(documents, DocumentType.PROFILE)
        }
        return doc
    };
    CommonFacebook.prototype.getVisa = function (user) {
        var documents = this.getDocuments(user);
        return DocumentUtils.lastVisa(documents)
    };
    CommonFacebook.prototype.getBulletin = function (group) {
        var documents = this.getDocuments(group);
        return DocumentUtils.lastBulletin(documents)
    };
    CommonFacebook.prototype.getName = function (identifier) {
        var type;
        if (identifier.isUser()) {
            type = DocumentType.VISA
        } else if (identifier.isGroup()) {
            type = DocumentType.BULLETIN
        } else {
            type = '*'
        }
        var doc = this.getDocument(identifier, type);
        if (doc) {
            var name = doc.getName();
            if (name && name.length > 0) {
                return name
            }
        }
        return Anonymous.getName(identifier)
    };
    CommonFacebook.prototype.getAvatar = function (user) {
        var doc = this.getVisa(user);
        return !doc ? null : doc.getAvatar()
    };
    CommonFacebook.prototype.getMeta = function (identifier) {
        var db = this.getDatabase();
        var meta = db.getMeta(identifier);
        var checker = this.getEntityChecker();
        if (checker) {
            checker.checkMeta(meta, identifier)
        }
        return meta
    };
    CommonFacebook.prototype.getDocuments = function (identifier) {
        var db = this.getDatabase();
        var docs = db.getDocuments(identifier);
        var checker = this.getEntityChecker();
        if (checker) {
            checker.checkDocuments(identifier, docs)
        }
        return docs
    };
    CommonFacebook.prototype.getContacts = function (user) {
        var db = this.getDatabase();
        return db.getContacts(user)
    };
    CommonFacebook.prototype.getPrivateKeysForDecryption = function (user) {
        var db = this.getDatabase();
        return db.getPrivateKeysForDecryption(user)
    };
    CommonFacebook.prototype.getPrivateKeyForSignature = function (user) {
        var db = this.getDatabase();
        return db.getPrivateKeyForSignature(user)
    };
    CommonFacebook.prototype.getPrivateKeyForVisaSignature = function (user) {
        var db = this.getDatabase();
        return db.getPrivateKeyForVisaSignature(user)
    };
    CommonFacebook.prototype.getAdministrators = function (group) {
    };
    CommonFacebook.prototype.saveAdministrators = function (admins, group) {
    };
    CommonFacebook.prototype.saveMembers = function (newMembers, group) {
    };
    app.CommonMessenger = function (session, facebook, database) {
        Messenger.call(this);
        this.__session = session;
        this.__facebook = facebook;
        this.__database = database;
        this.__packer = null;
        this.__processor = null;
        this.__compressor = new CompatibleCompressor()
    };
    var CommonMessenger = app.CommonMessenger;
    Class(CommonMessenger, Messenger, null);
    CommonMessenger.prototype.getSession = function () {
        return this.__session
    };
    CommonMessenger.prototype.getDatabase = function () {
        return this.__database
    };
    CommonMessenger.prototype.getFacebook = function () {
        return this.__facebook
    };
    CommonMessenger.prototype.getCompressor = function () {
        return this.__compressor
    };
    CommonMessenger.prototype.getCipherKeyDelegate = function () {
        return this.__database
    };
    CommonMessenger.prototype.getPacker = function () {
        return this.__packer
    };
    CommonMessenger.prototype.setPacker = function (packer) {
        this.__packer = packer
    };
    CommonMessenger.prototype.getProcessor = function () {
        return this.__processor
    };
    CommonMessenger.prototype.setProcessor = function (processor) {
        this.__processor = processor
    };
    CommonMessenger.prototype.serializeMessage = function (rMsg) {
        Compatible.fixMetaAttachment(rMsg);
        Compatible.fixVisaAttachment(rMsg);
        return Messenger.prototype.serializeMessage.call(this, rMsg)
    };
    CommonMessenger.prototype.deserializeMessage = function (data) {
        if (!data || data.length <= 8) {
            return null
        }
        var rMsg = Messenger.prototype.deserializeMessage.call(this, data);
        if (rMsg) {
            Compatible.fixMetaAttachment(rMsg);
            Compatible.fixVisaAttachment(rMsg)
        }
        return rMsg
    };
    CommonMessenger.prototype.encryptKey = function (keyData, receiver, iMsg) {
        try {
            return Messenger.prototype.encryptKey.call(this, keyData, receiver, iMsg)
        } catch (e) {
            Log.error('failed to encrypt key for receiver', receiver, e);
            return null
        }
    };
    CommonMessenger.prototype.serializeKey = function (password, iMsg) {
        var reused = password.getValue('reused');
        var digest = password.getValue('digest');
        if (reused === null && digest === null) {
            return Messenger.prototype.serializeKey.call(this, password, iMsg)
        }
        password.removeValue('reused');
        password.removeValue('digest');
        var data = Messenger.prototype.serializeKey.call(this, password, iMsg);
        if (Converter.getBoolean(reused, false)) {
            password.setValue('reused', true)
        }
        if (digest) {
            password.setValue('digest', digest)
        }
        return data
    };
    CommonMessenger.prototype.serializeContent = function (content, password, iMsg) {
        CompatibleOutgoing.fixContent(content);
        return Messenger.prototype.serializeContent.call(this, content, password, iMsg)
    };
    CommonMessenger.prototype.sendContent = function (content, sender, receiver, priority) {
        if (!sender) {
            var facebook = this.getFacebook();
            var current = facebook.getCurrentUser();
            sender = current.getIdentifier()
        }
        var env = Envelope.create(sender, receiver, null);
        var iMsg = InstantMessage.create(env, content);
        var rMsg = this.sendInstantMessage(iMsg, priority);
        return [iMsg, rMsg]
    };
    CommonMessenger.prototype.attachVisaTime = function (sender, iMsg) {
        if (Interface.conforms(iMsg.getContent(), Command)) {
            return false
        }
        var facebook = this.getFacebook();
        var doc = facebook.getVisa(sender);
        if (!doc) {
            Log.warning('failed to get visa document for sender', sender);
            return false
        }
        var lastDocumentTime = doc.getTime();
        if (!lastDocumentTime) {
            Log.error('document error:', doc);
            return false
        }
        iMsg.setDateTime('SDT', lastDocumentTime);
        return true
    };
    CommonMessenger.prototype.sendInstantMessage = function (iMsg, priority) {
        var sender = iMsg.getSender();
        var receiver = iMsg.getReceiver();
        if (sender.equals(receiver)) {
            Log.warning('drop cycled message', iMsg.getContent(), sender, receiver, iMsg.getGroup());
            return null
        } else {
            Log.debug('send instant message, type:' + iMsg.getContent().getType(), sender, receiver, iMsg.getGroup());
            this.attachVisaTime(sender, iMsg)
        }
        var sMsg = this.encryptMessage(iMsg);
        if (!sMsg) {
            return null
        }
        var rMsg = this.signMessage(sMsg);
        if (!rMsg) {
            throw new Error('failed to sign message: ' + sMsg.toString());
        }
        if (this.sendReliableMessage(rMsg, priority)) {
            return rMsg
        } else {
            return null
        }
    };
    CommonMessenger.prototype.sendReliableMessage = function (rMsg, priority) {
        var sender = rMsg.getSender();
        var receiver = rMsg.getReceiver();
        if (sender.equals(receiver)) {
            Log.warning('drop cycled message', sender, receiver, rMsg.getGroup());
            return false
        }
        var data = this.serializeMessage(rMsg);
        if (!data || data.length === 0) {
            Log.error('failed to serialize message', rMsg);
            return false
        }
        var session = this.getSession();
        return session.queueMessagePackage(rMsg, data, priority)
    };
    app.CommonPacker = function (facebook, messenger) {
        MessagePacker.call(this, facebook, messenger)
    };
    var CommonPacker = app.CommonPacker;
    Class(CommonPacker, MessagePacker, null);
    CommonPacker.prototype.suspendReliableMessage = function (rMsg, info) {
    };
    CommonPacker.prototype.suspendInstantMessage = function (iMsg, info) {
    };
    CommonPacker.prototype.getVisaKey = function (user) {
        var facebook = this.getFacebook();
        return facebook.getPublicKeyForEncryption(user)
    };
    CommonPacker.prototype.checkSender = function (rMsg) {
        var sender = rMsg.getSender();
        var visa = MessageUtils.getVisa(rMsg);
        if (visa) {
            return visa.getIdentifier().equals(sender)
        } else if (this.getVisaKey(sender)) {
            return true
        }
        var error = {'message': 'verify key not found', 'user': sender.toString()};
        this.suspendReliableMessage(rMsg, error);
        return false
    };
    CommonPacker.prototype.checkReceiver = function (iMsg) {
        var receiver = iMsg.getReceiver();
        if (receiver.isBroadcast()) {
            return true
        } else if (receiver.isGroup()) {
            return false
        } else if (this.getVisaKey(receiver)) {
            return true
        }
        var error = {'message': 'encrypt key not found', 'user': receiver.toString()};
        this.suspendInstantMessage(iMsg, error);
        return false
    };
    CommonPacker.prototype.encryptMessage = function (iMsg) {
        var content = iMsg.getContent();
        if (Interface.conforms(content, FileContent) && content.getData()) {
            var sender = iMsg.getSender();
            var receiver = iMsg.getReceiver();
            var group = iMsg.getGroup();
            var error = 'You should upload file data before calling ' + 'sendInstantMessage: ' + sender.toString() + ' -> ' + receiver.toString();
            if (group) {
                error += ' (' + group.toString() + ')'
            }
            Log.error(error);
            return false
        }
        iMsg.setValue('sn', content.getSerialNumber());
        if (this.checkReceiver(iMsg)) {
        } else {
            Log.warning('receiver not ready', iMsg.getReceiver());
            return null
        }
        return MessagePacker.prototype.encryptMessage.call(this, iMsg)
    };
    CommonPacker.prototype.verifyMessage = function (rMsg) {
        if (this.checkSender(rMsg)) {
        } else {
            Log.warning('sender not ready', rMsg.getSender());
            return null
        }
        return MessagePacker.prototype.verifyMessage.call(this, rMsg)
    };
    CommonPacker.prototype.signMessage = function (sMsg) {
        if (Interface.conforms(sMsg, ReliableMessage)) {
            return sMsg
        }
        return MessagePacker.prototype.signMessage.call(this, sMsg)
    };
    app.CommonProcessor = function (facebook, messenger) {
        MessageProcessor.call(this, facebook, messenger)
    };
    var CommonProcessor = app.CommonProcessor;
    Class(CommonProcessor, MessageProcessor, null);
    CommonProcessor.prototype.getEntityChecker = function () {
        var facebook = this.getFacebook();
        if (facebook instanceof CommonFacebook) {
            return facebook.getEntityChecker()
        }
        return null
    };
    CommonProcessor.prototype.createFactory = function (facebook, messenger) {
        var creator = this.createCreator(facebook, messenger);
        return new GeneralContentProcessorFactory(creator)
    };
    CommonProcessor.prototype.createCreator = function (facebook, messenger) {
    };
    CommonProcessor.prototype.processContent = function (content, rMsg) {
        var responses = MessageProcessor.prototype.processContent.call(this, content, rMsg);
        this.checkVisaTime(content, rMsg);
        return responses
    };
    CommonProcessor.prototype.checkVisaTime = function (content, rMsg) {
        var facebook = this.getFacebook();
        var checker = this.getEntityChecker();
        if (!facebook || !checker) {
            Log.error('should not happen');
            return false
        }
        var docUpdated = false;
        var lastDocumentTime = rMsg.getDateTime('SDT', null);
        if (lastDocumentTime) {
            var now = new Date();
            if (lastDocumentTime.getTime() > now.getTime()) {
                lastDocumentTime = now
            }
            var sender = rMsg.getSender();
            docUpdated = checker.setLastDocumentTime(sender, lastDocumentTime);
            if (docUpdated) {
                Log.info('checking for new visa:', sender);
                facebook.getDocuments(sender)
            }
        }
        return docUpdated
    };
    app.Register = function (database) {
        BaseObject.call(this);
        this.__database = database
    };
    var Register = app.Register;
    Class(Register, BaseObject, null);
    Register.prototype.getDatabase = function () {
        return this.__database
    };
    Register.prototype.createUser = function (nickname, avatar) {
        var db = this.getDatabase();
        var privateKey = PrivateKey.generate(AsymmetricAlgorithms.RSA);
        var meta = Meta.generate(MetaType.MKM, privateKey, 'web-demo');
        var uid = ID.generate(meta, EntityType.USER, null);
        var pKey = privateKey.getPublicKey();
        var doc = this.createVisa(uid, nickname, avatar, pKey, privateKey);
        db.saveMeta(meta, uid);
        db.savePrivateKey(privateKey, 'M', uid);
        db.saveDocument(doc);
        return uid
    };
    Register.prototype.createGroup = function (founder, title) {
        var db = this.getDatabase();
        var r = Math.ceil(Math.random() * 999990000) + 10000;
        var seed = 'Group-' + r;
        var privateKey = db.getPrivateKeyForVisaSignature(founder);
        var meta = Meta.generate(MetaType.MKM, privateKey, seed);
        var gid = ID.generate(meta, EntityType.GROUP, null);
        var doc = this.createBulletin(gid, title, founder, privateKey);
        db.saveMeta(meta, gid);
        db.saveDocument(doc);
        db.saveMembers([founder], gid);
        return gid
    };
    Register.prototype.createVisa = function (identifier, name, avatarUrl, pKey, sKey) {
        var doc = new BaseVisa(identifier);
        doc.setProperty('app_id', 'chat.dim.web');
        doc.setName(name);
        doc.setAvatar(avatarUrl);
        doc.setPublicKey(pKey);
        doc.sign(sKey);
        return doc
    };
    Register.prototype.createBulletin = function (identifier, name, founder, sKey) {
        var doc = new BaseBulletin(identifier);
        doc.setProperty('app_id', 'chat.dim.web');
        doc.setProperty('founder', founder.toString());
        doc.setName(name);
        doc.sign(sKey);
        return doc
    };
    var db_doc_path = function (entity) {
        return 'pub.' + entity.getAddress().toString() + '.docs'
    };
    app.database.DocumentStorage = function () {
        BaseObject.call(this)
    };
    var DocumentStorage = app.database.DocumentStorage;
    Class(DocumentStorage, BaseObject, [DocumentDBI]);
    DocumentStorage.prototype.saveDocument = function (doc) {
        var entity = doc.getIdentifier();
        var type = doc.getString('type', '');
        var documents = this.getDocuments(entity);
        var index = find_document(documents, entity, type);
        if (index < 0) {
            documents.unshift(doc)
        } else if (documents[index].equals(doc)) {
            return true
        } else {
            documents.splice(index, 1);
            documents.unshift(doc)
        }
        var array = revert_documents(documents);
        var path = db_doc_path(entity);
        return Storage.saveJSON(array, path)
    };
    DocumentStorage.prototype.getDocuments = function (entity) {
        var path = db_doc_path(entity);
        var array = Storage.loadJSON(path);
        return !array ? [] : convert_documents(array)
    };
    var convert_documents = function (array) {
        var documents = [];
        var doc;
        for (var i = 0; i < array.length; ++i) {
            doc = DocumentStorage.parse_document(array[i]);
            if (doc) {
                documents.push(doc)
            }
        }
        return documents
    };
    var revert_documents = function (documents) {
        var array = [];
        for (var i = 0; i < documents.length; ++i) {
            array.push(documents[i].toMap())
        }
        return array
    };
    var find_document = function (documents, identifier, type) {
        var item;
        for (var i = 0; i < documents.length; ++i) {
            item = documents[i];
            if (item.getIdentifier().equals(identifier) && item.getString('type', '') === type) {
                return i
            }
        }
        return -1
    };
    DocumentStorage.parse_document = function (dict, identifier, type) {
        var entity = ID.parse(dict['did']);
        if (!entity) {
            entity = ID.parse(dict['ID'])
        }
        if (!identifier) {
            identifier = entity
        } else if (!identifier.equals(entity)) {
            throw new TypeError('document error: ' + dict);
        }
        if (!type) {
            type = '*'
        }
        var dt = dict['type'];
        if (dt) {
            type = dt
        }
        var data = dict['data'];
        if (!data) {
            data = dict['profile']
        }
        var signature = dict['signature'];
        if (!data || !signature) {
            throw new ReferenceError('document error: ' + dict);
        }
        var ted = TransportableData.parse(signature);
        return Document.create(type, identifier, data, ted)
    };
    var db_meta_path = function (entity) {
        return 'pub.' + entity.getAddress().toString() + '.meta'
    };
    app.database.MetaStorage = function () {
        BaseObject.call(this)
    };
    var MetaStorage = app.database.MetaStorage;
    Class(MetaStorage, BaseObject, [MetaDBI]);
    MetaStorage.prototype.saveMeta = function (meta, entity) {
        var path = db_meta_path(entity);
        return Storage.saveJSON(meta.toMap(), path)
    };
    MetaStorage.prototype.getMeta = function (entity) {
        var path = db_meta_path(entity);
        var info = Storage.loadJSON(path);
        return Meta.parse(info)
    };
    var db_id_key_path = function (user) {
        return 'pri.' + user.getAddress().toString() + '.secret'
    };
    var db_msg_keys_path = function (user) {
        return 'pri.' + user.getAddress().toString() + '.secret_keys'
    };
    app.database.PrivateKeyStorage = function () {
        BaseObject.call(this)
    };
    var PrivateKeyStorage = app.database.PrivateKeyStorage;
    Class(PrivateKeyStorage, BaseObject, [PrivateKeyDBI]);
    Implementation(PrivateKeyStorage, {
        savePrivateKey: function (key, type, user) {
            if (type === PrivateKeyDBI.META) {
                return this.saveIdKey(key, user)
            } else {
                return this.saveMsgKey(key, user)
            }
        }, getPrivateKeysForDecryption: function (user) {
            var privateKeys = this.loadMsgKeys(user);
            var idKey = this.loadIdKey(user);
            if (Interface.conforms(idKey, DecryptKey)) {
                if (PrivateKeyDBI.findKey(idKey, privateKeys) < 0) {
                    privateKeys.push(idKey)
                }
            }
            return privateKeys
        }, getPrivateKeyForSignature: function (user) {
            return this.getPrivateKeyForVisaSignature(user)
        }, getPrivateKeyForVisaSignature: function (user) {
            return this.loadIdKey(user)
        }
    });
    PrivateKeyStorage.prototype.loadIdKey = function (user) {
        var path = db_id_key_path(user);
        var info = Storage.loadJSON(path);
        return PrivateKey.parse(info)
    };
    PrivateKeyStorage.prototype.saveIdKey = function (key, user) {
        var path = db_id_key_path(user);
        return Storage.saveJSON(key.toMap(), path)
    };
    PrivateKeyStorage.prototype.loadMsgKeys = function (user) {
        var privateKeys = [];
        var path = db_msg_keys_path(user);
        var array = Storage.loadJSON(path);
        if (array) {
            var key;
            for (var i = 0; i < array.length; ++i) {
                key = PrivateKey.parse(array[i]);
                if (key) {
                    privateKeys.push(key)
                }
            }
        }
        return privateKeys
    };
    PrivateKeyStorage.prototype.saveMsgKey = function (key, user) {
        var privateKeys = this.loadMsgKeys(user);
        privateKeys = PrivateKeyDBI.insertKey(key, privateKeys);
        if (!privateKeys) {
            return false
        }
        var plain = PrivateKeyDBI.revertPrivateKeys(privateKeys);
        var path = db_msg_keys_path(user);
        return Storage.saveJSON(plain, path)
    };
    app.group.GroupDelegate = function (facebook, messenger) {
        TwinsHelper.call(this, facebook, messenger);
        groupBotsManager.setMessenger(messenger)
    };
    var GroupDelegate = app.group.GroupDelegate;
    Class(GroupDelegate, TwinsHelper, [GroupDataSource]);
    Implementation(GroupDelegate, {
        buildGroupName: function (members) {
            var barrack = this.getFacebook();
            var text = barrack.getName(members[0]);
            var nickname;
            for (var i = 1; i < members.length; ++i) {
                nickname = barrack.getName(members[i]);
                if (!nickname || nickname.length === 0) {
                    continue
                }
                text += ', ' + nickname;
                if (text.length > 32) {
                    return text.substring(0, 28) + ' ...'
                }
            }
            return text
        }, getMeta: function (identifier) {
            var barrack = this.getFacebook();
            return !barrack ? null : barrack.getMeta(identifier)
        }, getDocuments: function (identifier) {
            var barrack = this.getFacebook();
            return !barrack ? [] : barrack.getDocuments(identifier)
        }, getBulletin: function (identifier) {
            var barrack = this.getFacebook();
            return !barrack ? null : barrack.getBulletin(identifier)
        }, saveDocument: function (doc) {
            var barrack = this.getFacebook();
            return !barrack ? false : barrack.saveDocument(doc)
        }, getFounder: function (group) {
            var barrack = this.getFacebook();
            return !barrack ? null : barrack.getFounder(group)
        }, getOwner: function (group) {
            var barrack = this.getFacebook();
            return !barrack ? null : barrack.getOwner(group)
        }, getMembers: function (group) {
            var barrack = this.getFacebook();
            return !barrack ? [] : barrack.getMembers(group)
        }, saveMembers: function (members, group) {
            var barrack = this.getFacebook();
            return !barrack ? false : barrack.saveMembers(members, group)
        }, getAssistants: function (group) {
            return groupBotsManager.getAssistants(group)
        }, getFastestAssistant: function (group) {
            return groupBotsManager.getFastestAssistant(group)
        }, setCommonAssistants: function (bots) {
            groupBotsManager.setCommonAssistants(bots)
        }, updateRespondTime: function (content, envelope) {
            return groupBotsManager.updateRespondTime(content, envelope)
        }, getAdministrators: function (group) {
            var barrack = this.getFacebook();
            return !barrack ? [] : barrack.getAdministrators(group)
        }, saveAdministrators: function (admins, group) {
            var barrack = this.getFacebook();
            return !barrack ? false : barrack.saveAdministrators(admins, group)
        }, isFounder: function (user, group) {
            var founder = this.getFounder(group);
            if (founder) {
                return founder.equals(user)
            }
            var gMeta = this.getMeta(group);
            var mMeta = this.getMeta(user);
            if (!gMeta || !mMeta) {
                Log.error('failed to get meta for group', group, user);
                return false
            }
            return gMeta.matchPublicKey(mMeta.getPublicKey())
        }, isOwner: function (user, group) {
            var owner = this.getOwner(group);
            if (owner) {
                return owner.equals(user)
            }
            if (EntityType.GROUP === group.getType()) {
                return this.isFounder(user, group)
            }
            Log.error('only polylogue so far', group);
            return false
        }, isMember: function (user, group) {
            var members = this.getMembers(group);
            if (!members || members.length === 0) {
                Log.error('group members not ready', group);
                return false
            }
            for (var i = 0; i < members.length; ++i) {
                if (members[i].equals(user)) {
                    return true
                }
            }
            return false
        }, isAdministrator: function (user, group) {
            var admins = this.getAdministrators(group);
            if (!admins || admins.length === 0) {
                Log.info('group admins not found', group);
                return false
            }
            for (var i = 0; i < admins.length; ++i) {
                if (admins[i].equals(user)) {
                    return true
                }
            }
            return false
        }, isAssistant: function (user, group) {
            var bots = this.getAssistants(group);
            if (!bots || bots.length === 0) {
                Log.info('group bots not found', group);
                return false
            }
            for (var i = 0; i < bots.length; ++i) {
                if (bots[i].equals(user)) {
                    return true
                }
            }
            return false
        }
    });
    app.group.TripletsHelper = function (delegate) {
        BaseObject.call(this);
        this.__delegate = delegate
    };
    var TripletsHelper = app.group.TripletsHelper;
    Class(TripletsHelper, BaseObject, null);
    TripletsHelper.prototype.getDelegate = function () {
        return this.__delegate
    };
    TripletsHelper.prototype.getFacebook = function () {
        var delegate = this.getDelegate();
        return delegate.getFacebook()
    };
    TripletsHelper.prototype.getMessenger = function () {
        var delegate = this.getDelegate();
        return delegate.getMessenger()
    };
    TripletsHelper.prototype.getArchivist = function () {
        var facebook = this.getFacebook();
        return !facebook ? null : facebook.getArchivist()
    };
    TripletsHelper.prototype.getDatabase = function () {
        var archivist = this.getArchivist();
        return !archivist ? null : archivist.getDatabase()
    };
    app.group.GroupBotsManager = function () {
        Runner.call(this);
        this.__transceiver = null;
        this.__commonAssistants = [];
        this.__candidates = [];
        this.__respondTimes = {}
    };
    var GroupBotsManager = app.group.GroupBotsManager;
    Class(GroupBotsManager, Runner, null);
    GroupBotsManager.prototype.setMessenger = function (messenger) {
        this.__transceiver = messenger
    };
    GroupBotsManager.prototype.getMessenger = function () {
        return this.__transceiver
    };
    GroupBotsManager.prototype.getFacebook = function () {
        var messenger = this.getMessenger();
        return !messenger ? null : messenger.getFacebook()
    };
    GroupBotsManager.prototype.updateRespondTime = function (content, envelope) {
        var sender = envelope.getSender();
        if (!EntityType.BOT === sender.getType()) {
            return false
        }
        var origin = content.getOriginalEnvelope();
        var originalReceiver = !origin ? null : origin.getReceiver();
        if (!sender.equals(originalReceiver)) {
            return false
        }
        var time = !origin ? null : origin.getTime();
        if (!time) {
            return false
        }
        var duration = (new Date()).getTime() - time.getTime();
        if (duration <= 0) {
            return false
        }
        var cached = this.__respondTimes[sender];
        if (cached && cached <= duration) {
            return false
        }
        this.__respondTimes[sender] = duration;
        return true
    };
    GroupBotsManager.prototype.setCommonAssistants = function (bots) {
        addCandidateBots(this.__candidates, bots);
        this.__commonAssistants = bots
    };
    var addCandidateBots = function (toSet, fromItems) {
        var item;
        for (var i = 0; i < fromItems.length; ++i) {
            item = fromItems[i];
            if (toSet.indexOf(item) <= 0) {
                toSet.push(item)
            }
        }
    };
    GroupBotsManager.prototype.getAssistants = function (group) {
        var facebook = this.getFacebook();
        var bots = !facebook ? null : facebook.getAssistants(group);
        if (!bots || bots.length === 0) {
            return this.__commonAssistants
        }
        addCandidateBots(this.__candidates, bots);
        return bots
    };
    GroupBotsManager.prototype.getFastestAssistant = function (group) {
        var bots = this.getAssistants(group);
        if (!bots || bots.length === 0) {
            Log.warning('group bots not found: ' + group.toString());
            return null
        }
        var prime = null;
        var primeDuration;
        var duration;
        var ass;
        for (var i = 0; i < bots.length; ++i) {
            ass = bots[i];
            duration = this.__respondTimes[ass];
            if (!duration) {
                Log.info('group bot not respond yet, ignore it', ass, group);
                continue
            } else if (!primeDuration) {
            } else if (primeDuration < duration) {
                Log.info('this bot is slower, skip it', ass, prime, group);
                continue
            }
            prime = ass;
            primeDuration = duration
        }
        if (!prime) {
            prime = bots[0];
            Log.info('no bot responded, take the first one', bots, group)
        } else {
            Log.info('got the fastest bot with respond time', primeDuration, prime, group)
        }
        return prime
    };
    GroupBotsManager.prototype.process = function () {
        var messenger = this.getMessenger();
        var facebook = this.getFacebook();
        if (!facebook || !messenger) {
            return false
        }
        var session = messenger.getSession();
        if (session && session.getSessionKey() && session.isActive()) {
        } else {
            return false
        }
        var visa;
        try {
            var me = facebook.getCurrentUser();
            visa = !me ? null : me.getVisa();
            if (!visa) {
                Log.error('failed to get visa', me);
                return false
            }
        } catch (e) {
            Log.error('failed to get current user', e);
            return false
        }
        var bots = this.__candidates;
        this.__candidates = {};
        var item;
        for (var i = 0; i < bots.length; ++i) {
            item = bots[i];
            if (this.__respondTimes[item]) {
                Log.info('group bot already responded', item);
                continue
            }
            try {
                messenger.sendVisa(visa, item, false)
            } catch (e) {
                Log.error('failed to query assistant', item, e)
            }
        }
        return false
    };
    var groupBotsManager = new GroupBotsManager();
    var threadForGroupBotsManager = new Thread(groupBotsManager);
    threadForGroupBotsManager.start();
    app.group.AdminManager = function (delegate) {
        TripletsHelper.call(this, delegate)
    };
    var AdminManager = app.group.AdminManager;
    Class(AdminManager, TripletsHelper, null);
    AdminManager.prototype.updateAdministrators = function (newAdmins, group) {
        var delegate = this.getDelegate();
        var barrack = this.getFacebook();
        var user = !barrack ? null : barrack.getCurrentUser();
        if (!user) {
            Log.error('failed to get current user');
            return false
        }
        var me = user.getIdentifier();
        var sKey = !barrack ? null : barrack.getPrivateKeyForVisaSignature(me);
        var isOwner = delegate.isOwner(me, group);
        if (!isOwner) {
            return false
        }
        var bulletin = delegate.getBulletin(group);
        if (!bulletin) {
            Log.error('failed to get group document', group);
            return false
        } else {
            var clone = Document.parse(bulletin.copyMap(false));
            if (clone) {
                bulletin = clone
            } else {
                Log.error('bulletin error', bulletin, group);
                return false
            }
        }
        bulletin.setProperty('administrators', ID.revert(newAdmins));
        var signature = !sKey ? null : bulletin.sign(sKey);
        if (!signature) {
            Log.error('failed to sign document for group', group, me);
            return false
        } else if (!delegate.saveDocument(bulletin)) {
            Log.error('failed to save document for group', group);
            return false
        } else {
            Log.info('group document updated', group)
        }
        return this.broadcastGroupDocument(bulletin)
    };
    AdminManager.prototype.broadcastGroupDocument = function (doc) {
        var delegate = this.getDelegate();
        var barrack = this.getFacebook();
        var transceiver = this.getMessenger();
        var user = !barrack ? null : barrack.getCurrentUser();
        if (!user) {
            Log.error('failed to get current user');
            return false
        }
        var me = user.getIdentifier();
        var group = doc.getIdentifier();
        var meta = !barrack ? null : barrack.getMeta(group);
        var content = DocumentCommand.response(group, meta, doc);
        transceiver.sendContent(content, me, Station.ANY, 1);
        var item;
        var bots = delegate.getAssistants(group);
        if (bots && bots.length > 0) {
            for (var i = 0; i < bots.length; ++i) {
                item = bots[i];
                if (item.equals(me)) {
                    Log.error('should not be a bot here', me);
                    continue
                }
                transceiver.sendContent(content, me, item, 1)
            }
            return true
        }
        var members = delegate.getMembers(group);
        if (!members || members.length === 0) {
            Log.error('failed to get group members', group);
            return false
        }
        for (var j = 0; j < members.length; ++j) {
            item = members[j];
            if (item.equals(me)) {
                Log.info('skip cycled message', item, group);
                continue
            }
            transceiver.sendContent(content, me, item, 1)
        }
        return true
    };
    app.group.GroupCommandHelper = function (delegate) {
        TripletsHelper.call(this, delegate)
    };
    var GroupCommandHelper = app.group.GroupCommandHelper;
    Class(GroupCommandHelper, TripletsHelper, null);
    GroupCommandHelper.prototype.saveGroupHistory = function (content, rMsg, group) {
        if (this.isCommandExpired(content)) {
            Log.warning('drop expired command', content.getCmd(), rMsg.getSender(), group);
            return false
        }
        var cmdTime = content.getTime();
        if (!cmdTime) {
            Log.error('group command error: ' + content.toString())
        } else {
            var current = (new Date()).getTime() + 65536;
            if (cmdTime.getTime() > current) {
                Log.error('group command time error', cmdTime, content);
                return false
            }
        }
        var db = this.getDatabase();
        if (Interface.conforms(content, ResetCommand)) {
            Log.warning('cleaning group history for "reset" command', rMsg.getSender(), group);
            return db.clearGroupMemberHistories(group)
        }
        return db.saveGroupHistory(content, rMsg, group)
    };
    GroupCommandHelper.prototype.getGroupHistories = function (group) {
        var db = this.getDatabase();
        return db.getGroupHistories(group)
    };
    GroupCommandHelper.prototype.getResetCommandMessage = function (group) {
        var db = this.getDatabase();
        return db.getResetCommandMessage(group)
    };
    GroupCommandHelper.prototype.clearGroupMemberHistories = function (group) {
        var db = this.getDatabase();
        return db.clearGroupMemberHistories(group)
    };
    GroupCommandHelper.prototype.clearGroupAdminHistories = function (group) {
        var db = this.getDatabase();
        return db.clearGroupAdminHistories(group)
    };
    GroupCommandHelper.prototype.isCommandExpired = function (content) {
        var group = content.getGroup();
        if (!group) {
            Log.error('group content error: ' + content.toString());
            return true
        }
        if (Interface.conforms(content, ResignCommand)) {
            var delegate = this.getDelegate();
            var doc = delegate.getBulletin(group);
            if (!doc) {
                Log.error('group document not exists: ' + group.toString());
                return true
            }
            return DocumentUtils.isBefore(doc.getTime(), content.getTime())
        }
        var pair = this.getResetCommandMessage(group);
        var cmd = pair[0];
        if (!cmd) {
            return false
        }
        return DocumentUtils.isBefore(cmd.getTime(), content.getTime())
    };
    GroupCommandHelper.prototype.getMembersFromCommand = function (content) {
        var members = content.getMembers();
        if (!members) {
            members = [];
            var single = content.getMember();
            if (single) {
                members.push(single)
            }
        }
        return members
    };
    app.group.GroupPacker = function (delegate) {
        TripletsHelper.call(this, delegate)
    };
    var GroupPacker = app.group.GroupPacker;
    Class(GroupPacker, TripletsHelper, null);
    GroupPacker.prototype.packMessage = function (content, sender) {
        var envelope = Envelope.create(sender, ID.ANYONE, null);
        var iMsg = InstantMessage.create(envelope, content);
        iMsg.setString('group', content.getGroup());
        return this.encryptAndSignMessage(iMsg)
    };
    GroupPacker.prototype.encryptAndSignMessage = function (iMsg) {
        var transceiver = this.getMessenger();
        var sMsg = !transceiver ? null : transceiver.encryptMessage(iMsg);
        if (!sMsg) {
            Log.error('failed to encrypt message', iMsg.getSender(), iMsg.getReceiver());
            return null
        }
        var rMsg = !transceiver ? null : transceiver.signMessage(sMsg);
        if (!rMsg) {
            Log.error('failed to sign message', iMsg.getSender(), iMsg.getReceiver());
            return null
        }
        return rMsg
    };
    GroupPacker.prototype.splitInstantMessage = function (iMsg, allMembers) {
        var messages = [];
        var sender = iMsg.getSender();
        var info;
        var item;
        var receiver;
        for (var i = 0; i < allMembers.length; ++i) {
            receiver = allMembers[i];
            if (receiver.equals(sender)) {
                continue
            }
            Log.info('split group message for member', receiver);
            info = iMsg.copyMap(false);
            info['receiver'] = receiver.toString();
            item = InstantMessage.parse(info);
            if (!item) {
                Log.error('failed to repack message', receiver);
                continue
            }
            messages.push(item)
        }
        return messages
    };
    GroupPacker.prototype.splitReliableMessage = function (rMsg, allMembers) {
        var messages = [];
        var sender = rMsg.getSender();
        var keys = rMsg.getEncryptedKeys();
        if (!keys) {
            keys = {}
        }
        var keyData;
        var info;
        var item;
        var receiver;
        for (var i = 0; i < allMembers.length; ++i) {
            receiver = allMembers[i];
            if (sender.equals(receiver)) {
                Log.info('skip cycled message', receiver);
                continue
            }
            Log.info('split group message for member', receiver);
            info = rMsg.copyMap(false);
            info['receiver'] = receiver.toString();
            delete info['keys'];
            keyData = keys[receiver.toString()];
            if (keyData) {
                info['key'] = keyData
            }
            item = ReliableMessage.parse(info);
            if (!item) {
                Log.error('failed to repack message', receiver);
                continue
            }
            messages.push(item)
        }
        return messages
    };
    app.group.GroupHistoryBuilder = function (delegate) {
        TripletsHelper.call(this, delegate);
        this.__helper = this.createHelper()
    };
    var GroupHistoryBuilder = app.group.GroupHistoryBuilder;
    Class(GroupHistoryBuilder, TripletsHelper, null);
    GroupHistoryBuilder.prototype.getHelper = function () {
        return this.__helper
    };
    GroupHistoryBuilder.prototype.createHelper = function () {
        var delegate = this.getDelegate();
        return new GroupCommandHelper(delegate)
    };
    GroupHistoryBuilder.prototype.buildGroupHistories = function (group) {
        var messages = [];
        var doc;
        var reset;
        var rMsg;
        var docPair = this.buildDocumentCommand(group);
        doc = docPair[0];
        rMsg = docPair[1];
        if (!doc || !rMsg) {
            Log.warning('failed to build "document" command for group', group);
            return messages
        } else {
            messages.push(rMsg)
        }
        var helper = this.getHelper();
        var resPair = helper.getResetCommandMessage(group);
        reset = resPair[0];
        rMsg = resPair[1];
        if (!reset || !rMsg) {
            Log.warning('failed to get "reset" command for group', group);
            return messages
        } else {
            messages.push(rMsg)
        }
        var histories = helper.getGroupHistories(group);
        var hisPair;
        var first;
        var second;
        for (var i = 0; i < histories.length; ++i) {
            hisPair = histories[i];
            first = hisPair[0];
            second = hisPair[1];
            if (Interface.conforms(first, ResetCommand)) {
                Log.info('skip "reset" command for group', group);
                continue
            } else if (Interface.conforms(first, ResignCommand)) {
                if (DocumentUtils.isBefore(doc.getTime(), first.getTime())) {
                    Log.warning('expired command in group', group);
                    continue
                }
            } else {
                if (DocumentUtils.isBefore(reset.getTime(), first.getTime())) {
                    Log.warning('expired command in group', group);
                    continue
                }
            }
            messages.push(second)
        }
        return messages
    };
    GroupHistoryBuilder.prototype.buildDocumentCommand = function (group) {
        var delegate = this.getDelegate();
        var facebook = this.getFacebook();
        var user = !facebook ? null : facebook.getCurrentUser();
        var doc = !delegate ? null : delegate.getBulletin(group);
        if (!user || !doc) {
            Log.error('document not found for group', group);
            return [null, null]
        }
        var me = user.getIdentifier();
        var meta = !delegate ? null : delegate.getMeta(group);
        var command = DocumentCommand.response(group, meta, doc);
        var rMsg = this.packBroadcastMessage(me, command);
        return [doc, rMsg]
    };
    GroupHistoryBuilder.prototype.buildResetCommand = function (group, members) {
        var delegate = this.getDelegate();
        var facebook = this.getFacebook();
        var user = !facebook ? null : facebook.getCurrentUser();
        var owner = !delegate ? null : delegate.getOwner(group);
        if (!user || !owner) {
            Log.error('owner not found for group', group);
            return [null, null]
        }
        var me = user.getIdentifier();
        if (!owner.equals(me)) {
            var admins = delegate.getAdministrators(group);
            if (!admins || admins.indexOf(me) < 0) {
                Log.warning('not permit to build "reset" command for group"', group, me);
                return [null, null]
            }
        }
        if (!members) {
            members = delegate.getMembers(group)
        }
        var command = GroupCommand.reset(group, members);
        var rMsg = this.packBroadcastMessage(me, command);
        return [command, rMsg]
    };
    GroupHistoryBuilder.prototype.packBroadcastMessage = function (sender, content) {
        var messenger = this.getMessenger();
        var envelope = Envelope.create(sender, ID.ANYONE, null);
        var iMsg = InstantMessage.create(envelope, content);
        var sMsg = !messenger ? null : messenger.encryptMessage(iMsg);
        if (!sMsg) {
            Log.error('failed to encrypt message', envelope);
            return null
        }
        var rMsg = !messenger ? null : messenger.signMessage(sMsg);
        if (!rMsg) {
            Log.error('failed to sign message', envelope)
        }
        return rMsg
    };
    app.group.GroupEmitter = function (delegate) {
        TripletsHelper.call(this, delegate);
        this.__packer = this.createPacker()
    };
    var GroupEmitter = app.group.GroupEmitter
    Class(GroupEmitter, TripletsHelper, null);
    GroupEmitter.POLYLOGUE_LIMIT = 32;
    GroupEmitter.SECRET_GROUP_LIMIT = 16;
    GroupEmitter.prototype.getPacker = function () {
        return this.__packer
    };
    GroupEmitter.prototype.createPacker = function () {
        var delegate = this.getDelegate();
        return new GroupPacker(delegate)
    };
    var attachGroupTimes = function (group, iMsg) {
        if (Interface.conforms(iMsg.getContent(), GroupCommand)) {
            return false
        }
        var facebook = this.getFacebook();
        var doc = !facebook ? null : facebook.getBulletin(group);
        if (!doc) {
            Log.warning('failed to get bulletin document', group);
            return false
        }
        var lastDocumentTime = doc.getTime();
        if (!lastDocumentTime) {
            Log.warning('document error', doc)
        } else {
            iMsg.setDateTime('GDT', lastDocumentTime)
        }
        var archivist = this.getArchivist();
        var lastHistoryTime = archivist.getLastGroupHistoryTime(group);
        if (!lastHistoryTime) {
            Log.warning('failed to get history time', group)
        } else {
            iMsg.setDateTime('GHT', lastHistoryTime)
        }
        return true
    };
    GroupEmitter.prototype.sendInstantMessage = function (iMsg, priority) {
        if (!priority) {
            priority = 0
        }
        var content = iMsg.getContent();
        var group = content.getGroup();
        if (!group) {
            Log.warning('not a group message', iMsg);
            return null
        } else {
            attachGroupTimes.call(this, group, iMsg)
        }
        var delegate = this.getDelegate();
        var prime = delegate.getFastestAssistant(group);
        if (prime != null) {
            return forwardMessage.call(this, iMsg, prime, group, priority)
        }
        var members = delegate.getMembers(group);
        if (!members || members.length === 0) {
            Log.warning('failed to get members', group);
            return null
        }
        if (members.length < GroupEmitter.SECRET_GROUP_LIMIT) {
            var success = splitAndSendMessage.call(this, iMsg, members, group, priority);
            Log.info('split message(s) for group', success, group);
            return null
        } else {
            Log.info('splitting message for members', members.length, group);
            return disperseMessage.call(this, iMsg, members, group, priority)
        }
    };
    var forwardMessage = function (iMsg, bot, group, priority) {
        if (!priority) {
            priority = 0
        }
        var transceiver = this.getMessenger();
        var packer = this.getPacker();
        iMsg.setString('group', group);
        var rMsg = packer.encryptAndSignMessage(iMsg);
        if (rMsg == null) {
            Log.error('failed to encrypt & sign message', iMsg.getSender(), group);
            return null
        }
        var content = ForwardContent.create(rMsg);
        var pair = transceiver.sendContent(content, null, bot, priority);
        if (!pair || !pair[1]) {
            Log.warning('failed to forward message to group bot', group, bot)
        }
        return rMsg
    };
    var disperseMessage = function (iMsg, members, group, priority) {
        if (!priority) {
            priority = 0
        }
        var transceiver = this.getMessenger();
        var packer = this.getPacker();
        iMsg.setString('group', group);
        var sender = iMsg.getSender();
        var rMsg = packer.encryptAndSignMessage(iMsg);
        if (!rMsg) {
            Log.error('failed to encrypt & sign message', sender, group);
            return null
        }
        var messages = packer.splitReliableMessage(rMsg, members);
        var receiver;
        var ok;
        var r_msg;
        for (var i = 0; i < messages.length; ++i) {
            r_msg = messages[i];
            receiver = r_msg.receiver;
            if (sender.equals(receiver)) {
                Log.info('cycled message', sender, receiver, group);
                continue
            }
            ok = transceiver.sendReliableMessage(r_msg, priority);
            if (!ok) {
                Log.error('failed to send message', sender, receiver, group)
            }
        }
        return rMsg
    };
    var splitAndSendMessage = function (iMsg, members, group, priority) {
        if (!priority) {
            priority = 0
        }
        var transceiver = this.getMessenger();
        var packer = this.getPacker();
        var sender = iMsg.getSender();
        var success = 0;
        var messages = packer.splitInstantMessage(iMsg, members);
        var receiver;
        var rMsg;
        var i_msg;
        for (var i = 0; i < messages.length; ++i) {
            i_msg = messages[i];
            receiver = i_msg.receiver;
            if (sender.equals(receiver)) {
                Log.info('cycled message', sender, receiver, group);
                continue
            }
            rMsg = transceiver.sendInstantMessage(i_msg, priority);
            if (rMsg) {
                Log.error('failed to send message', sender, receiver, group);
                continue
            }
            success += 1
        }
        return success
    };
    app.group.GroupManager = function (delegate) {
        TripletsHelper.call(this, delegate);
        this.__packer = this.createPacker();
        this.__helper = this.createHelper();
        this.__builder = this.createBuilder()
    };
    var GroupManager = app.group.GroupManager;
    Class(GroupManager, TripletsHelper, null);
    GroupManager.prototype.getPacker = function () {
        return this.__packer
    };
    GroupManager.prototype.getHelper = function () {
        return this.__helper
    };
    GroupManager.prototype.getBuilder = function () {
        return this.__builder
    };
    GroupManager.prototype.createPacker = function () {
        var delegate = this.getDelegate();
        return new GroupPacker(delegate)
    };
    GroupManager.prototype.createHelper = function () {
        var delegate = this.getDelegate();
        return new GroupCommandHelper(delegate)
    };
    GroupManager.prototype.createBuilder = function () {
        var delegate = this.getDelegate();
        return new GroupHistoryBuilder(delegate)
    };
    GroupManager.prototype.createGroup = function (members) {
        var facebook = this.getFacebook();
        var user = !facebook ? null : facebook.getCurrentUser();
        if (!user) {
            Log.error('failed to get current user');
            return null
        }
        var founder = user.getIdentifier();
        var pos = members.indexOf(founder);
        if (pos < 0) {
            members.unshift(founder)
        } else if (pos > 0) {
            members.splice(pos, 1);
            members.unshift(founder)
        }
        var delegate = this.getDelegate();
        var database = this.getDatabase();
        var groupName = delegate.buildGroupName(members);
        var register = new Register(database);
        var group = register.createGroup(founder, groupName);
        Log.info('new group with founder', group, founder);
        var meta = delegate.getMeta(group);
        var doc = delegate.getBulletin(group);
        var content;
        if (doc) {
            content = DocumentCommand.response(group, meta, doc)
        } else if (meta) {
            content = MetaCommand.response(group, meta)
        } else {
            Log.error('failed to get group info', groupName);
            return null
        }
        var ok = this.sendCommand(content, Station.ANY);
        if (!ok) {
            Log.error('failed to upload meta/document to neighbor station')
        }
        if (this.resetMembers(group, members)) {
            Log.info('created group with members', group, members.length)
        } else {
            Log.error('failed to create group with members', group, members.length)
        }
        return group
    };
    GroupManager.prototype.resetMembers = function (group, newMembers) {
        var delegate = this.getDelegate();
        var facebook = this.getFacebook();
        var user = !facebook ? null : facebook.getCurrentUser();
        if (!user) {
            Log.error('failed to get current user');
            return false
        }
        var me = user.getIdentifier();
        var first = newMembers[0];
        var ok = delegate.isOwner(first, group);
        if (!ok) {
            Log.error('group owner must be the first member', first, group);
            return false
        }
        var oldMembers = delegate.getMembers(group);
        var expelList = [];
        var item;
        for (var i = 0; i < oldMembers.length; ++i) {
            item = oldMembers[i];
            if (newMembers.indexOf(item) < 0) {
                expelList.push(item)
            }
        }
        var isOwner = me.equals(first);
        var isAdmin = delegate.isAdministrator(me, group);
        var canReset = isOwner || isAdmin;
        if (!canReset) {
            Log.error('cannot reset members', group);
            return false
        }
        var builder = this.getBuilder();
        var pair = builder.buildResetCommand(group, newMembers);
        var reset = pair[0];
        var rMsg = pair[1];
        if (!reset || !rMsg) {
            Log.error('failed to build "reset" command', group);
            return false
        }
        var helper = this.getHelper();
        if (!helper.saveGroupHistory(reset, rMsg, group)) {
            Log.error('failed to save "reset" command', group);
            return false
        } else if (!delegate.saveMembers(newMembers, group)) {
            Log.error('failed to update members', group);
            return false
        } else {
            Log.info('group members updated', group, newMembers.length)
        }
        var messages = builder.buildGroupHistories(group);
        var forward = ForwardContent.create(messages);
        var bots = delegate.getAssistants(group);
        if (bots && bots.length > 0) {
            return this.sendCommand(forward, bots)
        } else {
            this.sendCommand(forward, newMembers);
            this.sendCommand(forward, expelList)
        }
        return true
    };
    GroupManager.prototype.inviteMembers = function (group, newMembers) {
        var facebook = this.getFacebook();
        var delegate = this.getDelegate();
        var user = !facebook ? null : facebook.getCurrentUser();
        if (!user) {
            return false
        }
        var me = user.getIdentifier();
        var oldMembers = delegate.getMembers(group);
        var isOwner = delegate.isOwner(me, group);
        var isAdmin = delegate.isAdministrator(me, group);
        var isMember = delegate.isMember(me, group);
        var canReset = isOwner || isAdmin;
        if (canReset) {
            var members = oldMembers.slice();
            var item;
            for (var i = 0; i < newMembers.length; ++i) {
                item = newMembers[i];
                if (members.indexOf(item) < 0) {
                    members.push(item)
                }
            }
            return this.resetMembers(group, members)
        } else if (!isMember) {
            Log.error('cannot invite member', group);
            return false
        }
        var packer = this.getPacker();
        var helper = this.getHelper();
        var builder = this.getBuilder();
        var invite = GroupCommand.invite(group, newMembers);
        var rMsg = packer.packMessage(invite, me);
        if (!rMsg) {
            Log.error('failed to build "invite" command', group);
            return false
        } else if (!helper.saveGroupHistory(invite, rMsg, group)) {
            Log.error('failed to save "invite" command', group);
            return false
        }
        var forward = ForwardContent.create(rMsg);
        var bots = delegate.getAssistants(group);
        if (bots && bots.length > 0) {
            return this.sendCommand(forward, bots)
        }
        this.sendCommand(forward, oldMembers);
        var messages = builder.buildGroupHistories(group);
        forward = ForwardContent.create(messages);
        this.sendCommand(forward, newMembers);
        return true
    };
    GroupManager.prototype.quitGroup = function (group) {
        var delegate = this.getDelegate();
        var facebook = this.getFacebook();
        var user = !facebook ? null : facebook.getCurrentUser();
        if (!user) {
            Log.error('failed to get current user');
            return false
        }
        var me = user.getIdentifier();
        var members = delegate.getMembers(group);
        var isOwner = delegate.isOwner(me, group);
        var isAdmin = delegate.isAdministrator(me, group);
        var isMember = members.indexOf(me) >= 0;
        if (isOwner) {
            Log.error('owner cannot quit from group', group);
            return false
        } else if (isAdmin) {
            Log.error('administrator cannot quit from group', group);
            return false
        }
        if (isMember) {
            Log.warning('quitting group', group);
            members = members.slice();
            Arrays.remove(members, me);
            var ok = delegate.saveMembers(members, group);
            if (!ok) {
                Log.error('failed to save members', group)
            }
        } else {
            Log.warning('member not in group', group)
        }
        var packer = this.getPacker();
        var content = GroupCommand.quit(group);
        var rMsg = packer.packMessage(content, me);
        if (!rMsg) {
            Log.error('failed to pack group message', group);
            return false
        }
        var forward = ForwardContent.create(rMsg);
        var bots = delegate.getAssistants(group);
        if (bots && bots.length > 0) {
            return this.sendCommand(forward, bots)
        } else {
            return this.sendCommand(forward, members)
        }
    };
    GroupManager.prototype.sendCommand = function (content, receiver) {
        var members;
        if (Interface.conforms(receiver, ID)) {
            members = [receiver]
        } else if (receiver instanceof Array && receiver.length > 0) {
            members = receiver
        } else {
            Log.error('failed to send command', receiver);
            return false
        }
        var facebook = this.getFacebook();
        var user = !facebook ? null : facebook.getCurrentUser();
        if (!user) {
            Log.error('failed to get current user');
            return false
        }
        var me = user.getIdentifier();
        var transceiver = this.getMessenger();
        for (var i = 0; i < members.length; ++i) {
            receiver = members[i];
            if (me.equals(receiver)) {
                Log.info('skip cycled message', receiver);
                continue
            }
            transceiver.sendContent(content, me, receiver, 1)
        }
        return true
    };
    app.group.SharedGroupManager = function () {
        BaseObject.call(this);
        this.__barrack = null;
        this.__transceiver = null;
        this.__delegate = null;
        this.__manager = null;
        this.__admin_man = null;
        this.__emitter = null
    };
    var SharedGroupManager = app.group.SharedGroupManager;
    Class(SharedGroupManager, BaseObject, [GroupDataSource]);
    SharedGroupManager.prototype.getFacebook = function () {
        return this.__barrack
    };
    SharedGroupManager.prototype.getMessenger = function () {
        return this.__transceiver
    };
    SharedGroupManager.prototype.setFacebook = function (facebook) {
        this.__barrack = facebook;
        this.clearDelegates()
    };
    SharedGroupManager.prototype.setMessenger = function (messenger) {
        this.__transceiver = messenger;
        this.clearDelegates()
    };
    SharedGroupManager.prototype.clearDelegates = function () {
        this.__delegate = null;
        this.__manager = null;
        this.__admin_man = null;
        this.__emitter = null
    };
    SharedGroupManager.prototype.getGroupDelegate = function () {
        var delegate = this.__delegate;
        if (!delegate) {
            var facebook = this.getFacebook();
            var messenger = this.getMessenger();
            if (facebook && messenger) {
                delegate = new GroupDelegate(facebook, messenger)
                this.__delegate = delegate
            }
        }
        return delegate
    };
    SharedGroupManager.prototype.getGroupManager = function () {
        var man = this.__manager;
        if (!man) {
            var delegate = this.getGroupDelegate();
            if (delegate) {
                man = new GroupManager(delegate);
                this.__manager = man
            }
        }
        return man
    };
    SharedGroupManager.prototype.getAdminManager = function () {
        var man = this.__admin_man;
        if (!man) {
            var delegate = this.getGroupDelegate();
            if (delegate) {
                man = new AdminManager(delegate);
                this.__admin_man = man
            }
        }
        return man
    };
    SharedGroupManager.prototype.getGroupEmitter = function () {
        var emitter = this.__emitter;
        if (!emitter) {
            var delegate = this.getGroupDelegate();
            if (delegate) {
                emitter = new GroupEmitter(delegate);
                this.__emitter = emitter
            }
        }
        return emitter
    };
    SharedGroupManager.prototype.buildGroupName = function (members) {
        var delegate = this.getGroupDelegate();
        return delegate.buildGroupName(members)
    };
    SharedGroupManager.prototype.getMeta = function (group) {
        var delegate = this.getGroupDelegate();
        return delegate.getMeta(group)
    };
    SharedGroupManager.prototype.getDocuments = function (group) {
        var delegate = this.getGroupDelegate();
        return delegate.getDocuments(group)
    };
    SharedGroupManager.prototype.getBulletin = function (group) {
        var delegate = this.getGroupDelegate();
        return delegate.getBulletin(group)
    };
    SharedGroupManager.prototype.getFounder = function (group) {
        var delegate = this.getGroupDelegate();
        return delegate.getFounder(group)
    };
    SharedGroupManager.prototype.getOwner = function (group) {
        var delegate = this.getGroupDelegate();
        return delegate.getOwner(group)
    };
    SharedGroupManager.prototype.getAssistants = function (group) {
        var delegate = this.getGroupDelegate();
        return delegate.getAssistants(group)
    };
    SharedGroupManager.prototype.getMembers = function (group) {
        var delegate = this.getGroupDelegate();
        return delegate.getMembers(group)
    };
    SharedGroupManager.prototype.getAdministrators = function (group) {
        var delegate = this.getGroupDelegate();
        return delegate.getAdministrators(group)
    };
    SharedGroupManager.prototype.isOwner = function (user, group) {
        var delegate = this.getGroupDelegate();
        return delegate.isOwner(user, group)
    };
    SharedGroupManager.prototype.broadcastGroupDocument = function (doc) {
        var delegate = this.getGroupDelegate();
        return delegate.broadcastGroupDocument(doc)
    };
    SharedGroupManager.prototype.createGroup = function (members) {
        var delegate = this.getGroupManager();
        return delegate.createGroup(members)
    };
    SharedGroupManager.prototype.updateAdministrators = function (newAdmins, group) {
        var delegate = this.getAdminManager();
        return delegate.updateAdministrators(newAdmins, group)
    };
    SharedGroupManager.prototype.resetGroupMembers = function (newMembers, group) {
        var delegate = this.getGroupManager();
        return delegate.resetMembers(group, newMembers)
    };
    SharedGroupManager.prototype.expelGroupMembers = function (expelMembers, group) {
        var facebook = this.getFacebook();
        var user = !facebook ? null : facebook.getCurrentUser();
        if (!user) {
            return false
        }
        var delegate = this.getGroupDelegate();
        var me = user.getIdentifier();
        var oldMembers = delegate.getMembers(group);
        var isOwner = delegate.isOwner(me, group);
        var isAdmin = delegate.isAdministrator(me, group);
        var canReset = isOwner || isAdmin;
        if (canReset) {
            var members = oldMembers.slice();
            var item;
            for (var i = 0; i < expelMembers.length; ++i) {
                item = expelMembers[i];
                Arrays.remove(members, item)
            }
            return this.resetGroupMembers(members, group)
        }
        throw new Error('Cannot expel members from group: ' + group.toString());
    };
    SharedGroupManager.prototype.inviteGroupMembers = function (newMembers, group) {
        var delegate = this.getGroupManager();
        return delegate.inviteMembers(group, newMembers)
    };
    SharedGroupManager.prototype.quitGroup = function (group) {
        var delegate = this.getGroupManager();
        return delegate.quitGroup(group)
    };
    SharedGroupManager.prototype.sendInstantMessage = function (iMsg, priority) {
        if (!priority) {
            priority = 0
        }
        iMsg.setValue('GF', true);
        var delegate = this.getGroupEmitter();
        return delegate.sendInstantMessage(iMsg, priority)
    };
    var sharedGroupManager = new SharedGroupManager();
    SharedGroupManager.getInstance = function () {
        var manager = sharedGroupManager;
        if (!manager) {
            manager = new SharedGroupManager();
            sharedGroupManager = manager
        }
        return manager
    };
    app.network.MessageWrapper = function (rMsg, departure) {
        BaseObject.call(this);
        this.__msg = rMsg;
        this.__ship = departure
    };
    var MessageWrapper = app.network.MessageWrapper;
    Class(MessageWrapper, BaseObject, [Departure]);
    MessageWrapper.prototype.getMessage = function () {
        return this.__msg
    };
    MessageWrapper.prototype.getSN = function () {
        return this.__ship.getSN()
    };
    MessageWrapper.prototype.getPriority = function () {
        return this.__ship.getPriority()
    };
    MessageWrapper.prototype.getFragments = function () {
        return this.__ship.getFragments()
    };
    MessageWrapper.prototype.checkResponse = function (arrival) {
        return this.__ship.checkResponse(arrival)
    };
    MessageWrapper.prototype.isImportant = function () {
        return this.__ship.isImportant()
    };
    MessageWrapper.prototype.touch = function (now) {
        return this.__ship.touch(now)
    };
    MessageWrapper.prototype.getStatus = function (now) {
        return this.__ship.getStatus(now)
    };
    app.network.MessageQueue = function () {
        BaseObject.call(this);
        this.__priorities = [];
        this.__fleets = {}
    };
    var MessageQueue = app.network.MessageQueue
    Class(MessageQueue, BaseObject, null);
    MessageQueue.prototype.append = function (rMsg, departure) {
        var ok = true;
        var priority = departure.getPriority();
        var array = this.__fleets[priority];
        if (!array || array.length === 0) {
            array = [];
            this.__fleets[priority] = array;
            insert_departure_priority(priority, this.__priorities)
        } else {
            var signature = rMsg.getValue('signature');
            var item;
            for (var i = array.length - 1; i >= 0; --i) {
                item = array[i].getMessage();
                if (item && is_msg_duplicated(item, rMsg)) {
                    Log.warning('[QUEUE] duplicated message', signature);
                    ok = false;
                    break
                }
            }
        }
        if (ok) {
            array.push(new MessageWrapper(rMsg, departure))
        }
        return ok
    };
    var is_msg_duplicated = function (msg1, msg2) {
        var sig1 = msg1.getValue('signature');
        var sig2 = msg2.getValue('signature');
        if (!sig1 || !sig2) {
            return false
        } else if (sig1 !== sig2) {
            return false
        }
        var to1 = msg1.getReceiver();
        var to2 = msg2.getReceiver();
        return to1.equals(to2)
    };
    var insert_departure_priority = function (prior, priorities) {
        var total = priorities.length;
        var value;
        var index = 0;
        for (; index < total; ++index) {
            value = priorities[index];
            if (value === prior) {
                return
            } else if (value > prior) {
                break
            }
        }
        Arrays.insert(priorities, index, prior)
    };
    MessageQueue.prototype.next = function () {
        var priority;
        var array;
        for (var i = 0; i < this.__priorities.length; ++i) {
            priority = this.__priorities[i];
            array = this.__fleets[priority];
            if (array && array.length > 0) {
                return array.shift()
            }
        }
        return null
    };
    MessageQueue.prototype.purge = function () {
        var priority;
        var array;
        for (var i = this.__priorities.length - 1; i >= 0; --i) {
            priority = this.__priorities[i];
            array = this.__fleets[priority];
            if (!array) {
                this.__priorities.splice(i, 1)
            } else if (array.length === 0) {
                delete this.__fleets[priority];
                this.__priorities.splice(i, 1)
            }
        }
        return null
    };
    app.network.AckEnableGate = function (keeper) {
        CommonGate.call(this, keeper)
    };
    var AckEnableGate = app.network.AckEnableGate;
    Class(AckEnableGate, CommonGate, null);
    Implementation(AckEnableGate, {
        createPorter: function (remote, local) {
            var docker = new AckEnablePorter(remote, local);
            docker.setDelegate(this.getDelegate());
            return docker
        }
    });
    app.network.AckEnablePorter = function (remote, local) {
        PlainPorter.call(this, remote, local)
    };
    var AckEnablePorter = app.network.AckEnablePorter;
    Class(AckEnablePorter, PlainPorter, null);
    Implementation(AckEnablePorter, {
        checkArrival: function (income) {
            if (income instanceof PlainArrival) {
                var payload = income.getPayload();
                if (!payload || payload.length === 0) {
                } else if (payload[0] === jsonBegin) {
                    var sig = fetchJsonValue(payload, DataUtils.bytes('signature'));
                    var sec = fetchJsonValue(payload, DataUtils.bytes('time'));
                    if (sig && sec) {
                        var signature = UTF8.decode(sig);
                        var timestamp = UTF8.decode(sec);
                        var text = 'ACK:{"time":' + timestamp + ',"signature":"' + signature + '"}';
                        var priority = 1
                        this.send(DataUtils.bytes(text), priority)
                    }
                }
            }
            return PlainPorter.prototype.checkArrival(income)
        }
    });
    var jsonBegin = '{'.charCodeAt(0);
    var fetchJsonValue = function (data, tag) {
        if (tag.length === 0) {
            return null
        }
        var pos = DataUtils.find(data, tag, 0);
        if (pos < 0) {
            return null
        } else {
            pos += tag.length
        }
        pos = DataUtils.find(data, DataUtils.bytes(':'), pos);
        if (pos < 0) {
            return null
        } else {
            pos += 1
        }
        var end = DataUtils.find(data, DataUtils.bytes(','), pos);
        if (end < 0) {
            end = DataUtils.find(data, DataUtils.bytes('}'), pos);
            if (end < 0) {
                return null
            }
        }
        var value = data.subarray(pos, end);
        value = DataUtils.strip(value, DataUtils.bytes(' '));
        value = DataUtils.strip(value, DataUtils.bytes('"'));
        value = DataUtils.strip(value, DataUtils.bytes("'"));
        return value
    };
    app.utils.DataUtils = {
        bytes: function (text) {
            return UTF8.encode(text)
        }, find: function (data, sub, start) {
            if (!start) {
                start = 0
            }
            var end = data.length - sub.length;
            var i, j;
            var match;
            for (i = start; i <= end; ++i) {
                match = true;
                for (j = 0; j < sub.length; ++j) {
                    if (data[i + j] === sub[j]) {
                        continue
                    }
                    match = false;
                    break
                }
                if (match) {
                    return i
                }
            }
            return -1
        }, strip: function (data, removing) {
            data = this.stripRight(data, removing);
            return this.stripLeft(data, removing)
        }, stripLeft: function (data, leading) {
            var c = leading.length;
            if (c === 0) {
                return data
            }
            var i;
            while (c <= data.length) {
                for (i = 0; i < c; ++i) {
                    if (data[i] !== leading[i]) {
                        return data
                    }
                }
                data = data.subarray(c)
            }
            return data
        }, stripRight: function (data, trailing) {
            var c = trailing.length;
            if (c === 0) {
                return data
            }
            var i;
            var m = data.length - c;
            while (m >= 0) {
                for (i = 0; i < c; ++i) {
                    if (data[m + i] !== trailing[i]) {
                        return data
                    }
                }
                data = data.subarray(0, m);
                m -= c
            }
            return data
        }
    };
    var DataUtils = app.utils.DataUtils;
    app.network.GateKeeper = function (host, port) {
        Runner.call(this);
        this.__remote = new InetSocketAddress(host, port);
        this.__gate = this.createGate(this.__remote);
        this.__queue = new MessageQueue();
        this.__active = false;
        this.__last_active = 0;
        this.__reconnect_time = 0
    };
    var GateKeeper = app.network.GateKeeper;
    Class(GateKeeper, Runner, [PorterDelegate]);
    GateKeeper.prototype.createGate = function (remote) {
        var gate = new AckEnableGate(this);
        var hub = this.createHub(gate, remote);
        gate.setHub(hub);
        return gate
    };
    GateKeeper.prototype.createHub = function (delegate, remote) {
        var hub = new ClientHub(delegate);
        hub.connect(remote, null);
        return hub
    };
    GateKeeper.prototype.getRemoteAddress = function () {
        return this.__remote
    };
    GateKeeper.prototype.getGate = function () {
        return this.__gate
    };
    GateKeeper.prototype.isActive = function () {
        return this.__active
    };
    GateKeeper.prototype.setActive = function (active, when) {
        if (this.__active === active) {
            return false
        }
        if (!when || when === 0) {
            when = (new Date()).getTime()
        } else if (when instanceof Date) {
            when = when.getTime()
        }
        if (when <= this.__last_active) {
            return false
        }
        this.__active = active;
        this.__last_active = when;
        return true
    };
    GateKeeper.prototype.isRunning = function () {
        if (Runner.prototype.isRunning.call(this)) {
            return this.__gate.isRunning()
        } else {
            return false
        }
    };
    GateKeeper.prototype.stop = function () {
        Runner.prototype.stop.call(this)
        this.__gate.stop()
    };
    GateKeeper.prototype.setup = function () {
        var again = Runner.prototype.setup.call(this)
        this.__gate.start();
        return again
    };
    GateKeeper.prototype.finish = function () {
        this.__gate.stop();
        return Runner.prototype.finish.call(this)
    };
    GateKeeper.prototype.process = function () {
        var gate = this.getGate();
        var remote = this.getRemoteAddress();
        var docker = gate.getPorter(remote, null);
        if (!docker) {
            var now = (new Date()).getTime();
            if (now < this.__reconnect_time) {
                return false
            }
            docker = gate.fetchPorter(remote, null);
            if (!docker) {
                Log.error('gate error', remote);
                this.__reconnect_time = now + 8000;
                return false
            }
        }
        var hub = gate.getHub();
        try {
            var incoming = hub.process();
            var outgoing = gate.process();
            if (incoming || outgoing) {
                return true
            }
        } catch (e) {
            Log.error('GateKeeper::process()', e);
            return false
        }
        var queue = this.__queue;
        if (!this.isActive()) {
            queue.purge();
            return false
        }
        var wrapper = queue.next();
        if (!wrapper) {
            queue.purge();
            return false
        }
        var msg = wrapper.getMessage();
        if (!msg) {
            return true
        }
        var ok = gate.sendShip(wrapper, remote, null);
        if (!ok) {
            Log.error('gate error, failed to send data', wrapper, remote)
        }
        return true
    };
    GateKeeper.prototype.queueAppend = function (rMsg, departure) {
        var queue = this.__queue;
        return queue.append(rMsg, departure)
    };
    GateKeeper.prototype.onPorterStatusChanged = function (previous, current, docker) {
        Log.info('GateKeeper::onPorterStatusChanged()', previous, current, docker)
    };
    GateKeeper.prototype.onPorterReceived = function (arrival, docker) {
        Log.info('GateKeeper::onPorterReceived()', arrival, docker)
    };
    GateKeeper.prototype.onPorterSent = function (departure, docker) {
    };
    GateKeeper.prototype.onPorterFailed = function (error, departure, docker) {
        Log.info('GateKeeper::onPorterFailed()', error, departure, docker)
    };
    GateKeeper.prototype.onPorterError = function (error, departure, docker) {
        Log.info('GateKeeper::onPorterError()', error, departure, docker)
    };
    app.network.Transmitter = Interface(null, null);
    var Transmitter = app.network.Transmitter
    Transmitter.prototype.sendContent = function (content, sender, receiver, priority) {
    };
    Transmitter.prototype.sendInstantMessage = function (iMsg, priority) {
    };
    Transmitter.prototype.sendReliableMessage = function (rMsg, priority) {
    };
    app.network.Session = Interface(null, [Transmitter]);
    var Session = app.network.Session
    Session.prototype.getDatabase = function () {
    };
    Session.prototype.getRemoteAddress = function () {
    };
    Session.prototype.getSessionKey = function () {
    };
    Session.prototype.setIdentifier = function (user) {
    };
    Session.prototype.getIdentifier = function () {
    };
    Session.prototype.setActive = function (flag, when) {
    };
    Session.prototype.isActive = function () {
    };
    Session.prototype.queueMessagePackage = function (rMsg, data, priority) {
    };
    app.network.BaseSession = function (db, host, port) {
        GateKeeper.call(this, host, port);
        this.__db = db;
        this.__id = null;
        this.__messenger = null
    };
    var BaseSession = app.network.BaseSession;
    Class(BaseSession, GateKeeper, [Session]);
    Implementation(BaseSession, {
        queueMessagePackage: function (rMsg, data, priority) {
            var ship = new PlainDeparture(data, priority);
            return this.queueAppend(rMsg, ship)
        }
    });
    BaseSession.prototype.getDatabase = function () {
        return this.__db
    };
    BaseSession.prototype.getIdentifier = function () {
        return this.__id
    };
    BaseSession.prototype.setIdentifier = function (user) {
        var identifier = this.__id;
        if (!identifier) {
            if (!user) {
                return false
            }
        } else if (identifier.equals(user)) {
            return false
        }
        this.__id = user;
        return true
    };
    BaseSession.prototype.getMessenger = function () {
        return this.__messenger
    };
    BaseSession.prototype.setMessenger = function (messenger) {
        this.__messenger = messenger
    };
    BaseSession.prototype.sendContent = function (content, sender, receiver, priority) {
        var messenger = this.getMessenger();
        return messenger.sendContent(content, sender, receiver, priority)
    };
    BaseSession.prototype.sendInstantMessage = function (iMsg, priority) {
        var messenger = this.getMessenger();
        return messenger.sendInstantMessage(iMsg, priority)
    };
    BaseSession.prototype.sendReliableMessage = function (rMsg, priority) {
        var messenger = this.getMessenger();
        return messenger.sendReliableMessage(rMsg, priority)
    };
    app.network.SessionStateMachine = function (session) {
        AutoMachine.call(this);
        this.__session = session;
        var builder = this.createStateBuilder();
        this.addState(builder.getDefaultState());
        this.addState(builder.getConnectingState());
        this.addState(builder.getConnectedState());
        this.addState(builder.getHandshakingState());
        this.addState(builder.getRunningState());
        this.addState(builder.getErrorState())
    };
    var StateMachine = app.network.SessionStateMachine;
    Class(StateMachine, AutoMachine, null);
    StateMachine.prototype.createStateBuilder = function () {
        var stb = new TransitionBuilder();
        return new StateBuilder(stb)
    };
    StateMachine.prototype.getContext = function () {
        return this
    };
    StateMachine.prototype.getSession = function () {
        return this.__session
    };
    StateMachine.prototype.getSessionKey = function () {
        var session = this.getSession();
        return session.getSessionKey()
    };
    StateMachine.prototype.getSessionID = function () {
        var session = this.getSession();
        return session.getIdentifier()
    };
    StateMachine.prototype.getStatus = function () {
        var session = this.getSession();
        if (!session) {
            return PorterStatus.ERROR
        }
        var gate = session.getGate();
        var remote = session.getRemoteAddress();
        var docker = gate.getPorter(remote, null);
        if (!docker) {
            return PorterStatus.ERROR
        }
        return docker.getStatus()
    };
    app.network.SessionStateOrder = Enum('SessionStateOrder', {
        DEFAULT: 0,
        CONNECTING: 1,
        CONNECTED: 2,
        HANDSHAKING: 3,
        RUNNING: 4,
        ERROR: 5
    });
    var SessionStateOrder = app.network.SessionStateOrder;
    app.network.SessionState = function (order) {
        BaseState.call(this, Enum.getInt(order));
        this.__name = order.getName();
        this.__enterTime = null
    };
    var SessionState = app.network.SessionState;
    Class(SessionState, BaseState, null);
    Implementation(SessionState, {
        getName: function () {
            return this.__name
        }, getEnterTime: function () {
            return this.__enterTime
        }, toString: function () {
            return this.__name
        }, valueOf: function () {
            return this.__name
        }, equals: function (other) {
            if (other instanceof SessionState) {
                if (other === this) {
                    return true
                }
                other = other.getIndex()
            } else if (other instanceof SessionStateOrder) {
                other = other.getValue()
            }
            return this.getIndex() === other
        }
    });
    SessionState.prototype.onEnter = function (previous, ctx, now) {
        this.__enterTime = now
    };
    SessionState.prototype.onExit = function (next, ctx, now) {
        this.__enterTime = null
    };
    SessionState.prototype.onPause = function (ctx, now) {
    };
    SessionState.prototype.onResume = function (ctx, now) {
    };
    SessionState.Delegate = fsm.Delegate;
    app.network.SessionStateBuilder = function (transitionBuilder) {
        BaseObject.call(this);
        this.builder = transitionBuilder
    };
    var StateBuilder = app.network.SessionStateBuilder;
    Class(StateBuilder, BaseObject, null);
    Implementation(StateBuilder, {
        getDefaultState: function () {
            var state = new SessionState(SessionStateOrder.DEFAULT);
            state.addTransition(this.builder.getDefaultConnectingTransition());
            return state
        }, getConnectingState: function () {
            var state = new SessionState(SessionStateOrder.CONNECTING);
            state.addTransition(this.builder.getConnectingConnectedTransition());
            state.addTransition(this.builder.getConnectingErrorTransition());
            return state
        }, getConnectedState: function () {
            var state = new SessionState(SessionStateOrder.CONNECTED);
            state.addTransition(this.builder.getConnectedHandshakingTransition());
            state.addTransition(this.builder.getConnectedErrorTransition());
            return state
        }, getHandshakingState: function () {
            var state = new SessionState(SessionStateOrder.HANDSHAKING);
            state.addTransition(this.builder.getHandshakingRunningTransition());
            state.addTransition(this.builder.getHandshakingConnectedTransition());
            state.addTransition(this.builder.getHandshakingErrorTransition());
            return state
        }, getRunningState: function () {
            var state = new SessionState(SessionStateOrder.RUNNING);
            state.addTransition(this.builder.getRunningDefaultTransition());
            state.addTransition(this.builder.getRunningErrorTransition());
            return state
        }, getErrorState: function () {
            var state = new SessionState(SessionStateOrder.ERROR);
            state.addTransition(this.builder.getErrorDefaultTransition());
            return state
        }
    });
    app.network.SessionStateTransition = function (order, evaluate) {
        BaseTransition.call(this, Enum.getInt(order));
        this.__evaluate = evaluate
    };
    var StateTransition = app.network.SessionStateTransition;
    Class(StateTransition, BaseTransition, null);
    StateTransition.prototype.evaluate = function (ctx, now) {
        return this.__evaluate.call(this, ctx, now)
    };
    var is_state_expired = function (state, now) {
        var enterTime = state.getEnterTime();
        if (!enterTime) {
            return false
        }
        var recent = now.getTime() - 30 * 1000;
        return enterTime.getTime() < recent
    };
    app.network.SessionStateTransitionBuilder = function () {
        BaseObject.call(this)
    };
    var TransitionBuilder = app.network.SessionStateTransitionBuilder;
    Class(TransitionBuilder, BaseObject, null);
    Implementation(TransitionBuilder, {
        getDefaultConnectingTransition: function () {
            return new StateTransition(SessionStateOrder.CONNECTING, function (ctx, now) {
                if (!ctx.getSessionID()) {
                    return false
                }
                var status = ctx.getStatus();
                return PorterStatus.PREPARING.equals(status) || PorterStatus.READY.equals(status)
            })
        }, getConnectingConnectedTransition: function () {
            return new StateTransition(SessionStateOrder.CONNECTED, function (ctx, now) {
                var status = ctx.getStatus();
                return PorterStatus.READY.equals(status)
            })
        }, getConnectingErrorTransition: function () {
            return new StateTransition(SessionStateOrder.ERROR, function (ctx, now) {
                if (is_state_expired(ctx.getCurrentState(), now)) {
                    return true
                }
                var status = ctx.getStatus();
                return !(PorterStatus.PREPARING.equals(status) || PorterStatus.READY.equals(status))
            })
        }, getConnectedHandshakingTransition: function () {
            return new StateTransition(SessionStateOrder.HANDSHAKING, function (ctx, now) {
                if (!ctx.getSessionID()) {
                    return false
                }
                var status = ctx.getStatus();
                return PorterStatus.READY.equals(status)
            })
        }, getConnectedErrorTransition: function () {
            return new StateTransition(SessionStateOrder.ERROR, function (ctx, now) {
                if (!ctx.getSessionID()) {
                    return true
                }
                var status = ctx.getStatus();
                return !PorterStatus.READY.equals(status)
            })
        }, getHandshakingRunningTransition: function () {
            return new StateTransition(SessionStateOrder.RUNNING, function (ctx, now) {
                if (!ctx.getSessionID()) {
                    return false
                }
                var status = ctx.getStatus();
                if (!PorterStatus.READY.equals(status)) {
                    return false
                }
                return !!ctx.getSessionKey()
            })
        }, getHandshakingConnectedTransition: function () {
            return new StateTransition(SessionStateOrder.CONNECTED, function (ctx, now) {
                if (!ctx.getSessionID()) {
                    return false
                }
                var status = ctx.getStatus();
                if (!PorterStatus.READY.equals(status)) {
                    return false
                }
                if (!!ctx.getSessionKey()) {
                    return false
                }
                return is_state_expired(ctx.getCurrentState(), now)
            })
        }, getHandshakingErrorTransition: function () {
            return new StateTransition(SessionStateOrder.ERROR, function (ctx, now) {
                if (!ctx.getSessionID()) {
                    return true
                }
                var status = ctx.getStatus();
                return !PorterStatus.READY.equals(status)
            })
        }, getRunningDefaultTransition: function () {
            return new StateTransition(SessionStateOrder.DEFAULT, function (ctx, now) {
                var status = ctx.getStatus();
                if (!PorterStatus.READY.equals(status)) {
                    return false
                }
                var session = ctx.getSession();
                return !(session && session.isReady())
            })
        }, getRunningErrorTransition: function () {
            return new StateTransition(SessionStateOrder.ERROR, function (ctx, now) {
                var status = ctx.getStatus();
                return !PorterStatus.READY.equals(status)
            })
        }, getErrorDefaultTransition: function () {
            return new StateTransition(SessionStateOrder.DEFAULT, function (ctx, now) {
                var status = ctx.getStatus();
                return !PorterStatus.ERROR.equals(status)
            })
        }
    });
    app.network.HTTPClient = {
        get: function (url, callback) {
            var xhr = createXMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function (ev) {
                callback(ev.target, url)
            };
            xhr.send()
        }, post: function (url, headers, body, callback) {
            var xhr = createXMLHttpRequest();
            xhr.open('POST', url);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function (ev) {
                if (callback) {
                    callback(ev.target, url)
                }
            };
            if (headers) {
                setHTTPHeaders(xhr, headers)
            }
            xhr.send(body)
        }
    };
    var HTTPClient = app.network.HTTPClient;
    var createXMLHttpRequest = function () {
        try {
            return new XMLHttpRequest()
        } catch (e) {
            try {
                return new ActiveXObject('Msxml2.XMLHTTP')
            } catch (e) {
                try {
                    return new ActiveXObject('Microsoft.XMLHTTP')
                } catch (e) {
                    throw e;
                }
            }
        }
    };
    var setHTTPHeaders = function (xhr, headers) {
        var keys = Object.keys(headers);
        var name;
        for (var i = 0; i < keys.length; ++i) {
            name = keys[i]
            xhr.setRequestHeader(name, headers[name])
        }
    };
    HTTPClient.upload = function (url, data, filename, name, callback) {
        var body = http_body(data, filename, name);
        this.post(url, {'Content-Type': CONTENT_TYPE, 'Content-Length': '' + body.length}, body, callback)
    };
    HTTPClient.download = function (url, callback) {
        if (s_downloading.indexOf(url) < 0) {
            s_downloading.push(url);
            this.get(url, callback)
        }
    };
    var s_downloading = [];
    var BOUNDARY = 'BU1kUJ19yLYPqv5xoT3sbKYbHwjUu1JU7roix';
    var CONTENT_TYPE = 'multipart/form-data; boundary=' + BOUNDARY;
    var BOUNDARY_BEGIN = '--' + BOUNDARY + '\r\n' + 'Content-Disposition: form-data; name={name}; filename={filename}\r\n' + 'Content-Type: application/octet-stream\r\n\r\n';
    var BOUNDARY_END = '\r\n--' + BOUNDARY + '--';
    var http_body = function (data, filename, name) {
        var begin = BOUNDARY_BEGIN;
        begin = begin.replace('{filename}', filename);
        begin = begin.replace('{name}', name);
        begin = UTF8.encode(begin);
        var end = UTF8.encode(BOUNDARY_END);
        var size = begin.length + data.length + end.length;
        var body = new Uint8Array(size);
        body.set(begin, 0);
        body.set(data, begin.length);
        body.set(end, begin.length + data.length);
        return body
    };
    app.network.ClientSession = function (db, server) {
        BaseSession.call(this, db, server.getHost(), server.getPort());
        this.__station = server;
        this.__fsm = new StateMachine(this);
        this.__key = null;
        this.__accepted = false;
        this.__thread = null
    };
    var ClientSession = app.network.ClientSession;
    Class(ClientSession, BaseSession, null);
    Implementation(ClientSession, {
        getStation: function () {
            return this.__station
        }, getState: function () {
            var fsm = this.__fsm;
            var state = fsm.getCurrentState();
            if (state) {
                return state
            }
            return fsm.getDefaultState()
        }, setActive: function (flag, when) {
            if (!flag) {
                this.__accepted = false
            }
            return BaseSession.prototype.setActive.call(this, flag, when)
        }, isAccepted: function () {
            return this.__accepted
        }, setAccepted: function (flag) {
            this.__accepted = flag
        }, getSessionKey: function () {
            return this.__key
        }, setSessionKey: function (sessionKey) {
            this.__key = sessionKey
        }, isReady: function () {
            return this.isActive() && this.isAccepted() && this.getIdentifier() && this.getSessionKey()
        }, getConnection: function () {
            var gate = this.getGate();
            var remote = this.getRemoteAddress();
            var docker = gate.getPorter(remote, null);
            if (docker instanceof StarPorter) {
                return docker.getConnection()
            }
            return null
        }, getConnectionStateMachine: function () {
            var conn = this.getConnection();
            if (conn instanceof BaseConnection) {
                return conn.getStateMachine()
            }
            return null
        }, pause: function () {
            var sess_machine = this.__fsm;
            var conn_machine = this.getConnectionStateMachine();
            sess_machine.pause();
            conn_machine.pause()
        }, resume: function () {
            var sess_machine = this.__fsm;
            var conn_machine = this.getConnectionStateMachine();
            conn_machine.resume();
            sess_machine.resume()
        }, setup: function () {
            this.setActive(true, 0);
            return BaseSession.prototype.setup.call(this)
        }, finish: function () {
            this.setActive(false, 0);
            return BaseSession.prototype.finish.call(this)
        }, onPorterStatusChanged: function (previous, current, docker) {
            if (!current || PorterStatus.ERROR.equals(current)) {
                this.setActive(false, 0)
            } else if (PorterStatus.READY.equals(current)) {
                this.setActive(true, 0)
            }
        }, onPorterReceived: function (arrival, docker) {
            var all_responses = [];
            var messenger = this.getMessenger();
            var packages = get_data_packages(arrival);
            var pack;
            var responses;
            var res;
            for (var i = 0; i < packages.length; ++i) {
                pack = packages[i];
                try {
                    responses = messenger.processPackage(pack);
                    if (!responses || responses.length === 0) {
                        continue
                    }
                    for (var j = 0; j < responses.length; ++j) {
                        res = responses[j];
                        if (!res || res.length === 0) {
                            continue
                        }
                        all_responses.push(res)
                    }
                } catch (e) {
                    Log.error('ClientSession::onPorterReceived()', e, pack)
                }
            }
            var gate = this.getGate();
            var source = docker.getRemoteAddress();
            var destination = docker.getLocalAddress();
            for (var k = 0; i < all_responses.length; ++k) {
                gate.sendResponse(all_responses[k], arrival, source, destination)
            }
        }
    });
    ClientSession.prototype.force_stop = function () {
        var thread = this.__thread;
        if (thread) {
            this.__thread = null;
            thread.stop()
        }
    };
    ClientSession.prototype.start = function (delegate) {
        this.force_stop();
        var thread = new Thread(this);
        thread.start();
        this.__thread = thread;
        var fsm = this.__fsm;
        fsm.setDelegate(delegate);
        fsm.start()
    };
    ClientSession.prototype.stop = function () {
        BaseSession.prototype.stop.call(this);
        this.force_stop();
        var fsm = this.__fsm;
        fsm.stop()
    };
    var get_data_packages = function (arrival) {
        var payload = arrival.getPayload();
        if (!payload || payload.length === 0) {
            return []
        } else if (payload[0] === jsonStart) {
            return split_packages(payload)
        } else {
            return [payload]
        }
    };
    var jsonStart = '{'.charCodeAt(0);
    var split_packages = function (payload) {
        var array = [];
        var i, j = 0;
        for (i = 1; i < payload.length; ++i) {
            if (payload[i] !== NEW_LINE) {
                continue
            }
            if (i > j) {
                array.push(payload.slice(j, i))
            }
            j = i + 1
        }
        if (i > j) {
            array.push(payload.slice(j, i))
        }
        return array
    };
    var NEW_LINE = '\n'.charCodeAt(0);
    app.cpu.LoginCommandProcessor = function (facebook, messenger) {
        BaseCommandProcessor.call(this, facebook, messenger)
    };
    var LoginCommandProcessor = app.cpu.LoginCommandProcessor;
    Class(LoginCommandProcessor, BaseCommandProcessor, null);
    Implementation(LoginCommandProcessor, {
        getDatabase: function () {
            var manager = this.getMessenger();
            var session = manager.getSession();
            return session.getDatabase()
        }, processContent: function (content, rMsg) {
            var sender = content.getIdentifier();
            var db = this.getDatabase();
            if (db.saveLoginCommandMessage(sender, content, rMsg)) {
                Log.info('save login command for user', sender)
            } else {
                Log.error('failed to save login command', sender, content)
            }
            return []
        }
    });
    app.cpu.ReceiptCommandProcessor = function (facebook, messenger) {
        BaseCommandProcessor.call(this, facebook, messenger)
    };
    var ReceiptCommandProcessor = app.cpu.ReceiptCommandProcessor;
    Class(ReceiptCommandProcessor, BaseCommandProcessor, null);
    ReceiptCommandProcessor.prototype.processContent = function (content, rMsg) {
        if (Interface.conforms(content, ReceiptCommand)) {
            var envelope = rMsg.getEnvelope();
            var groupManager = SharedGroupManager.getInstance();
            var delegate = groupManager.getGroupDelegate();
            delegate.updateRespondTime(content, envelope)
        }
        return []
    };
    app.cpu.HandshakeCommandProcessor = function (facebook, messenger) {
        BaseCommandProcessor.call(this, facebook, messenger)
    };
    var HandshakeCommandProcessor = app.cpu.HandshakeCommandProcessor
    Class(HandshakeCommandProcessor, BaseCommandProcessor, null);
    Implementation(HandshakeCommandProcessor, {
        processContent: function (content, rMsg) {
            var messenger = this.getMessenger();
            var session = messenger.getSession();
            var station = session.getStation();
            var oid = station.getIdentifier();
            var sender = rMsg.getSender();
            if (!oid || oid.isBroadcast()) {
                station.setIdentifier(sender);
                Log.info('update station ID', oid, sender)
            }
            var title = content.getTitle();
            var newKey = content.getSessionKey();
            var oldKey = session.getSessionKey();
            if (title === 'DIM?') {
                if (!oldKey) {
                    Log.info('[DIM] handshake with session key', newKey);
                    messenger.handshake(newKey)
                } else if (oldKey === newKey) {
                    Log.warning('[DIM] handshake response duplicated', newKey);
                    messenger.handshake(newKey)
                } else {
                    Log.warning('[DIM] handshake again', oldKey, newKey);
                    session.setSessionKey(null)
                }
            } else if (title === 'DIM!') {
                if (!oldKey) {
                    Log.info('[DIM] handshake success with session key', newKey);
                    session.setSessionKey(newKey)
                } else if (oldKey === newKey) {
                    Log.warning('[DIM] handshake success duplicated', newKey)
                } else {
                    Log.error('[DIM] handshake again', oldKey, newKey);
                    session.setSessionKey(null)
                }
            } else {
                Log.error('Handshake from other user?', sender, content)
            }
            return []
        }
    });
    app.cpu.HistoryCommandProcessor = function (facebook, messenger) {
        BaseCommandProcessor.call(this, facebook, messenger);
        this.__delegate = this.createGroupDelegate();
        this.__helper = this.createGroupHelper();
        this.__builder = this.createGroupBuilder()
    };
    var HistoryCommandProcessor = app.cpu.HistoryCommandProcessor
    Class(HistoryCommandProcessor, BaseCommandProcessor, null);
    HistoryCommandProcessor.prototype.createGroupDelegate = function () {
        var facebook = this.getFacebook();
        var messenger = this.getMessenger();
        return new GroupDelegate(facebook, messenger)
    };
    HistoryCommandProcessor.prototype.createGroupHelper = function () {
        var delegate = this.getGroupDelegate();
        return new GroupCommandHelper(delegate)
    };
    HistoryCommandProcessor.prototype.createGroupBuilder = function () {
        var delegate = this.getGroupDelegate();
        return new GroupHistoryBuilder(delegate)
    };
    HistoryCommandProcessor.prototype.processContent = function (content, rMsg) {
        var text = 'Command not support.';
        return this.respondReceipt(text, rMsg.getEnvelope(), content, {
            'template': 'History command (name: ${command}) not support yet!',
            'replacements': {'command': content.getCmd()}
        })
    };
    HistoryCommandProcessor.prototype.getGroupDelegate = function () {
        return this.__delegate
    };
    HistoryCommandProcessor.prototype.getGroupHelper = function () {
        return this.__helper
    };
    HistoryCommandProcessor.prototype.getGroupBuilder = function () {
        return this.__builder
    };
    app.cpu.GroupCommandProcessor = function (facebook, messenger) {
        HistoryCommandProcessor.call(this, facebook, messenger)
    };
    var GroupCommandProcessor = app.cpu.GroupCommandProcessor;
    Class(GroupCommandProcessor, HistoryCommandProcessor, null);
    Implementation(GroupCommandProcessor, {
        getOwner: function (group) {
            var delegate = this.getGroupDelegate();
            return delegate.getOwner(group)
        }, getAssistants: function (group) {
            var delegate = this.getGroupDelegate();
            return delegate.getAssistants(group)
        }, getAdministrators: function (group) {
            var delegate = this.getGroupDelegate();
            return delegate.getAdministrators(group)
        }, saveAdministrators: function (admins, group) {
            var delegate = this.getGroupDelegate();
            return delegate.saveAdministrators(admins, group)
        }, getMembers: function (group) {
            var delegate = this.getGroupDelegate();
            return delegate.getMembers(group)
        }, saveMembers: function (members, group) {
            var delegate = this.getGroupDelegate();
            return delegate.saveMembers(members, group)
        }, saveGroupHistory: function (content, rMsg, group) {
            var delegate = this.getGroupHelper();
            return delegate.saveGroupHistory(content, rMsg, group)
        }, processContent: function (content, rMsg) {
            var text = 'Command not support.';
            return this.respondReceipt(text, rMsg.getEnvelope(), content, {
                'template': 'Group command (name: ${command}) not support yet!',
                'replacements': {'command': content.getCmd()}
            })
        }, checkCommandExpired: function (content, rMsg) {
            var group = content.getGroup();
            if (!group) {
                Log.error('group command error', content);
                return [null, null]
            }
            var errors;
            var expired = this.getGroupHelper().isCommandExpired(content);
            if (expired) {
                var text = 'Command expired.';
                errors = this.respondReceipt(text, rMsg.getEnvelope(), content, {
                    'template': 'Group command expired: ${cmd}, group: ${gid}',
                    'replacements': {'cmd': content.getCmd(), 'gid': group.toString()}
                });
                group = null
            } else {
                errors = null
            }
            return [group, errors]
        }, checkCommandMembers: function (content, rMsg) {
            var group = content.getGroup();
            if (!group) {
                Log.error('group command error', content);
                return [[], null]
            }
            var errors;
            var members = this.getGroupHelper().getMembersFromCommand(content);
            if (members.length === 0) {
                var text = 'Command error.';
                errors = this.respondReceipt(text, rMsg.getEnvelope(), content, {
                    'template': 'Group members empty: ${gid}',
                    'replacements': {'gid': group.toString()}
                })
            } else {
                errors = null
            }
            return [members, errors]
        }, checkGroupMembers: function (content, rMsg) {
            var group = content.getGroup();
            if (!group) {
                Log.error('group command error', content);
                return [null, [], null]
            }
            var errors;
            var owner = this.getOwner(group);
            var members = this.getMembers(group);
            if (!owner || members.length === 0) {
                var text = 'Group empty.';
                errors = this.respondReceipt(text, rMsg.getEnvelope(), content, {
                    'template': 'Group empty: ${gid}',
                    'replacements': {'gid': group.toString()}
                })
            } else {
                errors = null
            }
            return [owner, members, errors]
        }, sendGroupHistories: function (group, receiver) {
            var messages = this.getGroupBuilder().buildGroupHistories(group);
            if (messages.length === 0) {
                Log.warning('failed to build history for group', group);
                return false
            }
            var transceiver = this.getMessenger();
            var content = ForwardContent.create(messages);
            var pair = transceiver.sendContent(content, null, receiver, 1);
            return pair && pair[1]
        }
    });
    app.cpu.InviteCommandProcessor = function (facebook, messenger) {
        GroupCommandProcessor.call(this, facebook, messenger)
    };
    var InviteCommandProcessor = app.cpu.InviteCommandProcessor
    Class(InviteCommandProcessor, GroupCommandProcessor, null);
    Implementation(InviteCommandProcessor, {
        processContent: function (content, rMsg) {
            var errors;
            var pair = this.checkCommandExpired(content, rMsg);
            var group = pair[0];
            if (!group) {
                errors = pair[1];
                return !errors ? [] : errors
            }
            var pair1 = this.checkCommandMembers(content, rMsg);
            var inviteList = pair1[0];
            if (!inviteList || inviteList.length === 0) {
                errors = pair[1];
                return !errors ? [] : errors
            }
            var trip = this.checkGroupMembers(content, rMsg);
            var owner = trip[0];
            var members = trip[1];
            if (!owner || !members || members.length === 0) {
                errors = pair[2];
                return !errors ? [] : errors
            }
            var text;
            var sender = rMsg.getSender();
            var admins = this.getAdministrators(group);
            var isOwner = owner.equals(sender);
            var isAdmin = admins.indexOf(sender) >= 0;
            var isMember = members.indexOf(sender) >= 0;
            if (!isMember) {
                text = 'Permission denied.';
                return this.respondReceipt(text, rMsg.getEnvelope(), content, {
                    'template': 'Not allowed to invite member into group: ${gid}',
                    'replacements': {'gid': group.toString()}
                })
            }
            var canReset = isOwner || isAdmin;
            var memPair = InviteCommandProcessor.calculateInvited(members, inviteList);
            var newMembers = memPair[0];
            var addedList = memPair[1];
            if (!addedList || addedList.length === 0) {
                var facebook = this.getFacebook();
                var user = facebook.getCurrentUser();
                if (!canReset && user.getIdentifier().equals(owner)) {
                    var ok = this.sendGroupHistories(group, sender);
                    if (!ok) {
                        Log.error('failed to send history for group', group, sender)
                    }
                }
            } else if (!this.saveGroupHistory(content, rMsg, group)) {
                Log.error('failed to save "invite" command', group)
            } else if (!canReset) {
            } else if (this.saveMembers(newMembers, group)) {
                Log.warning('invited by administrator', sender, group);
                content.setValue('added', ID.revert(addedList))
            } else {
                Log.error('failed to save members for group', group)
            }
            return []
        }
    });
    InviteCommandProcessor.calculateInvited = function (members, inviteList) {
        var newMembers = members.slice();
        var addedList = [];
        var item;
        for (var i = 0; i < inviteList.length; ++i) {
            item = inviteList[i];
            if (newMembers.indexOf(item) >= 0) {
                continue
            }
            newMembers.push(item);
            addedList.push(item)
        }
        return [newMembers, addedList]
    };
    app.cpu.ExpelCommandProcessor = function (facebook, messenger) {
        GroupCommandProcessor.call(this, facebook, messenger)
    };
    var ExpelCommandProcessor = app.cpu.ExpelCommandProcessor;
    Class(ExpelCommandProcessor, GroupCommandProcessor, null);
    Implementation(ExpelCommandProcessor, {
        processContent: function (content, rMsg) {
            return []
        }
    });
    app.cpu.QuitCommandProcessor = function (facebook, messenger) {
        GroupCommandProcessor.call(this, facebook, messenger)
    };
    var QuitCommandProcessor = app.cpu.QuitCommandProcessor;
    Class(QuitCommandProcessor, GroupCommandProcessor, null);
    Implementation(QuitCommandProcessor, {
        processContent: function (content, rMsg) {
            var errors;
            var pair = this.checkCommandExpired(content, rMsg);
            var group = pair[0];
            if (!group) {
                errors = pair[1];
                return errors ? errors : []
            }
            var trip = this.checkGroupMembers(content, rMsg);
            var owner = trip[0];
            var members = trip[1];
            if (!owner || !members || members.length === 0) {
                errors = pair[2];
                return errors ? errors : []
            }
            var text;
            var sender = rMsg.getSender();
            var admins = this.getAdministrators(group);
            var isOwner = owner.equals(sender);
            var isAdmin = admins.indexOf(sender) >= 0;
            var isMember = members.indexOf(sender) >= 0;
            if (isOwner) {
                text = 'Permission denied.';
                return this.respondReceipt(text, rMsg.getEnvelope(), content, {
                    'template': 'Owner cannot quit from group: ${gid}',
                    'replacements': {'gid': group.toString()}
                })
            }
            if (isAdmin) {
                text = 'Permission denied.';
                return this.respondReceipt(text, rMsg.getEnvelope(), content, {
                    'template': 'Administrator cannot quit from group: ${gid}',
                    'replacements': {'gid': group.toString()}
                })
            }
            if (!isMember) {
            } else if (!this.saveGroupHistory(content, rMsg, group)) {
                Log.error('failed to save "quit" command for group', group)
            } else {
                var newMembers = members.slice();
                Arrays.remove(newMembers, sender);
                if (this.saveMembers(newMembers, group)) {
                    content.setValue('removed', [sender.toString()])
                } else {
                    Log.error('failed to save members for group', group)
                }
            }
            return []
        }
    });
    app.cpu.QueryCommandProcessor = function (facebook, messenger) {
        GroupCommandProcessor.call(this, facebook, messenger)
    };
    var QueryCommandProcessor = app.cpu.QueryCommandProcessor
    Class(QueryCommandProcessor, GroupCommandProcessor, null);
    Implementation(QueryCommandProcessor, {
        processContent: function (content, rMsg) {
            var errors;
            var pair = this.checkCommandExpired(content, rMsg);
            var group = pair[0];
            if (!group) {
                errors = pair[1];
                return !errors ? [] : errors
            }
            var trip = this.checkGroupMembers(content, rMsg);
            var owner = trip[0];
            var members = trip[1];
            if (!(owner && members && members.length > 0)) {
                errors = pair[2];
                return !errors ? [] : errors
            }
            var text;
            var sender = rMsg.getSender();
            var bots = this.getAssistants(group);
            var isMember = members.indexOf(sender) >= 0;
            var isBot = bots.indexOf(sender) >= 0;
            var canQuery = isMember || isBot;
            if (!canQuery) {
                text = 'Permission denied.';
                return this.respondReceipt(text, rMsg.getEnvelope(), content, {
                    'template': 'Not allowed to query members of group: ${gid}',
                    'replacements': {'gid': group.toString()}
                })
            }
            var facebook = this.getFacebook();
            var archivist = facebook.getArchivist();
            var queryTime = content.getDateTime('last_time', null);
            if (queryTime) {
                var lastTime = archivist.getLastGroupHistoryTime(group);
                if (!lastTime) {
                    Log.error('group history error', group)
                } else if (lastTime.getTime() <= queryTime.getTime()) {
                    text = 'Group history not updated.';
                    return this.respondReceipt(text, rMsg.getEnvelope(), content, {
                        'template': 'Group history not updated: ${gid}, last time: ${time}',
                        'replacements': {'gid': group.toString(), 'time': lastTime.getTime() / 1000.0}
                    })
                }
            }
            var ok = this.sendGroupHistories(group, sender);
            if (!ok) {
                Log.error('failed to send history for group', group, sender)
            }
            return []
        }
    });
    app.cpu.ResetCommandProcessor = function (facebook, messenger) {
        GroupCommandProcessor.call(this, facebook, messenger)
    };
    var ResetCommandProcessor = app.cpu.ResetCommandProcessor;
    Class(ResetCommandProcessor, GroupCommandProcessor, null);
    Implementation(ResetCommandProcessor, {
        processContent: function (content, rMsg) {
            var errors;
            var pair = this.checkCommandExpired(content, rMsg);
            var group = pair[0];
            if (!group) {
                errors = pair[1];
                return errors ? errors : []
            }
            var pair1 = this.checkCommandMembers(content, rMsg);
            var newMembers = pair1[0];
            if (!newMembers || newMembers.length === 0) {
                errors = pair[1];
                return errors ? errors : []
            }
            var trip = this.checkGroupMembers(content, rMsg);
            var owner = trip[0];
            var members = trip[1];
            if (!(owner && members && members.length > 0)) {
                errors = pair[2];
                return errors ? errors : []
            }
            var text;
            var sender = rMsg.getSender();
            var admins = this.getAdministrators(group);
            var isOwner = owner.equals(sender);
            var isAdmin = admins.indexOf(sender) >= 0;
            var canReset = isOwner || isAdmin;
            if (!canReset) {
                text = 'Permission denied.';
                return this.respondReceipt(text, rMsg.getEnvelope(), content, {
                    'template': 'Not allowed to reset members of group: ${gid}',
                    'replacements': {'gid': group.toString()}
                })
            }
            if (!newMembers[0].equals(owner)) {
                text = 'Permission denied.';
                return this.respondReceipt(text, rMsg.getEnvelope(), content, {
                    'template': 'Owner must be the first member of group: ${gid}',
                    'replacements': {'gid': group.toString()}
                })
            }
            var expelAdmin = false;
            for (var i = 0; i < admins.length; ++i) {
                if (newMembers.indexOf(admins[i]) < 0) {
                    expelAdmin = true;
                    break
                }
            }
            if (expelAdmin) {
                text = 'Permission denied.';
                return this.respondReceipt(text, rMsg.getEnvelope(), content, {
                    'template': 'Not allowed to expel administrator of group: ${gid}',
                    'replacements': {'gid': group.toString()}
                })
            }
            var memPair = ResetCommandProcessor.calculateReset(members, newMembers);
            var addList = memPair[0];
            var removeList = memPair[1];
            if (!this.saveGroupHistory(content, rMsg, group)) {
                Log.error('failed to save "reset" command for group', group)
            } else if (addList.length === 0 && removeList.length === 0) {
            } else if (this.saveMembers(newMembers, group)) {
                Log.info('new members saved in group', group);
                if (addList.length > 0) {
                    content.setValue('added', ID.revert(addList))
                }
                if (removeList.length > 0) {
                    content.setValue('removed', ID.revert(removeList))
                }
            } else {
                Log.error('failed to save members in group', group)
            }
            return []
        }
    });
    ResetCommandProcessor.calculateReset = function (oldMembers, newMembers) {
        var addList = [];
        var removeList = [];
        var item;
        for (var i = 0; i < newMembers.length; ++i) {
            item = newMembers[i];
            if (oldMembers.indexOf(item) < 0) {
                addList.push(item)
            }
        }
        for (var j = 0; j < oldMembers.length; ++j) {
            item = oldMembers[j];
            if (newMembers.indexOf(item) < 0) {
                removeList.push(item)
            }
        }
        return [addList, removeList]
    };
    app.cpu.ClientContentProcessorCreator = function (facebook, messenger) {
        BaseContentProcessorCreator.call(this, facebook, messenger)
    };
    var ClientContentProcessorCreator = app.cpu.ClientContentProcessorCreator;
    Class(ClientContentProcessorCreator, BaseContentProcessorCreator, null);
    Implementation(ClientContentProcessorCreator, {
        createCustomizedContentProcessor: function (facebook, messenger) {
            var cpu = new AppCustomizedProcessor(facebook, messenger);
            cpu.setHandler(GroupHistory.APP, GroupHistory.MOD, new GroupHistoryHandler(facebook, messenger));
            return cpu
        }, createContentProcessor: function (type) {
            var facebook = this.getFacebook();
            var messenger = this.getMessenger();
            switch (type) {
                case ContentType.APPLICATION:
                case'application':
                case ContentType.CUSTOMIZED:
                case'customized':
                    return this.createCustomizedContentProcessor(facebook, messenger);
                case ContentType.HISTORY:
                case'history':
                    return new HistoryCommandProcessor(facebook, messenger)
            }
            return BaseContentProcessorCreator.prototype.createContentProcessor.call(this, type)
        }, createCommandProcessor: function (type, cmd) {
            var facebook = this.getFacebook();
            var messenger = this.getMessenger();
            switch (cmd) {
                case Command.HANDSHAKE:
                    return new HandshakeCommandProcessor(facebook, messenger);
                case Command.LOGIN:
                    return new LoginCommandProcessor(facebook, messenger);
                case Command.RECEIPT:
                    return new ReceiptCommandProcessor(facebook, messenger);
                case'group':
                    return new GroupCommandProcessor(facebook, messenger);
                case GroupCommand.INVITE:
                    return new InviteCommandProcessor(facebook, messenger);
                case GroupCommand.EXPEL:
                    return new ExpelCommandProcessor(facebook, messenger);
                case GroupCommand.QUIT:
                    return new QuitCommandProcessor(facebook, messenger);
                case GroupCommand.QUERY:
                    return new QueryCommandProcessor(facebook, messenger);
                case GroupCommand.RESET:
                    return new ResetCommandProcessor(facebook, messenger)
            }
            return BaseContentProcessorCreator.prototype.createCommandProcessor.call(this, type, cmd)
        }
    });
    app.ClientChecker = function (facebook, database) {
        EntityChecker.call(this, database);
        this.__facebook = facebook;
        this.__messenger = null
    };
    var ClientChecker = app.ClientChecker;
    Class(ClientChecker, EntityChecker, null);
    ClientChecker.prototype.getFacebook = function () {
        return this.__facebook
    };
    ClientChecker.prototype.getMessenger = function () {
        return this.__messenger
    };
    ClientChecker.prototype.setMessenger = function (transceiver) {
        this.__messenger = transceiver
    };
    ClientChecker.prototype.queryMeta = function (identifier) {
        if (!this.isMetaQueryExpired(identifier)) {
            Log.info('meta query not expired yet:', identifier);
            return false
        }
        var messenger = this.getMessenger();
        Log.info('querying meta', identifier);
        var content = MetaCommand.query(identifier);
        var pair = messenger.sendContent(content, null, Station.ANY, 1);
        return pair && pair[1]
    };
    ClientChecker.prototype.queryDocuments = function (identifier, docs) {
        if (!this.isDocumentQueryExpired(identifier)) {
            Log.info('document query not expired yet:', identifier);
            return false
        }
        var messenger = this.getMessenger();
        var lastTime = this.getLastDocumentTime(identifier, docs);
        Log.info('querying documents', identifier, lastTime);
        var content = DocumentCommand.query(identifier, lastTime);
        var pair = messenger.sendContent(content, null, Station.ANY, 1);
        return pair && pair[1]
    };
    ClientChecker.prototype.queryMembers = function (group, members) {
        var facebook = this.getFacebook();
        var user = facebook.getCurrentUser();
        if (!user) {
            Log.error('failed to get current user');
            return false
        }
        if (!this.isMembersQueryExpired(group)) {
            Log.info('members query not expired yet:', group);
            return false
        }
        var me = user.getIdentifier();
        var lastTime = this.getLastGroupHistoryTime(group);
        Log.info('querying members for group', group, lastTime);
        var content = GroupCommand.query(group, lastTime);
        content.setDateTime('last_time', lastTime);
        var ok;
        ok = this.queryMembersFromAssistants(content, me, group);
        if (ok) {
            return true
        }
        ok = this.queryMembersFromAdministrators(content, me, group);
        if (ok) {
            return true
        }
        ok = this.queryMembersFromOwner(content, me, group);
        if (ok) {
            return true
        }
        var pair = null;
        var lastMember = this.getLastActiveMember(group);
        if (lastMember) {
            Log.info('querying members from last member', lastMember, group);
            var messenger = this.getMessenger();
            pair = messenger.sendContent(content, me, lastMember, 1)
        }
        return pair && pair[1]
    };
    ClientChecker.prototype.queryMembersFromAssistants = function (content, sender, group) {
        var facebook = this.getFacebook();
        var bots = facebook.getAssistants(group);
        if (!bots || bots.length === 0) {
            return false
        }
        var messenger = this.getMessenger();
        Log.info('querying members from bots', bots, group);
        var success = 0;
        var pair;
        var receiver;
        for (var i = 0; i < bots.length; ++i) {
            receiver = bots[i];
            if (receiver.equals(sender)) {
                continue
            }
            pair = messenger.sendContent(content, sender, receiver, 1);
            if (pair && pair[1]) {
                success += 1
            }
        }
        if (success === 0) {
            return false
        }
        var lastMember = this.getLastActiveMember(group);
        if (!lastMember || bots.indexOf(lastMember) >= 0) {
        } else {
            Log.info('querying members from last member', lastMember, group);
            messenger.sendContent(content, sender, lastMember, 1)
        }
        return true
    };
    ClientChecker.prototype.queryMembersFromAdministrators = function (content, sender, group) {
        var barrack = this.getFacebook();
        var admins = barrack.getAdministrators(group);
        if (!admins || admins.length === 0) {
            return false
        }
        var messenger = this.getMessenger();
        Log.info('querying members from admins', admins, group);
        var success = 0;
        var pair;
        var receiver;
        for (var i = 0; i < admins.length; ++i) {
            receiver = admins[i];
            if (sender.equals(receiver)) {
                continue
            }
            pair = messenger.sendContent(content, sender, receiver, 1);
            if (!(pair && pair[1])) {
            } else {
                success += 1
            }
        }
        if (success <= 0) {
            return false
        }
        var lastMember = this.getLastActiveMember(group);
        if (!lastMember || admins.indexOf(lastMember) >= 0) {
        } else {
            Log.info('querying members from last member', lastMember, group);
            messenger.sendContent(content, sender, lastMember, 1)
        }
        return true
    };
    ClientChecker.prototype.queryMembersFromOwner = function (content, sender, group) {
        var facebook = this.getFacebook();
        var owner = facebook.getOwner(group);
        if (!owner) {
            return false
        } else if (owner.equals(sender)) {
            return false
        }
        var messenger = this.getMessenger();
        Log.info('querying members from owner', owner, group);
        var pair = messenger.sendContent(content, sender, owner, 1);
        if (!(pair && pair[1])) {
            return false
        }
        var lastMember = this.getLastActiveMember(group);
        if (!lastMember || lastMember.equals(owner)) {
        } else {
            Log.info('querying members from last member', lastMember, group);
            messenger.sendContent(content, sender, lastMember, 1)
        }
        return true
    };
    ClientChecker.prototype.sendVisa = function (visa, receiver, updated) {
        var me = visa.getIdentifier();
        if (me.equals(receiver)) {
            return false
        }
        if (!this.isDocumentResponseExpired(receiver, updated)) {
            return false
        }
        Log.info('push visa document', me, receiver);
        var content = DocumentCommand.response(me, null, visa);
        var messenger = this.getMessenger();
        var pair = messenger.sendContent(content, me, receiver, 1);
        return pair && pair[1]
    };
    app.ClientArchivist = function (facebook, database) {
        CommonArchivist.call(this, facebook, database)
    };
    var ClientArchivist = app.ClientArchivist;
    Class(ClientArchivist, CommonArchivist, null);
    ClientArchivist.prototype.cacheGroup = function (group) {
        var man = SharedGroupManager.getInstance();
        group.setDataSource(man);
        CommonArchivist.prototype.cacheGroup.call(this, group)
    };
    ClientArchivist.prototype.saveDocument = function (doc) {
        var ok = CommonArchivist.prototype.saveDocument.call(this, doc);
        if (ok && Interface.conforms(doc, Bulletin)) {
            var array = doc.getProperty('administrators');
            if (array instanceof Array) {
                var group = doc.getIdentifier();
                var admins = ID.convert(array);
                var db = this.getDatabase();
                ok = db.saveAdministrators(admins, group)
            }
        }
        return ok
    };
    app.ClientFacebook = function (database) {
        CommonFacebook.call(this, database)
    };
    var ClientFacebook = app.ClientFacebook;
    Class(ClientFacebook, CommonFacebook, null);
    ClientFacebook.prototype.getFounder = function (group) {
        if (group.isBroadcast()) {
            return BroadcastUtils.getBroadcastFounder(group)
        }
        var doc = this.getBulletin(group);
        if (!doc) {
            return null
        }
        var db = this.getDatabase();
        var user = db.getFounder(group);
        if (user) {
            return user
        }
        return doc.getFounder()
    };
    ClientFacebook.prototype.getOwner = function (group) {
        if (group.isBroadcast()) {
            return BroadcastUtils.getBroadcastOwner(group)
        }
        var doc = this.getBulletin(group);
        if (!doc) {
            return null
        }
        var db = this.getDatabase();
        var user = db.getOwner(group);
        if (user) {
            return user
        }
        if (EntityType.GROUP === group.getType()) {
            user = db.getFounder(group);
            if (!user) {
                user = doc.getFounder()
            }
        }
        return user
    };
    ClientFacebook.prototype.getMembers = function (group) {
        var owner = this.getOwner(group);
        if (!owner) {
            return []
        }
        var db = this.getDatabase();
        var members = db.getMembers(group);
        var checker = this.getEntityChecker();
        if (checker) {
            checker.checkMembers(group, members)
        }
        if (!members || members.length === 0) {
            members = [owner]
        }
        return members
    };
    ClientFacebook.prototype.getAssistants = function (group) {
        var doc = this.getBulletin(group);
        if (!doc) {
            return []
        }
        var db = this.getDatabase();
        var bots = db.getAssistants(group);
        if (bots && bots.length > 0) {
            return bots
        }
        bots = doc.getAssistants();
        return !bots ? [] : bots
    };
    ClientFacebook.prototype.getAdministrators = function (group) {
        var doc = this.getBulletin(group);
        if (!doc) {
            return []
        }
        var db = this.getDatabase();
        return db.getAdministrators(group)
    };
    ClientFacebook.prototype.saveAdministrators = function (admins, group) {
        var db = this.getDatabase();
        return db.saveAdministrators(admins, group)
    };
    ClientFacebook.prototype.saveMembers = function (newMembers, group) {
        var db = this.getDatabase();
        return db.saveMembers(newMembers, group)
    };
    app.ClientMessenger = function (session, facebook, mdb) {
        CommonMessenger.call(this, session, facebook, mdb)
    };
    var ClientMessenger = app.ClientMessenger;
    Class(ClientMessenger, CommonMessenger, null);
    ClientMessenger.prototype.deserializeMessage = function (data) {
        var msg = CommonMessenger.prototype.deserializeMessage.call(this, data);
        if (msg && this.checkMessageDuplicated(msg)) {
            msg = null
        }
        return msg
    };
    ClientMessenger.prototype.checkMessageDuplicated = function (rMsg) {
        Log.warning('TODO: check duplicated message')
    };
    ClientMessenger.prototype.processReliableMessage = function (rMsg) {
        var responses = CommonMessenger.prototype.processReliableMessage.call(this, rMsg);
        if (!responses || responses.length === 0) {
            if (this.needsReceipt(rMsg)) {
                var res = this.buildReceipt(rMsg.getEnvelope());
                if (res) {
                    responses = [res]
                }
            }
        }
        return responses
    };
    ClientMessenger.prototype.buildReceipt = function (originalEnvelope) {
        var facebook = this.getFacebook();
        var user = !facebook ? null : facebook.getCurrentUser();
        if (!user) {
            Log.error('failed to get current user');
            return null
        }
        var me = user.getIdentifier();
        var to = originalEnvelope.getSender();
        var text = 'Message received.';
        var res = ReceiptCommand.create(text, originalEnvelope, null);
        var env = Envelope.create(me, to, null);
        var iMsg = InstantMessage.create(env, res);
        var sMsg = this.encryptMessage(iMsg);
        if (!sMsg) {
            Log.error('failed to encrypt message', user, originalEnvelope.getSender());
            return null
        }
        var rMsg = this.signMessage(sMsg);
        if (!rMsg) {
            Log.error('failed to sign message', user, originalEnvelope.getSender())
        }
        return rMsg
    };
    ClientMessenger.prototype.needsReceipt = function (rMsg) {
        if (ContentType.COMMAND === rMsg.getType()) {
            return false
        }
        var sender = rMsg.getSender();
        if (!EntityType.USER === sender.getType()) {
            return false
        }
        return true
    };
    ClientMessenger.prototype.sendInstantMessage = function (iMsg, priority) {
        var session = this.getSession();
        if (session && session.isReady()) {
        } else {
            var content = iMsg.getContent();
            if (!Interface.conforms(content, Command)) {
                Log.warning('not handshake yet, suspend message', content, iMsg);
                return null
            } else if (content.getCmd() === Command.HANDSHAKE) {
                iMsg.setValue('pass', 'handshaking')
            } else {
                Log.warning('not handshake yet, drop command', content, iMsg);
                return null
            }
        }
        return CommonMessenger.prototype.sendInstantMessage.call(this, iMsg, priority)
    };
    ClientMessenger.prototype.sendReliableMessage = function (rMsg, priority) {
        var passport = rMsg.removeValue('pass');
        var session = this.getSession();
        if (session && session.isReady()) {
        } else if (passport === 'handshaking') {
        } else {
            Log.error('not handshake yet, suspend message', rMsg);
            return false
        }
        return CommonMessenger.prototype.sendReliableMessage.call(this, rMsg, priority)
    };
    ClientMessenger.prototype.handshake = function (sessionKey) {
        var session = this.getSession();
        var station = session.getStation();
        var sid = station.getIdentifier();
        var content;
        if (sessionKey) {
            content = HandshakeCommand.restart(sessionKey);
            this.sendContent(content, null, sid, -1)
        } else {
            var facebook = this.getFacebook();
            var user = facebook.getCurrentUser();
            var me = user.getIdentifier();
            var meta = user.getMeta();
            var visa = user.getVisa();
            var env = Envelope.create(me, sid, null);
            content = HandshakeCommand.start();
            content.setGroup(Station.EVERY);
            var iMsg = InstantMessage.create(env, content);
            MessageUtils.setMeta(meta, iMsg);
            MessageUtils.setVisa(visa, iMsg);
            this.sendInstantMessage(iMsg, -1)
        }
    };
    ClientMessenger.prototype.handshakeSuccess = function () {
        Log.info('handshake success, change session accepted');
        var session = this.getSession();
        session.setAccepted(true);
        this.broadcastDocuments()
    };
    ClientMessenger.prototype.broadcastDocuments = function (updated) {
        var facebook = this.getFacebook();
        var user = !facebook ? null : facebook.getCurrentUser();
        var visa = !user ? null : user.getVisa();
        if (!visa) {
            Log.error('visa not found', user);
            return
        }
        var checker = facebook.getEntityChecker();
        if (!checker) {
            Log.error('entity checker not found');
            return
        }
        var me = user.getIdentifier();
        var contacts = facebook.getContacts(me);
        for (var i = 0; i < contacts.length; ++i) {
            checker.sendVisa(visa, contacts[i], updated)
        }
        checker.sendVisa(visa, ID.EVERYONE, updated)
    };
    ClientMessenger.prototype.broadcastLogin = function (sender, userAgent) {
        var session = this.getSession();
        var station = session.getStation();
        var content = LoginCommand.create(sender);
        content.setAgent(userAgent);
        content.setStation(station);
        this.sendContent(content, sender, ID.EVERYONE, 1)
    };
    ClientMessenger.prototype.reportOnline = function (sender) {
        var content = ReportCommand.create(ReportCommand.ONLINE);
        this.sendContent(content, sender, Station.ANY, 1)
    };
    ClientMessenger.prototype.reportOffline = function (sender) {
        var content = ReportCommand.create(ReportCommand.OFFLINE);
        this.sendContent(content, sender, Station.ANY, 1)
    };
    app.ClientMessagePacker = function (facebook, messenger) {
        CommonPacker.call(this, facebook, messenger)
    };
    var ClientMessagePacker = app.ClientMessagePacker;
    Class(ClientMessagePacker, CommonPacker, null);
    ClientMessagePacker.prototype.getMembers = function (group) {
        var facebook = this.getFacebook();
        return facebook.getMembers(group)
    };
    ClientMessagePacker.prototype.checkReceiver = function (iMsg) {
        var receiver = iMsg.getReceiver();
        if (receiver.isBroadcast()) {
            return true
        } else if (receiver.isUser()) {
            return CommonPacker.prototype.checkReceiver.call(this, iMsg)
        }
        var error;
        var members = this.getMembers(receiver);
        if (!members || members.length === 0) {
            error = {'message': 'group members not found', 'group': receiver.toString()};
            this.suspendInstantMessage(iMsg, error);
            return false
        }
        var waiting = [];
        var item;
        for (var i = 0; i < members.length; ++i) {
            item = members[i];
            if (!this.getVisaKey(item)) {
                waiting.push(item)
            }
        }
        if (waiting.length === 0) {
            return true
        }
        error = {'message': 'members not ready', 'group': receiver.toString(), 'members': ID.revert(waiting)};
        this.suspendInstantMessage(iMsg, error);
        return waiting.length < members.length
    };
    ClientMessagePacker.prototype.checkGroup = function (sMsg) {
        var receiver = sMsg.getReceiver();
        var group = ID.parse(sMsg.getValue('group'));
        if (!group && receiver.isGroup()) {
            group = receiver
        }
        if (!group || group.isBroadcast()) {
            return true
        }
        var members = this.getMembers(group);
        if (members && members.length > 0) {
            return true
        }
        var error = {'message': 'group not ready', 'group': group.toString()};
        this.suspendReliableMessage(sMsg, error);
        return false
    };
    ClientMessagePacker.prototype.verifyMessage = function (rMsg) {
        if (this.checkGroup(rMsg)) {
        } else {
            Log.warning('receiver not ready', rMsg.getReceiver());
            return null
        }
        return CommonPacker.prototype.verifyMessage.call(this, rMsg)
    };
    ClientMessagePacker.prototype.decryptMessage = function (sMsg) {
        var iMsg;
        try {
            iMsg = CommonPacker.prototype.decryptMessage.call(this, sMsg)
        } catch (e) {
            var errMsg = e.toString();
            if (errMsg.indexOf('failed to decrypt key in msg: ') >= 0) {
                Log.warning('decrypt message error', e)
            } else if (errMsg.indexOf('receiver error') >= 0) {
                Log.warning('decrypt message error', e);
                return null
            } else {
                throw e;
            }
        }
        if (iMsg) {
            var content = iMsg.getContent();
            if (Interface.conforms(content, FileContent)) {
                if (!content.getPassword() && content.getURL()) {
                    var messenger = this.getMessenger();
                    var key = messenger.getDecryptKey(sMsg);
                    content.setPassword(key)
                }
            }
        } else {
            this.pushVisa(sMsg.getSender());
            iMsg = this.getFailedMessage(sMsg)
        }
        return iMsg
    };
    ClientMessagePacker.prototype.pushVisa = function (receiver) {
        var facebook = this.getFacebook();
        if (!facebook) {
            Log.error('facebook not found');
            return false
        }
        var user = facebook.getCurrentUser();
        if (!user) {
            Log.error('current user not found');
            return false
        }
        var visa = user.getVisa();
        if (visa && visa.isValid()) {
        } else {
            throw new ReferenceError('user visa error' + user.toString());
        }
        var checker = facebook.getEntityChecker();
        if (!checker) {
            Log.error('failed to get entity checker');
            return false
        }
        return checker.sendVisa(visa, receiver, false)
    };
    ClientMessagePacker.prototype.getFailedMessage = function (sMsg) {
        var sender = sMsg.getSender();
        var group = sMsg.getGroup();
        var type = sMsg.getType();
        if (ContentType.COMMAND === type || ContentType.HISTORY === type) {
            Log.warning('ignore message unable to decrypt', type, sender);
            return null
        }
        var content = TextContent.create('Failed to decrypt message.');
        content.setValue('template', 'Failed to decrypt message (type=${type}) from "${sender}".');
        content.setValue('replacements', {
            'type': type,
            'sender': sender.toString(),
            'group': !group ? null : group.toString()
        });
        if (group) {
            content.setGroup(group)
        }
        var info = sMsg.copyMap(false);
        delete info['data'];
        info['content'] = content.toMap();
        return InstantMessage.parse(info)
    };
    app.ClientMessageProcessor = function (facebook, messenger) {
        CommonProcessor.call(this, facebook, messenger)
    };
    var ClientMessageProcessor = app.ClientMessageProcessor;
    Class(ClientMessageProcessor, CommonProcessor, null);
    ClientMessageProcessor.prototype.checkGroupTimes = function (content, rMsg) {
        var group = content.getGroup();
        if (!group) {
            return false
        }
        var facebook = this.getFacebook();
        var archivist = facebook.getArchivist();
        if (!archivist) {
            return false
        }
        var now = new Date();
        var docUpdated = false;
        var memUpdated = false;
        var lastDocumentTime = rMsg.getDateTime('GDT', null);
        if (lastDocumentTime) {
            if (lastDocumentTime.getTime() > now.getTime()) {
                lastDocumentTime = now
            }
            docUpdated = archivist.setLastDocumentTime(group, lastDocumentTime);
            if (docUpdated) {
                Log.info('checking for new bulletin', group);
                facebook.getDocuments(group)
            }
        }
        var lastHistoryTime = rMsg.getDateTime('GHT', null);
        if (lastHistoryTime) {
            if (lastHistoryTime.getTime() > now.getTime()) {
                lastHistoryTime = now
            }
            memUpdated = archivist.setLastGroupHistoryTime(group, lastHistoryTime);
            if (memUpdated) {
                archivist.setLastActiveMember(group, rMsg.getSender());
                Log.info('checking for group members', group);
                facebook.getMembers(group)
            }
        }
        return docUpdated || memUpdated
    };
    ClientMessageProcessor.prototype.processContent = function (content, rMsg) {
        var responses = CommonProcessor.prototype.processContent.call(this, content, rMsg);
        this.checkGroupTimes(content, rMsg);
        if (!responses || responses.length === 0) {
            return responses
        } else if (Interface.conforms(responses[0], HandshakeCommand)) {
            return responses
        }
        var facebook = this.getFacebook();
        var messenger = this.getMessenger();
        var sender = rMsg.getSender();
        var receiver = rMsg.getReceiver();
        var me = facebook.selectLocalUser(receiver);
        if (!me) {
            Log.error('receiver error', receiver);
            return responses
        }
        var network = sender.getType();
        var res;
        for (var i = 0; i < responses.length; ++i) {
            res = responses[i];
            if (!res) {
                continue
            } else if (Interface.conforms(res, ReceiptCommand)) {
                if (EntityType.STATION === network) {
                    continue
                } else if (EntityType.BOT === network) {
                    continue
                }
            } else if (Interface.conforms(res, TextContent)) {
                if (EntityType.STATION === network) {
                    continue
                } else if (EntityType.BOT === network) {
                    continue
                }
            }
            messenger.sendContent(res, me, sender, 1)
        }
        return []
    };
    ClientMessageProcessor.prototype.createCreator = function (facebook, messenger) {
        return new ClientContentProcessorCreator(facebook, messenger)
    };
    app.Terminal = function (facebook, db) {
        Runner.call(this);
        this.__facebook = facebook;
        this.__db = db;
        this.__messenger = null;
        this.__last_time = null
    };
    var Terminal = app.Terminal;
    Class(Terminal, Runner, [SessionState.Delegate]);
    Terminal.prototype.getUserAgent = function () {
        return navigator.userAgent
    };
    Terminal.prototype.getDatabase = function () {
        return this.__db
    };
    Terminal.prototype.getFacebook = function () {
        return this.__facebook
    };
    Terminal.prototype.getMessenger = function () {
        return this.__messenger
    };
    Terminal.prototype.getSession = function () {
        var messenger = this.__messenger;
        if (!messenger) {
            return null
        }
        return messenger.getSession()
    };
    Terminal.prototype.connect = function (host, port) {
        var station;
        var session;
        var facebook = this.getFacebook();
        var messenger = this.__messenger;
        if (messenger) {
            session = messenger.getSession();
            if (session.isActive()) {
                station = session.getStation();
                if (station.getPort() === port && station.getHost() === host) {
                    return messenger
                }
            }
            session.stop();
            this.__messenger = null
        }
        Log.info('connecting to ' + host + ':' + port + ' ...');
        station = this.createStation(host, port);
        session = this.createSession(station);
        messenger = this.createMessenger(session, facebook);
        this.__messenger = messenger;
        session.setMessenger(messenger);
        var packer = this.createPacker(facebook, messenger);
        var processor = this.createProcessor(facebook, messenger);
        messenger.setPacker(packer);
        messenger.setProcessor(processor);
        var user = facebook.getCurrentUser();
        if (user) {
            session.setIdentifier(user.getIdentifier())
        }
        return messenger
    };
    Terminal.prototype.createStation = function (host, port) {
        var facebook = this.getFacebook();
        var station = new Station(host, port);
        station.setDataSource(facebook);
        return station
    };
    Terminal.prototype.createSession = function (station) {
        var db = this.getDatabase();
        var session = new ClientSession(db, station);
        session.start(this);
        return session
    };
    Terminal.prototype.createPacker = function (facebook, messenger) {
        return new ClientMessagePacker(facebook, messenger)
    };
    Terminal.prototype.createProcessor = function (facebook, messenger) {
        return new ClientMessageProcessor(facebook, messenger)
    };
    Terminal.prototype.createMessenger = function (session, facebook) {
    };
    Terminal.prototype.start = function () {
        var thread = new Thread(this);
        thread.start()
    };
    Terminal.prototype.finish = function () {
        var messenger = this.__messenger;
        if (messenger) {
            var session = messenger.getSession();
            if (session) {
                session.stop()
            }
            this.__messenger = null
        }
        return Runner.prototype.finish.call(this)
    };
    Terminal.prototype.process = function () {
        var session = this.getSession();
        var state = !session ? null : session.getState();
        var ss_index = !state ? -1 : state.getIndex();
        if (!SessionStateOrder.RUNNING.equals(ss_index)) {
            return false
        } else if (!(session && session.isReady())) {
            return false
        }
        var now = new Date();
        if (this.needsKeepOnline(this.__last_time, now)) {
            this.__last_time = now
        } else {
            return false
        }
        try {
            this.keepOnline()
        } catch (e) {
            Log.error('Terminal::process()', e)
        }
        return false
    };
    Terminal.prototype.needsKeepOnline = function (last, now) {
        if (!last) {
            return false
        }
        return (last.getTime() + 300 * 1000) < now.getTime()
    };
    Terminal.prototype.keepOnline = function () {
        var messenger = this.__messenger;
        var facebook = this.__facebook;
        var user = facebook.getCurrentUser();
        if (!user) {
            Log.error('failed to get current user')
        } else if (EntityType.STATION === user.getType()) {
            messenger.reportOnline(user.getIdentifier())
        } else {
            messenger.broadcastLogin(user.getIdentifier(), this.getUserAgent())
        }
    };
    Terminal.prototype.enterState = function (next, ctx, now) {
    };
    Terminal.prototype.exitState = function (previous, ctx, now) {
        var current = ctx.getCurrentState();
        var index = !current ? -1 : current.getIndex();
        if (index === -1 || SessionStateOrder.ERROR.equals(index)) {
            this.__last_time = null;
            return
        }
        var messenger = this.getMessenger();
        var session = this.getSession();
        if (SessionStateOrder.DEFAULT.equals(index) || SessionStateOrder.CONNECTING.equals(index)) {
            var user = ctx.getSessionID();
            if (!user) {
                Log.warning('current user not set', current);
                return
            }
            Log.info('connect for user: ' + user.toString());
            var remote = !session ? null : session.getRemoteAddress();
            if (!remote) {
                Log.warning('failed to get remote address', session);
                return
            }
            var gate = !session ? null : session.getGate();
            var docker = !gate ? null : gate.fetchPorter(remote, null);
            if (docker) {
                Log.info('connected to: ' + remote.toString())
            } else {
                Log.error('failed to connect: ' + remote.toString())
            }
        } else if (SessionStateOrder.HANDSHAKING.equals(index)) {
            messenger.handshake(null)
        } else if (SessionStateOrder.RUNNING.equals(index)) {
            messenger.handshakeSuccess();
            this.__last_time = now
        }
    };
    Terminal.prototype.pauseState = function (current, ctx, now) {
    };
    Terminal.prototype.resumeState = function (current, ctx, now) {
    }
})(DIMP, DIMP, DIMP, DIMP, DIMP, DIMP);
