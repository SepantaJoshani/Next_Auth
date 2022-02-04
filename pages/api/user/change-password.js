import { compare, hash } from "bcryptjs";
import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";



const handler = async (req, res) => {
  if (req.method !== "PUT") {
    return;
  }
if(req.method==="PUT"){
    const { oldPassword, newPassword } = req.body;

  const session =await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const userEmail = session.user.email;

  const client = await MongoClient.connect(process.env.MONGODB_URI);

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    client.close();
    return;
  }

  const databaseUserPass = user.password;
  const passwordAreEqual = await compare(oldPassword, databaseUserPass);

  if (!passwordAreEqual) {
    res.status(403).json({ message: "Passwords are not same" });
    client.close();
    return;
  }

  const hashedPass = await hash(newPassword,12);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPass } }
  );
  client.close();
  res.status(200).json({ message: "Password updated" });
}
  
};

export default handler;