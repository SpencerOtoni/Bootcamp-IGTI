import account from "../models/accountsModel.js";

class AccountHolderController {
  async balanceOperation(req, res) {
    const { agencia, conta } = req.body;

    const accountExists = await account.findOne({ agencia, conta });

    if (!accountExists) {
      return res.status(400).json({ error: "Account not found." });
    }

    const accountUser = {
      name: accountExists.name,
      balance: accountExists.balance,
    };

    return res.json(accountUser);
  }

  async depositOperation(req, res) {
    const { agencia, conta, valor } = req.body;

    if (valor <= 0 || valor === undefined) {
      return res
        .status(400)
        .json({ error: "Operation not allowed for reported value." });
    }

    const accountExists = await account.findOne({ agencia, conta });

    if (!accountExists) {
      return res.status(400).json({ error: "Account not found." });
    }

    const accountUpdate = await account.findByIdAndUpdate(
      accountExists.id,
      { balance: accountExists.balance + valor },
      { new: true }
    );

    return res.json(accountUpdate);
  }

  async withdrawalOperation(req, res) {
    const { agencia, conta, valor } = req.body;

    if (valor <= 0 || valor === undefined) {
      return res
        .status(400)
        .json({ error: "Operation not allowed for reported value." });
    }

    const accountExists = await account.findOne({ agencia, conta });

    if (!accountExists) {
      return res.status(400).json({ error: "Account not found." });
    }

    if (accountExists.balance < valor + 1) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    const accountUpdate = await account.findByIdAndUpdate(
      accountExists.id,
      { balance: accountExists.balance - (valor + 1) },
      { new: true }
    );

    return res.json(accountUpdate);
  }

  async transfersOperation(req, res) {
    const { contaDestino, contaOrigen, valor } = req.body;

    if (valor <= 0 || valor === undefined) {
      return res
        .status(400)
        .json({ error: "Operation not allowed for reported value." });
    }

    const accountDestino = await account.findOne({ conta: contaDestino });
    const accountOrigen = await account.findOne({ conta: contaOrigen });

    if (!accountDestino || !accountOrigen) {
      return res.status(400).json({ error: "Account not found." });
    }

    const isSameAgency = accountDestino.agencia === accountOrigen.agencia;

    /* const saldo = isSameAgency
      ? accountOrigen.balance > valor
      : accountOrigen.balance > valor + 8;

      console.log(saldo, isSameAgency)
    if (isSameAgency) {
      return res
        .status(400)
        .json({ error: "Transfer not permitted, insuffient funds" });
    } */

    const accountUpdateOrigen = await account.findByIdAndUpdate(accountOrigen.id, {
      balance: isSameAgency
        ? accountOrigen.balance - valor
        : accountOrigen.balance - (valor + 8),
    });

    const accountUpdateDestino = await account.findByIdAndUpdate(
      accountDestino.id,
      { balance: accountDestino.balance + valor },
      { new: true }
    );

    return res.json(accountUpdateOrigen);
  }
}

export default new AccountHolderController();
