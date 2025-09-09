/**
 *  DIM-Client (v2.0.0)
 *  (DIMP: Decentralized Instant Messaging Protocol)
 *
 * @author    moKy <albert.moky at gmail.com>
 * @date      Sep. 1, 2025
 * @copyright (c) 2020-2025 Albert Moky
 * @license   {@link https://mit-license.org | MIT License}
 */;
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
