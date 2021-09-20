var CookieStash = function() {
    var t = {},
        e = 0;

    function i() {
        this.sID = e++, t[this.sID] = {}, t[this.sID].maxDuration = 365, t[this.sID].date = new Date
    }
    return i.prototype.getMaxDuration = function() {
        return t[this.sID].maxDuration
    }, i.prototype.getDate = function() {
        return t[this.sID].date
    }, i.prototype.returnCookieFormat = function(t, e) {
        for (var i = document.cookie.split(";"), n = 0; n < i.length; n++) {
            var r, o = (r = (r = i[n]).split("="))[0].trim(),
                a = r[1];
            if (o == e) {
                if ("get" == t) return a;
                if ("isset" == t) return !0
            }
        }
        return !1
    }, i.prototype.get = function(t) {
        return this.returnCookieFormat("get", t)
    }, i.prototype.isset = function(t) {
        return this.returnCookieFormat("isset", t)
    }, i.prototype.set = function(t, e) {
        var i = this.getDate(),
            n = this.getMaxDuration();
        i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3);
        var r = "expires=" + i.toUTCString();
        document.cookie = t + "=" + e + "; " + r
    }, i.prototype.setWithExpiry = function(t, e, i) {
        var n = this.getDate();
        n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3);
        var r = "expires=" + n.toUTCString();
        document.cookie = t + "=" + e + "; " + r
    }, i.prototype.erase = function(t) {
        document.cookie = t + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    }, i
}(),
cookieStash = new CookieStash;
