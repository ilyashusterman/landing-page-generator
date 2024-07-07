import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import GeneratedApp from "./GeneratedApp";
import PreviewModal from "./PreviewModal";
import { fonts, colors } from "./data";
import { LayoutGenerator } from "./LayoutGenerator";

export const layouts = [LayoutGenerator.generateLayoutWithName("initial ")];

const Button = ({ onClick, children, isActive, className, ariaLabel }) => (
  <button
    onClick={onClick}
    className={`${className} button ${isActive ? "active" : "inactive"}`}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);
const App = () => {
  const [currentColors, setCurrentColors] = useState([
    colors[0],
    colors[1],
    colors[2],
  ]);
  const [currentFont, setCurrentFont] = useState(fonts[0]);
  const [previews, setPreviews] = useState([]);
  const [activeTab, setActiveTabBase] = useState("RandomLayouts");
  const [currentLayout, setCurrentLayout] = useState(layouts[0]);

  const setActiveTab = (value) => {
    setActiveTabBase(value);
    resetPreviews(value);
  };
  const resetPreviews = (tab) => {
    const newPreviews = Array.from({ length: 9 }, (_, index) =>
      generatePreview(tab, index)
    );
    setPreviews(newPreviews);
  };
  const getRandomItem = (array) =>
    array[Math.floor(Math.random() * array.length)];

  const generatePreview = (type, index) => {
    let layout = currentLayout;
    let css = layout.css;
    let font = currentFont;
    let colorsOutput = currentColors;
    css = getReplacedColors(css, colors, colorsOutput).css;
    css = getReplacedFont(css, font);
    if (type === "RandomLayouts") {
      layout = LayoutGenerator.generateLayoutWithName(index);
      // layout = getRandomItem(layouts);

      css = getReplacedColors(layout.css, colors, colorsOutput).css;
      css = getReplacedFont(layout.css, font);
    } else if (type === "RandomColors") {
      // regex for colors and hex colors and numbers
      const colorsState = getReplacedColors(css, colors);
      css = colorsState.css;
      colorsOutput = colorsState.newColors;
    } else if (type === "RandomFonts") {
      font = getRandomItem(fonts);
      css = getReplacedFont(css, font);
    }
    return {
      html: ReactDOMServer.renderToStaticMarkup(
        <GeneratedApp htmlContent={layout.html} cssContent={css} />
      ),
      css,
      state: {
        font,
        colors: colorsOutput,
        layout,
      },
    };
  };
  const getReplacedFont = (css, font) => {
    const allFontsRegexMatches = css.match(/font-family\s*:\s*([^;]+)/g);
    return allFontsRegexMatches.reduce((acc, cssOldRegex) => {
      acc = acc.replace(cssOldRegex, `font-family: ${font}`);
      return acc;
    }, css);
  };

  const getReplacedColors = (css, choices, colors = null) => {
    const colorsRegexMatches = css.match(
      /([\w-]+-color\s*:\s*(#?[0-9a-fA-F]{3,6}|\b[a-zA-Z]+\b|var\(--[\w-]+\))\s*;?)/g
    );

    const colorsState = colorsRegexMatches.reduce(
      (acc, cssOldRegex, index) => {
        const newColor =
          colors === null ? getRandomItem(choices) : colors[index];

        // Extract the key from the matched string
        const key = cssOldRegex.match(/([\w-]+-color)/)[0];

        // Construct the new key-value pair while preserving the original key
        const newKeyValue = `${key}: ${newColor};`;

        acc.css = acc.css.replace(cssOldRegex, newKeyValue);
        acc.newColors.push(newColor);
        return acc;
      },
      { css, newColors: [] }
    );
    return colorsState;
  };
  const loadMorePreviews = useCallback(() => {
    const newPreviews = Array.from({ length: 9 }, (_, index) =>
      generatePreview(activeTab, previews.length + index)
    );
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  }, [activeTab]);
  useEffect(() => {
    loadMorePreviews();
  }, [loadMorePreviews]);

  const observer = useRef();
  const lastPreviewRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMorePreviews();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMorePreviews]
  );

  const handleDownload = (html) => {
    const content = "<!DOCTYPE html>" + html;
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderPreviews = () =>
    previews.map((preview, index) => (
      <div key={index} className="preview-item">
        <PreviewModal
          key={index}
          preview={preview}
          index={index}
          previews={previews}
          lastPreviewRef={lastPreviewRef}
        />
        <Button
          onClick={() => handleDownload(preview.html)}
          className="green"
          ariaLabel="Download layout"
        >
          Download
        </Button>
        <Button
          onClick={() => {
            setCurrentFont(preview.state.font);
            setCurrentColors(preview.state.colors);
            setCurrentLayout(preview.state.layout);
          }}
          className="red"
        >
          Choose
        </Button>
        <p>Layout {index}</p>
      </div>
    ));
  return (
    <div className="container">
      <h1 className="header">Advanced Landing Page Generator</h1>
      <div className="tabs">
        <Button
          onClick={() => setActiveTab("RandomLayouts")}
          isActive={activeTab === "RandomLayouts"}
        >
          Random Layouts
        </Button>
        <Button
          onClick={() => setActiveTab("RandomColors")}
          isActive={activeTab === "RandomColors"}
        >
          Random Colors
        </Button>
        <Button
          onClick={() => setActiveTab("RandomFonts")}
          isActive={activeTab === "RandomFonts"}
        >
          Random Fonts
        </Button>
      </div>

      {activeTab === "RandomLayouts" && (
        <div>
          <h2>Layout Previews</h2>
          <div className="preview-container">{renderPreviews()}</div>
        </div>
      )}

      {activeTab === "RandomColors" && (
        <div>
          <h2>Color Previews</h2>
          <div className="preview-container">{renderPreviews()}</div>
        </div>
      )}

      {activeTab === "RandomFonts" && (
        <div>
          <h2>Font Previews</h2>
          <div className="preview-container">{renderPreviews()}</div>
        </div>
      )}
    </div>
  );
};

export default App;
