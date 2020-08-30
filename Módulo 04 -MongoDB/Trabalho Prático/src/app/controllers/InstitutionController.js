import account from "../models/accountsModel.js";

class InstitutionController {
  async deleteaccount(req, res) {
    const { agencia, conta } = req.body;

    const accountExists = await account.findOne({ agencia, conta });

    if (!accountExists) {
      return res.status(400).json({ error: "Account not found." });
    }

    await account.findByIdAndRemove(accountExists.id);

    const countAccount = await account.countDocuments({ agencia });
    return res.json(`Total active agency account ${agencia}: ${countAccount}`);
  }

  async averageAgency(req, res) {
    const { agencia } = req.body;

     /* const accountsCount = await account.find({ agencia });
    const totalAgency = accountsCount.reduce((acc, { balance }) => {
      acc += balance;
      return acc;
    }, 0);
    const averageBalance = totalAgency / accountsCount.length;  */

    const accounts = await account.aggregate([
      { $match: { agencia } },
      { $group: { _id: null, total: { $avg: "$balance" } } },
    ]);

    if (accounts.length <= 0) {
      return res.status(400).json({ error: "Agency not found." });
    }

    return res.json(
      `Average agency balance ${agencia}: R$ ${accounts[0].total.toFixed(2)} ${averageBalance}`
    );
  }

  async lowestBalanceAgency(req, res) {
    const { limit } = req.body;

    const accounts = await account.find().sort({ balance: 1 }).limit(limit);

    return res.json(accounts);
  }

  async highestBalanceAgency(req, res) {
    const { limit } = req.body;

    const accounts = await account
      .find()
      .sort({ balance: -1, name: 1 })
      .limit(limit);

    return res.json(accounts);
  }

  async transferAgency(req, res) {
    const accounts = await account.find().sort({ agencia: 1, balance: -1 });

    const agencyPrivate = [];
    let agenciaAux;
    for (let accountUser in accounts) {
      if (
        !agencyPrivate.length ||
        agenciaAux !== accounts[accountUser].agencia
      ) {
        agenciaAux = accounts[accountUser].agencia;

        const updatedAccount = await account.findByIdAndUpdate(
          accounts[accountUser].id,
          { agencia: 99 },
          { new: true }
        );

        agencyPrivate.push(updatedAccount);
      }
    }

    return res.json(agencyPrivate);
  }
}

export default new InstitutionController();
