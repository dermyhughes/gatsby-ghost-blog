const React = require('react');

exports.onRenderBody = function ({ setHeadComponents }) {
  const setInitialTheme = `(function() {
  var root = document.documentElement;
  var storedTheme = null;
  try {
    storedTheme = window.localStorage.getItem('preferred-theme');
  } catch (e) {
    storedTheme = null;
  }
  var theme = storedTheme === 'light' || storedTheme === 'dark'
    ? storedTheme
    : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();`;

  setHeadComponents([
    React.createElement('script', {
      key: 'theme-init',
      dangerouslySetInnerHTML: { __html: setInitialTheme },
    }),
  ]);
};
