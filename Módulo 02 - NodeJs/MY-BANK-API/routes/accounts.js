import express from "express";
import { promises as fs } from "fs";
const { writeFile, readFile } = fs;

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.FileNameArchive));

    account = { id: data.nextId++, ...account };
    data.accounts.push(account);

    await writeFile(global.FileNameArchive, JSON.stringify(data, null, 2));

    res.send(account);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.FileNameArchive));
    const { accounts } = data;
    res.send(accounts);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = JSON.parse(await readFile(global.FileNameArchive));
    const { accounts } = data;

    const account = accounts.find((account) => {
      return account.id === parseInt(id);
    });

    if (account) {
      res.send(account);
    } else {
      res.status(400).send({ error: "Usuário não cadastrado." });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = JSON.parse(await readFile(global.FileNameArchive));

    data.accounts = data.accounts.filter((account) => {
      return account.id !== parseInt(id);
    });

    await writeFile(global.FileNameArchive, JSON.stringify(data, null, 2));
    res.send(data.accounts);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const accountUser = req.body;

    const data = JSON.parse(await readFile(global.FileNameArchive));
    const { accounts } = data;

    const accountIndex = accounts.findIndex((account) => {
      return account.id === parseInt(accountUser.id);
    });
    console.log(accountIndex)
    if (accountIndex !== -1) {
      accounts[accountIndex] = accountUser;
      await writeFile(global.FileNameArchive, JSON.stringify(data, null, 2));
      res.send(accounts[accountIndex]);
    } else {
      res.status(400).send({ error: "Usuário não cadastrado." });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
