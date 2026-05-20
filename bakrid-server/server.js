const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log(err));

const customerSchema = new mongoose.Schema({
  book: String,
  token: String,
  name: String,
  phone: String,
  amount: Number
});

const Customer = mongoose.model('Customer', customerSchema);

app.get('/customers', async (req, res) => {

  const customers = await Customer.find().sort({ token: 1 });

  res.json(customers);

});

app.post('/customers', async (req, res) => {

  const customer = new Customer(req.body);

  await customer.save();

  res.json(customer);

});

app.delete('/customers/:id', async (req, res) => {

  await Customer.findByIdAndDelete(req.params.id);

  res.json({ success: true });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});