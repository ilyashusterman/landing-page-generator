import { colors, fonts } from "./data";

// Function to generate a random alphabetic UUID
function generateAlphaUUID() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    "illg-" +
    Array.from(
      { length: 5 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("")
  );
}

// Navbar styles and positions
const navBarStyles = {
  top: "top",
  side: "side",
  bottom: "bottom",
};

const layoutStyles = {
  classic: "classic",
  modern: "modern",
  minimalist: "minimalist",
};

// Helper functions to generate specific CSS
function getNavBackgroundCSS(navStyle, primaryColor, secondaryColor) {
  switch (navStyle) {
    case "transparent":
      return "background-color: transparent;";
    case "gradient":
      return `background: linear-gradient(45deg, ${primaryColor}, ${secondaryColor});`;
    default:
      return `background-color: ${primaryColor};`;
  }
}

function getNavPositionCSS(navPosition) {
  switch (navPosition) {
    case "side":
      return "position: fixed; top: 0; left: 0; height: 100%; width: 250px;";
    case "bottom":
      return "display: flex; flex-direction: column; align-items: flex-start; padding: 20px;";
    default:
      return "position: fixed; top: 0; left: 0; width: 100%;";
  }
}

function getHeroCSS(layoutStyle) {
  switch (layoutStyle) {
    case "modern":
      return "background-color: #fff; color: #444;";
    case "minimalist":
      return "background-color: #fff; color: #333;";
    default:
      return "background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/api/placeholder/1200/600') no-repeat center center/cover; color: #fff;";
  }
}

// Function to darken a color
function darkenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = ((num >> 8) & 0x00ff) + amt,
    B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
}

// Layout Generator Object
export const LayoutGenerator = {
  // Create generator with unique prefix
  createGenerator() {
    const prefix = generateAlphaUUID();

    return {
      prefix,

      // Generate menu HTML
      menu(
        items = ["Home", "Features", "About", "Contact"],
        style = navBarStyles.top,
        position = navBarStyles.top
      ) {
        const menuItems = items
          .map(
            (item) =>
              `<li><a href="#${item.toLowerCase()}" class="${prefix}-menu-item">${item}</a></li>`
          )
          .join("");

        return `
          <nav class="${prefix}-nav ${prefix}-${style} ${prefix}-${position}" ${
          position === "side"
            ? 'style="position: fixed; top: 0; left: 0; height: 100%; width: 250px;"'
            : ""
        }>
            <div class="${prefix}-container ${prefix}-nav-container">
              <a href="#" class="${prefix}-logo">Imagine</a>
              ${
                position !== "side"
                  ? `<label for="${prefix}-menu-toggle" class="${prefix}-menu-icon"><span class="${prefix}-navicon"></span></label>`
                  : ""
              }
              <ul class="${prefix}-menu">${menuItems}</ul>
            </div>
          </nav>
        `;
      },

      // Generate hero section HTML
      heroSection(
        title = "Welcome to Imagine",
        subtitle = "Your solution for business landing pages",
        buttonText = "Get Started",
        style = layoutStyles.classic
      ) {
        return `
          <section class="${prefix}-hero ${prefix}-${style}-hero">
            <div class="${prefix}-container">
              <h1>${title}</h1>
              <p>${subtitle}</p>
              <a href="#" class="${prefix}-cta-button">${buttonText}</a>
            </div>
          </section>
        `;
      },

      // Generate features section HTML
      featuresSection(
        features = [
          {
            title: "Feature One",
            description: "Description of feature one.",
            icon: "feature-icon-1",
          },
          {
            title: "Feature Two",
            description: "Description of feature two.",
            icon: "feature-icon-2",
          },
          {
            title: "Feature Three",
            description: "Description of feature three.",
            icon: "feature-icon-3",
          },
        ]
      ) {
        const featureItems = features
          .map(
            (feature) => `
          <div class="${prefix}-feature">
            <i class="${prefix}-feature-icon ${feature.icon}"></i>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
          </div>
        `
          )
          .join("");

        return `
          <section class="${prefix}-features">
            <div class="${prefix}-container" style="text-align: center; padding: 100px 0;">
              <h2>Features</h2>
              <div class="${prefix}-feature-grid">${featureItems}</div>
            </div>
          </section>
        `;
      },

      // Generate testimonials section HTML
      testimonialsSection(
        testimonials = [
          {
            name: "Client One",
            quote: "This service is amazing!",
            avatar: "avatar1",
          },
          {
            name: "Client Two",
            quote: "Absolutely fantastic experience.",
            avatar: "avatar2",
          },
          {
            name: "Client Three",
            quote: "Top-notch service and support.",
            avatar: "avatar3",
          },
        ]
      ) {
        const testimonialItems = testimonials
          .map(
            (testimonial) => `
          <div class="${prefix}-testimonial">
            <img src="/api/placeholder/100/100" alt="${testimonial.name}" class="${prefix}-testimonial-avatar ${testimonial.avatar}">
            <p>"${testimonial.quote}"</p>
            <h3>- ${testimonial.name}</h3>
          </div>
        `
          )
          .join("");

        return `
          <section class="${prefix}-testimonials">
            <div class="${prefix}-container">
              <h2>What Our Clients Say</h2>
              <div class="${prefix}-testimonial-grid">${testimonialItems}</div>
            </div>
          </section>
        `;
      },

      // Generate gallery section HTML
      gallerySection(images = [1, 2, 3, 4, 5, 6]) {
        const galleryItems = images
          .map(
            (image) => `
          <div class="${prefix}-gallery-item">
            <img src="/api/placeholder/300/200" alt="Gallery Image ${image}" class="${prefix}-gallery-image">
          </div>
        `
          )
          .join("");

        return `
          <section class="${prefix}-gallery">
            <div class="${prefix}-container">
              <h2>Gallery</h2>
              <div class="${prefix}-gallery-grid">${galleryItems}</div>
            </div>
          </section>
        `;
      },

      // Generate footer HTML
      footer(companyName = "Imagine") {
        return `
          <footer class="${prefix}-footer">
            <div class="${prefix}-container">
              <p>&copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.</p>
            </div>
          </footer>
        `;
      },

      // Generate CSS based on style parameters
      generateCSS(navStyle, navPosition, layoutStyle) {
        const primaryColor = colors[Math.floor(Math.random() * colors.length)];
        const secondaryColor =
          colors[Math.floor(Math.random() * colors.length)];
        const fontFamily = fonts[Math.floor(Math.random() * fonts.length)];

        // CSS for navbar background
        const navBackgroundCSS = getNavBackgroundCSS(
          navStyle,
          primaryColor,
          secondaryColor
        );

        // CSS for navbar position
        const navPositionCSS = getNavPositionCSS(navPosition);

        // CSS for hero section
        const heroCSS = getHeroCSS(layoutStyle);

        // Complete CSS string
        return `
            .${prefix}-layout {
                font-family: ${fontFamily};
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
                line-height: 1.6;
            }
            .${prefix}-container {
                width: 90%;
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
            }
            .${prefix}-nav {
                ${navBackgroundCSS}
                ${navPositionCSS}
                color: #fff;
                padding: 1rem 0;
                z-index: 1000;
                width: ${navPosition === "side" ? "250px" : "100%"};
            }
            .${prefix}-nav-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-direction: ${navPosition === "side" ? "column" : "row"};
            }
            .${prefix}-logo {
                font-size: 1.5rem;
                font-weight: bold;
                color: #fff;
                text-decoration: none;
            }
            .${prefix}-menu {
                display: flex;
                flex-direction: ${navPosition === "side" ? "column" : "row"};
                list-style-type: none;
                margin: ${navPosition === "side" ? "20px 0 0 0" : "0"};
                padding: 0;
            }
            .${prefix}-menu-item {
                color: #fff;
                text-decoration: none;
                padding: 0.5rem 1rem;
                transition: color 0.3s ease;
                text-align: ${navPosition === "side" ? "left" : "center"};
            }
            .${prefix}-menu-item:hover {
                color: ${secondaryColor};
            }
            .${prefix}-hero {
                text-align: center;
                padding: 80px 0;
                margin-left: ${navPosition === "side" ? "250px" : "0"};
                ${heroCSS}
            }
            .${prefix}-hero h1 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            .${prefix}-hero p {
                font-size: 1.2rem;
                margin-bottom: 2rem;
            }
            .${prefix}-cta-button {
                display: inline-block;
                padding: 0.8rem 1.5rem;
                background-color: ${secondaryColor};
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                transition: all 0.3s ease;
            }
            .${prefix}-cta-button:hover {
                background-color: ${darkenColor(secondaryColor, 20)};
            }
            .${prefix}-features, .${prefix}-testimonials, .${prefix}-gallery {
                margin-left: ${navPosition === "side" ? "250px" : "0"};
                padding: 50px 0;
            }
            .${prefix}-feature-grid, .${prefix}-testimonial-grid, .${prefix}-gallery-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-top: 30px;
            }
            .${prefix}-feature, .${prefix}-testimonial, .${prefix}-gallery-item {
                background: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .${prefix}-feature-icon, .${prefix}-gallery-image, .${prefix}-testimonial-avatar {
                max-width: 100%;
                height: auto;
                margin-bottom: 15px;
            }
            .${prefix}-footer {
                background-color: ${primaryColor};
                color: #fff;
                text-align: center;
                padding: 20px 0;
                margin-top: 50px;
                margin-left: ${navPosition === "side" ? "250px" : "0"};
            }
            @media (max-width: 768px) {
                .${prefix}-menu {
                    display: none;
                    flex-direction: column;
                    width: 100%;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background-color: ${primaryColor};
                }
                .${prefix}-menu-toggle:checked ~ .${prefix}-menu {
                    display: flex;
                }
                .${prefix}-menu-icon {
                    display: block;
                    cursor: pointer;
                    padding: 28px 20px;
                    position: relative;
                    user-select: none;
                }
                .${prefix}-navicon {
                    background: #fff;
                    display: block;
                    height: 2px;
                    position: relative;
                    transition: background .2s ease-out;
                    width: 18px;
                }
                .${prefix}-navicon:before, .${prefix}-navicon:after {
                    background: #fff;
                    content: '';
                    display: block;
                    height: 100%;
                    position: absolute;
                    transition: all .2s ease-out;
                    width: 100%;
                }
                .${prefix}-navicon:before {
                    top: 5px;
                }
                .${prefix}-navicon:after {
                    top: -5px;
                }
                .${prefix}-menu-toggle:checked ~ .${prefix}-menu-icon .${prefix}-navicon {
                    background: transparent;
                }
                .${prefix}-menu-toggle:checked ~ .${prefix}-menu-icon .${prefix}-navicon:before {
                    transform: rotate(-45deg);
                }
                .${prefix}-menu-toggle:checked ~ .${prefix}-menu-icon .${prefix}-navicon:after {
                  transform: rotate(45deg);
              }
              .${prefix}-menu-toggle:checked ~ .${prefix}-menu-icon .${prefix}-navicon:before,
              .${prefix}-menu-toggle:checked ~ .${prefix}-menu-icon .${prefix}-navicon:after {
                  top: 0;
              }
              .${prefix}-menu-item {
                  padding: 1rem;
                  text-align: center;
                  width: 100%;
              }
              .${prefix}-nav.${prefix}-side {
                  width: 100%;
                  height: auto;
                  position: static;
              }
              .${prefix}-nav.${prefix}-bottom {
                  position: static;
              }
          }
      `;
      },

      // Utility function to darken color
      darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = ((num >> 8) & 0x00ff) - amt;
        const B = (num & 0x0000ff) - amt;
        return `#${(
          0x1000000 +
          (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
          (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
          (B < 255 ? (B < 1 ? 0 : B) : 255)
        )
          .toString(16)
          .slice(1)}`;
      },

      // Generate layout with sections
      generateLayout(name = "Default Layout") {
        const navStyle =
          Object.values(navBarStyles)[
            Math.floor(Math.random() * Object.values(navBarStyles).length)
          ];
        const navPosition =
          Object.values(navBarStyles)[
            Math.floor(Math.random() * Object.values(navBarStyles).length)
          ];
        const layoutStyle =
          Object.values(layoutStyles)[
            Math.floor(Math.random() * Object.values(layoutStyles).length)
          ];

        const startSections = [
          this.menu(undefined, navStyle, navPosition),
          this.heroSection(undefined, undefined, undefined, layoutStyle),
        ];
        const endSections = [this.footer()];
        const sections = [
          this.featuresSection(),
          this.testimonialsSection(),
          this.gallerySection(),
        ];

        const minSections = 3;
        const maxSections = sections.length;
        const numSections =
          Math.floor(Math.random() * (maxSections - minSections + 1)) +
          minSections;
        const selectedSections = sections
          .sort(() => 0.5 - Math.random())
          .slice(0, numSections);

        const sectionsResult = [
          ...startSections,
          ...selectedSections,
          ...endSections,
        ];

        const html = `<div class="${prefix}-layout">${sectionsResult.join(
          ""
        )}</div>`;
        const css = this.generateCSS(navStyle, navPosition, layoutStyle);

        return {
          name,
          html,
          css,
        };
      },
    };
  },
  // Generate layout with a specified name
  generateLayoutWithName(layoutIndex) {
    return this.createGenerator().generateLayout(`Layout ${layoutIndex}`);
  },
};
