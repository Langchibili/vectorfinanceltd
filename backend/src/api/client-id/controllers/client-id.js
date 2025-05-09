const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::client-id.client-id', ({ strapi }) => ({
  async find(ctx) {
    const { idNumber, clientId} = ctx.request.query

    if (!idNumber || !clientId) {
      return ctx.badRequest('idNumber and clientId is required')
    }
   
    const getClientByIdNumber = async () => {
      const user = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: {
            clientDetails: {
              idNumber: {
                $eq: idNumber,
              },
            },
          },
          populate: { clientDetails: true },
        });
      return user;
    }

    const client = await getClientByIdNumber()

    if(client && client.hasOwnProperty('id')){ // only check for the idNumber because it's only logged during loan initiation
      if(client.id === parseInt(clientId)){/// this means it yours, so no harm
        return ctx.send({ status: 'id-taken-by-you', message: 'ID matches with existing loan record' })
      }
      return ctx.send({ status: 'id-taken', message: 'ID matches with existing loan record' })
    }
    return ctx.send({
      status: 'no-record',
      message: 'No existing record found.'
    })
  },
}))
