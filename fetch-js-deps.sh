# yes, we should probably do something more than this. and we should minify. but

urls="
https://cdn.jsdelivr.net/npm/pdfkit@latest/build/pdfkit.js
https://cdn.jsdelivr.net/npm/pdfkit@latest/build/pdfkit.js.map
https://github.com/devongovett/blob-stream/releases/download/v0.1.3/blob-stream.js
"

cd js
for u in $urls
 do
  echo "fetching $u"
  curl -LOJ "$u"
done
