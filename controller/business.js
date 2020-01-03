const { Business, validate } = require('../models/business');
const validateId = require('../services/validateId');

// Get all biznesses
const getAllBiz = async (req, res, next) => {
  const business = await Business.find().sort('bizName');
  res.status(200).json(business);
};

// Get a single business
const getSingleBiz = async (req, res, nex) => {
  try {
    validateId(req.params.id);

    const business = await Business.findById({ _id: req.params.id });
    if (!business)
      return res.status(404).send('Business with the ID does not exist');
    res.status(200).send(business);
  } catch (err) {
    res.send({
      error: err.message
    });
  }
};

// Add a new business
const addNewBiz = async (req, res, next) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // Post a new Business
  let newBusiness = new Business({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    addedOn: Date.now()
  });

  // Save the Object to the database
  newBusiness = await newBusiness.save();

  res.status(401).send({
    status: 'Success',
    message: 'Business Added Successfully!',
    data: newBusiness
  });
};

// Update a business
const updateBiz = async (req, res, next) => {
  try {
    // Validate before attmpting to update
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    validateId(req.params.id);

    // Update the database using the update first approach
    const business = await Business.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        addedOn: Date.now()
      },
      { new: true }
    );

    if (!business)
      return res.status(404).send('Business with the ID does not exist');

    res.status(200).send({
      status: 'Success',
      message: 'Business Updated Successfully!',
      data: business
    });
  } catch (err) {
    res.send({
      error: err.message
    });
  }
};

// Delete a business
const deleteBiz = async (req, res, next) => {
  try {
    validateId(req.params.id);

    const business = await Business.findByIdAndRemove(req.params.id);
    if (!business)
      return res.status(404).send('Business with the ID does not exist');
    res.send({
      status: 'Success',
      message: 'Business Deleted Successfully!'
    });
  } catch (err) {
    res.send({
      error: err.message
    });
  }
};

module.exports = { getAllBiz, getSingleBiz, addNewBiz, updateBiz, deleteBiz };
