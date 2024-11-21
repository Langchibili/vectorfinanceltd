// module.exports = (config, { strapi }) => {
//     return async (ctx, next) => {
//         console.log('path is',ctx.request.url)
//         if(ctx.request.url.startsWith('/admin/plugins/purchase-content-releases')){
//             ctx.response.url = "/admin/content-manager"
//         }
//       const userRole = ctx.state.user?.role?.type;
      
//    // console.log( strapi.server)
//       const restrictedRoles = ['editor', 'author', 'admin'];
  
//       if (restrictedRoles.includes(userRole) && ctx.request.url.includes('/admin/plugins/purchase-content-releases')) {
//         return ctx.unauthorized('You are not allowed to access this resource.');
//       }
  
//       await next();
//     };
//   }


module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
      console.log('Request Path:', ctx.request.url);
  
      // Restrict specific roles from accessing certain paths
      if (ctx.request.url.includes('/admin/plugins/purchase-content-releases')) {
        try {
          // Get authorization token from the headers
          const authHeader = ctx.request.headers.authorization;
  
          if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return ctx.unauthorized('Authorization token is missing or invalid.');
          }
  
          const token = authHeader.split(' ')[1];
  
          // Decode the token and get the user ID
          const adminUser = await strapi.admin.services.token.decode(token);
  
          if (!adminUser || !adminUser.id) {
            return ctx.unauthorized('Unable to retrieve user from token.');
          }
  
          // Fetch user details including roles
          const user = await strapi.admin.services.user.findOne(adminUser.id, {
            populate: ['roles'],
          });
  
          if (!user) {
            return ctx.unauthorized('User not found.');
          }
  
          console.log('Admin User:', user);
  
          // Extract roles and check for restricted roles
          const restrictedRoles = ['editor', 'author'];
          const userRoles = user.roles.map((role) => role.code);
  
          if (userRoles.some((role) => restrictedRoles.includes(role))) {
            return ctx.unauthorized('You are not allowed to access this resource.');
          }
        } catch (error) {
          console.error('Middleware Error:', error);
          return ctx.internalServerError('An error occurred while processing the request.');
        }
      }
  
      await next();
    };
  };
  