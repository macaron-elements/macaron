import { compile } from "@macaron-app/compiler";

export function generatePreviewHTML(macaronFile: string, html: string): string {
  const jsFile = compile(macaronFile);

  const previewHTML = `
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Macaron</title>
      <style>
        body {
          margin: 0;
        }
      </style>
    </head>
    <body>
      <script type="module" defer>${jsFile}</script>
      ${html}
    </body>
  </html>
  `;

  return previewHTML;
}
