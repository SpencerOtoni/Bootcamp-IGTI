import mongoose from "mongoose";

const schema = mongoose.Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0)
        throw new AppErrors('Negative values are not permitted', 401);
    },
  },
});

const accountModel = mongoose.model("accounts", schema, "accounts");

export default accountModel