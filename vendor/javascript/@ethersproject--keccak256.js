import*as e from"js-sha3";import*as a from"@ethersproject/bytes";var t="default"in e?e.default:e;var r="default"in a?a.default:a;var c={};var u=c&&c.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(c,"__esModule",{value:true});c.keccak256=void 0;var o=u(t);var f=r;function keccak256(e){return"0x"+o.default.keccak_256((0,f.arrayify)(e))}c.keccak256=keccak256;const k=c.__esModule;const s=c.keccak256;export{k as __esModule,c as default,s as keccak256};

