/**
 *
 * 
 * @class response
 */
export default class response {
  /**
   * 
   * 
   * @static
   * @returns error 404 status and message
   * @memberof response
   */
  static err404(code) {
    switch (code) {
      case 404:
        return res.status(code).send({ success: false, message: 'Not Found' });
        break;
      case 201:
      return res.status(code).send({success: true, message: 'created'})
    
      default:
        break;
    }
  }
}


