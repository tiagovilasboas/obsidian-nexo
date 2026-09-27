# Graph palette

Nexo colors the graph canvas, ordinary nodes, links, focused nodes, tags and
attachments through Obsidian's graph CSS variables. To distinguish folders,
create color groups in **Graph view → Settings → Groups**. Group colors belong
to the vault's graph settings; a theme cannot assign folder queries globally.

Suggested four-scope palettes (choose the column matching Obsidian's appearance):

| Scope | Example query | Dark | Light |
| --- | --- | --- | --- |
| Personal | `path:pages/pessoal` | mint `#84f5b2` | forest mint `#287448` |
| Career | `path:pages/carreira` | signal `#00ff41` | deep green `#08752d` |
| Operations | `path:pages/ops` | lime `#b8ff5a` | olive `#766000` |
| Meta | `path:pages/meta` | aqua `#00e5a0` | deep teal `#006f6a` |

Adapt the queries to your own folders. Keep the broadest queries last, because
group order affects which color wins when a note matches more than one query.

For a dense graph, start with **Node size** around `1.15` and **Link thickness**
around `0.75`, then adjust to the size of your vault. Filters can hide asset,
journal or backup folders if they do not help you navigate. Theme graph defaults
also adapt to the selected appearance; optional Style Settings colors override
those defaults.
