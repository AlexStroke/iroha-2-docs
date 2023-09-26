import{_ as s,o as a,c as n,Q as e}from"./chunks/framework.1293becd.js";const m=JSON.parse('{"title":"Metrics","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced/metrics.md","filePath":"guide/advanced/metrics.md","lastUpdated":1695626472000}'),o={name:"guide/advanced/metrics.md"},l=e(`<h1 id="metrics" tabindex="-1">Metrics <a class="header-anchor" href="#metrics" aria-label="Permalink to &quot;Metrics&quot;">​</a></h1><p>To conveniently and thoroughly monitor the performance of the network, we recommend using <a href="https://prometheus.io/" target="_blank" rel="noreferrer"><code>prometheus</code></a>. Prometheus is a program that can monitor your Iroha peer over a separate socket and provide different kinds of performance metrics.</p><p>This data can help you find performance bottlenecks and optimise your Iroha configuration.</p><h2 id="how-to-use-metrics" tabindex="-1">How to use metrics <a class="header-anchor" href="#how-to-use-metrics" aria-label="Permalink to &quot;How to use metrics&quot;">​</a></h2><p>To use metrics, you need to configure the <code>/metrics</code> endpoint in the <a href="https://github.com/hyperledger/iroha/blob/iroha2-dev/docs/source/references/config.md" target="_blank" rel="noreferrer">Iroha configuration</a>. By default, the endpoint is exposed at <code>127.0.0.1:8180/metrics</code>. If the port is not available, Iroha will still start and work normally, but metrics won&#39;t be accessible.</p><p>After that, use the IP address to access the data from the running Iroha instance. For example:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://127.0.0.1:8080/metrics</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">curl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://127.0.0.1:8080/metrics</span></span></code></pre></div><p>This will give you a result like this:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># HELP blocks_height Total number of blocks in chain</span></span>
<span class="line"><span style="color:#6A737D;"># TYPE blocks_height gauge</span></span>
<span class="line"><span style="color:#B392F0;">blocks_height</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">135543</span></span>
<span class="line"><span style="color:#6A737D;"># HELP peers_number Total number peers to send transactions and request proposals</span></span>
<span class="line"><span style="color:#6A737D;"># TYPE peers_number gauge</span></span>
<span class="line"><span style="color:#B392F0;">peers_number</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">7</span></span>
<span class="line"><span style="color:#6A737D;"># HELP number_of_domains Total number of domains in WSV</span></span>
<span class="line"><span style="color:#6A737D;"># TYPE number_of_domains gauge</span></span>
<span class="line"><span style="color:#B392F0;">number_of_domains</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">14</span></span>
<span class="line"><span style="color:#6A737D;"># HELP total_number_of_transactions Total number of transactions in blockchain</span></span>
<span class="line"><span style="color:#6A737D;"># TYPE total_number_of_transactions gauge</span></span>
<span class="line"><span style="color:#B392F0;">total_number_of_transactions</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">216499</span></span>
<span class="line"><span style="color:#6A737D;"># HELP number_of_signatures_in_last_block Number of signatures in last block</span></span>
<span class="line"><span style="color:#6A737D;"># TYPE number_of_signatures_in_last_block gauge</span></span>
<span class="line"><span style="color:#B392F0;">number_of_signatures_in_last_block</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># HELP blocks_height Total number of blocks in chain</span></span>
<span class="line"><span style="color:#6A737D;"># TYPE blocks_height gauge</span></span>
<span class="line"><span style="color:#6F42C1;">blocks_height</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">135543</span></span>
<span class="line"><span style="color:#6A737D;"># HELP peers_number Total number peers to send transactions and request proposals</span></span>
<span class="line"><span style="color:#6A737D;"># TYPE peers_number gauge</span></span>
<span class="line"><span style="color:#6F42C1;">peers_number</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">7</span></span>
<span class="line"><span style="color:#6A737D;"># HELP number_of_domains Total number of domains in WSV</span></span>
<span class="line"><span style="color:#6A737D;"># TYPE number_of_domains gauge</span></span>
<span class="line"><span style="color:#6F42C1;">number_of_domains</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">14</span></span>
<span class="line"><span style="color:#6A737D;"># HELP total_number_of_transactions Total number of transactions in blockchain</span></span>
<span class="line"><span style="color:#6A737D;"># TYPE total_number_of_transactions gauge</span></span>
<span class="line"><span style="color:#6F42C1;">total_number_of_transactions</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">216499</span></span>
<span class="line"><span style="color:#6A737D;"># HELP number_of_signatures_in_last_block Number of signatures in last block</span></span>
<span class="line"><span style="color:#6A737D;"># TYPE number_of_signatures_in_last_block gauge</span></span>
<span class="line"><span style="color:#6F42C1;">number_of_signatures_in_last_block</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5</span></span></code></pre></div><h2 id="metrics-endpoint" tabindex="-1"><code>/metrics</code> endpoint <a class="header-anchor" href="#metrics-endpoint" aria-label="Permalink to &quot;\`/metrics\` endpoint&quot;">​</a></h2><p>Refer to the <a href="https://github.com/hyperledger/iroha/blob/iroha2-dev/docs/source/references/api_spec.md#metrics" target="_blank" rel="noreferrer">API specification</a>.</p>`,11),t=[l];function p(r,c,i,d,u,_){return a(),n("div",null,t)}const b=s(o,[["render",p]]);export{m as __pageData,b as default};
