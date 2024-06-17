const express = require('express');

import { getAllContacts, getContactByIdr, getAllNumbersForContact, getContactsByUser,
         addContact, updateContactById, partiallyUpdateContactById,  deleteContactById, 
         deleteContactsByUser} from '../../controller/contactController';

import { validateContact, validatePatchRequest } from '../../middleware/contactValidation';

const router = express.Router();

router.route('/')
    .get(getAllContacts)
    .post(validateContact, addContact);

router.route('/:id')
    .get(getContactByIdr)
    .put(validateContact, updateContactById)
    .patch(validatePatchRequest, partiallyUpdateContactById)
    .delete(deleteContactById)

router.route('/:id/phoneNumbers').get(getAllNumbersForContact)

router.route('/user/:username')
    .get(getContactsByUser)
    .delete(deleteContactsByUser)

module.exports = router;