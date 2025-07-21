import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  
  contactsQuery.where('userId').equals(userId);

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  // if (filter.isFavourite) {
  //   contactsQuery.where('isFavourite').equals(filter.isFavourite);
  // }
  
  // const contactsCount = await ContactsCollection.find()
  //   .merge(contactsQuery)
  //   .countDocuments();

  // const students = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();

  const [contactsCount, students] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: students,
    ...paginationData,
  }; 
};

export const getContactById = async ({ contactId, userId } ) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId } );
  
  return contact;
};

export const deleteContactById = async (contactId, userId) => {
  const deletedContact = await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
  return deletedContact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, userId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};