import s from"minimalistic-assert";import"inherits";import{e as t,a as h}from"../_/c1705aed.js";import"../_/c331ab0b.js";import i from"./hash/sha/1.js";import a from"./hash/sha/256.js";import r from"./hash/sha/224.js";import e from"./hash/sha/512.js";import o from"./hash/sha/384.js";import n from"./hash/ripemd.js";var m={};m.sha1=i;m.sha224=r;m.sha256=a;m.sha384=o;m.sha512=e;var p={};var u=t;var c=s;function Hmac(s,t,h){if(!(this instanceof Hmac))return new Hmac(s,t,h);this.Hash=s;this.blockSize=s.blockSize/8;this.outSize=s.outSize/8;this.inner=null;this.outer=null;this._init(u.toArray(t,h))}p=Hmac;Hmac.prototype._init=function init(s){s.length>this.blockSize&&(s=(new this.Hash).update(s).digest());c(s.length<=this.blockSize);for(var t=s.length;t<this.blockSize;t++)s.push(0);for(t=0;t<s.length;t++)s[t]^=54;this.inner=(new this.Hash).update(s);for(t=0;t<s.length;t++)s[t]^=106;this.outer=(new this.Hash).update(s)};Hmac.prototype.update=function update(s,t){this.inner.update(s,t);return this};Hmac.prototype.digest=function digest(s){this.outer.update(this.inner.digest());return this.outer.digest(s)};var d=p;var f={};var l=f;l.utils=t;l.common=h;l.sha=m;l.ripemd=n;l.hmac=d;l.sha1=l.sha.sha1;l.sha256=l.sha.sha256;l.sha224=l.sha.sha224;l.sha384=l.sha.sha384;l.sha512=l.sha.sha512;l.ripemd160=l.ripemd.ripemd160;export default f;
