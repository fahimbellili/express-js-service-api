const {
  objectCreationSuccess,
  objectUpdateSuccess,
  objectDeleteSuccess,
} = require('../wording/wording');

exports.createElement = async (req, res, DataModel) => {
  const objectElement = req.body;
  delete objectElement.id;
  const dataModel = new DataModel({ ...objectElement });
  try {
    await dataModel.save();
    return res.status(201).json({ message: objectCreationSuccess });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

exports.updateElement = async (req, res, DataModel) => {
  const objectElement = req.body;
  try {
    await DataModel.updateOne(
      { _id: req.params.id },
      { ...objectElement, _id: req.params.id }
    );
    return res.status(200).json({ message: objectUpdateSuccess });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

exports.deleteElement = async (req, res, DataModel) => {
  try {
    await DataModel.findOne({ _id: req.params.id });
    try {
      await DataModel.deleteOne({ _id: req.params.id });
      return res.status(200).json({ message: objectDeleteSuccess });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

exports.getOneElement = async (req, res, DataModel) => {
  try {
    const element = await DataModel.findOne({ _id: req.params.id });
    return res.status(200).json(element);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

exports.getAllElements = async (req, res, DataModel) => {
  const usrId = req.userId;
  try {
    const elements = await DataModel.find({ userId: usrId });
    return res.status(200).json(elements);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
