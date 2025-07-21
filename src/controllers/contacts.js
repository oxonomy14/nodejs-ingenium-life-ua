import createHttpError from 'http-errors';
import { getAllContacts, getContactById, deleteContactById, createContact, updateContact } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';



export const getAllContactsController = async (req, res, next) => {

  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;
        const contacts = await getAllContacts({
          page,
          perPage,
          sortBy,
          sortOrder,
          filter,
          userId, 
        });
    
        res.status(200).json({
          status: 200,
          message: 'Successfully found contacts!',
          data: contacts
        });
      } catch (err) {
        next(err);
      }
};
  
export const getContactByIdController = async (req, res, next) => {
    
  try {
    const { contactId } = req.params;
    const userId = req.user._id;
    
    const contact = await getContactById({ contactId, userId });
    
        if (!contact) {
          // Якщо контакт не знайдено — кидаємо 404
          throw createHttpError(404, 'Contact not found');
        }
    
        res.status(200).json({
          status: 200,
          message: `Successfully found contact with id ${contactId}!`,
          data: contact
        });
      } catch (err) {
        next(err); 
      }
    
};

export const deleteContactController = async (req, res, next) => {
    
    
  try {
    const { contactId } = req.params;
    const userId = req.user._id;

    const contact = await deleteContactById(contactId, userId);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(204).send();
    console.log(`Deleted contact with ID ${contactId}`);
  } catch (err) {
    next(err);
  }
   
    
};

export const createContactController = async (req, res) => {
  const userId = req.user._id;
  const photo = req.file;

  let photoUrl;
  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await createContact({ ...req.body, userId,  photo: photoUrl, });
    res.status(201).json({
        message: 'Successfully created a contact',
        status: 201,
        data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;
  const userId = req.user._id;
 // const payload = req.body;
  console.log({ contactId, userId, payload: req.body });
  //const result = await updateContact(contactId, userId, payload);
  
  let photoUrl;
  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact(contactId, userId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};