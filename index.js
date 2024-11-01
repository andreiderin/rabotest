const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const riskRoutes = require('./routes/riskRoutes');

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


// Use the routes
app.use('/api', riskRoutes);

app.get('/', (req, res) => res.send('Backend running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
