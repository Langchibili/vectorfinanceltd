export const reactStrictMode = false
export const typescript = {
  ignoreBuildErrors: true, // Ignore TypeScript errors
}
export const eslint = {
  ignoreDuringBuilds: true, // Ignore ESLint errors
}
export function webpack(config, { webpack }) {
  // Use the webpack instance from the function's arguments
  config.plugins.push(
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    })
  )
  return config
}

// reactStrictMode: true,
// export function webpack(config, { webpack }) {
//     // Use the webpack instance from the function's arguments
//     config.
//     )

//     // Important: return the modified config
//     return config;
// }
  