module.exports = function override(config) {
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: 'sass-resources-loader',
        options: {
          resources: ['src/styles/variables.scss', 'src/styles/mixins.scss', 'src/styles/utils.scss'],
        },
      },
    ],
  });

  return config;
};
