const express = require("express");
const router = express.Router();
const {
  getAllBiz,
  getSingleBiz,
  addNewBiz,
  updateBiz,
  deleteBiz
} = require("../controller/business");
// const validateId = require('../middleware/validateId');

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

router.get("/api/v1/biz", getAllBiz);

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

router.get("/api/v1/biz/:id", getSingleBiz);

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
router.post("/api/v1/biz", addNewBiz);

// Update a business
router.put("/api/v1/biz/:id", updateBiz);

// Delete a business
router.delete("/api/v1/biz/:id", deleteBiz);

module.exports = router;
