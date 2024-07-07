import React from "react";

class GeneratedApp extends React.Component {
  render() {
    const { htmlContent, cssContent, jsContent } = this.props;
    return (
      <html lang="en">
        <head>
          <meta charset="UTF-8"></meta>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
          <title>Layout Preview</title>
          <style>{cssContent}</style>
        </head>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </html>
    );
  }
}

export default GeneratedApp;
