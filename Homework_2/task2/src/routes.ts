import express, { Request, Response} from 'express';
import { ValidatedRequest, createValidator } from 'express-joi-validation';

import { createUser, deleteUser, findUser, getAutoSuggestUsers, updateUser } from './helpers';
import { updateUserRequestSchema, UpdateUserRequestSchema, userRequestSchema, UserRequestSchema } from './schema';

const router = express.Router()
const validator = createValidator()

router.route('/user')
  // get auto suggest users
  .get( (req: Request, res: Response) => {
    const { loginSubstring = '', limit = '5' } = req.query;
    const autoSuggestUsers = getAutoSuggestUsers(loginSubstring as string, limit as string)

    res.send(autoSuggestUsers)
  })
  // Add user
  .post(
    validator.body(userRequestSchema),
    (req: ValidatedRequest<UserRequestSchema>, res) => {
      const newUser = createUser(req.body)

      res.setHeader('Location', `/users/${newUser.id}`);
      res.status(201).send(newUser);
    })


router.route('/user/:id')
  // Get user by id
  .get((req, res) => {
    const user = findUser(req.params.id);

    if (!user) {
      res.status(404).send({ error: 'User not found' })
    }

    res.send(user)
  })
  // Delete user
  .delete((req, res) => {
    const user = findUser(req.params.id);

    if (!user || user.isDeleted) {
      res.status(404).send({ error: 'User not found' })
    } else {
      deleteUser(user)

      res.status(200).send();
    }
  })
  // Update user
  .patch(
    validator.body(updateUserRequestSchema),
    (req: ValidatedRequest<UpdateUserRequestSchema>, res) => {
      const updatedUser = updateUser(req.params.id, req.body)

      if (!updatedUser) {
        res.status(404).send({ error: 'User not found' })
      }

      res.status(200).send(updatedUser);
    })

export default router;
