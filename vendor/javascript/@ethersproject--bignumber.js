import t from"bn.js";import{isHexString as r,isBytes as e,hexlify as i,hexZeroPad as o,arrayify as n}from"@ethersproject/bytes";import{Logger as s}from"@ethersproject/logger";const u="bignumber/5.7.0";"use strict";var m=t.BN;const a=new s(u);const l={};const h=9007199254740991;function isBigNumberish(t){return null!=t&&(BigNumber.isBigNumber(t)||"number"===typeof t&&t%1===0||"string"===typeof t&&!!t.match(/^-?[0-9]+$/)||r(t)||"bigint"===typeof t||e(t))}let g=false;class BigNumber{constructor(t,r){t!==l&&a.throwError("cannot call constructor directly; use BigNumber.from",s.errors.UNSUPPORTED_OPERATION,{operation:"new (BigNumber)"});this._hex=r;this._isBigNumber=true;Object.freeze(this)}fromTwos(t){return toBigNumber(toBN(this).fromTwos(t))}toTwos(t){return toBigNumber(toBN(this).toTwos(t))}abs(){return"-"===this._hex[0]?BigNumber.from(this._hex.substring(1)):this}add(t){return toBigNumber(toBN(this).add(toBN(t)))}sub(t){return toBigNumber(toBN(this).sub(toBN(t)))}div(t){const r=BigNumber.from(t);r.isZero()&&throwFault$1("division-by-zero","div");return toBigNumber(toBN(this).div(toBN(t)))}mul(t){return toBigNumber(toBN(this).mul(toBN(t)))}mod(t){const r=toBN(t);r.isNeg()&&throwFault$1("division-by-zero","mod");return toBigNumber(toBN(this).umod(r))}pow(t){const r=toBN(t);r.isNeg()&&throwFault$1("negative-power","pow");return toBigNumber(toBN(this).pow(r))}and(t){const r=toBN(t);(this.isNegative()||r.isNeg())&&throwFault$1("unbound-bitwise-result","and");return toBigNumber(toBN(this).and(r))}or(t){const r=toBN(t);(this.isNegative()||r.isNeg())&&throwFault$1("unbound-bitwise-result","or");return toBigNumber(toBN(this).or(r))}xor(t){const r=toBN(t);(this.isNegative()||r.isNeg())&&throwFault$1("unbound-bitwise-result","xor");return toBigNumber(toBN(this).xor(r))}mask(t){(this.isNegative()||t<0)&&throwFault$1("negative-width","mask");return toBigNumber(toBN(this).maskn(t))}shl(t){(this.isNegative()||t<0)&&throwFault$1("negative-width","shl");return toBigNumber(toBN(this).shln(t))}shr(t){(this.isNegative()||t<0)&&throwFault$1("negative-width","shr");return toBigNumber(toBN(this).shrn(t))}eq(t){return toBN(this).eq(toBN(t))}lt(t){return toBN(this).lt(toBN(t))}lte(t){return toBN(this).lte(toBN(t))}gt(t){return toBN(this).gt(toBN(t))}gte(t){return toBN(this).gte(toBN(t))}isNegative(){return"-"===this._hex[0]}isZero(){return toBN(this).isZero()}toNumber(){try{return toBN(this).toNumber()}catch(t){throwFault$1("overflow","toNumber",this.toString())}return null}toBigInt(){try{return BigInt(this.toString())}catch(t){}return a.throwError("this platform does not support BigInt",s.errors.UNSUPPORTED_OPERATION,{value:this.toString()})}toString(){if(arguments.length>0)if(10===arguments[0]){if(!g){g=true;a.warn("BigNumber.toString does not accept any parameters; base-10 is assumed")}}else 16===arguments[0]?a.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()",s.errors.UNEXPECTED_ARGUMENT,{}):a.throwError("BigNumber.toString does not accept parameters",s.errors.UNEXPECTED_ARGUMENT,{});return toBN(this).toString(10)}toHexString(){return this._hex}toJSON(t){return{type:"BigNumber",hex:this.toHexString()}}static from(t){if(t instanceof BigNumber)return t;if("string"===typeof t)return t.match(/^-?0x[0-9a-f]+$/i)?new BigNumber(l,toHex(t)):t.match(/^-?[0-9]+$/)?new BigNumber(l,toHex(new m(t))):a.throwArgumentError("invalid BigNumber string","value",t);if("number"===typeof t){t%1&&throwFault$1("underflow","BigNumber.from",t);(t>=h||t<=-h)&&throwFault$1("overflow","BigNumber.from",t);return BigNumber.from(String(t))}const o=t;if("bigint"===typeof o)return BigNumber.from(o.toString());if(e(o))return BigNumber.from(i(o));if(o)if(o.toHexString){const t=o.toHexString();if("string"===typeof t)return BigNumber.from(t)}else{let t=o._hex;null==t&&"BigNumber"===o.type&&(t=o.hex);if("string"===typeof t&&(r(t)||"-"===t[0]&&r(t.substring(1))))return BigNumber.from(t)}return a.throwArgumentError("invalid BigNumber value","value",t)}static isBigNumber(t){return!!(t&&t._isBigNumber)}}function toHex(t){if("string"!==typeof t)return toHex(t.toString(16));if("-"===t[0]){t=t.substring(1);"-"===t[0]&&a.throwArgumentError("invalid hex","value",t);t=toHex(t);return"0x00"===t?t:"-"+t}"0x"!==t.substring(0,2)&&(t="0x"+t);if("0x"===t)return"0x00";t.length%2&&(t="0x0"+t.substring(2));while(t.length>4&&"0x00"===t.substring(0,4))t="0x"+t.substring(4);return t}function toBigNumber(t){return BigNumber.from(toHex(t))}function toBN(t){const r=BigNumber.from(t).toHexString();return"-"===r[0]?new m("-"+r.substring(3),16):new m(r.substring(2),16)}function throwFault$1(t,r,e){const i={fault:t,operation:r};null!=e&&(i.value=e);return a.throwError(t,s.errors.NUMERIC_FAULT,i)}function _base36To16(t){return new m(t,36).toString(16)}function _base16To36(t){return new m(t,16).toString(36)}"use strict";const f=new s(u);const d={};const c=BigNumber.from(0);const N=BigNumber.from(-1);function throwFault(t,r,e,i){const o={fault:r,operation:e};void 0!==i&&(o.value=i);return f.throwError(t,s.errors.NUMERIC_FAULT,o)}let b="0";while(b.length<256)b+=b;function getMultiplier(t){if("number"!==typeof t)try{t=BigNumber.from(t).toNumber()}catch(t){}return"number"===typeof t&&t>=0&&t<=256&&!(t%1)?"1"+b.substring(0,t):f.throwArgumentError("invalid decimal size","decimals",t)}function formatFixed(t,r){null==r&&(r=0);const e=getMultiplier(r);t=BigNumber.from(t);const i=t.lt(c);i&&(t=t.mul(N));let o=t.mod(e).toString();while(o.length<e.length-1)o="0"+o;o=o.match(/^([0-9]*[1-9]|0)(0*)/)[1];const n=t.div(e).toString();t=1===e.length?n:n+"."+o;i&&(t="-"+t);return t}function parseFixed(t,r){null==r&&(r=0);const e=getMultiplier(r);"string"===typeof t&&t.match(/^-?[0-9.]+$/)||f.throwArgumentError("invalid decimal value","value",t);const i="-"===t.substring(0,1);i&&(t=t.substring(1));"."===t&&f.throwArgumentError("missing value","value",t);const o=t.split(".");o.length>2&&f.throwArgumentError("too many decimal points","value",t);let n=o[0],s=o[1];n||(n="0");s||(s="0");while("0"===s[s.length-1])s=s.substring(0,s.length-1);s.length>e.length-1&&throwFault("fractional component exceeds decimals","underflow","parseFixed");""===s&&(s="0");while(s.length<e.length-1)s+="0";const u=BigNumber.from(n);const m=BigNumber.from(s);let a=u.mul(e).add(m);i&&(a=a.mul(N));return a}class FixedFormat{constructor(t,r,e,i){t!==d&&f.throwError("cannot use FixedFormat constructor; use FixedFormat.from",s.errors.UNSUPPORTED_OPERATION,{operation:"new FixedFormat"});this.signed=r;this.width=e;this.decimals=i;this.name=(r?"":"u")+"fixed"+String(e)+"x"+String(i);this._multiplier=getMultiplier(i);Object.freeze(this)}static from(t){if(t instanceof FixedFormat)return t;"number"===typeof t&&(t=`fixed128x${t}`);let r=true;let e=128;let i=18;if("string"===typeof t)if("fixed"===t);else if("ufixed"===t)r=false;else{const o=t.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);o||f.throwArgumentError("invalid fixed format","format",t);r="u"!==o[1];e=parseInt(o[2]);i=parseInt(o[3])}else if(t){const check=(r,e,i)=>{if(null==t[r])return i;typeof t[r]!==e&&f.throwArgumentError("invalid fixed format ("+r+" not "+e+")","format."+r,t[r]);return t[r]};r=check("signed","boolean",r);e=check("width","number",e);i=check("decimals","number",i)}e%8&&f.throwArgumentError("invalid fixed format width (not byte aligned)","format.width",e);i>80&&f.throwArgumentError("invalid fixed format (decimals too large)","format.decimals",i);return new FixedFormat(d,r,e,i)}}class FixedNumber{constructor(t,r,e,i){t!==d&&f.throwError("cannot use FixedNumber constructor; use FixedNumber.from",s.errors.UNSUPPORTED_OPERATION,{operation:"new FixedFormat"});this.format=i;this._hex=r;this._value=e;this._isFixedNumber=true;Object.freeze(this)}_checkFormat(t){this.format.name!==t.format.name&&f.throwArgumentError("incompatible format; use fixedNumber.toFormat","other",t)}addUnsafe(t){this._checkFormat(t);const r=parseFixed(this._value,this.format.decimals);const e=parseFixed(t._value,t.format.decimals);return FixedNumber.fromValue(r.add(e),this.format.decimals,this.format)}subUnsafe(t){this._checkFormat(t);const r=parseFixed(this._value,this.format.decimals);const e=parseFixed(t._value,t.format.decimals);return FixedNumber.fromValue(r.sub(e),this.format.decimals,this.format)}mulUnsafe(t){this._checkFormat(t);const r=parseFixed(this._value,this.format.decimals);const e=parseFixed(t._value,t.format.decimals);return FixedNumber.fromValue(r.mul(e).div(this.format._multiplier),this.format.decimals,this.format)}divUnsafe(t){this._checkFormat(t);const r=parseFixed(this._value,this.format.decimals);const e=parseFixed(t._value,t.format.decimals);return FixedNumber.fromValue(r.mul(this.format._multiplier).div(e),this.format.decimals,this.format)}floor(){const t=this.toString().split(".");1===t.length&&t.push("0");let r=FixedNumber.from(t[0],this.format);const e=!t[1].match(/^(0*)$/);this.isNegative()&&e&&(r=r.subUnsafe(x.toFormat(r.format)));return r}ceiling(){const t=this.toString().split(".");1===t.length&&t.push("0");let r=FixedNumber.from(t[0],this.format);const e=!t[1].match(/^(0*)$/);!this.isNegative()&&e&&(r=r.addUnsafe(x.toFormat(r.format)));return r}round(t){null==t&&(t=0);const r=this.toString().split(".");1===r.length&&r.push("0");(t<0||t>80||t%1)&&f.throwArgumentError("invalid decimal count","decimals",t);if(r[1].length<=t)return this;const e=FixedNumber.from("1"+b.substring(0,t),this.format);const i=w.toFormat(this.format);return this.mulUnsafe(e).addUnsafe(i).floor().divUnsafe(e)}isZero(){return"0.0"===this._value||"0"===this._value}isNegative(){return"-"===this._value[0]}toString(){return this._value}toHexString(t){if(null==t)return this._hex;t%8&&f.throwArgumentError("invalid byte width","width",t);const r=BigNumber.from(this._hex).fromTwos(this.format.width).toTwos(t).toHexString();return o(r,t/8)}toUnsafeFloat(){return parseFloat(this.toString())}toFormat(t){return FixedNumber.fromString(this._value,t)}static fromValue(t,r,e){if(null==e&&null!=r&&!isBigNumberish(r)){e=r;r=null}null==r&&(r=0);null==e&&(e="fixed");return FixedNumber.fromString(formatFixed(t,r),FixedFormat.from(e))}static fromString(t,r){null==r&&(r="fixed");const e=FixedFormat.from(r);const i=parseFixed(t,e.decimals);!e.signed&&i.lt(c)&&throwFault("unsigned value cannot be negative","overflow","value",t);let n=null;if(e.signed)n=i.toTwos(e.width).toHexString();else{n=i.toHexString();n=o(n,e.width/8)}const s=formatFixed(i,e.decimals);return new FixedNumber(d,n,s,e)}static fromBytes(t,r){null==r&&(r="fixed");const e=FixedFormat.from(r);if(n(t).length>e.width/8)throw new Error("overflow");let i=BigNumber.from(t);e.signed&&(i=i.fromTwos(e.width));const o=i.toTwos((e.signed?0:1)+e.width).toHexString();const s=formatFixed(i,e.decimals);return new FixedNumber(d,o,s,e)}static from(t,r){if("string"===typeof t)return FixedNumber.fromString(t,r);if(e(t))return FixedNumber.fromBytes(t,r);try{return FixedNumber.fromValue(t,0,r)}catch(t){if(t.code!==s.errors.INVALID_ARGUMENT)throw t}return f.throwArgumentError("invalid FixedNumber value","value",t)}static isFixedNumber(t){return!!(t&&t._isFixedNumber)}}const x=FixedNumber.from(1);const w=FixedNumber.from("0.5");export{BigNumber,FixedFormat,FixedNumber,_base16To36,_base36To16,formatFixed,parseFixed};

