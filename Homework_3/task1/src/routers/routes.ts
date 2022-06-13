import express, { Request, Response } from 'express';
import { ValidatedRequest, createValidator } from 'express-joi-validation';

import { createUser, findUser, deleteUser, updateUser, getAutoSuggestUsers } from '../services';
import { updateUserRequestSchema, userRequestSchema } from '../schemas';
import { UpdateUserRequestSchema, UserRequestSchema } from '../types';

const router = express.Router();
const validator = createValidator();

router.route('/user')
// get auto suggest users
  .get(async (req: Request, res: Response, next) => {
    try {
      const { loginSubstring = '', limit = '5' } = req.query;
      const autoSuggestUsers = await getAutoSuggestUsers(loginSubstring as string, limit as string);

      res.send(autoSuggestUsers);
    } catch (error) {
      return next(error);
    }
  })
// Add user
  .post(
    validator.body(userRequestSchema),
    async (req: ValidatedRequest<UserRequestSchema>, res, next) => {
      try {
        const newUser = await createUser(req.body);

        res.setHeader('Location', `/users/${newUser.id}`);
        res.status(201).send(newUser);
      } catch (error) {
        return next(error);
      }
    });


router.route('/user/:id')
// Get user by id
  .get(async (req, res, next) => {
    try {
      const user = await findUser(req.params.id);

      if (!user) {
        res.status(404).send({ error: 'User not found' });
      } else {
        res.send(user);
      }
    } catch (error) {
      return next(error);
    }
  })
// Delete user
  .delete(async (req, res, next) => {
    try {
      const isDeleted = await deleteUser(req.params.id);

      if (!isDeleted) {
        res.status(404).send({ error: 'User not found' });
      } else {
        res.status(200).send();
      }
    } catch (error) {
      return next(error);
    }
  })
// Update user
  .patch(
    validator.body(updateUserRequestSchema),
    async (req: ValidatedRequest<UpdateUserRequestSchema>, res, next) => {
      try {
        const updatedUser = await updateUser(req.params.id, req.body);

        if (!updatedUser) {
          res.status(404).send({ error: 'User not found' });
        } else {
          res.status(200).send(updatedUser);
        }
      } catch (error) {
        return next(error);
      }
    });

export const userRouters = router;
