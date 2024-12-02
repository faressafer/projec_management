const Client = require("../model/client");

const create = (req, res, fileName) => {
  let data = req.body;
  let client = new Client(data);
  client.image = fileName;
  client.date = new Date();

  client
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Client created successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to create client",
        error: err.message,
      });
    });
};

const list = (req, res) => {
  Client.find()
    .then((result) => {
      res.status(200).json({
        message: "Clients retrieved successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to retrieve clients",
        error: err.message,
      });
    });
};

const byId = (req, res) => {
  Client.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "Client not found",
        });
      }
      res.status(200).json({
        message: "Client retrieved successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to retrieve client",
        error: err.message,
      });
    });
};

const deleteClient = (req, res) => {
  Client.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "Client not found",
        });
      }
      res.status(200).json({
        message: "Client deleted successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to delete client",
        error: err.message,
      });
    });
};

const update = (req, res, fileName) => {
  let data = req.body;
  let id = req.params.id;

  if (fileName && fileName.length > 0) {
    data.image = fileName;
  }

  Client.findByIdAndUpdate(id, data, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "Client not found",
        });
      }
      res.status(200).json({
        message: "Client updated successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to update client",
        error: err.message,
      });
    });
};

const deleteall = (req, res) => {
  Client.deleteMany({})
    .then((result) => {
      res.status(200).json({
        message: "All clients deleted successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to delete all clients",
        error: err.message,
      });
    });
};

module.exports = { create, list, deleteClient, update, byId, deleteall };
