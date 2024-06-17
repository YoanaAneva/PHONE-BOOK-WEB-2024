const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema ({
    name: { type: "string", required: true },
    surname: { type: "string", optional: true },
    picture: { type: "string", optional: true },
    phoneNumbers: {
        type: "array",
        minItems: 1,
        maxItems: 10,
        items: {
          type: "object",
          properties: {
            type: { type: "string",  enum: ['HOME','WORK','MOBILE'], default: 'MOBILE'},
            number: { type: "string", required: true },
          },
        },
      },
    metadata: {
      type: "object",
      properties: {
        email: { type: "string", optional: true },
        address: { type: "string", optional: true },
        website: { type: "string", optional: true },
        birthdate: { type: "date", optional: true },
        notes: { type: "string", optional: true },
      },
    },
    user_username: { type: "string", required: true },
}, { versionKey: false });

export const ContactModel = mongoose.model('Contact', contactSchema);

export const dbMethods = {
  getAllContacts: () => ContactModel.find(),
  getContactById: (id: string) => ContactModel.findOne({ _id: id }),
  getContactsByUser: (username: string) => ContactModel.find({ user_username: username }).then((contacts) => contacts.map(contact => contact.toObject())),
  getAllNumbersForContact: (id: string) => ContactModel.findOne({ _id: id }).then(contact => contact.phoneNumbers),
  addContact: (values: Record<string, any>) => new ContactModel(values).save().then((contact) => contact.toObject()),
  updateContactById: (id: string, values: Record<string, any>) => ContactModel.findByIdAndUpdate(id, values, {new: true}),
  deleteContactById: (id: string) => ContactModel.findOneAndDelete({ _id: id }),
  deleteContactsByUser: (username: string) => ContactModel.deleteMany({ user_username: username})
};