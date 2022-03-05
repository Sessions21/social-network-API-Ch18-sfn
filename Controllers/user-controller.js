const { User } = require('../models');

const userController = {

  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create User
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  // update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

    // add friend to user
  addFriend({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

    // delete friend from user
  deleteFriend({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = userController;

    //   console.log(params);
  //   User.create(body)
  //     .then(({ _id }) => {
  //       return User.findOneAndUpdate(
  //         { _id: params.userId },
  //         { $push: { friends: _id } },
  //         { new: true }
  //       );
  //     })
  //     .then(dbUserData => {
  //       console.log(dbUserData)
  //       if (!dbUserData) {
  //         res.status(404).json({ message: 'No user found with this id.' });
  //         return;
  //       }
  //       res.json(dbUserData);
  //     })
  //     .catch(err => res.json(err));
  // },
  //   friends.findOneAndDelete({ _id: params.thoughtId })
  //   .then(deletedThought => {
  //     if (!deletedThought) {
  //       return res.status(404).json({ message: 'No thought with this id!' });
  //     }
  //     return User.findOneAndUpdate(
  //       { _id: params.userId },
  //       { $pull: { comments: params.thoughtId } },
  //       { new: true }
  //     );
  //   })
  //   .then(dbUserData => {
  //     if (!dbUserData) {
  //       res.status(404).json({ message: 'No User found with this id!' });
  //       return;
  //     }
  //     res.json(dbUserData);
  //   })
  //   .catch(err => res.json(err));
  // }

  