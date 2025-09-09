'use strict';
// license: https://mit-license.org
// =============================================================================
// The MIT License (MIT)
//
// Copyright (c) 2020 Albert Moky
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// =============================================================================
//

/**
 *  Convert host string (IP:port) to/from Base58 string
 */

(function (app, sys) {

    var sg = app.network;

    var Class  = sys.type.Class;
    var Base58 = sys.type.Base58;

    var Host = sg.ip.Host;
    var IPv4 = sg.ip.IPv4;
    var IPv6 = sg.ip.IPv6;

    sg.ip.Host58 = function (host) {
        var ipv;
        if (/[.:]+/.test(host)) {
            // try IPv4
            ipv = IPv4.parse(host);
            if (!ipv) {
                // try IPv6
                ipv = IPv6.parse(host);
                if (!ipv) {
                    throw new URIError('IP format error');
                }
            }
        } else {
            // base58
            var data = Base58.decode(host);
            var count = data.length;
            if (count === 4 || count === 6) {
                // IPv4
                ipv = new IPv4(null, 0, data);
            } else if (count === 16 || count === 18) {
                // IPv6
                ipv = new IPv6(null, 0, data);
            } else {
                throw new URIError('host error: ' + host);
            }
        }
        Host.call(this, host, ipv.ip, ipv.port, ipv.data);
        this.ipv = ipv;
    };
    var Host58 = sg.ip.Host58;

    Class(Host58, Host, null, null);

    Host58.prototype.valueOf = function () {
        return this.ipv.valueOf();
    };

    Host58.prototype.encode = function (default_port) {
        return Base58.encode(this.ipv.toArray(default_port));
    };

})(DIMP, DIMP);
