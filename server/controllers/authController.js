import userModel from '../models/User.js';  // Ensure the path is correct for ES module

export const login =  async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await userModel.findOne({ email: email });
    console.log(users);

    if (users?.email !== email) {
      return res.status(401).send({ error: "authentication error" });
    }

    if (users?.password !== password) {
      return res.status(401).send({ error: "authentication error" });
    }

    res.status(200).send({ success: users });
  } catch (error) {
    res.status(500).send(error);
  }
}

