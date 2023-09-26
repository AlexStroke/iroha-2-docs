import{_ as s,o,c as e,Q as a}from"./chunks/framework.1293becd.js";const E=JSON.parse('{"title":"How to hot reload Iroha in a Docker container","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced/hot-reload.md","filePath":"guide/advanced/hot-reload.md","lastUpdated":1695626472000}'),n={name:"guide/advanced/hot-reload.md"},t=a('<h1 id="how-to-hot-reload-iroha-in-a-docker-container" tabindex="-1">How to hot reload Iroha in a Docker container <a class="header-anchor" href="#how-to-hot-reload-iroha-in-a-docker-container" aria-label="Permalink to &quot;How to hot reload Iroha in a Docker container&quot;">​</a></h1><p>Here is the overall procedure for hot reloading Iroha in a Docker container:</p><ol><li><p>Build Iroha on your host OS.</p><p>To avoid issues with dynamic linking, run:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cargo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--release</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--target</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">x86_64-unknown-linux-musl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--features</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vendored&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cargo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--release</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--target</span><span style="color:#24292E;"> </span><span style="color:#032F62;">x86_64-unknown-linux-musl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--features</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vendored&quot;</span></span></code></pre></div><details><summary> An explanation for using `cargo build` with these parameters. </summary><p>You may experience an issue with dynamic linking if your host OS has a newer version of <code>glibc</code> compared to the one in the Docker container. The options used in the command above resolve the issue:</p><ul><li><code>--target x86_64-unknown-linux-musl</code> forces static linking against <code>musl</code> libc implementation</li><li><code>--features &quot;vendored&quot;</code> facilitates static linkage of the <code>openssl</code> library</li></ul></details></li><li><p>Enter Docker container. For example:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">exec</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-it</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">iroha-iroha0-1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bash</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">exec</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-it</span><span style="color:#24292E;"> </span><span style="color:#032F62;">iroha-iroha0-1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bash</span></span></code></pre></div></li><li><p>Copy Iroha to the current directory:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">root/soramitsu/iroha/target/x86_64-unknown-linux-musl/release/iroha</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">root/soramitsu/iroha/target/x86_64-unknown-linux-musl/release/iroha</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span></span></code></pre></div></li><li><p>(Optional) Make any modifications you need:</p><ul><li><a href="#wiping-previous-blockchain-state-recommit-genesis">Recommit genesis block</a></li><li><a href="#use-custom-configuration-files">Use custom configuration files</a></li><li><a href="#use-custom-environment-variables">Use custom environment variables</a></li></ul></li><li><p>Exit docker container and restart it using <code>docker restart</code>.</p><p><strong>Note:</strong> If you use the combination of <code>container down</code> and <code>container up</code>, any modifications you made on the previous step will be lost. Use <code>docker restart</code> to preserve changes.</p></li></ol><p>If you skip the optional step (step 4), the state of the blockchain after hot reload will be the same as it was before the Docker container was restarted.</p><p>Note that if you get the <code>Kura initialisation failed</code> error message, it might mean one of two things: corruption or binary incompatibility of the stored block. To fix this, remove the <code>blocks/</code> directory.</p><h2 id="wiping-previous-blockchain-state-recommit-genesis" tabindex="-1">Wiping previous blockchain state (recommit genesis) <a class="header-anchor" href="#wiping-previous-blockchain-state-recommit-genesis" aria-label="Permalink to &quot;Wiping previous blockchain state (recommit genesis)&quot;">​</a></h2><p>To recommit a custom genesis block, remove the previously stored blocks before restarting the container:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">blocks/</span><span style="color:#79B8FF;">*</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">blocks/</span><span style="color:#005CC5;">*</span></span></code></pre></div><p>The new genesis block will be automatically recommited upon container restart.</p><h2 id="use-custom-configuration-files" tabindex="-1">Use custom configuration files <a class="header-anchor" href="#use-custom-configuration-files" aria-label="Permalink to &quot;Use custom configuration files&quot;">​</a></h2><p>To use custom configuration files, such as <code>config.json</code> or <code>genesis.json</code>, copy (or bind mount) them to the <code>config/</code> subvolume before restarting the Docker container.</p><p>The changes will take effect upon container restart.</p><h2 id="use-custom-environment-variables" tabindex="-1">Use custom environment variables <a class="header-anchor" href="#use-custom-environment-variables" aria-label="Permalink to &quot;Use custom environment variables&quot;">​</a></h2><p>To use custom environment variables (e.g. <code>IROHA_PUBLIC_KEY</code>), simply modify them before restarting the Docker container. For example:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">IROHA_PUBLIC_KEY=</span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">new_ke</span><span style="color:#E1E4E8;">y</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">IROHA_PUBLIC_KEY=</span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">new_ke</span><span style="color:#24292E;">y</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span></span></code></pre></div><p>The changes will take effect upon container restart.</p>',16),l=[t];function r(p,c,i,d,h,u){return o(),e("div",null,l)}const m=s(n,[["render",r]]);export{E as __pageData,m as default};
