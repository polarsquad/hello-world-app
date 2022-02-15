module.exports = {
  extends: ["airbnb-base", "prettier"],
  rules: {
    "no-console": "off",
  },
  globals: {
    GIT_COMMIT: false,
    GIT_TAG: false,
  },
};
