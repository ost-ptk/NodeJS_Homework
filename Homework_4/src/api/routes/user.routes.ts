import express, { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { createUser, findUserById, deleteUserById, updateUserById, getAutoSuggestUsers, addUsersToGroup } from '../../services';
import { addUserToGroupRequestValidator, updateUserRequestValidator, userRequestValidator } from '../middelwares';
import { AddUserToGroupRequest, UpdateUserRequestSchema, UserRequestSchema } from '../../types';

const router = express.Router();

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
    userRequestValidator,
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
      const user = await findUserById(req.params.id);

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
      const isDeleted = await deleteUserById(req.params.id);

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
    updateUserRequestValidator,
    async (req: ValidatedRequest<UpdateUserRequestSchema>, res, next) => {
      try {
        const updatedUser = await updateUserById(req.params.id, req.body);

        if (!updatedUser) {
          res.status(404).send({ error: 'User not found' });
        } else {
          res.status(200).send(updatedUser);
        }
      } catch (error) {
        return next(error);
      }
    });

router.post('/user-to-group', addUserToGroupRequestValidator, async (req: ValidatedRequest<AddUserToGroupRequest>, res: Response, next) => {
  try {
    const isUserAdded: boolean | string = await addUsersToGroup(req.body.groupId, req.body.userId);

    if (typeof isUserAdded === 'string') {
      res.status(400).send({ error: isUserAdded });
    } else {
      res.status(200).send(isUserAdded);
    }
  } catch (error) {
    return next(error);
  }
});

export const userRouters = router;
