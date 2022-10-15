const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

const _react = _interopRequireDefault(require('react'));

const _gatsby = require('gatsby');

const _common = require('./common.js');

exports.onRenderBody = function (_ref, pluginOptions) {
  const { setHeadComponents } = _ref;
  // We use this to build a final array to pass as the argument to setHeadComponents at the end of onRenderBody.
  let headComponents = [];
  const icons = pluginOptions.icons || _common.defaultIcons; // If icons were generated, also add a favicon link.

  if (pluginOptions.icon) {
    const favicon = icons && icons.length ? icons[0].src : null;

    if (favicon) {
      headComponents.push(
        /* #__PURE__ */ _react.default.createElement('link', {
          key: 'gatsby-plugin-manifest-icon-link',
          rel: 'shortcut icon',
          href: (0, _gatsby.withPrefix)(favicon),
        }),
      );
    }
  } // Add manifest link tag.

  headComponents.push(
    /* #__PURE__ */ _react.default.createElement('link', {
      key: 'gatsby-plugin-manifest-link',
      rel: 'manifest',
      href: (0, _gatsby.withPrefix)('/manifest.webmanifest'),
    }),
  ); // The user has an option to opt out of the theme_color meta tag being inserted into the head.

  if (pluginOptions.theme_color) {
    const insertMetaTag = Object.keys(pluginOptions).includes(
      'theme_color_in_head',
    )
      ? pluginOptions.theme_color_in_head
      : true;

    if (insertMetaTag) {
      headComponents.push(
        /* #__PURE__ */ _react.default.createElement('meta', {
          key: 'gatsby-plugin-manifest-meta',
          name: 'theme-color',
          content: pluginOptions.theme_color,
        }),
      );
    }
  }

  if (pluginOptions.legacy) {
    const iconLinkTags = icons.map((icon) =>
    /* #__PURE__ */ _react.default.createElement('link', {
        key: `gatsby-plugin-manifest-apple-touch-icon-${icon.sizes}`,
        rel: 'apple-touch-icon',
        sizes: icon.sizes,
        href: (0, _gatsby.withPrefix)(`${icon.src}`),
      }));
    headComponents = [].concat(headComponents, iconLinkTags);
  }

  setHeadComponents(headComponents);
};
