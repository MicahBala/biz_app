const { Business, validate } = require("../models/business");
const validateId = require("../services/validateId");

// Get all biznesses

/**
 * @api {get} /api/v1/biz Get all businesses
 * @apiName GetBusiness
 * @apiGroup Business
 *
 * @apiSuccess {Object[]} Array of business Object
 *
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * [
 *   {
 *       "_id": "5e1263983c634b00171f4a8f",
 *       "name": "Cleaners Planet",
 *       "address": "NEPA R.About, Kafanchan",
 *       "phone": "08056342198"
 *   },
 *   {
 *       "_id": "5e1b784d31ec180017defc3b",
 *       "name": "The Axioms Ltd.",
 *       "address": "Ahmadu Bello Way, Kaduna",
 *       "phone": "08056342198"
 *   }
 * ]
 */
const getAllBiz = async (req, res, next) => {
  const business = await Business.find()
    .select("id name address phone")
    .sort("bizName");
  res.status(200).json(business);
};

// Get a single business

/**
 * @api {get} /api/v1/biz/:id Get single business
 * @apiName GetSingleBusiness
 * @apiGroup Business
 *
 * @apiParam {Number} id Business Id
 *
 * @apiSuccess {String} id Business Id
 * @apiSuccess {String} name Business Name
 * @apiSuccess {String} address Business Address
 * @apiSuccess {String} phone Business contact phone
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 *  {
 *      "_id": "5e1263983c634b00171f4a8f",
 *      "name": "Cleaners Planet",
 *      "address": "NEPA R.About, Kafanchan",
 *      "phone": "08056342198"
 *  }
 */
const getSingleBiz = async (req, res, nex) => {
  try {
    validateId(req.params.id);

    const business = await Business.findById({ _id: req.params.id }).select(
      "id name address phone"
    );
    if (!business)
      return res.status(404).send("Business with the ID does not exist");
    res.status(200).send(business);
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

// Add a new business
/**
 * @api {post} /api/v1/biz/ Add a new business
 * @apiName AddBusiness
 * @apiGroup Business
 *
 * @apiParam {String} name Business Name, must be unique
 * @apiParam {String} address Business Address
 * @apiParam {String} phone Business contact phone
 *
 * @apiParamExample Sample body:
 * HTTP/1.1 200 OK
 * {
 *   "name": "Cleaners Planet",
 *   "address": "NEPA R.About, Kafanchan",
 *   "phone": "08056342198"
 * }
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 OK
 * {
 *    "status": "Success",
 *    "message": "Business Added Successfully!",
 *    "data": {
 *       "_id": "5ebab441ba94a73ab4d970a5",
 *       "name": "Creative Minds",
 *       "address": "Abuja Nigeria",
 *       "phone": "08099223344",
 *       "addedOn": "2020-05-12T14:35:45.564Z",
 *       "__v": 0
 *     }
 * }
 *
 * @apiError BussinessNotFound The id of the business is not found
 *
 * @apiErrorExample Error Response:
 * HTTP/1.1 404 Not Found
 * {
 *    "error": "Business with the ID does not exist"
 * }
 *
 */

const addNewBiz = async (req, res, next) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // Post a new Business
  let newBusiness = new Business({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    addedOn: Date.now(),
  });

  // Save the Object to the database
  newBusiness = await newBusiness.save();

  res.status(201).send({
    status: "Success",
    message: "Business Added Successfully!",
    data: newBusiness,
  });
};

// Update a business

/**
 * @api {put} /api/v1/biz/:id Update a business
 * @apiName UpdateBusiness
 * @apiGroup Business
 *
 * @apiParam {String} id Business id
 *
 * @apiParam {String} name Business Name, must be unique
 * @apiParam {String} address Business Address
 * @apiParam {String} phone Business contact phone
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200 OK
 * {
 *    "status": "Success",
 *    "message": "Business updated Successfully!",
 *    "data": {
 *       "_id": "5ebab441ba94a73ab4d970a5",
 *       "name": "Creative Minds",
 *       "address": "Abuja Nigeria",
 *       "phone": "08099223344",
 *       "addedOn": "2020-05-12T14:35:45.564Z",
 *       "__v": 0
 *     }
 * }
 */
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
        addedOn: Date.now(),
      },
      { new: true }
    );

    if (!business)
      return res.status(404).send("Business with the ID does not exist");

    res.status(200).send({
      status: "Success",
      message: "Business Updated Successfully!",
      data: business,
    });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

// Delete a business

/**
 *  * @api {delete} /api/v1/biz/:id Delete a business
 * @apiName DeleteBusiness
 * @apiGroup Business
 *
 * @apiParam {String} id Business id
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200 OK
 * {
 *    "status": "Success",
 *    "message": "Business deleted Successfully!",
 * }
 */
const deleteBiz = async (req, res, next) => {
  try {
    validateId(req.params.id);

    const business = await Business.findByIdAndRemove(req.params.id);
    if (!business)
      return res.status(404).send("Business with the ID does not exist");
    res.send({
      status: "Success",
      message: "Business Deleted Successfully!",
    });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

module.exports = { getAllBiz, getSingleBiz, addNewBiz, updateBiz, deleteBiz };
