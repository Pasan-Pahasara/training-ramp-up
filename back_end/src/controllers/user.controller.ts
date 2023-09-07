import { RequestHandler, Request, Response } from 'express';
import {
  deleteUser,
  registerUser,
  retrieveAllUsers,
  signInUser,
  updateUser,
} from '../services/user.service';

export default class UserController {
  registerUser: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //create operation
    try {
      // get the user data from the request body
      const newUser = req.body;

      // register the user
      const user = await registerUser(newUser);
      // return res.status(201).json(user);

      return res // return the response
        .status(200)
        .json({
          message: 'New User Register successfully.!',
          responseData: user,
        });
    } catch (e: unknown) {
      // catch block is used to handle the errors
      if (e instanceof Error) {
        return res.json({ message: e.message });
      } else {
        return res.status(500).json({ message: 'Unknown error occured.' });
      }
    }
  };

  retrieveAllUsers: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //read operation
    try {
      // retrieve all the users
      let users = await retrieveAllUsers();

      return res.json({ data: users });
    } catch (e: unknown) {
      // catch block is used to handle the errors
      if (e instanceof Error) {
        return res.json({ message: e.message });
      } else {
        return res.status(500).json(e);
      }
    }
  };

  updateUser: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //update operation
    try {
      // get the user id from the request params
      const { id } = req.params;
      // get the user data from the request body
      const newUser = req.body;

      // update the user
      const updatedUser = await updateUser(id, newUser);

      return res // return the response
        .status(200)
        .json({
          message: 'User updated successfully.!',
          responseData: updatedUser,
        });
    } catch (error: unknown) {
      // catch block is used to handle the errors
      if (error instanceof Error) {
        return res.json({ message: error.message });
      } else {
        return res.status(500).json({ message: 'Unknown error occured.' });
      }
    }
  };

  deleteUser: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    //delete operation
    try {
      // get the user id from the request params
      const { id } = req.params;

      // delete the user
      const deletedUser = await deleteUser(id);

      return res // return the response
        .status(200)
        .json({
          message: 'User deleted successfully.!',
          responseData: deletedUser,
        });
    } catch (error: unknown) {
      // catch block is used to handle the errors
      if (error instanceof Error) {
        return res.json({ message: error.message });
      } else {
        return res.status(500).json({ message: 'Unknown error occured.' });
      }
    }
  };

  signIn: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const { userEmail, userPassword } = req.body;
      console.log(userEmail);

      const user = await signInUser(userEmail, userPassword);

      res.cookie('refreshToken', user.refreshToken, {
        httpOnly: true,
        secure: true,
      });
      res.cookie('accessToken', user.accessToken, {
        httpOnly: true,
        secure: true,
      });

      console.log(user.accessToken, user.refreshToken);

      return res.status(200).json({
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  signOut: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(200).json({ message: 'Sign out successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
}
