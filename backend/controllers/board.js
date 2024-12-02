const Board = require("../model/board");

const createBoard = (id) => {
  let board = new Board();
  board.projet = id;
  board.date = new Date();

  board
    .save()
    .then((result) => {
      console.log("Board created successfully");
    })
    .catch((err) => {
      console.log("Failed to create board");
    });
};

const byId = (req, res) => {
  let id = req.params.id;
  Board.findOne({ projet: id })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "Board not found",
        });
      }
      res.status(200).json({
        message: "Board found successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to find board",
        error: err.message,
      });
    });
};

const deleteBoard = (req, res) => {
  Board.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "Board not found",
        });
      }
      res.status(200).json({
        message: "Board deleted successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to delete board",
        error: err.message,
      });
    });
};

const update = (req, res) => {
  let data = req.body;
  let id = req.params.id;

  Board.findByIdAndUpdate(id, data, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "Board not found",
        });
      }
      res.status(200).json({
        message: "Board updated successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to update board",
        error: err.message,
      });
    });
};

module.exports = { createBoard, deleteBoard, update, byId };
