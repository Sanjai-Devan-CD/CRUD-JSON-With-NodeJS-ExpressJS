const fs = require("fs").promises;
// const pipeline = require('node:stream/promises')
const path = require("path");
const dbpath = path.join(__dirname, "..", "db", "users.json");

let writeLet = false;

// async function writeUser(dbpath,userList) {
//         try {
//                 while (writeLet) {
//                         console.log("Waiting to avoid race condition");
//                         await new Promises(resolve => setTimeout(resolve, 10));
//                 }
//                 await fs.writeFile(dbpath, JSON.stringify({ Users: userList }, null, 2), 'utf-8');
//                 console.log("Writed data Successfully");
//                 writeLet = true;
//         }
//         catch (error) {
//                 console.error("Error in writting file",error)
//         }
//         finally {
//                 console.log("Finally block executed.")
//                 writeLet = false;
//         }
// }

const readAllUsers = async () => {
  try {
    console.log("Started Reading in service");
    const data = await fs.readFile(dbpath, "utf-8");
    console.log(`Reading Completed ${data}`);
    console.log(JSON.parse(data));
    return JSON.parse(data);
  } catch (error) {
    console.error("Reading users error", error);
    return null;
  }
};

// const readAllUsers = async () => {
//         try {
//                 console.log("Started Reading in service");
//                 const datum = await fs.createReadStream(dbpath, { encoding: 'utf-8' });
//                 console.log("🚀 ~ readAllUsers ~ datum:", datum)
//                 try {
//                         console.log("🚀 ~ readAllUsers ~ try:")
//                         let data ='';
//                         for await (const chunk of datum) {
//                                 console.log('--- File chunk start ---');
//                                 console.log(chunk);
//                                 data += chunk;
//                                 console.log('--- File chunk end ---');
//                         }
//                         console.log(`Reading completed ${data}`);
//                         console.log(JSON.parse(data));
//                         return JSON.parse(data);
//                 }
//                 catch (error) {
//                         console.error(`Error in reading file ${error.msessage}`)
//                 }
//         }
//         catch (error) {
//                 console.error("Reading users error");
//                 return null;
//         }
// }

const createUser = async (userData) => {
  try {
    console.log("Reading User before write");
    const users = await readAllUsers();
    console.log(`Reading Completed ${users}`);
    const userList = users.Users || [];
    console.log(`Red Users in the userList ${userList}`);
    console.log("Started Creating New User");
    const newUser = {
      id: userList.length > 0 ? userList[userList.length - 1].id + 1 : 1,
      ...userData,
    };
    console.log(`New User created Successfully ${newUser}`);
    userList.push(newUser);
    console.log(`Pushed new User Data ${users}`);
    console.log("Started Writing data");
    //     writeUser(userList);
    try {
      await fs.writeFile(
        dbpath,
        JSON.stringify({ Users: userList }, null, 2),
        "utf-8",
      );
      console.log("Writed data Successfully");
    } catch (error) {
      console.error("Error in writing File", error);
    } finally {
      writeLet = false;
    }
    return userList;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const getUserById = async (id) => {
  try {
    console.log("Reading User");
    const users = await readAllUsers();
    console.log(`Reading Completed ${users}`);
    console.log(`Creating User List`);
    const userList = users.Users || null;
    console.log(`Red userList ${userList}`);
    if (!userList) {
      console.log("UserList is empty");
      return null;
    }
    console.log(`Returned error or null for the user id ${id}`);
    return userList.find((user) => user.id === id) || null;
  } catch (error) {
    console.log("Unexpected error in reading the user ID");
    return null;
  }
};

const updateUser = async (id, updates) => {
  try {
    console.log("Reading User before write");
    const users = await readAllUsers();
    console.log(`Reading Completed ${users}`);
    const userList = users.Users || null;
    console.log(`Get the User List ${userList}`);
    const indexUser = userList.findIndex((u) => u.id === id);
    console.log(`User Details ${indexUser}`);
    if (indexUser === -1) {
      return null;
    }
    const { id: _, ...allowedUpdates } = updates;
    userList[indexUser] = { ...userList[indexUser], ...allowedUpdates };
    try {
      await fs.writeFile(
        dbpath,
        JSON.stringify({ Users: userList }, null, 2),
        "utf-8",
      );
      console.log("Writed data Successfully");
    } catch (error) {
      console.error("Error in writing File", error);
    } finally {
      writeLet = false;
    }
    return userList[indexUser];
  } catch (error) {
    console.log("Error in Update User");
  }
};

const deleteUser = async (id) => {
  try {
    console.log("Reading User before write");
    const users = await readAllUsers();
    console.log(`Reading Completed ${users}`);
    const userList = users.Users || null;
    console.log(`Get the User List ${userList}`);
    console.log(`Get the User List ${userList}`);
    const indexUser = userList.findIndex((u) => u.id === id);
    console.log(`User Details ${indexUser}`)
    if(indexUser === -1)
    {
      return null;
    }
    userList.splice(indexUser,1);

        try {
      await fs.writeFile(
        dbpath,
        JSON.stringify({ Users: userList }, null, 2),
        "utf-8",
      );
      console.log("Writed data Successfully");
    } catch (error) {
      console.error("Error in writing File", error);
    } finally {
      writeLet = false;
    }
    return true;
  } catch (error) {
    console.error("Error in delete User", error);
  }
};

module.exports = { readAllUsers, createUser, getUserById, updateUser, deleteUser };
