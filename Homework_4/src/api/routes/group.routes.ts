import express, { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { createGroup, deleteGroupById, getAllGroup, getGroupById, updateGroupById } from '../../services';
import { GroupRequestSchema, UpdateGroupRequestSchema } from '../../types';
import { groupRequestValidator, updateGroupRequestValidator } from '../middelwares';

const router = express.Router();

router.route('/groups')
  // get all groups
  .get(async (req: Request, res: Response, next) => {
    try {
      const groups = await getAllGroup();

      res.send(groups);
    } catch (e) {
      return next(e);
    }
  });

router.post('/group', groupRequestValidator,
  async (req: ValidatedRequest<GroupRequestSchema>, res: Response, next) => {
    try {
      const newGroup = await createGroup(req.body);

      res.setHeader('Location', `/group/${newGroup.id}`);
      res.status(201).send(newGroup);
    } catch (error) {
      return next(error);
    }
  }
);

router.route('/group/:id')
// get group by id
  .get(async (req, res, next) => {
    try {
      const group = await getGroupById(req.params.id);

      if (!group) {
        res.status(404).send({ error: 'Group not found' });
      } else {
        res.send(group);
      }
    } catch (error) {
      return next(error);
    }
  })
// Delete user
  .delete(async (req, res, next) => {
    try {
      const isDeleted = await deleteGroupById(req.params.id);

      if (!isDeleted) {
        res.status(404).send({ error: 'Group not found' });
      } else {
        res.status(200).send();
      }
    } catch (error) {
      return next(error);
    }
  })
  .patch(
    updateGroupRequestValidator,
    async (req: ValidatedRequest<UpdateGroupRequestSchema>, res, next) => {
      try {
        const updatedGroup = await updateGroupById(req.params.id, req.body);

        if (!updatedGroup) {
          res.status(404).send({ error: 'Group not found' });
        } else {
          res.status(200).send(updatedGroup);
        }
      } catch (error) {
        return next(error);
      }
    });

export const groupRouters = router;
