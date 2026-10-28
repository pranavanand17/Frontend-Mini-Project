# Original Mini Sites

This static collection is built from the HTML source printed in the 41 numbered PDFs in `Frontend MiniPDFs`.

- Open `index.html` to see all 41 sites together.
- Open `gallery.html` to browse the thumbnail catalog in a streaming-service-style layout. Search or filter the numbered previews.
- Select a project to open it at `site.html?id=1` through `site.html?id=41`.

The individual source documents in `sites/` retain their original HTML and CSS. The collection pages use plain browser defaults and embed those documents without applying a shared stylesheet. PDF 24 contains three original checkout pages, so its preview shows Customer Details, Payment Details, and Cart Summary separately.

No build step, package install, backend, or runtime dependency is required. If local file previews are blocked by your browser, run `python -m http.server 8000` from this folder and open `http://localhost:8000`.
