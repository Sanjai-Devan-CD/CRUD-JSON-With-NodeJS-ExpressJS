const { use } = require("express/lib/application");
const userService = require("../services/userService");

const getAllUser = async (req, res, next) => {
  try {
    console.log("Reading Users");
    const users = await userService.readAllUsers();
    console.log("Reading Successfully");
    res.json(users);
  } catch (error) {
    console.log("Hited a Error in reading", error);
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    console.log("Creating New user");
    const newUser = await userService.createUser(req.body);
    console.log("User add successfully");
    res.status(201).json(newUser);
  } catch (error) {
    console.log("Hited Error in Adding User", error);
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      console.log("No user Id provided");
      return res.status(400).json({ error: "No user ID provided" });
    }
    const user = await userService.getUserById(id);
    if (!user) {
      console.log(`No user Found in this ID : ${id}`);
      return res.status(404).json({ error: "No User Found in the ID" });
    }
    console.log(`User Found in the ID ${id}`);
    res.json(user);
  } catch (error) {
    console.log("Hited Error in Finding User", error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    console.log(id);
    if (isNaN(id)) {
      console.log("No User Id provided to update");
      return res.status(400).json({ error: "No user ID provided" });
    }
    const updateExistingUser = await userService.updateUser(id, req.body);
    if (!updateExistingUser) {
      return res.send(404).json({ error: "No User found to update" });
    }
    res.json(updateExistingUser);
  } catch (error) {
    console.error("Error in update User", error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      console.log("No User ID to delete");
      return res.status(400).json({ error: "No user Id to delete" });
    }
    const deleted = await userService.deleteUser(id);
    if (!deleted) {
      return res.send(404).json({ error: "No User Id match" });
    }
    res.status(200).send("User Deleted successfully");
  } catch (error) {
    console.error("Error in Deleting User", error);
  }
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
