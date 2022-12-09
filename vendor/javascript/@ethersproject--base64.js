import{arrayify as e}from"@ethersproject/bytes";"use strict";function decode(t){t=atob(t);const o=[];for(let e=0;e<t.length;e++)o.push(t.charCodeAt(e));return e(o)}function encode(t){t=e(t);let o="";for(let e=0;e<t.length;e++)o+=String.fromCharCode(t[e]);return btoa(o)}"use strict";export{decode,encode};

