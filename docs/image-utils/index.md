<dl>
<dt>
    <a href="#compress">compress(base64ImgOrBuffer, [options])</a></dt>
<dt>
    <a href="#embedmetadata">embedMetadata(base64ImgOrBuffer, exifObj, [options])</a></dt>
<dt>
    <a href="#metadata">metadata(base64ImgOrBuffer)</a></dt>
<dt>
    <a href="#resize">resize(base64ImgOrBuffer, [options])</a></dt>
<dt>
    <a href="#stripmetadata">stripMetadata(base64ImgOrBuffer, [options])</a></dt>
</dl>


This adaptor exports the following from common:
<dl>
<dt>
    <a href="/adaptors/packages/common-docs#as">as()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#combine">combine()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#cursor">cursor()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datapath">dataPath()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datavalue">dataValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#datefns">dateFns</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#each">each()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#field">field()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fields">fields()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fn">fn()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#fnif">fnIf()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#group">group()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#http">http</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#lastreferencevalue">lastReferenceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#map">map()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#merge">merge()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#scrubemojis">scrubEmojis()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#sourcevalue">sourceValue()</a>
</dt>
<dt>
    <a href="/adaptors/packages/common-docs#util">util</a>
</dt></dl>

## Functions
### compress

<p><code>compress(base64ImgOrBuffer, [options]) ⇒ Operation</code></p>

Compress an image by reducing image quality until it reaches the criteria.
Writes `{ buffer, size, quality }` to `state.data`.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| base64ImgOrBuffer | <code>string</code> \| <code>Buffer</code> \| <code>function</code> |  | Base64 string, data URL, Buffer, or resolver fn |
| [options] | <code>object</code> | <code>{}</code> |  |
| [options.maxBytes] | <code>number</code> | <code>716800</code> | Maximum output file size in bytes |
| [options.minQuality] | <code>number</code> | <code>20</code> | JPEG quality floor (1–100); compression stops here even if maxBytes is not met |
| [options.parseAs] | <code>&#x27;buffer&#x27;</code> \| <code>&#x27;base64&#x27;</code> | <code>&#x27;buffer&#x27;</code> | Return format: `'buffer'` (default) or `'base64'` |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the result of the image operation |
| references | an array of all previous data objects used in the Job |

**Example**
```js
compress(state.data.buffer, { maxBytes: 700 * 1024, minQuality: 20 })
```

* * *

### embedMetadata

<p><code>embedMetadata(base64ImgOrBuffer, exifObj, [options]) ⇒ Operation</code></p>

Embed EXIF metadata into a JPEG image.
Writes `{ buffer }` to `state.data`.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| base64ImgOrBuffer | <code>string</code> \| <code>Buffer</code> \| <code>function</code> |  | Base64 string, data URL, Buffer, or resolver fn |
| exifObj | <code>object</code> |  | EXIF key-value pairs; keys must be valid EXIF tag names (e.g. UserComment, Make, Model) |
| [options] | <code>object</code> | <code>{}</code> |  |
| [options.parseAs] | <code>&#x27;buffer&#x27;</code> \| <code>&#x27;base64&#x27;</code> | <code>&#x27;buffer&#x27;</code> | Return format: `'buffer'` (default) or `'base64'` |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the result of the image operation |
| references | an array of all previous data objects used in the Job |

**Example**
```js
embedMetadata($.data.buffer, { UserComment: 'patient-id=42' })
embedMetadata($.data.buffer, { UserComment: 'patient-id=42', Make: 'OpenFn' }, { parseAs: 'base64' })
```

* * *

### metadata

<p><code>metadata(base64ImgOrBuffer) ⇒ Operation</code></p>

Read image metadata without modifying the image.
Writes `{ width, height, orientation, size, exif }` to `state.data`.
`exif` is a flat object of human-readable EXIF tag names (e.g. `{ Make, Model, GPSLatitude, UserComment }`).
`UserComment` has the `ASCII\0\0\0` encoding prefix stripped. Images with no EXIF return `exif: {}`.


| Param | Type | Description |
| --- | --- | --- |
| base64ImgOrBuffer | <code>string</code> \| <code>Buffer</code> \| <code>function</code> | Base64 string, data URL, Buffer, or resolver fn |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the result of the image operation |
| references | an array of all previous data objects used in the Job |

**Example**
```js
metadata($.data.photoBase64)
fn(state => {
  if (state.data.size > 700 * 1024) { ... }
  return state;
})
```

* * *

### resize

<p><code>resize(base64ImgOrBuffer, [options]) ⇒ Operation</code></p>

Resize an image to the given dimensions.
Writes `{ buffer, width, height }` to `state.data`.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| base64ImgOrBuffer | <code>string</code> \| <code>Buffer</code> \| <code>function</code> |  | Base64 string, data URL, Buffer, or resolver fn |
| [options] | <code>object</code> | <code>{}</code> |  |
| [options.width] | <code>number</code> |  | Output width in pixels |
| [options.height] | <code>number</code> |  | Output height in pixels |
| [options.parseAs] | <code>&#x27;buffer&#x27;</code> \| <code>&#x27;base64&#x27;</code> | <code>&#x27;buffer&#x27;</code> | Return format: `'buffer'` (default) or `'base64'` |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the result of the image operation |
| references | an array of all previous data objects used in the Job |

**Example**
```js
resize($.data.photoBase64, { width: 1200, height: 1600 })
```

* * *

### stripMetadata

<p><code>stripMetadata(base64ImgOrBuffer, [options]) ⇒ Operation</code></p>

Strip all EXIF metadata from an image. Output is always a JPEG buffer.
Writes `{ buffer }` to `state.data`.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| base64ImgOrBuffer | <code>string</code> \| <code>Buffer</code> \| <code>function</code> |  | Base64 string, data URL, Buffer, or resolver fn |
| [options] | <code>object</code> | <code>{}</code> |  |
| [options.parseAs] | <code>&#x27;buffer&#x27;</code> \| <code>&#x27;base64&#x27;</code> | <code>&#x27;buffer&#x27;</code> | Return format: `'buffer'` (default) or `'base64'` |

This operation writes the following keys to state:

| State Key | Description |
| --- | --- |
| data | the result of the image operation |
| references | an array of all previous data objects used in the Job |

**Example**
```js
stripMetadata($.data.photoBase64)
```

* * *


