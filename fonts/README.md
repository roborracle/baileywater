# Gotham Font Files

Drop your Gotham `.woff2` files into this directory, then uncomment the `@font-face` declarations at the top of `css/styles.css`.

## Expected files

| File | Weight | CSS `font-weight` |
|------|--------|--------------------|
| Gotham-Thin.woff2 | Thin | 100 |
| Gotham-Light.woff2 | Light | 300 |
| Gotham-Book.woff2 | Book | 400 |
| Gotham-Medium.woff2 | Medium | 500 |
| Gotham-Bold.woff2 | Bold | 700 |
| Gotham-Black.woff2 | Black | 900 |

Not all weights are required. At minimum, provide **Book** (400) and **Bold** (700). The site currently loads Montserrat from Google Fonts as a fallback until Gotham files are in place.
