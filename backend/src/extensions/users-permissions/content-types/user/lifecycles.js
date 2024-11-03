// const updatePhoneNumbers = async (strapi, phone_number, user_type) => {
//     console.log('here is the stuff'+user_type)
//     const phoneNumber = "+260" + returnNineDigitNumber(phone_number).toString();
//     let newPhoneNumbers = [];
//     const numbersArray = await strapi.db.query("api::phone-number.phone-number").findOne();
//     let updatedPhoneNumbers;
    
//     if (user_type === 'driver') {
//         if (!numbersArray.driver_numbers.includes(phoneNumber)) {
//             newPhoneNumbers = [phoneNumber, ...numbersArray.driver_numbers];
//             updatedPhoneNumbers = await strapi.db.query('api::phone-number.phone-number').update({ where: { id: numbersArray.id }, data: { driver_numbers: newPhoneNumbers } });
//         }
//     } else {
//         if (!numbersArray.car_owner_numbers.includes(phoneNumber)) {
//             newPhoneNumbers = [phoneNumber, ...numbersArray.car_owner_numbers];
//             updatedPhoneNumbers = await strapi.db.query('api::phone-number.phone-number').update({ where: { id: numbersArray.id }, data: { car_owner_numbers: newPhoneNumbers } });
//         }
//     }
//   }