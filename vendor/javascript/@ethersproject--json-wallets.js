import t from"aes-js";import{getAddress as e}from"@ethersproject/address";import{arrayify as r,hexlify as n,concat as s}from"@ethersproject/bytes";import{keccak256 as o}from"@ethersproject/keccak256";import{pbkdf2 as c}from"@ethersproject/pbkdf2";import{toUtf8Bytes as a,UnicodeNormalizationForm as i}from"@ethersproject/strings";import{Description as p}from"@ethersproject/properties";import{Logger as l}from"@ethersproject/logger";import u from"scrypt-js";import{defaultPath as d,entropyToMnemonic as h,HDNode as f,mnemonicToEntropy as y}from"@ethersproject/hdnode";import{randomBytes as m}from"@ethersproject/random";import{computeAddress as w}from"@ethersproject/transactions";const g="json-wallets/5.7.0";"use strict";function looseArrayify(t){"string"===typeof t&&"0x"!==t.substring(0,2)&&(t="0x"+t);return r(t)}function zpad(t,e){t=String(t);while(t.length<e)t="0"+t;return t}function getPassword(t){return"string"===typeof t?a(t,i.NFKC):r(t)}function searchPath(t,e){let r=t;const n=e.toLowerCase().split("/");for(let t=0;t<n.length;t++){let e=null;for(const s in r)if(s.toLowerCase()===n[t]){e=r[s];break}if(null===e)return null;r=e}return r}function uuidV4(t){const e=r(t);e[6]=15&e[6]|64;e[8]=63&e[8]|128;const s=n(e);return[s.substring(2,10),s.substring(10,14),s.substring(14,18),s.substring(18,22),s.substring(22,34)].join("-")}"use strict";const v=new l(g);class CrowdsaleAccount extends p{isCrowdsaleAccount(t){return!!(t&&t._isCrowdsaleAccount)}}function decrypt$1(n,s){const i=JSON.parse(n);s=getPassword(s);const p=e(searchPath(i,"ethaddr"));const l=looseArrayify(searchPath(i,"encseed"));l&&l.length%16===0||v.throwArgumentError("invalid encseed","json",n);const u=r(c(s,s,2e3,32,"sha256")).slice(0,16);const d=l.slice(0,16);const h=l.slice(16);const f=new t.ModeOfOperation.cbc(u,d);const y=t.padding.pkcs7.strip(r(f.decrypt(h)));let m="";for(let t=0;t<y.length;t++)m+=String.fromCharCode(y[t]);const w=a(m);const g=o(w);return new CrowdsaleAccount({_isCrowdsaleAccount:true,address:p,privateKey:g})}"use strict";function isCrowdsaleWallet(t){let e=null;try{e=JSON.parse(t)}catch(t){return false}return e.encseed&&e.ethaddr}function isKeystoreWallet(t){let e=null;try{e=JSON.parse(t)}catch(t){return false}return!(!e.version||parseInt(e.version)!==e.version||3!==parseInt(e.version))}function getJsonWalletAddress(t){if(isCrowdsaleWallet(t))try{return e(JSON.parse(t).ethaddr)}catch(t){return null}if(isKeystoreWallet(t))try{return e(JSON.parse(t).address)}catch(t){return null}return null}"use strict";var C=(void 0,function(t,e,r,n){function adopt(t){return t instanceof r?t:new r((function(e){e(t)}))}return new(r||(r=Promise))((function(r,s){function fulfilled(t){try{step(n.next(t))}catch(t){s(t)}}function rejected(t){try{step(n.throw(t))}catch(t){s(t)}}function step(t){t.done?r(t.value):adopt(t.value).then(fulfilled,rejected)}step((n=n.apply(t,e||[])).next())}))});const P=new l(g);function hasMnemonic(t){return null!=t&&t.mnemonic&&t.mnemonic.phrase}class KeystoreAccount extends p{isKeystoreAccount(t){return!!(t&&t._isKeystoreAccount)}}function _decrypt(e,n,s){const o=searchPath(e,"crypto/cipher");if("aes-128-ctr"===o){const o=looseArrayify(searchPath(e,"crypto/cipherparams/iv"));const c=new t.Counter(o);const a=new t.ModeOfOperation.ctr(n,c);return r(a.decrypt(s))}return null}function _getAccount(c,a){const i=looseArrayify(searchPath(c,"crypto/ciphertext"));const p=n(o(s([a.slice(16,32),i]))).substring(2);if(p!==searchPath(c,"crypto/mac").toLowerCase())throw new Error("invalid password");const u=_decrypt(c,a.slice(0,16),i);u||P.throwError("unsupported cipher",l.errors.UNSUPPORTED_OPERATION,{operation:"decrypt"});const y=a.slice(32,64);const m=w(u);if(c.address){let t=c.address.toLowerCase();"0x"!==t.substring(0,2)&&(t="0x"+t);if(e(t)!==m)throw new Error("address mismatch")}const g={_isKeystoreAccount:true,address:m,privateKey:n(u)};if("0.1"===searchPath(c,"x-ethers/version")){const e=looseArrayify(searchPath(c,"x-ethers/mnemonicCiphertext"));const n=looseArrayify(searchPath(c,"x-ethers/mnemonicCounter"));const s=new t.Counter(n);const o=new t.ModeOfOperation.ctr(y,s);const a=searchPath(c,"x-ethers/path")||d;const i=searchPath(c,"x-ethers/locale")||"en";const p=r(o.decrypt(e));try{const t=h(p,i);const e=f.fromMnemonic(t,null,i).derivePath(a);if(e.privateKey!=g.privateKey)throw new Error("mnemonic mismatch");g.mnemonic=e.mnemonic}catch(t){if(t.code!==l.errors.INVALID_ARGUMENT||"wordlist"!==t.argument)throw t}}return new KeystoreAccount(g)}function pbkdf2Sync(t,e,n,s,o){return r(c(t,e,n,s,o))}function pbkdf2(t,e,r,n,s){return Promise.resolve(pbkdf2Sync(t,e,r,n,s))}function _computeKdfKey(t,e,r,n,s){const o=getPassword(e);const c=searchPath(t,"crypto/kdf");if(c&&"string"===typeof c){const throwError=function(t,e){return P.throwArgumentError("invalid key-derivation function parameters",t,e)};if("scrypt"===c.toLowerCase()){const e=looseArrayify(searchPath(t,"crypto/kdfparams/salt"));const r=parseInt(searchPath(t,"crypto/kdfparams/n"));const a=parseInt(searchPath(t,"crypto/kdfparams/r"));const i=parseInt(searchPath(t,"crypto/kdfparams/p"));r&&a&&i||throwError("kdf",c);0!==(r&r-1)&&throwError("N",r);const p=parseInt(searchPath(t,"crypto/kdfparams/dklen"));32!==p&&throwError("dklen",p);return n(o,e,r,a,i,64,s)}if("pbkdf2"===c.toLowerCase()){const e=looseArrayify(searchPath(t,"crypto/kdfparams/salt"));let n=null;const s=searchPath(t,"crypto/kdfparams/prf");"hmac-sha256"===s?n="sha256":"hmac-sha512"===s?n="sha512":throwError("prf",s);const c=parseInt(searchPath(t,"crypto/kdfparams/c"));const a=parseInt(searchPath(t,"crypto/kdfparams/dklen"));32!==a&&throwError("dklen",a);return r(o,e,c,a,n)}}return P.throwArgumentError("unsupported key-derivation function","kdf",c)}function decryptSync(t,e){const r=JSON.parse(t);const n=_computeKdfKey(r,e,pbkdf2Sync,u.syncScrypt);return _getAccount(r,n)}function decrypt(t,e,r){return C(this,void 0,void 0,(function*(){const n=JSON.parse(t);const s=yield _computeKdfKey(n,e,pbkdf2,u.scrypt,r);return _getAccount(n,s)}))}function encrypt(c,a,i,p){try{if(e(c.address)!==w(c.privateKey))throw new Error("address/privateKey mismatch");if(hasMnemonic(c)){const t=c.mnemonic;const e=f.fromMnemonic(t.phrase,null,t.locale).derivePath(t.path||d);if(e.privateKey!=c.privateKey)throw new Error("mnemonic mismatch")}}catch(t){return Promise.reject(t)}if("function"===typeof i&&!p){p=i;i={}}i||(i={});const l=r(c.privateKey);const h=getPassword(a);let g=null;let v=null;let C=null;if(hasMnemonic(c)){const t=c.mnemonic;g=r(y(t.phrase,t.locale||"en"));v=t.path||d;C=t.locale||"en"}let P=i.client;P||(P="ethers.js");let k=null;k=i.salt?r(i.salt):m(32);let A=null;if(i.iv){A=r(i.iv);if(16!==A.length)throw new Error("invalid iv")}else A=m(16);let K=null;if(i.uuid){K=r(i.uuid);if(16!==K.length)throw new Error("invalid uuid")}else K=m(16);let b=1<<17,S=8,O=1;if(i.scrypt){i.scrypt.N&&(b=i.scrypt.N);i.scrypt.r&&(S=i.scrypt.r);i.scrypt.p&&(O=i.scrypt.p)}return u.scrypt(h,k,b,S,O,64,p).then((e=>{e=r(e);const a=e.slice(0,16);const i=e.slice(16,32);const p=e.slice(32,64);const u=new t.Counter(A);const d=new t.ModeOfOperation.ctr(a,u);const h=r(d.encrypt(l));const f=o(s([i,h]));const y={address:c.address.substring(2).toLowerCase(),id:uuidV4(K),version:3,crypto:{cipher:"aes-128-ctr",cipherparams:{iv:n(A).substring(2)},ciphertext:n(h).substring(2),kdf:"scrypt",kdfparams:{salt:n(k).substring(2),n:b,dklen:32,p:O,r:S},mac:f.substring(2)}};if(g){const e=m(16);const s=new t.Counter(e);const o=new t.ModeOfOperation.ctr(p,s);const c=r(o.encrypt(g));const a=new Date;const i=a.getUTCFullYear()+"-"+zpad(a.getUTCMonth()+1,2)+"-"+zpad(a.getUTCDate(),2)+"T"+zpad(a.getUTCHours(),2)+"-"+zpad(a.getUTCMinutes(),2)+"-"+zpad(a.getUTCSeconds(),2)+".0Z";y["x-ethers"]={client:P,gethFilename:"UTC--"+i+"--"+y.address,mnemonicCounter:n(e).substring(2),mnemonicCiphertext:n(c).substring(2),path:v,locale:C,version:"0.1"}}return JSON.stringify(y)}))}"use strict";function decryptJsonWallet(t,e,r){if(isCrowdsaleWallet(t)){r&&r(0);const n=decrypt$1(t,e);r&&r(1);return Promise.resolve(n)}return isKeystoreWallet(t)?decrypt(t,e,r):Promise.reject(new Error("invalid JSON wallet"))}function decryptJsonWalletSync(t,e){if(isCrowdsaleWallet(t))return decrypt$1(t,e);if(isKeystoreWallet(t))return decryptSync(t,e);throw new Error("invalid JSON wallet")}export{decrypt$1 as decryptCrowdsale,decryptJsonWallet,decryptJsonWalletSync,decrypt as decryptKeystore,decryptSync as decryptKeystoreSync,encrypt as encryptKeystore,getJsonWalletAddress,isCrowdsaleWallet,isKeystoreWallet};
