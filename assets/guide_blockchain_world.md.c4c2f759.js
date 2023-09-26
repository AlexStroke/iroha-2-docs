import{_ as e,o as i,c as r,Q as o}from"./chunks/framework.1293becd.js";const f=JSON.parse('{"title":"World","description":"","frontmatter":{},"headers":[],"relativePath":"guide/blockchain/world.md","filePath":"guide/blockchain/world.md","lastUpdated":1695626472000}'),t={name:"guide/blockchain/world.md"},a=o('<h1 id="world" tabindex="-1">World <a class="header-anchor" href="#world" aria-label="Permalink to &quot;World&quot;">​</a></h1><p><code>World</code> is the global entity that contains other entities. The <code>World</code> consists of:</p><ul><li>Iroha <a href="./../configure/client-configuration.html">configuration parameters</a></li><li>the list of <a href="/iroha-2-docs/guide/configure/peer-configuration.html#trusted-peers">trusted peers</a></li><li>registered domains</li><li>registered <a href="/iroha-2-docs/guide/blockchain/triggers.html">triggers</a></li><li>registered <a href="/iroha-2-docs/guide/blockchain/permissions.html#permission-groups-roles">roles</a></li><li>registered <a href="/iroha-2-docs/guide/blockchain/permissions.html#permission-tokens">permission token definitions</a></li><li>permission tokens for all accounts</li><li><a href="/iroha-2-docs/guide/blockchain/permissions.html#runtime-validators">the chain of runtime validators</a></li></ul><p>When domains, peers, or roles are registered or unregistered, the <code>World</code> is the target of the (un)register <a href="/iroha-2-docs/guide/blockchain/instructions.html">instruction</a>.</p><h2 id="world-state-view-wsv" tabindex="-1">World State View (WSV) <a class="header-anchor" href="#world-state-view-wsv" aria-label="Permalink to &quot;World State View (WSV)&quot;">​</a></h2><p>World State View is the in-memory representation of the current blockchain state. This includes all currently loaded blocks, with all of their contents, as well as peers elected for the current epoch.</p>',6),s=[a];function l(n,d,c,h,u,p){return i(),r("div",null,s)}const g=e(t,[["render",l]]);export{f as __pageData,g as default};
