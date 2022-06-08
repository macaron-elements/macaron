import { compile } from "@macaron-app/compiler";

export function generatePreviewHTML(jsOutput: string, html: string): string {
  const previewHTML = `
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Macaron</title>
      <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          -webkit-font-smoothing: antialiased;
        }
      </style>
    </head>
    <body>
      <script type="module" defer>${jsOutput}</script>
      ${html}
    </body>
  </html>
  `;

  return previewHTML;
}
